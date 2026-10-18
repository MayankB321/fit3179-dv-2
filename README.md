# Peak Years

Single-page storyboard for FIT3179. Age against performance at the Olympic Games, 1896–2016. Charts are Vega-Lite. Nine chapters, all live.

Open it through a local server. `file://` blocks the spec fetch and the athlete CSV.

```bash
npm install
npm run dev
```

Then open http://localhost:5179

No Node:

```bash
python3 -m http.server 5179
```

## Add a chart

1. Save a Vega-Lite v5 JSON file in `specs/`.
2. In `js/story.js`, set that chapter’s `spec` to the file path (or paste a spec object).
3. Reload.

Specs with no `config` pick up `js/theme.js` (same axis, title, and Summer `#E28E2C` / Winter `#2878B5` colours as chart 01). Chart 01 keeps the config inside its own file.

The athlete file is remote:

`https://raw.githubusercontent.com/rgriff23/Olympic_history/master/data/athlete_events.csv`

Constant: `ATHLETE_EVENTS_URL` in `js/data.js`. One row is one athlete in one event, not one person.

## Layout

| Path | Role |
| --- | --- |
| `index.html` | Page shell. Vega, Vega-Lite, and vega-embed load from jsDelivr. |
| `js/story.js` | Chapter copy and the chart registry. |
| `js/main.js` | Renders the page and embeds live specs. |
| `js/theme.js` | Shared Vega-Lite config for later charts. |
| `js/data.js` | Dataset URL. |
| `specs/` | One JSON spec per chart. |
