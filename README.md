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

# Sanity + Astro Setup — Handover Document

## 1. Project Overview

This project is a **Boutee website** built with:

- **Sanity CMS** – A content management system where all posts, authors, categories, and images are managed.
- **Astro** – The website framework that fetches content from Sanity and displays it on the website.

**Key Benefits for You:**

- You can add, edit, or delete blog posts through Sanity Studio.
- Visual Editing lets you preview changes on the website before publishing.
- The system is structured so content updates automatically appear on the website after publishing.

---

## 2. Content Management (Sanity Studio)

Sanity Studio is the backend interface for managing content.

- Accessible via a web browser (usually at `/studio` when running the site locally, or a hosted link after deployment).

**Key content types:**

- **Posts** – Blog articles
- **Authors** – Information about writers
- **Categories** – Grouping posts by topics
- **Images & Text Blocks** – For visual and formatted content

**Workflow:**

1. Log into Sanity Studio.
2. Click “New Post” or select an existing one.
3. Fill in title, content, category, images, and author.
4. Preview your changes.
5. Publish when ready – the website updates automatically after sometime.

---

## 3. Website Integration

- The website automatically fetches content from Sanity in real-time.
- Every blog post is displayed dynamically on the site without needing manual updates.
- Images, text formatting, and links are rendered exactly as designed.

**Visual Editing:**

- This feature allows you to see how a draft post looks on the actual site before publishing.
- Changes in Sanity Studio reflect live on the website preview.

---

## 4. How the System Works

1. **Content Creation:** You create content in Sanity Studio.
2. **Data Fetching:** The website reads the content from Sanity automatically.
3. **Rendering:** The website displays the content in the correct format with images, text, and categories.
4. **Publishing:** Once published, content is live on the website.

> This process ensures a smooth, no-code workflow for managing your blog.

---

## 5. Deployment & Hosting

- The website is deployed (Vercel).
- Sanity’s content updates automatically reflect on the live site.

---

## 6. ✅Best Practices & Recommendations

- **Drafts:** Always preview your post before publishing.
- **Images:** Use properly sized images for faster page load.
- **Categories & Tags:** Keep them consistent for better organization.
- **Content Updates:** The system is designed for easy updates – regular publishing will keep your blog fresh.

---

## 7. 📚Support & References

- [Sanity + Astro Blog Guide](https://www.sanity.io/docs/developer-guides/sanity-astro-blog) – Guide for step by step setup
- [Sanity Studio Documentation](https://www.sanity.io/docs) – Guide for content management
- [Astro Documentation](https://docs.astro.build) – Guide for website behavior
