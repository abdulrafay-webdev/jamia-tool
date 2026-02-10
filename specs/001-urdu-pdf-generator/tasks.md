# Tasks: Urdu PDF Generator

**Input**: Design documents from `specs/001-urdu-pdf-generator/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Tests are excluded as they were not explicitly requested, but manual validation steps are included.

**Organization**: Tasks are grouped by user story to enable independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel
- **[Story]**: [US1] (Bulk PDF), [US2] (Validation)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create Next.js App Router project structure in `src/`
- [ ] T002 Install dependencies: `pdf-lib`, `@pdf-lib/fontkit`, `tailwind-merge`, `clsx`
- [ ] T003 [P] Configure Tailwind CSS with RTL support in `tailwind.config.ts`
- [ ] T004 [P] Configure global RTL layout in `src/app/layout.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T005 Create font directory `public/fonts/` and add placeholder or real Urdu font file
- [ ] T006 Define `APPLICATION_TEXT` and greeting constants in `src/consts/content.ts`
- [ ] T007 Create basic UI shell (Header, Main Container) in `src/app/page.tsx`
- [ ] T008 Implement PDF generation utility skeleton in `src/lib/pdf-generator.ts`

**Checkpoint**: Foundation ready - application runs, constants defined, PDF lib installed.

---

## Phase 3: User Story 1 - Bulk PDF Generation (Priority: P1) 🎯 MVP

**Goal**: Generate a single multi-page PDF from a list of names.

**Independent Test**: Enter names -> Download PDF -> Verify pages and text.

### Implementation for User Story 1

- [ ] T009 [US1] Implement name parsing and trimming logic in `src/lib/utils.ts` (or inline in component)
- [ ] T010 [US1] Implement font embedding logic in `src/lib/pdf-generator.ts`
- [ ] T011 [US1] Implement single-page generation logic (Text placement, RTL X-coord calculation) in `src/lib/pdf-generator.ts`
- [ ] T012 [US1] Implement multi-page loop and document assembly in `src/lib/pdf-generator.ts`
- [ ] T013 [US1] Add Text Area input and "Generate PDF" button to `src/app/page.tsx`
- [ ] T014 [US1] Connect UI to PDF generator function and handle download in `src/app/page.tsx`

**Checkpoint**: MVP Complete. User can generate PDFs.

---

## Phase 4: User Story 2 - Empty/Invalid Input Handling (Priority: P2)

**Goal**: Prevent errors and handle invalid input gracefully.

**Independent Test**: Enter empty string -> See error. Enter messy string -> See clean names.

### Implementation for User Story 2

- [ ] T015 [US2] Add client-side validation for empty input in `src/app/page.tsx`
- [ ] T016 [US2] Add UI feedback (Error message / Toast) for empty input in `src/app/page.tsx`
- [ ] T017 [US2] Enhance name parser to filter empty strings and handle whitespace in `src/lib/utils.ts`

**Checkpoint**: Robust input handling added.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect quality and compliance

- [ ] T018 Verify Urdu font rendering and ligatures (Manual Visual Check)
- [ ] T019 Update `specs/001-urdu-pdf-generator/quickstart.md` with font setup instructions
- [ ] T020 Run final build check `npm run build`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately.
- **Foundational (Phase 2)**: Blocks Phase 3.
- **User Story 1 (Phase 3)**: MVP. Blocks nothing but Polish.
- **User Story 2 (Phase 4)**: Can run after Phase 3 (or parallel if independent files, but logic overlaps in `page.tsx`).

### User Story Dependencies

- **US1**: Needs `pdf-generator.ts` skeleton (T008) and constants (T006).
- **US2**: Enhances US1 UI and Logic. Best done after US1 to verify "happy path" first.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup & Foundation (T001-T008)
2. Implement Core Generation Logic (T009-T012)
3. Connect UI (T013-T014)
4. **STOP and VALIDATE**: Generate a real PDF.

### Incremental Delivery

1. MVP (US1) complete.
2. Add Input Validation (US2).
3. Final Polish.
