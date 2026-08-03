# Feature: Helix Data Studio

Single prototype (`helix-data-studio.html`) that merges the existing integrations
prototype (`data-studio.html`) and Sebastian's onboarding / mapping / table-definition
artifact into ONE project — one navigation, one theme, one scope vocabulary.

**Mode:** incremental on the existing stack. Do NOT rebuild or restyle — conform to the
existing component patterns, visual language and layout grid.

**Canonical naming (non-negotiable in all copy):** Helix Data Studio · Helix Governance
Studio · Work Surfaces · Agentic Studio · ORI · Truth Plane · Sandbox Plane ·
canonical schema · certified connector · integration Type 1/2/3 · sensitivity tier ·
ACL + PBAC. Never: "Data Studio", "integration studio", "Ori", "copilot", "RBAC".

---

## Scope Ladder (4 positions)

The switcher reuses the Work Surfaces scope vocabulary. Selecting a position renders that
scope **and everything below it**; scopes **above** the selection are hidden (not disabled).
Selection persists during the session. Default on load: **V1**.

| Tier | Name | What it means |
|---|---|---|
| **V1** | Governed ingestion | Connect certified sources, map to canonical schema, resolve drift, activate. The sprint scope. |
| **V1.5** | Semantic layer | Table definitions, template builder, table-scoped calculated fields, request intake. |
| **V2** | Consumption | Cards, dashboards, in-conversation cards, field-level visibility. |
| **V3** | Tenant self-service | Employee library, custom connector builder, integration Types 2/3, full approval hierarchy. |

Ladder order (bottom→top): `v1` → `v1.5` → `v2` → `v3`.

---

## Scope Registry — every element tagged

### V1 · Governed ingestion  _(untagged = default visible)_
- [ ] Connector list — **admin setup** surface (plain list; no marketplace framing, no "popular in your workforce", no category merchandising)
- [ ] Certified connector setup — credentials, tenant assignment, delivery model (webhook / polling 15-min / historical batch), instance selector (dev / staging / production)
- [ ] Spreadsheet + flat-file source — SFTP / batch
- [ ] Data-sync capability display — **integration Type 1 only**
- [ ] Mapping queue — standard fields shown resolved; custom/extension fields queued with ORI suggestion + confidence score; manual override; create custom field against canonical schema; explicit "ignore field"
- [ ] Sensitivity tier chip per field — masking applied in the mapping view
- [ ] **Drift queue** (see Behaviour B)
- [ ] **Activation gate** (see Behaviour A)
- [ ] **Cross-tenant mapping clone + diff** (see Behaviour C)
- [ ] Cross-tenant work queue — for the AIMS operator
- [ ] Audit trail — who mapped what, incl. AIMS personnel acting inside a tenant
- [ ] Version history + rollback — on a mapping

### V1.5 · Semantic layer  `data-version="v1.5"`
- [ ] Table definition browser
- [ ] Template builder — curated template / ORI / spreadsheet upload / blank
- [ ] Field metadata — type, required, validations, description, includes/excludes, polarity
- [ ] Calculated fields — **table-scoped only**, searchable field picker restricted to that table
- [ ] ORI assist — "what can I calculate from these fields"
- [ ] Table-level refresh + staleness state
- [ ] Version history + rollback — on a table definition
- [ ] Minimal request intake — requester form + ONE approval level

### V2 · Consumption  `data-version="v2"`
- [ ] Card builder — fed by table definitions
- [ ] Dashboard composition
- [ ] In-conversation cards
- [ ] Field-level visibility — field participates in a calculation without being rendered; role exception resolved by policy, not a display toggle
- [ ] Grid / form / metric views

### V3 · Tenant self-service  `data-version="v3"`
- [ ] Employee-facing consumption library — on/off by permission, NO audit logs, NO governance chrome
- [ ] Per-studio enablement toggles
- [ ] "Promote to library" action
- [ ] Full approval hierarchy — incl. a Helix Governance Studio step
- [ ] Custom connector builder — webhook builder, OpenAPI import, SDK
- [ ] Integration Types 2 and 3 — tool nodes, HITL, Council guardrails
- [ ] Enablement stats dashboard

---

## Three V1 behaviours (missing from all current artifacts — build in V1)

**A · Activation gate.** A source is NOT usable until every field is resolved or explicitly
ignored. Visible blocking state on the connector, live count of unresolved fields, and a
disabled-with-reason Activate control (never a disabled mystery button). Downstream surfaces
show the source as unavailable while the gate is closed.

