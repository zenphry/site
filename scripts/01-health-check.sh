#!/bin/bash

# Deployment Health Check Script
# Usage: ./scripts/01-health-check.sh <url>
# Example: ./scripts/01-health-check.sh https://zenphry.com

set -e

URL="${1:-https://zenphry.com}"
MAX_RETRIES=3
RETRY_DELAY=5
TIMEOUT=10

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
TOTAL_CHECKS=7
FAILED_CHECKS=()

# Determine environment from URL
if [[ "$URL" == *"dev.zenphry.com"* ]]; then
  ENV="dev"
elif [[ "$URL" == *"stg.zenphry.com"* ]]; then
  ENV="stg"
else
  ENV="prod"
fi

# Helper functions
log_check() {
  local check_num="$1"
  local message="$2"
  echo -e "${BLUE}[${check_num}/${TOTAL_CHECKS}]${NC} ${message}"
}

log_info() {
  echo "  [INFO] $1"
}

log_success() {
  echo -e "  ${GREEN}[PASS]${NC} $1"
  PASSED=$((PASSED + 1))
}

log_fail() {
  echo -e "  ${RED}[FAIL]${NC} $1"
  if [ -n "$2" ]; then
    echo "         $2"
  fi
  FAILED=$((FAILED + 1))
  FAILED_CHECKS+=("$1${2:+: $2}")
}

log_wait() {
  echo -e "  ${YELLOW}[WAIT]${NC} $1"
}

# Retry wrapper for curl commands with timeout handling
curl_with_retry() {
  local url="$1"
  local attempt=1
  local http_code

  while [ "$attempt" -le "$MAX_RETRIES" ]; do
    http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" -A "Mozilla/5.0 (Health Check)" "$url" 2>/dev/null || echo "timeout")

    if [ "$http_code" == "200" ]; then
      echo "$http_code"
      return 0
    fi

    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
      log_info "Attempt $attempt failed (HTTP $http_code), retrying in ${RETRY_DELAY}s..."
      sleep "$RETRY_DELAY"
    fi

    attempt=$((attempt + 1))
  done

  echo "$http_code"
  return 1
}

# Print header
echo "============================================================"
echo "Deployment Health Check"
echo "============================================================"
log_info "Target URL: $URL"
log_info "Environment: $ENV"
log_info "Total checks: $TOTAL_CHECKS"
echo ""

# ============================================================
# Check 1/7: Homepage loads successfully
# ============================================================
log_check "1" "Homepage loads"
HTTP_CODE=$(curl_with_retry "$URL")

if [ "$HTTP_CODE" == "200" ]; then
  log_success "Homepage accessible (HTTP $HTTP_CODE)"
else
  log_fail "Homepage failed" "Expected HTTP 200, got $HTTP_CODE after $MAX_RETRIES attempts"
fi
echo ""

# ============================================================
# Check 2/7: Critical pages load
# ============================================================
log_check "2" "Critical pages load"

CRITICAL_PAGES=("/about" "/services" "/contact" "/pricing" "/blog")
ALL_PAGES_OK=true

for page in "${CRITICAL_PAGES[@]}"; do
  PAGE_URL="$URL$page"
  PAGE_CODE=$(curl_with_retry "$PAGE_URL")

  if [ "$PAGE_CODE" == "200" ]; then
    log_info "[OK] $page (HTTP $PAGE_CODE)"
  else
    log_info "[X] $page (HTTP $PAGE_CODE)"
    ALL_PAGES_OK=false
  fi
done

if [ "$ALL_PAGES_OK" = true ]; then
  log_success "All critical pages accessible"
else
  log_fail "Critical pages failed" "One or more pages returned non-200 status"
fi
echo ""

# ============================================================
# Check 3/7: Assets load correctly
# ============================================================
log_check "3" "Assets load correctly"

