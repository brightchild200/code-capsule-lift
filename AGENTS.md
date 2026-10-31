<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture

- This app is a migration of the "SENTINEL GRID" Next.js SOC dashboard (code archive). Sections live in src/routes/_dashboard/* with a shared shell in src/routes/_dashboard.tsx; shared UI state (search, ack, drawer, theme, sidebar) is in src/components/dashboard/dashboard-context.tsx. Keep new sections as child routes of _dashboard, not in-state page switching.
- SENTINEL GRID data (warnings, assets) is synthetic demo data in src/components/dashboard/data.tsx; there is no backend by design.
