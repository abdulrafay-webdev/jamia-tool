---
id: 011
title: reduce line spacing in pdf
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

set hay but extra line spacing khatam karo or line spacing ka size thora chota karo

## Response snapshot

Reduced the line-height from 2.2 to 1.6 and decreased the margin between the greeting and body text to create a more compact and professional layout as requested.

## Outcome

- ✅ Impact: PDF text is now more compact and follows user's spacing preferences.
- 📁 Files: src/app/api/pdf/route.ts
- 🧠 Reflection: Adjusting line-height is crucial for Nastaliq script to balance between readability and space efficiency.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
