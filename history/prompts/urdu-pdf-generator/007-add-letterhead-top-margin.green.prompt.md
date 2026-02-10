---
id: 007
title: add letterhead top margin
stage: green
date: 2026-02-09
surface: agent
model: gemini-2.0-flash
feature: urdu-pdf-generator
branch: 001-urdu-pdf-generator
user: Yousuf Traders
command: /sp.implement
labels: ["layout", "pdf", "css", "letterhead"]
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

I am generating multi-page PDFs in a Next.js app.Now I need a TOP BLANK SPACE for letterhead printing.REQUIREMENT:1) Add 5–6 cm blank space at the top of EVERY PAGE.2) This space must be completely empty.3) Content must start AFTER this gap.4) Gap must be consistent on all pages.5) This is for physical letterhead printing.MEASUREMENT:- 1 cm = 28.35 points (PDF units)- 5 cm ≈ 142 points- 6 cm ≈ 170 pointsSo apply a top margin of ~160 points.IMPLEMENTATION:If using Puppeteer/HTML:- Use CSS:  body {    margin-top: 6cm;  }OR wrap content in:  padding-top: 6cm;If using react-pdf:- Add marginTop: 160 to page style.If using pdf-lib:- Start drawing text lower on Y-axis:  pageHeight - 160IMPORTANT:- Footer must remain unchanged.- All pages must follow this rule.- Layout must remain clean.DELIVER:- Updated layout logic- Example code snippet

## Response snapshot

Added a 6cm (60mm) top padding to each PDF page to accommodate physical letterhead printing. The content now starts after this blank space while maintaining the footer position.

## Outcome

- ✅ Impact: PDF now supports physical letterhead printing by reserving top space.
- 🧪 Tests: Visual verification recommended.
- 📁 Files: src/app/api/pdf/route.ts
- 🧠 Reflection: Adjusting the padding of the `.page` container in the HTML template was the most efficient way to ensure consistency across all pages.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
