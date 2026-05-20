# AIMS-OS Prototype

Design prototypes for the next generation of agentic operations at AIMS-OS.

## What's inside

| Prototype | Description | Open |
|---|---|---|
| **Integrations** (Settings) | Transversal Settings surface with a marketplace-style Integrations catalog. 40 integrations across 11 business categories, real brand logos, OAuth/API key/Service-account connect flows, per-studio permissions, workspace-wide audit log, private integration builder (Webhook · OpenAPI · SDK), and a contextual AI Assistant. | [`settings.html`](settings.html) |

More prototypes will land here as we build them out.

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

1. **Hub** — `index.html` shows the Integrations card. Click it.
2. **Marketplace home** — search hero, category strip, "Active in your workspace" with health dots, featured integration, popular grid, "New from verified partners", "Build your own" promo, and a full browse-all section with source tabs and filter pills.
3. **Integration detail** — click any card. Four tabs:
   - **Overview** — vendor info, capabilities, use cases, required OAuth scopes, compliance badges.
   - **Capabilities** — Tools / Knowledge sources / Triggers / Channels, each with toggles and metadata.
   - **Permissions** — toggle availability per studio (Governance/Agentic/Workforce) and per role.
   - **Audit** — events filtered to this integration.
4. **Connect drawer** — click `Connect` on any non-connected integration. Wizard with auth method choice (OAuth / API token / Service account), scope selection per studio, and confirmation.
5. **Audit log** — sidebar item or `Audit log →` from the page header. Filterable table with severity, actor, resource, IP, and expandable JSON details.
6. **Build your own** — `+ Build your own` tab in the catalog. Three methods: Webhook builder (6-step wizard), OpenAPI import, Code SDK.
7. **Personal Integrations** — sidebar item. Same UI scoped to personal connections.
8. **AI Assistant** — `✨ Ask AI` button on any integration detail. Streaming responses with contextual answers per integration, suggested prompts, and follow-up suggestions.

## Design spec

The product decisions, IA, and visual system are documented in [`docs/spec.md`](docs/spec.md).

## Stack

Zero-dependency vanilla HTML / CSS / JS. ~3.2k lines in a single file. All state in-memory. Iconify CDN for brand logos with monogram fallback.

---

*Internal prototype · Not for public distribution.*
