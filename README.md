# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---
---



# Sanity + Astro Setup 

This project uses **Sanity** as a headless CMS and **Astro** as the frontend framework.  
Content is managed in Sanity Studio, while Astro fetches and renders it on the site.  


---

## 📂 Project Structure

```
.
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── PortableText.astro
│   │   └── PortableTextImage.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── post/
│   │       └── [slug].astro
│   ├── sanity/
│   │   ├── lib/
│   │   │   ├── load-query.ts
│   │   │   └── url-for-image.ts
│   │   │  
│   │   └── schemaTypes/
│   │       ├── author.ts
│   │       ├── category.ts
│   │       ├── blockContent.ts
│   │       ├── post.ts
│   │       └── index.ts
│   └── env.d.ts
├── .env
├── astro.config.mjs
├── sanity.config.ts
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd <repo-folder>
npm install
```

### 2. Environment Variables
Create a `.env` file in the project root with the following:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
```

- `PUBLIC_` variables are safe for the client.  
- `SANITY_API_READ_TOKEN` is used **only for draft previews** (keep this secret).  

### 3. Start Development
```bash
npm run dev
```
Astro will run on [http://localhost:4321].  
Sanity Studio is usually available at [http://localhost:4321/studio].

---

## 📝 Sanity Integration

- **Schemas** are in `src/sanity/schemaTypes/`:
  - `post`, `author`, `category`, `blockContent`
- **Content fetching** uses `load-query.ts` (wrapper around GROQ queries).
- **Images** are handled with `url-for-image.ts` using `@sanity/image-url`.
- **Portable Text** is rendered with `astro-portabletext` and custom components.

Example GROQ query:
```groq
*[_type == "post" && slug.current == $slug][0]
```

---

## 🔍 Visual Editing / Preview

- Enabled with `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`
- Uses `VisualEditing` component in `Layout.astro`
- Draft content is shown with `perspective: "previewDrafts"`
- Overlays show which part of the UI maps to which Sanity document

---

## 🚀 Deployment

1. Deploy the Astro site (Vercel).
2. Add all required environment variables in your hosting dashboard.
3. In Sanity project settings, set up **CORS origins** to allow your frontend domain.


---

## ✅ Best Practices

- **Schemas**: Keep reusable fields in `blockContent`.
- **Tokens**: Use a **read-only Viewer token** for previews, not an editor/admin token.
- **Environments**:  
  - Development → `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=true`  
  - Production → `PUBLIC_SANITY_VISUAL_EDITING_ENABLED=false`  
- **Error handling**:  
  - Missing slug → return 404 page  
  - Missing image → fallback placeholder  
- **Security**: Never commit `.env` with private tokens.


---

## 📚 References

- [Sanity + Astro Blog Guide](https://www.sanity.io/docs/developer-guides/sanity-astro-blog)  
- [Astro Docs](https://docs.astro.build)  
- [Sanity Docs](https://www.sanity.io/docs)
