# BootcampLMS Workspace Guidelines & Architectural Rules

## 1. Design System & Visual Consistency (MANDATORY)

- **Color Palette Contract**:
  - **Primary Brand Dark Green**: `#006B3C` / `oklch(0.4638 0.1137 155.41)` (`var(--brand-dark)` / `bg-brand-dark` / `bg-primary`)
  - **Secondary Brand Green**: `#008F4C` / `oklch(0.5701 0.1458 153.33)` (`var(--brand)` / `bg-brand`)
  - **10% Lime Accent**: `#4DBD18` / `oklch(0.7055 0.2133 138.68)` (`var(--lime)` / `text-lime` / `bg-lime`)
  - **Mint Surface**: `#E8F7DF` / `oklch(0.9586 0.0354 133.54)` (`var(--mint)` / `bg-mint`)
  - **Off-white Background**: `#F8FAF9` (`var(--background)` / `bg-background`)
  - **Muted Text**: `#64748B` (`var(--muted-foreground)` / `text-muted-foreground`)

- **Typography & Font Family**:
  - **Main Font**: `Inter, ui-sans-serif, system-ui, sans-serif` (`var(--font-sans)` / `font-sans`).
  - **Headings (`h1`, `h2`, `h3`, `h4`)**: `font-extrabold` or `font-bold` with `-0.015em` letter-spacing (`tracking-tight`).
  - **Field Labels**: `text-xs font-semibold text-slate-600 uppercase tracking-wider`.
  - **Primary Buttons**: `font-bold` or `font-semibold` with `rounded-xl` / `rounded-lg` corners and brand green background (`bg-[#006B3C]` / `bg-primary`).

- **Strict Consistency Rule**:
  - NEVER use generic uncurated colors (plain blue, plain red, unstyled gray).
  - All existing and future pages, components, buttons, inputs, cards, and dashboards across Student, Mentor, and Admin modules MUST adhere 100% strictly to this design system token hierarchy.

---

## 2. Architecture & Code Quality Standards

- **Frontend Tech Stack**: React 19, Vite, JavaScript (JSX), Tailwind CSS v4, Redux Toolkit (RTK Query), React Router, React Hook Form + Zod, Lucide React, Sonner.
- **Component Prop Forwarding**: Always destructure custom props (`isDisabled`, `isLoading`, `fullWidth`, `leftIcon`, `rightIcon`, `label`, `error`) in UI components to prevent DOM attribute console warnings on native HTML elements.
- **API Integration**: Use RTK Query (`src/services/api/` and feature APIs) for state management & caching. Never bypass feature services or mutate global state directly in presentation components.
