# Helix Data Studio — Engineering Handoff Spec

**Prototype:** `helix-data-studio.html` (single-file, vanilla HTML/CSS/JS, on the existing
Data Studio stack/theme).
**Companion:** `HELIX_DATA_STUDIO_VERSION_MAP.md` (scope ladder, registry, changelog).
**Sprint scope:** **V1 · Governed ingestion.** V1.5/V2/V3 are scaffolded (tagged regions +
callouts) so engineering can see where it's heading — do **not** build them this sprint.

Canonical naming is non-negotiable in all copy: **Helix Data Studio · Helix Governance
Studio · Work Surfaces · Agentic Studio · ORI · Truth Plane · Sandbox Plane · canonical
schema · certified connector · integration Type 1/2/3 · sensitivity tier · ACL + PBAC.**
Never "Data Studio", "Ori", "copilot", "RBAC".

---

## How to read the prototype
- **Scope switcher** (floating, draggable, bottom-right): 4 positions. Selecting a tier shows
  it **and everything below**; higher tiers hide. Default V1. The **changelog** button on the
  switcher opens the per-tier New/Updated/Removed list; clicking a tier previews it live.
- **Decision pins** sit ON the affected surface. **BLOCKING** (amber) block the sprint;
  **OPEN** (blue) do not. Click a pin for the question, options (recommended flagged), owner.
- **Demo controls** (sidebar): Industry preset · Reset to first-time setup · Show errors ·
  **Trigger schema drift** · **Reset demo** (restores fixtures, closes drawers, clears toasts).

---

## V1 acceptance criteria (this sprint)

### Connectors (admin setup — NOT a marketplace)
- [ ] Connector list is a plain admin-setup surface: Active connections + "Available to
      activate". No merchandising / "popular" / category browsing.
- [ ] Certified connector setup captures: credentials, **tenant assignment**, **delivery
      model** (webhook / polling 15-min / historical batch), **instance** (dev / staging /
      production). Data-sync capability shown as **integration Type 1**.
- [ ] Spreadsheet / flat-file source via **SFTP / batch** with the same setup fields.

### Mapping queue
- [ ] Standard fields shown auto-resolved (100% confidence, no action).
- [ ] Custom/extension fields queued with **ORI suggestion + confidence %**, **manual
      override**, **create custom field** against the canonical schema, and explicit
      **ignore field**.
- [ ] Every field carries a **sensitivity tier** chip; the mapping view shows **masked**
      sample values only.
- [ ] Mapping is **tenant-scoped** (see SCOPE pin).

### Activation gate  *(named behaviour A)*
- [ ] Source is unusable until every field is resolved or ignored.
- [ ] Gate-closed state is visible, shows a **live unresolved count**, and the Activate
      control is **disabled with a stated reason** (e.g. "Activate — 2 unresolved"), never a
      mystery disabled button.
- [ ] Downstream surfaces show the source as unavailable while the gate is closed.
- [ ] Gate opens only when count = 0; activating flips the source to active/flowing.

### Drift as a recurring normal flow  *(named behaviour B)*
- [ ] An already-active connector can receive a **new unrecognised field** and **stop
      receiving a previously-mapped field**; both return to the queue with **distinct**
      treatments ("New field" → create/ignore; "No longer arriving" → keep last value /
      retire).
- [ ] Styled as **routine**, not an error. Reachable live via the demo control.

### Cross-tenant clone + diff  *(named behaviour C)*
- [ ] From a resolved mapping, **clone to a second tenant**: standard carries over resolved,
      custom lands **pending**.
- [ ] **Diff view** shows the same connector's mapping across two tenants so divergence is
      visible.
- [ ] **Cross-tenant work queue** for the AIMS operator (tenant × connector × pending count).

### Audit + versioning
- [ ] Mapping **version history + rollback**; audit records **who mapped what, including AIMS
      personnel acting inside a tenant** (tagged `AIMS`).

---

## Decision pins — resolve BLOCKING before/at sprint start

| Pin | Surface | Weight | Owner |
|-----|---------|--------|-------|
| **D2** — Sample values: masked, consent-hydrated, or ORI-mediated so the operator never sees raw? | sample-values panel, mapping queue | **BLOCKING** | Mike |
| **AWS** — How does an AIMS operator reach a tenant in dedicated AWS? | tenant selector | **BLOCKING** | Edgardo, ratified by Mike |
| **SCOPE** — Mapping tenant-scoped or location-scoped? | mapping header | **BLOCKING (data model)** | Mike |
| D6 — Email-attachment ingestion supported? | file-source setup | OPEN | Mike |
| D5 — Table definition = schema config or governed content? | table def detail (V1.5) | OPEN | Mike |
| D4 — Request pipeline = product surface or internal tool? | request intake (V1.5) | OPEN | Mike |
| D3 — Card builder owner: Helix Data Studio or Work Surfaces? | card builder (V2) | OPEN | Mike + Julian |
| D1 — Consumption library: Work Surfaces or Helix Data Studio? | library (V3) | OPEN | Mike |

The three BLOCKING pins gate the data model / operator-access design — they should be
resolved before implementation locks.

---

## Data shapes implied (mock → real)
The prototype uses deterministic in-memory fixtures behind these shapes; back them with typed
adapters:

- **Connection**: `{ slug, name, vendor, instances, deliveryModel, instance(env), tenant,
  mapped:bool, drift:bool, lastSync, eventsPerHour, events[], targetTables[] }`
- **Event**: `{ name, rate, autoMappedCount, custom:[Field] }`
- **Field (custom)**: `{ name, type, suggested?:string, confidence?:number, decision?:'accept'|
  'create'|'ignore'|'keep'|'retire', sensitivityTier, isNew?:bool, stale?:bool, wasMappedTo? }`
- **Activation gate** = derived: `unresolved = count(custom where !decision)`; source active iff
  `unresolved==0 && activated`.
- **Cross-tenant clone** = per-(connector, tenant) mapping; standard resolved, custom pending.
- **Version/audit entry**: `{ version, actor, isAIMS:bool, action, at }`.

---

## Demo readiness
- **< 90-second V1 walkthrough** (verified, zero dead ends): connect (file source) → open a
  pending connector → resolve custom fields → activate (gate opens) → clone to a second tenant
  → diff.
- Every drawer supports **ESC · overlay-click · Close · focus-trap · focus-restore**.
- Use **Trigger schema drift** to demo behaviour B live; **Reset demo** to return to a clean
  state.

## Non-goals this sprint
Semantic layer (V1.5), consumption (V2), tenant self-service (V3) — scaffolded only. Custom
connector builder and integration Types 2/3 are V3.
