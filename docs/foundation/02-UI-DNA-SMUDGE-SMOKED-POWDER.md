# 02 — UI DNA: Smudge Smoked Powder

## Immutable design tokens
| Token | Value | Required use |
|---|---|---|
| Background | `#b5d1b9` | Global light canvas |
| Forest ink/shadow | `#082A20` | Text on light backgrounds; all shadow color derivation |
| Brand green | `#087A43` | Primary actions and brand emphasis |
| Premium surface | `#123B2D` | Premium cards, forms, and dark component surfaces |
| Premium text | `#FFFFFF` | Typography and icons on premium dark surfaces |

## CSS baseline
```css
:root {
  color-scheme: light;
  --color-background: #b5d1b9;
  --color-ink: #082a20;
  --color-brand: #087a43;
  --color-premium-surface: #123b2d;
  --color-premium-text: #ffffff;

  --shadow-card:
    0 2px 4px rgba(8, 42, 32, 0.16),
    0 10px 24px rgba(8, 42, 32, 0.20),
    0 24px 48px rgba(8, 42, 32, 0.12);

  --shadow-button:
    0 3px 0 rgba(8, 42, 32, 0.75),
    0 7px 14px rgba(8, 42, 32, 0.20);

  --shadow-inset:
    inset 0 2px 5px rgba(8, 42, 32, 0.24);
}
```

## Component laws
- Light canvas text defaults to forest ink.
- Premium dark cards and form surfaces use white text.
- Primary buttons use brand green with white text.
- Cards use visibly layered exterior shadows derived from forest ink.
- Buttons have a clear contact shadow and perceptible pressed state.
- Inputs have clear boundaries, focus indicators, and a restrained recessed state.
- Shadows must remain legible without making text or controls appear blurred.
- Do not use photographic grass or field textures as the general page background.
- Do not introduce arbitrary competing palettes or shadow hues.
- Avoid color-only communication; pair status colors with text or icons.

## Release checks
Check text, interactive controls, hover/focus/disabled states, error messages,
charts, overlays, and responsive layouts for contrast and clarity. Verify
contrast numerically before release. If a combination fails, adjust component
treatment without silently changing the approved core tokens.

Centralize tokens and component primitives so individual pages cannot drift
into a separate visual system.
