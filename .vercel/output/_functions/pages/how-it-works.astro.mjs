import '../chunks/page-ssr_FgztEUp9.mjs';
import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_Bzv4AZnK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BxXzLk-R.mjs';
import '../chunks/index_DPYU2bcR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CMsSfGz3.mjs';
import 'clsx';
/* empty css                                        */
import { b as btnIcon } from '../chunks/btn-icon_oUW_txVX.mjs';
import { c as cardImg, a as cardImg1, b as cardImg2 } from '../chunks/card-img3_CEgwED9O.mjs';
export { renderers } from '../renderers.mjs';

const whoImg = new Proxy({"src":"/_astro/cta-img.BUZ9_Vb9.png","width":1867,"height":1494,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/cta-img.png";
							}
							
							return target[name];
						}
					});

const $$CTASection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="bg-cardColor rounded-[40px] grid md:grid-cols-2 lg:gap-[80px] md:gap-[10px] gap-[8px] overflow-hidden"> <div class="flex flex-col lg:pl-[80px] justify-center md:py-[0px] py-[48px] p-[24px]"> <h2 class="lg:text-[52px] text-center md:text-start text-[32px] md:text-[28px] leading-[36px] lg:leading-[56px] lg:font-black font-normal text-textPrimary font-ppradio">
Ready to begin?
</h2> <p class="text-textPrimary text-center md:text-start text-[20px] leading-[24px] font-figtree mt-[24px] lg:mb-[64px] mb-[48px]">
The first step is finding your style. It's free and easy to get
          started.
