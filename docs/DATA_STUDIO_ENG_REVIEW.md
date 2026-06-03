# Data Studio — Engineering Review

> Prototype handoff for the Data Studio v2 (May 2026 spec). This document maps
> what's in `data-studio.html` for a principal engineer reviewing the
> proposed feature before productionization.

**Status:** Design prototype, not production code. All data is mocked
in-memory or in `localStorage`. Single static HTML file (~833 KB) with vanilla
JS — no build, no framework. The shape of the UI deliberately mirrors the
shape of the proposed backend so nothing gets lost in translation.

**Demo:** open `data-studio.html` directly, or via GitHub Pages
(`.github/workflows/pages.yml` auto-deploys main to Pages).

---

## 1. What this is

Data Studio is the **data infrastructure surface** of AIMS-OS. It evolves
"Table Definitions" from a passive viewer into the active transformation +
monitoring core of the platform. Concretely:

- Browse and manage Tables (canonical destinations for data)
- Connect sources (via the 6-step Connect Data wizard)
- Map source fields → canonical schema (the v2 centerpiece)
- Monitor sync health, errors, schema drift
- Audit schema history with restore

It pairs with **Admin Studio** (`settings.html` — integrations, instances,
distribution, workspaces, audit) and **Agent Studio** (`agent-tools.html` —
tool wrappers). Cross-studio links keep the boundary clean: governance lives
in Admin Studio, mapping lives in Data Studio.

---

## 2. Surface inventory

Every route is hash-based. Router: `route()` reads `location.hash`, splits on
`/`, dispatches to the appropriate `renderXxx()` function. State is restored
from `localStorage` on each navigation; UI is fully re-rendered (no diff).

| Route | Renderer | Purpose |
|---|---|---|
| `/connections` | `renderConnections()` | List of Data-Sync connections inherited from Admin Studio. Map / re-map events into Tables. |
| `/connections/<slug>` | `renderConnectionDetail()` | Per-connection detail: events feeding which target tables, custom field decisions. |
| `/tables` | `renderTables()` | Library view of all canonical Tables. Cards show health, scale, downstream usage. |
| `/tables/<name>` | `renderTableDetail()` | Split layout: field list left, 7-tab inspector right (Field / Mapping / Sync / Conn / Used by / Versions / Custom fields). |
| `/templates` | `renderTemplates()` | Validation + transformation rule pack library. |
| `/templates/new` | `renderTemplateCreate()` | Create flow for a new template (pick starting point, name, domain). |
| `/templates/<id>` | `renderTemplateDetail()` | Template detail: tree editor, rule inspector, versions, applied-to. |
| `/mappings` | `renderFieldMappings()` | Cross-connection view of every source field, with resolve decisions. |
| `/schema` | `renderSchemaVersions()` | Unified timeline of all Table edits across the tenant. |
| `/onboarding` | `renderTenantOnboarding()` | 7-step tenant onboarding (Welcome → Org → Template → Peer rules → Site profile → Connect → Done). |

Empty-state interception: when `obState.phase === 'pending'` (first run), any
visit to `/connections` falls through to `renderOnboardingEmptyState()` —
the guided start screen.

---

## 3. State model

All state lives in module-scoped JS variables persisted to `localStorage`
under namespaced keys. No external store, no API calls.

| Variable | Storage key | What it carries |
|---|---|---|
| `obState` | `aims_ds_onb` | Connect Data wizard state (the 6-step flow inside Data Studio). Tracks category, connector, auth, mapping decisions, sync schedule, `lastCompleted` (the most recent finished connection). |
| `tonbState` | `aims_ds_tenant_onboarding_v1` | Tenant onboarding state. 7 steps, industry preset (`industryId` drives vocabulary swap), org, template, peerRules, siteProfile, sites[], errors, flow ('first_run' \| 'add_site'). |
| `tableVersions` | `aims_ds_table_versions` | Per-table version history: `{ tableName: [{id, label, createdAt, author, snapshot}] }`. Snapshots are full {overrides, customDefs} captures. |
| `tableFieldOverrides` | `aims_ds_table_field_overrides` | Per-field customization keyed `{tableName: {fieldName: {displayName, type, isPrimaryKey, isIndexed, nullable, validations[], transformations[], canonicalName}}}`. |
| `tableCustomDefs` | `aims_ds_table_custom_defs` | Manually-added fields per table (the "Custom fields" tab). |
| `mappingDecisions` | `aims_ds_field_mapping_decisions` | Field Mapping decisions per cross-connection field: `{rowKey: {decision, customName, suggestedAccepted}}`. |
| `FIELD_OVERRIDES` | `aims_ds_field_overrides_v1` | Newer key used by the Canonical Mapping pipeline (Phase A) to store per-field `{transformations[], canonicalName}`. Distinct from `tableFieldOverrides`. |

