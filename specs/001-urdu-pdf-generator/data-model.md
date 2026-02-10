# Data Model: Urdu PDF Generator

**Feature**: Urdu PDF Generator
**Date**: 2026-02-09

## Entities

### Applicant
*Transient (Client-side only)*
| Field | Type | Description |
|-------|------|-------------|
| name | string | The full name of the applicant. Parsed from input list. |

### ApplicationConfig
*Constant / Configuration*
| Field | Type | Description |
|-------|------|-------------|
| applicationText | string | The immutable body text of the application. |
| greetingTemplate | string | Template string: "محترم جناب {{NAME}}" |

### GenerationOptions
*Transient (Client-side)*
| Field | Type | Description |
|-------|------|-------------|
| paperSize | StandardSizes | e.g., A4 (Defined by pdf-lib) |
| margin | number | Page margins in points. |
| fontSize | number | Font size for body text. |

## Validation Rules

1. **Applicant Name**:
   - Must not be empty.
   - Whitespace trimmed.
   - Max length: 100 chars (soft limit for layout safety).

2. **Input List**:
   - Comma-separated string.
   - Empty segments ignored (e.g., "Ali,,Ahmed" -> ["Ali", "Ahmed"]).
