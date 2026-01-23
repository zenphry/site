# Animation Guide

Professional animation system for Zenphry - subtle, fast, and trustworthy.

## Philosophy

Zenphry animations reinforce "operator-led precision" over flashy marketing. All animations are:

- **Fast**: 150-200ms duration
- **Subtle**: Small movements (zoom-95, scale-105, slide-2)
- **Consistent**: 2-3 patterns site-wide
- **Professional**: ease-out timing for snappy feel

## Animation Patterns

### 1. Dialogs (Modals)

**Pattern**: Fade + tiny zoom
**Classes**: `fade-in-0 fade-out-0 zoom-in-95 zoom-out-95`
**Duration**: 150ms
**Use for**: Alert dialogs, confirmation modals, form dialogs

```tsx
// Automatic via Dialog component
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Title</DialogTitle>
    <DialogDescription>Description</DialogDescription>
  </DialogContent>
</Dialog>
```

### 2. Dropdowns (Menus)

**Pattern**: Fade + tiny zoom
**Classes**: `fade-in-0 fade-out-0 zoom-in-95 zoom-out-95`
**Duration**: 150ms
**Use for**: Navigation menus, context menus, select dropdowns

```tsx
// Automatic via DropdownMenu component
<DropdownMenu>
  <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 3. Sheets (Side Panels)

**Pattern**: Fade + short slide (2px offset)
**Classes**: `fade-in-0 fade-out-0 slide-in-from-right-2 slide-out-to-right-2`
**Duration**: 200ms
**Use for**: Mobile menus, filter panels, detail drawers

```tsx
// Automatic via Sheet component
<Sheet>
  <SheetTrigger>Open Panel</SheetTrigger>
  <SheetContent side="right">Panel content</SheetContent>
</Sheet>
```

**Available sides**: `right` (default), `left`, `bottom`, `top`

### 4. Accordions (FAQs)

**Pattern**: Vertical slide + fade
**Classes**: `animate-accordion-down` / `animate-accordion-up`
**Duration**: 150ms
**Use for**: FAQ sections, collapsible content, feature details

```tsx
// Automatic via Accordion component
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer content</AccordionContent>
  </AccordionItem>
</Accordion>
```

### 5. Buttons (CTAs)

**Pattern**: Mild scale on hover only
**Classes**: `hover:scale-105`
**Duration**: 150ms
**Use for**: Primary CTAs, secondary buttons

```tsx
// Automatic via Button component
<Button variant="default">Contact Us</Button>
<Button variant="outline">Learn More</Button>
```

**No big slides, bounces, or pulse effects on UI elements** - keep it professional.

### 6. Background Grid Pulses (Ambient)

**Pattern**: Animated grid line pulses
**Component**: `BackgroundPulses` (automatic in `app/root.tsx`)
**Duration**: 2-4 seconds per pulse (staggered)
**Use for**: Site-wide ambient animation, adds subtle life to static backgrounds

```tsx
// Automatically included in root.tsx background layers
// No manual implementation needed - works site-wide
```

**Specifications**:

- **Type**: Vertical and horizontal line pulses along 40px grid
- **Count**: 8-12 active pulses at once
- **Color**: Gold `rgba(203,178,106,0.4)` with gradient fade
- **Behavior**:
  - Randomly positioned on grid lines
  - Independent timing (2-4s duration, random delays)
  - Drifts to new positions every 15 seconds
  - Visible through all semi-transparent elements
- **Effect**: Subtle, technical, professional ambient animation

**Implementation**: Lives in `app/components/background-pulses.tsx`, automatically included in both light and dark mode background layers.

## Custom Animations

If you need a custom animation, follow these rules:

### Duration

```tsx
className = "duration-150 ease-out"; // Standard
className = "duration-200 ease-out"; // Slightly slower (sheets)
```

### Hover Effects

```tsx
// ✅ Good - Subtle scale
className = "transition-transform duration-150 hover:scale-105";

// ✅ Good - Mild opacity change
className = "transition-opacity duration-150 hover:opacity-80";

// ❌ Avoid - Big movements
className = "hover:translate-y-4"; // Too much

// ❌ Avoid - Bounce/spring
className = "transition-all duration-500 ease-bounce";
```

### Transitions

```tsx
// ✅ Good - Specific property
className = "transition-colors duration-150";
className = "transition-transform duration-150";

// ⚠️ Use sparingly - All properties
className = "transition-all duration-150"; // OK for simple elements
```

## Animation Utilities

Available from `tailwindcss-animate`:

**Fade**:

- `fade-in-0` / `fade-out-0` - Subtle opacity transitions
- `fade-in-50` / `fade-out-50` - More pronounced

**Zoom**:

- `zoom-in-95` / `zoom-out-95` - Tiny zoom (professional)
- `zoom-in-90` / `zoom-out-90` - Slightly larger (avoid for Zenphry)

**Slide** (use -2 variants for professional feel):

- `slide-in-from-right-2` / `slide-out-to-right-2`
- `slide-in-from-bottom-2` / `slide-out-to-bottom-2`
- `slide-in-from-left-2` / `slide-out-to-left-2`
- `slide-in-from-top-2` / `slide-out-to-top-2`

**Scale**:

- `scale-105` - Mild hover effect (professional)
- `scale-110` - Avoid (too flashy)

## Configuration

Animation timing is configured in `app/tailwind.config.css`:

```css
@plugin "tailwindcss-animate";

@theme {
  /* Professional Animation Timing - Fast & Precise (150-200ms) */
  --animate-accordion-down: accordion-down 0.15s ease-out;
  --animate-accordion-up: accordion-up 0.15s ease-out;
}
```

## Examples

### CTA with hover scale

```tsx
<Button className="hover:scale-105">Book a Call</Button>
```

### Custom card with fade-in on mount

```tsx
<div className="animate-in fade-in-0 duration-300">
  <Card>Card content</Card>
</div>
```

### Link with subtle hover

```tsx
<a
  href="/services"
  className="transition-colors duration-150 hover:text-primary"
>
  Learn More
</a>
```

## Don't Use

**Avoid these animation patterns on UI elements** (too flashy for professional services):

- ❌ Bounce effects
- ❌ Pulse animations on buttons/cards (background pulses are OK)
- ❌ Spin (except loading spinners)
- ❌ Big slides (use -2 variants only)
- ❌ Long durations (>300ms for UI interactions)
- ❌ Elastic/spring timing
- ❌ Shake/wiggle effects
- ❌ Page transition effects

**Note**: Background ambient animations (like grid pulses) are acceptable as they're non-interactive and add subtle life without distracting from content.

## Testing Animations

Test on:

1. **Desktop** - Ensure hover states feel snappy
2. **Mobile** - Touch interactions should feel immediate
3. **Reduced motion** - System preferences are respected automatically

Animations respect `prefers-reduced-motion` via Radix UI components.

## Resources

- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Animation plugin
- [Radix UI](https://www.radix-ui.com) - Accessible component animations
- [Professional Animation Guide](https://www.grafit.agency/blog/website-animation) - Reference article
