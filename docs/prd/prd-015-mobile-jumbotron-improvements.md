# PRD-015: Mobile Hero Jumbotron Layout Enhancements

## 1. Overview & Objective
This document outlines the product requirements and technical adjustments required to optimize the visual presentation, spacing, and readability of the Hero/Jumbotron section on mobile viewports. 

**Strict Constraint**: The desktop/tablet layouts must remain completely untouched and behave exactly as approved.

---

## 2. Problem Statement
1. **Vertical Crowding**: On small mobile screen heights, placing the content inside a vertically centered container (`min-h-[100dvh] flex items-center`) pushes the top of the text container too close to the floating header pill navigation bar, resulting in an unpolished, crowded look.
2. **Text Scaling & Wrapping**: Using large, fixed heading sizes on narrow viewports forces long Indonesian/English words (such as "Estetis", "Pembuatan", "Aesthetic") to wrap awkwardly, creating jagged or single-word lines.
3. **Over-stretched Buttons**: CTA buttons that expand to full container width look blocky and crude on mobile viewports, lacking a premium B2B SaaS feel.

---

## 3. Requirements

### 3.1 Mobile Spacing & Layout Flow (Viewport < 768px)
- **Natural Spacing Flow**: Transition the container from vertical screen centering to a natural vertical block flow by resetting `min-height` to `min-h-0` on mobile.
- **Header Clearance**: Implement a fixed top padding of `pt-40` (160px) to guarantee a consistent, clean 80px gap between the bottom of the floating header navigation bar and the top of the text.
- **Bottom Margin**: Set a bottom padding of `pb-20` (80px) to provide balanced breathing room below the action buttons.

### 3.2 Heading Typography Scale
- **Responsive Text Size**: Define mobile-first heading classes starting at `text-3xl` for viewport sizes below 640px, scaling to `sm:text-4xl` for small tablets, and maintaining desktop scales up to `lg:text-6xl`.
- **Word Wrapping**: Ensure font rendering uses tight line-heights (`leading-tight`) and tracking (`tracking-tight`) to keep headings balanced and readable without jagged word wraps.

### 3.3 CTA Button Layout
- **Container Max Width**: Restrict the flex-col buttons container to a maximum width of `max-w-xs` (320px) and center it horizontally using `mx-auto`.
- **Inner Alignment**: Center button text inside (`text-center` and `justify-center`) to ensure symmetric alignment when stacked vertically.

### 3.4 Desktop & Tablet Preservation (Viewport >= 768px)
- **Responsive Breakpoints**: All mobile specific styles must be overridden using the `md:` modifier.
- **Centering & Heights**: Desktop viewports must continue using `md:min-h-[100dvh] md:flex md:items-center md:justify-center md:pt-24 md:pb-16` to preserve the approved full-screen centered design.

---

## 4. Design & Class Specification (Tailwind)

| Element | Mobile Styles | Desktop/Tablet Override (`md:`) |
| :--- | :--- | :--- |
| **Section Wrapper** | `relative pt-40 pb-20` | `md:min-h-[100dvh] md:flex md:items-center md:justify-center md:pt-24 md:pb-16` |
| **Heading H1** | `text-3xl sm:text-4xl` | `md:text-5xl lg:text-6xl` |
| **Subtitle P** | `text-base mb-8` | `md:text-lg md:mb-10` |
| **CTA Wrapper** | `flex flex-col gap-4 w-full max-w-xs mx-auto` | `md:flex-row md:max-w-none md:w-auto` |
