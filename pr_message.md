# Fix JSX Syntax and Unescaped Entities Throughout Codebase

## Description
This PR addresses critical syntax issues that were preventing successful builds of the application. The changes focus on correcting HTML entities, string termination, and JSX formatting throughout the codebase.

## Changes Made
- Fixed string termination issues in the Thank You page contact information section
- Corrected `&quot;` and `&#39;` HTML entities across multiple components
- Properly closed JSX expressions in survey results display
- Resolved webpack build errors caused by malformed JSX
- Added utility scripts to automate entity replacement for future maintenance
- Ensured successful production build with clean output

## Files Modified
- Main pages: about, audit-survey, contact, and thank-you
- UI components: textarea, stacked-menu, and testimonial
- Added multiple utility scripts for automated fixes

## Testing Completed
- Successfully ran a full production build
- Verified all pages render correctly
- Confirmed contact information displays properly

## Deployment Instructions
After merging this PR:
1. Pull the latest changes to your local environment
2. Run `npm run build` to verify the build completes successfully
3. Deploy to your hosting environment (Netlify/Vercel)
4. Verify the application loads properly in production

## Related Issues
Resolves build failures due to unescaped entities and string termination issues 