# ahmadalshaib.com

The source for [Ahmad Alshaib’s portfolio](https://ahmadalshaib.com/), focused on web engineering, production Angular modernization, performance, testing, and maintainability.

The site is a single-route Angular 22 application. Angular prerenders `/` to static HTML at build time, then hydrates it in the browser. The production deployment contains static files only—there is no runtime Node server, contact API, or Cloudflare Pages Function.

## Stack

- Angular 22 with standalone components, strict TypeScript, zoneless rendering, and hydration
- Angular SSR tooling used at build time with `RenderMode.Prerender`
- SCSS with a light/dark theme and reduced-motion support
- Vitest and jsdom for unit tests
- Angular ESLint and Prettier for code quality
- Cloudflare Pages for static delivery

## Requirements

- Node.js 24.19.0 LTS (pinned in `.node-version` and `package.json`)
- npm 11.17.0 (pinned through the `packageManager` field)

Use the pinned versions. Running the project on an older system Node installation is unsupported by Angular 22.

## Local development

```bash
npm ci
npm start
```

The development server is available at <http://localhost:4200/>.

## Quality checks

```bash
npm run lint
npm run format:check
npm run test:ci
npm run build
```

`npm run build` produces a static prerendered site. The root document is written to:

```text
dist/ahmadalshaib-dot-com/browser/index.html
```

That file must contain the portfolio content and authoritative metadata before JavaScript runs. The build also copies `robots.txt`, `sitemap.xml`, `404.html`, the social card, favicons, and Cloudflare `_headers` into the browser output.

## Rendering and content model

- One eager root route composes the portfolio sections.
- `/` uses `RenderMode.Prerender`; `outputMode` is `static`.
- Browser-only behavior is isolated from server-side rendering.
- Portfolio copy and verified facts live in one typed content contract.
- Theme, mobile-menu, and active-section behavior use signals because they are mutable UI state.
- Contact actions are native `mailto:`, `tel:`, LinkedIn, and GitHub links. No personal message is submitted to this repository or a backend.

## Resume asset contract

The site never creates or ships a placeholder resume. The supplied resume is stored at:

```text
public/Ahmad-Alshaib-Web-Engineer-Resume.pdf
```

It is served from `/Ahmad-Alshaib-Web-Engineer-Resume.pdf`. `public/_headers` supplies a matching `Content-Disposition` download filename.

## Cloudflare Pages

Use repository-based deployment with these settings:

```text
Build command: npm run build
Build output directory: dist/ahmadalshaib-dot-com/browser
Node.js version: 24.19.0 (read from .node-version)
```

The deployment is static. Do not configure a Functions directory or server command. `public/_headers` defines security headers, caching for generated bundles and public assets, and the resume download header. Existing Cloudflare Web Analytics remains a Cloudflare-level integration; this repository adds no tracker.

The top-level `404.html` is the not-found response for unknown paths. Do not add a blanket SPA fallback: it would turn missing URLs into soft-200 application shells.

### Manual domain redirects

Cloudflare Pages `_redirects` cannot perform domain-level redirects. Configure both redirects in Cloudflare Redirect Rules and preserve the request path and query string:

- `www.ahmadalshaib.com/*` → `https://ahmadalshaib.com/<same-path>` with status 301
- `alshaib.dev/*` → `https://ahmadalshaib.com/<same-path>` with status 301

Replace the existing broken `alshaib.dev → .../$1` rule; `$1` is currently being sent literally instead of preserving the path.

## License

- **Code:** MIT; see [LICENSE](./LICENSE).
- **Content:** Portfolio text, images, resume, and other personal materials are not open source; see [CONTENT-LICENSE.md](./CONTENT-LICENSE.md).
