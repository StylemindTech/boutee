import { c as createComponent, s as spreadAttributes, u as unescapeHTML, a as renderTemplate, m as maybeRenderHead, r as renderComponent, e as createAstro, b as addAttribute, g as renderHead, f as renderSlot, d as renderScript } from './astro/server_zf3sSMd5.mjs';
import 'kleur/colors';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import 'clsx';
import './index_DPYU2bcR.mjs';
import { $ as $$Image } from './_astro_assets_CwRsFUvu.mjs';
/* empty css                            */

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const logo = createSvgComponent({"meta":{"src":"/_astro/Logo.CbsQMaxm.svg","width":84,"height":36,"format":"svg"},"attributes":{"width":"84","height":"36","viewBox":"0 0 84 36","fill":"none"},"children":"\n<path d=\"M47.2309 13.5273C47.2309 13.5273 47.2142 22.8991 47.2309 24.1895C47.2477 24.9026 47.2979 25.6497 47.4319 26.3627C47.6163 27.3644 47.9851 28.3153 48.6723 29.0454L48.826 29.2152H45.0855V27.008C45.0352 27.0589 45.0018 27.1099 44.9683 27.1438C43.1917 28.9944 40.2752 30.2167 37.7947 29.0792C36.5712 28.5189 35.8674 27.3305 35.6327 26.0402C35.3645 24.5801 35.3477 23.086 35.3477 21.6428C35.3477 21.2522 35.2806 19.0452 35.1968 18.3321C35.046 17.2285 34.7108 15.8872 33.9231 15.1572L33.7891 15.0385C33.7941 15.0369 34.8136 14.715 35.6663 14.3763C36.9191 13.8686 37.4893 13.5296 37.493 13.5273C37.493 13.5273 37.493 21.1159 37.493 21.6088C37.493 22.8992 37.4596 24.2405 37.7613 25.4969C37.9792 26.3967 38.4317 27.3815 39.2697 27.8229C40.1245 28.2813 41.1301 28.2473 42.0519 28.0605C43.0408 27.8568 43.9794 27.3136 44.8845 26.3798L45.0688 26.1929C45.0693 26.1713 45.2024 20.8744 44.9683 18.7057C44.851 17.5342 44.5491 15.9721 43.6608 15.1572L43.5268 15.0385C43.5268 15.0385 44.5492 14.7158 45.404 14.3763C46.661 13.8669 47.2309 13.5273 47.2309 13.5273ZM26.4145 13.5443C28.476 13.5612 30.5041 14.3933 31.979 15.8874C33.4706 17.3984 34.2919 18.9773 34.2919 21.524C34.2919 24.0707 33.0683 26.4816 31.0403 27.9756C30.5542 28.3322 30.0347 28.6378 29.4816 28.8925C27.6044 29.7244 25.3417 29.6904 23.4646 28.9094C20.5148 27.704 18.5371 24.7328 18.5371 21.524C18.5371 19.9111 19.0064 18.3661 19.8946 17.0418C20.9505 15.3271 22.6098 14.1724 24.7049 13.714C25.258 13.5952 25.8278 13.5443 26.3976 13.5443H26.4145ZM56.0301 15.6665C58.5442 13.3066 62.5834 12.6445 65.3656 14.9365C66.7399 16.057 67.4272 17.8737 67.4272 19.6395V19.9281H55.9463C55.7285 22.0164 56.1306 23.6123 57.2368 24.9536C59.8011 28.0605 64.9467 27.6871 67.3434 24.5462C68.0473 23.6294 68.3154 22.5936 68.4998 21.3033C68.8517 18.8924 69.4887 17.2625 70.5948 16.0741C71.9692 14.563 73.9134 13.6971 75.9246 13.5443C77.6509 13.4084 79.545 14.0198 80.7517 15.2082C81.9584 16.3967 82.4109 17.9587 82.3774 19.6225V19.911H70.8965V20.1148C70.863 20.5223 70.8463 20.9299 70.8631 21.3204C70.9469 23.0181 71.634 24.5461 72.8072 25.5987C75.5392 28.0775 79.964 27.3136 82.2602 24.6311C82.5619 24.2745 82.8467 23.901 83.1149 23.5444H83.0813L83.8691 22.4239C83.8691 22.4239 84.2042 20.1998 83.802 22.9333C83.3997 25.6667 81.3717 28.0606 78.8577 29.0114C74.7849 30.5394 70.2764 28.2982 68.9021 24.1556L68.7512 23.7142L68.6004 24.1556C68.3658 24.8177 68.0808 25.429 67.7456 25.9893C65.4494 29.7414 60.1196 30.5563 56.667 28.0096C52.7618 25.1233 52.5105 18.9772 56.0301 15.6665ZM48.8566 29.249L48.826 29.2152H48.8901L48.8566 29.249ZM8.43061 6.48145C10.0228 6.5154 11.2798 6.70221 12.4027 7.10967C13.0731 7.36434 13.8945 7.73782 14.4308 8.51881C15.3023 9.79217 15.2185 11.3033 14.2296 12.4578C13.8274 12.9332 12.0508 14.4442 12.0508 14.4442L12.3358 14.546L12.3524 14.58C15.2017 15.6157 16.928 17.6021 17.4644 20.4544C18.0342 23.4255 16.861 26.0401 14.2463 27.6361C12.6038 28.6378 10.7603 29.1642 8.76582 29.2152C8.11216 29.2321 0 29.2321 0 29.2321L0.268265 28.7736C1.4247 26.8551 1.54202 24.665 1.57554 22.7635C1.60906 19.4867 1.5923 16.2608 1.57554 12.9671C1.55878 10.9297 1.30734 9.40161 0.787771 8.02638C0.754011 7.90706 0.083802 6.48145 0.083802 6.48145H8.43061ZM52.041 12.5427H54.572V13.3236H52.041V23.7142C52.1248 25.7346 52.8456 28.0945 54.6389 28.9774L55.0748 29.2152H54.421C53.3316 29.2152 51.9572 28.8924 51.203 27.9756C50.5662 27.2116 50.1975 26.2608 50.0466 25.0894C49.9293 24.1216 49.8622 23.1539 49.8622 22.2541V13.2896H47.6833C47.6833 13.2896 49.1415 12.4917 50.3148 11.3711C51.6024 10.1345 52.0391 8.86408 52.041 8.85838V12.5427ZM28.7945 16.0061C26.9006 14.1725 23.6658 13.85 22.0903 16.2947C21.0512 17.9077 20.7662 19.7584 21.2188 21.9146C21.7886 24.5971 23.0121 26.5325 24.9899 27.8058C27.2022 29.232 29.9676 28.5019 31.0905 26.108C31.5431 25.1403 31.7611 24.0877 31.7778 22.6106V22.5937C31.6773 20.081 30.6381 17.8058 28.7945 16.0061ZM11.2799 14.9705C11.2799 14.9705 10.3747 15.6326 10.2238 15.7345L9.21822 16.4985C7.35783 17.9586 6.01708 19.5377 5.12878 21.3204C3.98909 23.5954 3.97232 25.9553 5.04498 28.3492L5.09523 28.4511V28.4341H7.82714C8.34671 28.4341 8.95018 28.3662 9.68764 28.2134C12.0173 27.7719 13.5592 26.4306 14.2799 24.2404C14.9335 22.271 14.8666 20.3015 14.0956 18.383C13.5257 16.9908 12.6374 15.8703 11.4475 15.0554L11.2799 14.9705ZM7.35788 7.26237C6.87183 7.26237 6.36895 7.29643 5.86614 7.36434C4.59239 7.55111 3.85502 8.31517 3.7377 9.60548L3.75439 9.6393C3.6706 10.5561 2.5981 24.1372 2.56447 24.58L2.76547 24.0877C4.24038 20.4884 6.10092 17.9077 9.18483 15.1743C9.5368 14.8517 10.1904 14.1725 10.5759 13.748C11.3301 12.8822 11.7658 12.1351 12.0172 11.3371C12.5368 9.65632 11.8664 8.31515 10.2407 7.73789C9.33564 7.41531 8.38026 7.26237 7.35788 7.26237ZM61.3935 14.3423C61.0583 14.3423 60.6895 14.3763 60.3207 14.4442C58.3095 14.8178 56.7172 16.4815 56.1809 18.7906L56.1306 18.9772V18.9943H60.79C61.5442 18.9943 62.4996 18.9264 63.3879 18.5359C64.0583 18.2303 64.5108 17.6361 64.5946 16.957C64.6952 16.2778 64.4102 15.6327 63.8571 15.1743C63.17 14.631 62.332 14.3423 61.3935 14.3423ZM76.2264 14.3254C74.9191 14.3254 73.6956 14.8346 72.757 15.7854C71.986 16.5664 71.4663 17.5342 71.1479 18.7397L71.0976 18.9434H76.3605C77.0644 18.9434 77.7516 18.7905 78.3717 18.5019C78.9248 18.2472 79.2767 17.8567 79.4443 17.3643C79.7962 16.2947 79.2768 15.2251 78.1539 14.7327C77.5505 14.4611 77.5337 14.3254 76.2264 14.3254Z\" fill=\"#171719\" />\n"});

