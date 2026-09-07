# AGENTS.md

## Purpose

You are working on a web project where visual design is treated as a first-class engineering concern.

The objective is to produce interfaces that feel **intentionally art-directed by a human designer**, rather than generated from generic AI/web-design conventions.

The design should have a recognizable point of view.

Do not optimize for "modern" by default.

Do not optimize for what is currently common in AI-generated websites.

Optimize for **clarity, character, composition, restraint, and intentionality**.

---

# 1. Core Design Philosophy

The following principles take priority over generic UI conventions.

### Design > decoration

Visual interest should primarily come from:

* typography
* composition
* hierarchy
* spacing
* proportion
* alignment
* imagery
* contrast
* repetition
* rhythm

Do not rely on:

* gradients
* glows
* shadows
* blur
* glass effects
* excessive animation
* decorative blobs
* abstract shapes

to make a page feel interesting.

If removing an effect makes the design worse, determine whether the underlying composition is actually strong enough.

---

### Every element needs a reason

Before adding a visual element, ask:

> What does this contribute?

If the answer is only:

> "It makes the page look cooler"

consider removing it.

Do not add decoration simply because an empty area exists.

Negative space is intentional design.

---

### Avoid design-by-component

Do not begin by thinking:

> "This section needs a card."

Instead think:

> "What is the best composition for presenting this information?"

Cards are one possible solution, not the default solution.

The same applies to:

* pills
* badges
* accordions
* carousels
* tabs
* floating buttons
* icon containers
* statistic cards
* feature grids

Do not introduce UI patterns simply because they are familiar.

---

# 2. Anti-Vibe-Code Rules

The following patterns should be treated as suspicious by default.

Avoid unless there is a strong, explicit reason:

* generic SaaS landing pages
* centered hero + CTA + three cards
* excessive rounded rectangles
* excessive border-radius
* glassmorphism
* glowing backgrounds
* purple/blue gradient backgrounds
* gradient text
* floating gradient blobs
* huge meaningless headlines
* excessive whitespace with no compositional purpose
* excessive drop shadows
* excessive pills
* "AI startup" aesthetics
* generic dashboard layouts
* card grids everywhere
* excessive icon usage
* decorative line-art illustrations
* meaningless statistics
* fake testimonials
* fake logos
* unnecessary badges
* unnecessary animations
* parallax for the sake of parallax
* cursor effects that don't improve interaction
* hover effects on everything
* excessive use of `backdrop-filter`
* excessive use of gradients
* default Tailwind-looking layouts
* default component-library aesthetics

### Specific rule

If a design could plausibly be described as:

> "A modern AI SaaS website"

without knowing what the company actually does, the design has probably failed.

---

# 3. Typography

Typography is one of the primary design tools.

Do not treat fonts as an afterthought.

Establish a deliberate typographic hierarchy before implementing the page.

Consider:

* display typeface
* body typeface
* utility/metadata typeface
* weight
* tracking
* line height
* measure
* capitalization
* line breaks
* text density

Distinctive typography is preferable to decorative graphics.

### Avoid

Do not automatically use:

* Inter
* Roboto
* Arial
* system-ui

unless there is a deliberate reason.

If using a common font, compensate through strong typographic composition.

### Typography should communicate hierarchy

Use differences in:

* scale
* weight
* width
* tracking
* case
* position
* density

before relying on colour or decorative containers.

---

# 4. Layout

Do not default to vertically stacked centered sections.

Use the layout to create personality.

Consider:

* asymmetric grids
* editorial layouts
* overlapping elements
* unexpected alignment
* strong margins
* dense information areas
* deliberately sparse areas
* full-bleed content
* edge alignment
* narrow text columns
* unconventional proportions

Asymmetry must be intentional, not random.

### Grid

Establish a consistent underlying grid.

Prefer systems such as:

* 8-column
* 12-column
* 16-column

depending on the project.

Elements should generally feel related to the grid even when they visually break it.

---

# 5. Spacing

Do not equate "premium" with enormous amounts of whitespace.

Whitespace should create:

* hierarchy
* breathing room
* grouping
* rhythm
* emphasis

Spacing should have a relationship to the content.

Dense information can be beautiful when structured properly.

Do not artificially separate every section by massive vertical gaps.

---

# 6. Colour

Use a deliberate palette.

A strong default is:

* one dominant background
* one dominant text colour
* one secondary text colour
* one restrained accent

Additional colours should have a functional or compositional purpose.

Avoid defaulting to:

> black + white + purple/blue gradient

unless that is specifically part of the project's identity.

### Accent colour

Accent colours should be meaningful.

Do not use an accent everywhere simply because it exists.

If everything is highlighted, nothing is highlighted.

---

# 7. Borders, Radius & Shadows

These should be treated as stylistic decisions.

Do not automatically round every component.

Prefer a limited and consistent radius system.

Sharp corners are completely acceptable.

Use borders when they improve structure.

Use shadows when they communicate actual depth.

Do not add shadows simply to make components appear "premium".

Avoid stacking:

* border
* shadow
* blur
* background
* gradient

on the same element without a strong reason.

---

# 8. Imagery

Images should feel curated rather than decorative.

Prefer:

* editorial crops
* unusual compositions
* full-bleed imagery
* intentional aspect ratios
* monochrome treatments
* texture
* photography with visual character

Avoid generic stock photography.

Do not add an image simply because a section looks empty.

When appropriate, imagery can be treated as part of the layout rather than placed inside a conventional "image card".

---

# 9. Animation & Interaction

Animation should communicate something.

Good reasons for animation:

* establishing spatial relationships
* showing state changes
* revealing content
* improving feedback
* guiding attention
* creating continuity between interactions

