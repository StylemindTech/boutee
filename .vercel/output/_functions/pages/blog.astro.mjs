import '../chunks/page-ssr_FgztEUp9.mjs';
import { c as createComponent, m as maybeRenderHead, e as renderScript, d as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_Bzv4AZnK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BxXzLk-R.mjs';
import '../chunks/index_DPYU2bcR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CMsSfGz3.mjs';
import { l as loadQuery, u as urlForImage, b as badge } from '../chunks/url-for-image_CvEcneTp.mjs';
export { renderers } from '../renderers.mjs';

const $$Blogs = createComponent(async ($$result, $$props, $$slots) => {
  const { data: posts } = await loadQuery({
    query: `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    description,
    body, 
    categories[]->{title,slug},
    mainImage{
      asset->{url},
      alt
    }
  }`
  });
  const { data: categories } = await loadQuery({
    query: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    description,
    slug
  }`
  });
  function formatDate(dateString) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(dateString));
  }
  function calculateReadTime(body) {
    if (!body || body.length === 0) return "1 min read";
    const text = body.filter((block) => block._type === "block" && block.children).map((block) => block.children.map((child) => child.text).join(" ")).join(" ");
    const words = text.trim().split(/\s+/).length;
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <!-- Heading --> <div class="mb-[48px] lg:mb-[80px]"> <h2 class="lg:text-[80px] text-[48px] lg:leading-[84px] leading-[50px] font-black text-center font-ppradio text-textPrimary mb-[16px]">
Blog
</h2> <p class="font-figtree lg:text-[20px] text-[16px] text-center lg:leading-[24px] leading-[20px] text-textSecondary">
Read stories, tips, and ideas about jewellery and design
</p> </div> <!-- Blogs --> <div class="flex flex-col"> <!-- Category buttons --> <div id="buttonGroup" class="relative mb-[32px] hidden md:inline-flex items-center justify-center bg-cardColor rounded-2xl mx-auto h-12 p-1"> <!-- Slider behind buttons --> <div id="slider" class="absolute top-1 left-0 h-10 bg-white rounded-xl shadow-md transition-all duration-300 z-0"></div> <button class="relative z-10 h-10 py-2 px-6 rounded-xl cursor-pointer font-figtree font-normal text-sm leading-[18px] text-textPrimary" data-category="all">
View all
</button> ${categories?.map((cat) => renderTemplate`<button class="relative z-10 h-10 py-2 px-6 rounded-xl cursor-pointer font-figtree font-normal text-sm leading-[18px] text-textSecondary capitalize"${addAttribute(cat?.slug?.current || cat?.title, "data-category")}> ${cat?.title} </button>`)} </div> <!-- Category dropdown (mobile) --> <div class="mb-[32px] flex md:hidden items-center w-full py-2 px-3 h-13 gap-1 bg-white border border-[#F2F3F7] acd-shadow rounded-[16px]"> <span class="font-figtree font-bold text-[18px] leading-[22px] text-textPrimary">Category:</span> <select id="mobileCategory" name="category" class="w-full font-figtree font-normal text-sm leading-[18px] text-textSecondary outline-none capitalize"> <option value="all">All</option> ${categories?.map(
    (cat) => cat?.title && renderTemplate`<option${addAttribute(cat.slug?.current || cat.title, "value")}> ${cat.title} </option>`
  )} </select> </div> <!-- Blogs grid --> <div id="postsContainer" class="mb-[48px] lg:mb-[80px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"> <!-- Featured blog (first post) --> ${posts?.length > 0 && posts.slice(0, 1).map((post) => renderTemplate`<div${addAttribute(post?.slug?.current, "key")} class="lg:mb-[28px] md:col-span-2 lg:col-span-3 min-w-[240px] md:max-w-full rounded-[20px] border border-cardColor flex flex-col md:flex-row md:items-center md:bg-secondary md:border-secondary post-item"${addAttribute(post?.categories?.map((c) => c.slug?.current || c.title).join(" "), "data-category")}> <a${addAttribute(`/blog/${post?.slug?.current}`, "href")} class="md:min-w-[400px] lg:min-w-[440px]"> <img${addAttribute(urlForImage(post?.mainImage), "src")}${addAttribute(post?.mainImage?.alt || post?.title || "blog image", "alt")} class="lg:rounded-[24px] rounded-[20px] mb-[8px] md:mb-0 md:w-[350px] lg:w-[440px] md:h-[280px] lg:h-[312px] object-cover"> </a> <div class="p-[12px] md:py-[24px] md:pl-[48px] md:pr-[32px]"> ${post?.categories && renderTemplate`<span class="inline-block grid uppercase place-content-center h-[22px] py-1 px-3 rounded-[40px] bg-cardColor md:bg-[#E3E4E8] font-figtree font-normal text-[10px] leading-[14px] text-textPrimary"> ${post?.categories.map((cat) => cat?.title).join(", ")} </span>`} <a${addAttribute(`/blog/${post?.slug?.current}`, "href")}> <h3 class="line-clamp-2 mt-[12px] mb-[8px] font-ppradio font-bold text-textPrimary text-lg leading-[22px] lg:font-black lg:text-[32px] lg:leading-[36px]"> ${post?.title} </h3> </a> <p class="line-clamp-2 md:line-clamp-3 lg:line-clamp-4 lg:mb-[32px] mb-[16px] font-figtree font-normal text-textPrimary text-base leading-[20px] lg:text-[18px] lg:leading-[22px]"> ${post?.description} </p> <div class="w-full flex items-center gap-2"> <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary"> ${post?.publishedAt && formatDate(post?.publishedAt)} </span> ${renderComponent($$result, "Image", $$Image, { "src": badge, "alt": "blog image", "class": "h-2 w-2" })} <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary"> ${calculateReadTime(post?.body)} </span> </div> </div> </div>`)} <!-- Other blogs --> ${posts?.slice(1).map(
    (item) => item?.slug?.current && renderTemplate`<div class="min-w-[240px] rounded-[20px] border border-cardColor flex flex-col post-item"${addAttribute(item?.categories?.map((c) => c.slug?.current || c.title).join(" "), "data-category")}> <a${addAttribute(`/blog/${item?.slug?.current}`, "href")}> <img${addAttribute(urlForImage(item?.mainImage), "src")}${addAttribute(item?.mainImage?.alt || item?.title || "blog image", "alt")} class="lg:rounded-[24px] rounded-[20px] mb-[8px] min-h-[231px] md:min-h-[293px] md:max-h-[293px] w-full"> </a> <div class="p-[12px] lg:py-4 lg:px-5"> ${item?.categories && renderTemplate`<span class="inline-block grid uppercase place-content-center h-[22px] py-1 px-3 rounded-[40px] bg-cardColor md:bg-[#E3E4E8] font-figtree font-normal text-[10px] leading-[14px] text-textPrimary"> ${item?.categories?.map((cat) => cat?.title).join(", ")} </span>`} <a${addAttribute(`/blog/${item?.slug?.current}`, "href")}> <h3 class="line-clamp-2 mt-[12px] mb-[8px] font-ppradio font-bold text-textPrimary text-lg leading-[22px] lg:font-black lg:text-[20px] lg:leading-[24px]"> ${item?.title} </h3> </a> <p class="line-clamp-2 lg:mb-[32px] mb-[16px] font-figtree font-normal text-textPrimary text-base leading-[20px] lg:text-[18px] lg:leading-[22px]"> ${item?.description} </p> <div class="w-full flex items-center gap-2"> <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary"> ${item?.publishedAt && formatDate(item?.publishedAt)} </span> ${renderComponent($$result, "Image", $$Image, { "src": badge, "alt": "blog image", "class": "h-2 w-2" })} <span class="font-figtree font-normal text-sm leading-[18px] text-textSecondary"> ${calculateReadTime(item?.body)} </span> </div> </div> </div>`
  )} </div> <!-- View more button --> ${posts?.length >= 10 && renderTemplate`<button class="font-figtree font-medium text-base leading-5 text-textPrimary bg-cardColor py-[14px] px-[24px] h-12 rounded-[16px] lg:w-fit lg:mx-auto cursor-pointer">
View more
</button>`} </div> </div> </section> ${renderScript($$result, "C:/Users/billy/boutee/src/components/blog/Blogs.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/billy/boutee/src/components/blog/Blogs.astro", void 0);

const $$Blog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Boutee - Blog" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Blogs", $$Blogs, {})}` })}`;
}, "C:/Users/billy/boutee/src/pages/blog.astro", void 0);

const $$file = "C:/Users/billy/boutee/src/pages/blog.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
