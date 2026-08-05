# Data Studio — Models · Version Map & Completion Guide

> **Prototype:** `data-studio-models.html` (single-file vanilla HTML/CSS/JS)
> **Spec of record:** *Data Studio — Models Section: Functional Definition* **v3.0** (17 sections)
> **Scope engine:** `SCOPE_TIERS = ['v1','v1.5','v2']` · `SCOPE='v1'` (default) · `TAB_VER` gating · draggable Scope toggle + live Scope-changelog
> **Purpose of this file:** one place that says, for **each version**, exactly *what it must include*, *what is already built*, and *what is left to build to complete the prototype* — mapped section-by-section to the Functional Definition.

---

## 0. How to use this document

- **Section 1** — the three-tier scope ladder and what each tier *promises*.
- **Section 3** — the master matrix: every Functional-Definition area × tier × build status. Read this first for the big picture.
- **Sections 4–6** — one deep block per version: everything it includes, current status, the **"To complete" checklist**, and **acceptance criteria**.
- **Section 7** — how the prototype is currently *tagged* (`data-version`) and where tagging is missing.
- **Section 8** — the ordered roadmap to finish the prototype.

**Status legend:** ✅ Built · 🟡 Partial (exists but shallow / missing sub-features) · ⬜ Pending (not built)

**Tier philosophy** (from the `aims-os-feature-versioning` skill):

| Tier | Name | Means |
|---|---|---|
| **V1** | Foundation | Minimum functional scope. The core journey: **browse & understand** the model. No authoring. |
| **V1.5** | Expansion | Adds depth: **author & govern** — create/publish, privileges, history, indexes, settings. |
| **Full vision (V2)** | Complete | The whole product as designed — **API builder, AI modeling, association, catalog install, impact analysis, handoff**. |

---

## 1. The scope ladder (what each tier promises)

This mirrors the live **Scope changelog** already inside the prototype (`window.SCOPE_CHANGELOG`).

### V1 · Foundation — *Browse & understand the model*
Models · Entities · Tables · Reference Data lists (list / grid / table · filters · pagination) · Entity/Table/Reference/Model **read-only** detail views · slide-out previews. **No authoring, no governance, no API builder.**

### V1.5 · Expansion — *Author & govern*
Create / publish (model · entity · table · reference) · Privileges (standard + custom · manage roles) · History + rollback · Table Indexes · Reference Settings · Edit / deprecate actions. Detail views gain their **authoring tabs**.

### Full vision (V2) — *The complete experience*
API contract two-pane builder · AI-assisted (ORI) modeling · standalone state + association · pre-built catalog install (Implement / Clone) · impact analysis + migration plan · cross-model relationships · saved filters · bulk actions · handoff to Admin Studio.

---

## 2. Object model recap (containment — drives navigation)

```
Model
 └── Entity                     (business object; has Records metric)
      ├── Primary table          (1, required)
      └── Secondary table(s)     (0..n)
           └── Column            (type · enum · default · sensitivity · system/audit fields)
 └── Reference Data (list)       (flexible schema, Key field, Items, Origins)
Relationships                    logical (Entity↔Entity) · physical (Table↔Table) · reference↔reference
Cross-cutting                    Privileges · API contract · Lifecycle/versioning · Standalone+Association · Pre-built catalog
```

The **four sidebar tabs** (§17.3) map to the top level: **Models · Entities · Tables · Reference Data**.

---

## 3. Master coverage matrix

Functional-Definition area → tier it belongs to → current build status in the prototype.

