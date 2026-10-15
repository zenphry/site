# Business Suite content

Source for `/solutions/business-suite/` and its app subpages on zenphry.com.

- `apps.mjs`: app names, descriptions, icons, features and FAQs for the nine
  app pages and the custom development page.
- `page.html`: the original body of the main Business Suite page. The live
  page has since been edited in Ghost.

Each subpage is a Ghost page with slug `suite-<path>`, routed in
`ghost/routes.yaml` to `/solutions/business-suite/<path>/`.
