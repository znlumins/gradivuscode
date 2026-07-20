# TODO List - Custom Dropdown Contrast Fixes

## Checklist

- `[x]` Fix custom dropdown contrast (`components/ContactForm.tsx`)
  - `[x]` Update selected trigger button text color to `text-text-primary`
  - `[x]` Update options overlay background to `bg-bg-card` and border to `border-border`
  - `[x]` Adjust hover styling classes for menu options to prevent white-on-white text rendering
- `[x]` Verification and Testing
  - `[x]` Run Next.js production build (`npm run build`)
  - `[x]` Verify dropdown readability manually on the local web application

## Review & Verification Summary
- **Custom Dropdown Contrast Fix**: Refactored styling variables in `components/ContactForm.tsx` to hook into the project's light theme variables. The selected dropdown value inside the input trigger container now correctly prints in dark `text-text-primary` (instead of white) for clear visibility on the light input background. Options container styling shifts to `bg-bg-card border border-border shadow-card-hover`, and option item hover is modified to `hover:bg-bg-card-hover hover:text-text-primary`, preventing light-on-light text clipping.
- **Next.js Production Build**: Executed compiler builds successfully without TypeScript or build issues.