| # | Functional-Definition area | Tier | Status | Where it lives / note |
|---|---|---|---|---|
| §1 | Introduction / purpose | — | n/a | Context only |
| §2 | Object model & containment | V1 | ✅ | Nav + hierarchy reflected |
| §3 | **Model** (attributes, composition) | V1 | ✅ | `renderModelDetail` |
| §3.4 | Automatic behaviors on publish | V1.5 | 🟡 | `openPublish` shows an impact list; behaviors not fully modeled |
| §4 | **Entity** (detail, primary/secondary) | V1 | ✅ | `renderEntityDetail` — Overview/Tables/Relationships |
| §4.4 | Records (business metric) | V1 | ✅ | Shown in header |
| §4.5 | Entity privileges & API | V1.5 / V2 | ✅ | `privTab` + `apiTab` |
| §5 | **Table** (roles, attributes) | V1 | ✅ | `renderTableDetail` |
| §5.4 | System columns (audit fields) | V1 | ✅ | Columns list |
| §5.5 | Table data editability / manual override | V1.5 | 🟡 | Data tab renders; inline edit shallow |
| §5.6 | Indexes | V1.5 | ✅ | Indexes tab (`data-version="v1.5"`) |
| §6 | **Column** (types) | V1 | ✅ | `columnsTab` |
| §6.4 | Enum values | V1.5 | 🟡 | Present in data; **no enum-value editor popup** |
| §6.5 | Column default values | V1.5 | 🟡 | Displayed; editor shallow |
| §6.6 | Sensitivity | V1 | ✅ | Sensitivity dot/label |
| §7 | **Relationships** (logical + physical) | V1 | ✅ | `relsTab` + diagram |
| §7 | Cross-model relationships | V2 | ⬜ | Advanced — not built |
| §8 | **Reference Data** (schema, items, origins) | V1 | ✅ | Reference detail |
| §8.5 | External sync + manual override | V1.5 | 🟡 | Settings tab exists; sync shallow |
| §8.6 | Item import / export | V1.5 | 🟡 | Import/export UI present; flow shallow |
| §8.7 | Referenced-by | V1 | ✅ | Referenced-by tab |
| §8.8 | History | V1.5 | ✅ | `_historyTab` |
| §9 | **Standalone state & association** | V2 | 🟡 | Association surfaces present; **Promote/Demote/Detach not built** |
| §10 | **Pre-built element catalog** | V2 | 🟡 | Marketplace/catalog present; **Implement/Clone install-modal shallow** |
| §11.1 | Object creation (minimum reqs) | V1.5 | ✅ | `openCreateEntity` + create modals |
| §11.2 | AI-assisted creation (ORI) | V2 | ⬜ | Not built |
| §12 | **API contract** (5 defaults + custom + access control) | V2 | ✅ | **two-pane builder — `apiTab` / `_apiRight`** |
| §13 | **Privilege system** (module/standard/custom) | V1.5 | ✅ | `privTab` |
| §14.1–14.3 | Lifecycle states · draft/publish · schema-change classification | V1.5 | 🟡 | States + publish modeled; classification shallow |
| §14.4 | **Impact analysis & migration plan** | V2 | 🟡 | Basic impact list only; **no migration plan** |
| §14.5 | Auditing & history | V1.5 | ✅ | `_historyTab` + rollback |
| §14.6 | Sandbox & release bundles | V2 | ⬜ | Reference only — not built |
| §15 | System conventions & limits (naming, uniqueness, integrity) | V1.5 | 🟡 | Internal-name lock shown; validation surfaces partial |
| §17.1–17.3 | Navigation · transversal patterns · four tabs | V1 | ✅ | Shell + DS filters + pagination |
| §17.4–17.6 | Entity/Table/Reference Full Detail | V1/V1.5 | ✅ | Detail views + tabs |
| §17.7 | Standalone association surfaces | V2 | 🟡 | See §9 |
| §17.8 | API contract surfaces | V2 | ✅ | two-pane builder |
| §17.9 | Privilege enforced on API endpoints | V2 | ✅ | Access-control chips per endpoint |

---

## 4. V1 — Foundation · *Browse & understand*

**Release target:** This sprint

**Goal:** a non-authoring user can open Data Studio → Models and fully **understand** any model: its entities, tables, columns, relationships, reference lists — with list/grid/table views, filters, pagination, and slide-out previews. Nothing is editable.

### Must include

**Navigation & shell (§17.1–17.3)**
- ✅ Four sidebar tabs: Models · Entities · Tables · Reference Data
- ✅ List / Grid / Table view switch · DS filters toolbar (search + dropdowns + chips + sort) · pagination
- ✅ Breadcrumbs, detail headers (internal-name + lock + status pill + kebab), transversal tab bar

**Model (§3)** — ✅ browse a model: its entities, tables, components; attributes.

