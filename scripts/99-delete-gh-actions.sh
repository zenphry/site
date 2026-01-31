#!/bin/zsh

# Get repo name with owner

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)

echo "Deleting all GitHub Actions caches..."

# Delete all caches

gh actions-cache list | awk '{print $1}' | xargs -n1 -I{} gh actions-cache delete {} --confirm && echo "All caches deleted."

echo "Deleting all GitHub Actions artifacts..."

# Delete all artifacts (paginated)

gh api -H "Accept: application/vnd.github+json" "/repos/$REPO/actions/artifacts?per_page=100" --paginate --jq '.artifacts[] | {name: .name, id: .id}' | while read -r line; do
id=$(echo $line | jq -r '.id')
name=$(echo $line | jq -r '.name')
gh api -X DELETE -H "Accept: application/vnd.github+json" "/repos/$REPO/actions/artifacts/$id" && echo "Deleted artifact: $name ($id)"
done

echo "Done. All caches and artifacts cleared."

