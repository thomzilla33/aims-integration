# Component · Status pill (`.st-pill`) & role badge (`.mini-badge`)

**Category:** status · **Status:** stable · **Selectors:** `.st-pill`, `.mini-badge`, `.pii-badge`

## Overview
Compact, non-interactive status/role indicators. **Use** for lifecycle status
(Published/Draft/Pending/Deprecated), table role (Primary/Secondary), and PII flags.
**Don't use** as a button or filter (use a chip/filter for interactive selection).

## Anatomy
`[dot or icon] + short label`, pill radius, uppercase-ish small label.

## Tokens used
| State | fg | bg |
|---|---|---|
| Published / success | `--tag-success-fg` | `--tag-success-bg` |
| Draft / pending | `--tag-alert-fg` | (alert bg) |
| Deprecated / error | `--tag-error-fg` | `--tag-error-bg` |
| Primary role | `--tag-informative-fg` | `--tag-informative-bg` |
| Secondary role | `--t2` | `--hover` |
Radius `--ds-radius-pill` · text `--ds-text-xs` · weight `--ds-fw-semibold`.

## States
Single visual state (informational). The leading dot uses the matching `-fg` token.

## Code example
```html
<span class="st-pill st-published">● Published</span>
<span class="mini-badge mb-primary">Primary</span>
<span class="pii-badge">🔒 PII</span>
```

## Cross-references
[chip-badge](chip-badge.md) · [list-row](list-row.md) · [entity-detail](entity-detail.md)
