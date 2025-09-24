import '../chunks/page-ssr_B_pVJxRA.mjs';
import { c as createComponent, m as maybeRenderHead, r as renderComponent, a as renderTemplate } from '../chunks/astro/server_zf3sSMd5.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_eAk5PqEE.mjs';
import '../chunks/index_DPYU2bcR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CwRsFUvu.mjs';
import { u as userJewellers } from '../chunks/Jewellers-avtar_-TN2LpRI.mjs';
import { b as btnIcon } from '../chunks/btn-icon_dhbyZUuF.mjs';
/* empty css                                         */
import 'clsx';
export { renderers } from '../renderers.mjs';

const img1 = new Proxy({"src":"/_astro/ourJewHero-1.Basj7HzU.jpg","width":1845,"height":2499,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/ourJewHero-1.jpg";
							}
							
							return target[name];
						}
					});

const img2 = new Proxy({"src":"/_astro/ourJewHero-2.DaM-lJ9-.jpg","width":2499,"height":1666,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/ourJewHero-2.jpg";
							}
							
							return target[name];
						}
					});

const img3 = new Proxy({"src":"/_astro/ourJewHero-3.CHqu8yYG.jpg","width":1666,"height":2499,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/ourJewHero-3.jpg";
							}
							
							return target[name];
						}
					});

const $$HeroSections = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="md:py-[112px] pt-[36px] pb-[24px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="grid xl:grid-cols-2 xl:gap-20 gap-[48px] items-center"> <div class="flex flex-col items-center md:items-start md:justify-start justify-center"> <div class="md:text-[16px] text-[10px] font-medium md:leading-[20px] leading-[14px] text-textPrimary bg-cardColor md:py-[8px] py-[5px] md:px-[16px] px-[12px] font-figtree rounded-[40px] inline">
OUR JEWELLERS
</div> <h1 class="md:text-[80px] md:mt-[48px] mt-[32px] text-[48px] text-center md:text-start leading-[42px] text-textPrimary font-black md:leading-[84px] font-figtree md:mb-6 mb-[16px]">
The difference <br> is the maker
</h1> <p class="md:text-xl text-[16px] text-center md:text-start leading-[20px] md:leading-[24px] text-textSecondary font-figtree md:mb-12 mb-[36px]">
A truly exceptional ring is born from a partnership between a
          visionary client and a skilled artist. We've built our private
          community by seeking out the most talented independent jewellers in
          Britain.
