import '../chunks/page-ssr_C231QJuk.mjs';
import { c as createComponent, a as renderTemplate, m as maybeRenderHead, r as renderComponent } from '../chunks/astro/server_Bzv4AZnK.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$Layout } from '../chunks/Layout_BxXzLk-R.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$FaqSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="lg:mb-[80px] mb-[24px] overflow-hidden"> <h2 data-aos="fade-up" class="text-center lg:text-[52px] text-[32px] lg:leading-[56px] leading-[36px] font-black font-ppradio text-textPrimary">
Frequently asked questions
</h2> <p class="lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-textSecondary font-figtree text-center mt-[16px]">
Got questions? We\u2019ve answered the most common ones below
</p> </div> <div class="grid md:grid-cols-2 lg:gap-[40px] gap-[20px]"> <div class="space-y-[20px] column"> <div class="p-[20px] rounded-[20px] bg-white acd-shadow"> <button class="cursor-pointer w-full flex justify-between items-center gap-2 text-left font-normal text-textPrimary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px] accordion-btn p-0" aria-expanded="false">
How much does a bespoke ring cost?
<span class="icon text-xl leading-[24px] text-[30px]">+</span> </button> <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 font-normal text-textSecondary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px]"> <p class="mt-2">
Costs vary depending on the design, materials, and craftsmanship.
</p> </div> </div> <div class="p-[20px] rounded-[20px] bg-white acd-shadow"> <button class="cursor-pointer w-full flex justify-between items-center gap-2 text-left font-normal text-textPrimary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px] accordion-btn p-0" aria-expanded="false">
How long does it take to make a ring?
<span class="icon text-xl leading-[24px] text-[30px]">+</span> </button> <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 font-normal text-textSecondary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px]"> <p class="mt-2">
Costs vary depending on the design, materials, and craftsmanship.
</p> </div> </div> <div class="p-[20px] rounded-[20px] bg-white acd-shadow"> <button class="cursor-pointer w-full flex justify-between items-center gap-2 text-left font-normal text-textPrimary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px] accordion-btn p-0" aria-expanded="false">
Do I need to have a full design in mind to start?
<span class="icon text-xl leading-[24px] text-[30px]">+</span> </button> <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 font-normal text-textSecondary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px]"> <p class="mt-2">
Costs vary depending on the design, materials, and craftsmanship.
</p> </div> </div> </div> <div class="space-y-[20px] column"> <div class="p-[20px] rounded-[20px] bg-white acd-shadow"> <button class="cursor-pointer w-full flex justify-between items-center gap-2 text-left font-normal text-textPrimary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px] accordion-btn p-0" aria-expanded="false">
Is Boutee free to use?
<span class="icon text-xl leading-[24px] text-[30px]">+</span> </button> <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 font-normal text-textSecondary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px]"> <p class="mt-2">
Costs vary depending on the design, materials, and craftsmanship.
</p> </div> </div> <div class="p-[20px] rounded-[20px] bg-white acd-shadow"> <button class="cursor-pointer w-full flex justify-between items-center gap-2 text-left font-normal text-textPrimary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px] accordion-btn p-0" aria-expanded="false">
What happens if I don't like the final design?
<span class="icon text-xl leading-[24px] text-[30px]">+</span> </button> <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 font-normal text-textSecondary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px]"> <p class="mt-2">
Costs vary depending on the design, materials, and craftsmanship.
</p> </div> </div> <div class="p-[20px] rounded-[20px] bg-white acd-shadow"> <button class="cursor-pointer w-full flex justify-between items-center gap-2 text-left font-normal text-textPrimary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px] accordion-btn p-0" aria-expanded="false">
How involved can I be in the design process?
<span class="icon text-xl leading-[24px] text-[30px]">+</span> </button> <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 font-normal text-textSecondary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px]"> <p class="mt-2">
Laoreet elit malesuada elementum a commodo egestas et nibh libero.
</p> </div> </div> </div> </div> </div> </section> <script>
  if (typeof window !== "undefined") {
    const buttons = document.querySelectorAll(".accordion-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const column = btn.closest(".column");
        const content = btn.nextElementSibling;
        const icon = btn.querySelector(".icon");

        column.querySelectorAll(".accordion-content").forEach((el) => {
          if (el !== content) {
            el.style.maxHeight = null;
            const otherBtn = el.previousElementSibling;
            if (otherBtn) {
              otherBtn.setAttribute("aria-expanded", "false");
              const otherIcon = otherBtn.querySelector(".icon");
              if (otherIcon) otherIcon.textContent = "+";
            }
          }
        });

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
          btn.setAttribute("aria-expanded", "false");
          if (icon) icon.textContent = "+";
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          btn.setAttribute("aria-expanded", "true");
          if (icon) icon.textContent = "\u2013";
        }
      });
    });

    window.addEventListener("resize", () => {
      document.querySelectorAll(".accordion-content").forEach((el) => {
        if (el.style.maxHeight) {
          el.style.maxHeight = el.scrollHeight + "px";
        }
      });
    });
  }
<\/script>`])), maybeRenderHead());
}, "C:/Users/billy/boutee/src/components/faq/FaqSection.astro", void 0);

const $$CtaSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="text-center bg-cardColor rounded-[48px] lg:px-[150px] lg:py-[88px] py-[48px] px-[24px]"> <h3 class="lg:text-[52px] text-center mb-4 lg:mb-[24px] text-[32px] md:text-[28px] leading-[36px] lg:leading-[56px] lg:font-black font-normal text-textPrimary font-ppradio">
Still have a question for us?
</h3> <p class="lg:text-[18px] text-center mb-[48px] text-[16px] md:text-[18px] leading-[20px] lg:leading-[22px] max-w-[880px] mx-auto font-normal text-textPrimary font-figtree">
We'd love to hear from you
</p> <button type="button" class="cursor-pointer bg-btnPrimary btn-after text-white text-base leading-5 py-2 md:ml-0 min-h-[56px] min-w-[130px] px-6 rounded-full font-figtree font-medium btn-cta">
Contact Us
</button> </div> </div> </section>`;
}, "C:/Users/billy/boutee/src/components/faq/CtaSection.astro", void 0);

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Boutee - Frequently Asked Questions" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "FaqSection", $$FaqSection, {})} ${renderComponent($$result2, "CTASection", $$CtaSection, {})} ` })}`;
}, "C:/Users/billy/boutee/src/pages/faq.astro", void 0);

const $$file = "C:/Users/billy/boutee/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
