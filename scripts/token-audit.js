#!/usr/bin/env node
/* ============================================================================
 * token-audit.js — AIMS-OS prototype design-token linter (CI-ready)
 * ----------------------------------------------------------------------------
 * Scans the CSS inside single-file HTML prototypes (the <style> blocks) for
 * hardcoded visual values that should reference a Layer-2 token from tokens.css.
 *
 *   ERRORS   raw hex / rgb / rgba colours used in a component rule
 *            (i.e. NOT inside a --token definition and NOT inside var(...))
 *   WARNINGS raw spacing px on padding/margin/gap that maps to the --space
 *            scale · raw transition durations · numeric font-weights
 *
 * Prints  file:line  [error|warn]  <value>  →  <suggested token>  ( rule )
 * Exit code 1 if any ERRORS are found (0 if only warnings / clean).
 *
 *   node scripts/token-audit.js                 # audit every *.html here
 *   node scripts/token-audit.js data-studio-models.html   # one file
 *   node scripts/token-audit.js --warnings      # also fail on warnings
 * ==========================================================================*/
'use strict';
const fs = require('fs');
const path = require('path');

const argv = process.argv.slice(2);
const FAIL_ON_WARN = argv.includes('--warnings');
const files = argv.filter(a => !a.startsWith('--'));
const targets = files.length
  ? files
  : fs.readdirSync(process.cwd()).filter(f => f.endsWith('.html'));

/* Known colour → token map (resolved from tokens.css). Extend as tokens grow. */
const COLOR_TOKENS = {
  '#2b7fff': '--primary', '#2173ff': '--primary',
  '#38bdf8': '--cyan', '#0284c7': '--cyan',
  '#ff6467': '--tag-error-fg', '#fcd34d': '--tag-alert-fg',
  '#6ee7b7': '--tag-success-fg', '#ffffff': '--card-bg', '#fff': '--card-bg',
  'rgba(255,255,255,0.9)': '--t1', 'rgba(255,255,255,0.6)': '--t2',
  'rgba(255,255,255,0.3)': '--t3', 'rgba(255,255,255,0.1)': '--line',
  'rgba(255,255,255,0.04)': '--hover', 'rgba(15,23,42,0.08)': '--card-border',
  'rgba(43,127,255,0.15)': '--accent',
};
const SPACE_SCALE = { 4:'--space-1', 8:'--space-2', 12:'--space-3', 16:'--space-4',
  20:'--space-5', 24:'--space-6', 32:'--space-7', 48:'--space-8' };

const HEX = /#[0-9a-fA-F]{3,8}\b/g;
const RGB = /rgba?\([^)]*\)/g;
const norm = s => s.toLowerCase().replace(/\s+/g, '');
const nearestColor = v => COLOR_TOKENS[norm(v)] || '(add a Layer-2 colour token)';
const nearestSpace = px => SPACE_SCALE[px] || `(one-off ${px}px — leave raw or add a token)`;

let errors = 0, warns = 0;
const out = [];

for (const file of targets) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
  const lines = text.split('\n');
  let inStyle = false;
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (/<style[^>]*>/i.test(raw)) inStyle = true;
    if (/<\/style>/i.test(raw)) { inStyle = false; }
    if (!inStyle) continue;

    // Remove BOTH token definitions (`--x: value;` — Layer-1 values live here,
    // legitimately raw) AND token usages (`var(...)`). Whatever raw value remains
    // is a real Layer-3 component-rule violation.
    const stripped = raw
      .replace(/--[a-z0-9-]+\s*:\s*[^;]*;?/g, '')   // Layer 1/2 definitions
      .replace(/var\([^)]*\)/g, '');                // Layer 2 usages

    // ---- ERRORS: raw colours in component rules ----
    const colours = [...(stripped.match(HEX) || []), ...(stripped.match(RGB) || [])];
    for (const c of colours) {
      errors++;
      out.push(`${file}:${i + 1}  [error] color  ${c}  →  var(${nearestColor(c)})`);
    }
    // ---- WARNINGS: spacing px on box props ----
    if (/\b(padding|margin|gap)\b\s*:/i.test(stripped)) {
      const m = stripped.match(/\b(\d+)px\b/);
      if (m && SPACE_SCALE[+m[1]]) {
        warns++;
        out.push(`${file}:${i + 1}  [warn]  spacing  ${m[1]}px  →  var(${nearestSpace(+m[1])})`);
      }
    }
    // ---- WARNINGS: raw transition durations ----
    if (/transition[^:]*:/i.test(stripped) && /\b\d*\.?\d+m?s\b/.test(stripped)) {
      warns++;
      out.push(`${file}:${i + 1}  [warn]  motion   raw duration  →  var(--ds-dur-fast|normal|slow)`);
    }
  }
}

console.log(out.slice(0, 400).join('\n'));
if (out.length > 400) console.log(`… and ${out.length - 400} more`);
console.log('\n──────────────────────────────────────────────');
console.log(`token-audit: ${errors} error(s), ${warns} warning(s) across ${targets.length} file(s)`);
const fail = errors > 0 || (FAIL_ON_WARN && warns > 0);
console.log(fail ? '✗ FAILED — resolve errors above (see specs/tokens/token-reference.md)'
                 : '✓ PASSED — no blocking token violations');
process.exit(fail ? 1 : 0);
