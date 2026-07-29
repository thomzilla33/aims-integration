# CLAUDE.md — AIMS-OS Prototypes

Single-file HTML prototypes (vanilla HTML/CSS/JS, dark-first, Inter). Each file
(`data-studio-models.html`, `settings.html`, …) is self-contained — styles live in
inline `<style>` blocks, not separate CSS files. `index.html` is the Prototype Hub.

## Design system — READ BEFORE WRITING OR MODIFYING UI

This project has an LLM-readable design system. **Before writing or modifying any
UI code:**

1. **Read the relevant spec** in [`specs/`](specs/):
   - `specs/foundations/` — color, spacing, typography, radius, elevation, motion.
   - `specs/tokens/token-reference.md` — the master token map (what each var is + when to use it).
   - `specs/components/<component>.md` — the component you're touching (button, list-row, slideout, …).
2. **Use only tokens from [`tokens.css`](tokens.css)** — the Layer-2 semantic aliases
   (`--t1`, `--primary`, `--line`, `--tag-*`, `--space-*`, `--r6/8/12`, `--ds-z-*`,
   `--ds-dur-*`). Three layers, never skip one:
   - Layer 1 `--ds-*` = primitives (the only place a raw `#hex`/`px`/`ms` lives).
   - Layer 2 = semantic aliases → Layer 1 with a current-value fallback.
   - Layer 3 = component rules → **reference only Layer 2**. No raw values, no `--ds-*`.
3. **Run the token audit before committing** and keep it green:
   ```bash
   node scripts/token-audit.js            # whole repo
   node scripts/token-audit.js <file>.html
   ```
   **Zero errors required** (raw colors are errors). Warnings (scale-spacing,
   raw durations, numeric font-weights) should trend down, not up.

### When adding a new component
- Compose from existing components/tokens first; if it's genuinely new, add a
  `specs/components/<name>.md` (follow the 8-section template) and, if it needs a
  new value, add a Layer-1 primitive + Layer-2 alias in `tokens.css` — never a raw
  literal in the component rule.

### Known constraints (see specs/audit-report.md)
- Raw one-off layout `px` (widths, absolute positions, SVG coords) are **allowed**;
  only scale-matching padding/margin/gap should be tokenized.
- Color debt in `settings.html` / `data-studio.html` is burned down with design
  review (per-rule), never by blind value replacement — that would regress the UI.

## Repos & deploy
- Canonical edits here (`aims-os-prototype`, remote `aims-integration`).
- `data-studio-models.html` mirrors to `AIMS-OS-CLAUDE/` (preview root) and deploys
  to `thomzilla33/Data-studio` (GitHub Pages).