# Fetch homepage HTML with retry for reliability
fetch_html_with_retry() {
  local url="$1"
  local attempt=1

  while [ "$attempt" -le "$MAX_RETRIES" ]; do
    HTML=$(curl -s --max-time "$TIMEOUT" -A "Mozilla/5.0 (Health Check)" "$url" 2>/dev/null)

    if [ -n "$HTML" ] && [ ${#HTML} -gt 100 ]; then
      echo "$HTML"
      return 0
    fi

    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
      sleep "$RETRY_DELAY"
    fi

    attempt=$((attempt + 1))
  done

  echo ""
  return 1
}

HTML_CONTENT=$(fetch_html_with_retry "$URL")

# Extract JS bundle (React Router v7 uses modulepreload)
JS_BUNDLE=$(echo "$HTML_CONTENT" | grep -oP 'rel="modulepreload" href="(/assets/[^"]+\.js)"' | head -1 | sed 's/.*href="//;s/".*//')

# Fallback: Check for traditional script tags
if [ -z "$JS_BUNDLE" ]; then
  JS_BUNDLE=$(echo "$HTML_CONTENT" | grep -oP 'src="(/assets/[^"]+\.js)"' | head -1 | sed 's/src="//;s/"//')
fi

# Extract CSS bundle
CSS_BUNDLE=$(echo "$HTML_CONTENT" | grep -oP 'href="(/assets/[^"]+\.css)"' | head -1 | sed 's/href="//;s/"//')

ASSETS_OK=true

if [ -n "$JS_BUNDLE" ]; then
  JS_URL="$URL$JS_BUNDLE"
  JS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" -A "Mozilla/5.0 (Health Check)" "$JS_URL")

  if [ "$JS_CODE" == "200" ]; then
    log_info "[OK] JS bundle accessible (HTTP $JS_CODE)"
  else
    log_info "[X] JS bundle failed (HTTP $JS_CODE)"
    ASSETS_OK=false
  fi
else
  log_info "[X] No JS bundle found in HTML"
  ASSETS_OK=false
fi

if [ -n "$CSS_BUNDLE" ]; then
  CSS_URL="$URL$CSS_BUNDLE"
  CSS_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time "$TIMEOUT" -A "Mozilla/5.0 (Health Check)" "$CSS_URL")

  if [ "$CSS_CODE" == "200" ]; then
    log_info "[OK] CSS bundle accessible (HTTP $CSS_CODE)"
  else
    log_info "[X] CSS bundle failed (HTTP $CSS_CODE)"
    ASSETS_OK=false
  fi
else
  log_info "[X] No CSS bundle found in HTML"
  ASSETS_OK=false
fi

if [ "$ASSETS_OK" = true ]; then
  log_success "All assets load correctly"
else
  log_fail "Assets failed" "One or more assets not found or inaccessible"
fi
echo ""

# ============================================================
# Check 4/7: X-Robots-Tag HTTP Header
# ============================================================
log_check "4" "X-Robots-Tag HTTP Header"

# Fetch robots header with retry (header absence is valid, so we retry only on curl failure)
fetch_robots_header_with_retry() {
  local url="$1"
  local attempt=1
  local headers

  while [ "$attempt" -le "$MAX_RETRIES" ]; do
    headers=$(curl -sI --max-time "$TIMEOUT" "$url" 2>/dev/null)

    # If we got headers (even if X-Robots-Tag is absent), that's success
    if [ -n "$headers" ]; then
      echo "$headers" | grep -i "^x-robots-tag:" | cut -d' ' -f2- | tr -d '\r'
      return 0
    fi

    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
      sleep "$RETRY_DELAY"
    fi

    attempt=$((attempt + 1))
  done

  echo ""
  return 1
}

ROBOTS_HEADER=$(fetch_robots_header_with_retry "$URL")

if [[ "$ENV" == "dev" || "$ENV" == "stg" ]]; then
  # dev and stg should have noindex header
  if [ -n "$ROBOTS_HEADER" ] && echo "$ROBOTS_HEADER" | grep -qi "noindex"; then
    log_success "Header present: $ROBOTS_HEADER"
  else
    log_fail "X-Robots-Tag missing or incorrect" "Expected 'noindex' in $ENV environment"
  fi
else
  # prod should NOT have noindex header
  if [ -z "$ROBOTS_HEADER" ] || ! echo "$ROBOTS_HEADER" | grep -qi "noindex"; then
    log_success "Header correctly absent or allows indexing"
  else
    log_fail "Unexpected noindex in prod" "Found: $ROBOTS_HEADER"
  fi
fi
echo ""

# ============================================================
# Check 5/7: robots.txt Configuration
# ============================================================
log_check "5" "robots.txt Configuration"

# Fetch robots.txt with retry
fetch_robots_txt_with_retry() {
  local url="$1"
  local attempt=1
  local content

  while [ "$attempt" -le "$MAX_RETRIES" ]; do
    content=$(curl -s --max-time "$TIMEOUT" "$url/robots.txt" 2>/dev/null)

    if [ -n "$content" ]; then
      echo "$content"
      return 0
    fi

    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
      sleep "$RETRY_DELAY"
    fi

    attempt=$((attempt + 1))
  done

  echo ""
  return 1
}

ROBOTS_TXT=$(fetch_robots_txt_with_retry "$URL")

if [[ "$ENV" == "dev" || "$ENV" == "stg" ]]; then
  # dev and stg should disallow all
  if echo "$ROBOTS_TXT" | grep -q "Disallow: /"; then
    log_success "robots.txt blocks crawlers"
    log_info "Content: $(echo "$ROBOTS_TXT" | head -3 | tr '\n' ' | ')"
  else
    log_fail "robots.txt misconfigured" "Missing 'Disallow: /' in $ENV environment"
  fi
else
  # prod should allow all
  if echo "$ROBOTS_TXT" | grep -q "Allow: /"; then
    log_success "robots.txt allows crawlers"
    log_info "Content: $(echo "$ROBOTS_TXT" | head -5 | tr '\n' ' | ')"
  else
    log_fail "robots.txt misconfigured" "Missing 'Allow: /' in prod environment"
  fi
fi
echo ""

# ============================================================
# Check 6/7: HTML Meta Robots Tag
# ============================================================
log_check "6" "HTML Meta Robots Tag"

META_TAG=$(echo "$HTML_CONTENT" | grep -i '<meta.*name="robots"' | head -1)

if [[ "$ENV" == "dev" || "$ENV" == "stg" ]]; then
  # dev and stg should have noindex meta tag
  if [ -n "$META_TAG" ] && echo "$META_TAG" | grep -qi "noindex"; then
    log_success "Meta tag present and correct"
    log_info "Tag: $(echo "$META_TAG" | sed 's/.*content="\([^"]*\)".*/\1/')"
  else
    log_fail "Meta tag missing or incorrect" "Expected noindex in $ENV environment"
  fi
else
  # prod should NOT have noindex meta tag
  if [ -z "$META_TAG" ] || ! echo "$META_TAG" | grep -qi "noindex"; then
    log_success "Meta tag correctly absent or allows indexing"
  else
    log_fail "Unexpected noindex in prod" "Found: $META_TAG"
  fi
fi
echo ""

# ============================================================
# Check 7/7: Performance - Page load time
# ============================================================
log_check "7" "Performance check"

START_TIME=$(date +%s%3N)
curl -s -o /dev/null --max-time "$TIMEOUT" "$URL"
END_TIME=$(date +%s%3N)
LOAD_TIME=$((END_TIME - START_TIME))

if [ "$LOAD_TIME" -lt 3000 ]; then
  log_success "Page loads in ${LOAD_TIME}ms (< 3s)"
elif [ "$LOAD_TIME" -lt 5000 ]; then
  log_success "Page loads in ${LOAD_TIME}ms (acceptable)"
  log_info "Consider optimization if this is consistent"
else
  log_fail "Slow page load" "${LOAD_TIME}ms (> 5s threshold)"
fi
echo ""

# ============================================================
# Print summary
# ============================================================
echo "============================================================"
echo "Health Check Summary"
echo "============================================================"
log_info "URL: $URL"
log_info "Environment: $ENV"
log_info "Total checks: $TOTAL_CHECKS"
echo -e "  ${GREEN}Passed: $PASSED${NC}"
echo -e "  ${RED}Failed: $FAILED${NC}"
echo "============================================================"

if [ "$FAILED" -eq 0 ]; then
  echo -e "${GREEN}[OK] All health checks passed${NC}"
  echo "============================================================"
  exit 0
else
  echo -e "${RED}[X] $FAILED check(s) failed${NC}"
  echo ""
  echo "Failed checks:"
  for i in "${!FAILED_CHECKS[@]}"; do
    echo "  $((i+1)). ${FAILED_CHECKS[$i]}"
  done
  echo "============================================================"
  exit 1
fi