const mobileLogo = createSvgComponent({"meta":{"src":"/_astro/mobile-logo.DfPBgfEx.svg","width":70,"height":30,"format":"svg"},"attributes":{"width":"70","height":"30","viewBox":"0 0 70 30","fill":"none"},"children":"\n<path d=\"M39.3591 11.2727C39.3591 11.2727 39.3451 19.0825 39.3591 20.1579C39.3731 20.7521 39.4149 21.3746 39.5266 21.9688C39.6802 22.8036 39.9876 23.596 40.5602 24.2044L40.6883 24.3459H37.5712V22.5066C37.5294 22.549 37.5015 22.5915 37.4736 22.6198C35.9931 24.1619 33.5627 25.1805 31.4956 24.2326C30.476 23.7657 29.8895 22.7753 29.6939 21.7001C29.4704 20.4833 29.4565 19.2382 29.4565 18.0356C29.4565 17.7101 29.4005 15.8709 29.3307 15.2767C29.205 14.357 28.9257 13.2393 28.2693 12.6309L28.1576 12.532C28.1618 12.5306 29.0113 12.2624 29.7219 11.9801C30.7659 11.5571 31.241 11.2746 31.2442 11.2727C31.2442 11.2727 31.2442 17.5965 31.2442 18.0073C31.2442 19.0826 31.2164 20.2003 31.4678 21.2473C31.6493 21.9972 32.0264 22.8178 32.7248 23.1857C33.4371 23.5677 34.2751 23.5393 35.0433 23.3837C35.8673 23.2139 36.6495 22.7612 37.4037 21.9831L37.5573 21.8274C37.5578 21.8094 37.6687 17.3953 37.4736 15.588C37.3758 14.6117 37.1243 13.31 36.384 12.6309L36.2723 12.532C36.2723 12.532 37.1243 12.2631 37.8367 11.9801C38.8842 11.5557 39.3591 11.2727 39.3591 11.2727ZM22.0121 11.2868C23.73 11.301 25.4201 11.9943 26.6491 13.2394C27.8922 14.4986 28.5765 15.8144 28.5766 17.9365C28.5766 20.0588 27.5569 22.0679 25.8669 23.3129C25.4619 23.6101 25.0289 23.8648 24.568 24.077C23.0037 24.7703 21.1181 24.7419 19.5538 24.0911C17.0956 23.0865 15.4476 20.6106 15.4476 17.9365C15.4476 16.5925 15.8386 15.305 16.5789 14.2015C17.4588 12.7725 18.8415 11.8103 20.5874 11.4283C21.0483 11.3293 21.5232 11.2868 21.998 11.2868H22.0121ZM46.6918 13.0554C48.7868 11.0888 52.1528 10.537 54.4713 12.447C55.6166 13.3808 56.1893 14.8947 56.1893 16.3661V16.6067H46.6219C46.4404 18.3469 46.7755 19.6768 47.6973 20.7946C49.8342 23.3837 54.1222 23.0725 56.1195 20.4551C56.7061 19.6911 56.9295 18.8279 57.0831 17.7526C57.3765 15.7436 57.9072 14.3854 58.829 13.395C59.9743 12.1358 61.5945 11.4141 63.2705 11.2868C64.7091 11.1736 66.2875 11.6831 67.2931 12.6735C68.2987 13.6638 68.6757 14.9655 68.6478 16.352V16.5925H59.0804V16.7623C59.0525 17.1018 59.0386 17.4415 59.0526 17.7669C59.1224 19.1817 59.695 20.455 60.6727 21.3322C62.9493 23.3978 66.6367 22.7613 68.5501 20.5258C68.8015 20.2287 69.0389 19.9174 69.2624 19.6203H69.2344L69.8909 18.6865C69.8909 18.6865 70.1702 16.8331 69.835 19.111C69.4998 21.3888 67.8098 23.3838 65.7147 24.1761C62.3208 25.4494 58.5637 23.5817 57.4184 20.1295L57.2927 19.7617L57.167 20.1295C56.9715 20.6813 56.734 21.1908 56.4546 21.6577C54.5411 24.7844 50.0997 25.4635 47.2225 23.3413C43.9682 20.936 43.7587 15.8143 46.6918 13.0554ZM40.7138 24.3741L40.6883 24.3459H40.7418L40.7138 24.3741ZM7.02551 5.40112C8.35233 5.42942 9.39981 5.58509 10.3356 5.92464C10.8943 6.13687 11.5787 6.4481 12.0257 7.09893C12.7519 8.16006 12.6821 9.4193 11.858 10.3814C11.5228 10.7776 10.0423 12.0368 10.0423 12.0368L10.2798 12.1216L10.2937 12.1499C12.6681 13.013 14.1067 14.6683 14.5536 17.0452C15.0285 19.5212 14.0508 21.7 11.8719 23.03C10.5032 23.8647 8.9669 24.3034 7.30485 24.3459C6.76014 24.36 0 24.36 0 24.36L0.223554 23.9779C1.18725 22.3792 1.28502 20.5541 1.31295 18.9695C1.34089 16.2389 1.32692 13.5506 1.31295 10.8058C1.29899 9.10803 1.08945 7.83459 0.656476 6.68857C0.628343 6.58913 0.069835 5.40112 0.069835 5.40112H7.02551ZM43.3675 10.4521H45.4766V11.1029H43.3675V19.7617C43.4374 21.4454 44.038 23.412 45.5324 24.1478L45.8956 24.3459H45.3509C44.443 24.3459 43.2977 24.0769 42.6692 23.3129C42.1385 22.6763 41.8312 21.8839 41.7055 20.9077C41.6078 20.1013 41.5518 19.2949 41.5518 18.545V11.0746H39.7361C39.7361 11.0746 40.9513 10.4096 41.929 9.47583C43.002 8.44532 43.3659 7.38665 43.3675 7.3819V10.4521ZM23.9954 13.3383C22.4172 11.8103 19.7215 11.5416 18.4086 13.5789C17.5427 14.923 17.3052 16.4652 17.6823 18.2621C18.1572 20.4975 19.1768 22.1103 20.8249 23.1715C22.6685 24.3599 24.973 23.7515 25.9088 21.7566C26.2859 20.9502 26.4675 20.073 26.4815 18.8421V18.828C26.3977 16.734 25.5318 14.838 23.9954 13.3383ZM9.3999 12.4753C9.3999 12.4753 8.64557 13.0271 8.51987 13.112L7.68185 13.7487C6.13153 14.9654 5.01423 16.2813 4.27398 17.7669C3.32424 19.6628 3.31027 21.6293 4.20415 23.6242L4.24602 23.7092V23.695H6.52262C6.95559 23.695 7.45849 23.6384 8.07303 23.5111C10.0144 23.1432 11.2993 22.0254 11.8999 20.2003C12.4446 18.5591 12.3888 16.9178 11.7463 15.3191C11.2715 14.159 10.5312 13.2252 9.53957 12.5461L9.3999 12.4753ZM6.13157 6.05189C5.72652 6.05189 5.30746 6.08027 4.88845 6.13687C3.82699 6.29251 3.21252 6.92922 3.11475 8.00448L3.12866 8.03267C3.05883 8.79664 2.16509 20.1142 2.13706 20.4833L2.30455 20.073C3.53365 17.0736 5.0841 14.923 7.65402 12.6451C7.94734 12.3763 8.49202 11.8103 8.81326 11.4566C9.44176 10.7351 9.80486 10.1125 10.0144 9.44751C10.4473 8.04685 9.88867 6.92921 8.53392 6.44816C7.7797 6.17934 6.98355 6.05189 6.13157 6.05189ZM51.1612 11.9518C50.8819 11.9518 50.5746 11.9802 50.2673 12.0368C48.5912 12.348 47.2644 13.7345 46.8174 15.6587L46.7755 15.8143V15.8285H50.6583C51.2868 15.8285 52.083 15.7719 52.8232 15.4465C53.3819 15.1918 53.759 14.6966 53.8289 14.1307C53.9127 13.5648 53.6752 13.0271 53.2143 12.6451C52.6416 12.1924 51.9433 11.9518 51.1612 11.9518ZM63.522 11.9377C62.4326 11.9377 61.413 12.3621 60.6308 13.1544C59.9883 13.8052 59.5553 14.6118 59.2899 15.6163L59.248 15.7861H63.6337C64.2203 15.7861 64.793 15.6587 65.3098 15.4182C65.7707 15.2059 66.0639 14.8805 66.2036 14.4702C66.4969 13.5789 66.064 12.6875 65.1282 12.2772C64.6254 12.0508 64.6114 11.9377 63.522 11.9377Z\" fill=\"#171719\" />\n"});

