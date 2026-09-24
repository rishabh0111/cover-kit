# Shared by build-covers.sh and peek.sh: turn the command line into a list of
# absolute cover.json paths in "specs". Sourced, not run.
#   find_specs [path…] [filter…]   a path is a cover.json or a folder searched for them;
#                                  any other word keeps only specs whose path contains it
#   find_samples [style…]          styles/samples/<style>/cover.json (all when none given)

find_specs() {
  local roots=() filters=() a
  for a in "$@"; do
    if [ -e "$a" ]; then roots+=("$(cd "$(dirname "$a")" && pwd)/$(basename "$a")"); else filters+=("$a"); fi
  done
  [ ${#roots[@]} -gt 0 ] || roots=("$(pwd)/${COVERS_DIR:-covers}")
  specs=()
  local r s q
  for r in "${roots[@]}"; do
    if [ -f "$r" ]; then specs+=("$r")
    elif [ -d "$r" ]; then while IFS= read -r s; do specs+=("$s"); done < <(find "$r" -name cover.json -not -path "*/node_modules/*" | sort)
    else echo "no such path: $r" >&2; exit 1; fi
  done
  if [ ${#filters[@]} -gt 0 ]; then
    local keep=()
    for s in "${specs[@]}"; do for q in "${filters[@]}"; do [[ "$s" == *"$q"* ]] && keep+=("$s") && break; done; done
    specs=("${keep[@]+"${keep[@]}"}")
  fi
  [ ${#specs[@]} -gt 0 ] || { echo "no cover.json matched" >&2; exit 1; }
}

find_samples() {
  local s; specs=()
  if [ $# -eq 0 ]; then for s in "$here"/styles/samples/*/cover.json; do specs+=("$s"); done
  else for s in "$@"; do specs+=("$here/styles/samples/$s/cover.json"); done; fi
  for s in "${specs[@]}"; do [ -f "$s" ] || { echo "no sample: $s" >&2; exit 1; }; done
}
