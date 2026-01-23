# Brand Guidelines

## Brand Colors

### Primary Gold

**HEX**: `#cbb26a`
**RGB**: `203, 178, 106`
**CMYK**: `0%, 12%, 48%, 20%`

Used for: Primary CTAs, brand accents, hover states

### White

**HEX**: `#ffffff`
**RGB**: `255, 255, 255`
**CMYK**: `0%, 0%, 0%, 0%`

Used for: Light mode backgrounds, text on dark backgrounds

### Supporting Colors

- **Dark**: `#1a1a1a` - Dark mode backgrounds, text on light backgrounds
- **Gray**: `#6b7280` - Secondary text, borders, subtle elements

## Typography

### Primary Font

**Wordmark**: Signika Bold

### Body Font

**Website**: Inter (Google Fonts)
**Weights**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Slogan

**Font**: Helvetica LT Std Roman

## Pattern Background

The site features a subtle grid pattern with animated line pulses and a radial gold gradient for visual depth and brand consistency.

### Light Mode

- **Base**: White (`#ffffff`)
- **Grid**: Gold at 8% opacity (`rgba(203,178,106,0.08)`)
- **Gradient**: Gold radial orb (12% → 4% → transparent)
- **Pulse Lines**: Gold at 40% opacity (`rgba(203,178,106,0.4)`)
- **Effect**: Subtle, professional, allows content to breathe

### Dark Mode

- **Base**: Slate (`#0f172a`)
- **Grid**: Gold at 6% opacity (`rgba(203,178,106,0.06)`)
- **Gradient**: Gold radial orb (8% → 3% → transparent)
- **Pulse Lines**: Gold at 40% opacity (`rgba(203,178,106,0.4)`)
- **Effect**: Sophisticated, modern, reduces eye strain

### Grid Specifications

- **Size**: 40px × 40px
- **Position**: Centered radial gradient at 50% 50%
- **Implementation**: Site-wide in `app/root.tsx`

### Animated Line Pulses

- **Component**: `BackgroundPulses` in `app/components/background-pulses.tsx`
- **Type**: Vertical and horizontal lines along grid
- **Count**: 8-12 active pulses at once
- **Behavior**:
  - Snaps to 40px grid lines
  - 2px width with gradient fade (transparent → gold → transparent)
  - Random staggered timing (2-4s duration, random delays)
  - Drifts to new grid positions every 15 seconds
- **Purpose**: Adds subtle life and movement without distraction
- **Visibility**: Shows through all semi-transparent elements

### Transparency Strategy

All UI elements use semi-transparency to reveal the animated grid pattern:

- **Cards**: 75% opacity (`bg-*/75`) with backdrop blur
- **Sections**: 50-60% opacity (`bg-*/50` to `bg-*/60`)
- **Header/Footer**: 75% opacity (`bg-*/75`) with backdrop blur
- **Dialogs/Menus**: 90% opacity (`bg-*/90`) with backdrop blur
- **Purpose**: Consistent visual depth, background animation visible site-wide

## Logo Usage

### File Locations

- `app/assets/logo-color.svg` - Colored logo (with gold)
- `app/assets/logo-white.svg` - White logo (dark mode)
- `app/assets/logo-black.svg` - Black logo (light mode)

### Usage Guidelines

- **Light Mode**: Use black logo for maximum contrast
- **Dark Mode**: Use white logo for visibility
- **Colored Backgrounds**: Use colored logo sparingly, prefer black/white for readability

### Sizing

- **Navigation**: `h-10` (40px height)
- **Footer**: `h-8` (32px height)
- **Maintain aspect ratio**: Always use `w-auto`

## Design Principles

1. **Subtle & Professional**: No flashy animations or bright colors
2. **Operator-Led Precision**: Clean, structured, purposeful design
3. **Measurable Outcomes**: Clear hierarchy, scannable content
4. **Fast Performance**: Optimized assets, efficient animations (150-200ms)
5. **Accessibility**: WCAG 2.1 AA compliant, 44px minimum touch targets

## Resources

- Brand assets: `/app/assets/`
- Pattern background: `app/root.tsx` (lines 183-210)
- Color tokens: `app/app.css` and `app/tailwind.config.css`
