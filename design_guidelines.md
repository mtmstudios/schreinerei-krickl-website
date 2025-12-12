# Design Guidelines: Schreinerei Krickl Website

## Design Approach

**Reference-Based Approach**: Drawing inspiration from premium craftsmanship and trust-building websites like Airbnb (trust signals, quality imagery), Apple (clean minimalism), and high-end architecture/interior design portfolios. The design must convey traditional craftsmanship with modern professionalism.

## Core Design Principles

1. **Craft-First Visual Language**: Let woodwork imagery and craftsmanship lead the visual narrative
2. **Conversion Through Trust**: Professional polish that builds confidence while maintaining approachability
3. **Generous Breathing Room**: White space emphasizes quality and attention to detail
4. **Subtle Motion**: Animations reveal content, never distract from it

## Typography

**Font Selection**:
- **Headings**: Use a clean, modern sans-serif with strong presence (e.g., "Inter" or "Plus Jakarta Sans" from Google Fonts, weights 600-700)
- **Body Text**: Highly legible sans-serif (same family as headings, weight 400-500)
- **Accent Text** (CTAs, labels): Medium weight (500-600) from the same family

**Hierarchy**:
- H1 (Hero Headlines): text-4xl md:text-5xl lg:text-6xl, font-bold
- H2 (Section Headers): text-3xl md:text-4xl, font-semibold
- H3 (Subsections): text-2xl md:text-3xl, font-semibold
- H4 (Card Titles): text-xl md:text-2xl, font-semibold
- Body: text-base md:text-lg, leading-relaxed
- Small Text (captions, labels): text-sm

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Section padding: py-16 md:py-24 lg:py-32
- Container margins: px-4 md:px-6 lg:px-8
- Card spacing: p-6 md:p-8
- Element gaps: gap-4, gap-6, gap-8, gap-12

**Grid Structure**:
- Max container width: max-w-7xl mx-auto
- Service cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Project gallery: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Benefits/Icons: grid-cols-2 md:grid-cols-3 lg:grid-cols-6

## Component Library

### Navigation
- **Top Navigation**: Fixed/sticky, backdrop-blur background, clean horizontal layout
- **Dropdown Menu**: Subtle shadow, smooth slide-down animation, clear hover states
- **Breadcrumbs**: Small text with chevron separators, subtle styling, positioned below header

### Hero Sections
- **Homepage Hero**: Full-bleed background image (workshop or premium project), 70vh-80vh height, centered content with overlay gradient for text legibility
- **Service Page Heroes**: 50vh-60vh height, specific craft imagery per service
- **Buttons on Images**: Implement with backdrop-blur-sm and semi-transparent background for readability

### Conversion Funnels (Customer & Job Application)
- **Multi-step Progress Indicator**: Horizontal step indicators with numbers/icons
- **Icon Selection Interface**: Large, clickable icon cards (grid-cols-2 md:grid-cols-3)
- **Step Transitions**: Fade-in animations between steps
- **Form Fields**: Clean, generous padding (p-4), rounded corners (rounded-lg)
- **Success State**: Checkmark animation with confirmation message

### Service Cards
- **Card Style**: Subtle shadow (shadow-md), rounded-xl, hover:shadow-xl transition
- **Layout**: Image top (aspect-[4/3]), content padding p-6, icon + title + description + CTA button
- **Hover Effect**: Slight scale transform (hover:scale-105) with smooth transition

### Animated Timeline (/ueber-uns/)
- **Visual Design**: Vertical line with milestone nodes, alternating left/right content blocks
- **Animation**: Scroll-triggered fade-in-up for each milestone, connecting line draws progressively
- **Milestone Markers**: Circular nodes with year labels, connected by vertical line

### Project Gallery (/referenzen/)
- **Filter Buttons**: Pill-shaped buttons with active state highlight, horizontal scroll on mobile
- **Gallery Grid**: Masonry or uniform grid, gap-6 spacing
- **Project Cards**: Image with hover overlay showing project details, smooth opacity transition

### Forms & CTAs
- **Primary CTA Buttons**: Large (px-8 py-4), rounded-lg, bold text, prominent placement
- **Secondary Buttons**: Outlined style, less visual weight
- **Form Inputs**: Consistent height (h-12), rounded-md, focus ring

### Benefits/Icon Sections
- **Icon Grid**: 6 columns on desktop, 3 on tablet, 2 on mobile
- **Icon Style**: Minimalist line icons or filled icons in brand accent
- **Card Layout**: Icon above, title, short description, centered alignment

## Images

**Required Images Throughout Site**:
- **Homepage Hero**: Large workshop interior or craftsman at work (conveying tradition + quality)
- **Service Pages (6 heroes)**: Specific imagery per service (furniture workshop, kitchen detail, flooring installation, door craftsmanship, repair work, custom pieces)
- **About Page**: Team/owner portrait, workshop overview, historical photos for timeline
- **Project Gallery**: 15-20 high-quality project photos across all categories
- **Karriere Page**: Workshop atmosphere, team collaboration shots

**Image Treatment**: 
- High-quality photography with natural lighting
- Subtle vignette on hero images for text legibility
- Consistent aspect ratios within sections

## Animations

**Scroll-Reveal Effects**:
- Section fade-in-up as user scrolls (opacity 0→1, translateY 20px→0)
- Timeline progressive reveal (line drawing + milestone fade-in)
- Stagger animations for card grids (each card delays by 100ms)

**Interactive Animations**:
- Button hover: subtle scale + shadow increase
- Card hover: scale-105 transform
- Funnel transitions: crossfade between steps
- Navigation dropdown: slide-down with fade

**Performance**: Use CSS transforms and opacity only, requestAnimationFrame for scroll-triggered animations

## German Language Integration

All text, labels, buttons, and navigation in German. Examples:
- CTAs: "Jetzt anfragen", "Mehr erfahren", "Projekt starten"
- Navigation: "Startseite", "Über uns", "Leistungen", "Referenzen", "Karriere", "Kontakt"
- Form labels: "Name", "E-Mail", "Telefon", "Nachricht"
- Funnel: "In 60 Sekunden zur Anfrage", "In 60 Sekunden bewerben"

## Accessibility

- Minimum touch target: 44x44px for all interactive elements
- Form labels clearly associated with inputs
- Keyboard navigation throughout funnels
- Focus indicators on all interactive elements
- Alt text for all images

## Multi-Page Consistency

Maintain consistent header/footer, navigation patterns, CTA button styling, card layouts, and spacing rhythm across all pages. Each service subpage follows identical structural template with customized content.