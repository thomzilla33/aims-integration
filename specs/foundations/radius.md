# Foundations · Radius

| Token | px | Use |
|---|---|---|
| `--r6` | 6 | inputs, selects, small controls, chips, mini-badges |
| `--r8` | 8 | buttons, in-list cards, segmented controls |
| `--r12` | 12 | cards, panels, modals, slideout sections |
| `--ds-radius-pill` | 999 | pills, status badges, avatars, toggle tracks |

## Rules
- Nested corners: inner radius ≤ outer (e.g. a `--r6` chip inside a `--r12` card).
- Pills/avatars always `--ds-radius-pill`, never a large px.
- Don't introduce new radius values — reuse the four above.
