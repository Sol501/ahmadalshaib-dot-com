# ahmadalshaib.com – Personal Portfolio

Personal portfolio website of **Ahmad Alshaib** - built with Angular and focused on performance, clarity, and maintainability. It showcases my experience, projects, and skills as a software engineer.

> Live: _coming soon_ - will be hosted at **https://ahmadalshaib.com**

---

## Features

- 🧑‍💻 **Developer-focused portfolio**
  - Clear overview of experience, projects, and skills
- ⚡ **Fast and responsive**
  - Built with modern Angular and optimized for mobile and desktop
- 🌐 **SEO-friendly**
  - Route-based structure ready for meta tags and social sharing
- 🧱 **Feature-based architecture**
  - Scales cleanly as new sections and content are added
- 📬 **Contact section**
  - Simple way to reach out via form and social links

---

## Tech Stack

- **Framework:** Angular
- **Language:** TypeScript
- **Styling:** SCSS
- **Tooling:** ESLint, Prettier
- **Build:** Angular CLI
- **Hosting:** Static hosting on a CDN (e.g. Cloudflare Pages / similar)

---

## Project Structure

The app uses a **feature-first** structure with standalone components.

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
   │  ├─ services/
   │  ├─ guards/
   │  └─ models/
   ├─ shared/
   │  ├─ components/
   │  ├─ pipes/
   │  └─ directives/
   └─ features/
      ├─ home/
      ├─ about/
      ├─ experience/
      ├─ projects/
      ├─ skills/
      └─ contact/
```
