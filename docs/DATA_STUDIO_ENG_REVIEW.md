# Data Studio — Feature Review

> A walkthrough of the Data Studio feature I'm proposing for review.
> Written for the engineering team before we plan the build.

## TL;DR

Data Studio is the surface where our customers turn raw connected data into
the structured tables their agents and teams actually use. It pairs with
Admin Studio (governance) and Agent Studio (tooling) to close the loop:
admins decide *what* can be used, Data Studio decides *what shape it takes*,
and Agent Studio puts it to work.

Five things a customer can do here:

1. **See every table they have, at a glance** — with health status, scale,
   and who depends on each one
2. **Connect a new source** through a guided 6-step flow
3. **Map source fields to a clean canonical schema** — the v2 centerpiece,
   with a visual transformation pipeline
4. **Resolve field-level decisions** across all connections in one inbox
5. **Track schema changes over time** with an audit trail and one-click
   restore

What's new in this v2 (May 2026) versus the previous version:
- Canonical Mapping is now a first-class workspace, not a hidden setting
- Health signals are honest — broken syncs are impossible to miss
- The connect flow drops a redundant "Choose capabilities" step
- Onboarding ends by pointing the customer straight at the mapping work
  (the real next action), instead of leaving them to discover it

---

## 1. The customer problem we're solving

Before this feature, customers who connected a data source ended up with:
- Tables that existed but weren't usable until someone mapped fields manually
- No visible state of "what's connected and healthy" versus "what's broken"
- No structured way to define how raw field names become canonical ones
- No record of who changed what when

Data Studio answers all four. It's the day-2 home for everyone past the
initial setup — admins reviewing what's flowing, data leads shaping the
canonical schema, and platform owners auditing changes.

---

## 2. What the customer can do here

The feature has **six main pages** plus an embedded **onboarding flow**.
Each is described below in terms of what the customer accomplishes, not
how it's built.

### 2.1 Tables — the library view

