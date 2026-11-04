# Woodland Conservation Area site guide

Give this file to an AI model alongside the task and the relevant source files. It describes the React site rooted at `src/` for Woodland Conservation Area in St. Margaret’s Bay, Nova Scotia. Check the current source before editing. Use the conventions below for new work and keep changes scoped to the requested feature.

## Stack and source files

| Area | Source |
| --- | --- |
| React, TypeScript, Vite, Tailwind CSS v4 | `package.json`, `vite.config.ts` |
| Design tokens and shared utilities | `src/assets/css/index.css` |
| Routes, shared header and footer, theme provider | `src/main.tsx` |
| Light, dark, and system themes | `src/context/theme-context.tsx` |
| Shared UI | `src/components/` |
| Landing page and secondary-page reference | `src/pages/landing.tsx`, `src/pages/explore.tsx` |
| Woodland illustrations | `src/assets/img/` |
| Class merging | `src/lib/index.ts` |

## Color and typography

Use the Tailwind color names defined in the CSS `@theme` block. The hex values below are for design reference.

| Role | Token | Value |
| --- | --- | --- |
| Light page background and dark header text | `cream-300` | `#f5efd5` |
| Light card panel | `cream-100` | `#fffbea` |
| Bright surface and text on dark panels | `cream-50` | `#fffdf0` |
| Brand surface and dark page background | `forest-800` | `#15362f` |
| Primary action and light-mode text links | `forest-700` | `#07503d` |
| Primary action hover in shared CSS | `forest-600` | `#0b6249` |
| Deep foreground and photo overlays | `forest-950` | `#102621` |
| Light card backdrop | `sage-100` | `#cae6b3` |
| Green accents on dark surfaces | `sage-300` | `#b4da91` |
| Leaf accent | `sage-500` | `#77aa58` |
| Sky and illustrated backgrounds | `mist-300` | `#a4d9ec` |

- Pair cream surfaces with dark forest text and forest surfaces with cream or white text. Set foreground and background together when a panel changes theme. Check contrast on translucent overlays in both themes.
- Use Tailwind’s default sans stack for general UI. The existing `.nunito` utility is for the wordmark and select card headings. It specifies Nunito with a sans-serif fallback and sets size, weight, line height, and letter spacing.
- Secondary headings use `text-4xl sm:text-5xl lg:text-6xl`, bold weight, tight tracking, and tight leading. Body copy typically uses `text-base sm:text-lg leading-relaxed` and `max-w-xl`. Use small bold uppercase labels sparingly.
- Prefer warm cream, deep green, rounded surfaces, and existing woodland art. Use direct, welcoming copy suited to families, visitors, and learners.

## Layout and responsive behavior

- Use the shared `.main` class where its spacing fits. It provides `min-h-screen mt-22 flex flex-col gap-20`. The fixed header uses `h-22`, so page content needs that offset once.
- Align secondary content to `w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8`. Landing feature sections use a wider `max-w-360` shell.
- Stack content at the base breakpoint. Expand grids when their contents fit. The landing card grid uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.
- Keep the hamburger below `xl` and inline header navigation at `xl` and above. Keep the brand row full width on mobile and auto width on desktop. Keep collapsed menu links out of keyboard navigation.
- Use `rounded-lg` or `rounded-xl` for controls, `rounded-[23px]` for the existing card pattern, and `rounded-4xl` for large feature panels. Reserve stronger shadows for large panels or floating menus.

## Shared UI

| Pattern | Use |
| --- | --- |
| Secondary-page introduction | Reuse `PageHero` with `title` and optional `description`. It uses a compact forest banner with `min-h-64 sm:min-h-72`. |
| Landing hero | Keep the illustrated viewport-height composition on the landing page. Parallax starts at `48rem` when reduced motion is off. The mobile image scrolls with the page without a scroll-driven transform. |
| Linked feature cards | Reuse `Card` with `title`, `desc`, `to`, and `image`. Keep the copy, artwork, and audio control grouped together. |
| Navigation | Use React Router `Link` for destinations and `NavLink` for route-aware header links. Apply the existing `.nav-link` pattern to header links. |
| Actions | Use `Button` for native button actions. Use `btn btn-primary` or `btn btn-secondary` on links styled as calls to action. The CSS classes and the `Button` variants have separate palettes, so follow the pattern already in the section you’re editing. |
| Audio and icons | Reuse `AudioButton` for spoken content and `lucide-react` for UI icons. Provide an accessible label for icon-only controls. |

## React and Tailwind conventions

