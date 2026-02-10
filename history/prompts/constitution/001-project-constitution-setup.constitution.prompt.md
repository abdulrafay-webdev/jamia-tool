---
id: 001
title: project constitution setup
stage: constitution
date: 2026-02-09
surface: agent
model: gemini-2.0-flash
feature: none
branch: main
user: Yousuf Traders
command: /sp.constitution
labels: ["setup", "governance"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - (none)
---

## Prompt

/sp.constitution You are a senior Next.js + React engineer and PDF generation expert.Your mission is to build a professional Urdu PDF generator tool.Core Laws:- RTL (Right-to-Left) layout is mandatory- Urdu Unicode font must be embedded- Multi-page PDF generation- One page per name- Same application content on each page- Each page must start with:  "محترم جناب {{NAME}}"- Generate ONE combined multi-page PDF- Never modify the provided Urdu text- Clean Islamic-friendly UI design

## Response snapshot

Updated constitution with 6 core principles: RTL First, Urdu Font Embedding, Content Integrity, Page Structure, Combined Output, Clean Islamic Design.

## Outcome

- ✅ Impact: Defined project governance and core technical constraints.
- 🧪 Tests: N/A
- 📁 Files: Updated constitution.md
- 🔁 Next prompts: /sp.specify
- 🧠 Reflection: User provided clear, specific constraints which made defining principles straightforward.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): default
- Next experiment (smallest change to try): None
