#!/usr/bin/env bash
# Quick look while drawing a cover: render a 20-frame loop and tile six frames
# (frame 0 top-left) into peek.png beside the spec. Gitignored; not the build.
# Needs ImageMagick (magick).
#   ./peek.sh path/to/cover.json     (same path/filter rules as build-covers.sh)
#   ./peek.sh --samples <style>
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
source "$here/lib-specs.sh"
if [ "${1:-}" = "--samples" ]; then shift; find_samples "$@"; else find_specs "$@"; fi
cd "$here"
for spec in "${specs[@]}"; do
  dir="$(dirname "$spec")"; f="$dir/peek.frames"
  node render.js "$spec" "$dir/peek" 20
  magick montage $f/000.png $f/002.png $f/005.png $f/009.png $f/013.png $f/017.png \
    -tile 3x2 -geometry 600x600+6+6 -background '#888' "$dir/peek.png"
  rm -rf "$f"; echo "$dir/peek.png"
done
