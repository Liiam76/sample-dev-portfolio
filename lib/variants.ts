// The five design variants. Same content, five different design directions.
// The index page and the switcher bar both read this list.

export type Variant = {
  slug: string;
  number: number;
  name: string;
  lane: string;
  reference: string;
  summary: string;
};

export const VARIANTS: Variant[] = [
  {
    slug: "split",
    number: 1,
    name: "Split",
    lane: "Sticky sidebar, dark charcoal, coral accent",
    reference: "brittanychiang.com, antfu.me",
    summary: "Name and navigation stay pinned on the left while the work scrolls on the right. Calm, text-first, built for a recruiter reading on a big screen.",
  },
  {
    slug: "terminal",
    number: 2,
    name: "Terminal",
    lane: "Interactive command line, amber phosphor",
    reference: "yuriytkach.com",
    summary: "The page boots like an old terminal. Visitors type commands such as projects or contact, or click them. Made for engineers who read the source.",
  },
  {
    slug: "swiss",
    number: 3,
    name: "Swiss",
    lane: "International grid, white, signal red",
    reference: "lelandjansen.com, tomweightman.com",
    summary: "A strict grid, a very large name, and an index of shipped work. Everything aligns. The only color is one red.",
  },
  {
    slug: "bento",
    number: 4,
    name: "Bento",
    lane: "Tile grid, cobalt and lime, live details",
    reference: "om.dev, tamalsen.dev",
    summary: "The whole story on one screen as tiles of different sizes: a live Lagos clock, a contribution graph, and each project as a tile.",
  },
  {
    slug: "poster",
    number: 5,
    name: "Poster",
    lane: "Drenched tomato red, huge type, one project per screen",
    reference: "julianozen.com, christinemunar.com",
    summary: "The page is the color. Big type, a moving strip of tools, and each project gets a full screen like a gig poster.",
  },
];

export function getVariant(slug: string): Variant {
  const found = VARIANTS.find((v) => v.slug === slug);
  if (!found) throw new Error(`Unknown variant: ${slug}`);
  return found;
}
