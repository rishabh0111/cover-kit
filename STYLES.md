# Cover styles

Thirteen styles for an animated post cover. Pick one per post by its content,
then check the calendar so the feed never shows the same shape twice in a row.
Open `styles/gallery.html` to see every style animating, and the upcoming
posts as a feed (`node check-rotation.js --plan --feed` refreshes that feed).

Why there are several: covers that all share one template teach followers to
recognise the shape before reading it, and people skip what looks like
something they have already dismissed (NN/g banner-blindness studies; ad
"creative fatigue" data says the same, though that is ads, not organic posts).
Each style therefore has its own ground, so two consecutive covers differ at
thumbnail size before anyone reads a word. The brand mark stays constant.

| Style | Template | Ground | Use when the post… | Word budget |
|---|---|---|---|---|
| `flow` | `bbg.html` | white | has a mechanism with several moving parts | dense by design |
| `terminal` | `styles/terminal.html` | near-black | turns on one query, config, snippet or printed output | ≤ 10 code lines |
| `diff` | `styles/diff.html` | pale grey, white window | is one code change: a refactor, a bug fix, a config change | ≤ 12 diff lines |
| `bignumber` | `styles/bignumber.html` | electric blue | is one number: a measurement, an estimate, a before → after | 1 number + ≤ 6 words |
| `chart` | `styles/chart.html` | cream paper | is a trade-off curve, sweep or operating point | title + 2 axis labels |
| `versus` | `styles/versus.html` | split, slanted | compares two options, neither wrong | ≤ 5 rows × ≤ 5 words |
| `compare` | `styles/compare.html` | teal, white card | compares 3–4 options, or benchmarks / ranks them | ≤ 5 rows × ≤ 4 words, or 1 bar per option |
| `sketch` | `styles/sketch.html` | whiteboard | is a mental model, or redraws a picture people learned wrong | ≤ 6 labels |
| `poster` | `styles/poster.html` | yellow | states an opinion, rule or myth-bust | ≤ 8 words |
| `sequence` | `styles/sequence.html` | navy blueprint | depends on order: requests, retries, races, handshakes | ≤ 7 messages |
| `anatomy` | `styles/anatomy.html` | cream, neo-brutalist | takes one artefact apart: an ID, a token, a URL | ≤ 4 parts |
| `list` | `styles/list.html` | coral | is a list: "5 lessons", "7 mistakes", a checklist | ≤ 6 items × ≤ 6 words |
| `timeline` | `styles/timeline.html` | aubergine | happens over dates: an evolution, a migration, an incident | ≤ 6 events |

`flow` is documented in `README.md` and measured in `STYLE.md`. Each file in
`styles/` documents its own spec keys in its header comment, and
`styles/samples/<style>/cover.json` is a working spec to copy.

## Choosing

Take the first yes:

1. Is the post **one number**? → `bignumber` (`chart` if it only makes sense on a curve)
2. **One piece of code or output**? → `terminal` (**one change to code**, before → after? → `diff`)
3. Is **order** the point? → `sequence` between actors, `timeline` across dates
4. **One artefact's structure**? → `anatomy`
5. **A vs B**? → `versus`; **3–4 options, or a benchmark**? → `compare`
6. **A list** of lessons, mistakes or steps? → `list` (redact the one worth clicking for)
7. **An opinion or rule** in 8 words? → `poster`
8. **A model to redraw**? → `sketch`
9. Several parts interacting → `flow`

If the rotation check rejects it, take the second-best fit.

## Rotation

```
node check-rotation.js [covers/]       what the cover.json files say
node check-rotation.js --plan           overlay covers/rotation.json (planned styles for covers not redrawn yet)
node check-rotation.js --plan FILE      ...or a rotation file elsewhere
node check-rotation.js --from 2026-10-01    only enforce from a date (default: today)
```

- **hard** (exit 1): same style as either of the two posts before it
- **soft**: same ground tone as the post before it (`split` never clashes)
- **soft**: `flow` more than once in any four posts

A post is any folder named `YYYY-MM-DD-<slug>` that holds a `cover.json`, at
any depth under the covers folder. `rotation.json` maps each upcoming slug to
its planned style and a one-line reason:

```json
{ "my-caching-post": { "style": "flow", "why": "cache-aside then invalidation" } }
```