**Entity Full Detail (§4, §17.4)** — read-only tabs:
- ✅ Overview · ✅ Tables (primary/secondary) · ✅ Relationships (list + diagram)
- *(Privileges · API contracts · History appear but belong to higher tiers — see §7 tagging)*

**Table Full Detail (§5, §17.5)** — read-only:
- ✅ Overview · ✅ Columns (type · default · sensitivity · system/audit fields) · ✅ Data (sample) · ✅ Relationships

**Column (§6)** — ✅ display all attributes, data types, enum presence, default value, sensitivity dot.

**Relationships (§7)** — ✅ logical (Entity↔Entity) and physical (Table↔Table), including the diagram view.

**Reference Data Full Detail (§8, §17.6)** — read-only:
- ✅ Overview · ✅ Data (items) · ✅ Referenced-by (§8.7) · ✅ Columns

**Transversal (§17.2)** — ✅ slide-out previews (eye action), toasts, empty states, dark + light parity.

### To complete (V1)
V1 is **feature-complete** in the prototype. Only polish remains:
- ⬜ Confirm every **read-only** guarantee at scope `v1` — no create/edit/publish control is reachable (New button is `data-version="v1.5"`; verify no stray edit affordances leak at v1).
- ⬜ Empty-state + zero-results copy audit across all four lists.

### Acceptance criteria
- [ ] At scope **V1**, every list, detail view, tab (Overview/Tables/Relationships/Data/Columns/Referenced-by), diagram and slide-out renders with realistic 50–100-record data.
- [ ] No authoring control (New / Edit / Publish / Delete / API builder) is visible or reachable at V1.
- [ ] Filters, sort, pagination and view-switch work on all four lists.
- [ ] Dark and light both pass.

---

## 5. V1.5 — Expansion · *Author & govern*

**Release target:** Next sprint

**Goal:** a modeler can **create, edit, publish, and govern** — the detail views unlock their authoring tabs. Everything V1 has, plus authoring depth (still short of the API builder and AI).

### Must include

**Object creation (§11.1)**
- ✅ New model · entity · table · reference-list (minimum creation requirements + create modals)
- ✅ New button gated `data-version="v1.5"`

**Draft & publication (§14.1–14.2, §3.4)**
- ✅ Lifecycle states (Draft / Pending changes / Published) + publish flow (`openPublish`)
- 🟡 **Automatic behaviors on publish (§3.4)** — surface the full list of what publish does (index rebuilds, schema apply to physical tenant tables, etc.); currently a short static impact list.
- 🟡 **Schema change classification (§14.3)** — label each pending change as additive / breaking / data-migrating.

**Privilege system (§13, §17.9 read side)**
- ✅ Standard privileges per entity · custom privileges · Manage roles (`privTab`)

**Table depth (§5.5, §5.6)**
- ✅ Indexes tab (author) · 🟡 Table data manual override / inline edit (deepen editability)

**Column depth (§6.4–6.6)**
- 🟡 **Enum-value editor** (add/reorder/deprecate enum items in a popup) — *not built*
- 🟡 **Default-value editor** per column (typed) — *shallow*
- ✅ Sensitivity assignment

**Reference data depth (§8.5, §8.6)**
- 🟡 External synchronization + manual override (Settings tab exists; sync flow shallow)
- 🟡 Item import / export flow (UI present; wire the modal steps)

**History & audit (§14.5, §8.8)**
- ✅ Version history + rollback (`_historyTab`) on entity / table / reference

**System conventions (§15)**
- ✅ Internal-name lock (immutable after creation) shown
- 🟡 Validation surfaces for naming / structural-uniqueness / obligation rules (§15.3) — add inline validation on create/edit

### To complete (V1.5)
1. ⬜ **Enum-value editor popup** on `columnsTab` (line ~4481): add / rename / reorder / deprecate enum items.
2. ⬜ **Column default-value editor** (typed input matching column type) — reuse the API builder's default-value popup pattern (`apiDefVal`) for consistency.
3. ⬜ **Publish upgrade (§3.4 + §14.3):** turn `openPublish`'s static impact list into a real change list with per-change **classification badges** (additive / breaking / migrating).
4. 🟡 **Inline-edit-everywhere** on Columns + Table Data (make the shallow edit affordances functional).
5. 🟡 **Reference import/export + external-sync** flows (wire the Settings-tab steps end to end).
6. ⬜ **Create/edit validation** (§15.3): duplicate-name, missing-primary-table, obligation rules.

