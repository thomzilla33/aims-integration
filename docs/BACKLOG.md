# Backlog

Deferred work — features that were scoped, decided on, and consciously
postponed. Each entry has enough context for someone (you or a colleague)
to pick it up cold without re-litigating the original decision.

---

## Phase A2 — Multi-source canonical mapping

**Status:** Deferred · **Estimate:** 2-3 hours · **Priority:** Medium

### Why this exists

The v2 Data Studio spec (May 2026), section 3 ("Superficie de Mapeo
Canónico"), requires:

> Editor de Mapeo: Interfaz para seleccionar **múltiples fuentes**,
> definir el nombre de destino en snake_case y añadir transformaciones
> en orden.

The Canonical Mapping work we shipped (Phase A, commit `015bffc`) plus
the spec-compliance pass (commit `c60185f`) close 85% of section 3:

✅ Pipeline visualization (Source → Ops → Target)
✅ 14-op transformation catalog (8 stable + 6 STUB)
✅ STUB amber chips on individual ops
✅ STUB top-of-panel banner when chain contains experimental ops
✅ snake_case target name editor (sanitised on input, persists)
✅ Live before/after preview row
✅ Per-op move/delete via ⋮ menu

The remaining 15% is **multi-source**. Today the data model is
single-source:

```
1 source field  →  [ ops chain ]  →  1 target field
```

Spec asks for:

```
N source fields  →  [ merge strategy ]  →  [ ops chain ]  →  1 target
```

### Why it was deferred

This isn't a UI tweak — it's a structural change to the data model + the
preview simulator + the persistence schema. Doing it at the end of a long
sprint risks half-done state. Worth its own focused session.

The 85% covers ~95% of the demo paths. Single-source pipelines are the
common case. Multi-source is the case that shows up when a user wants to
combine `first_name + last_name → full_name` or coalesce email fields
from two CRMs.

The current STUB banner ("Behavior may change in future releases") is
honest about this gap — `concatenate` today operates on a single source
with a suffix; the multi-source semantic is what the STUB label warns
users about.

### What it would take

#### 1. Data model migration

Current shape (in `aims_ds_field_overrides_v1` localStorage):

```js
{
  '<tableName>': {
    '<fieldName>': {
      canonicalName: 'contact_email',
      transformations: [
        { op: 'trim' },
        { op: 'lowercase' }
      ]
    }
  }
}
```

New shape:

```js
{
  '<tableName>': {
    '<fieldName>': {
      canonicalName: 'full_name',
      sources: [
        { table: '<tableName>', field: 'first_name' },
        { table: '<tableName>', field: 'last_name' }
      ],
      merge: 'concat',                   // | 'pick' | 'coalesce'
      mergeOptions: { separator: ' ' },  // op-specific
      transformations: [
        { op: 'lowercase' }
      ]
    }
  }
}
```

Backward compat: in `loadFieldOverrides`, if `sources` is missing, treat
the historical single-source field as `sources: [{ table, field: <self> }]`
and `merge: 'pick'`. Old data renders identically; new fields use the new
shape.

#### 2. UI changes (`renderTblMappingTab`)

- **Multi-source picker**: `+ Add source field` button below the SOURCE
  node. Opens a small picker listing other fields from the same table.
  Selecting one appends to `sources[]`. Each chip in the source list has
  a remove (×) button.
- **Merge strategy selector**: visible when `sources.length > 1`. A small
  dropdown/segmented control between the source list and the first op:
  - `concat` — join with `separator` (default `' '`)
  - `pick` — use the first source's value
  - `coalesce` — use the first non-null
- **Source node redesign**: change from one cyan card to a stack of
  source chips with field names + a connector logo + a label for which
  source connection each comes from.

#### 3. Simulator update (`transformPreview`)

Today:
```js
transformPreview([{op:'trim'}], '  Foo  ')  // → 'Foo'
```

New signature:
```js
transformPreview({
  sources: ['John', 'Doe'],
  merge: 'concat',
  mergeOptions: { separator: ' ' },
  steps: [{op:'lowercase'}]
})
// → 'john doe'
```

For backward compat, accept the old `transformPreview(steps, startValue)`
signature too — wrap as `{ sources:[startValue], merge:'pick', steps }`.

#### 4. STUB ops that actually make sense now

These three STUB ops become meaningful with multi-source:
- `concatenate` — combines source values directly (without needing merge)
- `coalesce` — first non-null wins (could be a merge strategy OR an op)
- `dictionary_lookup` — uses one source's value as the lookup key

Consider promoting `concatenate` from STUB to stable once multi-source
lands. Document the decision.

### When to retake

Trigger to revisit:

1. A stakeholder asks "how do I combine first_name + last_name?"
2. A real customer use case lands that requires multi-field merging
3. Someone in a demo tries `concatenate` from the palette and the
   current single-source behavior confuses them
4. The first STUB op gets promoted to stable — at which point multi-
   source becomes table stakes for the whole catalog

### Files involved

- `data-studio.html`:
  - `TRANSFORM_CATALOG` (around line 7683) — review/promote STUB ops
  - `transformPreview()` (around line 7709) — sim update
  - `renderTblMappingTab()` (around line 7860) — UI changes
  - `loadFieldOverrides()` — migration helper
  - Add palette item for "+ Add source field"
  - CSS: `.tbl-map-source` block needs to support a list of source chips

### Compliance impact

After landing: Section 3 (Canonical Mapping) reaches **100%** spec
compliance, completing the full v2 Data Studio rollout.

---
