#!/usr/bin/env bash
trap 'kill $(jobs -p) 2>/dev/null' EXIT
(cd gradescope-api && uv run uvicorn api:root_app --reload --port 8000 --app-dir src/gradescopeapi/api) &
npm run dev &
wait