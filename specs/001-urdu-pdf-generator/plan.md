# Implementation Plan: Urdu PDF Generator

**Branch**: `001-urdu-pdf-generator` | **Date**: 2026-02-09 | **Spec**: [specs/001-urdu-pdf-generator/spec.md](spec.md)
**Input**: Feature specification from `specs/001-urdu-pdf-generator/spec.md`

## Summary

Build a client-side Next.js application that accepts a comma-separated list of names and generates a single multi-page PDF using `pdf-lib`. Each page will contain a personalized greeting and fixed application text in Urdu, utilizing embedded fonts and RTL layout logic.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 18+
**Primary Dependencies**: Next.js 14+ (App Router), Tailwind CSS, pdf-lib, @pdf-lib/fontkit
**Storage**: N/A (Client-side generation)
**Testing**: Jest (Unit), Playwright (E2E - optional but recommended for visual check)
**Target Platform**: Web (Modern Browsers)
**Project Type**: Web Application (Single Project)
**Performance Goals**: <10s for 50 pages
**Constraints**: Must strictly follow RTL layout and render Urdu ligatures correctly.
**Scale/Scope**: Single feature app, low complexity.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **RTL First**: ✅ Plan explicitly enables RTL globally and in PDF generation.
- **Urdu Font Embedding**: ✅ Plan includes `pdf-lib` font embedding logic.
- **Content Integrity**: ✅ Plan uses a constant `APPLICATION_TEXT` to prevent modification.
- **Page Structure**: ✅ Plan specifies one page per name with mandatory greeting.
- **Combined Output**: ✅ Plan specifies single multi-page PDF.
- **Clean Islamic Design**: ✅ Tailwind CSS will be used for clean, respectful UI.

## Project Structure

### Documentation (this feature)

```text
specs/001-urdu-pdf-generator/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (Internal interfaces)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx       # Global RTL configuration
│   └── page.tsx         # Main UI (Input + Generate Button)
├── lib/
│   └── pdf-generator.ts # Core PDF generation logic (pdf-lib)
├── consts/
│   └── content.ts       # APPLICATION_TEXT constant
├── components/
│   └── ui/              # Basic UI components
└── public/
    └── fonts/           # Urdu font files (e.g., Jameel Noori Nastaliq)
```

**Structure Decision**: Single Next.js App Router project structure for simplicity and modern best practices.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Client-side text shaping (potentially) | `pdf-lib` does not natively support Urdu ligatures. | Server-side generation adds latency/cost; `react-pdf` was not requested (user explicitly asked for `pdf-lib`). |