const closeMenuIcon = createSvgComponent({"meta":{"src":"/_astro/close.CZJpojzU.svg","width":36,"height":36,"format":"svg"},"attributes":{"width":"36","height":"36","viewBox":"0 0 36 36","fill":"none"},"children":"\n<g clip-path=\"url(#clip0_2_9325)\">\n<path d=\"M23.9962 12.0452C24.2305 12.2794 24.2309 12.6596 23.9968 12.894L18.8489 18.0419L23.9956 23.1887C24.23 23.423 24.2294 23.8031 23.9951 24.0374C23.7607 24.2716 23.3811 24.2717 23.1469 24.0374L18.0001 18.8907L12.8527 24.038C12.6184 24.2723 12.2383 24.2718 12.004 24.0374C11.7698 23.8031 11.7697 23.4235 12.004 23.1892L17.1513 18.0419L12.0028 12.8934C11.7687 12.6591 11.7687 12.2795 12.0028 12.0452C12.2371 11.8109 12.6173 11.8104 12.8516 12.0446L18.0001 17.1931L23.148 12.0452C23.3823 11.8111 23.762 11.8111 23.9962 12.0452Z\" fill=\"#171719\" />\n</g>\n<defs>\n<clipPath id=\"clip0_2_9325\">\n<rect width=\"20\" height=\"20\" fill=\"white\" transform=\"translate(8 8)\" />\n</clipPath>\n</defs>\n"});

