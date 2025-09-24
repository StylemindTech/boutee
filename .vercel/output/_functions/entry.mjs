import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cm0crw01.mjs';
import { manifest } from './manifest_DZp69wCV.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about-us.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/contact-us.astro.mjs');
const _page5 = () => import('./pages/faq.astro.mjs');
const _page6 = () => import('./pages/for-jewellers.astro.mjs');
const _page7 = () => import('./pages/how-it-works.astro.mjs');
const _page8 = () => import('./pages/inspiration.astro.mjs');
const _page9 = () => import('./pages/our-jewellers.astro.mjs');
const _page10 = () => import('./pages/our-technology.astro.mjs');
const _page11 = () => import('./pages/post/_slug_.astro.mjs');
const _page12 = () => import('./pages/post.astro.mjs');
const _page13 = () => import('./pages/privacy-policy.astro.mjs');
const _page14 = () => import('./pages/studio/_---params_.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about-us.astro", _page2],
    ["src/pages/blog.astro", _page3],
    ["src/pages/contact-us.astro", _page4],
    ["src/pages/faq.astro", _page5],
    ["src/pages/for-jewellers.astro", _page6],
    ["src/pages/how-it-works.astro", _page7],
    ["src/pages/inspiration.astro", _page8],
    ["src/pages/our-jewellers.astro", _page9],
    ["src/pages/our-technology.astro", _page10],
    ["src/pages/post/[slug].astro", _page11],
    ["src/pages/post.astro", _page12],
    ["src/pages/privacy-policy.astro", _page13],
    ["node_modules/@sanity/astro/dist/studio/studio-route.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "77af172b-2e7c-4ba9-914b-9b1d23edb8f1",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