**B · Drift as a recurring normal flow.** Fixtures include an already-active connector that
then receives a NEW unrecognised field and STOPS receiving a previously mapped field. Both
land back in the mapping queue with distinct treatments ("new field" vs "field no longer
arriving" / stale). Routine operation, NOT an error — do not style as failure. Reachable
live from the demo controls.

**C · Cross-tenant mapping clone + diff.** From a resolved mapping, clone to a second tenant.
Standard fields carry over resolved; custom fields arrive marked pending. Diff view of the
same connector's mapping across two tenants so divergence is visible.

---

## Decision Pins

Clickable pins (pattern from the Admin Console prototype) sit ON the affected surface, never
in a separate list. Each pin opens: the question, the options with the recommended one
flagged, and the owner. Two weights — **BLOCKING** (blocks sprint) and **OPEN** (does not).

| Pin | Surface | Scope | Weight | Owner |
|-----|---------|-------|--------|-------|
| D2 — Are sample values masked, hydrated with consent, or ORI-mediated so the operator never sees the raw value? | sample-values panel in mapping queue | V1 | BLOCKING | Mike |
| AWS — How does an AIMS operator reach a tenant running in dedicated AWS? | tenant selector | V1 | BLOCKING | Edgardo, ratified by Mike |
| SCOPE — Is a mapping tenant-scoped or location-scoped? | mapping header | V1 | BLOCKING (data model) | Mike |
| D6 — Is email-attachment ingestion a supported source? | spreadsheet/flat-file source setup | V1 | OPEN | Mike |
| D5 — Is a table definition schema configuration or governed content? | table definition detail | V1.5 | OPEN | Mike |
| D4 — Is the request pipeline a product surface or an internal AIMS tool? | request intake form | V1.5 | OPEN | Mike |
| D3 — Who owns the card/widget builder: Helix Data Studio or Work Surfaces? | card builder | V2 | OPEN | Mike, w/ Julian on feasibility |
| D1 — Does the consumption library live in Work Surfaces or Helix Data Studio? | library view | V3 | OPEN | Mike |

---

## Demo apparatus
- Hidden **"Demo states"** control — force loading / error / empty per region; trigger the drift scenario on demand.
- **"Reset demo"** — restore all fixtures, close drawers, clear toasts.
- Full V1 walkthrough — connect → map → resolve custom fields → activate → clone to second tenant — walkable in < 90s with zero dead ends.

---

## Deferred (no version assigned)
- _None yet — all spec items are assigned to a tier. Flag here as decisions surface._

---

## Changelog

### V1 — Governed ingestion
**Release target:** current sprint

**New in this version:**
- Foundation: new `helix-data-studio.html` built on the existing stack/theme; one nav, one theme.
- Scope switcher: 4-position (V1 / V1.5 / V2 / V3) using the Work Surfaces vocabulary; shows selected scope + everything below; persists; defaults to V1.
- Connector list: admin-setup surface (plain list, no marketplace framing).
- Certified connector setup: credentials, tenant assignment, delivery model, instance selector.
- Spreadsheet/flat-file source: SFTP/batch.
- Mapping queue: standard resolved; custom queued w/ ORI suggestion + confidence + override + create-custom-field + ignore-field.
- Sensitivity tier chips + masking in the mapping view.
- Activation gate; drift queue (new-field + stale-field); cross-tenant clone + diff; cross-tenant work queue; audit trail; mapping version history + rollback.
- Decision pins: D2, AWS, SCOPE (BLOCKING) + D6 (OPEN) on their V1 surfaces.
- Demo apparatus: Demo states + Reset; < 90s walkthrough.

**Updated in this version:** n/a — first version of this merged prototype.

**Removed / not included:**
- Semantic layer, consumption, tenant self-service — deferred to V1.5 / V2 / V3 (present as tagged regions + callouts).

### V1.5 — Semantic layer
**Release target:** next sprint

**New in this version:**
- Table definition browser; template builder (curated / ORI / spreadsheet / blank).
- Field metadata (type, required, validations, description, includes/excludes, polarity).
- Table-scoped calculated fields + ORI "what can I calculate"; table refresh + staleness.
- Table-definition version history + rollback; minimal request intake (form + one approval).
- Decision pins: D5, D4 (OPEN).

**Updated in this version:**
- Mapping queue: resolved fields now feed the table-definition browser.

**Removed / not included:** consumption + tenant self-service — deferred to V2 / V3.

### V2 — Consumption
**Release target:** TBD

**New in this version:**
- Card builder fed by table definitions; dashboard composition; in-conversation cards.
- Field-level visibility (policy-resolved); grid / form / metric views.
- Decision pin: D3 (OPEN).

**Updated in this version:**
- Table definitions: now selectable as card sources.

**Removed / not included:** tenant self-service — deferred to V3.

### V3 — Tenant self-service (Full Vision)
**Release target:** TBD

**New in this version:**
- Employee consumption library (permission-gated, no governance chrome); per-studio enablement; promote-to-library.
- Full approval hierarchy incl. Helix Governance Studio; custom connector builder (webhook / OpenAPI / SDK); integration Types 2 & 3; enablement stats.
- Decision pin: D1 (OPEN).

**Updated in this version:**
- Cards + dashboards: now promotable into the employee library.

**Removed / not included:** _None — this is the complete version._
