import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body for logging only
    const incomingData = await request.json();
    console.log('Webhook received data:', JSON.stringify(incomingData, null, 2));
    
    // Simply log success and return without actually sending to Make.com
    console.log('Successfully logged webhook data (Make.com integration disabled)');
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Data successfully received by webhook handler'
    });
  } catch (error) {
    // Just log any errors
    console.error('Error in webhook handler:', error);
    
    // Always return success
    return NextResponse.json({ 
      success: true,
      message: 'Webhook request processed (error was logged)'
    });
  }
} 