# Foundations · Motion

| Token | Value | Use |
|---|---|---|
| `--ds-dur-fast` | 120ms | micro-interactions: hover, chip toggle, small state |
| `--ds-dur-normal` | 200ms | standard: dropdowns, tab switch, fades |
| `--ds-dur-slow` | 280ms | overlays: slideout/modal enter, spotlight move |
| `--ds-ease-standard` | `cubic-bezier(.4,0,.2,1)` | most transitions |
| `--ds-ease-emphasized` | `cubic-bezier(.34,1.56,.64,1)` | playful entrances (popover, FAB) |

## Rules
- Transition only `transform` / `opacity` / `color` / `background` / `border-color`
  where possible — avoid animating layout (`width`/`height`/`top`).
- Respect `@media (prefers-reduced-motion: reduce)`: disable pulses and non-essential
  transitions (see the demo-tour styles for the pattern).
- Keep durations on the three-step scale; don't hand-pick ms values.
