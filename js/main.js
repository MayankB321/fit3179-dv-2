import { ATHLETE_EVENTS_SOURCE } from "./data.js";
import { story } from "./story.js";
import { withTheme } from "./theme.js";

const shell = document.querySelector(".shell");
const nav = document.querySelector("#nav");
const main = document.querySelector("#story");
const navToggle = document.querySelector("#nav-toggle");
const navBackdrop = document.querySelector("#nav-backdrop");
const views = new Map();
const overlayQuery = window.matchMedia("(max-width: 860px)");

document.title = `${story.title} · Age and Olympic performance`;

renderNav();
renderStory();
mountCharts();
watchCurrentChapter();
bindNavToggle();

function renderNav() {
  const label = document.createElement("p");
  label.className = "nav-label";
  label.textContent = "Charts";
  nav.append(label);

  for (const chapter of story.chapters) {
    const link = document.createElement("a");
    link.href = `#${chapter.id}`;
    link.dataset.target = chapter.id;
    const num = document.createElement("span");
    num.className = "nav-num";
    num.textContent = chapter.number;
    const name = document.createElement("span");
    name.textContent = chapter.nav;
    link.append(num, name);
    nav.append(link);
  }
}

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

  const legend = document.createElement("p");
  legend.className = "legend";
  legend.append(swatch("summer", "Summer"), swatch("winter", "Winter"));

  header.append(eyebrow, title, dek, legend);

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
  footer.append(
    document.createTextNode("Data: "),
    source,
    document.createTextNode(
      ", 1896–2016. Counts are athlete-event records, not unique people. Add the next chart by dropping a Vega-Lite file in specs/ and pointing a chapter at it in js/story.js."
    )
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
    const result = await vegaEmbed(frame, spec, { actions: false, renderer: "svg", hover: true });
    views.set(chapter.id, result.view);
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

function watchCurrentChapter() {
  const links = [...nav.querySelectorAll("a")];
  const sections = story.chapters
    .map((chapter) => document.getElementById(chapter.id))
    .filter(Boolean);

  const mark = () => {
    const line = window.innerHeight * 0.32;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= line) current = section;
    }
    for (const link of links) {
      link.classList.toggle("is-current", link.dataset.target === current?.id);
    }
  };

  mark();
  window.addEventListener("scroll", mark, { passive: true });
}

function bindNavToggle() {
  navToggle.addEventListener("click", () => {
    setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });
  navBackdrop.addEventListener("click", () => setNavOpen(false));
  overlayQuery.addEventListener("change", syncBackdrop);
}

function setNavOpen(open) {
  shell.classList.toggle("is-nav-closed", !open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Hide chart list" : "Show chart list");
  nav.toggleAttribute("inert", !open);
  syncBackdrop();
  requestAnimationFrame(() => {
    for (const view of views.values()) view.resize();
  });
}

function syncBackdrop() {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navBackdrop.hidden = !open || !overlayQuery.matches;
}
