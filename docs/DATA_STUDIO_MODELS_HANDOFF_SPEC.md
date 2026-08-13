# Data Studio — Models — Engineering Handoff Spec

**Prototype:** https://thomzilla33.github.io/Data-studio/data-studio-models.html (defaults to V1 · use the bottom-right **Scope** toggle for V1 / V1.2 / Full vision)
**Boulder ticket:** ARP-1015 · **Feature tickets:** ARP-1016 (Foundation) · ARP-1017 (Entities) · ARP-1018 (Tables) · ARP-1019 (Reference Data) · ARP-1020 (Models)
**Last updated:** 2026-08-12
**Status:** Ready for review

> This is an umbrella spec for the whole **Data Studio · Models** boulder. Each of the 5 areas below maps to one Feature ticket and its Sub Features (Version tickets). Paste each area's section into its Feature ticket; paste each tier's acceptance criteria into the matching Sub Feature ticket.

---

## What this feature does

Data Studio · Models is where a tenant defines its **data model**: the **Models** that group **Entities**, the **Tables** that back them, the **Reference Data** (controlled vocabularies), their **columns**, **relationships**, and **rows**. The core user action in V1 is **authoring from scratch** — create a model/entity/table/reference list, define its columns and relationships, and add/edit data — with a Published/Draft/Deprecated lifecycle. Publishing/versioning, generated APIs, custom privileges, the marketplace catalog and AI-assisted creation are deferred to later tiers.

**Scope model (used across every area):**
- **V1 — Foundation:** browse + author from scratch. The four areas, their lists, detail tabs, column/data/relationship authoring, states.
- **V1.2 — Govern:** Publish/versioning, the 5 default virtual API endpoints (enable/disable + description), view-only standard Privileges.
- **Full vision:** Marketplace catalog + Create-with-AI, model Components, ER diagrams, Indexes, History, Referenced-by, custom endpoints/privileges.

The prototype embeds this ladder live via the **Scope** toggle (`applyScope()` shows/hides `data-version`-tagged elements).

---

## Delivery tiers — by area

### A · Foundation (ARP-1016)

#### V1 — Foundation
**Goal:** A working shell with the four areas, create-from-scratch, and the lifecycle states.

**In scope:**
- [ ] Model Explorer shell: dark-navy sidebar, white topbar, four area tabs (Models · Entities · Tables · Reference Data) — **A.1 / ARP-1021**
- [ ] Create from scratch for every area — **New** goes **directly** to the Start-from-scratch form (no marketplace, no AI) — **A.2 / ARP-1022**
- [ ] Lifecycle states **Published · Draft · Deprecated** only; editing a Published object flips it to Draft (save-to-draft) — **A.3 / ARP-1023**
- [ ] Empty state: a from-scratch object opens genuinely empty ("No entities yet · Add your first entity", same for tables)
- [ ] Error state: create is blocked with inline messaging when required fields are missing or the description exceeds its 180-char limit

**Not in scope (deferred):** marketplace catalog + Create-with-AI (Full vision); Publish/versioning banner (V1.2); Settings/Danger-zone (deferred).

**Acceptance criteria:**
- [ ] Clicking **New model / New entity / Add table / New reference list** opens the Start-from-scratch form directly (no catalog), at V1 and V1.2
- [ ] A freshly created model shows 0 entities / 0 tables / 0 components and the "No … yet" empty state
- [ ] The description counter shows `N / 180`, turns red past 180, and **blocks** submit past 180 (live + on create)
- [ ] Editing any field of a Published model/table/entity sets its status to **Draft**
- [ ] Only Published/Draft/Deprecated statuses appear anywhere (no "Pending changes")

#### Full vision
- [ ] **New** opens the **Marketplace** catalog (curated + all + featured) with **Create-with-AI assist** (chat) and **Start from scratch** as options

---

### B · Entities (ARP-1017)

#### V1 — Foundation
**Goal:** Browse entities and open an entity to author its tables and relationships.

