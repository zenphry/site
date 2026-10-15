# Government capability statement

Source for the `/government/` page and its downloadable PDF.

- `statement.cjs`: renders `zenphry-capability-statement.pdf` (one A4 page)
  with Playwright. Edit the company details here, run
  `node ghost/content/government/statement.cjs`, then upload the new PDF in
  Ghost and update the download link on the page.
- `zenphry-capability-statement.pdf`: the current published PDF.

Keep the UEI, CAGE code, NAICS codes and point of contact identical to the
SAM.gov registration.
