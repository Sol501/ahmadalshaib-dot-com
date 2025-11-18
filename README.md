# ahmadalshaib.com – Personal Portfolio

Personal portfolio website of **Ahmad Alshaib** – built with Angular, zoneless change detection, and pre-rendered (SSG) for fast, SEO-friendly delivery. It showcases my experience, projects, and skills as a software engineer.

> Live: **<https://ahmadalshaib.com>** or **<https://alshaib.dev>**

---

## Features

- 🧑‍💻 **Developer-focused portfolio**
  - Single-page layout with clearly structured sections: Hero, About, Experience, Projects, Skills, Contact.
- ⚡ **Fast and responsive**
  - Zoneless Angular + Signals-friendly patterns.
  - Pre-rendered HTML (SSG) deployed as static assets on a CDN.
- 🌐 **SEO-aware**
  - Static HTML for the main route and SEO-friendly structure for my name and role.
- 🧱 **Modular architecture**
  - Feature-first structure, standalone components, and shared SCSS tokens.
- 📬 **Contact section**
  - Reactive form with validation plus a Cloudflare Pages Function that emails via Resend.

---

## Tech Stack

- **Framework:** Angular (standalone, zoneless)
- **Rendering:** Static Site Generation (pre-rendered HTML)
- **Language:** TypeScript (strict)
- **Styling:** SCSS
- **Tooling:** Angular CLI, ESLint, Prettier
- **Hosting:** Cloudflare Pages (static assets + Pages Functions for contact)

---

## Project Structure

The app uses a **feature-first** structure with a single main route and modular sections.

```text
src/
├─ main.ts
├─ index.html
├─ styles/
│  ├─ styles.scss
│  └─ _variables.scss
├─ assets/
│  ├─ images/
│  ├─ data/
│  └─ icons/
└─ app/
   ├─ app.config.ts
   ├─ app.routes.ts
   ├─ core/
   │  ├─ layout/ (layout shell)
   │  ├─ components/ (header, footer)
   │  ├─ services/ (seo.service.ts)
   │  └─ models/ (project, experience, skills, nav)
   ├─ shared/
   │  ├─ components/ (section heading, back-to-top)
   │  ├─ directives/ (scroll anchor)
   │  └─ pipes/ (list join)
   └─ features/
      ├─ home/
      └─ sections/
         ├─ hero/
         ├─ about/
         ├─ experience/
         ├─ projects/
         ├─ skills/
         └─ contact/
functions/
└─ api/
   └─ contact.ts (Cloudflare Pages Function -> Resend email)
assets/
└─ images/ (profile photo, favicon)
```

- `core/` – Application-wide layout and singletons (layout, services, models).
- `shared/` – Reusable UI components, directives, and pipes.
- `features/home` – Root page that composes all sections.
- `features/sections/*` – Each section of the single-page layout as its own standalone component.

---

## Rendering Model

- From the user perspective: **single-page site** with scroll navigation.
- Technical model:
  - Angular CSR at runtime.
  - Static Site Generation (SSG/prerender) at build time for improved SEO and first paint.
- No runtime SSR / Node.js server required; the site is static assets + a Pages Function for contact.

---

## Getting Started

### Prerequisites

- **Node.js**: v20+
- **npm**: v9+

(Optional for local tooling):

```bash
npm install -g @angular/cli
```

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/ahmadalshaib-dot-com.git
cd ahmadalshaib-dot-com
npm install
```

### Running the app locally

```bash
npm start
# or
ng serve
```

The app will be available at:

```text
http://localhost:4200
```

### Build for production (static)

```bash
npm run build
# or
ng build --configuration production
```

The build generates pre-rendered HTML for the main route in `dist/ahmadalshaib-dot-com/browser`. Deploy the static output plus the `functions/` directory for Cloudflare Pages.

---

## Scripts

From `package.json`:

```jsonc
{
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "ng test"
}
```

---

## SEO & Contact

- SEO is handled via the `SeoService` (`core/services/seo.service.ts`), called from `HomeComponent`.
- Contact form posts to a Cloudflare Pages Function (`functions/api/contact.ts`) that relays mail via Resend.
  - Required env vars on Cloudflare Pages: `RESEND_API_KEY`, `CONTACT_TO`
  - Optional: `CONTACT_FROM` (defaults to `noreply@ahmadalshaib.com`)

---

## Deployment

1. Build the app (and prerender if configured):

```bash
npm run build:prod
# or
npm run build
```

1. Deploy the contents of `dist/ahmadalshaib-dot-com/` to your hosting provider, for example:
   - Cloudflare Pages
   - GitHub Pages
   - Any static file hosting / CDN

Ensure:

- SPA fallback is configured correctly (requests route to `index.html` when necessary).
- HTTPS is enabled.

---

## License

- **Code:**  
  The source code in this repository is licensed under the **MIT License**.  
  See [`LICENSE`](./LICENSE) for details.

- **Content:**  
  All non-code content (text, images, CV, and other personal materials) is **not** open source and may not be reused without my explicit permission.  
  See [`CONTENT-LICENSE.md`](./CONTENT-LICENSE.md) for details.
