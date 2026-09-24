# The ByteByteGo look, quantified

Two reference frames were pulled apart frame-by-frame (90 frames @ 33 fps,
2.7 s seamless loop, animated WebP) to find out what actually makes them read
as "ByteByteGo". This is the rubric the covers are judged against.

## Structure

- **Flat ground.** Pure white or near-black (#0A0A0A). No vignette, no dot grid.
- **Title band.** Vertical accent bar + bold title (~5% of canvas height),
  brand mark top-right. Title is static.
- **Cards in a bento grid.** Rounded rects (rx ~24), thin border, faint lift.
  A numbered **pill sits on the card's top edge** with `N  LABEL` in white
  uppercase. Cards are *full*: icons, labels, chips, a caption line at the
  bottom. No card is more than ~25% empty.
- **Sub-groups.** Dashed rounded outline with a label chip on its border
  ("Agent Loop"), or a boxed group with a tinted title strip ("Knowledge Base").
- **Chips.** Small rounded pills for sub-items: tinted fill + matching border.

## Icons

- **Filled, 2–3 tone, dark outline** (Flaticon "lineal-color" look), ~75–90 px
  on a 1600 canvas, i.e. ~6% of the width. Never thin single-stroke glyphs.
- Bold label under each icon (~1.2% of canvas height); optional muted sub-label.

## Connectors

- **High-contrast dashed** (black on white, white on black), 2 px, ~8/6 dash,
  **open chevron arrowheads**.
- **Edge labels** in the card's accent colour, often with a numbered circle
  badge (1, 2, 3…) to give a reading order.
- **Orthogonal elbow routing between cards**; straight within a lane; arcs for
  loops with the label set along the arc.

## Motion (the signature)

1. **Every dash marches** toward its arrowhead, continuously, ~1 dash period
   per 0.3 s.
2. **Hero icons micro-animate** — a target's arrow flies out and re-strikes
   with a sparkle burst; a magnifier circles a document; a wrench has orbiting
   sparkles; an eye's stars twinkle; a document's arrows press inward. Small,
   looping, always at the icon's own centre.
3. **Faint sheen** across header pills / wordmark.
4. Text never moves. Nothing pops in/out. Frame 1 is a finished composition.

## Density

Reference 1 has ~40 icons and ~60 labels; reference 2 has ~20 icons, ~30
labels, 12 chips. The density is what makes the image feel worth saving.
A cover with seven nodes and two captions reads as a slide, not a poster.

## Scoring rubric (0–10 each)

| Axis | 10 looks like |
|---|---|
| Icon quality | Filled, multi-tone, outlined, ~6% of width, recognisable at 300 px |
| Card fullness | Every card is a composition: nodes, labels, chips, caption |
| Connector craft | High contrast, chevrons, numbered edge labels, elbow routing |
| Motion | Marching dashes + ≥3 distinct icon micro-animations + a data packet |
| Readability | A junior follows the flow in 5 s at 400 px; no jargon without a label |
| Hook | Title states the topic, cover leaves the payoff in the post |
| Loop | Seamless; frame 1 = frame N+1; no pop-in |
