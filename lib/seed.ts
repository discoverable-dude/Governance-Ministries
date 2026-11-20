/**
 * Local seed content. Used when Sanity is not configured (NEXT_PUBLIC_SANITY_PROJECT_ID unset),
 * and the reference for what to enter in the Studio. Copy marked "confirm" is awaiting
 * client sign-off: see CONTENT-TODO.md.
 */
import type { Block, Division, Media, NewsPost, Page, SiteSettings } from "./types";

const img = (file: string, alt: string, width: number, height: number): Media => ({ src: `/images/${file}`, alt, width, height });
const heroStudio = img("hero-studio.jpg", "A camera operator filming in the studio", 1333, 1404);
const bookImage = img("book-glory-returns.jpg", "The Glory Returns to the Workplace by Richard Fleming", 1600, 1052);
const tbnImage = img("tbn-uk.jpg", "TBN UK presenters", 1600, 728);
const lifeCampusImage = img("life-campus-site-plan.jpg", "Site plan of Life Campus, Whitfield", 1600, 859);

export const p = (key: string, text: string): Block => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
});

export const settings: SiteSettings = {
  siteName: "Governance Ministries",
  nav: [
    { label: "About", href: "/about/" },
    { label: "News", href: "/news/" },
    { label: "Contact", href: "/contact/" },
  ],
  headerCta: { label: "Get the free book", href: "/contact/?topic=book" },
  footerNav: [{ label: "VSC UK", href: "https://www.vscuk.org/" }],
  contact: {
    address: "226 Church Road, Willesden, London NW10 9NR",
    phone: "+44 (0)20 8208 5680",
    email: "info@governanceministries.org",
  },
  charityNumber: "1051780",
  socialLinks: [],
};

export const divisions: Division[] = [
  {
    name: "Workplace Church",
    slug: "workplace-church",
    accentColour: "orange",
    order: 1,
    externalUrl: "https://workplacechurch.org/",
    summary:
      "The training and equipping division for workplace churches, with free manuals on hearing God's voice at work, finding your destiny and starting a workplace church.",
    body: [
      p("wc1", "The training and equipping division for workplace churches, with free manuals on hearing God's voice at work, finding your destiny and starting a workplace church."),
    ],
  },
  {
    name: "TBN UK",
    slug: "tbn-uk",
    accentColour: "cyan",
    heroImage: tbnImage,
    order: 2,
    externalUrl: "https://tbnuk.org/",
    summary:
      "We provide co-ordination, accountability and compliance for TBN UK, the Christian channel broadcasting on Freeview 66 and Sky 582.",
    body: [
      p("tu1", "We provide co-ordination, accountability and compliance for TBN UK, the Christian channel broadcasting on Freeview 66 and Sky 582."),
    ],
  },
  {
    name: "TBN Europe",
    slug: "tbn-europe",
    accentColour: "blue",
    order: 3,
    summary: "The TBN Europe division of Governance Ministries.", // confirm
    body: [p("te1", "The TBN Europe division of Governance Ministries.")], // confirm
  },
  {
    name: "Living Seeds",
    slug: "living-seeds",
    accentColour: "aqua",
    order: 4,
    summary: "Living Seeds, our work in Sierra Leone.", // confirm
    body: [p("ls1", "Living Seeds, our work in Sierra Leone.")], // confirm
  },
  {
    name: "OnePalm Outreach",
    slug: "onepalm",
    accentColour: "red",
    order: 5,
    summary: "OnePalm Outreach, our work in Nepal.", // confirm
    body: [p("op1", "OnePalm Outreach, our work in Nepal.")], // confirm
  },
  {
    name: "Life Campus",
    slug: "life-campus",
    accentColour: "burgundy",
    heroImage: lifeCampusImage,
    order: 6,
    summary:
      "The trust is one of the landlords of Life Campus, a six-acre site in Whitfield, Dover, home to a preschool, a church, charities and, from April 2027, the Enterprise Centre.",
    body: [
      p("lc1", "The trust is one of the landlords of Life Campus, a six-acre site in Whitfield, Dover, home to a preschool, a church, charities and, from April 2027, the Enterprise Centre."),
    ],
  },
];

const lifeCampus = divisions[5];

