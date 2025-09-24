import { c as createSvgComponent } from './Layout_eAk5PqEE.mjs';
import { s as sanityClient } from './page-ssr_B_pVJxRA.mjs';
import imageUrlBuilder from '@sanity/image-url';

const badge = createSvgComponent({"meta":{"src":"/_astro/Badge-blog.oEz7gKFH.svg","width":8,"height":8,"format":"svg"},"attributes":{"width":"8","height":"8","viewBox":"0 0 8 8","fill":"none"},"children":"\n<circle cx=\"4\" cy=\"4\" r=\"4\" fill=\"url(#paint0_linear_560_2128)\" />\n<defs>\n<linearGradient id=\"paint0_linear_560_2128\" x1=\"1.23077\" y1=\"8.57692\" x2=\"5.46154\" y2=\"-0.461539\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#C8C1F2\" />\n<stop offset=\"1\" stop-color=\"#F0D9F0\" />\n</linearGradient>\n</defs>\n"});

const imageBuilder = imageUrlBuilder(sanityClient);
function urlForImage(source) {
  return imageBuilder.image(source);
}

async function loadQuery({
  query,
  params
}) {
  const { result } = await sanityClient.fetch(
    query,
    params ?? {},
    { filterResponse: false }
  );
  return {
    data: result
  };
}

export { badge as b, loadQuery as l, urlForImage as u };
