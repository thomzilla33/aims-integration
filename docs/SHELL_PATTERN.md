# AIMS-OS Shell Pattern

> **Source of truth: `agentic-studio.html`**
> All new surfaces — and eventually all existing ones — must adopt this shell pattern verbatim. Studio-specific content goes inside; the chrome (sidebar + topbar + menu primitives) stays identical.

---

## Why this exists

Before this doc, every studio reinvented its sidebar + topbar. Result: 4 different shells across `data-studio.html`, `settings.html`, `agent-tools.html`, and `agentic-studio.html`. The differences weren't intentional — they were drift.

This document captures the canonical pattern from `agentic-studio.html` so:

- New surfaces know exactly what to copy.
- Existing surfaces have a clear migration target.
- Eng / production team has a single shell spec to implement once.

---

## 1. Layout

```
┌─────────────────────────────────────────────────────────┐
│                       TOPBAR (60px tall, full width)    │
├─────┬───────────────────────────────────────────────────┤
│     │                                                   │
│ SB  │              MAIN content area                    │
│     │                                                   │
│     │                                                   │
└─────┴───────────────────────────────────────────────────┘
```

- App body: `display:flex; min-height:100vh`
- `.app` wrapper: `padding:60px 8px 8px 0` — reserves space for the fixed topbar at top, gap to right edge
- `.main`: `flex:1`, `border-radius:12px`, scrolls internally
- `.sidebar`: 52px collapsed, 220px expanded (toggle stored in localStorage)

Page padding is critical — the topbar floats above the content (`position:fixed`), so the body needs a 60px top offset.

---

## 2. Theming (CSS variables)

All shell styling reads from `--shell-*` custom properties. Dark mode is default; `html.theme-light` overrides the same vars with light tokens. **Do not add per-component theme rules** — extend the variable set instead.

Key variables:

| Variable | Dark | Light |
|---|---|---|
| `--shell-page-bg` | `#0F1729` | `#F8FAFC` |
| `--shell-topbar-bg` | translucent dark | translucent white |
| `--shell-sidebar-bg` | dark gradient | `#FFFFFF` |
| `--shell-sidebar-item-color` | dim white | dim slate |
| `--shell-sidebar-item-icon-bg` | rgba(255,255,255,0.04) | rgba(15,23,42,0.04) |
| `--shell-sidebar-item-icon-hover-bg` | rgba(255,255,255,0.08) | rgba(15,23,42,0.08) |
| `--shell-menu-bg` / `--shell-menu-border` | dark stack | white + slate border |
| `--shell-menu-shadow` | deep shadow + 1px border | subtle shadow |
| `--shell-accent-blue` | `#2B7FFF` | `#2B7FFF` |

Toggle is `document.documentElement.classList.toggle('theme-light')` + persist to localStorage `aims-theme`.

---

## 3. Sidebar

### HTML structure

```html
<nav class="sidebar" id="appSidebar" aria-label="Main navigation">
  <div class="sb-nav">

    <!-- Standard item -->
    <button class="sb-item" onclick="..." title="Label" aria-label="Label">
      <span class="sb-item-icon"><svg>…16x16 stroke…</svg></span>
      <span class="sb-label">Label</span>
    </button>

    <div class="sb-divider"></div>

    <!-- Active item -->
    <button class="sb-item active" aria-current="page" title="..." aria-label="...">
      <span class="sb-item-icon"><svg>…</svg></span>
      <span class="sb-label">…</span>
    </button>

    <!-- Expandable item with sub-nav -->
    <button class="sb-item" id="sbXBtn" onclick="toggleSbSection('sbXSub','sbXBtn')">
      <span class="sb-item-icon"><svg>…</svg></span>
      <span class="sb-label">Section</span>
      <svg class="sb-chevron" viewBox="0 0 13 13"><path d="M3 5l3.5 3.5L10 5"/></svg>
    </button>
    <div class="sb-sub" id="sbXSub">
      <button class="sb-sub-item sub-active">
        <span class="sb-sub-dot"></span>
        <span class="sb-sub-label">Sub item</span>
        <span class="sb-sub-count">5</span>
      </button>
      …
    </div>

  </div>

  <!-- Collapse toggle pinned to bottom -->
  <div class="sb-bottom">
    <button class="sb-toggle" id="sbToggleBtn" onclick="sbToggle()"
      aria-label="Toggle sidebar" aria-expanded="false">
      <svg class="sb-toggle-icon">…</svg>
      <span class="sb-toggle-label">Collapse</span>
    </button>
  </div>
</nav>
```

