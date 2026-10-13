#!/bin/sh

set -eu

script_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
ghost_dir=$(CDPATH= cd -- "$script_dir/.." && pwd)
theme_dir="$ghost_dir/theme"
output_dir="$ghost_dir/content/export"
archive="$output_dir/zenphry-ghost-theme.zip"

if ! command -v zip >/dev/null 2>&1; then
  echo "zip is required to package the Ghost theme" >&2
  exit 1
fi

mkdir -p "$output_dir"
rm -f "$archive"

(
  cd "$theme_dir"
  zip -qr "$archive" . -x '*.DS_Store'
)

echo "Packaged Ghost theme at $archive"