const arrowDown = createSvgComponent({"meta":{"src":"/_astro/dropdown-arrow.C6Vc68ws.svg","width":16,"height":20,"format":"svg"},"attributes":{"width":"16","height":"20","viewBox":"0 0 16 20","fill":"none"},"children":"\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M1.75209 13.7594C1.54944 13.572 1.54944 13.2681 1.75209 13.0806L7.63317 7.64061C7.83582 7.45316 8.16438 7.45316 8.36703 7.64061L14.2481 13.0806C14.4508 13.2681 14.4508 13.572 14.2481 13.7594C14.0455 13.9469 13.7169 13.9469 13.5142 13.7594L8.0001 8.65885L2.48595 13.7594C2.2833 13.9469 1.95474 13.9469 1.75209 13.7594Z\" fill=\"#171719\" />\n"});

const navMenu = createSvgComponent({"meta":{"src":"/_astro/toggle-nav.Dyx3lBre.svg","width":18,"height":14,"format":"svg"},"attributes":{"width":"18","height":"14","viewBox":"0 0 18 14","fill":"none"},"children":"\n<path d=\"M16.8794 12.2402C17.2107 12.2402 17.479 12.5087 17.4792 12.84C17.4792 13.1714 17.2108 13.4406 16.8794 13.4406L8.31982 13.4406C7.98845 13.4406 7.71924 13.1714 7.71924 12.84C7.71936 12.5087 7.98853 12.2402 8.31982 12.2402L16.8794 12.2402ZM16.8794 6.43945C17.2107 6.43945 17.479 6.70796 17.4792 7.03923C17.4792 7.3706 17.2108 7.63981 16.8794 7.63981L1.1193 7.63981C0.788032 7.63969 0.519531 7.37052 0.519531 7.03923C0.519653 6.70803 0.788107 6.43957 1.1193 6.43945L16.8794 6.43945ZM16.8794 0.599609C17.2107 0.599609 17.479 0.868114 17.4792 1.19938C17.4792 1.53075 17.2108 1.79997 16.8794 1.79997L1.1193 1.79997C0.788032 1.79985 0.519531 1.53068 0.519531 1.19938C0.519653 0.868186 0.788107 0.599727 1.1193 0.599609L16.8794 0.599609Z\" fill=\"#171719\" />\n"});

