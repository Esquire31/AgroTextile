# Style Rules (Semantic Color Tokens)

This project uses a token-driven styling system. All visual color decisions must flow through [src/core/styles/variables.scss](src/core/styles/variables.scss).

## 1. Source Of Truth

- `src/core/styles/variables.scss` is the single source of truth for colors.
- Do not define colors directly in component files, JSX, TSX, CSS, SCSS, or inline styles.
- Any global color update must be made by changing the token values in `variables.scss`, not by editing individual components.

## 2. Hard Rules

- Never use explicit color values anywhere in the app code.
- Explicit color values include:
	- hex values like `#006241`
	- RGB / RGBA values like `rgb(0, 98, 65)` or `rgba(0, 98, 65, 0.2)`
	- HSL / OKLCH values in component styles
	- named colors like `white`, `black`, `red`
	- arbitrary Tailwind color literals like `bg-[#006241]` or `text-[rgba(...)]`
- Never use inline styles for colors unless a token-based utility cannot express the case and the exception is documented first.
- Never use image-derived or ad hoc color constants inside components.

## 3. Allowed Pattern

Use semantic utility classes generated from the theme tokens.

Examples:
- `bg-primary`
- `text-primary`
- `border-primary`
- `bg-card-bg`
- `bg-card-header`
- `bg-card-secondary`
- `text-text-primary`
- `text-text-secondary`
- `border-outline-variant`
- `bg-surface-container`
- `text-on-surface`

If a lighter or transparent variant is needed, still derive it from the token class family, for example:
- `bg-primary/10`
- `text-text-primary/70`
- `border-outline-variant/30`

Do not replace these with fixed color literals.

## 4. Token Ownership

All color semantics belong in `variables.scss`:

- Base palette lives in the Sass color definitions.
- Theme mappings live in the `light` and `dark` token maps.
- Utility classes are emitted from those token maps.
- If a component needs a new semantic surface, add a token in `variables.scss` first and then use the generated utility class.

Examples of valid new semantic tokens:
- `card-primary`
- `card-secondary`
- `section-accent`
- `badge-success`
- `badge-warning`

## 5. When Adding Or Changing UI

When implementing a new component or page:

1. Decide the semantic role of each color surface.
2. Check whether an existing token already covers it.
3. If not, add or adjust the token in `variables.scss`.
4. Use the token utility class in the component.
5. Avoid duplicating the same visual color as a one-off local style.

## 6. Refactor Rule

- If the same visual color appears in multiple components, it should be represented by one shared token.
- If a design change requires updating a color globally, update the token in `variables.scss` once.
- Do not search-and-replace literal colors across components.

## 7. Component Authoring Checklist

- No `#hex` values in JSX, TSX, CSS, SCSS, or style props.
- No `rgb(...)`, `rgba(...)`, `hsl(...)`, or `oklch(...)` in components.
- No `bg-white`, `text-black`, `border-red-500`, or similar hardcoded palette values.
- All colors expressed through semantic tokens from `variables.scss`.
- New color need mapped in `variables.scss` before use.

## 8. Review Gate

- If a diff introduces a hardcoded color, reject it.
- If a component introduces a new color concept without a token, request a token first.
- If a global palette change would require editing many components, the implementation is wrong and should be refactored to tokens.

## 9. Preferred Naming Pattern

Use semantic names that describe function, not appearance.

Good:
- `primary`
- `card-bg`
- `card-header`
- `text-primary`
- `outline-variant`

Avoid:
- `green-1`
- `dark-gray`
- `button-blue`
- `brand-hex-006241`

## 10. Summary

The rule is simple: the app should only use semantic color tokens, and those tokens should only be defined in `variables.scss`. If color behavior needs to change globally, update the token map in one place and let the entire UI inherit it.
