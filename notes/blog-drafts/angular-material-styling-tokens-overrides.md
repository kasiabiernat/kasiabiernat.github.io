# Draft notes (work in progress)

**Working title:** The right way to style Angular Material: design tokens, component tokens, and safe overrides

## Scope + assumptions (pin this early to avoid version confusion)

- This article targets the **modern theming APIs introduced in Angular Material v19+** (the official docs you’ll see today are for **Angular Material 21.x**).
- The examples assume you’re using **Sass** (Angular Material theming + overrides APIs are Sass-first).
- Goal: show upgrade-safe customization **within the supported theming/overrides surface**, not “turn Material into a different design system.”

## Primary references (use these exact URLs in the article)

- Angular Material getting started: `https://material.angular.dev/guide/getting-started`
- Angular Material theming: `https://material.angular.dev/guide/theming`
- Angular Material theming your components: `https://material.angular.dev/guide/theming-your-components`
- Material 3 design tokens (conceptual model): `https://m3.material.io/foundations/design-tokens/overview`

## Core points to cover (high level)

- Angular Material is designed to implement **Material Design**. If you fundamentally dislike Material Design components/interaction patterns, you’ll likely be happier choosing a different component library (or a headless library) instead of fighting Material with CSS.
- Styling Angular Material “the right way” is mostly about **choosing the correct level of customization**:
  - **Theme (color + typography + density) is the primary source of truth**: most visual styling should come from the Material theme you define and apply.
  - **System-level design tokens get their values from the theme** (via Material’s theming APIs and the generated token values).
  - **Component-level tokens are implemented internally by components** (derived from system tokens + component defaults).
  - **Overrides API** exposes a supported subset of component-level tokens for safe, explicit customization.
  - **Do not** override component tokens directly (brittle) and **definitely do not** touch internal CSS classes/DOM structure (not supported, not future-proof).

> **Important doc-aligned rule:** treat `--mat-*` as **read-only** in raw CSS. If you need to *change* values that Angular Material components consume, do it through the Sass **`overrides` APIs** (system + component overrides), not by manually redefining CSS variables.

## Series outline (Option B — 3 posts, scannable / SEO-friendly)

> Goal: split the current single-article plan into 3 posts **without losing any content**. Every section and bullet from the original outline is preserved below, just regrouped.

### Post 1 — Angular Material theming (v21) in plain English: theme (colors, typography, density) → design tokens

- **Primary references**
  - `https://material.angular.dev/guide/getting-started`
  - `https://material.angular.dev/guide/theming`
  - `https://m3.material.io/foundations/design-tokens/overview`
- **Intro (hook + promise)**
  - Personal hook: “I needed to tweak *one* tiny thing in a Material component…”
  - Material Design changed a lot over recent years; briefly contrast M2 vs M3 to set context (but keep the article scoped to v21).
  - Thesis: Angular Material implements Material Design 3 (that is Google’s open-source design system) and is **token-driven**; the safest styling strategy is token-first + overrides, not deep CSS selectors.
  - What the reader will learn (scoped to this post):
    - how Angular Material theming generates token-backed styles from your theme configuration
    - what design tokens are (and why they’re a contract)
    - where theming code lives and what “applying a theme” means in practice
    - how system tokens relate to your theme (high-level; deep dive in Post 2)
    - where component tokens + overrides fit (high-level; deep dive in Post 3)
- **Prerequisites**
  - Basic Angular Material usage
  - Basic Sass knowledge (`@use`, mixins, maps)
  - High-level familiarity with theming concepts (no deep M3 spec knowledge required)
- **0) Setup + where theming code lives (so the rest of the article “sticks”)**
  - Reference: `https://material.angular.dev/guide/getting-started`
  - Establish the baseline:
    - where to put theming code (global styles entry point)
    - what “applying a theme” means in practice (including component theme styles)
  - Make the “light/dark actually works” dependency explicit (easy to miss):
    - `mat.theme(...)` emits colors using CSS `light-dark(...)`
    - the app only switches between light/dark values when you set `color-scheme`
      - simplest: `html { color-scheme: light dark; }` (uses OS preference)
      - or force a mode: `color-scheme: light` / `color-scheme: dark`
    - if you don’t set `color-scheme`, the **light** colors will always be used
