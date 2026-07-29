# Foundations · Color

Dark is the default theme; `.theme-light` on `<html>` swaps Layer-1 primitives.

## Principles
- Components reference **semantic** color tokens only (`--t1`, `--primary`,
  `--tag-success-fg`…), never a raw hex/rgba and never a `--ds-*` primitive.
- Meaning drives the token, not the value. White text on a button is `--t1`
  (or a button-specific token) — it is **not** `--card-bg` even though both are
  white.
- Both themes must pass contrast. Muted labels use `--t3`; on light it resolves
  to `#475569` (AA-legible), not the faint `#bababa` some legacy rules still use.

## Palette map (semantic → Layer 1)
- Text: `--t1/--t2/--t3` → `--ds-white-a90/60/30` (light: ink `#1a1a1a`/`#2a2a2a`/`#475569`)
- Brand: `--primary` → `--ds-blue-500`; `--accent` → `--ds-blue-500-a15`
- Status: `--tag-{success,error,alert,informative}-*` → green/red/amber/blue primitives

## Do / Don't
| ✅ | ❌ |
|---|---|
| `color: var(--t2)` | `color: #2a2a2a` |
| `background: var(--tag-success-bg)` | `background: #0a1f1a` |
| `border-color: var(--line)` | `border-color: rgba(255,255,255,.1)` |

See the full map in [`../tokens/token-reference.md`](../tokens/token-reference.md).
