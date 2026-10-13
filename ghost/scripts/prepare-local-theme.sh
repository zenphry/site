#!/usr/bin/env sh
set -eu

theme_dir=ghost/.local/ghost/themes/zenphry
backup_dir=ghost/.local/theme-backups

mkdir -p "$backup_dir"
if [ -d "$theme_dir" ]; then
  mv "$theme_dir" "$backup_dir/zenphry-$(date +%Y%m%d%H%M%S)"
fi
mkdir -p "$theme_dir"
cp -R ghost/theme/. "$theme_dir/"
echo "Copied the Zenphry theme into local Ghost content."