export const news: NewsPost[] = [
  {
    title: "The Enterprise Centre comes to Life Campus in April 2027",
    slug: "enterprise-centre-comes-to-life-campus-april-2027", // confirm: new slug, no live equivalent
    publishedAt: "2026-11-20", // confirm
    excerpt:
      "Life Campus in Whitfield, Dover will be home to the Enterprise Centre from April 2027.",
    division: { name: lifeCampus.name, slug: lifeCampus.slug, accentColour: lifeCampus.accentColour },
    body: [
      p("n1", "Life Campus is a six-acre site in Whitfield, Dover, home to a preschool, a church and charities. From April 2027 it will also be home to the Enterprise Centre."),
      p("n2", "Governance Ministries is one of the landlords of Life Campus."),
    ],
  },
];

const objectives =
  "Our objectives are to advance the Christian faith, to teach Biblical principles and ethics in industry and commerce, to develop excellence in church governance, and to research church growth and high-performing teams.";

export const pages: Page[] = [
  {
    title: "Home",
    slug: "home",
    seo: {
      metaTitle: "Governance Ministries | Workplace church and the gospel in media and business",
      metaDescription:
        "Governance Ministries is a charitable trust pioneering workplace church: Christians carrying the gospel into business, media and public life.",
    },
    sections: [
      {
        _type: "hero",
        _key: "h",
        heading: "Jesus is the answer in our cities and nations.",
        image: heroStudio,
        intro:
          "Governance Ministries is a charitable trust pioneering workplace church: Christians carrying the gospel into business, media and public life.",
        primaryCta: { label: "See our work", href: "/about/" },
        secondaryCta: { label: "Get the free book", href: "/contact/?topic=book" },
      },
      {
        _type: "cardGrid",
        _key: "fronts",
        heading: "Our work runs on two fronts",
        columns: 2,
        cards: [
          {
            title: "Mass communication of the gospel",
            body: "Sharing the gospel, and what God is doing, through television, the written word and radio.",
            accent: "red",
          },
          {
            title: "Workplace and marketplace ministers",
            body: "Christians who share that Jesus is the answer through the everyday contact of business: with customers, suppliers, regulators, staff and shareholders.",
            accent: "cyan",
          },
        ],
      },
      { _type: "cardGrid", _key: "divs", heading: "Where the work happens", fromDivisions: true, columns: 3 },
      {
        _type: "splitFeature",
        _key: "book",
        heading: "The Glory Returns to the Workplace",
        image: bookImage,
        eyebrow: "By Richard Fleming. Foreword by Dr Bill Hamon.",
        body: "A practical guide to walking in your calling where you already spend most of your week: at work.",
        quote: {
          text: "Richard Fleming thinks that your work can be glorious.",
          attribution: "C. Peter Wagner, International Coalition of Apostles",
        },
        cta: { label: "Get your free copy", href: "/contact/?topic=book" },
      },
      {
        _type: "newsTeaser",
        _key: "news",
        heading: "What's happening",
        link: { label: "All news and updates", href: "/news/" },
        limit: 3,
      },
      {
        _type: "richText",
        _key: "charity",
        ruled: true,
        heading: "A registered charitable trust, charity no. 1051780",
        body: [p("c1", objectives)],
        link: { label: "Read our objectives in full", href: "/about/" },
      },
    ],
  },
  {
    title: "About",
    slug: "about",
    seo: {
      metaTitle: "About Governance Ministries",
      metaDescription:
        "Governance Ministries is a registered charitable trust, charity no. 1051780, working through workplace church, television and the written word.",
    },
    sections: [
      {
        _type: "hero",
        _key: "h",
        compact: true,
        heading: "About Governance Ministries",
        intro:
          "A registered charitable trust, charity no. 1051780, pioneering workplace church and sharing the gospel through television, the written word and radio.",
      },
      { _type: "richText", _key: "obj", heading: "Our objectives", body: [p("o1", objectives)] },
      { _type: "cardGrid", _key: "divs", heading: "Our work", fromDivisions: true, columns: 3 },
      {
        _type: "ctaBand",
        _key: "cta",
        heading: "Get in touch",
        body: "We would be glad to hear from you.",
        cta: { label: "Contact us", href: "/contact/" },
      },
    ],
  },
];