### Acceptance criteria
- [ ] At scope **V1.5**, all V1 content **plus** Create/Publish, Privileges, History, Indexes, Reference Settings tabs are visible and functional.
- [ ] A user can create an entity → add columns (with types, enums, defaults, sensitivity) → set privileges → publish, seeing a classified impact list.
- [ ] History shows the change and offers rollback.
- [ ] Dark and light both pass.

---

## 6. Full vision (V2) · *The complete experience*

**Release target:** Q4 2026

**Goal:** the product as designed — the API contract builder, AI-assisted modeling, standalone/association, catalog install, impact analysis + migration, cross-model relationships, and the Admin Studio handoff.

### Must include

**API contract (§12, §17.8, §17.9)** — ✅ **DONE (two-pane builder)**
- ✅ Base-URL banner + enabled count
- ✅ Left: endpoints grouped by operation (5 defaults Create/Read/Update/Delete/List + custom variants; method badges, paths, privilege chips, enabled dots) + "**+ New custom endpoint**" → 5-base selector
- ✅ Right per endpoint: **Access control** (OR-logic privileges), **Request body** (include toggle + default-value popup: *system default* / *fallback ⇢* / *hardcoded ⚑*), **Response fields** (include toggles), **Predefined filters** (field/op/value + AND/OR, List/Read only), **Related entities** (none/reference/embed/expandable), generated **OpenAPI** block
- ✅ Custom-endpoint rename / duplicate / delete
- Symbols: `apiTab` · `_apiEndpoints` · `_apiC` · `_apiRight` · `apiCreateCustom` · `_apiDvSave` · `_API_OPS`
- Tagged `data-version="v2"` (via `TAB_VER.api`)
- ⬜ *Optional polish:* copy-OpenAPI button; per-endpoint "Try it"/example payload; explicit ≥1-privilege obligation warning.

**AI-assisted creation / ORI (§11.2)** — ⬜ *not built*
- ⬜ "Describe the entity you need" → AI-suggested entities/tables/columns/relationships with accept/reject.

**Standalone state & association (§9, §17.7)** — 🟡
- ✅ Association surfaces + standalone concept present
- ⬜ **Promote / Demote / Detach** actions (0 hits in code) — build the state transitions + confirmation modals.
- ⬜ Standalone-element association slide-out (associate a standalone table/entity into a model).

**Pre-built element catalog (§10)** — 🟡
- ✅ Catalog / marketplace surface + Implement/Clone concepts present
- ⬜ **Element-detail + install modal depth**: Implement vs Clone choice, preview of what gets created, conflict handling.

**Lifecycle — impact & sandbox (§14.4, §14.6)** — 🟡/⬜
- 🟡 **Impact analysis + migration plan (§14.4):** extend the publish impact list into a full downstream-impact view (affected endpoints, privileges, agents, dashboards) + a migration plan.
- ⬜ **Sandbox & release bundles (§14.6):** reference-level scaffold + callout.

**Advanced relationships (§7)** — ⬜ cross-model / cross-entity relationships.

**Power-user surfaces** — ⬜ saved filters · bulk actions · **handoff to Admin Studio** (0 hits — build the handoff entry point).

### To complete (Full vision)
1. ✅ ~~API contract two-pane builder~~ **(done)**
2. ⬜ **Promote / Demote / Detach** + standalone association slide-out (§9, §17.7).
3. 🟡 **Catalog element-detail + Implement/Clone install modal** (§10).
4. 🟡 **Impact analysis + migration plan** slide-out (§14.4) — build on `openPublish`.
5. ⬜ **AI/ORI modeling** entry point (§11.2).
6. ⬜ **Cross-model relationships** in `relsTab`.
7. ⬜ **Saved filters + bulk actions** on the four lists.
8. ⬜ **Handoff to Admin Studio** action.
9. ⬜ **Sandbox / release bundles** scaffold (§14.6).