### Behavior

- **Collapsed (default)**: 52px wide, icon-only. `.sb-label` hidden via `opacity:0`. Sub-navs forced hidden.
- **Expanded**: 220px wide via `.sb-expanded` class on `.sidebar`. Labels fade in, chevrons appear, sub-navs become available.
- **Active**: Icon container gets `var(--grad)` blue gradient. When expanded, the full row also gets a `rgba(43,127,255,0.10)` pill background.
- **Hover**: Only the icon container's background changes (not the whole row).
- **Sub-navs**: Click parent → toggles `.sb-sub.open`. Chevron rotates 180°.
- **Persistence**: Sidebar expanded state stored in localStorage `aims-sidebar-expanded`.

### Canonical items (Agentic Studio surface)

```
Control Tower (stub)
─── divider ───
Agents
Squads
Workflows
Agentic Networks  ★ active
─── divider ───
Playbooks ▾ (expandable)
  ├─ All Playbooks   [5]
  ├─ Sales & GTM
  ├─ Customer Support
  ├─ Finance & Legal
  └─ HR & Onboarding
─── divider ───
Admin ▾ (expandable)
```

**Other studios adapt the item list to their content** but keep the structure identical (icon + label + optional chevron/sub-nav).

---

## 4. Topbar

### HTML structure

```html
<header class="topbar">

  <div class="tb-left">
    <!-- Context (app) switcher -->
    <div class="tb-context-wrap">
      <button class="tb-context" id="ctxLauncher" onclick="toggleContextMenu(event)"
        aria-haspopup="menu" aria-expanded="false">
        <div class="tb-context-logo" style="background:linear-gradient(...)">AS</div>
        <span class="tb-context-name">Agentic Studio</span>
        <svg class="tb-context-chev">…</svg>
      </button>
      <div class="ctx-menu" id="ctxMenu" role="menu"></div>
    </div>
  </div>

  <!-- Global search trigger -->
  <button class="tb-search" id="tb-search-trigger" onclick="_openSearch('topbar')"
    aria-haspopup="dialog">
    <svg class="tb-search-ic">…</svg>
    <span class="tb-search-placeholder">Search in this workspace…</span>
    <kbd class="tb-search-kbd">⌘K</kbd>
  </button>

  <div class="tb-right">
    <!-- AI Assistant -->
    <button class="icon-btn aa-trigger" onclick="openAiAssistant()" aria-label="AI Assistant"><svg>…</svg></button>

    <!-- Notifications with dot badge + menu -->
    <span class="notif-bell-wrap">
      <button class="icon-btn" id="notifBellLauncher" onclick="_toggleNotifications(event)"><svg>bell</svg></button>
      <span class="notif-bell-dot" id="notif-bell-dot">3</span>
      <div class="notif-menu" id="notif-menu" role="dialog" aria-hidden="true"></div>
    </span>

    <!-- Gear / settings menu -->
    <div class="tb-gear-wrap">
      <button class="icon-btn" id="gearLauncher" onclick="toggleGearMenu(event)" aria-haspopup="menu"><svg>gear</svg></button>
      <div class="gear-menu" id="gearMenu" role="menu"></div>
    </div>

    <span class="tb-divider-v"></span>

    <!-- Identity: workspace badge + avatar (share avatarMenu) -->
    <div class="tb-identity">
      <button class="tb-ws-badge" id="tb-ws-badge" onclick="toggleAvatarMenu(event)">
        <span class="tb-ws-badge-logo">CL</span>
        <span class="tb-ws-badge-name">Contoso Ltd</span>
      </button>
      <div class="tb-avatar-wrap">
        <button class="avatar-sm" id="avatarLauncher" onclick="toggleAvatarMenu(event)">TH</button>
        <div class="avatar-menu" id="avatarMenu" role="menu"></div>
      </div>
    </div>
  </div>
</header>
```

### What's NOT in the topbar

