# Component · Entity Detail page (`renderEntityDetail`)

**Category:** page / composite · **Status:** in progress (tab-by-tab) · **Route:** `#/entities/<id>`

## Overview
The full-page detail for a data-model entity, reached from an entity's **Open**
button (`openMdEntityFull`). Works for real catalog entities and model-generated
ones (synthesized via `_bridgeEntity` into `_bridgeEnts`). **Use** as the canonical
surface for inspecting/editing an entity. **Don't use** the slideout preview for
deep work — that's a quick glance only.

## Anatomy
1. **Breadcrumb** — `Models › <Model> › Entities › <Entity>` (model-aware).
2. **Header** — icon · name · `internal` (lock) · model chip · domain chip · status ·
   Publish · kebab.
3. **Tabs** ([tabs](tabs.md)) — Overview · Tables · Relationships · Privileges · API · History (· Settings).
4. **Tab bodies** (built so far):
   - **Overview** — governance grid (Owner/Stewards/Category/Domain/Sensitivity/Last
     modified) + tags · Key-metric tiles · Internal-Structure ER (Columns/Keys toggle).
   - **Tables** — [filters](filters.md) toolbar + rich [list-row](list-row.md)s + inline column expand + [pagination](pagination.md).
   - **Relationships** — Diagram+list/Diagram/List [tabs](tabs.md) + Direction/Cardinality/Scope
     filters + rich relationship cards + incoming section + New-relationship [slideout](slideout.md).

## Tokens used
Inherits shell tokens: text `--t1/t2/t3`, `--primary`, `--line`, `--card-bg`,
`--card-border`, `--hover`, status `--tag-*`, radius `--r8/--r12`, spacing `--space-*`.
Governance labels use `--t3` (light override `#475569` for legibility).

## API
- `openMdEntityFull(modelId, entId)` — bridge + navigate.
- `setDetailTab(t)` — switch tab. `detailState = {id, tab}`.
- Per-tab state: `_etState` (tables), `_erState` (relationships).

## States
loading (bounces to `#/entities` if unresolved) · per-tab empty/filtered/expanded ·
pending changes (Publish enabled).

## Cross-references
[list-row](list-row.md) · [tabs](tabs.md) · [filters](filters.md) · [slideout](slideout.md) ·
[status-pill](status-pill.md) · [chip-badge](chip-badge.md) · [pagination](pagination.md)