</p> <button type="button" class="spinBtn cursor-pointer bg-btnPrimary relative btn-after-jewellers z-[9] text-white text-base leading-5 py-2 mx-auto md:ml-0 md:min-h-[56px] min-h-[48px] min-w-[212px] px-6 rounded-full font-figtree font-medium flex items-center gap-3"> ${renderComponent($$result, "Image", $$Image, { "src": btnIcon, "class": "btnIcon w-5 h-5", "alt": "image" })}
Find Your Jeweller
</button> <div class="flex md:mt-[84px] mt-[52px] md:flex-row flex-col items-center gap-2"> <div> ${renderComponent($$result, "Image", $$Image, { "src": userJewellers, "alt": "" })} </div> <p class="md:text-base text-textPrimary text-[14px] font-figtree">
100+ jewellers on the platform
</p> </div> </div> <div class="flex justify-center xl:justify-end w-full xl:mt-[-15rem]"> <div class="md:max-w-[600px] max-w-[320px] lg:min-h-[400px] min-h-[350px] md:min-h-[480px] xl:min-h-none relative h-full w-full"> <div class="card user-card floating" data-speed="0.2" data-float="2"> ${renderComponent($$result, "Image", $$Image, { "src": img1, "class": "user-card-img ourImg object-cover object-top", "alt": "image" })} <div class="user-text px-2 pt-3 md:pt-4"> <p class="text-[10px] md:text-base leading-4 md:leading-5 font-figtree text-textSecondary font-normal">
Hey! I need a special ring for a special occasion.
</p> </div> </div> <!-- Budget Info --> <div class="info-box floating" data-speed="0.4" data-float="6"> <div class="w-[65px] sm:w-[75px] md:w-[89px] text-center"> <span class="font-figtree font-bold text-textPrimary text-sm md:text-base lg:text-[18px] leading-4 md:leading-[22px] text-center">
£1500
</span><span class="font-figtree text-textSecondary text-xs md:text-[18px] leading-4 md:leading-[22px] text-center block font-normal">budget</span> </div> <span class="border-r border-[#F2F3F7]"></span> <div class="w-[65px] sm:w-[75px] md:w-[89px] text-center"> <span class="font-figtree font-bold text-textPrimary text-sm md:text-base lg:text-[18px] leading-4 md:leading-[22px] text-center">
5-6
</span> <span class="font-figtree text-textSecondary text-xs md:text-[18px] leading-4 md:leading-[22px] text-center block font-normal">weeks</span> </div> </div> <div class="layer-green"></div> <div class="layer-pink"></div> <div class="layer-pink1"></div> <!-- Jeweller --> <div class="card jeweller-card floating" data-speed="0.6" data-float="1"> ${renderComponent($$result, "Image", $$Image, { "src": img2, "class": "jeweller-card-img ourImg object-cover object-top", "alt": "image" })} <div class="pt-4 px-2"> <h3 class="font-figtree font-bold text-[12px] md:text-[21px] leading-5 md:leading-[26px] uppercase text-textPrimary mb-1">
LEONOR JEWELLERY
</h3> <p class="text-[10px] md:text-base leading-4 md:leading-5 font-figtree text-textSecondary font-normal -tracking-normal">
I’ll make the perfect one for you!
</p> </div> </div> <!-- Work --> <div class="card work-card floating" data-speed="0.3" data-float="4"> ${renderComponent($$result, "Image", $$Image, { "src": img3, "class": "work-card-img ourImg object-cover", "alt": "image" })} </div> </div> </div> </div> </div> </section>`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/our-jewellers/HeroSections.astro", void 0);

const cardImg = new Proxy({"src":"/_astro/jws-img.C9P1wT5i.png","width":127,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img.png";
							}
							
							return target[name];
						}
					});

const cardImg1 = new Proxy({"src":"/_astro/jws-img-1.Cj5t2hWU.png","width":126,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-1.png";
							}
							
							return target[name];
						}
					});

const cardImg2 = new Proxy({"src":"/_astro/jws-img-2.Bbb5HKJk.png","width":126,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-2.png";
							}
							
							return target[name];
						}
					});

const cardImg3 = new Proxy({"src":"/_astro/jws-img-3.CIdq4F6I.png","width":126,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-3.png";
							}
							
							return target[name];
						}
					});

const cardImg4 = new Proxy({"src":"/_astro/jws-img-4.B1_Xw-AV.png","width":126,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-4.png";
							}
							
							return target[name];
						}
					});

const cardImg5 = new Proxy({"src":"/_astro/jws-img-5.B0XocaC6.png","width":766,"height":766,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-5.png";
							}
							
							return target[name];
						}
					});

const cardImg6 = new Proxy({"src":"/_astro/jws-img-6.B8DgL1G3.png","width":127,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-6.png";
							}
							
							return target[name];
						}
					});

const cardImg7 = new Proxy({"src":"/_astro/jws-img-7.CfScxsHg.png","width":127,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-7.png";
							}
							
							return target[name];
						}
					});

const cardImg9 = new Proxy({"src":"/_astro/jws-img-9.k6QFHR2Y.png","width":127,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-9.png";
							}
							
							return target[name];
						}
					});

const cardImg10 = new Proxy({"src":"/_astro/jws-img-10.C4fW4CJq.png","width":127,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-10.png";
							}
							
							return target[name];
						}
					});

const cardImg11 = new Proxy({"src":"/_astro/jws-img-11.Bn4WJJI-.png","width":127,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-11.png";
							}
							
							return target[name];
						}
					});

const cardImg12 = new Proxy({"src":"/_astro/jws-img-12.Dm3V_y-c.png","width":127,"height":132,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/assets/Image/jws-img-12.png";
							}
							
							return target[name];
						}
					});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$OurMakers = createComponent(($$result, $$props, $$slots) => {
  const jewellers = [
    {
      id: 1,
      img: cardImg2,
      name: "Ami Blastock",
      location: "Kent",
      bio: "Ami Blastock Jewellery"
    },
    {
      id: 2,
      img: cardImg3,
      name: "Edward Xu",
      location: "London",
      bio: "EDX\xDA"
    },
    {
      id: 3,
      img: cardImg4,
      name: "Emma Mogridge",
      location: "Devon",
      bio: "Emma Mogridge Jewellery"
    },
    {
      id: 4,
      img: cardImg1,
      name: "Caitriona Campbell",
      location: "Belfast",
      bio: "Aille Jewellery"
    },
    {
      id: 5,
      img: cardImg6,
      name: "Marketa Garne",
      location: "Cornwall",
      bio: "Booblinka Jewellery"
    },
    {
      id: 6,
      img: cardImg,
      name: "Charles Moreton",
      location: "York",
      bio: "Charles Alexander Jewellery"
    },
    {
      id: 7,
      img: cardImg7,
      name: "Caroline Brook",
      location: "Surrey",
      bio: "Caroline Brook Jewellery"
    },
    {
      id: 8,
      img: cardImg9,
      name: "Lindsay Forbes",
      location: "Durham",
      bio: "Laconic Jewellery"
    },
    {
      id: 10,
      img: cardImg10,
      name: "Estelle D\xE9v\xE9",
      location: "London",
      bio: "D\xE9v\xE9"
    },
    {
      id: 11,
      img: cardImg11,
      name: "Halina M. Hamalambo",
      location: "Brighton",
      bio: "Halina Mutinta Jewellery"
    },
    {
      id: 12,
      img: cardImg5,
      name: "Halina M. Hamalambo",
      location: "Brighton",
      bio: "Halina Mutinta Jewellery"
    },
    {
      id: 13,
      img: cardImg12,
      name: "Bryony Wong",
      location: "London",
      bio: "Bryony Wong"
    }
  ];
  return renderTemplate(_a || (_a = __template(["", '<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <!-- Heading --> <div class="text-center lg:mb-[80px] mb-[24px] max-w-[768px] mx-auto overflow-hidden"> <h3 data-aos="fade-up" class="lg:text-[52px] text-center text-[32px] md:text-[28px] leading-[36px] lg:leading-[56px] font-black text-textPrimary font-figtree m-0">\nMeet some of our talented makers\n</h3> <p class="lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-textSecondary font-figtree text-center mt-[16px]">\nThey bring the craftsmanship. You bring the vision.\n</p> </div> <!-- 3 Column Layout --> <div class="grid lg:gap-[32px] gap-[20px] md:grid-cols-1 lg:grid-cols-3 jws-card relative"> <!-- Left Column --> <div id="" class="scrollContainer overflow-hidden relative" data-direction="up"> <div id="" class="scrollContent flex flex-col space-y-4"> ', ' </div> </div> <!-- Middle Column --> <div id="scrollContainer" class="scrollContainer hidden lg:block overflow-hidden relative" data-direction="down"> <div id="scrollContent" class="scrollContent flex flex-col lg:space-y-[24px] space-y-[20px]"> ', ' </div> </div> <!-- Right Column --> <div class="scrollContainer overflow-hidden relative hidden lg:block" data-direction="up"> <div class="scrollContent flex flex-col lg:space-y-[24px] space-y-[20px]"> ', ' </div> </div> </div> </div> <script type="text/javascript">\n    const containers = document.querySelectorAll(".scrollContainer");\n\n    containers.forEach((container) => {\n      const content = container.querySelector(".scrollContent");\n\n      // Duplicate cards for seamless scroll\n      content.innerHTML += content.innerHTML;\n\n      // Dynamically set container height = 4 cards\n      const cardHeight = content.children[0].offsetHeight;\n      const gap = parseInt(getComputedStyle(content).gap) || 16;\n      container.style.height = cardHeight * 4 + gap * 3 + "px";\n\n      // Direction control (default = down)\n      const direction = container.dataset.direction || "down"; // "up" or "down"\n      const speed = 0.3; // adjust as needed\n      let y = direction === "up" ? content.scrollHeight / 2 : 0;\n\n      function animateScroll() {\n        if (direction === "up") {\n          y -= speed;\n          if (y <= 0) y = content.scrollHeight / 2; // reset for seamless loop\n        } else {\n          y += speed;\n          if (y >= content.scrollHeight / 2) y = 0; // reset for seamless loop\n        }\n\n        container.scrollTop = y;\n        requestAnimationFrame(animateScroll);\n      }\n\n      requestAnimationFrame(animateScroll);\n    });\n  <\/script> </section>'])), maybeRenderHead(), [...jewellers].sort(() => Math.random() - 0.5).map((item) => renderTemplate`<div class="flex items-center gap-4 rounded-[16px] acd-shadow"> ${renderComponent($$result, "Image", $$Image, { "src": item.img, "class": "w-[126px] md:h-[132px] h-[110px] lg:rounded-[20px] rounded-[16px] object-cover", "alt": "user-img" })} <div> <h3 class="font-bold text-[18px] lg:text-[20px] text-textPrimary font-figtree"> ${item.name} </h3> <p class="text-[16px] lg:text-[18px] text-textSecondary font-figtree"> ${item.location} </p> <p class="text-[16px] lg:text-[18px] text-textPrimary mt-[16px] font-figtree"> ${item.bio} </p> </div> </div>`), [...jewellers].sort(() => Math.random() - 0.8).map((item) => renderTemplate`<div class="flex items-center gap-4 rounded-[16px] acd-shadow"> ${renderComponent($$result, "Image", $$Image, { "src": item.img, "class": "w-[126px] md:h-[132px] h-[110px] lg:rounded-[20px] rounded-[16px] object-cover", "alt": "user-img" })} <div> <h3 class="font-bold text-[18px] lg:text-[20px] text-textPrimary font-figtree"> ${item.name} </h3> <p class="text-[16px] lg:text-[18px] text-textSecondary font-figtree"> ${item.location} </p> <p class="text-[16px] lg:text-[18px] text-textPrimary mt-[16px] font-figtree"> ${item.bio} </p> </div> </div>`), [...jewellers].sort(() => Math.random() - 0.3).map((item) => renderTemplate`<div class="flex items-center gap-4 rounded-[16px] acd-shadow"> ${renderComponent($$result, "Image", $$Image, { "src": item.img, "class": "w-[126px] md:h-[132px] h-[110px] lg:rounded-[20px] rounded-[16px] object-cover", "alt": "user-img" })} <div> <h3 class="font-bold text-[18px] lg:text-[20px] text-textPrimary font-figtree"> ${item.name} </h3> <p class="text-[16px] lg:text-[18px] text-textSecondary font-figtree"> ${item.location} </p> <p class="text-[16px] lg:text-[18px] text-textPrimary mt-[16px] font-figtree"> ${item.bio} </p> </div> </div>`));
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/our-jewellers/OurMakers.astro", void 0);

const $$JoinStep = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="grid md:grid-cols-2 md:gap-[40px] items-start"> <div> <h2 class="lg:text-[52px] text-[32px] lg:leading-[56px] leading-[36px] lg:font-black font-normal text-center font-figtree md:text-start md:mb-[40px] mb-[24px]">
How a jeweller joins the Boutee community
</h2> <div class="hidden md:block"> <button type="button" class="spinBtn cursor-pointer bg-btnPrimary relative text-white text-base leading-5 py-2 mx-auto md:ml-0 md:min-h-[56px] min-w-[212px] px-6 rounded-full font-figtree font-medium flex items-center gap-3"> ${renderComponent($$result, "Image", $$Image, { "src": btnIcon, "class": "btnIcon w-5 h-5", "alt": "image" })}
Find Your Jeweller
</button> </div> </div> <div class="space-y-[16px]"> <div class="flex gap-[40px]"> <div class="flex flex-col gap-[16px] items-center"> <div class="bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] font-figtree text-textPrimary lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] font-bold lg:w-[40px] w-[38px] lg:h-[40px] h-[38px] rounded-full flex items-center justify-center">
1
</div> <div class="w-[1px] lg:min-h-[68px] min-h-[92px] flex-1 overflow-hidden" data-aos="line-animate"> <div class="line-fill w-full h-0 bg-textPrimary"></div> </div> </div> <div> <h3 class="font-bold lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-black font-figtree">
Craftsmanship Review
</h3> <p class="font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] text-textSecondary lg:mt-[16px] mt-[12px]">
Our panel reviews each applicant's work, assessing technical
              skill, material quality, and finishing. We look for the makers
              setting the standard for British jewellery.
</p> </div> </div> <div class="flex gap-[40px]"> <div class="flex flex-col gap-[16px] items-center"> <div class="bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] font-figtree text-textPrimary lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] font-bold lg:w-[40px] w-[38px] lg:h-[40px] h-[38px] rounded-full flex items-center justify-center">
2
</div> <div class="w-[1px] lg:min-h-[68px] min-h-[92px] flex-1 overflow-hidden" data-aos="line-animate"> <div class="line-fill w-full h-0 bg-textPrimary"></div> </div> </div> <div> <h3 class="font-bold lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-black font-figtree">
Style & Originality
</h3> <p class="font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] text-textSecondary lg:mt-[16px] mt-[12px]">
We seek out designers with a distinct and authentic point of view.
              Our community celebrates a diverse range of styles, from modern
              minimalism to romantic classicism.
</p> </div> </div> <div class="flex gap-[40px]"> <div class="flex flex-col gap-[16px] items-center"> <div class="bg-[linear-gradient(76deg,#B9F551_22.87%,#D7F650_74.01%)] font-figtree text-textPrimary lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] font-bold lg:w-[40px] w-[38px] lg:h-[40px] h-[38px] rounded-full flex items-center justify-center">
3
</div> </div> <div> <h3 class="font-bold lg:text-[20px] text-[18px] lg:leading-[24px] leading-[22px] text-black font-figtree">
Client Experience & Values
</h3> <p class="font-figtree lg:text-[18px] text-[16px] lg:leading-[22px] leading-[20px] text-textSecondary lg:mt-[16px] mt-[12px]">
We interview jewellers to ensure they provide a collaborative,
              transparent, and personal service. We look for good people who
              create beautiful work.
</p> </div> </div> </div> <div class="md:hidden mt-[44px]"> <button type="button" class="spinBtn cursor-pointer bg-btnPrimary relative text-white text-base leading-5 py-2 mx-auto md:ml-0 min-h-[56px] min-w-[212px] px-6 rounded-full font-figtree font-medium flex items-center gap-3"> ${renderComponent($$result, "Image", $$Image, { "src": btnIcon, "class": "btnIcon w-5 h-5", "alt": "image" })}
Find Your Jeweller
</button> </div> </div> </div> </section>`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/our-jewellers/JoinStep.astro", void 0);

