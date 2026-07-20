# Lessons Learned

## Localization & Translation Verification
- **Issue**: Statically hardcoded details (e.g., pricing cards, dropdown lists, WhatsApp templates) don't update when the language context is changed.
- **Lesson**: Ensure all UI elements, dynamic WhatsApp message generators, pricing models, and lists are bound to the translation dictionaries (`lib/dictionaries.ts`) and react to language state changes. Always verify that both language toggles (`ID`/`EN`) result in fully localized screens and links.