**In scope:**
- [ ] Entities list — search · filter (Model/Domain/Status/Owner/Tags) · pagination · create · **card → full detail on single click** — **B.1 / ARP-1024**
- [ ] Entity detail tabs **Overview · Tables · Relationships** — **B.2 / ARP-1025**
- [ ] Entity **relationship authoring**: entity↔entity with **cardinality (1:1 / 1:N / N:N)** + **related entity** + **strength (Strong / Weak)** + **direction (Unidirectional / Bidirectional)** + description + nav names; required fields gate the Create button. *(The prototype currently also renders a **Composition** field — Association / Aggregation / Composition — which is NOT in the canonical ARP-1025 V1 scope; tracked in Open Questions.)*
- [ ] Entity actions: **Delete** (Duplicate is intentionally out — it would duplicate every child table)
- [ ] Overview = the basic info block only (no KPIs/diagram/activity at V1)

**Not in scope (deferred):** Privileges + API tabs (V1.2); Diagram view + cross-model relationships (Full vision).

**Acceptance criteria:**
- [ ] Clicking anywhere on an entity card opens its detail (not only the avatar)
- [ ] "New relationship" opens a slideout whose required fields (related entity, cardinality, strength, direction) must be set before Create enables
- [ ] The same entity opens the same relationship form whether reached from the standalone list or the in-model workspace
- [ ] Status is rendered as a semantic tag (not a colored dot + badge)

#### V1.2 — Govern
- [ ] Entity **Privileges** tab (view-only standard privileges) and **API** tab (5 default endpoints, enable/disable + description)

---

### C · Tables (ARP-1018)

#### V1 — Foundation
**Goal:** Browse tables and author their columns, data rows, and relationships.

**In scope:**
- [ ] Tables list — search · filters · pagination · create · card → detail — **C.1 / ARP-1026**
- [ ] **Columns** — flat list + **full-detail editor** with sub-tabs **Schema · Rules · Sensitivity · Display**, read/edit toggle, CRUD (add/duplicate/delete), internal name locked, **system columns collapsed by default** (System toggle) — **C.2 / ARP-1027**
- [ ] **Data tab authoring** — add/edit/delete/duplicate rows, per-column dynamic filters + inline quick-filters, row-detail slideout, rows-per-page pagination, horizontal scroll; the add/edit form **omits** id/created_at/updated_at (system) fields — **C.3 / ARP-1032**
- [ ] **Table relationship authoring** — list mode only (no diagram), **3 cardinalities**, FK column + references column (junction + 2 FKs for N:M), **on delete / on update**, nullability, auto nav names — **C.4 / ARP-1033**

**Not in scope (deferred):** Indexes tab, Settings tab, History tab (Full vision); import/export data (post-V1); the ER diagram (Full vision).

**Acceptance criteria:**
- [ ] Clicking a column row opens the inline master-detail editor with the 4 sub-tabs; **Edit** swaps the header to **Cancel / Save** and makes fields editable; internal name stays locked in both modes
- [ ] The column overflow menu (Duplicate · Export configuration · View in audit log · Delete) uses **no red items**
- [ ] "Add row" opens a slideout whose field labels show display name + `internal_name` + type badge + PK/FK badges; id/created_at/updated_at do not appear as form fields
- [ ] Created_at / Updated_at appear as read-only, toggleable **columns** in the Data grid but never as form fields
- [ ] "New relationship" supports 1:1 / 1:N / N:M with On delete = Cascade/Restrict/Set null/No action; "Required" removes nullability

---

### D · Reference Data (ARP-1019)

#### V1 — Foundation
**Goal:** Browse reference lists and author their columns, relationships, and items — identically to Tables.

**In scope:**
- [ ] Reference list — search · filters · pagination · create · card → detail — **D.1 / ARP-1028**
- [ ] Reference detail tabs **Overview · Data · Columns · Relationships** — **D.2 / ARP-1029**
- [ ] Mandatory columns **Label · Code (PK) · Description · Status (enum, default Active)**; additional columns allowed
- [ ] **Columns and Relationships behave exactly as in Tables** (shared editor: Add column, master-detail Schema/Rules/Sensitivity/Display, New relationship)
- [ ] **Item authoring** — Add item slideout (Label*/Code*+PK/Description/Status*), plus consult / edit / **duplicate** / delete

**Not in scope (deferred):** Referenced-by ("dictionary usage") tab, History, Settings (Full vision); Publish (V1.2).

