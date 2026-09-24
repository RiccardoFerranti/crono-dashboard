# Working on Crono

## Scope
- Read README.md for the frozen architecture and current status.
- Prioritize Figma fidelity at 1440 × 750, Signals behavior, code quality, tests, then deployment.
- Do not add completed/uncomplete states, navigation pages, a backend, global stores, shadcn, or a generic design system without a new product decision.
- Bootstrap tokens are provisional. Verify font, assets, and measurements against Figma before visual implementation.

## Boundaries
- `src/api/<domain>/` owns contracts, fixtures, async services, query keys/hooks, and mutation state. Services must not depend on React or TanStack Query.
- `src/features/<domain>/` owns UI, presentation mappings, local UI types, and focus. Consume API hooks, never fixtures or mocks directly.
- `api` must not import from `features`. No generic repositories/adapters.
- Tasks and Performance: fixture → async API → query hook → UI, without artificial delay or skeletons.
- Onboarding stays static with local config. Welcome, Replies, and sidebar are presentational.
- Shared Card owns only surface styling and className; features own spacing/layout. No generic Button unless actual reuse warrants it.

## Signals
- Separate completeSignal/deleteSignal operations both remove the row. Counter derives from visible rows.
- Allow concurrent operations on different IDs. Hide pending IDs via mutation state; remove only the successful ID from current cache. Failure reveals the original record in its original order.
- Prevent duplicate pending operations on the same ID. Keep lifecycle callbacks in the API hook, not removable rows.
- The in-memory mock owns separate records and returns copies. No random failures; only Signals has simulated latency and an initial skeleton.
- Infinite stale time, no automatic refetch/polling. No post-mutation refetch, snapshot rollback, or AbortSignal coordination for this mock.

## Collaboration and checks
- Keep domain changes local. Coordinate package files, providers, global theme, Card, and DashboardPage with the integration owner when work is split across tasks.
- Do not create other tasks or delegate automatically; follow the user's workflow.
- Use npm and maintain package-lock.json. Run `npm run check` before handing off implementation changes.
- Add meaningful RTL/Vitest tests as features arrive, with controlled promises for concurrency and failure. No arbitrary sleeps or coverage targets.
- Verify visuals separately at reference and responsive widths.
- Remove the temporary --passWithNoTests flag when the first behavior tests are added.
- Do not claim unfinished features or tests work. No automatic commits, pushes, or deployment.
