<!--
Sync Impact Report:
- Version change: New -> 1.0.0
- Added Principles: RTL First, Urdu Font Embedding, Content Integrity, Page Structure, Combined Output, Design Ethics.
- Templates requiring updates: None (templates are generic, specific constraints apply to content).
-->

# Urdu PDF Generator Constitution

## Core Principles

### I. RTL First (Right-to-Left)
RTL layout is mandatory for all text and UI elements.
Rationale: Urdu is a right-to-left language; incorrect directionality renders the text unreadable and unprofessional.

### II. Urdu Font Embedding
Urdu Unicode font (e.g., Jameel Noori Nastaliq) MUST be embedded in the generated PDF.
Rationale: Relying on system fonts guarantees failure on many devices. Embedding ensures consistent, high-quality rendering everywhere.

### III. Content Integrity (Immutable Text)
The provided Urdu text for the application body MUST NOT be modified, auto-corrected, or summarized.
Rationale: The text contains specific religious or formal phrasing; any alteration risks changing the meaning or tone.

### IV. Page Structure & Personalization
- One page per name.
- Same application content on every page.
- **Mandatory Header**: Each page must start with the greeting "محترم جناب {{NAME}}".
Rationale: This is a strict format requirement for the personalized bulk generation workflow.

### V. Combined Output
The tool MUST generate a SINGLE multi-page PDF file containing all personalized pages.
Rationale: Users need a single file for easy printing and sharing, not a zip file of hundreds of individual PDFs.

### VI. Clean Islamic Design
The UI and generated PDF styling must be clean, respectful, and "Islamic-friendly" (avoiding inappropriate imagery or chaotic layouts).
Rationale: Respects the cultural and religious context of the users and content.

## Governance

### Amendment Process
Changes to these principles require a version bump (MAJOR for removals/redefinitions, MINOR for additions). All changes must be documented in this file.

### Compliance
All architectural decisions, code reviews, and feature specifications must explicitly check against these principles.

**Version**: 1.0.0 | **Ratified**: 2026-02-09 | **Last Amended**: 2026-02-09