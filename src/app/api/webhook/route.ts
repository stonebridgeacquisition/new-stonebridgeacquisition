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
    
    // Extract contact information fields and clean them
    // This handles both direct fields and nested contactInfo structure
    // Priority: Get from direct fields (from top-right corner edit) then from contactInfo
    const name = data.name || (data.contactInfo?.name) || '';
    const email = data.email || (data.contactInfo?.email) || '';
    const phone = data.contactInfo?.phone || '';
    const business_name = data.business_name || data.businessName || '';
    
    // More aggressive cleaning of contact information fields
    const cleanName = name ? (name === "None" ? "" : name.trim()) : "";
    const cleanEmail = email ? (email === "None" ? "" : email.trim()) : "";
    const cleanPhone = phone ? (phone === "None" ? "" : phone.trim()) : "";
    const cleanBusinessName = business_name ? (business_name === "None" ? "" : business_name.trim()) : "";
    
    // Log the extracted contact information
    console.log('Contact information extracted:', {
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      business_name: cleanBusinessName
    });
    
    // Create a simplified payload - only send what's absolutely needed
    // Make.com sometimes rejects complex nested structures
    const simplePayload = {
      // User contact information - prioritize these fields
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      business_name: cleanBusinessName,
      
      // Main data points needed
      automation_opportunities: Array.isArray(data.automation_opportunities) 
        ? data.automation_opportunities 
        : (Array.isArray(data.auditResults?.automationOpportunities)
            ? data.auditResults.automationOpportunities
            : (typeof data.automation_opportunities_text === 'string' 
                ? data.automation_opportunities_text 
                : "")),
      
      recommended_tools: Array.isArray(data.recommended_tools) 
        ? data.recommended_tools 
        : (Array.isArray(data.auditResults?.recommendedTools)
            ? data.auditResults.recommendedTools
            : (typeof data.recommended_tools_text === 'string' 
                ? data.recommended_tools_text 
                : "")),
      
      top_priorities: Array.isArray(data.top_priorities) 
        ? data.top_priorities 
        : (Array.isArray(data.auditResults?.topPriorities)
            ? data.auditResults.topPriorities
            : (typeof data.top_priorities_text === 'string' 
                ? data.top_priorities_text 
                : ""))
    };
    
    // Log the cleaned payload
    console.log('Sending simplified payload to webhook:', JSON.stringify(simplePayload));
    
    // Forward the request to Make.com
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(simplePayload),
    });
    
    // Check if the response is successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from Make.com webhook: Status ${response.status}, Body: ${errorText}`);
      
      // Return detailed error for debugging
      return NextResponse.json(
        { error: `Failed to send data to webhook: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Data successfully sent to webhook'
    });
  } catch (error) {
    console.error('Error in webhook proxy:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 