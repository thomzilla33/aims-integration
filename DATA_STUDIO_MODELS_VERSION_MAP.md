# Data Studio — Models · Version Map & Engineering Handoff

> **Prototype:** `data-studio-models.html` (single-file vanilla HTML/CSS/JS)
> **Canonical scope source:** **Edgardo Sierra product walkthrough** (transcript). This overrides earlier assumed scope.
> **Scope engine in the prototype:** draggable Scope toggle **V1 · V1.2 · Full vision** + live Scope-changelog (`window.SCOPE_CHANGELOG`) + `[data-version]` gating.
> **States:** `Published · Draft · Deprecated` (only these three).

---

## 0. The one correction that changes everything

Earlier this map scoped **V1 as read-only browse.** That is **wrong.** Per Edgardo, **V1 includes authoring** — create-from-scratch and full editing of the core objects (tables, columns, entities, relationships, data rows). Only **Publish/versioning, API, custom privileges, Marketplace, Create-with-AI, diagrams and the rich SlideOut preview** are deferred.

| Tier | Name | What it means |
|---|---|---|
| **V1** | Foundation | Browse **and author** the model: the 4 lists + create-from-scratch + full editable detail (incl. the column editor, data-row authoring, relationship authoring). |
| **V1.2** | Expansion | Govern: **Publish**, **Privileges** (view-only), **API** (5 default endpoints, enable/disable + description). |
| **Full vision** | Complete | API builder (custom endpoints), Marketplace, AI/ORI modeling, diagrams, custom privileges, rich previews, reference-usage, indexes, settings, history. |

**Build order for engineering (reverse of display — entities are composed of tables):**
`Tables → Reference Data → Entities → Models`. **Marketplace last** (Start-from-Scratch must exist first to feed it). Navigation stays as-is.

---

## 1. Rules that apply to ALL four areas (Models · Entities · Tables · Reference)

**V1**
- List with **search + filters + pagination**. The prototype's specific filters are illustrative — real filters TBD by design.
- **Click the card → go straight to the full editable detail** (the Overview). *(Danilo/Thomas: the card click = the "open" action.)*
- **New button → a Marketplace modal**, but in V1 **only "Start from Scratch"** is required (Marketplace catalog + Create-with-AI = later).
- **Create from Scratch**: keep **Owner · Category · Tags · Description** + name→autogenerates. **Remove "Stewards" everywhere** (deprecated concept). AI-suggested fields = later.
- Overview tab = **just the basic info block** (no widgets, no filters).

**Deferred (NOT V1)**
- **SlideOut preview** (the eye → side panel) — nice-to-have; if built, text-only first.
- **Publish / versioning** — editing saves to **Draft** in V1; **publish is V1.2**.
- Card 3-dot kebab actions (clone / export / delete). Destructive actions live *inside* the detail, not on the card.

---

## 2. Per-area scope

### Models
- **V1:** list + create-from-scratch. Detail tabs → **Entities · Tables** (+ Overview basic block). "Add entity" = **associate an orphan** entity OR **create new** (→ Start-from-Scratch).
- **Later:** History.

### Entities
- **V1:** list + create. Detail tabs → **Tables · Relationships** (+ Overview basic block).
- **V1.2:** **Privileges** tab (view-only standard privileges) · **API** tab (5 default endpoints — enable/disable + description only).
- **Full vision:** API two-pane builder (custom endpoints) · custom privileges.

### Tables
- **V1:** list + create. Detail tabs → **Columns · Relationships · Data** (+ Overview basic block).
- **Later:** Indexes · Settings (undefined) · History (generic screen, not Data Studio).

### Reference Data
- **V1:** list + create. Detail tabs → **Columns · Relationships · Data** (+ Overview basic block). Mandatory columns = **Label · Code · Description · Status**. Column has **no Reference sub-tab**.
- **Later:** "Referenced by" (dictionary-usage shortcut) · Settings · History.

---

## 3. The big V1 surfaces the prototype still needs (build items)

These are **V1** per Edgardo but not yet built as functional flows in the prototype. They are the bulk of the work.

### 3.1 Column detail editor (Tables & Reference)
- Click a column → **full column screen** with tabs **Schema · Rules · Sensitivity · Display** *(Reference tab = later)*.
- **Edit button** enables field editing (NOT the "select all" toggle — that toggle does not ship).
- **Internal name is never editable** (display name can change; internal is locked after creation).
- **System columns collapsed** by default in the list (view-only: see where used, config, duplicate — no edit).
- A **column config pop-up** for info too long to sit in the table row.
- Column list actions: **Create** (minimal detail → then edit) · **Edit** · **Duplicate** · **Delete**.
- Column detail menu: **Detach + Publish** only.