### Acceptance criteria
- [ ] At scope **Full vision**, every tab and action is unlocked; the API builder is reachable on entity detail.
- [ ] Every §12/§17.8 sub-surface works (already verified for the API builder).
- [ ] Promote/Demote/Detach transition an element and reflect in its status + history.
- [ ] Catalog install (Implement/Clone) previews and creates the elements.
- [ ] Publish shows a full impact + migration plan.
- [ ] Dark and light both pass.

---

## 7. Current `data-version` tagging state & gaps

**Engine:** `applyScope()` shows any `[data-version]` element whose tier index ≤ the selected tier; `deferred` never shows. A `MutationObserver` re-applies scope after every re-render.

**Currently tagged:**

| Element | Tag | Correct? |
|---|---|---|
| New button (create) | `v1.5` | ✅ |
| Detail tabs via `TAB_VER` → `privileges`, `history`, `settings`, `indexes` | `v1.5` | ✅ |
| Detail tab `api` (API contracts) | `v2` | ✅ |
| 3 × `vcallout('v1.5', …)` + 1 × `vcallout('v2', …)` | — | ✅ deferred-feature callouts |

**Tagging gaps to close (so scope truly gates the experience):**
- ⬜ **Edit / deprecate / delete** row actions and detail-kebab items → tag `v1.5` (authoring).
- ⬜ **Enum editor / default-value editor** (once built) → `v1.5`.
- ⬜ **Publish button + impact/migration** → `v1.5` (publish) / `v2` (migration plan).
- ⬜ **Promote / Demote / Detach / Associate**, **Catalog install**, **AI/ORI**, **Saved filters / bulk / Admin-Studio handoff**, **cross-model relationships** → `v2`.
- ⬜ Add **`vcallout`** placeholders at V1/V1.5 for each deferred V2 surface so engineers see *what's coming* without it being live.

---

## 8. Completion roadmap (ordered)

Do these in order; each is a self-contained slab that can be verified at its own scope.

| # | Item | Tier | Status | Effort |
|---|---|---|---|---|
| 1 | ✅ API contract two-pane builder | V2 | **Done** | — |
| 2 | Enum-value editor + column default-value editor | V1.5 | ⬜ | S–M |
| 3 | Publish upgrade: change list + classification + impact/migration plan (§3.4/§14.3/§14.4) | V1.5→V2 | 🟡→⬜ | M |
| 4 | Inline-edit-everywhere (Columns + Table Data) | V1.5 | 🟡 | M |
| 5 | Reference import/export + external-sync flows | V1.5 | 🟡 | M |
| 6 | Promote / Demote / Detach + standalone association (§9, §17.7) | V2 | ⬜ | M |
| 7 | Catalog element-detail + Implement/Clone install modal (§10) | V2 | 🟡 | M |
| 8 | AI/ORI modeling entry point (§11.2) | V2 | ⬜ | M–L |
| 9 | Cross-model relationships (§7) | V2 | ⬜ | M |
| 10 | Saved filters + bulk actions | V2 | ⬜ | S–M |
| 11 | Handoff to Admin Studio | V2 | ⬜ | S |
| 12 | Sandbox / release bundles scaffold (§14.6) | V2 | ⬜ | S |
| 13 | Close all `data-version` tagging gaps (§7 above) | all | ⬜ | S |
| 14 | Create/edit validation surfaces (§15.3) | V1.5 | ⬜ | S |

**Effort:** S ≈ ½ day · M ≈ 1–2 days · L ≈ 3+ days (prototype-level, single-file).

---

## 9. Changelog

> One block per tier · one entry per view · release target always filled. Mirrors the live in-app Scope-changelog (`window.SCOPE_CHANGELOG`).

### V1 — Foundation
**Release target:** This sprint

**New in this version:**
- Sidebar: four tabs — Models · Entities · Tables · Reference Data
- All four lists: list / grid / table views · DS filters (search + dropdowns + chips) · sort · pagination
- Entity detail (read-only): Overview · Tables · Relationships
- Table detail (read-only): Overview · Columns · Data · Relationships
- Reference detail (read-only): Overview · Data · Referenced-by · Columns
- Model detail: browse entities / tables / components
- Columns: display data type · enum · default · sensitivity · system/audit fields
- Relationships: logical + physical + diagram view
- Transversal: slide-out previews · empty & zero-result states · dark + light

