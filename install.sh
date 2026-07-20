#!/usr/bin/env bash
set -e

echo "Installing gradescope-api dependencies..."
(cd gradescope-api && uv sync)

echo "Installing npm dependencies..."
npm install

echo "All dependencies installed."
