# Stonebridge Acquisition - Automation Audit System

This is a [Next.js](https://nextjs.org) project that provides businesses with an automation audit through a multi-step survey. After completing the survey, users receive a personalized analysis of their automation opportunities.

## Features

- Multi-step survey with conditional logic
- Real-time analysis of automation opportunities
- Custom audit results based on survey responses
- Google Sheets integration for data collection
- Contact information collection and editing
- Downloadable audit report

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Google Sheets Integration

This project includes integration with Google Sheets to store survey responses. See the `GOOGLE_SHEETS_SETUP.md` file for detailed instructions on setting this up.

You'll need to:
1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create a service account
4. Share your Google Sheet with the service account
5. Add the necessary environment variables

## Project Structure

- `src/app/audit-survey/page.tsx` - Main survey component
- `src/app/audit-survey/thank-you/page.tsx` - Results page after survey completion
- `src/app/api/sheets/route.ts` - API endpoint for Google Sheets integration
- `src/components/` - UI components and form elements

## Environment Variables

Create a `.env.local` file with the following variables:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-name@your-project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Content\n-----END PRIVATE KEY-----\n"
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

When deploying, make sure to add the environment variables in your Vercel project settings.