</p> <button type="button" class="cursor-pointer bg-btnPrimary howBtn-after relative text-white text-base leading-5 py-2 mx-auto md:ml-0 min-h-[56px] min-w-[194px] px-6 rounded-full font-figtree font-medium flex items-center gap-3">
Get Started for Free
</button> </div> <div class="flex justify-end"> ${renderComponent($$result, "Image", $$Image, { "src": whoImg, "alt": "Ring", "class": "max-w-full md:h-auto lg:max-h-none max-h-[261px] object-cover rounded-[40px]" })} </div> </div> </div> </section>`;
}, "C:/Users/billy/boutee/src/components/how-it-works/CTASection.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$FaqSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="overflow-hidden"> <h2 data-aos="fade-up" class="text-center lg:text-[52px] text-[32px] lg:leading-[56px] leading-[36px] font-black lg:mb-[80px] mb-[24px] font-ppradio text-textPrimary">
Your questions, answered
</h2> </div> <div class="grid md:grid-cols-2 lg:gap-[40px] gap-[20px]"> <div class="space-y-[20px] column"> <div class="p-[20px] rounded-[20px] bg-white acd-shadow"> <button class="cursor-pointer w-full flex justify-between items-center gap-2 text-left font-normal text-textPrimary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px] accordion-btn p-0" aria-expanded="false">
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
What happens if I don't like the final design?
<span class="icon text-xl leading-[24px] text-[30px]">+</span> </button> <div class="accordion-content max-h-0 overflow-hidden transition-all duration-300 font-normal text-textSecondary font-figtree leading-[18px] lg:leading-[22px] text-base lg:text-[18px]"> <p class="mt-2">
Costs vary depending on the design, materials, and craftsmanship.
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
}, "C:/Users/billy/boutee/src/components/how-it-works/FaqSection.astro", void 0);

const heroImg = new Proxy({"src":"/_astro/user-img.Cb_zGfEY.jpg","width":1024,"height":1024,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/user-img.jpg";
							}
							
							return target[name];
						}
					});

const heroImg1 = new Proxy({"src":"/_astro/Heart.tXc3ODHk.png","width":28,"height":28,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/Heart.png";
							}
							
							return target[name];
						}
					});

const heroImgMobile = new Proxy({"src":"/_astro/ring-img.CO4GCSlJ.png","width":1188,"height":1188,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/ring-img.png";
							}
							
							return target[name];
						}
					});

const heroImgMobile1 = new Proxy({"src":"/_astro/SetHero.CaBRbDQb.png","width":226,"height":195,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/billy/boutee/src/assets/Image/SetHero.png";
							}
							
							return target[name];
						}
					});

const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="md:py-[112px] pt-[40px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="grid xl:grid-cols-2 lg:gap-20 gap-[48px] items-center"> <div> <h1 class="md:text-[80px] text-[48px] text-center md:text-start leading-[42px] text-textPrimary font-black md:leading-[84px] font-ppradio md:mb-6 mb-[16px]">
Bespoke, made simple
</h1> <p class="md:text-xl text-[16px] text-center md:text-start leading-[20px] md:leading-[24px] text-textSecondary font-figtree mb-12">
Commissioning a ring should be exciting, not intimidating. We've
          broken down the entire process into clear, simple steps, so you know
          exactly what to expect from start to finish.
</p> <button type="button" class="spinBtn cursor-pointer bg-btnPrimary howBtn-after relative text-white text-base leading-5 py-2 mx-auto md:ml-0 md:min-h-[56px] min-h-[48px] min-w-[212px] px-6 rounded-full font-figtree font-medium flex items-center gap-3"> ${renderComponent($$result, "Image", $$Image, { "src": btnIcon, "class": "btnIcon w-5 h-5", "alt": "" })}
Find Your Jeweller
</button> </div> <div class="flex justify-center xl:justify-end relative   w-full"> <div class="md:max-w-[600px] max-w-[327px] h-full min-h-[600px] relative w-full"> <div class="profile-img floating rotate-[-3.73deg]" data-speed="0.2" data-float="2"> ${renderComponent($$result, "Image", $$Image, { "src": heroImg, "class": "", "alt": "hero-image" })} </div> <!-- Ring Box --> <div class="ring-box floating rotate-[10deg]" data-speed="0.6" data-float="2"> ${renderComponent($$result, "Image", $$Image, { "src": heroImgMobile, "class": "object-cover ring-img", "alt": "hero-image" })} <div class="heart"> ${renderComponent($$result, "Image", $$Image, { "src": heroImg1, "class": "w-[30.62px] h-[30.62px]", "alt": "hero-image" })} </div> </div> <!-- Chat Bubble --> <div class="chat floating" data-speed="0.6" data-float="1"> <p class="font-figtree">
Hi, I really like your work and would love to order a ring from you.
            I’ve attached a few examples of rings I like for reference. Could
            you let me know how much something similar would cost and how long
            it would take to make?
</p> <button class="font-figtree">Contact jeweller</button> </div> <!-- Accordion --> <div class="accordion floating" data-speed="0.3" data-float="4"> <!-- <h4 class="font-figtree">Budget Range</h4>
          <label class="font-figtree"><input type="radio" name="budget" /> &lt; £1500</label>
          <label class="font-figtree"><input type="radio" name="budget" /> £1500 - £3000</label>
          <label class="font-figtree"><input type="radio" name="budget" /> £3000 - £4500</label>
          <label class="font-figtree"><input type="radio" name="budget" /> &gt; £4500</label> --> ${renderComponent($$result, "Image", $$Image, { "src": heroImgMobile1, "class": "object-cover", "alt": "hero-image" })} </div> <div class="layer-how"></div> <div class="layer-how1"></div> </div> </div> </div> </div> </section>`;
}, "C:/Users/billy/boutee/src/components/how-it-works/HeroSection.astro", void 0);

