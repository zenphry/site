# Zenphry Ghost migration

This directory contains the Ghost replacement for the legacy React and Cloudflare site. Keep the legacy site live until the Ghost cutover is approved.

Ghost Admin is where Zenphry manages pages, articles, images, SEO metadata, members, and newsletters. The custom theme provides the shared header, footer, contact and booking integrations, and design system. It is a native Ghost layout, not a pixel-for-pixel copy of the React application.

## Theme editing

The Zenphry theme is a custom, licence-free Ghost theme. It provides the shared
header and footer, a responsive menu, and a visitor-selected light or dark
colour mode. The browser uses the operating-system preference on the first
visit and remembers a visitor's explicit selection when browser storage is
available.

### Reusable page components

Marketing pages remain ordinary Ghost content. The theme progressively presents
their existing headings and lists as reusable components, while preserving a
readable heading-and-list document when JavaScript is unavailable. Use an H2 to
start a section. Put a plain unordered list under it for a two-column checklist,
use list items beginning with a bold title for feature cards, and use an ordered
list for numbered steps. On the Financial Execution service, each execution
pillar is an H3 followed by its unordered list. Repeated groups of at least three
H3 headings with an unordered list become numbered cards on other pages too.
Keep each group’s description, list labels, and timeline in paragraphs between
its H3 and the next heading. On FAQ pages, use an H2 for a
category and an H3 followed by its answer for each question. Keep a final
call-to-action link in its own paragraph after the last answer.

The services overview starts with an introductory paragraph. Each service then
uses an H3 title, a duration paragraph, an audience paragraph, a description
paragraph, and a link-only CTA paragraph. Keep this order when adding or editing
services so the theme can render aligned cards.

Run `npx tsx ghost/scripts/verify-page-components.ts` against the local Ghost
preview after changing reusable component rules or imported marketing content.
It checks every imported route, the blog collection, and any published author,
post, or topic URLs found in Ghost's sitemap at desktop and mobile widths in
both colour modes. It writes evidence to
`ghost/.local/page-component-audit.json`. If no posts or topics are published,
the report records those content types as untested. The component contract and
each route's expected presentation live in
`ghost/content/page-component-expectations.json`.

The homepage title and its main content are native Ghost page content. The
importer converts the homepage into editable semantic content: an
introduction, proof statements, six linked challenge cards, five framework
phases, and eight service-timing entries. Its
service cards read the title and description from the eight existing service
pages, so staff update those pages in Ghost Admin rather than editing theme
code. In **Settings → Design & branding**, the theme's custom settings let an
administrator update the hero eyebrow, supporting text and CTA labels; services
and insights labels; diagnostic section eyebrow, heading, copy and CTA; and the
footer CTA.

The homepage model is an initial, editable Ghost seed. After import, staff make
routine homepage changes in Ghost Admin. Re-run `npm run ghost:export` only
when preparing a fresh migration from the legacy site, then import only into a
fresh target as described below. Back up a local instance before updating its
imported home page for visual verification.

To apply a new content model to an older **disposable local** instance, stop
Compose first, then copy its `ghost/.local/` directory to a safe backup
location. Remove only that disposable local runtime directory, then follow the
fresh-instance import steps. An export is not an in-place updater for content
that staff have already authored. Do not use this reset process for a shared,
staging, or production Ghost instance.

For local semantic-content repairs, run `SEMANTIC_BASELINE_EXPORT=/path/to/prior-export.json npm run ghost:apply-local-semantic-content -- <slug...>`. The command accepts only loopback Admin URLs, compares the current page's visible text and intended links with the prior export, uses `updated_at` concurrency protection, and writes a mode-600 backup under `ghost/.local/backups` before each update. It refuses a page when those checks differ; investigate rather than bypassing the guard. The guard does not detect formatting-only edits.

For local migration verification only, `npx tsx ghost/scripts/apply-local-home-content.ts`
updates the existing `home` page from the current export through the Ghost Admin
API. It writes a mode-600 backup under ignored `ghost/.local/backups/`, uses the
page `updated_at` value to prevent an unintended overwrite, and accepts only a
loopback Admin URL. Do not run it against shared staging or production content.

The homepage uses Ghost's native member signup form for articles and updates.
The repository contains no verified playbook file or member automation, so the
form does not promise a downloadable playbook.

## Build and validate the migration

Run these commands from `site/` whenever legacy copy changes:

```bash
npm run ghost:export
npm run ghost:verify
npm run ghost:verify-export
npm run ghost:gscan
npm run ghost:package-theme
```

