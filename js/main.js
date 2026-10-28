import { ATHLETE_EVENTS_SOURCE } from "./data.js";
import { story } from "./story.js";
import { withTheme } from "./theme.js";

const main = document.querySelector("#story");

document.title = `${story.title} · Age and Olympic performance`;

renderStory();
mountCharts();

function renderStory() {
  const header = document.createElement("header");
  header.className = "masthead";
  header.id = "top";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Age and performance · Olympic Games";

  const title = document.createElement("h1");
  title.textContent = story.title;

  const dek = document.createElement("p");
  dek.className = "dek";
  dek.textContent = story.dek;

  header.append(eyebrow, title, dek);

  const chapters = document.createElement("div");
  chapters.className = "chapters";
  for (const chapter of story.chapters) {
    chapters.append(renderChapter(chapter));
  }

  main.append(header, chapters);

  const footer = document.createElement("footer");
  footer.className = "colophon";
  const source = document.createElement("a");
  source.href = ATHLETE_EVENTS_SOURCE;
  source.textContent = "Olympic history athlete-events";
  source.rel = "noreferrer";
  source.target = "_blank";
  const extra = document.createElement("a");
  extra.href = "https://github.com/MayankB321/fit3179-dv-2-datasets";
  extra.textContent = "NBA player-seasons and the host-city list";
  extra.rel = "noreferrer";
  extra.target = "_blank";
  footer.append(
    document.createTextNode("Olympic charts use "),
    source,
    document.createTextNode(
      ", 1896–2016. One row is one athlete in one event, not one person. The host-city map and the NBA chart use "
    ),
    extra,
    document.createTextNode(".")
  );
  main.append(footer);
}

function renderChapter(chapter) {
  const section = document.createElement("section");
  section.className = "chapter";
  section.id = chapter.id;

  const kicker = document.createElement("p");
  kicker.className = "kicker";
  kicker.textContent = `${chapter.number}  ·  ${chapter.kicker}`;

  const heading = document.createElement("h2");
  heading.textContent = chapter.heading;

  const prose = document.createElement("p");
  prose.className = "prose";
  prose.textContent = chapter.prose;

  const slot = document.createElement("div");
  slot.className = "chart-slot";
  slot.dataset.chart = chapter.id;

  section.append(kicker, heading, prose, slot);

  if (chapter.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = chapter.note;
    section.append(note);
  }

  if (!chapter.spec) {
    slot.classList.add("is-placeholder");
    slot.setAttribute("role", "img");
    slot.setAttribute("aria-label", `Placeholder for chart ${chapter.number}`);

    const label = document.createElement("p");
    label.className = "ph-label";
    label.textContent = `Chart ${chapter.number} · not built yet`;

    const intent = document.createElement("p");
    intent.className = "ph-intent";
    intent.textContent = chapter.intent;

    slot.append(label, intent);
  }

  return section;
}

function swatch(season, name) {
  const item = document.createElement("span");
  const mark = document.createElement("i");
  mark.className = `swatch swatch-${season}`;
  mark.setAttribute("aria-hidden", "true");
  item.append(mark, document.createTextNode(name));
  return item;
}

async function mountCharts() {
  const live = story.chapters.filter((chapter) => chapter.spec);
  await Promise.all(live.map(mountOne));
}

async function mountOne(chapter) {
  const slot = document.querySelector(`[data-chart="${chapter.id}"]`);
  const status = document.createElement("p");
  status.className = "chart-status";
  status.textContent = "Loading athlete records…";
  slot.append(status);
  slot.setAttribute("aria-busy", "true");

  try {
    const spec = withTheme(await resolveSpec(chapter.spec));
    spec.width = "container";
    const frame = document.createElement("div");
    frame.className = "chart-frame";
    slot.replaceChildren(frame);
    if (typeof vegaEmbed !== "function") {
      throw new Error("vegaEmbed did not load. Check the Vega script tags.");
    }
    await vegaEmbed(frame, spec, { actions: false, renderer: "svg", hover: true });
  } catch (error) {
    slot.replaceChildren();
    const fail = document.createElement("p");
    fail.className = "chart-status is-error";
    fail.textContent = `Chart failed to load. Serve this folder over HTTP and keep network access to the Olympic CSV. ${error.message}`;
    slot.append(fail);
  } finally {
    slot.removeAttribute("aria-busy");
  }
}

async function resolveSpec(spec) {
  if (typeof spec !== "string") return structuredClone(spec);
  const response = await fetch(spec);
  if (!response.ok) {
    throw new Error(`${spec} returned ${response.status}`);
  }
  return response.json();
}

