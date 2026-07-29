# Token Reference — master map

The canonical **Layer 2** semantic aliases (defined in [`../../tokens.css`](../../tokens.css)).
Components reference **only** these. Values shown resolve through Layer 1 (`--ds-*`)
primitives; the light column is the `.theme-light` override.

> Rule: in any component rule, a color / spacing / radius / shadow / z-index /
> duration must be `var(--<layer-2-token>)`. Never a raw literal, never `--ds-*`.

## Text

| Token | Dark | Light | Use for |
|---|---|---|---|
| `--t1` | white 90% | `#1a1a1a` | Primary text: titles, values, active labels |
| `--t2` | white 60% | `#2a2a2a` | Body / secondary text, descriptions |
| `--t3` | white 30% | `#475569` | Tertiary: captions, meta, muted labels |
| `--muted` | white 5% | slate 3% | Faint fills / de-emphasized surfaces |
| `--field-placeholder` | white 30% | `#475569` | Input placeholder text |
| `--field-text-error` | `#ff6467` | `#5f2120` | Inline validation / error text |

## Surfaces & background

| Token | Dark | Light | Use for |
|---|---|---|---|
| `--surface` | `#0b1120` | light canvas | App/page background |
| `--surface-raised` | `#131C2E` | `#EBF2FF` | Raised panels, popovers |
| `--card-bg` | `#ffffff`\* | `#ffffff` | Card / list-row / detail-panel background |
| `--field-bg` | white 10% | `#ffffff` | Input / select background |
| `--hover` | white 4% | slate 3% | Row / control hover state |

\* several dark surfaces intentionally use white-on-glass; confirm per component.

## Borders

| Token | Dark | Light | Use for |
|---|---|---|---|
| `--line` | white 10% | slate 14% | Default dividers, hairlines |
| `--line-strong` | field-border-hover | — | Emphasis dividers, focused field border |
| `--card-border` | slate 8% | slate 8% | Card / panel border |
| `--field-border` | white 10% | slate 14% | Input / select border |

## Brand & interactive

| Token | Value | Use for |
|---|---|---|
| `--primary` | `#2b7fff` (`#2173ff` light) | Primary buttons, active tab underline, links |
| `--accent` | primary @ 15% | Selected/active tints, focus wash |
| `--cyan` | `#38bdf8` (`#0284c7` light) | Demo/tour accent, decorative highlights |

## Status (tags / pills / badges)

| Token | Dark fg/bg | Use for |
|---|---|---|
| `--tag-informative-fg` / `-bg` / `-bd` | white 80% / blue 15% / `#2b7fff` | Neutral/info status, "Intra-model", type chips |
| `--tag-success-fg` / `-bg` | `#6ee7b7` / `#0a1f1a` | Published, success, "NEW" |
| `--tag-error-fg` / `-bg` / `-bd` | `#ff6467` / `#2d1515` | Errors, destructive, deprecated |
| `--tag-alert-fg` | `#fcd34d` | Warnings, pending, "read-only" |

## Spacing (8-step, 4px base)

| Token | px | Typical use |
|---|---|---|
| `--space-1` | 4 | icon gaps, tight insets |
| `--space-2` | 8 | chip padding, small gaps |
| `--space-3` | 12 | control padding, row gaps |
| `--space-4` | 16 | card padding, section gaps |
| `--space-5` | 20 | panel padding |
| `--space-6` | 24 | section spacing |
| `--space-7` | 32 | large section spacing |
| `--space-8` | 48 | page-level rhythm |

> One-off layout px (widths, absolute positions, SVG coords) are **not** required
> to be tokens — only padding/margin/gap values that land on the scale.

## Radius

| Token | px | Use |
|---|---|---|
| `--r6` | 6 | inputs, small controls, chips |
| `--r8` | 8 | buttons, cards-in-list |
| `--r12` | 12 | cards, panels, modals |
| `--ds-radius-pill` | 999 | pills, avatars, toggles |

## Elevation · Z-index · Motion

| Token | Value | Use |
|---|---|---|
| `--ds-shadow-1/2/3` | sm / md / lg | resting / raised / overlay |
| `--ds-z-dropdown` `--ds-z-scrim` `--ds-z-slideout` `--ds-z-modal` `--ds-z-toast` | 50 / 100 / 150 / 200 / 300 | stacking order |
| `--ds-dur-fast/normal/slow` | 120 / 200 / 280ms | micro / standard / overlay transitions |
| `--ds-ease-standard` / `--ds-ease-emphasized` | — | default / spring easing |
