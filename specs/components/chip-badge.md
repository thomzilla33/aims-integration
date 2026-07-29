# Component · Chip & tag (`.chip`, `.tag`, `.erel-scope`, `.erel-comp`)

**Category:** metadata · **Status:** stable

## Overview
Small labeled descriptors attached to an entity/row. **Use** for tags, model
association, entity reference, relationship scope (Intra/Cross-model) and
composition. **Don't use** for status (use [status-pill](status-pill.md)) or as a
primary action.

## Anatomy
`[optional icon] + label`; pill or `--r6` rounding; hairline border optional.

## Tokens used
| Chip | fg | bg | border |
|---|---|---|---|
| `.chip` / `.tag` | `--t2` | `--hover` | `--line` |
| `.chip-model` | `--t2` | `--hover` | `--line` |
| `.erel-scope.intra` | `--t2` | `--hover` | — |
| `.erel-scope.cross` | `--tag-informative-fg` | `--tag-informative-bg` | — |
| `.erel-new` | `--tag-success-fg` | `--tag-success-bg` | — |
Text `--ds-text-xs`, weight `--ds-fw-semibold`, radius `--ds-radius-pill`.

## States
Static. When removable (filter chips), add an `×` control → `--t3`, hover `--t1`.

## Code example
```html
<span class="chip chip-model">▦ Asset Registry</span>
<span class="erel-scope cross">⧉ Cross-model · CRM Core</span>
<span class="tag">operational</span>
```

## Cross-references
[status-pill](status-pill.md) · [filters](filters.md) · [entity-detail](entity-detail.md)
