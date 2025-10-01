import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"2025-01-10","projectId":undefined,"dataset":undefined,"useCdn":true,"stega":{"studioUrl":"\u002Fstudio"}}
          );

globalThis.sanityClient = sanityClient;

export { sanityClient as s };