- Write typed TSX with named exports, arrow-function components, tabs for indentation, single quotes, and the `@/` alias for cross-directory source imports. Add pages or shared components to the existing barrel exports when they are consumed through a barrel.
- Use static Tailwind utility strings for base styles. Use `cn()` from `@/lib` to merge conditional classes and caller overrides. Keep complete class names in source so Tailwind can detect them.
- Keep layout and component-specific styling in JSX. Put reusable tokens and site-wide patterns in `src/assets/css/index.css`. Follow Tailwind v4 syntax such as `bg-linear-to-b` and the trailing `!` modifier when an important utility is needed.
- Use `dark:` classes for styling. Use the existing `useTheme()` hook for behavior tied to theme selection. The provider owns the root `.dark` class, system preference, and persisted theme setting.
- Use CSS transitions for simple feedback and `motion/react` for animated menus or shared layout effects. Respect reduced motion for new decorative animations. Clean up listeners and animation frames in effects.
- Use semantic landmarks, a clear page-level heading, and descriptive image alt text when the image conveys content. Use empty alt text for decorative images. Add a visible `focus-visible` treatment to interactive controls because global CSS suppresses default outlines.

## Light and dark recipes

The root `.dark` class is the single theme switch. Unprefixed colors are the light-mode baseline. Place the corresponding `dark:` overrides after the light classes. Use `useTheme()` for controls that need the selected mode or its effective value, such as the theme toggle icon.

| Element | Light classes | Dark overrides |
| --- | --- | --- |
| Page canvas and recommended default text | `bg-cream-300 text-forest-950` | `dark:bg-forest-800 dark:text-cream-50` |
| Header shell | `border-forest-800 bg-cream-300` | `dark:border-cream-300 dark:bg-forest-800` |
| Header wordmark | `text-forest-800` | `dark:text-cream-300` |
| Header subtitle | `text-neutral-600` | `dark:text-neutral-200` |
| Feature-card shell | `bg-sage-100 text-forest-950` | `dark:bg-forest-600 dark:text-cream-50` |
| Feature-card copy panel | `bg-cream-100/85` | `dark:bg-forest-800/90` |
| Inline link on a themed content panel | `text-forest-700` | `dark:text-sage-300` |
| Recommended subdued copy on a themed content panel | `text-forest-800` | `dark:text-muted-green-400` |
| Recommended subtle divider on a themed content panel | `border-forest-800/15` | `dark:border-cream-300/20` |
| Secondary-page hero, both modes | `bg-forest-800 text-cream-50` | Use the same palette |
| Footer, both modes | `bg-forest-900 text-cream-300` | Use the same palette |

The canvas text pairing is a recommendation for new content. The current body sets background colors and individual components set text colors. The footer, secondary hero, and cream language popover are examples of surfaces with deliberate fixed palettes. Choose text and interaction colors for the immediate surface, including when a light popover opens inside a dark header.

For themed surfaces, review background, text, border, icon, hover, focus, and active states together. Pair state overrides as needed, for example `hover:text-forest-900 dark:hover:text-cream-50`. Decorative Lucide icons can inherit `currentColor`. For a custom focus treatment on themed panels, use a contrasting outline such as `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800 dark:focus-visible:outline-cream-300`. On fixed-color surfaces, choose the outline for that surface in both modes.

## Shared CSS class recipes

| Class | Current CSS contract | Usage |
| --- | --- | --- |
| `.main` | `min-h-screen mt-22 flex flex-col gap-20` | Put it on the page-level `<main>`. It includes the fixed-header offset and vertical section rhythm. |
| `.btn` | `select-none cursor-pointer px-6 py-1.5 inline-flex items-center justify-center gap-2 font-bold text-base rounded-xl` | Start with this for a link or native control using the shared CSS button pattern. Add a variant and local sizing. |
| `.btn-primary` | Forest-700 surface and white text. Hover uses forest-600. Focus and active use forest-700. | Main CTA, typically `btn btn-primary`. This uses the same palette in both themes. |
| `.btn-secondary` | Cream-50 at 90% opacity, sage-700 text, medium backdrop blur, and white hover background. | Supporting CTA, typically `btn btn-secondary`. This uses the same palette in both themes. |
| `.btn-icon` | `p-1.5! aspect-square!` | Add after the variant for square icon controls. The header uses `btn btn-primary btn-icon min-h-10`. Supply an accessible name. |
| `.nav-link` | Minimum height `min-h-10`, full width below `xl`, auto width at `xl`, and rounded corners with themed text and interaction colors. | Header links. The active class sets the foreground and the header’s Motion span supplies the highlight. |
| `.nunito` | Nunito with sans-serif fallback, weight 800, 20px size, 1.1 line height, and -0.5px tracking. | Existing wordmark and selected headings. Inspect the computed style when combining it with typography utilities. |
| `.tree-sway` | Three-second CSS animation using `--tree-rotation`. Reduced motion disables it. | Existing decorative footer trees. |

