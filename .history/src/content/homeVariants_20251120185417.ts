export type HeroCopy = {
  badgeText: string;
  heading: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
  trustpilotLink: string;
  trustpilotAlt: string;
  matchBadge: string;
  jewellerName: string;
  jewellerLocation: string;
  ordersValue: string;
  ordersLabel: string;
  ratingValue: string;
  ratingLabel: string;
};

export type ProcessCopy = {
  heading: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
};

export type WhyCopy = {
  heading: string;
  body: string;
  cardOne: string;
  cardTwo: string;
  cardThree: string;
  ctaLabel: string;
  ctaHref: string;
};

export type BespokeCopy = {
  heading: string;
  intro: string;
  budgetValue: string;
  budgetLabel: string;
  budgetDescription: string;
  timeValue: string;
  timeLabel: string;
  timeDescription: string;
};

export type TestimonialCopy = {
  heading: string;
  subheading: string;
  items: Array<{
    id: number;
    review: string;
    name: string;
    location: string;
  }>;
};

export type CtaCopy = {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
};

export type HomeVariant = {
  meta: {
    title: string;
    description: string;
  };
  hero: HeroCopy;
  process: ProcessCopy;
  why: WhyCopy;
  bespoke: BespokeCopy;
  testimonials: TestimonialCopy;
  cta: CtaCopy;
};

const baseVariant: HomeVariant = {
  meta: {
    title: "Boutee - Home",
    description:
      "Find your perfect handcrafted ring by connecting directly with independent UK jewellers. Boutee helps you define your style, match with makers, and bring your ideas to life.",
  },
  hero: {
    badgeText: "60+ jewellers are on Boutee",
    heading: "More quality.<br />Less mark-up.",
    body: "We match you with the perfect independent jeweller for your style and budget. Work directly with them to create a ring, without the traditional overhead.",
    ctaHref: "/app",
    ctaLabel: "Find Your Jeweller",
    trustpilotLink: "https://www.trustpilot.com/review/boutee.co.uk",
    trustpilotAlt: "Boutee Trustpilot rating",
    matchBadge: "93% match",
    jewellerName: "Callum Hughes",
    jewellerLocation: "Oxfordshire",
    ordersValue: "25+",
    ordersLabel: "orders",
    ratingValue: "5",
    ratingLabel: "reviews",
  },
  process: {
    heading: "Your journey to a <br /> bespoke ring, made simple",
    steps: [
      {
        title: "Define Your Style",
        description:
          "Like rings you love and tell us your preferences. Our platform builds your unique Style Profile, just like a personal shopper.",
      },
      {
        title: "See Your Matches",
        description:
          "We show you a curated selection of independent jewellers whose style and expertise are the perfect fit for you and your budget.",
      },
      {
        title: "Start a Conversation",
        description:
          "Connect directly with your chosen jeweller to bring your ideas to life. No hidden fees, no confusing process - just a clear path to your perfect ring.",
      },
    ],
  },
  why: {
    heading: "Go direct to the maker",
    body: "Your ring should be made by a person, not a production line.",
    cardOne:
      "We've built a community of <strong>the UK's most talented independent jewellers</strong>, each with their own small workshop.",
    cardTwo:
      "They are <strong>experts in their craft</strong>, ready to take Pinterest boards and sketches and turn them into the perfect ring.",
    cardThree:
      "<strong>Skip the middlemen for a better ring, at a better price.</strong>",
    ctaLabel: "Find Your Jeweller",
    ctaHref: "/app",
  },
  bespoke: {
    heading: "Considering bespoke?",
    intro: "You'll need:",
    budgetValue: "£1000",
    budgetLabel: "or more",
    budgetDescription: "This allows for high-quality materials and craftsmanship.",
    timeValue: "4-8",
    timeLabel: "weeks",
    timeDescription: "Every ring is designed and made to order, just for you.",
  },
  testimonials: {
    heading: "Stories behind the rings",
    subheading: "They dreamed it — our jewellers designed it.",
    items: [
      {
        id: 1,
        review:
          "I can't say enough great things about Boutee. I loved the suggestions they provided and was quickly able to connect with an incredible jeweller. Some of the best customer service I've ever received, I'd recommend them to absolutely anyone and everyone.",
        name: "Izzy Russo",
        location: "Matched with Kintaa",
      },
      {
        id: 2,
        review:
          "My experience with Boutee has been exceptional. I stumbled across Boutee online after disappointing search for my dream engagement ring with many larger companies. Boutee offers that personalised experience... Thank you for your attention to detail and outstanding customer service!",
        name: "Stephanie",
        location: "Matched with The Lane",
      },
      {
        id: 3,
        review:
          "Had an unusual idea in mind for an engagement ring that needed to be custom made. Found the Boutee website via Google, filled out the form and Billy got back to me really quickly with the perfect artisan for my project. Great experience front to back and now happily engaged!",
        name: "Nicholas",
        location: "Matched with Richard Chown",
      },
      {
        id: 4,
        review:
          "Fantastic way to find bespoke, custom-made rings from independent designers who love what they do. If you're looking for a personal, affordable option for either designing or buying a ring, this is the place.",
        name: "Luke",
        location: "Matched with Jodie Gearing",
      },
    ],
  },
  cta: {
    heading: "Ready to find your perfect jeweller?",
    body: "Create your free style profile to explore our full community, get personalised matches based on your unique taste, and start a conversation with the right jeweller for you.",
    buttonLabel: "Get Started for Free",
    buttonHref: "/app",
  },
};

