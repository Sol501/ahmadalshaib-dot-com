# ahmadalshaib.com – Personal Portfolio

Personal portfolio website of **Ahmad Alshaib** – built with Angular, zoneless change detection, and pre-rendered (SSG) for fast, SEO-friendly delivery. It showcases my experience, projects, and skills as a software engineer.

> Live: _coming soon_ – will be hosted at **https://ahmadalshaib.com**

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
  - Feature-first structure, with each section implemented as a standalone component.
- 📬 **Contact section**
  - Reactive form with validation and links to my public profiles.

---

## Tech Stack

- **Framework:** Angular (standalone, zoneless)
- **Rendering:** Static Site Generation (pre-rendered HTML)
- **Language:** TypeScript (strict)
- **Styling:** SCSS
- **Tooling:** Angular CLI, ESLint, Prettier
- **Hosting:** Static hosting on a CDN (e.g. Cloudflare Pages)

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
   │  ├─ layout/
   │  │  ├─ main-layout.component.ts
   │  │  └─ main-layout.component.html
   │  ├─ components/
   │  │  ├─ header/
   │  │  └─ footer/
   │  ├─ services/
   │  │  ├─ seo.service.ts
   │  │  └─ analytics.service.ts
   │  ├─ guards/
   │  └─ models/
   │     ├─ project.model.ts
   │     └─ experience.model.ts
   ├─ shared/
   │  ├─ components/
   │  │  ├─ section-title/
   │  │  ├─ project-card/
   │  │  └─ skill-chip/
   │  ├─ pipes/
   │  └─ directives/
   └─ features/
      ├─ home/
      │  ├─ home.component.ts
      │  └─ home.component.html
      └─ sections/
         ├─ hero/
         │  ├─ hero-section.component.ts
         │  └─ hero-section.component.html
         ├─ about/
         │  ├─ about-section.component.ts
         │  └─ about-section.component.html
         ├─ experience/
         │  ├─ experience-section.component.ts
         │  └─ experience-section.component.html
         ├─ projects/
         │  ├─ projects-section.component.ts
         │  └─ projects-section.component.html
         ├─ skills/
         │  ├─ skills-section.component.ts
         │  └─ skills-section.component.html
         └─ contact/
            ├─ contact-section.component.ts
            └─ contact-section.component.html
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
- No runtime SSR / Node.js server required; the site can be deployed as static files.

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

If SSG/prerender is configured, the build step will generate pre-rendered HTML for the main route in the `dist/` folder. The output can be deployed as static assets.

---

## Scripts

Example npm scripts (adjust to match the actual `package.json`):

```jsonc
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "lint": "ng lint",
    "test": "ng test",
    "watch": "ng build --watch --configuration development"
  }
}
```

Run a script with:

```bash
npm run <script-name>
```

---

## SEO & Analytics

The project is structured to support:

- A central `SeoService` (`core/services/seo.service.ts`) for:
  - Page title
  - Meta description
  - Social / Open Graph tags (where applicable)
- Optional `AnalyticsService` for lightweight analytics integration.

These can be wired into `home` and section components as needed, while keeping the app SSG-friendly and not dependent on SSR.

---

## Deployment

1. Build the app (and prerender if configured):

```bash
npm run build:prod
# or
npm run build
```

2. Deploy the contents of `dist/ahmadalshaib-dot-com/` to your hosting provider, for example:
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
