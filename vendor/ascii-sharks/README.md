# ascii-sharks (vendored)

Fish and sharks drawn as ASCII on a canvas, by drewdi.

- Source: https://github.com/stackedlol/ascii-sharks
- Commit: a0074c1
- License: MIT (see `LICENSE`)

The files are a copy of the upstream `src/` directory with two local
additions, both marked "Local addition (not upstream)" in the source:

- `world.ts`: a `WorldOptions` argument with a `"lanes"` patrol, which spreads
  sharks down a tall world and has them patrol the side margins around a
  central content column.
- `renderer.ts`: `AsciiRenderer.scrollRows()`, which slides the wake fields
  when the canvas is a window moving over a taller world.

The package is not published to npm, so it is vendored. To update, replace
these files with the upstream `src/` contents and re-apply the two additions.
