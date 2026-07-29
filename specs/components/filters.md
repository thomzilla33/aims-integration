# Component · Filter toolbar (`.tbar`, `.dsf-search`, `dsfDrop()`)

**Category:** input / navigation · **Status:** stable

## Overview
The toolbar above every list: search field + single-select dropdown filters +
optional "Filters" button + view toggle + primary action. **Use** to scope a list.
**Don't use** for free-form data entry (use a form in a [slideout](slideout.md)).

## Anatomy
`.tbar` row: `.dsf-search` (icon + input) · one or more `dsfDrop()` dropdowns
(label + optional applied chip) · `.flt-btn` "Filters" · `.tbar-spring` (flex gap) ·
`viewToggle()` segments · `.btn.btn-primary` action.

## Tokens used
| Part | Token |
|---|---|
| search/input bg / border | `--field-bg` / `--field-border` |
| placeholder | `--field-placeholder` |
| dropdown surface | `--surface-raised`, `--ds-shadow-2`, `--ds-z-dropdown` |
| applied chip | `--tag-informative-*` |
| radius | `--r6` / `--r8` |

## API
- `dsfDrop(id,label,chip,items)` — `items:[{label,selected,onclick,count?}]`;
  `chip:{label,onremove}` shows the applied value.
- `dsfPickSingle()` inside an item's `onclick` enforces single-select.
- Set `_dsfRerender = () => renderX()` so the surface re-renders on change.

## States
idle · focused search · dropdown open · filter applied (chip shown) · cleared.

## Code example
```html
<div class="tbar md-tbar">
  <label class="dsf-search">🔍<input oninput="etSet('search',this.value)"></label>
  ${dsfDrop('etTy','Type',typeChip,[{label:'All types',selected:true,onclick:"dsfPickSingle();etSet('type','all')"}, …])}
  <span class="tbar-spring"></span>
  ${viewToggle(st,'etView')}
  <button class="btn btn-primary">+ Add table</button>
</div>
```

## Cross-references
[tabs](tabs.md) · [pagination](pagination.md) · [list-row](list-row.md)
