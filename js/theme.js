/** Shared look for later charts. Chart 01 already ships its own config, so it is left alone. */

export const summer = "#E28E2C";
export const winter = "#2878B5";

export const seasonScale = {
  domain: ["Summer", "Winter"],
  range: [summer, winter],
};

export const themeConfig = {
  view: { stroke: null },
  axis: {
    gridColor: "#E5E7EB",
    labelFontSize: 12,
    titleFontSize: 13,
    labelColor: "#1B1714",
    titleColor: "#1B1714",
  },
  legend: {
    labelFontSize: 12,
    titleFontSize: 13,
  },
  title: {
    fontSize: 19,
    subtitleFontSize: 12,
    anchor: "start",
    color: "#1B1714",
    subtitleColor: "#5E574E",
  },
};

/** Apply the shared config only when a spec did not set one. */
export function withTheme(spec) {
  if (!spec.config) {
    spec.config = structuredClone(themeConfig);
  }
  return spec;
}
