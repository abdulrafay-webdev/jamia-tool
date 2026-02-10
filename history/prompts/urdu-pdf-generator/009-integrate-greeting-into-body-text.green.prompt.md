---
id: 009
title: integrate greeting into body text
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

I am generating Urdu PDFs in a Next.js app.Currently:"محترم جناب {{NAME}}" appears like a heading or separate title.I want to FIX this.REQUIREMENT:1) "محترم جناب {{NAME}}" must NOT be a heading.2) It must use the SAME font size as the body text.3) It must look like part of the letter body.4) Only ONE line gap after it.5) Then the rest of the application starts.LAYOUT RULE:- Start letter content like:محترم جناب {{NAME}}السلام علیکم ورحمتہ اللہ و برکاته...- No bold styling.- No larger font size.- No special alignment.- Same font family.- Same line height.TECHNICAL:If using HTML/Puppeteer:- Remove heading tags (h1/h2).- Use normal <p>.- margin-bottom: one line only.If using react-pdf:- Use same Text style as body.- Add marginBottom equal to one line.If using pdf-lib:- Use same font size.- Reduce vertical spacing.- Treat it as first line of paragraph.IMPORTANT:- Maintain RTL layout.- Keep text flow natural like a real Urdu letter.DELIVER:- Updated layout logic.- Correct styling example.

## Response snapshot

Integrated the greeting "محترم جناب {{NAME}}" into the main letter body. Removed the bold heading style and ensured it uses the same font size (12pt) and line height as the rest of the text, with a single line gap before the application content starts.

## Outcome

- ✅ Impact: Letter layout is now more natural and professional.
- 📁 Files: src/app/api/pdf/route.ts
- 🧠 Reflection: Moving the greeting into the content container and applying consistent CSS ensures a unified look.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
