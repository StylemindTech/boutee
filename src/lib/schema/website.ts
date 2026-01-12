import { ORGANIZATION_ID } from './organization';

const SITE_URL = 'https://www.boutee.co.uk';

export const WEBSITE_ID = `${SITE_URL}#website`;

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,

    url: SITE_URL,
    name: "Boutee",
    alternateName: ["Boutee Jewellery", "Boutee UK"],
    description:
      "Boutee connects customers directly with independent UK jewellers to create bespoke engagement rings and fine jewellery.",

    publisher: {
      "@id": ORGANIZATION_ID
    },

    inLanguage: "en-GB"
  };
}