- **No inline persona toggle** — view-as-user lives inside `.gear-menu` (or is dropped entirely if you're the only viewer).
- **No inline theme toggle** — light/dark switch lives inside `.gear-menu`.
- **No Browse/Operate mode toggle** — if a surface needs Operate mode, expose it via a tab/segmented control inside the main area, not the global chrome.
- **No cross-link buttons** ("→ Admin Studio") — the `.ctx-menu` dropdown handles studio switching.

### Avatar text

Use **`TH`** (the canonical workspace owner). Don't normalize to a different initial per file — that's drift.

---

## 5. Menu primitives

All four launcher menus follow the same anchored-popover pattern:

| Menu | Launcher | Container | Role |
|---|---|---|---|
| Context (apps) | `#ctxLauncher` | `#ctxMenu` | App switcher (studios, hubs) |
| Notifications | `#notifBellLauncher` | `#notif-menu` | Recent alerts |
| Gear | `#gearLauncher` | `#gearMenu` | Personal + workspace settings, theme toggle, persona-as-user |
| Avatar | `#avatarLauncher` (and `#tb-ws-badge` for parity) | `#avatarMenu` | Account, workspace switcher, sign out |

Common rules:

- Each opens on click of its launcher; closes on outside-click, Esc, or click of another launcher.
- Render content into the container on open (don't pre-render — it's lazy).
- Closing animation uses CSS transitions on `transform`/`opacity`.
- Z-index sits above the topbar (`z-index:1000`+).

---

## 6. Required JS handlers

When porting a surface, copy these from `agentic-studio.html`:

```
sbToggle()                   — collapse / expand sidebar
toggleSbSection(subId, btnId) — expand/collapse a .sb-sub group
toggleContextMenu(event)     — open / close .ctx-menu
toggleGearMenu(event)        — open / close .gear-menu
_toggleNotifications(event)  — open / close .notif-menu
toggleAvatarMenu(event)      — open / close .avatar-menu
_openSearch(source)          — open the global search modal
openAiAssistant()            — open the AI assistant drawer/modal
toggleTheme()                — toggle .theme-light + persist
```

Plus the document-level handlers that close menus on outside-click + Esc.

---

## 7. Search modal

Global search lives at `.search-overlay > .search-modal-inner`. Opened via `_openSearch(source)` from either:

- `.tb-search` (topbar button)
- `⌘K` keyboard shortcut (global document listener)

The modal has tabs (`.search-tab`) and pill-filters (`.search-filters-pop-pills`). Surface-specific result types are registered separately.

---

## 8. AI Assistant

Triggered by `.icon-btn.aa-trigger` (the diamond-shaped sparkle button) in the topbar. Opens via `openAiAssistant()` — implementation varies per surface but the trigger pattern is identical.

---

## 9. Migration checklist (for existing studios)

When migrating an existing surface to this pattern:

- [ ] Add all `--shell-*` CSS variables to `:root` and `html.theme-light`
- [ ] Replace the sidebar HTML with the canonical structure
- [ ] Replace the topbar HTML with the canonical structure
- [ ] Insert the 4 menu containers (`.ctx-menu`, `.notif-menu`, `.gear-menu`, `.avatar-menu`) in their wrap divs
- [ ] Copy CSS for `.sidebar`, `.sb-*`, `.topbar`, `.tb-*`, `.ctx-menu`, `.gear-menu`, `.notif-menu`, `.avatar-menu`, `.search-overlay`
- [ ] Copy JS handlers: `sbToggle`, `toggleSbSection`, `toggleContextMenu`, `toggleGearMenu`, `_toggleNotifications`, `toggleAvatarMenu`, `_openSearch`, `toggleTheme`, document-level close-on-outside-click and Esc handler
- [ ] Remove any inline `tb-persona`, `tb-mode-toggle`, `tb-cross-link` (if present)
- [ ] Move persona-view / theme controls into the gear menu's content
- [ ] Normalize avatar text to `TH`
- [ ] Adapt the sidebar item list to the surface's content (keep structure identical)
- [ ] Update studio active state (`.sb-item.active` + `aria-current="page"`)
- [ ] Re-validate JS parses
- [ ] Test the surface end-to-end (sidebar collapse, all 4 menus open/close, search modal, theme toggle)

---

## 10. Net effect

Once all 4 studios use this shell:

- Cross-studio navigation feels instant — same chrome everywhere, only the main area changes
- Theme toggle works globally — set in any studio, applies to all (via shared localStorage key)
- Sidebar collapsed state persists across studios
- Search, notifications, AI assistant become muscle-memory (same position everywhere)

---

## Reference

Open `agentic-studio.html` and inspect:
- Lines ~50–500: CSS variables + sidebar styles
- Lines ~500–1200: Topbar styles + menu primitives
- Lines ~2280–2415: Canonical HTML for sidebar + topbar
- Lines ~6000+: JS handlers for menus + sidebar