- **1) What “the right way” to style Angular Material means (short framing)**
  - Define “right way”:
    - upgrade-safe
    - intention-revealing (expresses *design intent*, not DOM trivia)
    - maintainable for teams
  - The correct “layering” (broadest → most targeted):
    - **Theme (color palettes + typography + density + theme mixins)**: sets the design baseline and feeds system tokens.
    - **System-level tokens**: represent global design decisions produced from the theme.
    - **Component-level tokens (internal)**: how each component consumes system tokens; these are implementation details unless explicitly exposed.
    - **Overrides API**: the supported way to override *exposed* component token values for specific, intentional deviations.
    - **Overriding internals (avoid)**: deep selectors / internal classes / DOM assumptions — fragile and upgrade-hostile.
  - Set expectations:
    - Material is opinionated by design
    - customizing ≠ replacing the design system
    - component APIs/inputs are usually for behavior/structure (and occasional variants), not a general-purpose styling surface
- **2) Design tokens: the mental model (Material 3)**
  - Reference: `https://m3.material.io/foundations/design-tokens/overview`
  - Tokens as a **contract**: design ↔ engineering
  - Tokens are not “random CSS variables”:
    - a token name encodes **intent/role**
  - Token categories you’ll reference:
    - color, typography, shape, elevation
  - Two important layers:
    - system/global tokens: product language
    - component tokens: component consumes the system in a specific way
  - Why this matters:
    - system token changes can cascade across many components
    - component token changes are narrower and more intentional
- **3) Angular Material theming model (color palettes, typography, density): what you define, what gets generated, and how tokens fit**
  - Reference: `https://material.angular.dev/guide/theming`
  - Clarify the contract:
    - what you configure at the theme level (color/typography/density as **product-wide decisions**)
    - what Angular Material generates from it (system token values + component styling)
  - Include the key knob the docs expose (so readers don’t invent their own API):
    - `theme-type`: `color-scheme` (default), `light`, or `dark`
  - Make the dependency chain explicit (and honest):
    - **theme decisions → system token values → component styling**
    - component-level tokens exist, but many are **implementation details** unless surfaced via a supported API
  - Practical guidance:
    - when to change theme config (global design shift)
    - when not to (one-off exceptions)
- **4) How tokens are represented in Angular Material (system vs component tokens)**
  - Reference: `https://material.angular.dev/guide/theming`
  - Clarify the mapping:
    - theme/system tokens define your “global” design decisions
    - component tokens define per-component styling values derived from the system + component defaults
  - What’s important for developers:
    - tokens evolve across versions
    - token-first styling tends to survive upgrades
  - Add a short “avoid confusion” box:
    - token *concept* (design intent) ≠ token *identifier* (CSS var name / Sass key)
    - not all internal tokens are stable/public—prefer the documented theming + overrides surfaces
  - Add an “accessibility + platform” box (doc-backed):
    - density below 0 can reduce accessibility
    - Angular Material provides `mat.strong-focus-indicators()` as an opt-in for stronger focus outlines
- **Post 1 ending**
  - Tease Post 2: “Now that you know what gets generated, let’s learn how to *choose* the right `--mat-sys-*` token by intent.”
  - Tease Post 3: “After that, we’ll cover component tokens and the Overrides API for safe, targeted deviations.”

### Post 2 — Angular Material system tokens explained: how to pick `--mat-sys-*` by intent

- **Primary references**
  - `https://m3.material.io/foundations/design-tokens/overview`
  - `https://m3.material.io/styles/color/roles`
  - (Optional pointer back to theming context): `https://material.angular.dev/guide/theming`
