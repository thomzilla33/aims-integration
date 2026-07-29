# Component · Modal (`#modalScrim` / `.modal`)

**Category:** overlay · **Status:** stable · centered, blocking

## Overview
Centered dialog that **requires** a response — destructive confirmations
(Remove/Delete/Publish) and critical create flows (create custom privilege,
new model). **Use** when the user must stop and decide. **Don't use** for
dismissible detail/browsing — use [slideout](slideout.md). Never nest modals.

## Anatomy
`.modal-head` (colored `.modal-ic` + `.modal-title`) · `.modal-body` (message /
impact list / form) · `.modal-foot` (Cancel left, primary/danger right).

## Tokens used
| Part | Token |
|---|---|
| modal bg | `--surface-raised` / `--card-bg` |
| icon tint (info/danger) | `--tag-informative-*` / `--tag-error-*` |
| title / body | `--t1` / `--t2` |
| shadow / z | `--ds-shadow-3` / `--ds-z-modal` |
| scrim | `--ds-z-scrim` |
| radius | `--r12` |

## API
Set `$('modalScrim').innerHTML` then `.classList.add('open')`; `closeModal()` clears + hides.

## States
open · confirming (primary disabled until valid) · danger (destructive primary `--tag-error-*`).

## Code example
```html
<div class="modal"><div class="modal-head">
  <div class="modal-ic" style="…error tint…">🗑</div>
  <div class="modal-title">Remove “Comment Detail”?</div></div>
  <div class="modal-body">This removes the table from <b>Comment</b>. Can't be undone.</div>
  <div class="modal-foot"><button class="btn" onclick="closeModal()">Cancel</button>
    <button class="btn btn-danger" onclick="…">Remove table</button></div></div>
```

## Cross-references
[slideout](slideout.md) · [button](button.md)