const $$ProcessSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="overflow-hidden"> <h2 data-aos="fade-up" class="lg:text-[52px] text-[32px] font-ppradio leading-[36px] font-black text-center lg:leading-[56px] text-textPrimary lg:mb-[80px] mb-[40px]">
The Boutee Process
</h2> </div> <div class="grid md:grid-cols-3 lg:gap-[40px] gap-[20px]"> <div class="bg-cardColor lg:rounded-[40px] rounded-[20px] flex flex-col items-center text-center"> <div class="w-full lg:min-h-[400px] min-h-[237px] lg:max-h-[400px] max-h-[327px] overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": cardImg, "alt": "card img", "class": "w-full h-full object-cover" })} </div> <div class="lg:p-[24px] py-[16px] px-[24px]"> <h3 class="lg:text-[20px] text-[18px] font-bold font-figtree lg:leading-[24px] leading-[22px] mb-[12px] text-textPrimary">
Build Your Style Profile
</h3> <p class="text-textPrimary font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px]">
In the Boutee app, you can set your budget and like rings to create
            a visual moodboard, or connect your Pinterest board. The more you
            add, the better we'll understand your taste.
</p> </div> </div> <div class="bg-cardColor lg:rounded-[40px] rounded-[20px] flex flex-col items-center text-center"> <div class="w-full lg:min-h-[400px] min-h-[237px] lg:max-h-[400px] max-h-[327px] overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": cardImg1, "alt": "card img", "class": "w-full h-full object-cover" })} </div> <div class="lg:p-[24px] py-[16px] px-[24px]"> <h3 class="lg:text-[20px] text-[18px] font-bold font-figtree lg:leading-[24px] leading-[22px] mb-[12px] text-textPrimary">
Get Recommendations
</h3> <p class="text-textPrimary font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px]">
Our technology analyses your style and matches you with independent
            jewellers who are a great fit. Browse your recommendations or
            explore all our jewellers.
</p> </div> </div> <div class="bg-cardColor lg:rounded-[40px] rounded-[20px] flex flex-col items-center text-center"> <div class="w-full lg:min-h-[400px] min-h-[237px] lg:max-h-[400px] max-h-[327px] overflow-hidden"> ${renderComponent($$result, "Image", $$Image, { "src": cardImg2, "alt": "card img", "class": "w-full h-full object-cover" })} </div> <div class="lg:p-[24px] py-[16px] px-[24px]"> <h3 class="lg:text-[20px] text-[18px] font-bold font-figtree lg:leading-[24px] leading-[22px] mb-[12px] text-textPrimary">
Start a Conversation
</h3> <p class="text-textPrimary font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px]">
When you're ready, send an enquiry directly from the app. You can
            include your top inspiration rings to get the conversation started.