- **1) System tokens: tokens represent purpose (not “a random color”)**
  - Reference: `https://m3.material.io/styles/color/roles`
  - System tokens represent **semantic intent** / **purpose**:
    - you pick them based on *what the UI element means* (primary action, error state, surface background), not based on the underlying hex value
    - this is what helps the UI adapt to theme changes (light/dark and other schemes) when your theme supports them
  - Concrete examples (color roles + “on-*” pairs):
    - `--mat-sys-primary` / `--mat-sys-on-primary`
      - **primary** is the container/background color for a primary-emphasis element
      - **on-primary** is the text/icon color that is designed to be legible on top of `--mat-sys-primary`
    - `--mat-sys-secondary` / `--mat-sys-on-secondary`
    - `--mat-sys-tertiary` / `--mat-sys-on-tertiary`
    - `--mat-sys-error` / `--mat-sys-on-error`
  - **Do not publish an “exhaustive token list”** in the article body.
    - The supported/public token surface is best treated as **documented-by-example** and can evolve.
    - Instead: teach readers **how to find the right token** using the official “Theming your components” guide (it lists system tokens + shows what they’re used for).
  - A small, doc-aligned shortlist you can safely use as examples (and link readers to the full guide):
    - emphasis backgrounds: `--mat-sys-primary`, `--mat-sys-primary-container`
    - emphasis text/icons: `--mat-sys-on-primary`, `--mat-sys-on-primary-container`
    - surface backgrounds: `--mat-sys-surface`, `--mat-sys-surface-variant`, `--mat-sys-surface-container-highest`
    - surface text: `--mat-sys-on-surface`, `--mat-sys-on-surface-variant`
    - error: `--mat-sys-error`, `--mat-sys-error-container`, `--mat-sys-on-error`, `--mat-sys-on-error-container`
    - borders: `--mat-sys-outline`, `--mat-sys-outline-variant`
    - elevation: `--mat-sys-level1` … `--mat-sys-level5`
  - Typography tokens: text roles, not “font sizes”
    - examples of semantic roles:
      - `--mat-sys-body-large`, `--mat-sys-body-medium`, `--mat-sys-body-small`
      - `--mat-sys-title-large`, `--mat-sys-title-medium`, `--mat-sys-title-small`
      - `--mat-sys-label-large`, `--mat-sys-label-medium`, `--mat-sys-label-small`
      - `--mat-sys-headline-large`, `--mat-sys-headline-medium`, `--mat-sys-headline-small`
      - `--mat-sys-display-large`, `--mat-sys-display-medium`, `--mat-sys-display-small`
    - important detail worth mentioning:
      - typography roles have related subtokens (e.g. `--mat-sys-*-tracking` is shown in the official utility classes)
  - Common selection patterns (make these a “how to pick” cheat sheet)
    - if it’s a **background**, start from `surface/*container*/*variant*`
    - if it’s a **brand/action emphasis**, start from `primary/secondary/tertiary` (and pair with `on-*`)
    - if it’s **error state**, use `error/*container*` (and pair with `on-*`)
    - if it’s **text**, choose a typography role (body/title/label/headline/display) based on semantics
- **2) Styling custom components with Material tokens (don’t hardcode values)**
  - Reference: `https://material.angular.dev/guide/theming-your-components`
  - Usually, building an app using only Angular Material “building blocks” is not enough.
    - real products have domain-specific UI that Material doesn’t ship as ready-made components
    - teams end up building custom components for specific business needs
  - Recommendation: style your custom components using **Material token values** (system tokens) instead of hardcoding colors/typography/spacing.
    - this keeps custom components responsive to **theme changes**
    - it also makes them adapt to **dark/light** (and potentially **high-contrast**) with far less extra work—**as long as your theme is set up for those schemes**
  - A simple rule of thumb to include:
    - if you’d reach for a literal value (hex, px, font size), first ask: “is there a token for this design intent?”
  - Tie this to Angular Material guidance for component theming:
    - show how to theme *your own* components in a way that stays aligned with the Material theme
  - Add a simple “read vs write” rule:
    - **Read** tokens in component CSS (`color: var(--mat-sys-on-surface)`)
    - **Write/override** values via Sass overrides APIs (Post 3), not by setting `--mat-*` in raw CSS
