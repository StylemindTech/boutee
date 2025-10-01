import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"2025-01-28","projectId":"we90e4mg","dataset":"production","useCdn":true,"stega":{"studioUrl":"\u002Fstudio"}}
          );

globalThis.sanityClient = sanityClient;

export { sanityClient as s };
