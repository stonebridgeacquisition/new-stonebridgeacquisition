# Fix JSX Syntax and Unescaped Entities Throughout Codebase

## Description
This PR addresses critical syntax issues that were preventing successful builds of the application. The changes focus on correcting HTML entities, string termination, and JSX formatting throughout the codebase, fixing over 60 instances of `react/no-unescaped-entities` errors shown in the deployment logs.

## Changes Made
- Fixed string termination issues in the Thank You page contact information section
- Corrected `&quot;` and `&#39;` HTML entities across multiple components
- Properly closed JSX expressions in survey results display
- Resolved webpack build errors caused by malformed JSX
- Added utility scripts to automate entity replacement for future maintenance
- Modified build configuration to improve stability and deployment success
- Ensured successful production build with clean output

## Files Modified
- Main pages: about, audit-survey, contact, and thank-you
- UI components: textarea, stacked-menu, and testimonial
- Added multiple utility scripts for automated fixes
- Updated configuration files: next.config.js, .eslintrc.json, and package.json

## Build Errors Resolved
The PR fixes numerous build errors seen in the Netlify/Vercel deployment logs:
- `' can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. react/no-unescaped-entities`
- `" can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`. react/no-unescaped-entities`
- String termination errors in contact information fields
- Various TypeScript and ESLint warnings

## Testing Completed
- Successfully ran a full production build
- Verified all pages render correctly
- Confirmed contact information displays properly
- Validated that no unescaped entity errors appear in the build logs

## Deployment Instructions
After merging this PR:
1. Pull the latest changes to your local environment
2. Run `npm run build` to verify the build completes successfully
3. Deploy to your hosting environment (Netlify/Vercel)
4. Verify the application loads properly in production
5. Check the deployment logs to confirm no entity or syntax errors

## Related Issues
Resolves build failures due to unescaped entities and string termination issues as seen in the most recent build logs. 