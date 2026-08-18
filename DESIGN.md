---
name: Ghamrah
description: A wedding planner and vendor marketplace for Arabic-speaking couples and vendors
colors:
  primary: "#8B1A3A"
  secondary: "#9A7060"
  placeholder: "#c9b1a7"
  border: "#E8D8CF"
  icon-background: "#f2e7e2"
  neutral-bg: "#FDF8F5"
  neutral-bg-disabled: "#eae2de"
  neutral-text-disabled: "#9d938e"
  ink-black: "#000000"
  surface-white: "#FFFFFF"
  gray-100: "#F0F0F0"
  gray-200: "#E0E0E0"
  gray-300: "#C0C0C0"
  gray-400: "#A0A0A0"
  gray-500: "#808080"
  gray-600: "#606060"
  gray-700: "#404040"
  gray-800: "#202020"
  success-500: "#27D027"
  success-600: "#1DA01D"
  danger-500: "#D02727"
  danger-600: "#A01D1D"
  info-500: "#277FD0"
  info-600: "#1D61A0"
  warning-500: "#D46E00"
  warning-600: "#A35200"
typography:
  display:
    fontFamily: "Aboreto-Regular"
    fontSize: 32
    fontWeight: "400"
    lineHeight: 1.15
  accent:
    fontFamily: "SendFlowers-Regular"
    fontSize: 24
    fontWeight: "400"
    lineHeight: 1.2
  body:
    fontFamily: "System"
    fontSize: 16
    fontWeight: "400"
    lineHeight: 1.4
  label:
    fontFamily: "System"
    fontSize: 14
    fontWeight: "600"
    lineHeight: 1.3
rounded:
  xxs: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  xxl: "32px"
  xxxl: "36px"
  full: "9999px"
spacing:
  xxs: "10px"
  xs: "12px"
  sm: "14px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "14px 24px"
  button-plain:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    padding: "14px 24px"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    padding: "0px 5px"
  input-bordered:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "0px 14px"
  card-listing:
    backgroundColor: "{colors.surface-white}"
    rounded: "{rounded.xl}"
---

# Design System: Ghamrah

## 1. Overview

**Creative North Star: "The Wedding Ledger"**

Ghamrah reads like a well-kept planning book: wine-red ink on cream pages, unhurried and considered, with one
elegant script flourish reserved for the moments that matter most. The system is warm and personal rather than
transactional — every screen is designed to lower the anxiety of a high-stakes, emotional task, not add to it.
Confidence comes from restraint: generous whitespace, a single confident accent color used deliberately, and soft,
ambient depth rather than decoration. This system explicitly rejects the sterile, corporate booking-tool look and
the wedding-industry clichés of pastel gradients, script-everywhere typography, and cluttered Pinterest-board
density — warmth lives in the palette and in a few deliberate typographic gestures, not in ornament.

**Key Characteristics:**
- One confident wine-red primary against a warm cream base — restrained, not saturated everywhere
- A ceremonial display face (Aboreto) for structure, a script accent (SendFlowers) used sparingly for warmth
- Soft, rounded, ambient-shadow surfaces — nothing sharp, nothing harsh
- RTL-first: every component mirrors correctly for Arabic before English is checked

## 2. Colors

Deep wine and warm cream carry the system; semantic colors (success, danger, info, warning) exist purely for
state and feedback, never for decoration.

