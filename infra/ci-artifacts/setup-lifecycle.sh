#!/bin/bash
# Setup R2 lifecycle policies for CI artifacts buckets
# Dev: Auto-deletes after 1 day
# Prod: Auto-deletes after 7 days

set -e

echo "=========================================="
echo "Setting up R2 lifecycle policies"
echo "=========================================="
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "ERROR: wrangler CLI not found"
    echo "Install with: npm install -g wrangler"
    exit 1
fi

# Apply to dev bucket (1 day retention)
echo "Applying lifecycle policy to dev bucket (1 day retention)..."
wrangler r2 bucket lifecycle add zenphry-ci-artifacts-dev delete-after-1-day --expire-days 1 --force
echo "✓ Dev bucket lifecycle policy applied"
echo ""

# Apply to prod bucket (7 day retention)
echo "Applying lifecycle policy to prod bucket (7 day retention)..."
wrangler r2 bucket lifecycle add zenphry-ci-artifacts delete-after-7-days --expire-days 7 --force
echo "✓ Prod bucket lifecycle policy applied"
echo ""

echo "=========================================="
echo "Lifecycle policies configured successfully"
echo "=========================================="
echo ""
echo "Retention periods:"
echo "  - Dev:  1 day  (zenphry-ci-artifacts-dev)"
echo "  - Prod: 7 days (zenphry-ci-artifacts)"
echo ""
echo "To verify:"
echo "  wrangler r2 bucket lifecycle list zenphry-ci-artifacts-dev"
echo "  wrangler r2 bucket lifecycle list zenphry-ci-artifacts"