**Updated in this version:**
- n/a — this is the first version

**Removed / not included:**
- New / Create — deferred to V1.5 (tagged `data-version="v1.5"`)
- Publish button + unpublished-changes hint — deferred to V1.5 (tagged)
- Privileges · History · Indexes · Reference Settings tabs — deferred to V1.5 (tagged via `TAB_VER`)
- API contracts tab — deferred to Full vision (tagged `data-version="v2"`)
- Everything in Full vision — see V2 callouts (`data-soon="v2"`)

---

### V1.5 — Expansion
**Release target:** Next sprint

**New in this version:**
- Create flows: New model · entity · table · reference (minimum-creation rules + validation)
- Publish: button + unpublished-changes hint become visible; publish modal
- Privileges tab: module capability · standard per-entity · custom · Manage roles
- History tab: version history + rollback (entity / table / reference)
- Table detail: Indexes tab (author)
- Reference detail: Settings tab (external sync + manual override) · item import / export
- Columns: enum-value editor + typed default-value editor + sensitivity assignment *(to build — see §5 checklist)*

**Updated in this version:**
- Entity / Table / Reference detail: authoring tabs appear (Privileges · History · Indexes · Settings)
- Publish modal: gains a classified change list — additive / breaking / migrating *(to build)*
- Lists: row-level Edit / deprecate / delete actions appear

**Removed / not included:**
- API contract builder — still Full vision
- AI/ORI modeling · association · catalog install · impact/migration — still Full vision

---

### Full vision (V2)
**Release target:** Q4 2026

**New in this version:**
- Entity detail: **API contracts tab — two-pane builder** (5 defaults + custom variants · access control · request/response customization · predefined filters · related entities · OpenAPI) — **built**
- Entity detail: AI-assisted (ORI) modeling entry point *(to build — replaces the `data-soon` callout)*
- Entity / Table: Standalone state + association — Promote · Demote · Detach · associate into a model *(to build)*
- Catalog: pre-built element detail + Implement vs Clone install modal *(to build)*
- Publish: impact analysis + migration plan *(to build)*
- Relationships: cross-model relationships *(to build — replaces the `data-soon` callout)*
- Lists: saved filter sets + bulk actions *(to build)*
- Handoff to Admin Studio *(to build)*

**Updated in this version:**
- Entity detail: API tab unlocks (was `data-soon` callouts at V1/V1.5)
- Every tab and action across the four surfaces is unlocked

**Removed / not included:**
- _None cut here._ Deferred with no tier: sandbox & release bundles · real persistence · physical migration execution.

---

## 10. In-prototype versioning mechanics (implementation reference)

- **Toggle:** draggable Scope control (`setScope('v1'|'v1.5'|'v2')`) + Scope-changelog drawer (`showScopeChangelog`, data in `window.SCOPE_CHANGELOG`).
- **`applyScope()`** shows any `[data-version]` element whose tier ≤ selected tier; a `MutationObserver` on `#content` re-applies after every re-render.
- **`[data-version="…"]`** — element belongs to that tier and above (real feature).
- **`[data-soon="v2"]`** — *coming-soon* callout: visible **below** the tier, hidden once you reach it (where the real feature lives). Helper: `vsoon(tier,text)`.
- **`vcallout(tier,text)`** — tier annotation shown at-or-above the tier.
- **Tagged today:** New button · Publish button + hint · Privileges/History/Indexes/Settings tabs (`TAB_VER`) → `v1.5`; API tab → `v2`; V2 coming-soon callouts on Entity Overview (AI, association) + Relationships (cross-model).

---

## 11. Deferred / explicitly out of scope

- **Sandbox & release bundles (§14.6)** — reference-only in the doc; scaffold + callout, don't build the full flow.
- **Real backend / persistence** — the prototype mutates in-memory only; scope resets on reload.
- **Physical migration execution** — visualize the plan; execution is engineering's, not the prototype's.

---

*Generated 2026-08-05. Keep this file next to `data-studio-models.html`; update the status columns as slabs land. The live Scope-changelog (`window.SCOPE_CHANGELOG`) should stay in sync with §1 here.*
