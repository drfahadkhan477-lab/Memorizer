# Memorizer

Turn a PDF (or a study file) into lessons, multiple-choice drills, exams and
spaced review. A single-file, offline-capable PWA; everything stays in your
browser, with its own backup and restore.

Memorizer began inside the [drnerd](https://github.com/drfahadkhan477-lab/drnerd)
repository next to Systole and moved here as its own app. It still uses four
small modules that started in Systole (`src/core/brain.js`, `fsrs.js`,
`pearl.js`, `rhythms-extra.js`); they are copies now, kept in step by hand.

## Use

```sh
npm ci
npm run build          # dist-memorizer/index.html
npm run serve          # build and serve on http://localhost:8081
```

`node scripts/build-memorizer.js --zip` also writes a Cloudflare Pages upload.

## Test

```sh
npm run test:pure      # logic suites, no browser
npm run test:prepare   # download and verify the pinned reader libraries
npm test               # logic and browser suites
SYSTOLE_ENGINE=webkit npm test
```

Browser suites need `npx playwright install chromium webkit`. WebKit is the
check for iPad behaviour. The suites still read `SYSTOLE_ENGINE` and
`SYSTOLE_TEST_READERS_OFFLINE`, names kept from the repository they came from.

The Contrast theme is ported from Systole; `tests/fixtures/systole-contrast.css`
pins the Systole source it is compared against.
