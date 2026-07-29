# Component · Slideout (`#slideout` / `.so-*`)

**Category:** overlay · **Status:** stable · **Width:** 600px, right-anchored

## Overview
Right-side panel for detail views and forms the user can dismiss without losing
place (preview, create/edit relationship, audit record). **Use** when the user can
keep browsing behind it. **Don't use** for blocking confirmations — use [modal](modal.md).
Max one slideout + one modal open at a time.

## Anatomy
`.so-head` (title + internal subtitle + `.so-close`) · `.so-body` (scrolls; sections
`.so-sec`, field grid `.so-fields`/`.so-field`) · `.so-foot` (actions, primary right,
destructive left).

## Tokens used
| Part | Token |
|---|---|
| panel bg | `--surface-raised` |
| border / divider | `--line` |
| title | `--t1`; subtitle `--t2` mono |
| field label / value | `--t3` / `--t1` |
| shadow / z | `--ds-shadow-3` / `--ds-z-slideout` |
| scrim | `--ds-z-scrim` |
| enter transition | `--ds-dur-slow` `--ds-ease-standard` |

## API
`_soOpen()` opens (adds `.open`, shows scrim) · `closeSlideout()` closes.
Populate `$('slideout').innerHTML` then call `_soOpen()`.

## States
closed (translated off-canvas) · open · form-invalid (field error via `--field-text-error`).

## Code example
```html
<div class="so-head"><div><div class="so-title">Comment</div>
  <div class="so-internal">comment</div></div>
  <button class="so-close" onclick="closeSlideout()">✕</button></div>
<div class="so-body">…<div class="so-fields">
  <div class="so-field"><span class="so-field-l">Owner</span>
    <span class="so-field-v">Sarah Chen</span></div></div></div>
<div class="so-foot"><button class="btn">Cancel</button>
  <button class="btn btn-primary">Save</button></div>
```

## Cross-references
[modal](modal.md) · [button](button.md) · [entity-detail](entity-detail.md)