The exporter starts the legacy site on an isolated loopback port. It produces `ghost/content/export/zenphry-content.json`, with native editable Ghost rich text for headings, paragraphs, links, and lists. It captures accordion answers and the five framework phases as regular content. The theme archive is `ghost/content/export/zenphry-ghost-theme.zip`. Both generated artifacts are ignored by Git.

## Fresh-instance import

Import only into a fresh Ghost instance. A second import creates duplicate pages. Before importing, remove Ghost's default sample About page, sample post, cover image, and demo social links. Confirm there are no existing Zenphry pages in Ghost Admin. If an import was already made, reset the disposable target instance or remove the imported pages before attempting it again.

1. In Ghost Admin, open **Settings → Advanced → Import/Export**, choose the Import tab, and upload `zenphry-content.json`.
2. Open **Settings → Advanced → Labs**, then upload `routes.yaml` and `redirects.yaml` in the Routes and Redirects settings.
3. Open **Settings → Site → Theme**, choose **Change theme**, then **Upload theme**. Upload `zenphry-ghost-theme.zip` and activate it.
4. In **Settings → Site → Design & branding**, set the publication name, logo, icon, accent color, site description, and homepage SEO title and description. The exported home page does not replace the site-level homepage SEO settings.
5. Set the real primary navigation to Services, Solutions, About, Insights (`/resources/blog/`), and Contact.
6. Review every page, redirects, native contact form, booking page, member signup, and article publishing in the local preview. A remote staging instance is optional; the selected plan is one production instance after the local, restore, and cutover checks pass.

See the [Ghost import guide](https://ghost.org/help/imports/), [theme installation guide](https://ghost.org/help/installing-a-theme/), and [routing documentation](https://docs.ghost.org/themes/routing/) for the current Admin workflow.

## Local Ghost

`compose.dev.yaml` binds the local Caddy proxy to `127.0.0.1:2368` and Mailpit to `127.0.0.1:8025`. It routes the native contact form to the local contact service and all other requests to Ghost. Mailpit keeps local test mail inside Docker; it has no external SMTP credentials or delivery. Contact submissions use the fixed test recipient `contact@zenphry.test` locally. Local data lives under ignored `ghost/.local/` directories.

```bash
npm run ghost:prepare-local
docker compose -f ghost/compose.dev.yaml up -d
# Open http://127.0.0.1:2368/ghost/ and complete first-owner setup.
# Open http://127.0.0.1:8025/ to inspect test mail.
npm run ghost:verify-local
docker compose -f ghost/compose.dev.yaml down
```

The native contact form does not add an enquirer to Ghost Members or the newsletter. Test it from `http://127.0.0.1:2368/contact/`, then confirm the accepted message in Mailpit. Production requires SMTP configuration for the contact service before public delivery is enabled.

## Local publication branding

The local preview has Zenphry's publication logo, square Z icon, gold accent,
Open Graph card, X card, Central Time (`America/Chicago`), and the confirmed
`@zenphry` X profile. The local branding command clears LinkedIn and Facebook.
Leave Facebook unconfigured until Zenphry confirms the profile URL.

The source assets live in `ghost/branding/`. They are generated from the same
vector logo used by the approved theme, so applying the publication logo does
not alter the visible header design. To recreate and apply the local-only
branding after starting Compose:

```bash
npm run ghost:generate-brand-assets
npm run ghost:apply-local-branding
npm run ghost:verify-local-branding
```

The apply command reads ignored local administrator credentials from
`ghost/.local/admin-login.json`, accepts loopback Ghost URLs only, and changes
only the publication branding, social metadata, X handle, LinkedIn and Facebook
fields, and timezone. It must not be used against staging or production.

To reset a disposable local instance, stop Compose and remove only `ghost/.local/`. Never point this Compose file at production data.

## Launch handoff

The local preview is not a production deployment. The
[infrastructure runbook](../../infra/zcp/ansible/README.md#ghost-website) is
the canonical source for production readiness and cutover. Local branding
commands do not change live settings, DNS, customer systems, or infrastructure.

## Continuous integration

`.github/workflows/ghost.yml` runs for pull requests that change the Ghost migration, package metadata, or its workflow. It installs and tests the contact service, then uses a clean dependency install, installs Chromium, exports and verifies content, runs GScan, packages the theme, and uploads the JSON and ZIP as short-lived artifacts. Existing Cloudflare workflows remain unchanged.
