# Component · Tabs (`.mtabs` / `.mtab`) & view segments (`.rel-vw`, `.vw-seg`)

**Category:** navigation · **Status:** stable

## Overview
- **`.mtabs`/`.mtab`** — primary in-page section tabs (Overview / Tables / Relationships…),
  with an active underline and an optional count chip.
- **`.rel-vw`/`.vw-seg`** — segmented view toggles (Diagram+list / Diagram / List,
  or grid/list/table) within a tab's toolbar.

**Use** tabs for "where am I" section switching; segments for "how am I viewing"
the same data. **Don't use** tabs for actions or for >7 sections.

## Anatomy
Tab = `label + optional count chip`; active tab has a `--primary` underline.
Segment = small icon/label buttons in a bordered group; active = `.on`.

## Tokens used
| Part | Token |
|---|---|
| tab label | `--t2`; active `--t1` |
| active underline | `--primary` |
| count chip | `--t3` on `--hover` |
| segment border / active | `--line` / `--primary` + `--accent` |
| radius | `--r8` |
| transition | `--ds-dur-normal` |

## States
default · hover (`--t1`) · active (`.active`/`.on` + underline) · focus ring.

## Code example
```html
<div class="mtabs">
  <button class="mtab active" onclick="setDetailTab('overview')">Overview</button>
  <button class="mtab" onclick="setDetailTab('tables')">Tables <span>3</span></button>
</div>
<div class="rel-vw">
  <button class="rel-vw-btn on" onclick="erView('diagramlist')">Diagram + list</button>
  <button class="rel-vw-btn" onclick="erView('list')">List</button>
</div>
```

## Cross-references
[entity-detail](entity-detail.md) · [filters](filters.md)