The landing page for anyone past first-run. The customer sees:
- Every canonical table in their tenant, as a card
- A health indicator per table (healthy / paused / errored)
- The scale (columns and rows) and **downstream impact** ("used by N
  template lines") so they understand blast radius before editing
- A top-level summary: total tables, total rows, errored tables
- Quick filters by source (Snowflake, Salesforce, GitHub, etc.) plus an
  Errors filter that only appears when errors exist
- A prominent **"+ New Table"** action that launches the Connect flow

If a sync is broken, the card is bordered red with a pulsing dot and a
named reason ("Salesforce sync failed"). It's impossible to miss.

### 2.2 Table detail — the workspace

Clicking any table opens a split-layout workspace:
- **Left:** every source field, with type, sample values, and badges (PK
  for primary key, IX for indexed, NN for not nullable, V for validations,
  T for transformations, U for downstream usage count)
- **Right:** a seven-tab inspector for the selected field

The seven tabs:

| Tab | What the customer does here |
|---|---|
| **Field** | Edits the field's basic properties (display name, type, nullability) |
| **Mapping** | Defines how the source field becomes a canonical one. *The v2 centerpiece — see §2.3.* |
| **Sync** | Monitors sync health, sees recent runs, triggers a manual sync |
| **Conn** | Inspects the connection and re-authenticates if needed |
| **Used by** | Sees which templates depend on this field — checks blast radius before editing |
| **Versions** | Reviews change history with one-click restore |
| **Custom fields** | Adds fields not present in the source (computed or manual) |

### 2.3 Canonical Mapping — the v2 centerpiece

This is the headline of the v2 release. For each field, the customer can
build a transformation pipeline:

> SOURCE field → trim → lowercase → dictionary_lookup → TARGET (canonical)

What the customer sees and does:
- A **vertical pipeline** with a cyan SOURCE node, an emerald TARGET node,
  and any number of transformations chained in between
- An **inline catalog of 14 operations** split into Stable (8: trim,
  lowercase, uppercase, round, to_int, to_decimal, default_value,
  replace_null) and Experimental (6: concatenate, dictionary_lookup,
  regex_extract, split_first_token, phone_to_e164, date_parse)
- Experimental operations carry an **amber STUB badge** and the panel
  shows a clear banner: "Behavior may change in future releases"
- Per-operation controls to reorder (move up / move down) or remove
- An editable **snake_case input** for the target field's canonical name,
  with live sanitization
- A **live Before/After preview** that updates as the customer edits
  parameters, so they see the effect of the chain immediately

The persistence is automatic — the customer never has to "save."

### 2.4 Connections — Data Sync inventory

A view of every integration from Admin Studio that has Data Sync enabled.
Each card shows:
- The connection logo, name, and vendor
- Whether its events are mapped to a table yet ("Mapped" or "Needs
  mapping")
- The number of instances, events per hour, and last sync time
- If schema drift has been detected, or if there are custom fields
  waiting for a decision

Customers come here to **resolve pending mappings** before they pile up.
The hero stat strip shows Active / Mapped / Pending at a glance.

### 2.5 Field Mappings — the cross-connection inbox

When a source field doesn't auto-map confidently, it lands in this inbox.
A single view across all connections, with:
- 5 status buckets shown as KPIs (Total / Auto-mapped / Needs review /
  Resolved / Skipped)
- 5 quick-filter pills below to focus the list
- A **Resolve drawer** that opens per row with three choices: accept the
  AI suggestion, create a new field, or skip with a reason

Decisions persist. The "Needs review" count drops as the customer works
through them.

### 2.6 Schema Versions — the change log

A unified timeline of every Table edit in the tenant. Customers come here
to answer questions like:
- "Who changed the `email` field on the `contact` table last Tuesday?"
- "Can I revert that change without breaking downstream templates?"

Bucketed by Today / Yesterday / This week / This month / Older. Each row
shows the table, the change label, the author, and a one-click "Restore"
that creates a backup version first and lets the customer roll back safely.

### 2.7 Onboarding — the guided first-time setup

When a customer lands on the app for the first time, they don't see a
blank library. They see a welcome screen that guides them through 7 steps
across 3 phases:

| Phase | Steps |
|---|---|
| **Tenant** | Welcome → Organization → Composite template → Peer comparison rules |
| **Site** | Site profile → Connect first source |
| **Done** | Summary + handoff to Data Studio mapping |

The flow adapts vocabulary based on the customer's industry — a car
dealership sees "stores," a bank sees "branches," a restaurant chain sees
"locations." Same flow, industry-aware language.

The final step doesn't celebrate and dump the customer on a dashboard. It
points them straight at the next real action — **"Map your fields in Data
Studio"** — with an amber NEXT badge on a pending account-mapping row.

---

## 3. How the pieces connect

Data Studio doesn't live in isolation. Two cross-studio hops matter:

**Admin Studio → Data Studio.** When a customer connects an integration in
Admin Studio and that integration has Data Sync capability, the system
takes them straight to Data Studio Connections to map the new connection's
fields. Mapping no longer happens in the Admin Studio wizard — that change
was explicit in the v2 brief.

**Data Studio → Admin Studio.** From any Connection card, a link returns
the customer to Admin Studio to manage access, change credentials, or
adjust per-workspace exposure. Data shaping stays here; access and
distribution stay there.

**Data Studio → Agent Studio.** Tables defined here become the data source
for tools and agents in Agent Studio. The "Used by N" rollups on Tables
cards reflect how many template lines reference each table.

---

## 4. The patterns we landed on

During the build, three layout patterns emerged that every page on Data
Studio (and across the prototype) follows. They're worth highlighting for
the design system conversation:

**Page header** — title and one-line description on the left, primary
action button on the right.

**Stats strip** — read-only summary cards below the header, color-tinted
by status (green for healthy, amber for needs attention, blue for
informational).

**Toolbar** — search input on the left, status filter pills in the middle,
optional secondary actions on the right. Sits directly above the list.

The pattern is consistent across Tables, Templates, Field Mappings, Schema
Versions, Connections, and Workspaces. A customer learning one page learns
all six.

---

## 5. Spec compliance status

Against the v2 May 2026 spec sections:

| Spec section | Coverage | Notes |
|---|---|---|
| Library View (cards + filters + global action) | **100%** | All requirements met |
| Detail Workspace (split layout + 7 tabs) | **100%** | All 7 tabs present and functional |
| Canonical Mapping (pipeline + STUB banner + snake_case) | **85%** | Multi-source mapping (combining N source fields into one target) is deferred — single-source covers ~95% of demo flows. Documented in `BACKLOG.md`. |
| Create Table Flow (6-step wizard) | **100%** | Category / Connector / Auth / Preview / Mapping / Sync |
| Health Indicators (banners, red dots, red borders) | **100%** | All three visual treatments present |

The only deferred piece is multi-source mapping. It's a structural change
(requires a merge strategy concept — concatenate / pick / coalesce — plus
a data-model migration). Worth its own sprint with engineering input on
the schema.

---

## 6. Decisions I made and want you to validate

These are choices I made in the prototype that need an engineering
perspective before we commit to them in production.

### 6.1 Where customer state lives
The prototype stores customer state locally in the browser between
sessions. That's fine for a demo but obviously not viable for a multi-user
product where the same customer signs in from different devices. We need
to decide the cutover: where the state lives, when it syncs, and what
happens to in-progress edits if connectivity drops.

### 6.2 The transformation catalog scope
The catalog ships with 14 operations: 8 marked stable and 6 marked
experimental. We need to align on:
- Which experimental operations promote to stable for v1
- Whether the catalog is extensible by customers, or curated by us
- How we version operations when behavior changes

The two experimental operations most customers will actually hit are
`concatenate` (combining first_name + last_name) and `dictionary_lookup`
(canonicalizing values via a lookup table). Promoting these to stable
likely requires multi-source mapping (§5 deferred item) to be useful at
full strength.

### 6.3 Connecting and mapping as one journey
The prototype redirects the customer from Admin Studio (after a connect)
straight to Data Studio (to map). That handoff is intentional — mapping
is the real next action, not a side concern. But it also means the journey
crosses two URLs / two studios. We should confirm that's the right user
journey or push to merge the surfaces.

### 6.4 The split between Field and Mapping
Today the inspector has separate **Field** and **Mapping** tabs. Field
edits the property metadata (display name, type, nullability). Mapping
edits the transformation pipeline. We could merge them — they're both
"things you do to a field" — but keeping them separate keeps each tab
focused. Worth a conversation.

### 6.5 Versioning granularity
The prototype captures a version every time a customer changes anything
in a Table. That's complete but noisy — a real customer doing 20 edits
in a session would get 20 versions. We need a heuristic: throttle to one
version per session? Group by author + time window? Only on "publish"?

### 6.6 Industry vocabulary swap
Onboarding adapts the noun ("store" / "branch" / "location") based on
industry preset. Useful for first-run, but the production question is
whether that adaptation should persist into the rest of Data Studio
forever, or only during onboarding. The current prototype keeps it
everywhere — every "site" in the product changes per industry.

---

## 7. What I'm not asking you to build

To set scope expectations clearly:

- The 9 connectors and their mock data are placeholders. Real connector
  integration is a separate workstream.
- The AI suggestion confidence scores are illustrative. The actual scoring
  model is out of scope for this feature.
- The transformation operations execute deterministically in the preview
  for demo purposes. The production execution engine (where these
  transformations actually run on real data) is the data-team's pipeline,
  not this UI.
- Cross-studio shell unification (one consistent navigation across all
  three studios) is tracked separately.

---

## 8. How to review

To experience the feature the way a customer would:

1. **Clear any prior state.** In the browser console:
   `Object.keys(localStorage).filter(k=>k.startsWith('aims_'))
     .forEach(k=>localStorage.removeItem(k))` then refresh.
2. **You'll land on "Welcome to Data Studio"** — the first-run guided
   start. Click "Start first-time setup".
3. **Walk the 7-step onboarding.** Each step explains itself; the Continue
   button gates on required fields.
4. **On the Connect data step,** launch the wizard and complete it (you
   can pick any source — try HubSpot for the most-populated demo).
5. **On the Done step,** click the primary CTA "Map your fields in Data
   Studio." You'll land on the Table detail with the Mapping tab open.
6. **Try adding transformations** — pick a field, click "Add
   transformation," chain a few stable and STUB operations, watch the
   live preview update.
7. **Visit the other pages** via the sidebar: Tables, Field mappings,
   Schema versions, Templates. Each follows the same shape (page header,
   stats strip, toolbar, list).

The sidebar also has demo controls:
- **Industry preset** — switches vocabulary across the product
- **Take the guided tour** — interactive walkthrough of all surfaces
- **Reset to first time setup** — back to a clean state
- **Show errors** — toggles synthetic error states so you can see how
  health signals render

---

## 9. What I want from this review

In priority order:

1. **Is the user journey right?** Especially the cross-studio handoffs
   (Admin Studio → Data Studio after connecting; the onboarding → mapping
   handoff at the end).
2. **Are the entity boundaries right?** Connection / Table / Field /
   Template / Workspace. Anything missing, anything doubled?
3. **Validate the multi-source mapping proposal** in `BACKLOG.md` before
   we start that work — the data model decision (merge strategies +
   schema) is the part that needs engineering input.
4. **Where does customer state live and how often does it sync?** This
   is the biggest production question and the one I have the least
   confidence on.
5. **Decisions in §6** — pick the ones you have an opinion on.
6. **Anything you'd ship differently.** If a section confused you while
   walking the demo, that's the highest-signal feedback.

---

## 10. Reference docs

- `BACKLOG.md` — the multi-source mapping work, deferred with full
  context for resumption
- `DEMO.md` — end-user demo script
- `OnboardingFlow.md` — onboarding spec the implementation matches
- `FILTERS_SPEC.md` — filter slideout design handoff
- `spec.md` — the original engineering brief this proposal builds on

---

*This is a design prototype. All data is mocked. The intent is to align on
shape and journey before we plan the production build.*
