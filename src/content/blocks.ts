/**
 * The building blocks of every inner page. A page is a list of blocks; each
 * block renders as one rounded panel in the homepage's style (see
 * src/components/blocks.tsx and src/styles/blocks.css).
 *
 * Strings marked "rich" accept [label](href) links and **bold**.
 */

/** A button. Tones: red (main action), navy, light (for dark panels), line (outline). */
export type Action = { label: string; href: string; tone?: "red" | "navy" | "light" | "line" };

/** A photo from /public. `position` is a CSS object-position, e.g. "50% 30%". */
export type Img = {
  src: string;
  alt: string;
  position?: string;
  /** A tall photo (a headshot): shown in a narrow, tall frame so it isn't cropped and enlarged. */
  portrait?: boolean;
  /** The photo's width ÷ height. On phones a portrait frame takes this shape, so nothing is cut off. */
  ratio?: number;
};

/** Panel colours: white, pale blue, a deeper pale blue, navy, brand blue. */
export type Tone = "blush" | "rose" | "sky" | "navy" | "blue";

/** The heading that opens most blocks: a handwritten kicker, a chunky caps title. */
export type Head = {
  id?: string;
  kicker?: string;
  title?: string;
  /** One word of the title to set in the handwritten face. */
  hand?: string;
  /** Rich paragraph(s) under the title. */
  lead?: string | string[];
};

export type HeroBlock = {
  type: "hero";
  /** Breadcrumb trail, not including the current page. Home is added for you. */
  crumbs?: { label: string; href: string }[];
  kicker?: string;
  title: string;
  /** A last line of the title in red, like "Mobility" on the homepage. */
  accent?: string;
  intro?: string | string[];
  /** Short facts shown as pills, e.g. "30 minutes", "$65". */
  facts?: string[];
  actions?: Action[];
  image?: Img;
};

export type SplitBlock = Head & {
  type: "split";
  image: Img;
  /** Colour of the text tile. */
  tone?: Exclude<Tone, "blush">;
  /** Photo on the right instead of the left. */
  reverse?: boolean;
  body?: string[];
  list?: string[];
  /** Paragraphs after the list. */
  after?: string[];
  actions?: Action[];
};

export type ChecklistBlock = Head & {
  type: "checklist";
  tone?: Tone;
  items: { title?: string; body?: string }[];
  actions?: Action[];
};

export type CardsBlock = Head & {
  type: "cards";
  tone?: Tone;
  /** "notes" are the pinned, tilted notes from the homepage benefits. */
  style?: "tiles" | "notes";
  items: { title: string; body?: string; image?: Img; href?: string; meta?: string }[];
  actions?: Action[];
};

export type AccordionBlock = Head & {
  type: "accordion";
  tone?: Tone;
  numbered?: boolean;
  items: { title: string; body: string | string[] }[];
  actions?: Action[];
  image?: Img;
};

export type OffersBlock = Head & {
  type: "offers";
  tone?: Tone;
  items: {
    name: string;
    /** Small label above the name, e.g. "Most Popular Choice". */
    tag?: string;
    /** Round sticker, e.g. "Save $30". */
    badge?: string;
    price: string;
    /** The full price struck through, e.g. "$325". */
    was?: string;
    detail?: string;
    body?: string;
    pointsTitle?: string;
    points?: string[];
    note?: string;
    quote?: string;
    action: Action;
  }[];
};

export type TextBlock = Head & {
  type: "text";
  tone?: Tone;
  body?: string[];
  list?: string[];
  /** Paragraphs after the list. */
  after?: string[];
  actions?: Action[];
};

export type ProseBlock = { type: "prose"; tone?: Tone; html: string; aside?: Action[] };

export type PeopleBlock = Head & {
  type: "people";
  tone?: Tone;
  items: { name: string; role: string; href?: string; image?: Img; body?: string }[];
};

export type EmbedBlock = Head & { type: "embed"; tone?: Tone; src: string; label: string; height?: number };

export type CtaBlock = { type: "cta"; title?: string; hand?: string; /** Rich paragraph(s) under the title. */ body?: string | string[]; action?: Action };

/** A one-off section built in the page's own .tsx content file. */
export type NodeBlock = { type: "node"; node: import("react").ReactNode };

export type Block =
  | HeroBlock
  | SplitBlock
  | ChecklistBlock
  | CardsBlock
  | AccordionBlock
  | OffersBlock
  | TextBlock
  | ProseBlock
  | PeopleBlock
  | EmbedBlock
  | CtaBlock
  | NodeBlock
  | { type: "sessions" }
  | { type: "reviews" }
  | { type: "contact" };
