# VE Direct — Figma HTML prototype

A standalone HTML, CSS and vanilla JavaScript reproduction of the six VE Direct Figma screens. All application assets are local. External services are represented by mock interactions; no SMS, invoicing, developer-matching or calendar integration is connected.

## Open or run locally

The project works in either mode:

- **Direct file:** Double-click `index.html` in File Explorer.
- **Local server:** From this directory, run `node serve.mjs`, then open [http://localhost:4176](http://localhost:4176).

No npm packages are required. The CSS, classic JavaScript files and visual assets use relative paths.

Direct-file notes: SMS, invoice, developer matching and calendar integrations are mock interactions in both modes. Browser security does not allow this prototype to depend on local-file `fetch()` or cross-file JavaScript modules, so it uses ordered classic scripts. Some browsers treat `localStorage` for `file://` URLs as optional; the app catches storage restrictions and remains usable for the current session, but data may not survive closing/reopening the file. The local server provides reliable persistent browser storage.

## Prototype interactions

- Screen 1 continues automatically after 30 seconds. The timer can be paused/resumed, or the CTA advances immediately.
- Screen 2 validates contact details and shows a $0 order summary without payment fields.
- Screen 3 accepts any six-digit code as a local verification simulation. The resend timer and change-number action are local only.
- Screen 4 selects a start date and calculates 10 working days, excluding weekends and the dates in `js/mockData.js`.
- Screen 5 allows date, time and meeting-platform selection.
- Screen 6 summarizes the local journey state.
- Use the browser Back action or `Alt+Left` to navigate back. Journey details persist in local storage.

Use the browser console for debugging. Clear the prototype state with `localStorage.removeItem('ve-direct-figma-prototype')`.

## Project map

- `index.html`: application shell and entry point.
- `css/`: reset, Figma token variables, shared controls, screen styles and responsive rules.
- `js/screens.js`: modular markup for each of the six screens.
- `js/navigation.js`: rendering, navigation, timer orchestration and view-event wiring.
- `js/state.js`: persisted journey state.
- `js/calendar.js`, `js/validation.js`, `js/otp.js`, `js/meeting.js`: business rules and interaction helpers.
- `js/mockData.js`: demo developer, service, holidays and meeting availability.
- `assets/`: original local assets exported from the approved Figma design.
- `references/`: original frame screenshots used for visual QA; not loaded by the running UI.
