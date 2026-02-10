# Research: Urdu PDF Generator

**Feature**: Urdu PDF Generator
**Date**: 2026-02-09

## Decision 1: PDF Library Selection
**Decision**: Use `pdf-lib` as requested, but supplement with `bidi-js` (or similar) if text shaping is required.
**Rationale**: 
- User explicitly requested `pdf-lib`.
- `pdf-lib` is fast and works well in the browser.
- **Critical Caveat**: `pdf-lib` draws text as raw unicode. It does NOT perform "shaping" (converting isolated Arabic characters to connected forms: Initial, Medial, Final). 
- **Mitigation**: We must verify if the Urdu font provided has OpenType tables that `fontkit` (used by `pdf-lib`) can read to substitute glyphs, OR we need a pre-processor like `arabic-persian-reshaper` + `bidi-js` to convert "Ali" (unicode) into the visual presentation forms before passing to `pdf-lib`.
- **Refined Plan**: We will try to rely on `fontkit` first. If that fails to join letters, we will use a lightweight reshaper library.

## Decision 2: Font Strategy
**Decision**: Embed a subsetted or full Unicode Urdu font (e.g., Jameel Noori Nastaliq).
**Rationale**: System fonts are unreliable.
**Implementation**: Font file placed in `public/fonts/`. Loaded via `fetch` in the browser and passed to `pdfDoc.embedFont()`.

## Decision 3: Text Direction (RTL)
**Decision**: Use simple X-coordinate calculation for RTL in `pdf-lib`.
**Rationale**: `pdf-lib` coordinate system starts bottom-left. For RTL, we calculate `x = PageWidth - Margin - TextWidth`.
**Alternatives**: Using a layout engine. Rejected to keep it simple as per "step-by-step" plan unless complexity forces otherwise.

## Decision 4: Line Wrapping
**Decision**: Implement a basic custom line-wrapper for the `APPLICATION_TEXT`.
**Rationale**: `pdf-lib` does not auto-wrap text. Since the body text is constant, we might even manually pre-break lines in the constant if dynamic wrapping proves too buggy for mixed Urdu/English, but dynamic wrapping based on page width is safer for different device outputs.

## Open Questions Resolved
- **Q**: Can `pdf-lib` handle Urdu ligatures?
- **A**: Not natively. It needs `fontkit` to support TrueType features, but often complex scripts need explicit shaping. We will assume we need a shaping function.
