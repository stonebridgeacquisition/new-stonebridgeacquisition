import { NextResponse } from 'next/server';
import { google } from 'googleapis';

// This will store request data in a Google Sheet instead of using Make.com webhook

// Your Google Sheet ID - REPLACE THIS with your actual Google Sheet ID
// The sheet ID is the long string in the sheet URL: https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
const SHEET_ID = '1rxxUGDOOIsbj88pv6JiXaPdC1bX_E4oY4eyVh8qXAJ0'; // ← Replace with your Sheet ID from the URL

// The sheet name where data will be appended (update if you used a different name)
const SHEET_TAB_NAME = 'Sheet1';

// Create a JWT auth client
async function getAuthClient() {
  try {
    // For production, store these credentials securely in environment variables
    // For now, we'll use placeholder values that you'll need to replace
    const credentials = {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || 'YOUR_SERVICE_ACCOUNT_EMAIL',
      private_key: (process.env.GOOGLE_PRIVATE_KEY || 'YOUR_PRIVATE_KEY').replace(/\\n/g, '\n'),
    };

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    return auth;
  } catch (error) {
    console.error('Error getting auth client:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Parse the incoming data
    const data = await request.json();
    console.log('Data received for Google Sheets:', JSON.stringify(data, null, 2));

    // Prepare data for Google Sheets (flatten nested objects if needed)
    const flattenedData = {
      timestamp: new Date().toISOString(),
      name: data.name || data.contactInfo?.name || 'Not provided',
      email: data.email || data.contactInfo?.email || 'Not provided',
      phone: data.phone || data.contactInfo?.phone || 'Not provided',
      business_name: data.business_name || data.businessName || 'Not provided',
      industry: data.industry || 'Not provided',
      bottlenecks: Array.isArray(data.bottlenecks) 
        ? data.bottlenecks.join(', ') 
        : data.bottlenecks || 'Not provided',
      score: data.score || 'Not calculated',
      opportunities: data.opportunities || 'None identified',
      recommended_tools: data.recommended_tools || 'None recommended',
      source: data.source || 'audit-survey',
    };

    console.log('Prepared data for sheets:', flattenedData);
    
    // Attempt to send to Google Sheets - ALWAYS sending, no simulation
    try {
      console.log('Getting auth client...');
      console.log('Using service account email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
      console.log('Private key available:', !!process.env.GOOGLE_PRIVATE_KEY);
      
      const auth = await getAuthClient();
      console.log('Auth client created successfully');
      
      const sheets = google.sheets({ version: 'v4', auth });
      console.log('Google Sheets client created');
      
      // Convert object to row values (array of values)
      const values = Object.values(flattenedData);
      console.log('Values to be inserted:', values);
      
      console.log(`Appending data to sheet ${SHEET_ID}, tab ${SHEET_TAB_NAME}...`);
      // Append data to the sheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_TAB_NAME}!A:Z`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values: [values],
        },
      });
      
      console.log('Data appended to Google Sheet:', response.data);
      
      return NextResponse.json({ 
        success: true, 
        message: 'Data successfully sent to Google Sheets' 
      });
    } catch (sheetsError) {
      console.error('Error sending to Google Sheets:', sheetsError);
      console.error('Error details:', sheetsError instanceof Error ? sheetsError.message : 'Unknown error');
      console.error('Stack trace:', sheetsError instanceof Error ? sheetsError.stack : 'No stack trace available');
      
      // Return success anyway to prevent user-facing errors
      return NextResponse.json({ 
        success: true, 
        message: 'Request processed (though Google Sheets update failed)',
        error: String(sheetsError)
      });
    }
  } catch (error) {
    console.error('Error in Google Sheets API route:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace available');
    
    // Always return success to the client to prevent user-facing errors
    return NextResponse.json({ 
      success: true, 
      message: 'Request received (though processing failed)',
      error: String(error)
    });
  }
} 