Mock seed data (large, declared as `const`):
- `DS_CONNECTIONS` — 6 sample connections (HubSpot, Snowflake, Salesforce, GitHub, Spreadsheet, Amazon S3)
- `DS_CATALOG` — broader catalog used to synthesize Tables and seed the wizard
- `tplLibrary` — system + cloned + custom templates
- `MOCK_TEMPLATE_LINES` — references that drive "Used by N" rollups
- `MOCK_PEOPLE` / `MOCK_WORKSPACES` (in settings.html) — cross-referenced

**Migration:** `loadTonbState()` reads v1 keys (`starter`, `grouping`,
`workspace`) and remaps to v2 (`template`, `peerRules`, `siteProfile`).
Backward-compatible with sessions started before the rename.

---

## 4. Design system primitives

Three shared primitives emerged during the v2 work. Every list/library
surface uses them. This is the part to lift into a real component library
on productionization.

### `.surface`

Canonical layout container.
```css
.surface { padding: 24px 32px 32px; max-width: 1280px; margin: 0 auto; }
.surface > .hero { margin-left: -32px; margin-right: -32px; /* full-bleed */ }
```
Wraps every surface render. Provides consistent horizontal padding so content
respects the sidebar/viewport edges. `.surface.tonb-wrap` overrides to a
narrower 1100px max-width for the onboarding wizard.

### `.hero`

Page header. Title + description on the left, optional `.hero-aside` on the
right for a primary CTA.
```html
<section class="hero">
  <div class="hero-main">
    <h1 class="hero-title">All your data tables</h1>
    <p class="hero-desc">One Table can be fed by multiple connections.</p>
  </div>
  <aside class="hero-aside">
    <button class="btn btn-primary">+ New Table</button>
  </aside>
</section>
```
Grid layout (`minmax(0, 1fr) auto`), responsive collapse below 900px.
`data-tone="info|warn|ok"` available but currently unused on library surfaces
(state lives in stats strips, not in hero tone).

### `.toolbar`

Search + filter pills row. Lives directly above the list grid.
```html
<div class="toolbar">
  <label class="toolbar-search">…</label>
  <div class="toolbar-filters">
    <button class="toolbar-filter is-active">All <span class="toolbar-filter-count">9</span></button>
    <button class="toolbar-filter" data-tone="ok">Mapped <span class="toolbar-filter-count">4</span></button>
  </div>
</div>
```
Filter pills support tone tokens (`ok`/`warn`/`info`) for color-coded active
states.

### Stats strip (per-surface, mirrored pattern)

Read-only KPI cards above the toolbar. `.tbl-kpi-strip` / `.tpl-kpi-strip` /
`.fm-kpi-strip` / `.sv-kpi-strip` / `.ds-kpi-strip` / `.ws-kpi-strip` —
intentionally separate classes to keep status colors scoped, but all follow
the same shape: auto-fit grid, `(number, label)` cards, optional `is-warn` /
`is-ok` / `is-errors` color variants.

### Common surface shape

```
┌─ .surface ─────────────────────────────────────────────────┐
│  breadcrumb                                                  │
│                                                              │
│  .hero (title + desc | primary CTA aside)                    │
│                                                              │
│  .stats-strip  (read-only KPI cards)                         │
│                                                              │
│  .toolbar     (search | filter pills)                        │
│                                                              │
│  list / grid / split layout                                  │
└─────────────────────────────────────────────────────────────┘
```

This shape is consistent across: Tables, Templates, Field Mappings, Schema
Versions, Connections, Workspaces (in settings.html). Adopt this in
production for predictability.

---

## 5. Key flows

### 5.1 First-run tenant onboarding

User lands on Data Studio with no prior state.
1. `/connections` detects `isOnboardingPending()` and shows
   `renderOnboardingEmptyState()` — the "Welcome to Data Studio" hero.
2. User clicks **Start first-time setup** → `tonbStart('first_run')`
   transitions to `/onboarding`.
3. 7 steps: Welcome → Organization → Composite template → Peer rules →
   Site profile → Connect data → Done.
4. Each step validates (`_validateStep`) and gates the Continue button.
   State is persisted on every field change.
5. Step 6 (Connect data) opens the **Connect Data wizard** as a modal — a
   nested 6-step flow (Category → Connector → Auth → Preview → Mapping →
   Sync). On completion, `obState.lastCompleted` is populated.
6. Step 7 (Done) shows the SummaryRow with **"Account mapping · Pending"**
   row carrying an amber NEXT badge. Primary CTA: "Map your fields in Data
   Studio →" which navigates to `/tables/<object>` with `tblRailTab='mapping'`
   pre-selected.

