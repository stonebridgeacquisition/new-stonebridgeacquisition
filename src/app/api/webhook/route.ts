import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const data = await request.json();
    
    // Log the data we're trying to send (be careful with sensitive info in production)
    console.log('Webhook proxy received data:', JSON.stringify(data));
    
    // Always use the specific webhook URL provided by the user
    const webhookUrl = 'https://hook.eu2.make.com/r7pft94pmuvul4b7t567fwz3ylfq8fn4';
    console.log(`Forwarding request to Make.com webhook: ${webhookUrl}`);
    
    // Make sure we have properly formatted data
    const formattedData = {
      // User contact information (required)
      name: data.name || "",
      email: data.email || "",
      business_name: data.business_name || "",
      phone: data.phone || "",
      
      // Audit results
      audit_score: data.audit_score,
      automation_opportunities: data.automation_opportunities || [],
      recommended_tools: data.recommended_tools || [],
      time_estimate: data.time_estimate || "",
      cost_savings_estimate: data.cost_savings_estimate || "",
      top_priorities: data.top_priorities || [],
      
      // Include formatted audit summary if available
      formatted_audit_summary: data.formatted_audit_summary || "",
      
      // Include survey data if available
      survey_data: data.survey_data || {}
    };
    
    // Forward the request to Make.com
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });
    
    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from Make.com webhook: Status ${response.status}, Body: ${errorText}`);
      
      // Log all response headers for debugging
      console.log('Response headers:', Object.fromEntries([...response.headers.entries()]));
      
      return NextResponse.json(
        { error: `Failed to send data to webhook: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }
    
    // Try to get the response body for debugging
    let responseBody = '';
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