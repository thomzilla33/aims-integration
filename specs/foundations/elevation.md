# Foundations · Elevation

Shadows signal stacking distance; pair with the z-index scale.

| Token | Value | Use for | Z pairing |
|---|---|---|---|
| `--ds-shadow-1` | `0 1px 2px rgba(0,0,0,.20)` | resting cards, hover lift | `--ds-z-base` |
| `--ds-shadow-2` | `0 4px 12px rgba(0,0,0,.28)` | dropdowns, popovers, kebab menus | `--ds-z-dropdown` |
| `--ds-shadow-3` | `0 16px 48px rgba(0,0,0,.55)` | slideouts, modals, toasts | `--ds-z-slideout`+ |

## Z-index scale
`--ds-z-base` 1 · `--ds-z-sticky` 10 · `--ds-z-dropdown` 50 · `--ds-z-scrim` 100 ·
`--ds-z-slideout` 150 · `--ds-z-modal` 200 · `--ds-z-toast` 300.

## Rules
- Never invent a raw `z-index` — pick the nearest scale token so overlays stack
  predictably (toast over modal over slideout over scrim over dropdown).
- Light theme softens shadow tint via `--shadow-tint`.
