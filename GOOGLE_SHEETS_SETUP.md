# Setting Up Google Sheets Integration

This guide will walk you through setting up the Google Sheets integration for your survey responses. 

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the first sheet to something like "Survey Responses"
3. Add the following headers in row 1:
   - Timestamp
   - Name
   - Email  
   - Phone
   - Business Name
   - Industry
   - Bottlenecks
   - Score
   - Opportunities
   - Recommended Tools
   - Source

## Step 2: Create a Google Service Account

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable the Google Sheets API for your project:
   - Search for "Google Sheets API" in the search bar
   - Click on the API result
   - Click "Enable"

4. Create a service account:
   - Go to "Credentials" in the left sidebar
   - Click "Create Credentials" > "Service Account"
   - Enter a name for your service account
   - Click "Create and Continue"
   - For role, select "Editor" (or a more restricted role if needed)
   - Click "Continue" and then "Done"

5. Create service account key:
   - On the Credentials page, click on your newly created service account
   - Go to the "Keys" tab
   - Click "Add Key" > "Create New Key"
   - Select "JSON" and click "Create"
   - The key file will be downloaded to your computer - keep this secure!

## Step 3: Share Your Google Sheet with the Service Account

1. Open your Google Sheet
2. Click the "Share" button in the top right
3. Enter the email address of your service account (it will be something like `your-service-account-name@your-project-id.iam.gserviceaccount.com`)
4. Make sure to give "Editor" access
5. Uncheck "Notify people" and click "Share"

## Step 4: Update Environment Variables

For local development:

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following environment variables:
   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-name@your-project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Content\n-----END PRIVATE KEY-----\n"
   ```
   Note: Make sure to include the entire private key from the JSON file, including the `\n` escape characters.

For production (Vercel):

1. Go to your Vercel project settings
2. Add the same environment variables in the "Environment Variables" section

## Step 5: Update the Google Sheet ID in the Code

1. Open `/src/app/api/sheets/route.ts`
2. Find the line with `const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';`
3. Replace `YOUR_GOOGLE_SHEET_ID` with your actual Google Sheet ID
   - You can find this in the URL of your Google Sheet: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_IS_HERE/edit`
4. Update the `SHEET_TAB_NAME` constant if you named your sheet something other than "Sheet1"

## Testing the Integration

To test if the integration is working:

1. Fill out the survey form
2. After submitting, check your Google Sheet to see if a new row has been added
3. If no data appears, check the console logs for any error messages

## Troubleshooting

- If you see "Error: The caller does not have permission" in the logs, verify that you've shared the Google Sheet with your service account email
- If you're seeing "Error: No key or keyFile set", double-check your environment variables
- In development mode, the actual Google Sheets API call is skipped, and data is only logged to the console

For more detailed assistance, refer to the [Google Sheets API documentation](https://developers.google.com/sheets/api/quickstart/nodejs). 