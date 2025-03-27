import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const data = await request.json();
    
    // Log the data we're trying to send (be careful with sensitive info in production)
    console.log('Webhook proxy received data:', JSON.stringify(data));
    
    // The Make.com webhook URL
    const webhookUrl: string = 'https://hook.eu2.make.com/110ry9rcde1i4wask86l6rfl2byiskn4';
    
    console.log('Forwarding request to Make.com webhook');
    
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
    let responseBody: string;
    try {
      responseBody = await response.text();
      console.log('Response from Make.com:', responseBody);
    } catch (err) {
      console.log('Could not read response body');
      responseBody = '';
    }
    
    // Return success response
    return NextResponse.json({ success: true, response: responseBody || 'OK' });
  } catch (error) {
    console.error('Error in webhook proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 