### 3.2 Data authoring (Tables & Reference)
- Infinite table, lateral scroll, column-visibility picker, pagination.
- **Dynamic filters per column** (by column type — not a fixed filter set).
- **Add row → dynamic form** built from the table's columns, **omitting `id`, `created_at`, `updated_at` and all system/mandatory fields** (managed internally).
- **Row detail** as a form (view a full record).
- Row menu: **Delete row · Duplicate row** (+ Edit; + next-record navigation).

### 3.3 Relationship authoring (Tables & Entities)
- **List mode only** (no diagram in V1).
- **Table relationships:** two sections — *incoming* (others → me, read-only; edit at the source table) and *outgoing* (me → others, editable).
- **Create** in **3 cardinalities** (1-1 · 1-N · N-N): target table, target column, my column, **on-delete** (Cascade / Restrict / Set-null / No-action), **on-update**, optional/required (`Required` removes nullability).
- **Edit** limited to on-delete / on-update / description (type, table, column locked). **Delete** available.
- **Entity relationships** are entity↔entity: cardinality + **strength (strong / weak)** + composition + direction. Mandatory fields gate the Create button.

---

## 4. What the prototype already has vs. Edgardo's V1

| Surface | In prototype | vs. canonical V1 |
|---|---|---|
| 4 lists + search + filters + pagination | ✅ | V1 ✓ |
| Card → detail navigation | ✅ | V1 ✓ (ensure card click = full detail, not preview) |
| Create-from-scratch (New) | ✅ (now un-gated to V1) | **remove "Stewards"** |
| Entity Tables / Relationships tabs | ✅ (read-only) | V1 — **need authoring** (§3.3) |
| Table Columns / Data / Relationships tabs | ✅ (read-only) | V1 — **need column editor §3.1, data authoring §3.2, rel authoring §3.3** |
| Column detail editor | ⬜ | **V1 — missing (§3.1)** |
| Data add/edit/delete rows | ⬜ | **V1 — missing (§3.2)** |
| Relationship create/edit/delete | ⬜ | **V1 — missing (§3.3)** |
| Privileges tab | ✅ (gated V1.2) | V1.2 — make view-only |
| API tab | ✅ full builder (gated Full vision) | **V1.2 = 5 defaults enable/disable + description only**; the builder is Full vision |
| Publish | ✅ (gated V1.2) | V1.2 ✓ (out of V1) |
| SlideOut preview | ✅ (shows at V1) | **defer — nice-to-have, not V1** |
| States | Published/Draft/Deprecated ✅ | ✓ |

---

## 5. Acceptance criteria per tier

**V1** — a modeler can, at scope V1:
- [ ] Browse all 4 lists (search · filter · paginate) and open any item's **full editable detail** from the card.
- [ ] **Create** a table / reference / entity / model / column **from scratch** (no Stewards).
- [ ] Edit a **column** end-to-end (Schema · Rules · Sensitivity · Display; internal name locked; system columns collapsed).
- [ ] **Add / edit / delete data rows** (dynamic form hides id + audit fields; dynamic per-column filters).
- [ ] **Create / edit / delete relationships** (3 cardinalities; on-delete/on-update; list mode).
- [ ] No Publish, no API builder, no custom privileges, no Marketplace, no diagrams.

**V1.2** — plus: Publish/save-to-version · Privileges (view-only) · API (5 defaults enable/disable + description).

**Full vision** — plus: API two-pane builder + custom endpoints · Marketplace (Profile + Implement/Clone) · AI/ORI modeling · diagrams · custom privileges · reference-usage · indexes · settings · history.

---

## 6. In-prototype scope mechanics

- **Toggle** V1 · V1.2 · Full vision (`setScope`) + Scope-changelog drawer (`showScopeChangelog`, data in `window.SCOPE_CHANGELOG`). Middle tier label = **V1.2** (engine key stays `v1.5`).
- `applyScope()` shows any `[data-version]` element whose tier ≤ selected; a `MutationObserver` re-applies after re-render.
- **Tagged today:** `TAB_VER = { privileges:'v1.5' (V1.2), history:'v2', settings:'v2', indexes:'v2', api:'v2' }`; Publish button → `v1.5` (V1.2); New → **V1 (un-gated)**.
- **Tagging still to add** (behavior work): gate the **SlideOut preview** out of V1; make **card click open the full detail** (not the preview) at V1.

---

## 7. Deferred / out of scope
- Marketplace catalog · Create-with-AI · AI/ORI modeling · diagrams · rich SlideOut previews · custom endpoints/privileges · reference-usage view · indexes · settings.
- History (generic screen, not Data Studio).
- Real backend / persistence / publish execution.

---

*Canonical V1 per Edgardo Sierra's walkthrough. Keep this file next to `data-studio-models.html`; the live Scope-changelog (`window.SCOPE_CHANGELOG`) mirrors §0–§2. Next: hand to Michael for visual; engineering builds §3 in the order Tables → Reference → Entities → Models.*
