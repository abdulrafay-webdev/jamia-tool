---
id: 022
title: Adjust PDF layout, font size, and line spacing
stage: green
date: 2026-02-10
surface: agent
model: gemini-2.0-flash
feature: urdu-pdf-generator
branch: 001-urdu-pdf-generator
user: Yousuf Traders
command: /sp.phr
labels: ["pdf", "styling", "layout", "font-size", "line-spacing"]
links:
  spec: specs/001-urdu-pdf-generator/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/app/api/pdf/route.ts
tests:
 - none
---

## Prompt

top per 6.5cm ka gap do font size 12 karo or line spacing thori or karm karo

## Response snapshot

Adjusted the PDF layout in `src/app/api/pdf/route.ts` by increasing the top margin to 6.5cm, setting the font size to 12pt, and reducing the line spacing to 1.4.

## Outcome

- ✅ Impact: Refined PDF layout to match letterhead requirements and improved content density.
- 🧪 Tests: none
- 📁 Files: src/app/api/pdf/route.ts
- 🔁 Next prompts: none
- 🧠 Reflection: Iterative styling based on visual requirements for the printed output.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): none
