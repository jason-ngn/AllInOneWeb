# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
# Run both services concurrently (recommended)
just run

# Next.js only
npm run dev        # dev server on :3000
npm run build
npm run lint

# Gradescope API only (from gradescope-api/)
uv run uvicorn api:root_app --reload --port 8000 --app-dir src/gradescopeapi/api
```

## Architecture

This is a two-process app: a **Next.js 16 frontend** (port 3000) and a **Python FastAPI backend** (port 8000).

### Next.js Frontend (`app/`)

`app/page.tsx` → `Dashboard` → `DashboardClient` is the entire app — there is only one page.

`DashboardClient` is a `"use client"` component that owns all state: `canvasItems`, `gradescopeItems`, active filter, and manually-completed assignment IDs. It calls `fetchDashboardData()` from `app/lib/api.ts` on mount and every 5 minutes. The layout splits into left 1/5 (`SidePanel`: filter nav + course list + connection status) and right 4/5 (`AssignmentsViewer`).

Shared types live in `app/lib/types.ts`: `AssignmentType`, `CourseItem`, `Source` enum (`canvas` | `gradescope`), `SortType` enum.

### API Routing

**Canvas** — Next.js route handlers under `app/api/canvas/` proxy directly to the Canvas LMS REST API using `CANVAS_BASE_URL` + `CANVAS_ACCESS_TOKEN`. No extra service needed.

**Gradescope** — Two layers of proxying:

1. `next.config.ts` rewrites `/api/gradescope/:path*` → `GRADESCOPE_API_URL` (default `http://localhost:8000`)
2. `app/api/gradescope/` route handlers forward to `GRADESCOPE_BASE_URL` (points at the FastAPI service)

The Gradescope flow is explicitly stateful: `DashboardClient` calls login → fetch courses → fetch assignments → logout on every data refresh. The FastAPI service holds a single global `GSConnection` + `account` in module-level state.

### Python FastAPI Backend (`gradescope-api/`)

Entrypoint: `src/gradescopeapi/api/api.py`, mounted at `/api/gradescope`. Uses the bundled `gradescopeapi` library (`src/gradescopeapi/classes/`) which scrapes Gradescope via `requests` + `BeautifulSoup`. Managed with `uv`; requires Python ≥ 3.10.

### Environment Variables

All consumed by the Next.js process (from `.env`):

- `CANVAS_BASE_URL`, `CANVAS_ACCESS_TOKEN` — Canvas LMS API
- `GRADESCOPE_EMAIL`, `GRADESCOPE_PASSWORD` — Gradescope credentials
- `GRADESCOPE_BASE_URL` — FastAPI service URL (default `http://localhost:8000/api/gradescope`)
- `NEXT_PUBLIC_BASE_URL` — public Next.js URL (default `http://localhost:3000`)

On Render, set `GRADESCOPE_API_URL` on the Next.js service to point at the deployed FastAPI instance (`render.yaml` defines the FastAPI service separately).