**Acceptance criteria:**
- [ ] The Columns tab shows the 4 mandatory columns with Code marked **PK** and Status as an enum defaulting to **Active**, and an enabled **+ Add column**
- [ ] The Add-item slideout matches the Add-row pattern (typed field labels, PK on Code, enum dropdown on Status), footer **Cancel / + Create row**
- [ ] The item detail exposes **Delete · Duplicate · Deactivate/Reactivate · Edit**

---

### E · Models (ARP-1020)

#### V1 — Foundation
**Goal:** Browse models and open a model to manage its entities and tables.

**In scope:**
- [ ] Models list — search · filters · pagination · create · card → detail; Table / **List (separated cards)** / Grid views — **E.1 / ARP-1030**
- [ ] Model detail tabs **Overview · Entities · Tables**; header actions = **Edit (primary) · Settings (secondary) · overflow menu (tertiary: Open · Duplicate · Export · Delete, no red)** — **E.2 / ARP-1031**
- [ ] Add entity = **associate an orphan entity** OR **create a new one** (direct to scratch at V1)
- [ ] Overview "About this model" = a static (non-accordion) info block; **read-only in view mode**, editable via Edit; tags render as bordered chips with no remove-× in view mode

**Not in scope (deferred):** model **Components** tab (Full vision); model diagram + activity + KPI tiles (Full vision).

**Acceptance criteria:**
- [ ] The List view renders each model in its own card container (visually distinct from the Table view)
- [ ] The Models Table view has no selection checkboxes (bulk actions not in V1)
- [ ] The model header shows exactly one primary (Edit); Delete lives in the tertiary menu and is not red
- [ ] In view mode the About fields are not editable inputs and tags have no × ; Edit switches them to editable

---

## Data model / mock-data reference

The prototype is a single vanilla HTML file (`data-studio-models.html`). Real shapes should mirror these mock objects.

### Objects
- **`MODELS`** — models list. Fields: `id, name, internal, origin, category, status, owner, collab[], updated, tags[], desc, entities` (declared count; `0` for from-scratch).
- **`_ENT_POOL` / `ENTITIES`** — entities. `_md(model)` derives per-model entities/tables (real entities preferred; pool fallback only when `entities > 0`).
- **`TABLES`** — tables. Fields: `id, alias, model, entity, entityId, role(Primary/Secondary), status, owner, rows, tags[], desc, cols[]` where each column = `{ n:internal, d:display, t:Type, req, uq, pk, idx, sens, ev(enum values), desc, fmt }`.
- **`SYSTEM_COLS`** — id, tenant_id, created_at, created_by, updated_at, updated_by, deleted_at (never in create/edit forms).
- **`DATA_SYS_COLS`** — created_at, updated_at (read-only, toggleable Data-grid columns).
- **`REFDATA`** — reference lists; `_refSeedCols()` seeds the mandatory Label / Code(pk) / Description / Status(enum) columns; `values[]` are the items `{ code, label, description, active, valid_from, valid_to }`.

### Column types (badge vocabulary)
`uuid · datetime · date · reference · text · integer · decimal · boolean · enum · json · geo_point · geo_polygon`

### API endpoints (V1.2 — defaults only)
| Method | Path | Purpose |
|---|---|---|
| GET | `/api/{entity}` | list (virtual, enable/disable only) |
| GET | `/api/{entity}/{id}` | fetch one |
| POST | `/api/{entity}` | create |
| PATCH | `/api/{entity}/{id}` | update |
| DELETE | `/api/{entity}/{id}` | delete |

Custom endpoints + request/response customization are **Full vision**.

---

## UI states to implement (V1)

| State | V1 | V1.2 | Full vision |
|---|---|---|---|
| Empty — brand-new object ("No … yet · Add your first") | ✅ | — | — |
| Empty — filtered ("No … match · try a different search") | ✅ | — | — |
| Populated (1–N, list/grid/table) | ✅ | — | — |
| Loading skeleton | ✅ | — | — |
| Error / validation (blocked create, over-limit description) | ✅ | — | — |
| Search / filter applied (chips + quick-filter chips) | ✅ | — | — |
| Confirmation dialog (destructive) — HighlightIcon + centered text | ✅ | — | — |
| Publish / draft banner | — | ✅ | — |
| Bulk selection | — | — | ✅ |