### 5.2 Connecting a new source post-onboarding

1. User clicks **"+ New Table"** in Tables hero (or `openWizard()` from
   anywhere).
2. Connect Data wizard launches as a modal.
3. 6 sub-screens with internal state machine. Persistence: `obState`.
4. On completion, the wizard's Done screen offers four next actions; the
   primary lands the user on the Mapping tab of the new Table (the
   handoff Edgardo requested).

### 5.3 Mapping fields to canonical schema

The v2 centerpiece. Lives in `renderTblMappingTab()` (Tables detail, tab 2).
1. Pick a field on the left rail. Right rail switches to the Mapping tab.
2. Vertical pipeline visualization: SOURCE node (cyan) → ordered chain of
   transformations → TARGET node (emerald, editable snake_case input).
3. Click **+ Add transformation** to open the palette: 14 ops split into
   Stable (8) and Experimental STUB (6). Add multiple, reorder with `⋮`
   menu, delete with `×`.
4. Live preview row at the bottom shows Before/After using the field's
   sample value. Updates on parameter edit without re-rendering (preserves
   input focus).
5. STUB ops carry amber dashed border + STUB chip. When chain contains any
   STUB, a top-of-panel banner explains "Experimental — behavior may
   change."
6. Persistence: `FIELD_OVERRIDES[tableName][fieldName].transformations[]`
   plus `.canonicalName`.

### 5.4 Field Mappings resolve flow

Cross-connection view of every source field that needs a decision.
1. `/mappings` lists rows grouped by connection.
2. Each row has Source field, suggested target, status (auto / review /
   resolved / skipped).
3. Click **Resolve** on a "Needs review" row → drawer opens with 3 options:
   Accept suggestion, Create new field, Skip.
4. Decisions persist in `mappingDecisions`.

---

## 6. v2 spec compliance

Status against the May 2026 spec sections:

| Section | Status |
|---|---|
| 1. Library View (cards + filters + global action) | ✅ 100% |
| 2. Detail Workspace (split layout + 7 tabs) | ✅ 100% — Field / Mapping / Sync / Conn / Used by / Versions / Custom fields |
| 3. Canonical Mapping (pipeline + STUB banner + snake_case target) | ⚠️ 85% — multi-source mapping deferred (see `docs/BACKLOG.md`) |
| 4. Create Table Flow (6-step wizard) | ✅ 100% — Category / Connector / Auth / Preview / Mapping / Sync |
| 5. Health Indicators (banners + red dots + red borders) | ✅ 100% |

**Deferred item:** multi-source mapping (combining N source fields into one
canonical target via a merge strategy). Single-source pipelines cover 95% of
demo paths. Full design and migration plan documented in
`docs/BACKLOG.md` (Phase A2).

---

## 7. Design decisions that need engineering input

These are choices that worked in the prototype but should be validated for
production:

### 7.1 State persistence strategy
- All state in `localStorage` keys, no server roundtrip.
- Per-table data (overrides, versions, custom defs) keyed by table NAME, not
  ID. Renaming a table loses history. Production should use stable IDs.
- No versioning of state shape. Migration is ad-hoc (see `loadTonbState`).
  Production needs a real schema version field + migration registry.

### 7.2 Transformation catalog scope
- 8 stable ops (`trim`, `lowercase`, `uppercase`, `round`, `to_int`,
  `to_decimal`, `default_value`, `replace_null`) — simple deterministic.
- 6 STUB ops (`concatenate`, `dictionary_lookup`, `regex_extract`,
  `split_first_token`, `phone_to_e164`, `date_parse`) — marked experimental.
- Production decision: which STUBs promote to stable in the first release?
  `dictionary_lookup` and `concatenate` are the most demo-able; the rest
  carry more edge cases.

### 7.3 Field-override store split
There are currently **two** override stores with overlapping purpose:
- `tableFieldOverrides` (older, used by Field/Sync/Conn tabs)
- `FIELD_OVERRIDES` (newer, used by the Mapping tab)

The split happened because Phase A's mapping needed a clean home that
wouldn't conflict with the existing Field-tab edits. Production should
consolidate. Leaving this split documented as a known-debt.

### 7.4 Multi-source mapping data model
See `docs/BACKLOG.md` — Phase A2 has a proposed shape:
```js
{ sources: [{table, field}], merge: 'concat|pick|coalesce', mergeOptions: {...}, transformations: [...] }
```
Engineering should validate the merge taxonomy and `mergeOptions` schema
before this lands.

### 7.5 "Just now" timestamps in mock seed
~10 instances of `lastSync: 'just now'` / `'4 min ago'` as raw strings
across `DS_CONNECTIONS`. Render path is `escapeHtml(c.lastSync)` — passes
through directly. Production replaces with numeric timestamps + a relative
formatter (`formatTplRelative` already exists for this and handles both
numeric + string inputs).

