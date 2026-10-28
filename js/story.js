/**
 * Storyboard registry.
 * Add a chart: put a Vega-Lite JSON file in specs/, then set `spec` to that path.
 * `spec` may also be an inline Vega-Lite object.
 * Leave `spec` unset to keep the placeholder.
 */

export const story = {
  title: "Peak Years: Player Age and Performance",
  dek: "How old Olympic athletes are, and when age lines up with a medal. Nine charts, from 1896 to 2016.",
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
      id: "country-medal-rate",
      kicker: "By country",
      nav: "Medals by country",
      heading: "Where an athlete is from changes what age pays off",
      prose:
        "The medal rate by age is not the same everywhere. Pick an age group and the map shades each country by the share of its athlete-event records in that group that won a medal. Some countries convert young athletes into medals. Others do it with experienced ones.",
      note: "Grey means no data, or the country name did not match between the map and the dataset. Small teams can show extreme rates from a few results.",
      spec: "specs/04-country-medal-wins.json",
    },
    {
      number: "05",
      id: "sport-age-heatmap",
      kicker: "By sport",
      nav: "Sport × age",
      heading: "Each sport rewards a different age group",
      prose:
        "Twelve major sports, four age groups. Each tile is the share of entries that won a medal. Read across a row to see which sports pay off early and which still pay off past 30. The overall curve in chart 03 is these sports, and others, averaged together.",
      note: "Tiles with fewer than 30 entries are left blank.",
      spec: "specs/05-ages-medals-heatmap.json",
    },
    {
      number: "06",
      id: "country-appearances",
      kicker: "Who sends whom",
      nav: "Athletes by country",
      heading: "Medal rates mean more when the team is large",
      prose:
        "A high medal rate in chart 04 means more when it is backed by a large team. Each circle is one country's athlete-event appearances in the chosen age group. Switch groups to see which countries still send older athletes, and which bring mostly young ones.",
      note: "Circle area, not radius, scales with appearances. Circles sit at country centroids.",
      spec: "specs/06-proportional-athlete-count.json",
    },
    {
      number: "07",
      id: "age-over-time",
      kicker: "Across a century",
      nav: "Over time",
      heading: "The Olympian got younger, then older again",
      prose:
        "The first six charts collapse 120 years into one picture. Here is each Games on its own. Leaving art competitions out, the median Summer athlete was 27–28 in the early Games and 23 by the late 1970s and 1980s. By 2016 it was back to 26. Winter shows the same dip and recovery. The shaded band is the middle half of ages at each Games.",
      note: "Hover a Games to compare seasons. Early Games had small fields, so their medians move more.",
      spec: "specs/07-age-over-time.json",
    },
    {
      number: "08",
      id: "medallist-age-by-sport",
      kicker: "Who wins",
      nav: "Medallist ages",
      heading: "The podium's age is set by the sport",
      prose:
        "Only medal-winning results, one row per sport. Median medallist age ranges from 21 in swimming to 34 in equestrian. Shooting and sailing medallists are typically past 30. Diving, gymnastics, and figure skating medallists are mostly in their early twenties or younger. The whiskers show how far each sport stretches.",
      note: "Sports with fewer than 300 medals are left out. Team events count every medal-winning team member.",
      spec: "specs/08-medallist-age-by-sport.json",
    },
    {
      number: "09",
      id: "medal-rate-by-sex",
      kicker: "Women and men",
      nav: "By sex",
      heading: "Women's medal odds peak higher and later",
      prose:
        "The same filtered medal rate as chart 03, split by sex. Women's rate climbs to about 19% at 26–31, then falls away. Men's rate levels off near 16% from the mid-20s into the early 30s. Past 40 it gets noisy, driven by long-career sports such as shooting and equestrian. Use the season toggle to compare Summer and Winter.",
      note: "Two-year bins with fewer than 100 records are hidden, so the women's line stops earlier.",
      spec: "specs/09-medal-rate-by-sex.json",
    },
    {
      number: "10",
      id: "nba-player-profiles",
      kicker: "Nba Player profiles",
      nav: "idk",
      heading: "Nba player profiles",
      prose:
        "Tkajsndkmja,sndkjas.",
      note: "Two-year bins with fewer than 100 records are hidden, so the women's line stops earlier.",
      spec: "specs/10-nba-player-profiles.json",
    },
    {
      number: "11",
      id: "nba-asd",
      kicker: "asdasd",
      nav: "idk",
      heading: "asdasd",
      prose:
        "Tkajsndkmja,sndkjas.",
      note: "Two-year bins with fewer than 100 records are hidden, so the women's line stops earlier.",
      spec: "specs/11-olympic-cities.json",
    },
  ],
};
