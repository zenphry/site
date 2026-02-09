# Service Pages Content Update

## Overview

This change replaces the stub/placeholder service pages with full content based on the Zenphry service documentation. The site's service model shifted from a tier-based structure (Foundation, Growth, Enterprise) to a domain-based structure organized by area of expertise.

## Branch

`feature/service-pages-content` (off `main`)

## Changes

### New Service Pages (full content)

All pages follow the same component pattern as the existing Restructuring Diagnostic page: Hero section, "What This Service Is", "Who This Service Is For" (where applicable), numbered pillars with bullet items, and a final CTA.

| File                      | Service Name                        | Pillars | Notes                                                                           |
| ------------------------- | ----------------------------------- | ------- | ------------------------------------------------------------------------------- |
| `services.technology.tsx` | Technology & Systems Restructuring  | 6       | Includes "Technologies Reviewed" and "Cloud Platforms" tags on relevant pillars |
| `services.foundation.tsx` | Operational Restructuring           | 6       | Renamed from "Foundation Restructure"                                           |
| `services.enterprise.tsx` | Organizational & Team Restructuring | 6       | Renamed from "Enterprise Transformation"                                        |
| `services.financial.tsx`  | Financial Execution Discipline      | 6       | **New file**. Includes "What This Service Is Not" disclaimer section            |
| `services.growth.tsx`     | Growth & Scale Readiness            | 7       | Renamed from "Growth Restructure"                                               |

### Supporting File Updates

| File                             | What Changed                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| `app/routes.ts`                  | Added `/services/financial` route                                                         |
| `app/routes/services._index.tsx` | Updated service array with new names, descriptions, and ordering                          |
| `app/components/footer.tsx`      | Updated service links to reflect new names; added Technology, Financial, and Growth links |
| `app/root.tsx`                   | Updated JSON-LD structured data (`hasOfferCatalog`) with new service names                |
| `app/routes/_index.tsx`          | Updated homepage "Our Services" cards to reflect new service names                        |

### Unchanged Pages

| File                      | Reason                                                       |
| ------------------------- | ------------------------------------------------------------ |
| `services.diagnostic.tsx` | Already fully built; no new content provided                 |
| `services.advisory.tsx`   | Still a stub; no content was provided in the source document |

## Service Page Structure

Each service page follows this consistent layout:

1. **Hero** - Title, subtitle, primary CTA button
2. **What This Service Is** - 1-2 paragraph intro
3. **What This Service Is Not** (Financial only) - Explicit disclaimers with X icons
4. **Who This Service Is For** - Grid of cards with check icons
5. **What Zenphry Actually Does** - Numbered pillars, each with a title and bullet items in card grid
6. **Final CTA** - Primary-colored banner with "Book a Strategy Call" button

## URL Routing

Existing URLs are preserved. The new financial service is at `/services/financial`.

| URL                    | Service                             |
| ---------------------- | ----------------------------------- |
| `/services/diagnostic` | Restructuring Diagnostic            |
| `/services/foundation` | Operational Restructuring           |
| `/services/enterprise` | Organizational & Team Restructuring |
| `/services/technology` | Technology & Systems Restructuring  |
| `/services/financial`  | Financial Execution Discipline      |
| `/services/growth`     | Growth & Scale Readiness            |
| `/services/advisory`   | Advisory & Ongoing Optimization     |

## Source

Content sourced from the Zenphry service documentation provided in `tmp/command.log`.
