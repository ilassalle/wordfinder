# Word Finder App

## Overview
The Word Finder App lets users enter a 4x4 or 5x5 letter board and returns words that can be formed by connecting neighboring letters without reusing the same tile in a word.

## Features
- Switch between 4x4 and 5x5 boards.
- Validate board input on both the client and API.
- Find words from Collins Scrabble Words 2019 with a trie-backed board search.
- Display loading, empty, and error states.

## Project Structure
```
word-finder-app
|-- components
|   |-- BoardInput.tsx
|   |-- Layout.tsx
|   `-- WordList.tsx
|-- data
|   `-- collins-scrabble-words-2019.txt
|-- lib
|   `-- wordSolver.ts
|-- pages
|   |-- _app.tsx
|   |-- index.tsx
|   `-- api
|       `-- words.ts
|-- public
|-- styles
|   `-- globals.css
|-- next.config.js
|-- package.json
|-- package-lock.json
|-- tsconfig.json
`-- README.md
```

## Installation
```bash
npm install
```

## Development
```bash
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks
```bash
npm run typecheck
npm run build
npm run audit
```

## Deployment
This app is ready for a standard Next.js host such as Vercel. Commit `package-lock.json` so deployments install the same dependency versions that were verified locally.
