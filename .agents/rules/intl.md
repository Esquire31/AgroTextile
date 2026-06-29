# Internationalisation Rules (React Intl)

This document defines mandatory standards for internationalisation in this repository.

## 1. Scope And Stack

- i18n library: react-intl.
- Locale provider source: src/core/locale/index.jsx.
- Translation files:
	- src/core/locale/translations/en-in.json
	- src/core/locale/translations/zh-cn.json
	- src/core/locale/translations/ae-ar.json
- Supported locales:
	- en-IN
	- zh-CN
	- ar-AE

## 2. Core Principles

- Never hardcode user-facing text in JSX/TSX.
- Every visible label, heading, helper text, button text, placeholder, and aria label must come from translations.
- Every new key must be added to all supported locale files in the same change.
- Keep keys stable. Do not rename existing keys without migration.
- Use the same key structure across all locale JSON files.

## 3. Key Naming Convention

Use dot-separated, hierarchical, lowercase keys.

Format:
- app.<domain>.<page_or_component>.<section>.<element>

Examples:
- app.navbar.tabs.about_us
- app.footer.section.newsletter.btn_subscribe
- app.pages.home.calculator.payload_max

Rules:
- Use snake_case for multi-word key segments.
- Prefer semantic names over visual names.
- Do not include language code in key names.
- Do not encode values in keys (bad: app.stats.1200_clients).

## 4. Page Integration Rules

In React components:
- Import useIntl from react-intl.
- Resolve text via formatMessage.

Pattern:

```jsx
import { useIntl } from 'react-intl'

function ExampleSection() {
	const { formatMessage } = useIntl()

	return (
		<h2>{formatMessage({ id: 'app.pages.home.calculator.title' })}</h2>
	)
}
```

For attributes:

```jsx
<input
	aria-label={formatMessage({ id: 'app.form.email.aria_label' })}
	placeholder={formatMessage({ id: 'app.form.email.placeholder' })}
/>
```

For repeated UI options:
- Keep option labels as keyed translations, not hardcoded array text.
- Example: app.pages.home.calculator.option.20ft_standard.

## 5. Variables, ICU, And Rich Text

### Variables

Use ICU placeholders for dynamic values.

```jsx
formatMessage(
	{ id: 'app.orders.count' },
	{ count: orderCount }
)
```

Message example:
- "app.orders.count": "Total orders: {count}"

### Plurals

Use ICU plural syntax.

Message example:
- "app.items.count": "{count, plural, =0 {No items} one {# item} other {# items}}"

### Rich Text / Line Breaks

- Prefer ICU rich text patterns when feasible.
- Existing HTML fragments like <br /> are allowed only where already used and safely rendered.
- Do not inject unsanitized HTML.

## 6. Locale Direction And Language Metadata

- Locale switch must update document language and direction.
- ar-AE must set document dir to rtl.
- en-IN and zh-CN must set document dir to ltr.

## 7. Translation File Quality Rules

- JSON must be valid (no trailing comments).
- Keep files human-readable with consistent formatting.
- Preserve key parity across all locale files.
- Do not leave missing keys in non-default locales.
- Avoid placeholder English text in non-English files unless explicitly approved.

## 8. Adding i18n To A New Page (Required Workflow)

1. Identify all user-facing strings on the page/component.
2. Create keys under the correct namespace (usually app.pages.<page>...).
3. Add entries in en-in.json, zh-cn.json, and ae-ar.json.
4. Replace hardcoded strings with formatMessage in JSX.
5. Localize aria-label, title, alt, placeholder, and button text.
6. Verify no hardcoded user-visible text remains.
7. Build/test to ensure no missing ID runtime issues.

## 9. Review Checklist (PR Gate)

- Any new visible text hardcoded? If yes, reject.
- New keys added in all 3 locale files? If no, reject.
- Keys follow namespace format? If no, request fix.
- Any key renamed/deleted without migration? If yes, request migration note.
- Locale direction behavior preserved for Arabic? If no, fix required.

## 10. Do / Do Not Summary

Do:
- Keep keys semantic, grouped, and stable.
- Keep translations complete across locales.
- Localize both content and accessibility strings.

Do not:
- Concatenate translated fragments to form a sentence.
- Use component names as key leaf values when semantic meaning is clearer.
- Add one-off ad hoc key styles that break existing taxonomy.

## 11. Source Of Truth And npm Commands

- en-in.json is the single source of truth for translation keys.
- All non-English locale files must contain the same key set as en-in.json.

Command:
- npm run i18n:fill

Behavior of npm run i18n:fill:
- Reads src/core/locale/translations/en-in.json.
- Scans all other *.json locale files in src/core/locale/translations.
- Adds missing keys to each locale file.
- Uses the English value as temporary fallback for newly added keys.
- Preserves existing translated values.

When to run:
- Immediately after adding new keys to en-in.json.
- Before opening a PR with i18n changes.
