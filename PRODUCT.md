# Product

## Register

product

## Platform

android

## Users

Two primary audiences, equally weighted. **Couples** planning their wedding: browsing and booking vendors, tracking
tasks on their checklist, saving favorites, and managing their overall wedding plan across a long, high-stakes,
emotionally invested timeline. **Vendors** (venues, photographers, and other wedding service providers) listing and
promoting their services, managing their presence in the catalog, and reaching engaged couples. Both audiences are
primarily Arabic-speaking, across 24 countries, using the app on mobile with RTL as a first-class layout direction,
not a translation afterthought.

## Product Purpose

Ghamrah unifies wedding vendor discovery and wedding planning into one app for Arabic-speaking markets, where these
have historically been separate, informal, or non-existent as a combined digital product. Couples get a single place
to find vendors and manage the plan; vendors get a single place to reach couples and manage their listing. Success
looks like couples completing their wedding plan (favorites, checklist, booked vendors) inside the app rather than
falling back to scattered spreadsheets, social media DMs, and word of mouth, and vendors treating their Ghamrah
listing as a primary channel for bookings.

## Positioning

The first unified planner and vendor marketplace built specifically for Arabic-speaking weddings — not a Western
wedding app translated after the fact, but one designed around this market's vendors, countries, and planning
conventions from the start.

## Brand Personality

Warm, elegant, trustworthy. The tone is personal and celebratory — this app is present for one of the most
emotionally significant events in someone's life — never transactional or clinical. Confidence should come through
restraint and craft (generous whitespace, considered photography treatment, calm typography) rather than
decoration. Voice is warm and reassuring, not salesy.

## Anti-references

Should not read as a cold or corporate booking tool — no sterile B2B SaaS layouts, no generic e-commerce checkout
patterns that make the experience feel transactional rather than personal. The existing wine/terracotta and cream
palette (`styles/Theme.ts`) is the anchor; keep the warmth in the palette and typography rather than reaching for
wedding-industry clichés (script fonts, pastel gradients, stock bridal imagery, cluttered Pinterest-board density).

## Design Principles

- **One consistent design language, not per-OS adaptation.** The app renders the same custom look on iOS and
  Android — closer to Airbnb's approach than to full per-OS adaptation. Material 3 is the baseline reference for
  conventions the custom design doesn't already dictate (e.g. system dialogs, pickers), not a rule to follow
  throughout.
- **Warmth through craft, not decoration.** Confidence and elegance come from restraint, whitespace, and considered
  typography — not embellishment or wedding-industry visual clichés.
- **RTL is not an afterthought.** Every layout, icon direction, and text alignment decision is designed for Arabic
  first, then verified in English — not the other way around.
- **Serve two primary audiences without diluting either.** Couple-facing and vendor-facing surfaces should each feel
  purpose-built for their job, even when they share the same design system.
- **Reduce a high-stakes, emotional task to something calm.** Wedding planning is stressful; the interface should
  lower cognitive load (clear hierarchy, low clutter) rather than add to it.

## Accessibility & Inclusion

Standard mobile accessibility as a baseline: comfortable touch targets, sufficient color contrast, and
screen-reader labels throughout. Full RTL polish is treated as first-class: mirroring, icon direction, and text
alignment must be correct in Arabic, not just functional. No additional WCAG level specified beyond this baseline.