const links = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Inspiration", href: "/inspiration" },
  {
    name: "Learn More",
    dropdown: [
      { name: "About Us", href: "/about-us" },
      { name: "Our Jewellers", href: "/our-jewellers" },
      { name: "Our Technology", href: "/our-technology" },
      { name: "Blog", href: "/blog" }
    ]
  },
  { name: "For Jewellers", href: "/for-jewellers" }
];
const menuVariants = {
  hidden: { clipPath: "circle(0% at 100% 0%)", opacity: 0 },
  visible: {
    clipPath: "circle(150% at 50% 50%)",
    opacity: 1,
    transition: { type: "spring", stiffness: 30, restDelta: 2 }
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)",
    opacity: 0,
    transition: { duration: 0.4 }
  }
};
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return /* @__PURE__ */ jsxs("header", { className: "bg-white md:pt-[12px] lg:px-[48px] pt-[8px] px-[12px] md:px-[24px] relative z-50", children: [
    /* @__PURE__ */ jsxs("nav", { className: "max-w-[1504px] bg-secondary md:py-5 py-[11px] pl-[16px] pr-[17px] md:px-8 md:rounded-3xl rounded-[16px] flex justify-between items-center mx-auto", children: [
      /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: logo.src,
          alt: "Boutee logo",
          className: "h-auto w-[70px] md:h-full md:w-full"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex gap-8", children: [
        /* @__PURE__ */ jsx("div", { className: "flex gap-8 items-center", children: links.map(
          (link, idx) => link.dropdown ? /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
            /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-1 cursor-pointer font-figtree text-textPrimary", children: [
              link.name,
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: arrowDown.src,
                  alt: "arrow",
                  className: "transition-transform duration-300 rotate-180 group-hover:rotate-0"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute -left-8 mt-2 w-40 bg-white border border-[#F0F1F5] rounded-2xl p-2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all", children: link.dropdown.map((sublink, sidx) => /* @__PURE__ */ jsx(
              "a",
              {
                href: sublink.href,
                className: "py-2 hover:bg-secondary w-full text-center rounded-sm text-base font-figtree text-textPrimary",
                children: sublink.name
              },
              sidx
            )) })
          ] }, idx) : /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              className: "text-base font-figtree text-textPrimary hover:border-b border-[#2C2C30] transition-all duration-150",
              children: link.name
            },
            idx
          )
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("button", { className: "font-figtree text-textPrimary px-2 py-1 border border-[#2C2C30] rounded-[12px] cursor-pointer w-[76px] text-[16px] leading-[20px] h-[36px]", children: "Log in" }),
          /* @__PURE__ */ jsx("button", { className: "font-figtree w-[87px] h-[36px] rounded-[12px] bg-btnPrimary text-white cursor-pointer", children: "Sign up" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsx("button", { onClick: () => setIsOpen(true), className: "focus:outline-none cursor-pointer", children: /* @__PURE__ */ jsx("img", { src: navMenu.src, alt: "menu" }) }) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 0.4 },
          exit: { opacity: 0 },
          className: "fixed inset-0 bg-black z-40",
          onClick: () => setIsOpen(false)
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          variants: menuVariants,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          className: "fixed inset-0 z-50 flex flex-col justify-between bg-secondary rounded-2xl m-3 sm:m-4 pt-2 pl-3 pr-2 pb-8 ",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsx("img", { src: mobileLogo.src, alt: "Boutee logo" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsOpen(false),
                  className: "focus:outline-none cursor-pointer",
                  children: /* @__PURE__ */ jsx("img", { src: closeMenuIcon.src, alt: "close " })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              motion.div,
              {
                variants: listVariants,
                initial: "hidden",
                animate: "visible",
                className: "flex flex-col items-center gap-4 text-lg font-figtree py-10 text-textPrimary",
                children: links.map(
                  (link, idx) => link.dropdown ? link.dropdown.map((sublink, sidx) => /* @__PURE__ */ jsx(
                    motion.a,
                    {
                      href: sublink.href,
                      variants: itemVariants,
                      className: "w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary ",
                      children: sublink.name
                    },
                    sidx
                  )) : /* @__PURE__ */ jsx(
                    motion.a,
                    {
                      href: link.href,
                      variants: itemVariants,
                      className: "w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary ",
                      children: link.name
                    },
                    idx
                  )
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-3 px-6", children: [
              /* @__PURE__ */ jsx("button", { className: "border border-[#2C2C30] rounded-xl py-3.5 px-6 w-full font-figtree font-medium text-base leading-5", children: "Log in" }),
              /* @__PURE__ */ jsx("button", { className: "rounded-xl py-3.5 px-6 bg-btnPrimary text-white w-full font-figtree font-medium text-base leading-5", children: "Sign up" })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav> ${renderComponent($$result, "NavbarMenu", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/common/NavMenu", "client:component-export": "default" })} </nav>`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/common/Navbar.astro", void 0);

const facebook = createSvgComponent({"meta":{"src":"/_astro/facebook-icon.TRYLHbSe.svg","width":36,"height":36,"format":"svg"},"attributes":{"width":"36","height":"36","viewBox":"0 0 36 36","fill":"none"},"children":"\n<path d=\"M0 12C0 5.37258 5.37258 0 12 0H24C30.6274 0 36 5.37258 36 12V24C36 30.6274 30.6274 36 24 36H12C5.37258 36 0 30.6274 0 24V12Z\" fill=\"#E3E4E8\" />\n<path d=\"M26.3334 18.2534C26.3334 13.6229 22.6025 9.86914 18.0001 9.86914C13.3977 9.86914 9.66675 13.6229 9.66675 18.2534C9.66675 22.4381 12.7141 25.9068 16.698 26.5358V20.677H14.5821V18.2534H16.698V16.4062C16.698 14.3049 17.9422 13.1442 19.8456 13.1442C20.7574 13.1442 21.711 13.308 21.711 13.308V15.3713H20.6602C19.6251 15.3713 19.3022 16.0177 19.3022 16.6807V18.2534H21.6133L21.2439 20.677H19.3022V26.5358C23.2861 25.9068 26.3334 22.4383 26.3334 18.2534Z\" fill=\"#171719\" />\n"});

const instagram = createSvgComponent({"meta":{"src":"/_astro/instagram-icon.BdIKU6KP.svg","width":36,"height":36,"format":"svg"},"attributes":{"width":"36","height":"36","viewBox":"0 0 36 36","fill":"none"},"children":"\n<path d=\"M0 12C0 5.37258 5.37258 0 12 0H24C30.6274 0 36 5.37258 36 12V24C36 30.6274 30.6274 36 24 36H12C5.37258 36 0 30.6274 0 24V12Z\" fill=\"#E3E4E8\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M21.3333 10.7021L14.6667 10.7021C12.3655 10.7021 10.5 12.5676 10.5 14.8688L10.5 21.5355C10.5 23.8366 12.3655 25.7021 14.6667 25.7021H21.3333C23.6345 25.7021 25.5 23.8366 25.5 21.5355V14.8688C25.5 12.5676 23.6345 10.7021 21.3333 10.7021ZM24.0417 21.5355C24.0371 23.0293 22.8272 24.2392 21.3333 24.2438H14.6667C13.1728 24.2392 11.9629 23.0293 11.9583 21.5355L11.9583 14.8688C11.9629 13.3749 13.1728 12.1651 14.6667 12.1605L21.3333 12.1605C22.8272 12.1651 24.0371 13.3749 24.0417 14.8688V21.5355ZM21.9583 15.0771C22.4186 15.0771 22.7917 14.704 22.7917 14.2438C22.7917 13.7836 22.4186 13.4105 21.9583 13.4105C21.4981 13.4105 21.125 13.7836 21.125 14.2438C21.125 14.704 21.4981 15.0771 21.9583 15.0771ZM18 14.4521C15.9289 14.4521 14.25 16.1311 14.25 18.2021C14.25 20.2732 15.9289 21.9521 18 21.9521C20.0711 21.9521 21.75 20.2732 21.75 18.2021C21.7522 17.2069 21.3578 16.2518 20.6541 15.548C19.9503 14.8443 18.9952 14.4499 18 14.4521ZM15.7083 18.2021C15.7083 19.4678 16.7343 20.4938 18 20.4938C19.2657 20.4938 20.2917 19.4678 20.2917 18.2021C20.2917 16.9365 19.2657 15.9105 18 15.9105C16.7343 15.9105 15.7083 16.9365 15.7083 18.2021Z\" fill=\"#171719\" />\n"});

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="bg-secondary px-6 lg:py-[80px] py-[40px] lg:p-20"> <div class="max-w-screen-2xl mx-auto"> <div class="flex flex-col md:gap-[80px] gap-[40px]"> <div class="flex flex-col md:flex-row gap-12 md:gap-8 md:justify-between"> <div class="flex flex-col gap-[56px] md:justify-between"> <div class="flex flex-col gap-4"> <a href="/">${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "icon", "class": "" })}</a> <p class="font-figtree font-normal text-[14px] leading-4.5 md:w-2/3">
Boutee gives you access to the best independent jewellers from
            around Britain, all in one place.
</p> </div> <div class="flex gap-2 flex-items-end"> <a href="https://instagram.com" aria-label="Boutee on Facebook" target="_blank"> ${renderComponent($$result, "Image", $$Image, { "src": facebook, "alt": "boutee facebook", "class": "cursor-pointer" })}</a> <a href="https://instagram.com" aria-label="Boutee on Instagram" target="_blank"> ${renderComponent($$result, "Image", $$Image, { "src": instagram, "alt": "boutee instagram", "class": "cursor-pointer" })}</a> </div> </div> <nav class="flex gap-6 md:gap-8" aria-label="Footer Navigation"> <ul class="flex flex-col md:w-[180px]"> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/how-it-works" class="hover:border-b border-[#2C2C30] transition-all duration-200">How It Works</a> </li> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/inspiration" class="hover:border-b border-[#2C2C30] transition-all duration-200">Inspiration</a> </li> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/our-technology" class="hover:border-b border-[#2C2C30] transition-all duration-200">Our Technology</a> </li> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/our-jewellers" class="hover:border-b border-[#2C2C30] transition-all duration-200">Our Jewellers</a> </li> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/contact-us" class="hover:border-b border-[#2C2C30] transition-all duration-200">Contact</a> </li> </ul> <ul class="flex flex-col md:w-28"> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/for-jewellers" class="hover:border-b border-[#2C2C30] transition-all duration-200">For Jewellers</a> </li> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/about-us" class="hover:border-b border-[#2C2C30] transition-all duration-200">About Us</a> </li> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/faq" class="hover:border-b border-[#2C2C30] transition-all duration-200">FAQs</a> </li> <li class="font-figtree font-normal text-base leading-5 text-textPrimary p-2 cursor-pointer"> <a href="/blog" class="hover:border-b border-[#2C2C30] transition-all duration-200">Blog</a> </li> </ul> </nav> </div> <div class="border-t border-[#A9A9B7]"> <div class="pt-[34px] flex flex-col-reverse md:flex-row gap-5 justify-between"> <p class="font-normal font-figtree leading-3.5 text-text-secondary text-[12px] text-textSecondary">
© ${(/* @__PURE__ */ new Date()).getFullYear()} Boutee.
</p> <div class="flex gap-6"> <a href="/privacy-policy" class="font-normal text-textSecondary font-figtree text-sm text-text-secondary underline underline-offset-3 leading-4.5">Privacy Policy</a> <a href="/" class="font-normal text-textSecondary font-figtree text-sm text-text-secondary underline underline-offset-3 leading-4.5">Terms of Service</a> </div> </div> </div> </div> </div> </footer>`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/components/common/Footer.astro", void 0);

const $$Astro$1 = createAstro();
const $$VisualEditing = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$VisualEditing;
  const { enabled, zIndex } = Astro2.props;
  return renderTemplate`${enabled ? renderTemplate`${renderComponent($$result, "VisualEditingComponent", null, { "client:only": "react", "zIndex": zIndex, "client:component-hydration": "only", "client:component-path": "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/node_modules/@sanity/astro/dist/visual-editing/visual-editing-component", "client:component-export": "VisualEditingComponent" })}` : null}`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/node_modules/@sanity/astro/dist/visual-editing/visual-editing.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Boutee - Home", description = "Find your perfect handcrafted ring by connecting directly with independent UK jewellers. Boutee helps you define your style, match with makers, and bring your ideas to life." } = Astro2.props;
  const visualEditingEnabled = undefined                                                     == "true";
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/Logo.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${renderHead()}</head> <body class="flex flex-col min-h-screen scroll-smooth"> <!-- Header --> ${renderComponent($$result, "Navbar", $$Navbar, {})} <!-- Page Content --> <main class="flex-1"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "VisualEditing", $$VisualEditing, { "enabled": visualEditingEnabled })} </main> <!-- Footer --> ${renderComponent($$result, "Footer", $$Footer, {})} <!-- AOS init --> ${renderScript($$result, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} </body> </html> ${renderScript($$result, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts")}`;
}, "C:/Users/LAKHAN SINGH/OneDrive/Desktop/boutee/src/layouts/Layout.astro", void 0);

export { $$Layout as $, arrowDown as a, createSvgComponent as c };