### Primary
- **Wine** (#8B1A3A): The confident, singular accent — primary buttons, active states, links, icon accents,
  input text. Used deliberately rather than everywhere; its rarity against the cream base is what gives it weight.

### Secondary
- **Mocha** (#9A7060): Supporting warmth — secondary text (location tags, feature tags), muted icon fills,
  secondary emphasis where wine would be too strong.

### Neutral
- **Warm Cream** (#FDF8F5): The base surface everywhere — screens, backgrounds. Never pure white; carries the
  system's warmth even at rest.
- **Surface White** (#FFFFFF): Raised surfaces — cards, bordered inputs — to separate from the cream base without
  a hard color jump.
- **Border Blush** (#E8D8CF): Hairline borders and dividers — input underlines, bordered containers.
- **Icon Background** (#f2e7e2): Soft fill behind icon badges and empty-state icon wells.
- **Placeholder Rose** (#c9b1a7): Placeholder text in inputs — warm-toned, not a flat gray, so empty fields still
  feel on-brand.
- **Disabled Cream** (#eae2de) / **Disabled Text** (#9d938e): Disabled surface and text — muted, still warm.
- **Gray scale** (#F0F0F0 → #202020): Reserved for chrome that must stay strictly neutral (rare; most neutral needs
  route through the warm-tinted tokens above instead).

### Semantic
- **Success Green** (#27D027 / #1DA01D): Confirmative states — completed checklist items, success toasts,
  confirmative button variants.
- **Danger Red** (#D02727 / #A01D1D): Destructive actions, form errors, the "promoted" listing label badge.
- **Info Blue** (#277FD0 / #1D61A0): Informative states, neutral notices.
- **Warning Orange** (#D46E00 / #A35200): Caution states.

### Named Rules
**The One Ink Rule.** Wine is the only color allowed to carry emphasis or call-to-action weight. Semantic colors
signal state and state alone — they never substitute for the primary accent, and the primary accent never
substitutes for a semantic meaning (don't use wine for a destructive action).

## 3. Typography

**Display Font:** Aboreto-Regular (with serif fallback)
**Body Font:** System default (San Francisco / Roboto, per platform)
**Accent Font:** SendFlowers-Regular (script, with System fallback)

**Character:** A formal, slightly ceremonial display face paired with an unadorned system body creates contrast
between moments of significance and everyday reading. The script accent is a rare flourish, not a voice used in
running text.

### Hierarchy
- **Display** (Aboreto-Regular, 32px, line-height 1.15): Screen titles and moments the app wants to feel
  ceremonial — the planner hub, key milestones.
- **Accent** (SendFlowers-Regular, 24px, line-height 1.2): A sparing decorative flourish — a welcome message, a
  celebratory moment. Never for body copy, labels, or anything that must stay legible at a glance.
- **Body** (System, 16px / 400, line-height 1.4): Default reading text, descriptions, form values.
- **Label** (System, 14px / 600): Field labels, tags, buttons at medium size.
- **Small** (System, 12px): Secondary metadata — city tags, prices, timestamps.

### Named Rules
**The Sparing Script Rule.** SendFlowers appears at most once per screen, reserved for a single emotional
highlight. If more than one element on a screen uses it, the flourish has become noise.

## 4. Elevation

Depth is ambient, not structural: a single soft, diffused shadow lifts cards and floating elements off the cream
base for visual separation. Shadow intensity does not change with interaction state — pressed and focused states
communicate through color and scale, not a heavier shadow.

### Shadow Vocabulary
- **Ambient Low** (`0px 0px 5px rgba(154, 112, 96, 0.3)`): Default lift for small floating elements.
- **Ambient High** (`0px 0px 10px rgba(154, 112, 96, 0.3)`): Listing cards and any surface that needs to read as
  clearly raised above the base.

### Named Rules
**The Ambient-Only Rule.** Shadows are warm-tinted (mocha, not black) and diffused in every direction — never a
hard drop shadow, never used to imply directional light or interactivity.

## 5. Components

### Buttons
- **Shape:** Softly rounded (12px at medium size, matching `rounded.md`); fully round (`rounded.full`) available
  for pill/icon buttons.
- **Primary:** Wine background, white bold text, centered. Confirmative/destructive/informative variants swap to
  a light semantic-tinted background with matching text color rather than changing shape.
- **Outlined:** Transparent background, 1.5px wine border, wine text — used for secondary actions alongside a
  primary button.
- **Plain:** No border or background, wine text only — lowest-emphasis action, often paired with underline for
  links.
- **Inactive:** Gray border/background and muted gray text — the only state that fully desaturates out of the
  wine/cream system.
- **Sizes:** SM (12px text, 8px radius), MD (16px text, 12px radius), LG (20px text, 12px radius) — padding scales
  with size, radius stays close to `rounded.sm`–`rounded.md`.

### Cards (Listings)
- **Corner Style:** Generously rounded (`rounded.xl`, 24px).
- **Background:** Surface White, to lift cleanly off the cream page background.
- **Shadow Strategy:** Ambient High (see Elevation) — the card's entire separation from the page comes from this
  single soft shadow, not a border.
- **Border:** None on the card itself; a thin border only appears on the bordered input variant, not on cards.
- **Internal Padding:** 15px around the info block below the image; the image itself is full-bleed to the card's
  rounded top corners.
- **Signature detail — Promoted Label:** A pill badge (`rounded.full`) in Danger Red with white bold text, floated
  top-left over the listing image with its own soft white glow shadow, marking promoted/featured listings.

### Inputs / Fields
Two interchangeable designs, chosen per context rather than mixed on the same screen:
- **Underline design:** Transparent background, 2px bottom border in Border Blush (wine on focus), wine input
  text. Reads as lighter-weight — used where forms should feel unobtrusive.
- **Bordered design:** White background, full 1px border in Border Blush, `rounded.md` corners. Reads as more
  contained — used where fields need to stand out as discrete, tappable targets.
- **Placeholder:** Always Placeholder Rose, never flat gray, so empty inputs still carry the palette.
- **Error:** Danger Red, small text below the field.
- **RTL:** Input text alignment flips to right automatically when Arabic content is detected — this must hold for
  every new input variant, not just the two above.

### Tags (Location / Price / Features)
- **Style:** Small, no-background or lightly filled pills in Mocha text — used inline within listing cards to
  surface city, price range, and features without competing with the card's title.

## 6. Do's and Don'ts

### Do:
- **Do** keep Wine (#8B1A3A) as the only color that carries call-to-action or emphasis weight; everything else is
  neutral or semantic.
- **Do** use the warm cream base (#FDF8F5) for every screen background — never pure white as the page background.
- **Do** keep shadows soft, warm-tinted, and ambient (`rgba(154, 112, 96, 0.3)`) — a consistent lift, not a
  state-driven effect.
- **Do** verify RTL mirroring (text alignment, icon direction, layout flow) on every new component before shipping
  it, per PRODUCT.md's accessibility principle that RTL is not an afterthought.
- **Do** reserve SendFlowers script type for one sparing emotional highlight per screen, at most.

### Don't:
- **Don't** default to a cold, corporate booking-tool layout — no sterile SaaS card grids, no generic e-commerce
  checkout patterns that make a wedding feel like a transaction (per PRODUCT.md's anti-reference).
- **Don't** reach for wedding-industry clichés: script fonts throughout, pastel gradients, stock bridal imagery, or
  cluttered Pinterest-board density (per PRODUCT.md's anti-reference).
- **Don't** use a hard black drop shadow or increase shadow intensity to signal a pressed/focused state — depth in
  this system stays ambient and constant.
- **Don't** use semantic colors (green/red/blue/orange) for anything but state and feedback; they never substitute
  for the wine primary as a call-to-action color.
- **Don't** mix the underline and bordered input designs on the same screen or form.