Use one button styling path per element. `Button` is a typed component for native actions, with `primary`, `secondary`, `outline`, `ghost`, and `danger` variants. Its defaults are `variant='primary'`, `size='md'`, `radius='lg'`, and `type='button'`. CSS CTA links use the `.btn` family. Preserve the distinction between these variants when extending either path. Shared CSS rules are outside Tailwind’s utility layer. When a local override loses, inspect the cascade before adding `!`. `cn()` merges utility strings and does not resolve conflicts hidden inside custom CSS classes.

```tsx
<main className='main'>
	<PageHero title='Plan your visit' />
	<section className='w-full max-w-340 mx-auto px-4 sm:px-6 lg:px-8'>
		<Link
			to='/explore'
			className='btn btn-primary w-full min-h-13 md:w-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800 dark:focus-visible:outline-cream-300'>
			Explore the woodland
			<ArrowRight aria-hidden='true' className='size-5 shrink-0' />
		</Link>
	</section>
</main>
```

## Tailwind class ordering and grouping

Use this order on new elements and when substantively editing an existing class list. It establishes a consistent convention for a codebase with mixed ordering. Preserve unrelated class strings. Ordering here is for readability. Tailwind and the CSS cascade determine which declaration wins.

| Order | Group | Examples |
| --- | --- | --- |
| 1 | Shared classes and variant hooks | `main`, `btn btn-primary btn-icon`, `nav-link`, `group`, `peer` |
| 2 | Position, inset, and stacking | `relative isolate`, `absolute inset-0 -z-10`, `fixed top-0 z-50` |
| 3 | Display and layout | `flex flex-col items-center justify-between gap-4`, `grid grid-cols-1 gap-5`, `shrink-0` |
| 4 | Dimensions | `w-full max-w-340 min-h-64`, `size-5` |
| 5 | Margins and padding | `mx-auto mt-3 px-4 py-10` |
| 6 | Overflow, content fitting, and base interaction | `overflow-hidden object-cover object-center select-none` |
| 7 | Shape, border, and background | `rounded-xl border border-forest-800/15 bg-cream-100` |
| 8 | Typography | `text-center text-base font-semibold leading-relaxed tracking-tight text-forest-950` |
| 9 | Visual effects and transitions | `shadow-sm backdrop-blur-md transition-colors duration-300 ease-in-out` |
| 10 | Responsive blocks | `sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8` |
| 11 | Light or shared interaction and accessibility variants | `hover:bg-cream-200 focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-cream-300 disabled:opacity-50` |
| 12 | Dark palette and dark interaction variants | `dark:border-cream-300/20 dark:bg-forest-800 dark:text-cream-50 dark:hover:bg-forest-700` |
| 13 | Motion preferences | `motion-reduce:transition-none` |

Keep related utilities adjacent within each group. Order responsive blocks from the smallest breakpoint to the largest, and repeat the base group order inside each breakpoint. Within theme blocks, put the surface and text before interactive overrides. Prefer `transition-colors`, `transition-opacity`, or `transition-transform` when the effect targets one property family. Use `size-*` when width and height match.

Keep short class lists in one string. For long lists with clear groups, use `cn()` with one string per group or cluster. Keep conditional utilities and caller `className` last so intended overrides remain visible.

```tsx
className={cn(
	'group relative flex flex-col gap-3 w-full p-4 overflow-hidden',
	'rounded-xl border border-forest-800/15 bg-cream-100',
	'text-base leading-relaxed text-forest-950 shadow-sm transition-colors',
	'sm:p-5',
	'hover:bg-cream-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-800',
	'dark:border-cream-300/20 dark:bg-forest-800 dark:text-cream-50 dark:hover:bg-forest-700 dark:focus-visible:outline-cream-300',
	'motion-reduce:transition-none',
	className,
)}
```

## Handoff checklist

1. Check the current route in `src/main.tsx`. Several destinations currently render `LandingPage` as a placeholder.
2. Reuse the nearest existing component and theme tokens before introducing a variant.
3. Check the edited page in light and dark themes, with keyboard navigation, and at mobile and desktop widths. For header changes, check both sides of `xl`. For hero changes, check both sides of `48rem` and reduced motion.
4. Run `npm run build` and `npm run lint`. Report which checks ran and any failures.