const createVariant = (overrides: Partial<HomeVariant> = {}): HomeVariant => ({
  meta: { ...baseVariant.meta, ...(overrides.meta ?? {}) },
  hero: { ...baseVariant.hero, ...(overrides.hero ?? {}) },
  process: {
    heading: overrides.process?.heading ?? baseVariant.process.heading,
    steps: overrides.process?.steps ?? baseVariant.process.steps,
  },
  why: { ...baseVariant.why, ...(overrides.why ?? {}) },
  bespoke: { ...baseVariant.bespoke, ...(overrides.bespoke ?? {}) },
  testimonials: {
    heading:
      overrides.testimonials?.heading ?? baseVariant.testimonials.heading,
    subheading:
      overrides.testimonials?.subheading ?? baseVariant.testimonials.subheading,
    items: overrides.testimonials?.items ?? baseVariant.testimonials.items,
  },
  cta: { ...baseVariant.cta, ...(overrides.cta ?? {}) },
});

export const homeVariants: Record<string, HomeVariant> = {
  default: baseVariant,
  "value-for-money": createVariant({
    meta: {
      title: "Boutee - Great Value",
      description: "Premium bespoke rings without retail markups. Go direct to the maker and keep more of your budget in the ring.",
    },
    hero: {
      badgeText: "60+ vetted independent jewellers",
      heading: "More quality.<br />Less mark-up.",
      body: "Get more ring for your money. Boutee matches you with independent jewellers — no retail overheads, no sales tricks, no unnecessary markups.",
      ctaLabel: "Find Your Jeweller",
    },
    process: {
      heading: "Your journey to a better-value ring",
      steps: [
        {
          title: "Define Your Style",
          description: "Swipe through rings you like to build a Style Profile. Our tech acts as your personal guide, helping you understand ring style — and what offers the best value.",
        },
        {
          title: "See Your Matches",
          description: "We’ll show you independent jewellers whose craftsmanship, pricing and expertise align with your taste and budget — so you get more for your money without sacrificing quality.",
        },
        {
          title: "Start a Conversation",
          description: "Chat directly with your chosen jeweller. Get clarity on materials, pricing and process — all upfront, with no hidden costs or retail mark-ups.",
        },
      ],
    },
    why: {
      heading: "Go Direct to the Maker",
      body: "Make sure that you get the most ring for your money.",
      cardOne:
        "When you buy through a retail chain, you pay for <strong>showrooms, sales staff and marketing</strong> — not better materials.",
      cardTwo:
        "With Boutee, you <strong>work directly with the jeweller who designs and crafts the ring at their bench.</strong> These award-winning makers produce exceptional work, but without the overheads of the high street.",
      cardThree:
        "<strong>The result?</strong> A handcrafted ring with higher craftsmanship and better materials — for the same budget you'd spend at a retailer.",
      ctaLabel: "Find Your Jeweller",
      ctaHref: "/app",
    },
    bespoke: {
      heading: "Thinking about a bespoke ring?",
      intro: "You don’t need a huge budget — just the right guidance. You'll need:",
      budgetValue: "£1,000",
      budgetLabel: "or more",
      budgetDescription: "This ensures genuine craftsmanship and quality materials.",
      timeValue: "4-8",
      timeLabel: "weeks",
      timeDescription: "Every ring is made to order, with total transparency.",
    },
    testimonials: {
      heading: "Stories behind the rings",
      subheading: "<strong>Real couples. Real makers. Real craftsmanship.</strong> <br />See how independent jewellers turned budgets into meaningful, handcrafted rings — without retail markups.",
    },
    cta: {
      heading: "Ready to get more for your money?",
      body: "Create your free Style Profile to see which jewellers fit your style, budget and expectations. Compare your matches, explore their work, and speak directly to the maker.",
      buttonLabel: "Get Started for Free",
    },
  }),
  "trusted-jewellers": createVariant(),
  "find-her-style": createVariant(),
  "no-pressure-shopping": createVariant(),
  "no-sales-pressure": createVariant(),
  "custom-rings": createVariant(),
  "bespoke-rings": createVariant(),
};

export const variantSlugs = Object.keys(homeVariants).filter(
  (slug) => slug !== "default",
);

export const defaultVariant = baseVariant;
