# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install dependencies
- `npm run dev` (or `npm run serve`) — Vite dev server with HMR on port 8080
- `npm run build` — production build (Vite → `dist/`)
- `npm run preview` — serve built output locally
- `npm run lint` — ESLint + Prettier (use `--fix` via `npx eslint --ext .js,.vue src --fix`)

No test suite is configured.

## Architecture

Vue 2.7 + Element UI SPA built with **Vite 7** and `@vitejs/plugin-vue2`. PWA registration is inline in `index.html` (registers `/sw.js` from `public/`). The whole app is effectively two layers:

**UI layer (thin):**
- `index.html` (at project root, Vite entry) — loads `/src/main.js` as an ES module and inline-registers `/sw.js`.
- `src/App.vue` — single-file root component that owns all user state (input text, display mode, tone toggle, TTS controls, locale switcher, file upload). Nearly every feature lives here.
- `src/components/FurikanaDisplay.vue` — tiny presentational component that renders the HTML produced by the furikana util via `v-html`.
- `src/main.js` — wires up ElementUI, `vue-i18n`, mounts `#app`.

**Transform layer (the core logic):** `src/utils/furikana.js` is the heart of the app. Two-pass pipeline:

1. `ToParsedContent(text)` — splits on newlines, runs `pinyin` (segmented) over each line, then walks the characters aligning the pinyin output back to the source text. For each Han character it uses `cnchar.spellInfo` to separate tone-less pinyin + tone number, then looks up the kana in `src/utils/table.json` (pinyin → katakana map, sourced from Gleiphir/cnfurikana — see README credits). Non-Han runs are emitted as inert spacers. Returns an array of per-line arrays of token objects.
2. `ToHtmlContent(parsed, displayMode)` — wraps each token in HTML5 `<ruby>/<rt>` markup. Four display modes: `0` kana + arrow-tone, `1` kana only, `2` toned pinyin, `3` untoned pinyin. Arrow tones come from a fixed `arrowTones` array indexed by tone number (0 = nbsp, 1 → , 2 ↗, 3 ↘↗, 4 ↘, 5 ·).

When touching annotation/display behavior, the change almost always belongs in `furikana.js` (logic) + `App.vue` (controls/state), not in `FurikanaDisplay.vue`.

**i18n:** `src/i18n.js` loads `src/locales/{en_US,ja_JP,zh_CN,zh_TW}.json`. All four locales must be kept in sync by hand. README notes the Japanese translation may be inaccurate.

**TTS:** `speak-tts` is used directly from `App.vue` for Chinese pronunciation playback; voice list is platform-dependent.

## Conventions

- ESLint extends `plugin:vue/essential`, `eslint:recommended`, `plugin:prettier/recommended`. Run `npm run lint` before committing. `.prettierrc.json` sets `endOfLine: auto` so Windows CRLF checkouts don't fail lint.
- The alignment loop in `ToParsedContent` assumes `pinyin()` returns one entry per Han char and passes non-Han runs through as single tokens — any change to segmentation must preserve that invariant or the `i`/`j` index walk breaks silently.
- `pinyin` is pinned to `^2.11.2` (still Vue 2-era CJS). v3/v4 are ESM-only rewrites — upgrading requires reworking `furikana.js` imports.
- Vue 2 itself is EOL; a future Vue 3 migration would also require replacing Element UI with Element Plus and bumping `vue-i18n` to v11.
