---
id: 016
title: reduce empty line spacing
stage: green
date: 2026-02-09
surface: agent
model: gemini-2.0-flash
feature: urdu-pdf-generator
branch: 001-urdu-pdf-generator
user: Yousuf Traders
command: /sp.implement
labels: ["layout", "pdf", "css", "typography"]
links:
  spec: specs/001-urdu-pdf-generator/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/app/api/pdf/route.ts
tests:
 - (none)
---

## Prompt

or content may baghair text wali jo lines hain unka line spacing or am karo

## Response snapshot

Implemented a line mapper in the PDF generation logic to detect empty lines and apply a significantly reduced line-height (0.5) to them. This creates a tighter, more professional layout by reducing the vertical gaps between paragraphs.

## Outcome

- ✅ Impact: Improved vertical rhythm and space efficiency.
- 📁 Files: src/app/api/pdf/route.ts
- 🧠 Reflection: Processing the text on the server before rendering to HTML allows for fine-grained control over specific line types (text vs empty).

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
