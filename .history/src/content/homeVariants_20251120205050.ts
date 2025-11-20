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
      heading: "Go direct to the maker",
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
      intro: "You'll need:",
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
  "trusted-jewellers": createVariant({
    hero: {
      badgeText: "60+ vetted jewellers",
      heading: "A ring journey you can trust",
      body: "Connect directly with vetted independent jewellers to craft your perfect ring, with no middlemen, mark-ups, or hidden fees.",
      ctaLabel: "Find Your Jeweller",
    },
    process: {
      heading: "Your journey to the perfect ring, made simple",
      steps: [
        { title: "Define Your Style", description: "Swipe rings you love and tell us your preferences. Our platform builds your unique Style Profile, just like a personal shopper – only focused on your taste." },
        { title: "See Your Matches", description: "We show you a curated selection of independent jewellers whose style and expertise are the perfect fit for you and your budget. Every jeweller on Boutee is fully vetted, so you can choose with confidence." },
        { title: "Start a Conversation", description: "Connect directly with your chosen jeweller to bring your ideas to life. No hidden fees, no confusing process – just a clear, transparent path to your perfect ring (with absolutely no obligation)." },
      ],
    },
    why: {
      heading: "Go direct to the maker",
      body: "Your ring should be made by a person, not a production line.",
      cardOne: "We’ve built a community of the UK’s <strong>most talented independent jewellers</strong>. Each has their own small workshop and is an expert craftsperson ready to turn your Pinterest board or sketch into the perfect ring.",
      cardTwo: "<strong>Every ring is handcrafted and hallmarked for authenticity</strong> – no mass production, just genuine craftsmanship you can trust.",
      cardThree: "By going direct, you <strong>skip the middlemen</strong> and get a <strong>better ring at a better price.</strong>",
      ctaLabel: "Get Started",
      ctaHref: "/app",
    },
    bespoke: {
      heading: "Considering a bespoke ring?",
      intro: "You'll need:",
      budgetDescription: "This budget ensures high-quality materials and true craftsmanship for your ring.",
      timeDescription: "Every ring is designed and made to order, just for you, so it takes more time than the high street.",
    },
    testimonials: {
      heading: "Stories behind the rings",
    },
    cta: {
      heading: "Ready to find a jeweller you can trust?",
      body: "Create your free Style Profile to explore our community of vetted jewellers, get personalised matches based on your unique taste and budget, and chat directly with your chosen maker. It’s easy, transparent, and completely obligation-free.",
      buttonLabel: "Get Started for Free",
      buttonHref: "/app",
    },
  }),
  "find-her-style": createVariant({
    hero: {
      badgeText: "60+ expert designers available",
      heading: "Find her ring style with total confidence",
      body: "Not sure what she’ll like? Boutee makes it simple: swipe through designs you love and we’ll build a Style Profile that clearly shows what suits her. Then we match you with independent jewellers who specialise in that exact style.",
      ctaLabel: "Find Your Jeweller",
    },
    process: {
      heading: "Your path to the right ring, made easy",
      steps: [
        { title: "Define Your Style", description: "Swipe through rings that feel “right” — even if you’re not sure why. Our style technology picks up patterns you might miss, acting like a personal stylist for engagement rings." },
        { title: "See Your Matches", description: "We show you jewellers whose design style aligns perfectly with your profile — whether she’s classic, minimal, vintage, modern, or something more unique." },
        { title: "Start a Conversation", description: "Once you’ve found your style direction, chat directly with a jeweller who specialises in it. They’ll guide you through the details and make sure you land on a ring she’ll genuinely love." },
      ],
    },
    why: {
      heading: "Go direct to the maker",
      body: "Ring shopping shouldn’t feel like guesswork.",
      cardOne: "Our jewellers are independent craftspeople — <strong>real humans, not retail salespeople</strong> — who work in small studios and <strong>understand style</strong> down to the smallest detail.",
      cardTwo: "If you’re unsure about <strong>shapes, settings or stones,</strong> they guide you with zero judgement.",
      cardThree: "And because you’re working <strong>directly with the maker</strong>, you skip the retail mark-up and get a <strong>higher-quality ring</strong> for your budget.",
      ctaLabel: "Get Started",
      ctaHref: "/app",
    },
    bespoke: {
      heading: "Considering a bespoke ring?",
      intro: "Your jeweller guides you throughout — no expertise required. You'll need:",
      budgetDescription: "for high-quality materials.",
      timeDescription: "to design and craft.",
    },
    testimonials: {
      heading: "Stories behind the rings",
      subheading: "See how real people found a ring that matched their partner’s style.",
    },
    cta: {
      heading: "Ready to find out what she'll love?",
      body: "<strong>Create your free Style Profile and discover the styles that actually fit her taste.</strong> <br /> No guesswork. No pressure. Just clarity — and jewellers who specialise in the look she’ll love most.",
      buttonLabel: "Get Started for Free",
      buttonHref: "/app",
    },
  }),
  "no-pressure-shopping": createVariant({
    hero: {
      badgeText: "60+ independent makers, no sales targets",
      heading: "A calm, clear way to create the perfect ring",
      body: "Take your time. Browse styles. Choose a jeweller when you’re ready. Boutee gives you a simple, comfortable way to design an engagement ring — without the intensity of traditional jewellery shopping.",
      ctaLabel: "Explore Your Options",
    },
    process: {
      heading: "A simple path to the perfect ring",
      steps: [
        { title: "Define Your Style", description: "Swipe through designs you like to build your personal Style Profile. No pressure to decide quickly — just a smooth, private way to figure out what feels right." },
        { title: "See Your Matches", description: "We’ll show you independent jewellers whose design style suits your preferences and budget. Explore their work privately, without the pressure of a shop floor or anyone steering you." },
        { title: "Start a Conversation", description: "Message a jeweller directly, whenever it suits you. They’re here to help you shape ideas, answer questions and guide you — never rushed." },
      ],
    },
    why: {
      heading: "Go direct to the maker",
      body: "When you work with an independent jeweller, the experience feels completely different from traditional retail.",
      cardOne: "<strong>There’s no hard sell</strong> — just a craftsperson talking you through options, materials and ideas with clarity and honesty.",
      cardTwo: "Every jeweller on Boutee runs their own small studio and <strong>cares deeply</strong> about the work they produce.",
      cardThree: "By going direct, you avoid <strong>retail overheads</strong> and get a ring made with real <strong>attention, transparency and care.</strong>",
      ctaLabel: "Find Your Jeweller",
      ctaHref: "/app",
    },
    bespoke: {
      heading: "Considering a bespoke ring?",
      intro: "Creating something made just for her doesn’t have to feel daunting. Here’s what you'll need:",
      budgetDescription: "A budget over £1000 for high-quality, handcrafted work",
      timeDescription: "Enough time for design, creation and hallmarking",
    },
    testimonials: {
      heading: "Stories behind the rings",
    },
    cta: {
      heading: "Ready to explore your ring options?",
      body: "Create your free Style Profile to discover jewellers who match your taste and approach. Take your time. Look around. Reach out when it feels right.",
      buttonLabel: "Get Started for Free",
      buttonHref: "/app",
    },
  }),
  "no-sales-pressure": createVariant({
    hero: {
      badgeText: "60+ Independent jewellers, Straightforward guidance",
      heading: "The best way to choose a ring",
      body: "If you’ve ever felt pushed or steered in a shop, you’re not alone. Boutee works differently. You explore designs quietly, figure out what you like, and speak directly with the person who’ll make the ring — not someone trying to sell you one.",
      ctaLabel: "Find Your Jeweller",
    },
    process: {
      heading: "A Clear, Comfortable Process",
      steps: [
        { title: "Define Your Style", description: "Swipe through rings you like. No pressure to decide or know the “right” answer — you’re just getting a feel for what works." },
        { title: "See Your Matches", description: "We recommend jewellers whose work aligns with your taste and budget. These are people who craft rings for a living, not sales staff working to a target." },
        { title: "Start a Conversation", description: "Message a jeweller when you feel ready. They’ll explain options plainly, without nudging you toward something more expensive. It’s a simple, human conversation — nothing more." },
      ],
    },
    why: {
      heading: "No sales staff. Just the craftsperson.",
      body: "We're here to cut out the middleman.",
      cardOne: "In most jewellery shops, the person you speak to is rarely the person making the ring. <strong>We think that's a bit rubbish.</strong>",
      cardTwo: "On Boutee, you speak <strong>directly to the maker</strong> — the person who’ll sketch your idea, source your stone, and craft the ring by hand. <strong>They care about the piece itself,</strong> not about shifting stock.",
      cardThree: "They’ll tell you <strong>what’s worth paying for, what isn’t, and how to get the best</strong> version of your idea without spending more than you planned. <strong>It’s honest by default.</strong>",
      ctaLabel: "Start Your Style Profile",
      ctaHref: "/app",
    },
    bespoke: {
      heading: "What you need to know (no surprises)",
      intro: "If you’re thinking of creating something bespoke, you'll need:",
      budgetDescription: "Enough for good materials and proper craftsmanship.",
      timeDescription: "Enough time to design and make the ring.",
    },
    testimonials: {
      heading: "People who wanted the same thing",
    },
    cta: {
      heading: "Take the first step — without any pressure",
      body: "Create your free Style Profile to see jewellers who fit your taste and budget. Look around & message when you’re ready. There’s no expectation to commit to anything.",
      buttonLabel: "Get Started for Free",
      buttonHref: "/app",
    },
  }),
  "custom-rings": createVariant({
    hero: {
      badgeText: "XXXXXXXXX",
      heading: "XXXXXXXXX",
      body: "XXXXXXXXX",
      ctaLabel: "Find Your Jeweller",
    },
    process: {
      heading: "XXXXXXXXX",
      steps: [
        { title: "XXXXXXXXX", description: "XXXXXXXXX" },
        { title: "XXXXXXXXX", description: "XXXXXXXXX" },
        { title: "XXXXXXXXX", description: "XXXXXXXXX" },
      ],
    },
    why: {
      heading: "XXXXXXXXX",
      body: "XXXXXXXXX",
      cardOne: "XXXXXXXXX",
      cardTwo: "XXXXXXXXX",
      cardThree: "XXXXXXXXX",
      ctaLabel: "XXXXXXXXX",
      ctaHref: "/app",
    },
    bespoke: {
      heading: "XXXXXXXXX",
      intro: "XXXXXXXXX",
      budgetDescription: "XXXXXXXXX",
      timeDescription: "XXXXXXXXX",
    },
    testimonials: {
      heading: "XXXXXXXXX",
      subheading: "XXXXXXXXX",
    },
    cta: {
      heading: "XXXXXXXXX",
      body: "XXXXXXXXX",
      buttonLabel: "XXXXXXXXX",
      buttonHref: "/app",
    },
  }),
  "bespoke-rings": createVariant({
    hero: {
      badgeText: "XXXXXXXXX",
      heading: "XXXXXXXXX",
      body: "XXXXXXXXX",
      ctaLabel: "Find Your Jeweller",
    },
    process: {
      heading: "XXXXXXXXX",
      steps: [
        { title: "XXXXXXXXX", description: "XXXXXXXXX" },
        { title: "XXXXXXXXX", description: "XXXXXXXXX" },
        { title: "XXXXXXXXX", description: "XXXXXXXXX" },
      ],
    },
    why: {
      heading: "XXXXXXXXX",
      body: "XXXXXXXXX",
      cardOne: "XXXXXXXXX",
      cardTwo: "XXXXXXXXX",
      cardThree: "XXXXXXXXX",
      ctaLabel: "XXXXXXXXX",
      ctaHref: "/app",
    },
    bespoke: {
      heading: "XXXXXXXXX",
      intro: "XXXXXXXXX",
      budgetDescription: "XXXXXXXXX",
      timeDescription: "XXXXXXXXX",
    },
    testimonials: {
      heading: "XXXXXXXXX",
      subheading: "XXXXXXXXX",
    },
    cta: {
      heading: "XXXXXXXXX",
      body: "XXXXXXXXX",
      buttonLabel: "XXXXXXXXX",
      buttonHref: "/app",
    },
  }),
};

export const variantSlugs = Object.keys(homeVariants).filter(
  (slug) => slug !== "default",
);

export const defaultVariant = baseVariant;
