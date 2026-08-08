---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

## Scroll-Driven Website Design Guidelines

When this skill is invoked for a scroll-driven animated website (used alongside `video-to-website`), follow these additional rules:

### Typography as Design
- Hero headings: **6rem minimum**, tight line-height (0.9-1.0), heavy weight (700-800)
- Section headings: **3rem minimum**, confident weight (600-700)
- Horizontal marquee text: **10-15vw**, uppercase, letterspaced
- Section labels: small (0.7rem), uppercase, letterspaced (0.15em+), muted color — like "001 / Features"
- Text hierarchy replaces card containers. Size, weight, and color ARE the structure

### No Cards, No Boxes
- **NEVER** use glassmorphism cards, frosted glass, or visible containers around text on scroll-driven sites
- Text sits directly on the background — clean, confident, editorial
- Readability comes from: font weight (600+), text-shadow if needed, and ensuring video frames have clean backgrounds at text scroll points
- The only acceptable "container" is generous padding on the section itself

### Color Zones
- Background color must shift between sections (light → dark → accent → light)
- Define color zones in CSS variables: `--bg-light`, `--bg-dark`, `--bg-accent`
- Text color inverts automatically: `--text-on-light`, `--text-on-dark`
- Transitions happen via GSAP, not CSS transitions

### Layout Variety
Every scroll-driven page needs at least 3 different layout patterns:
1. **Centered** — hero sections, CTAs
2. **Left-aligned** — feature descriptions with product on right
3. **Right-aligned** — alternate features
4. **Full-width** — horizontal marquee text, stats rows
5. **Split** — text on one side, supporting visual on the other

Never use the same layout for consecutive sections.

### Animation Choreography
- Every section must use a DIFFERENT entrance animation (fade-up, slide-left, slide-right, scale-up, clip-path reveal)
- Elements within a section enter with staggered delays (0.08-0.12s between items)
- Sequence: label first → heading → body text → CTA/button
- At least one section must pin (stay fixed) while its contents animate internally
- At least one oversized text element must move horizontally on scroll

### Stats & Numbers
- Display stats at **4rem+** font size
- Numbers MUST count up via GSAP (never appear statically)
- Use a suffix element for units (x, M, %, etc.) at a smaller size
- Labels below in small caps or uppercase muted text