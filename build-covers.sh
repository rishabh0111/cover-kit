#!/usr/bin/env bash
# Render cover GIFs. Each spec is a cover.json; the GIF lands beside it as
# cover.gif. The spec's "style" picks the template (see STYLES.md).
#   ./build-covers.sh path/to/cover.json        one spec
#   ./build-covers.sh covers/                   every cover.json under a folder
#   ./build-covers.sh covers/ caching           ...only paths containing "caching"
#   ./build-covers.sh --samples [style…]        the style samples in styles/samples/ (+ poster.png = frame 0)
#   FRAMES=90 ./build-covers.sh …               fewer frames (default 140 = 7 s loop at 20 fps)
# With no path, looks in $COVERS_DIR, else ./covers.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
source "$here/lib-specs.sh"
frames="${FRAMES:-140}"; fps=20; samples=0
if [ "${1:-}" = "--samples" ]; then samples=1; shift; find_samples "$@"; else find_specs "$@"; fi
cd "$here"
for spec in "${specs[@]}"; do
  dir="$(dirname "$spec")"; f="$dir/cover.frames"
  node render.js "$spec" "$dir/cover" "$frames"
  [ $samples = 1 ] && cp "$f/000.png" "$dir/poster.png"
  ffmpeg -y -loglevel error -framerate $fps -i "$f/%03d.png" \
    -vf "palettegen=max_colors=128:stats_mode=diff" "$dir/cover.pal.png"
  ffmpeg -y -loglevel error -framerate $fps -i "$f/%03d.png" -i "$dir/cover.pal.png" \
    -lavfi "paletteuse=dither=bayer:bayer_scale=4" -loop 0 "$dir/cover.gif"
  rm -rf "$f" "$dir/cover.pal.png"
  printf '%8s  %s\n' "$(du -h "$dir/cover.gif" | cut -f1)" "$dir/cover.gif"
done
printf '\nrendered %s cover(s)\n' "${#specs[@]}"