### 7.6 Onboarding flow forking
Tenant onboarding has two flows: `first_run` (7 steps) and `add_site` (3
steps). `_stepIdsForFlow()` returns the right id list. Add-site flow reuses
the same `_renderXxxStep` functions with different validation expectations.
This works in the prototype but is fragile — production should formalize
the step graph (DAG with conditional edges).

---

## 8. Architecture notes

### Routing
Hash-based, no library. `route()` parses `location.hash`, dispatches.
Handles direct navigation, hashchange, and `popstate`. Re-runs full
re-render on each route change.

### Rendering
`$('content').innerHTML = template` pattern. No virtual DOM, no
reconciliation. Every state change re-renders the affected surface from
scratch. Side effect: input focus is lost on text inputs that trigger
re-render — we work around this in 3 places (`tblMapEditParam`,
`setWsSearch`, `dsSetSearch`) with `setTimeout(focus + setSelectionRange)`.

Production should use a real framework where focus management is automatic
(React/SolidJS/Svelte all handle this). The framework choice is a separate
discussion.

### CSS organization
Single `<style>` block, ~6,000 lines. Section comments separate scopes
(`.tbl-*`, `.tpl-*`, `.fm-*`, etc.). Recent work introduced shared
primitives (`.surface`, `.hero`, `.toolbar`) that production should
formalize.

### Cross-studio communication
Hard-coded URL navigation (`window.location.href = 'settings.html#/...'`).
Each studio is a separate HTML file with its own state. No shared store.

---

## 9. Files in this prototype

```
data-studio.html       Main file (~833 KB, the proposed feature)
settings.html          Admin Studio (companion — workspaces, distribution, etc.)
agent-tools.html       Agent Studio (tools registry)
index.html             Hub landing
docs/
  DATA_STUDIO_ENG_REVIEW.md   This document
  DEMO.md                     End-user demo walkthrough
  OnboardingFlow.md           Tenant onboarding spec
  FILTERS_SPEC.md             Filter slideout handoff for design
  SHELL_PATTERN.md            Cross-studio shell normalization
  spec.md                     Original engineering brief
  BACKLOG.md                  Deferred work (multi-source mapping)
.github/workflows/pages.yml   GitHub Pages auto-deploy
```

---

## 10. How to review

1. **Open** `data-studio.html` in a browser (or the GitHub Pages URL).
2. **Clear state**: in browser console, run:
   ```js
   Object.keys(localStorage).filter(k=>k.startsWith('aims_')).forEach(k=>localStorage.removeItem(k));
   location.reload();
   ```
3. **Walk the flow**:
   - Land on Welcome to Data Studio (first-run empty state)
   - Click "Start first-time setup" → step through tenant onboarding
   - On step 6 (Connect data) → launch wizard, complete it
   - On step 7 (Done) → click "Map your fields in Data Studio"
   - Arrive on Tables detail with Mapping tab open
   - Add transformations, see the live preview update
   - Use sidebar to walk other surfaces (Tables / Templates / Field Mappings
     / Schema Versions / Workspaces)
4. **Sidebar Demo controls**:
   - **Industry preset** dropdown — switches vocabulary swap
   - **Take the guided tour** — interactive walkthrough of all surfaces
   - **Reset to first time setup** — clears state, returns to step 0
   - **Show errors** — toggles synthetic error states for demo

---

## 11. What I want from the review

In priority order:

1. **Data model validation**
   - Are the entity boundaries (Connection / Table / Field / Template /
     Workspace) correct?
   - Is the override-store split (`tableFieldOverrides` vs `FIELD_OVERRIDES`)
     acceptable as separate stores or should they consolidate before
     production?

2. **Transformation pipeline**
   - Is the 14-op catalog reasonable for v1?
   - Validate the multi-source mapping proposal in `docs/BACKLOG.md`
     before we start it.

3. **State persistence**
   - When does localStorage stop being viable? What's the cutover point
     to a real store (Supabase / Postgres / something else)?
   - Snapshot-based version history — production-viable shape or full
     refactor required?

4. **Routing / framework**
   - When to migrate off vanilla JS + hash routing. Framework
     recommendation?

5. **Cross-studio architecture**
   - Three separate HTML files with hard URL jumps works for the
     prototype demo. What does production look like — micro-frontends,
     SPA with sub-routes, separate apps?

6. **Anything I missed.** The prototype is dense; if there's a section
   that confused you while reading the code, that's the highest-signal
   feedback.

---

*Last updated alongside the v2 May 2026 Data Studio spec rollout.*
*Commit reference: see `git log -- docs/DATA_STUDIO_ENG_REVIEW.md`.*
