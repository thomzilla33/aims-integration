# Component · Rich list row (`.md-trow`, `.lrow`)

**Category:** data display · **Status:** stable · **Selectors:** `.md-trow`, `.lrow`, `.erel-card`

## Overview
The two-line rich row used for entities, tables, reference lists and relationships.
**Use** for scannable lists where each item has a title, internal name, badges,
a description and a metadata footer. **Don't use** for dense tabular data (use the
mini-table view) or for single-value lists.

## Anatomy
1. **Header row** — leading icon · owner avatar · **title** · `code` (mono internal name) ·
   entity/model chip · role/status badges · right cluster (status pill · time · kebab · expand chevron).
2. **Description** — one line, `--t2`.
3. **Footer** — metrics (`N columns · N relations · owner`) separated by `·`.
4. **(optional) Expand region** — inline detail (e.g. column list) when the row is open.

## Tokens used
| Part | Token |
|---|---|
| card bg / border | `--card-bg` / `--card-border` |
| open/hover bg | `--hover` |
| title | `--t1` (`--ds-text-md`, `--ds-fw-semibold`) |
| `code` internal name | `--t2`, `--font-mono` |
| description | `--t2` (`--ds-text-base`) |
| footer meta | `--t3` (`--ds-text-sm`) |
| radius / padding | `--r12` / `--space-4` |

## States
default · hover (`--hover`) · expanded (`.et-open`, chevron rotates 180°) · selected.

## Code example
```html
<div class="md-trow">
  <div class="md-trow-h" onclick="etExpand(id)">
    <span class="md-trow-ic">▦</span><span class="md-trow-av">SC</span>
    <span class="md-trow-name">Comment</span><code class="md-code">comment</code>
    <span class="chip">Comment</span><span class="mini-badge mb-primary">Primary</span>
    <span class="md-trow-right">● Published · 1d ago · ⋯ · ⌄</span>
  </div>
  <div class="md-trow-desc">The primary table backing the Comment entity.</div>
  <div class="md-trow-foot">▦ 4 columns · ⌥ 2 relations · Sarah Chen</div>
</div>
```

## Cross-references
[status-pill](status-pill.md) · [chip-badge](chip-badge.md) · [pagination](pagination.md) · [entity-detail](entity-detail.md)
