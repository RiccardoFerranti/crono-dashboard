# Crono dashboard

React/TypeScript take-home dashboard based on the supplied Figma design.

**Status: layout skeleton.** The responsive dashboard shell, placeholder sidebar, and minimal shared Card are implemented. Cards currently contain headings only; domain services and features are not implemented yet. Canvas background is confirmed as #F5F7F9. Other theme values and the font remain provisional. At 1440 × 750, the sidebar is 192 px and the right column is 408 px; initial row heights are layout placeholders to revisit with real content.

## Setup

Use Node.js 24 LTS (`nvm use`) and npm. Node 22.13+ in the 22.x LTS line is also supported.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run test
npm run build
npm run check
npm run preview
```

`check` runs lint, type checking, and tests. The production build remains a separate release check. Vitest uses jsdom, RTL cleanup, and jest-dom. GitHub Actions runs the same checks on Node 24.

## Frozen architecture

React, strict TypeScript, Vite, Tailwind v4, direct Radix DropdownMenu, and TanStack Query. No router, global store, Axios, or shadcn.

- `src/api/{tasks,performance,signals}`: contracts, fixtures/mock services, asynchronous API functions, and query/mutation hooks.
- `src/features/`: feature UI, presentation mappings, local UI types, and focus. Components consume hooks, not fixtures.
- `src/features/onboarding`: static step configuration; no progress or API layer.
- `src/dashboard/`: page layout and static Welcome, Replies, and sidebar components.
- `src/ui/`: minimal shared Card, to be created after verifying repeated surfaces.
- `src/styles/`: global CSS and semantic Tailwind tokens. No duplicated JS theme or dark mode.

Tasks and Performance follow typed fixture → async function → query hook → component, without artificial delay or skeletons. Only Signals gets visible initial loading and a lightweight skeleton.

### Signals behavior

Complete and Delete are separate service operations that both remove a row from this view. No completed/uncomplete state initially. The counter represents visible rows, not independently stored state.

Concurrent operations hide pending IDs from query data. Success removes only that ID from current cache; failure reveals the original row. Duplicate pending operations on one ID are prevented. The API hook exposes pending IDs; the UI derives visible rows and count.

The mock will maintain separate in-memory records and return copies, resetting on page refresh. Only Signals simulates short fixed latency. No random failures; tests control errors and response ordering. Optimism models an asynchronous API interaction, not a performance need of local data.

Signals disables automatic refetches and uses infinite stale time. Known removals update cache directly: no post-mutation refetch coordination or snapshot rollback.

### Layout plan

Fidelity target: **1440 × 750 CSS pixels**. At 1280 px and above, desktop sidebar and two-column dashboard with internal Signals scrolling. At 768–1279 px, retain sidebar and stack main sections. Below 768 px, hide sidebar without inventing mobile navigation. Below 640 px, reflow tiles and row metadata further. Narrow layouts use natural page scrolling.

## Assets

Place Figma exports in `src/assets/brand`, `icons`, `illustrations`, `logos`, `avatars`, and `fonts`. Prefer SVG for vector assets and descriptive filenames. Import source assets so Vite manages build URLs. Export graphics, not whole cards containing text/layout.

## Next steps and delivery

Inspect font/assets → macro layout → minimal Card → independent features → visual refinement and behavior tests. Shared theme/layout/providers have one integration owner when work is split across tasks.

GitHub repository is required; bootstrap creates no remote or deployment. Static deployment follows fidelity and required behavior. Cypress, polished notifications, and completed/uncomplete are optional later work.
