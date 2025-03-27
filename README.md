# Stonebridge Acquisition Website

This is a [Next.js](https://nextjs.org) project using Next.js 15.2.2 with React 19 and TypeScript.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building the Project

To build the project for production:

```bash
# Standard build with linting (may show TypeScript/ESLint errors)
npm run build

# Netlify build without linting (used for deployment)
npm run netlify-build
```

## Deployment on Netlify

This project is configured for deployment on Netlify:

1. The `netlify.toml` file configures the build settings
2. We use a custom `netlify-build` script to avoid linting errors during deployment
3. Static export is generated in the `out` directory
4. Redirects are handled via `public/_redirects`

### Compatibility Notes

- The project requires Node.js 18 for compatibility (specified in netlify.toml)
- We use `--legacy-peer-deps` for package installation
- For local development with newer Node.js versions, you may encounter compatibility issues

## Project Structure

- `src/app/` - Main application pages and API routes
- `src/components/` - Reusable UI components
- `src/lib/` - Utility functions and shared logic

## Shadcn Components

This project uses Shadcn UI components. To add new components:

```bash
npx shadcn@latest add button
```

Replace "button" with the name of the component you want to add.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