</p> </div> </div> </div> </div> </section>`;
}, "C:/Users/billy/boutee/src/components/how-it-works/ProcessSection.astro", void 0);

const $$StepSection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="grid md:grid-cols-2 md:gap-[80px] items-start"> <div> <h2 class="lg:text-[52px] font-ppradio text-[32px] lg:leading-[56px] leading-[36px] lg:font-black font-normal text-center md:text-start md:mb-[40px] mb-[24px]">
The Jeweller Process
</h2> <div class="hidden md:block"> <button type="button" class="spinBtn cursor-pointer bg-btnPrimary relative text-white text-base leading-5 py-2 mx-auto md:ml-0 md:min-h-[56px] min-w-[212px] px-6 rounded-full font-figtree font-medium flex items-center gap-3"> ${renderComponent($$result, "Image", $$Image, { "src": btnIcon, "class": "btnIcon w-5 h-5", "alt": "image" })}
Find Your Jeweller
</button> </div> </div> <div class="space-y-[16px]"> <div class="flex gap-[40px]"> <div class="flex flex-col gap-[16px] items-center"> <div class="bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] font-figtree text-textPrimary lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] font-bold lg:w-[40px] w-[38px] lg:h-[40px] h-[38px] rounded-full flex items-center justify-center">
1
</div> <div class="w-[1px] lg:min-h-[68px] min-h-[92px] flex-1 overflow-hidden" data-aos="line-animate"> <div class="line-fill w-full h-0 bg-textPrimary"></div> </div> </div> <div> <h3 class="font-bold lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-black font-figtree">
The Consultation
</h3> <p class="font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] text-textSecondary lg:mt-[16px] mt-[12px]">
You’ll have an initial chat with your jeweller (online or in
              person) to discuss your ideas, timeline, and budget in more
              detail.
</p> </div> </div> <div class="flex gap-[40px]"> <div class="flex flex-col gap-[16px] items-center"> <div class="bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] font-figtree text-textPrimary lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] font-bold lg:w-[40px] w-[38px] lg:h-[40px] h-[38px] rounded-full flex items-center justify-center">
2
</div> <div class="w-[1px] lg:min-h-[68px] min-h-[92px] flex-1 overflow-hidden" data-aos="line-animate"> <div class="line-fill w-full h-0 bg-textPrimary"></div> </div> </div> <div> <h3 class="font-bold lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-black font-figtree">
Design & Sourcing
</h3> <p class="font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] text-textSecondary lg:mt-[16px] mt-[12px]">
Your jeweller will create initial design sketches and source a
              selection of gemstones for you to choose from. You'll work
              together to refine the design until it's perfect.
</p> </div> </div> <div class="flex gap-[40px]"> <div class="flex flex-col gap-[16px] items-center"> <div class="bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] font-figtree text-textPrimary lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] font-bold lg:w-[40px] w-[38px] lg:h-[40px] h-[38px] rounded-full flex items-center justify-center">
3
</div> <div class="w-[1px] lg:min-h-[68px] min-h-[92px] flex-1 overflow-hidden" data-aos="line-animate"> <div class="line-fill w-full h-0 bg-textPrimary"></div> </div> </div> <div> <h3 class="font-bold lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-black font-figtree">
Creation & Hallmarking
</h3> <p class="font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] text-textSecondary lg:mt-[16px] mt-[12px]">
Once you approve the final design, your jeweller will get to work
              handcrafting your ring. It will then be sent to the Assay Office
              to be hallmarked, certifying its quality.
</p> </div> </div> <div class="flex gap-[40px]"> <div class="flex flex-col gap-[16px] items-center"> <div class="bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] font-figtree text-textPrimary lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] font-bold lg:w-[40px] w-[38px] lg:h-[40px] h-[38px] rounded-full flex items-center justify-center">
4
</div> </div> <div> <h3 class="font-bold lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-black font-figtree">
The Final Ring
</h3> <p class="font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] text-textSecondary lg:mt-[16px] mt-[12px]">
Your finished ring is ready! It will be delivered to you, ready
              for your special moment.
</p> </div> </div> </div> <div class="md:hidden mt-[44px]"> <button type="button" class="spinBtn cursor-pointer bg-btnPrimary relative text-white text-base leading-5 py-2 mx-auto md:ml-0 min-h-[56px] min-w-[212px] px-6 rounded-full font-figtree font-medium flex items-center gap-3"> ${renderComponent($$result, "Image", $$Image, { "src": btnIcon, "class": "btnIcon w-5 h-5", "alt": "image" })}
Find Your Jeweller
</button> </div> </div> </div> </section>`;
}, "C:/Users/billy/boutee/src/components/how-it-works/StepSection.astro", void 0);

const $$HowItWorks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Boutee - How it Works" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, {})} ${renderComponent($$result2, "ProcessSection", $$ProcessSection, {})} ${renderComponent($$result2, "StepSection", $$StepSection, {})} ${renderComponent($$result2, "FaqSection", $$FaqSection, {})} ${renderComponent($$result2, "CTASection", $$CTASection, {})} ` })}`;
}, "C:/Users/billy/boutee/src/pages/how-it-works.astro", void 0);

const $$file = "C:/Users/billy/boutee/src/pages/how-it-works.astro";
const $$url = "/how-it-works";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$HowItWorks,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
