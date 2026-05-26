# AIMS-OS Prototype

Design prototypes for the next generation of agentic operations at AIMS-OS.

## What's inside

| Prototype | Description | Open |
|---|---|---|
| **Integrations · Admin Studio** | Where you authenticate and govern connections. 40 integrations across 11 business categories, OAuth / API key / Service-account flows, per-studio permissions, instance lifecycle, paginated audit + execution logs. The control plane for credentials and access. | [`settings.html`](settings.html) |
| **Data Studio** | Where data actually flows. Field mapping for authenticated connections with Data Sync. Auto-mapped + custom fields with AI suggestions, schema drift detection, tables connected, sync activity. Cross-functional with Admin Studio. | [`data-studio.html`](data-studio.html) |

The two surfaces are explicitly cross-functional: Admin Studio activates a connection, Data Studio maps its data.

## Local preview

This is a static-HTML prototype — no build step.

```bash
# Any static server works. Examples:
python3 -m http.server 5500
# or
npx serve .
```

Then open `http://localhost:5500/`.

## Walkthrough

### Admin Studio (`settings.html`)

1. **Hub** — `index.html` shows two cards. Click **Integrations · Admin Studio**.
2. **Browse home** — tab strip "Already integrated" vs "Marketplace". Hero with status counts, featured integration, popular grid, partners, request promo. Full catalog below with sticky filter toolbar.
3. **Operate mode** — toggle in the topbar. Switches to a triage view with KPIs and a "Needs Attention" tab as default.
4. **Provider detail** — click any card. Four tabs (Overview, Capabilities, Permissions, Activity). Capabilities is read-only at provider level — activation happens per instance. Activity shows lifecycle events only; full logs live per instance.
5. **Instance detail** — click any instance in the Overview's Instances widget. Six tabs (Basic Info, Capabilities, Authentication, Permissions, Logs, Audit). Logs and Audit have pagination + filters.
6. **Connect wizard** — 7 steps including a new Map fields step that hands off to Data Studio when custom fields need attention.
7. **Request flow** — `+ Request integration` button anywhere. 5-section form for new integration requests + an inbox queue at `#/requests`.
8. **Gate banner** — when a connection has drift or pending mapping, an amber banner offers "Resolve in Data Studio →" which cross-navigates to the Data Studio surface.

### Data Studio (`data-studio.html`)

1. **Connections list** — only authenticated connections with Data Sync. Each card shows status, instance count, events/hr, drift indicator.
2. **Connection detail** — four tabs (Overview, Field mapping, Tables connected, Activity).
3. **Field mapping** — the centerpiece. Per source event, an accordion with auto-mapped fields (collapsed by default) and custom fields needing decisions (accept AI suggestion, create new schema field, or skip). Sticky activation bar at the bottom.
4. **Cross-link back** — "Admin Studio" button in the topbar opens `settings.html` for credential management.

## Documentation

| Document | Purpose |
|---|---|
| **[`docs/DEMO.md`](docs/DEMO.md)** | **Demo walkthrough** — mental model, navigation paths, lifecycle, brief coverage, demo script. Start here. |
| [`docs/spec.md`](docs/spec.md) | Design spec — product decisions, IA, and visual system rationale. |

## Stack

Zero-dependency vanilla HTML / CSS / JS. ~3.2k lines in a single file. All state in-memory. Iconify CDN for brand logos with monogram fallback.

---

*Internal prototype · Not for public distribution.*
