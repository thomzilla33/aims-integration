# Component · Button (`.btn`)

**Category:** action · **Status:** stable · **Selectors:** `.btn`, `.btn-primary`, `.btn-danger`

## Overview
Standard action control. **Use** for any click action (Publish, Add, Save, Cancel).
**Don't use** for navigation between pages (use a link/tab) or for toggles (use a segmented control).

## Anatomy
`[optional leading SVG icon] + label`. Height ~34px; icon+label gap `--space-2`.

## Tokens used
| Property | Token |
|---|---|
| default bg / text | transparent / `--t1` |
| default border | `--line` |
| hover bg | `--hover` |
| primary bg / text | `--primary` / white |
| danger text | `--tag-error-fg` |
| radius | `--r8` |
| padding | `--space-2` `--space-3` |
| transition | `--ds-dur-fast` `--ds-ease-standard` |

## Variants
| Class | Use |
|---|---|
| `.btn` | secondary / neutral action |
| `.btn.btn-primary` | the one primary action per view |
| `.btn.btn-danger` | destructive (Remove, Delete) |

## States
default · hover (`--hover` / darken primary) · active · focus (visible ring) ·
disabled (opacity .5, `pointer-events:none`) · loading (spinner, disabled).

## Code example
```html
<button class="btn btn-primary" onclick="openPublish(id)">
  <svg width="13" height="13">…</svg> Publish
</button>
```

## Cross-references
[status-pill](status-pill.md) · [filters](filters.md) · [slideout](slideout.md) (footer actions)
