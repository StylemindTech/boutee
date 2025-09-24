import '../chunks/page-ssr_B_pVJxRA.mjs';
import { c as createComponent, m as maybeRenderHead, b as addAttribute, r as renderComponent, d as renderScript, a as renderTemplate } from '../chunks/astro/server_zf3sSMd5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_eAk5PqEE.mjs';
import '../chunks/index_DPYU2bcR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CwRsFUvu.mjs';
import { l as loadQuery, u as urlForImage, b as badge } from '../chunks/load-query_BaknjT1J.mjs';
export { renderers } from '../renderers.mjs';

const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const { data: posts } = await loadQuery({
    query: `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    description,
    categories[]->{title,slug},
    mainImage
  }`
  });
  function formatDate(dateString) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(dateString));
  }
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <!-- Heading --> <div class="mb-[48px] lg:mb-[80px]"> <h2 class="lg:text-[80px] text-[48px] lg:leading-[84px] leading-[50px] font-black text-center font-figtree mb-[16px]">
Blog
</h2> <p class="font-figtree lg:text-[20px] text-[16px] text-center lg:leading-[24px] leading-[20px] text-textSecondary">
Read stories, tips, and ideas about jewellery and design
</p> </div> <!-- Blogs --> <div class="flex flex-col"> <div id="buttonGroup" class="mb-[32px] hidden md:inline-flex items-center justify-center bg-cardColor rounded-2xl mx-auto h-12 p-1"> <!-- Default active --> <button class="h-10 py-2 px-6 rounded-xl cursor-pointer font-figtree font-normal text-sm leading-[18px] bg-white acd-shadow text-textPrimary">
View all
</button> <button class="h-10 py-2 px-6 rounded-xl cursor-pointer font-figtree font-normal text-sm leading-[18px] text-textSecondary">
Category one
</button> <button class="h-10 py-2 px-6 rounded-xl cursor-pointer font-figtree font-normal text-sm leading-[18px] text-textSecondary">
Category two
</button> <button class="h-10 py-2 px-6 rounded-xl cursor-pointer font-figtree font-normal text-sm leading-[18px] text-textSecondary">
Category three
</button> </div> <div class="mb-[32px] flex md:hidden items-center w-full py-2 px-3 h-13 gap-1 bg-white border border-[#F2F3F7] acd-shadow rounded-[16px]"> <span class="font-figtree font-bold text-[18px] leading-[22px] text-textPrimary">Category:</span> <select name="category" id="" class="w-full font-figtree font-normal text-sm leading-[18px] text-textSecondary outline-none"> <option value="" class="">All</option> <option value="">Category one</option> <option value="">Category two</option> <option value="">Category three</option> </select> </div> <!-- blog  --> <div class="mb-[48px] lg:mb-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"> <!-- blog1 --> <div class="lg:mb-[28px] md:col-span-2 lg:col-span-3 min-w-[240px] md:max-w-full rounded-[20px] border border-cardColor flex flex-col md:flex-row md:items-center md:bg-secondary md:border-secondary"> <a${addAttribute(`/post/${posts[0].slug.current}`, "href")}> <img${addAttribute(`${urlForImage(posts[0].mainImage)}`, "src")}${addAttribute(posts[0].mainImage.alt || "blog image", "alt")} class="lg:rounded-[24px] rounded-[20px] mb-[8px] md:mb-0 md:w-[350px] lg:w-[440px] md:h-[280px] lg:h-[312px] object-cover"> </a> <div class="p-[12px] md:py-[24px] md:pl-[48px] md:pr-[32px]"> ${posts[0].categories && renderTemplate`<span class="inline-block grid uppercase place-content-center h-[22px] py-1 px-3 rounded-[40px] bg-cardColor md:bg-[#E3E4E8] font-figtree font-normal text-[10px] leading-[14px] text-textPrimary"> ${posts[0].categories.map((cat) => cat.title).join(", ")} </span>`} <a${addAttribute(`/post/${posts[0].slug.current}`, "href")}><h3 class="mt-[12px] mb-[8px] font-figtree font-bold text-textPrimary text-lg leading-[22px] lg:font-black lg:text-[32px] lg:leading-[36px]"> ${posts[0].title} </h3></a> <p class="lg:mb-[32px] mb-[16px] font-figtree font-normal text-textPrimary text-base leading-[20px] lg:text-[18px] lg:leading-[22px]"> ${posts[0].description} </p> <div class="w-full flex items-center gap-2"> <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary"> ${formatDate(posts[0].publishedAt)}</span> ${renderComponent($$result, "Image", $$Image, { "src": badge, "alt": "blog image", "class": "h-2 w-2" })} <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary">
5 min read</span> </div> </div> </div> <!-- blog2 --> ${posts.slice(1).map((item) => renderTemplate`<div class="min-w-[240px] rounded-[20px] border border-cardColor flex flex-col"> <a${addAttribute(`/post/${item.slug.current}`, "href")}> <img${addAttribute(`${urlForImage(item.mainImage)}`, "src")}${addAttribute(item.mainImage.alt || "blog image", "alt")} class="lg:rounded-[24px] rounded-[20px] mb-[8px] min-h-[231px] md:min-h-[293px] md:max-h-[293px]"> </a> <div class="p-[12px] lg:py-4 lg:px-5"> ${item.categories && renderTemplate`<span class="inline-block grid uppercase place-content-center h-[22px] py-1 px-3 rounded-[40px] bg-cardColor md:bg-[#E3E4E8] font-figtree font-normal text-[10px] leading-[14px] text-textPrimary"> ${item.categories.map((cat) => cat.title).join("")} </span>`} <a${addAttribute(`/post/${item.slug.current}`, "href")}> <h3 class="mt-[12px] mb-[8px] font-figtree font-bold text-textPrimary text-lg leading-[22px] lg:font-black lg:text-[20px] lg:leading-[24px]"> ${item.title} </h3> </a> <p class="line-clamp-2 lg:mb-[32px] mb-[16px] font-figtree font-normal text-textPrimary text-base leading-[20px] lg:text-[18px] lg:leading-[22px]"> ${item.description} </p> <div class="w-full flex items-center gap-2"> <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary"> ${formatDate(item.publishedAt)} </span> ${renderComponent($$result, "Image", $$Image, { "src": badge, "alt": "blog image", "class": "h-2 w-2" })} <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary">
5 min read
</span> </div> </div> </div>`)} </div> <button class="font-figtree font-medium text-base leading-5 text-textPrimary bg-cardColor py-[14px] px-[24px] h-12 rounded-[16px] lg:w-fit lg:mx-auto cursor-pointer">
View more
</button> </div> </div> </section> ${renderScript($$result, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/blog/Blogs.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/blog/Blogs.astro", void 0);

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Boutee - Blog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Blogs", $$Blogs, {})}` })}`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/pages/blog.astro", void 0);

const $$file = "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
