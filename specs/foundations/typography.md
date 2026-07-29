# Foundations · Typography

Font: **Inter** (`--font-sans`); monospace `--font-mono` for internal names / code.

## Type scale
| Token | px | Use |
|---|---|---|
| `--ds-text-xs` | 11 | eyebrow labels, meta, badges |
| `--ds-text-sm` | 12 | captions, secondary meta |
| `--ds-text-base` | 13 | body / descriptions (default) |
| `--ds-text-md` | 14 | list-row titles, inputs |
| `--ds-text-lg` | 16 | card titles, section headers |
| `--ds-text-xl` | 20 | detail-page H1 |
| `--ds-text-2xl` | 24 | key-metric values |

## Weights
| Token | Value | Use |
|---|---|---|
| `--ds-fw-regular` | 400 | body |
| `--ds-fw-medium` | 500 | emphasized body, chips |
| `--ds-fw-semibold` | 600 | titles, labels, buttons |
| `--ds-fw-bold` | 700 | metric values, eyebrow labels |

## Line-height
`--ds-lh-tight` 1.3 (titles) · `--ds-lh-normal` 1.5 (UI) · `--ds-lh-relaxed` 1.6 (prose).

## Rules
- Uppercase eyebrow labels: `--ds-text-xs`, `--ds-fw-semibold`, letter-spacing .04em, color `--t3`.
- Internal names / codes: `--font-mono`, `--ds-text-sm`, color `--t2`.