---

## Design constraints

- **Tokens only** — colors via `--tag-*`, `--hi-*`, `--field-*`, `--primary`, etc. No hardcoded hex. Source of truth: `github.com/cachilupis/aims-os-design-system` (`src/index.css`).
- **Overlay rule** — destructive/confirmation → **ModalDialog** (HighlightIcon circle + centered title/description + secondary/primary CTAs). Detail/authoring the user can dismiss → **SlideOut**. Max 1 modal + 1 slideout at once.
- **Menu items** — the DS menu component uses **no red items**; destructive actions read via trash icon + last-position, not color.
- **Tags** — non-primary variants are tinted bg + 1px border; `primary` is solid, no border; status uses the **semantic** tag (not dot + badge); `Featured` uses **informative** (not primary).
- **HighlightIcon** — colored-background icon for card leading slots and metric tiles (`_hlic`), not a flat glyph.
- **Tabs** — active underline only; no full-width divider under a tab bar.
- **Filters** — dropdown filters inline; the "**All filters**" button sits at the right; quick-filters render as a separate chip row (All + facet), not as dropdowns.
- **Header actions** — one prioritized set: primary (Edit) · secondary (Settings, gear icon — not a sun) · tertiary overflow menu.

---

## What's deferred (no V1 commitment)

| Item | Reason deferred | Owner |
|---|---|---|
| Marketplace catalog + Create-with-AI | Needs Start-from-scratch first (per ARP-1015); AI infra | Product / Backend |
| Model **Components** tab (widgets/queries/metrics/datasets) | Full-vision surface | Product |
| **Indexes** tab | Listed "Deferred (not V1)" in ARP-1015 | Backend |
| **History** tab | Generic audit screen, not Data-Studio-owned | Platform |
| **Referenced-by** ("dictionary usage") | Not V1 per canonical | Product |
| **Import / Export** of rows & items | Not in C.3 scope; currently mocked | Backend |
| ER **Diagram** views | Full vision | Design |
| Custom API endpoints · custom Privileges | Tie to V1.2+ governance | Backend |

---

## Open questions

| Question | Asked by | Status |
|---|---|---|
| At V1, should Add-entity / Add-table skip the marketplace and open Start-from-scratch directly? | PM | **Answered** — yes, gated to scratch at V1/V1.2; marketplace is Full vision |
| Is data **Import** in V1 for Reference/Tables, or post-V1? | PM | Open — currently treated as post-V1 (not in C.3) |
| Does the in-model **Table workspace** need full CRUD parity with the standalone Data tab? | Design | **Answered** — yes, implemented (shared `dataTab` via `_recTable`) |
| Is **Composition** (Association / Aggregation / Composition) part of the V1 entity-relationship form? Prototype renders it; canonical **ARP-1025** does not list it (canonical = cardinality + related entity + strength + direction + description). | PM / Eng | **Open** — flagged 2026-08-12. Either add Composition to ARP-1025 scope or remove it from the prototype to align. |

---

## Verification snapshot (2026-08-12)

Cross-checked the prototype against the 13 Sub Features (ARP-1021→1033):
- **All 13 sub-features covered** at the prototype/UX level.
- **QA cross-scope:** 16 surfaces × 3 scopes = **0 render errors**; gating correct (V1 core · V1.2 +Publish · Full vision +Components/Indexes/History).
- In-model and standalone entity-relationship forms were unified during review (same form both entry points).
- One divergence remains **open vs canonical**: the prototype's entity-relationship form shows a **Composition** field that ARP-1025's V1 scope does not list — see Open Questions.

> Reminder: this prototype is the **design source of truth for handoff**, not the shippable build. V1 ships as the React DS implementation + backend/API + tests, built from this spec and the ARP tickets.

---

## Changelog

| Date | Change | Author |
|---|---|---|
| 2026-08-12 | Initial umbrella spec — 5 areas × 3 tiers, cross-checked vs ARP-1021→1033 | Thomas (PM) |
| 2026-08-12 | Aligned to canonical ARP tickets: entity cardinality N:N (was N:M); Composition moved to Open Questions (not in ARP-1025 V1); added entity "Duplicate is out" | Thomas (PM) |