- **Post 2 ending**
  - Tease Post 3: “Now that your theme and your custom components are token-driven, let’s cover safe exceptions: component tokens, overrides, and what not to touch.”

### Post 3 — Overrides done right: component tokens, Overrides API, and avoiding internals

- **Primary references**
  - `https://material.angular.dev/guide/theming`
  - (Optional pointer back to custom components): `https://material.angular.dev/guide/theming-your-components`
- **1) Component-level tokens in Angular Material: how they’re used (and how to think about them)**
  - A dependency chain concept (use a simple diagram later):
    - theme decisions → system token values → component styling (and internal component tokens)
  - When component token customization is appropriate:
    - you need a consistent “exception” for a component family
    - e.g. slightly different shape/typography for buttons while keeping system tokens stable
  - Risks of treating component tokens like internals:
    - token renames/removals can happen
    - direct overrides can silently stop applying after upgrades
- **2) The Overrides API: what it is and when to use it**
  - Reference: `https://material.angular.dev/guide/theming`
  - Overrides API as a supported escape hatch for **targeted deviations**
  - Distinguish the two override surfaces the docs describe:
    - **System token overrides** via `mat.theme-overrides(( ... ))`
      - and optionally via the `$overrides: (...)` parameter to `mat.theme(...)`
    - **Component token overrides** via per-component mixins like `mat.card-overrides(( ... ))`
  - Example scenarios (pick 2–3 later):
    - adjusting spacing/typography for one component
    - tweaking a specific state style (hover/focus) safely
    - aligning a component to a product spec exception without forking the entire theme
  - Guideline:
    - use overrides for exceptions, not as a default replacement for theming
  - Add at least one concrete “minimal example” placeholder:
    - where the overrides live (global theme stylesheet)
    - that overrides must come **after** the base theme styles
    - how you keep the override intention-revealing (comment why the exception exists)
- **3) Why the overrides mixin is better than overriding the component token directly**
  - Key claim (word it this way to stay accurate):
    - Overrides API is generally **more upgrade-safe and intention-revealing** than targeting internal component level tokens.
    - It may surface some breaking changes earlier (because you’re using a supported API).
  - Failure mode comparison:
    - direct component token override: can become a silent failure if the token changes
    - overrides mixin: changes surface earlier during build (you get notified)
  - Practical recommendation:
    - “If you want upgrade-safety, prefer the API that’s designed to be overridden.”
- **4) Overriding internals is dangerous (and not future-proof)**
  - What “overriding internals” means:
    - deep selectors, private DOM structure assumptions, targeting internal classes
  - Why it’s discouraged:
    - internals can change; selectors break
    - maintenance burden + version lock-in
  - Red flags checklist:
    - `::ng-deep` / extremely specific selectors
    - selectors that depend on exact internal DOM nesting
    - styling that only works after adding `!important` everywhere
  - If you must do it (rare):
    - isolate it, comment it, add visual regression coverage, plan removal
  - Add an explicit warning aligned to the theming docs:
    - Angular Material discourages overriding component CSS outside the theming APIs
    - component DOM structure + CSS classes are private implementation details
    - CSS variables used by Angular Material components should be defined through the `overrides` API rather than defined explicitly
- **5) Decision tree / checklist (reader takeaway)**
  - Step-by-step:
    - can I use a supported component API?
    - is this a global design decision? → theme config / system tokens
    - is this a component-family rule? → component-level styling surface (prefer supported APIs)
    - is this a one-off exception? → Overrides API
    - last resort: internals override (avoid)
  - Include “upgrade-safety” notes per choice
- **Post 3 conclusion (series conclusion)**
  - Reinforce: token-first + overrides is stable; internals override is brittle.
  - Encourage: treat tokens as design intent, not as “CSS variables with extra steps”.
- **Further reading (series-wide)**
  - Angular Material guides: `https://material.angular.dev/guides`
  - Material 3 design tokens overview: `https://m3.material.io/foundations/design-tokens/overview`