Bad reasons:

* "make it feel premium"
* "make it feel modern"
* filling empty space
* making the landing page impressive in a demo

Avoid excessive:

* scroll animations
* floating elements
* parallax
* spring animations
* cursor-following effects
* text scrambling
* magnetic buttons
* animated gradients

Motion should generally be subtle.

Prefer a small number of excellent interactions over dozens of mediocre ones.

---

# 10. Responsive Design

Do not treat mobile as a smaller desktop.

The composition should be reconsidered for smaller screens.

On mobile:

* hierarchy may change
* grid relationships may change
* typography may scale differently
* decorative elements may disappear
* navigation may change
* content ordering may change

Preserve the design's character rather than simply stacking desktop components vertically.

---

# 11. Component Design

Components should emerge from the visual system.

Do not create abstractions prematurely.

Avoid creating generic components such as:

```text
ModernCard
PremiumCard
GlassCard
FeatureCard
GradientCard
AnimatedCard
```

simply because several sections contain rectangles.

Abstract repeated **behaviour and structure**, not arbitrary visual similarity.

Prefer meaningful components based on the actual domain.

---

# 12. Implementation Principles

Before coding a significant page, determine:

1. Visual concept
2. Typography
3. Colour system
4. Grid
5. Spacing system
6. Component language
7. Image treatment
8. Interaction principles

Do not blindly begin generating JSX/HTML.

For significant design decisions, briefly explain the reasoning before implementation.

---

# 13. Use Existing Project Conventions

Before introducing new dependencies, inspect the project.

Understand:

* framework
* routing
* styling system
* existing components
* design tokens
* fonts
* assets
* build system
* package manager

Do not replace existing architecture merely because another approach is more familiar.

Do not introduce a UI library unless explicitly requested or clearly justified.

---

# 14. Preserve Existing Work

When modifying an existing page:

* inspect the current implementation first
* understand the existing visual language
* preserve working behaviour
* avoid unnecessary rewrites
* avoid replacing functional components purely for aesthetic reasons

Do not destroy an existing design system to implement one new page.

---

# 15. Design Before Code

For substantial UI work, follow this process:

### Step 1 — Inspect

Understand the existing application and visual language.

### Step 2 — Establish direction

Identify:

* visual references
* typography
* colour
* grid
* density
* interaction style

### Step 3 — Compose

Determine the actual page composition before creating individual components.

### Step 4 — Implement

Build the page using the established design language.

### Step 5 — Review

Critically inspect the result.

### Step 6 — Refine

Remove anything that feels generic, unnecessary, or overly decorative.

---

# 16. Self-Critique

After implementing a significant UI, perform a visual critique.

Ask:

### Genericness

Could this have been generated by a generic AI website prompt?

Could this layout appear on 100 random SaaS websites?

### Composition

Is the page visually interesting without effects?

Is the hierarchy obvious?

Is the alignment intentional?

Is there a meaningful relationship between elements?

### Typography

Is typography doing enough work?

Are type sizes, weights and line lengths deliberate?

### Decoration

Are there unnecessary gradients?

Are there unnecessary rounded containers?

Are there unnecessary shadows?

Are there unnecessary animations?

Are there decorative elements that could be removed without losing meaning?

### Identity

Does this website have a recognizable visual personality?

Would someone remember it after seeing it once?

If the answer to these questions is no, redesign rather than simply adding more decoration.

---

# 17. The "One Strong Idea" Rule

Each major section should generally have **one primary visual idea**.

For example:

* an unusual typographic composition
* an oversized image
* a dense editorial grid
* an asymmetrical layout
* a strong colour block
* a distinctive interaction

Do not combine every technique at once.

Avoid:

```text
gradient
+
glass
+
blur
+
glow
+
floating shapes
+
animated text
+
3D object
+
parallax
```

One excellent idea is stronger than eight mediocre ones.

---

# 18. Design Tension

Good design does not require every element to look identical.

Allow controlled tension between:

* large and small
* dense and sparse
* serif and sans-serif
* sharp and soft
* static and animated
* monochrome and accent
* traditional and contemporary

However, tension must be controlled by an underlying system.

Do not introduce randomness simply to appear creative.

---

# 19. References

When the user provides visual references:

Do not copy the reference literally.

Instead identify:

* typography principles
* spacing principles
* grid structure
* colour relationships
* image treatment
* density
* interaction philosophy
* compositional techniques

Then create an original design using those principles.

The goal is:

> inspired by the principles, not cloned from the reference.

---

# 20. User Taste Takes Priority

If the user rejects something as:

* tacky
* generic
* corporate
* AI-looking
* overdesigned
* boring
* too clean
* too minimalist
* too busy

treat that feedback as a meaningful design constraint.

Do not defend the previous design.

Identify the underlying reason for the rejection and adjust the visual system accordingly.

---

# 21. Engineering Quality Still Matters

Anti-vibe-code does NOT mean sacrificing:

* accessibility
* semantic HTML
* responsive behaviour
* performance
* maintainability
* keyboard navigation
* readable code
* proper state management
* error handling

A distinctive design must still be a good website.

Do not sacrifice usability for novelty.

---

# 22. Final Quality Bar

Before considering a UI task complete, ask:

> Does this look designed, or does it look generated?

The target is:

**Designed.**

It should feel like someone made deliberate decisions about:

* what belongs on the page
* what does not
* where things sit
* how typography behaves
* how the eye moves
* how much information is shown
* where visual tension exists
* what deserves emphasis

When in doubt:

**Remove before adding.**

**Compose before decorating.**

**Use typography before effects.**

**Use structure before gradients.**

**Use personality before trends.**
