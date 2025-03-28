import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const data = await request.json();
    
    // Log the data we're trying to send (be careful with sensitive info in production)
    console.log('Webhook proxy received data:', JSON.stringify(data));
    
    // Determine which webhook URL to use based on the data
    let webhookUrl: string;
    
    // Check if this is coming from the audit survey (has audit_score field)
    if (data.audit_score !== undefined || data.survey_data !== undefined) {
      // This is audit survey data - send to the audit webhook
      webhookUrl = 'https://hook.eu2.make.com/r7pft94pmuvul4b7t567fwz3ylfq8fn4';
      console.log('Identified as audit data, using audit webhook URL');
    } else {
      // This is contact form or welcome popup data - send to the contact webhook
      webhookUrl = 'https://hook.eu2.make.com/110ry9rcde1i4wask86l6rfl2byiskn4';
      console.log('Identified as contact form or welcome popup data, using contact webhook URL');
    }
    
    console.log(`Forwarding request to Make.com webhook: ${webhookUrl}`);
    
    // Forward the request to Make.com
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Check if the response is successful
    if (!response.ok) {
      const errorText: string = await response.text();
      console.error(`Error from Make.com webhook: Status ${response.status}, Body: ${errorText}`);
      
      // Log all response headers for debugging
      console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));
      
      return NextResponse.json(
        { error: `Failed to send data to webhook: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }
    
    // Try to get the response body for debugging
    let responseBody: string = '';
    try {
      responseBody = await response.text();
      console.log('Response from Make.com:', responseBody);
    } catch (err) {
      console.log('Could not read response body');
    }
    
    // Return success response
    return NextResponse.json({ success: true, response: responseBody || 'OK', webhookUsed: webhookUrl });
  } catch (error) {
    console.error('Error in webhook proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 