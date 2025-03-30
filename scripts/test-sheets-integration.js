// Test script for Google Sheets integration
// Run with: node scripts/test-sheets-integration.js
const fetch = require('node-fetch');

async function main() {
  console.log('Testing Google Sheets integration...');
  
  // Sample payload similar to what the survey would send
  const testPayload = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '555-1234',
    businessName: 'Test Business',
    industry: 'Technology',
    bottlenecks: ['Lead handling', 'Content creation'],
    usingAI: 'Yes',
    currentTools: 'Zapier, Slack',
    revenue: '$100k-$500k',
    timeOnManualTasks: '10-20 hours',
    teamSize: '2-5',
    score: 65,
    opportunities: 'Content automation, Lead handling',
    recommended_tools: 'Make.com, Manychat',
    time_savings: '10-15 hours per week',
    cost_savings: '$2000-$5000 per month',
    priorities: 'Automating lead capture, Streamlining content creation',
    source: 'test-script',
    timestamp: new Date().toISOString()
  };
  
  try {
    // Send request to our API endpoint
    console.log('Sending request to API endpoint...');
    
    // Try different ports since the server might be running on a different one
    const ports = [3001, 3002, 3003];
    let response = null;
    
    for (const port of ports) {
      try {
        console.log(`Trying port ${port}...`);
        const url = `http://localhost:${port}/api/sheets`;
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testPayload),
        });
        
        console.log(`Response from port ${port}: ${response.status} ${response.statusText}`);
        
        if (response.ok) {
          console.log(`Successfully connected to port ${port}`);
          break;
        }
      } catch (portError) {
        console.log(`Error connecting to port ${port}: ${portError.message}`);
      }
    }
    
    if (!response || !response.ok) {
      throw new Error('Could not connect to any available port');
    }
    
    // Check content type header to avoid JSON parse errors
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      // Parse and log response as JSON
      const data = await response.json();
      console.log('Response data:', data);
      console.log('✅ Test successful!');
    } else {
      // Handle non-JSON response
      const text = await response.text();
      console.log('Received non-JSON response:', text.substring(0, 150) + '...');
      console.log('❌ Test failed: Non-JSON response received');
    }
  } catch (error) {
    console.error('Error during test:', error);
    console.log('❌ Test failed!');
  }
}

// Run the main function
main().catch(console.error); 