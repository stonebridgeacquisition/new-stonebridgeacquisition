"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TestSheetsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const handleTestSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    
    try {
      // Create a test payload
      const testPayload = {
        name: "Test User",
        email: "test@example.com",
        phone: "555-1234",
        businessName: "Test Business",
        industry: "Technology",
        bottlenecks: ["Lead handling", "Content creation"],
        usingAI: "Yes",
        currentTools: "Zapier, Slack",
        revenue: "$100k-$500k",
        timeOnManualTasks: "10-20 hours",
        teamSize: "2-5",
        score: 65,
        opportunities: "Content automation, Lead handling",
        recommended_tools: "Make.com, Manychat",
        time_savings: "10-15 hours per week",
        cost_savings: "$2000-$5000 per month",
        priorities: "Automating lead capture, Streamlining content creation",
        source: "test-page",
        timestamp: new Date().toISOString()
      };
      
      // Send the payload to our API endpoint
      const response = await fetch("/api/sheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testPayload),
      });
      
      // Parse the response
      const data = await response.json();
      
      // Set the result
      setResult({
        status: response.status,
        statusText: response.statusText,
        data,
      });
      
      console.log("Test completed successfully");
    } catch (error) {
      console.error("Error during test:&quot;, error);
      setResult({
        error: String(error),
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Test Google Sheets Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTestSubmit} className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                This page will send test data to our Google Sheets API endpoint.
              </p>
            </div>
            
            <Button type="submit" disabled={loading}>
              {loading ? "Testing..." : "Run Test&quot;}
            </Button>
            
            {result && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Test Result:</h3>
                <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 