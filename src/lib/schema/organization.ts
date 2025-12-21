const SITE_URL = 'https://www.boutee.co.uk';

export const ORGANIZATION_ID = `${SITE_URL}#organization`;

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,

    name: "Boutee",
    url: SITE_URL,

    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/Logo.svg`,
      url: `${SITE_URL}/Boutee_Favicon.svg`,
      contentUrl: `${SITE_URL}/Boutee_Favicon.svg`,
      width: 512,
      height: 512
    },

    sameAs: [
      "https://www.instagram.com/boutee_uk",
	 "https://www.linkedin.com/company/boutee"
    ],

    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@boutee.co.uk",
        availableLanguage: ["English"],
        areaServed: "GB"
      }
    ],

    areaServed: {
      "@type": "Country",
      name: "United Kingdom"
    },

    foundingLocation: {
      "@type": "Country",
      name: "United Kingdom"
    }
  };
}
