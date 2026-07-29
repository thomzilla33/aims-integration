# Component · Pagination (`.pgn2` / `_pagination()`)

**Category:** navigation · **Status:** stable

## Overview
Rows-per-page + range + prev/next control for growable lists. **Use** on any list
that can exceed one page. Hidden automatically on a single page. **Don't use** for
infinite feeds or fixed short lists.

## Anatomy
`Rows per page: [menu]` (left) · `start–end of N items` + prev/next chevrons (right).

## Tokens used
| Part | Token |
|---|---|
| labels / range | `--t3` |
| selected per-page | `--t1` |
| nav button border | `--line`; disabled opacity |
| menu surface | `--surface-raised`, `--ds-shadow-2`, `--ds-z-dropdown` |
| radius | `--r6` |

## API — `_pagination(o)`
`o = { per, total, page, opts:[10,25,50], id, perCall:n=>'…', pageCall:p=>'…' }`.
Returns `''` when `pages <= 1` (DS rule: hide on single page).

## States
default · first page (prev disabled) · last page (next disabled) · menu open.

## Code example
```js
const pgn = _pagination({ per, total, page,
  opts:[10,25,50], id:'et-pgn',
  perCall:n=>`etPer(${n})`, pageCall:p=>`etPage(${p})` });
```

## Cross-references
[list-row](list-row.md) · [filters](filters.md)
