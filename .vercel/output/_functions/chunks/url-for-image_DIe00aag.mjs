import { s as sanityClient } from './page-ssr_C231QJuk.mjs';
import { c as createSvgComponent } from './Layout_BxXzLk-R.mjs';
import imageUrlBuilder from '@sanity/image-url';

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

const badge = createSvgComponent({"meta":{"src":"/_astro/Badge-blog.CtprX9Aq.svg","width":8,"height":8,"format":"svg"},"attributes":{"width":"8","height":"8","viewBox":"0 0 8 8","fill":"none"},"children":"\r\n<circle cx=\"4\" cy=\"4\" r=\"4\" fill=\"url(#paint0_linear_560_2128)\" />\r\n<defs>\r\n<linearGradient id=\"paint0_linear_560_2128\" x1=\"1.23077\" y1=\"8.57692\" x2=\"5.46154\" y2=\"-0.461539\" gradientUnits=\"userSpaceOnUse\">\r\n<stop stop-color=\"#C8C1F2\" />\r\n<stop offset=\"1\" stop-color=\"#F0D9F0\" />\r\n</linearGradient>\r\n</defs>\r\n"});

const imageBuilder = imageUrlBuilder(sanityClient);
function urlForImage(source) {
  return imageBuilder.image(source);
}

export { badge as b, loadQuery as l, urlForImage as u };