const $$CTASection = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="lg:py-[112px] py-[48px]"> <div class="max-w-screen-2xl lg:px-20 px-[24px] mx-auto"> <div class="text-center bg-cardColor rounded-[48px] lg:px-[150px] lg:py-[88px] py-[48px] px-[24px]"> <h2 class="lg:text-[52px] text-center mb-[24px] text-[32px] md:text-[28px] leading-[36px] lg:leading-[56px] lg:font-black font-normal text-textPrimary font-figtree">
Ready to find your perfect jeweller?
</h2> <p class="lg:text-[18px] text-center mb-[48px] text-[16px] md:text-[18px] leading-[20px] lg:leading-[22px] max-w-[880px] mx-auto font-normal text-textPrimary font-figtree">
Create your free style profile to explore our full community, get
        personalised matches based on your unique taste, and start a
        conversation with the right jeweller for you.
</p> <button type="button" class="cursor-pointer bg-btnPrimary btn-after text-white text-base leading-5 py-2 md:ml-0 min-h-[56px] min-w-[194px] px-6 rounded-full font-figtree font-medium btn-cta">
Get Started for Free
</button> </div> </div> </section>`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/our-jewellers/CTASection.astro", void 0);

const $$OurJewellers = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, { "title": "Boutee - Our Jewellers" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSections, {})} ${renderComponent($$result2, "OurMakers", $$OurMakers, {})} ${renderComponent($$result2, "JoinStep", $$JoinStep, {})} ${renderComponent($$result2, "CTASection", $$CTASection, {})} ` })}`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/pages/our-jewellers.astro", void 0);

const $$file = "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/pages/our-jewellers.astro";
const $$url = "/our-jewellers";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$OurJewellers,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