Move published posts out of the covers folder and they drop out of the check. `--feed` also writes `styles/feed.js`, the list the gallery's feed
section draws. When a post's cover is redrawn in its planned style, the
`cover.json` carries `"style"` itself and the entry is just a record.

## Motion, per style

Every style starts moving in the first ~0.5 s. Attention goes to where motion
starts, not to motion that was already running. Frame 0 is still a finished
composition, which is what LinkedIn (and most feeds) show if a GIF freezes.

- **terminal** — sweeps the focus line. Its `rows` panel shows actors claiming
  table rows, with later actors visibly skipping locked ones. An `output` panel
  clears mid-loop and types its lines back in, in order, behind a cursor.
- **diff** — strikes each removed line in turn, then dims them; each added
  line wipes in (green tint sweeps left → right, the code types in behind it
  with a caret); the `+N −M` pill counts along; then holds.
- **bignumber** — rolls through each `steps[]` value while the stepper fills,
  then holds on the last step.
- **chart** — a cursor sweeps the curve with live readouts and settles on `mark`.
- **versus** — the VS badge punches in, then each row lights left, then right.
- **compare** — `rows`: a highlight walks the table row by row; in each row
  the `best` cell punches with an accent ring and the ✓ / ✗ / ~ marks redraw.
  `bars`: the bars drop to zero, then regrow one by one while their numbers
  count up; the winner's badge punches in, then holds.
- **sketch** — hand jitter re-rolls every 3 frames (line boil). An eraser wipes
  the `anno: true` layer, and a marker redraws it, following the tip.
- **poster** — the `strike` bar retracts and redraws, the `invert` line stamps
  in, and the asterisk turns one symmetry period per loop.
- **sequence** — a packet walks each message in order. `meters` count while
  their message is in flight.
- **anatomy** — bit parts go live: the `counter` ticks, the `time` part rolls
  over and resets it, and the assembled value is recomputed from the bits.
- **list** — an ink bar walks the rows in order, flipping each to paper on
  ink; marks punch as their row lights, and a `redact` bar shimmers.
- **timeline** — the spine drains and refills to `now`, each dot popping as
  the line reaches it; the `now` dot keeps a ring pulsing.

## Shared by every style

- 1200 × 1200, 140 frames at 20 fps, the same GIF palette pass. The samples are
  under 2 MB.
- The page contract from `bbg.html`: `window.SPEC`, `__ready`, `__overlaps`,
  `setFrame(i, n)`, with every frame a pure function of `t = i / n`.
  `styles/base.js` holds the shared parts: fonts, brand mark, fit and wrap, the
  overlap check, and easing. It builds only after fonts load, so every
  measurement uses the real font.
- Colours: every style reads `ground`, `ink` and `accent` from the spec, or
  from a `palette.json` (see `palette.js` and the README), falling back to its
  own. A palette accent that fails contrast on a style's ground is skipped.
- `OVERLAPS:` from the build means the spec collides. Fix the spec. Decorative
  text is exempt via `class="free"`, and parts of one label share a `data-g`.
- Fonts in `fonts/`, all SIL OFL 1.1, each file carrying its own copyright:
  Atkinson Hyperlegible and Anton, plus JetBrains Mono, Space Grotesk, Caveat
  and Instrument Serif (italic).

## Building and iterating

```
./build-covers.sh covers/<date>-<slug>   a post (its cover.json names the style)
./build-covers.sh covers/ caching        every cover under covers/ whose path contains "caching"
./build-covers.sh --samples [style]      the samples in styles/samples/ (+ poster.png)
PNG=1 ./build-covers.sh covers/…         also write cover.png, frame 0 as a still
./peek.sh covers/<date>-<slug>           20-frame render, six frames tiled to peek.png
./peek.sh --samples <style>
```

## Caveats

- Sample specs are worked examples, not data. Before shipping a `chart` or
  `bignumber` cover, take every value from the post itself.
- The LinkedIn help page caps GIFs at "500 frames or 36,152,320 pixels". Read
  as total pixels across frames, 1200² would allow only ~25 frames. In
  practice 140-frame 1200² covers have posted and animated fine.
- Not built: a comic/zine style (needs drawn characters) and a checklist
  posted as a PDF document post (a different post type, not a cover).
