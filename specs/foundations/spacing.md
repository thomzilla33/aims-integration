# Foundations · Spacing

4px base, 8 steps: `--space-1`…`--space-8` = 4/8/12/16/20/24/32/48px.

## When to tokenize
- **Tokenize** `padding`, `margin`, `gap` values that land on the scale.
- **Leave raw** one-off layout values: fixed widths, absolute positions,
  `viewBox`/SVG coordinates, hairline `1px` borders, and non-scale sizes. Forcing
  these into tokens hurts readability — this project has ~14k such px and most
  are genuine one-offs.

## Common patterns
| Context | Token |
|---|---|
| Icon ↔ label gap | `--space-1` (4) / `--space-2` (8) |
| Chip / pill padding | `--space-2` (8) |
| Control padding, row gap | `--space-3` (12) |
| Card / panel padding | `--space-4` (16) / `--space-5` (20) |
| Section spacing | `--space-6` (24) / `--space-7` (32) |

## Do / Don't
| ✅ | ❌ |
|---|---|
| `gap: var(--space-2)` | `gap: 8px` (when 8 is a rhythm value) |
| `left: 132px` (diagram node) | forcing `left` onto the scale |
