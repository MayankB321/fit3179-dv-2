/**
 * Storyboard registry.
 * Add a chart: put a Vega-Lite JSON file in specs/, then set `spec` to that path.
 * `spec` may also be an inline Vega-Lite object.
 * Leave `spec` unset to keep the placeholder.
 */

export const story = {
  title: "Peak Years",
  dek: "How old Olympic athletes are, and when age lines up with a medal. Fifteen charts, from 1896 to 2016. The first three are live.",
  chapters: [
    {
      number: "01",
      id: "age-of-the-field",
      kicker: "Who shows up",
      nav: "Who shows up",
      heading: "Competition clusters in early adulthood",
      prose:
        "Before performance, the field itself has an age. This counts every athlete-event row in the Olympic record from 1896 to 2016, split by season. The mass of the Games sits in a short stretch of ages. The tails — children, and athletes past 40 — are real, and thin.",
      note: "One athlete in three events counts three times. Missing ages, and ages outside 10–80, are dropped. The source file is large, so the first draw can take a few seconds.",
      spec: "specs/01-age-distribution.vl.json",
    },
    {
      number: "02",
      id: "older-athletes",
      kicker: "Older athletes",
      nav: "Older athletes",
      heading: "The raw medal rate climbs with age",
      prose:
        "Chart 01 is who shows up. This is whether older athletes win more often. Each point is the share of athlete-event rows, in a two-year age bin, that include a medal. Summer and Winter are separate. The line jumps at the oldest ages. Those bins hold very few people, so a handful of medals moves the rate a long way.",
      note: "Ages 10–80 only. Art competitions are still included, and thin bins are kept. That is why the tail looks so successful.",
      spec: "specs/02-older-athletes.json",
    },
    {
      number: "03",
      id: "older-athletes-filtered",
      kicker: "Outliers removed",
      nav: "Outliers removed",
      heading: "Drop the thin bins, and the climb flattens",
      prose:
        "Same medal rate, with the outliers taken out. Art competitions are excluded. Any two-year age bin with fewer than 100 athlete-event records is excluded. What is left is the rate where there are enough results to trust. Older athletes are not the runaway winners the previous chart suggested.",
      note: "The cutoff is applied after the rate is calculated, separately for Summer and Winter. One season can vanish from an age while the other stays.",
      spec: "specs/03-older-athletes-filtered.json",
    },
    {
      number: "04",
      id: "early-peaks",
      kicker: "Early peaks",
      nav: "Early peaks",
      heading: "A few sports are mostly over by 25",
      prose:
        "Gymnastics, diving, swimming, and figure skating load the young end of the first chart. Isolate them so the early peak is visible on its own scale.",
      intent:
        "Age distribution, or medal rate by age, for a small set of early-peak sports. Small multiples on one shared age scale.",
      spec: "specs/04-country-medal-wins.json"
    },
    {
      number: "05",
      id: "late-peaks",
      kicker: "Late peaks",
      nav: "Late peaks",
      heading: "Other sports start in earnest after 30",
      prose:
        "Equestrian, shooting, sailing, and archery sit in the right tail. They are not noise in the histogram. They are different careers.",
      intent:
        "Same treatment as chart 04, for late-peak sports. Small multiples against the same age scale.",
      spec: "specs/05-ages-medals-heatmap.json"
    },
    {
      number: "06",
      id: "medal-rate",
      kicker: "Medal rate",
      nav: "Medal rate",
      heading: "Showing up and winning are different curves",
      prose:
        "Chart 01 is participation. Performance is the share of those rows that end with a medal. If the medal rate peaks at a different age than the headcount, the field and the podium are not the same age.",
      intent:
        "Medal rate by age bin: medal rows divided by all rows. Bar or line. Optional split by season.",
      spec: "specs/06-proportional-athlete-count.json"
    },
    {
      number: "07",
      id: "gold-vs-field",
      kicker: "Gold versus the field",
      nav: "Gold vs field",
      heading: "Gold sits inside the crowd, then drifts",
      prose:
        "A rate can hide shape. Overlay the age distribution of gold-medal rows on the age distribution of every row. The question is whether gold is a narrower, older, or younger slice of the same field.",
      intent:
        "Two densities or normalized histograms: all athlete-events, and gold only.",
    },
    {
      number: "08",
      id: "age-over-time",
      kicker: "Across a century",
      nav: "Over time",
      heading: "The typical Olympian did not stay the same age",
      prose:
        "The first chart collapses 120 years. Median age by Games shows whether the field got younger as the Olympics changed, and whether Summer and Winter moved together.",
      intent:
        "Line chart. X is Games year, y is median age. Two lines, Summer and Winter. Mark years where the field is thin.",
    },
    {
      number: "09",
      id: "age-by-sex",
      kicker: "Women and men",
      nav: "By sex",
      heading: "The women’s field is not the same age",
      prose:
        "Sex is mixed into every chart above. Women’s events were added later, and in different sports, so the age profile can differ even when the overall histogram looks smooth.",
      intent:
        "Age distribution by sex, or median age over time with one line per sex. Keep the season in view so Winter’s small counts do not dominate.",
    },
    {
      number: "10",
      id: "repeat-starts",
      kicker: "Repeat starts",
      nav: "Careers",
      heading: "Longevity is what stretches the right tail",
      prose:
        "A 38-year-old on the start list is often not a late bloomer. They are someone who has already been here. Separate first-time Olympians from athletes at a later Games.",
      intent:
        "For athletes with two or more Games, age at the first Games versus age at the last. Scatter or slope chart, aggregated enough to stay readable.",
    },
    {
      number: "11",
      id: "extremes",
      kicker: "The tails",
      nav: "Extremes",
      heading: "The youngest and oldest results are specific people",
      prose:
        "Bins hide the names at the edge. A short view of the youngest and oldest medalists makes the tail concrete: which sports, which Games, which ages.",
      intent:
        "Two ranked lists or a dot plot: youngest medalists and oldest medalists. Sport, year, age, and medal.",
    },
    {
      number: "12",
      id: "inside-one-sport",
      kicker: "Inside one sport",
      nav: "One sport",
      heading: "Event choice moves the peak even inside a sport",
      prose:
        "Swimming is not one age. Sprints, distance, and open water do not peak together. Hold the sport still and let the event vary.",
      intent:
        "One sport with many events, swimming or athletics. Age distribution or median age by event, sorted.",
    },
    {
      number: "13",
      id: "winter-alone",
      kicker: "Winter, alone",
      nav: "Winter",
      heading: "Winter sports do not share one age",
      prose:
        "Inside Winter, alpine skiing, skating, hockey, and curling pull in different directions. Show them without Summer in the frame.",
      intent:
        "Median age or distribution by Winter sport.",
    },
    {
      number: "14",
      id: "after-thirty",
      kicker: "After 30",
      nav: "After 30",
      heading: "Most sports thin out once athletes pass 30",
      prose:
        "Thirty sits just past the bulk of the first chart. The share of a sport’s records at 30 and older is a simple measure of who is still competing.",
      intent:
        "Horizontal bar, one row per sport. Value is the share of records with age 30 or older. Sort descending. Drop sports below a minimum record count.",
    },
    {
      number: "15",
      id: "medal-windows",
      kicker: "Medal windows",
      nav: "Windows",
      heading: "Each sport has an age band where medals actually land",
      prose:
        "This is the claim the earlier charts build toward. Not the age people show up. The age band that holds the medals, sport by sport.",
      intent:
        "Heatmap or interval bars. Rows are major sports, columns are age bands, colour is medal count. Mark the peak band.",
    },
  ],
};
