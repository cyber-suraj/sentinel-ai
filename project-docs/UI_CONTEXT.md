# UI Context

## Tailwind Color Tokens
- **Risk Score 0-30 (High Risk):** Red (e.g., `text-red-600`, `bg-red-100`, `border-red-500`)
- **Risk Score 31-60 (Medium Risk):** Amber (e.g., `text-amber-600`, `bg-amber-100`, `border-amber-500`)
- **Risk Score 61-100 (Safe / Low Risk):** Green (e.g., `text-green-600`, `bg-green-100`, `border-green-500`)

## Component Patterns
- **Card:** A reusable container with a white background, rounded corners (`rounded-lg`), a subtle shadow (`shadow-md`), and standard padding (`p-4` or `p-6`).
- **Button:** Standardized interactive elements with clear states (hover, focus, disabled). Primary buttons use brand colors, while secondary buttons use neutral outlines.
- **FlagCard:** A specialized Card used to display individual risk flags or warnings identified by the AI, complete with an icon, title, and description.
- **RiskScoreGauge:** A visual component (using Recharts or custom SVG/CSS) that displays the risk score from 0-100, colored according to the Tailwind Color Tokens defined above.
