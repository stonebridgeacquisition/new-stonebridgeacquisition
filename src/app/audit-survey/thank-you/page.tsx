"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type AuditResult = {
  overallScore: number;
  automationOpportunities: string[];
  recommendedTools: string[];
  timeEstimate: string;
  costSavingsEstimate: string;
  topPriorities: string[];
};

// Detailed bottleneck analysis and recommendations
interface BottleneckSolution {
  title: string;
  symptoms: string[];
  deliverables: string[];
}

// Function to send data to webhook
const sendToWebhook = async (surveyData: any, auditResults: AuditResult) => {
  try {
    // Use our API route instead of calling Make.com directly
    const proxyUrl = "/api/webhook";
    
    // Extract user contact information
    const contactInfo = surveyData.contactInfo || {};
    
    // Prepare data payload
    const payload = {
      // User contact information
      name: contactInfo.name || "",
      email: contactInfo.email || "",
      business_name: surveyData.businessName || "",
      phone: contactInfo.phone || "",
      
      // Audit results
      audit_score: auditResults.overallScore,
      automation_opportunities: auditResults.automationOpportunities,
      recommended_tools: auditResults.recommendedTools,
      time_estimate: auditResults.timeEstimate,
      cost_savings_estimate: auditResults.costSavingsEstimate,
      top_priorities: auditResults.topPriorities,
      
      // Additional survey data that might be useful
      survey_data: {
        bottlenecks: surveyData.bottlenecks || [],
        using_ai: surveyData.usingAI || "",
        current_tools: surveyData.currentTools || "",
        revenue: surveyData.revenue || "",
        revenue_goal: surveyData.revenueGoal || "",
        client_acquisition: surveyData.clientAcquisition || [],
        manual_hours: surveyData.manualHours || "",
        team_size: surveyData.teamSize || "",
        timeline: surveyData.timeline || "",
        budget: surveyData.budget || ""
      }
    };
    
    console.log("Sending payload to webhook via proxy");
    
    // Send data to our proxy endpoint
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      // No need for CORS mode since we're making a same-origin request
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Webhook error response:", errorData);
      throw new Error(`Failed to send data to webhook: ${response.status}`);
    }
    
    console.log("Successfully sent results to webhook");
    return true;
  } catch (error) {
    console.error("Error sending results to webhook:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

const bottleneckSolutions: Record<string, BottleneckSolution> = {
  "Lead handling": {
    title: "Bottleneck in Lead Generation & Management",
    symptoms: [
      "Inconsistent lead flow or quality",
      "Manual lead qualification taking too much time", 
      "Leads falling through the cracks",
      "No effective lead nurturing system",
      "Lost opportunities due to slow follow-up"
    ],
    deliverables: [
      "Custom Manychat chatbot for Instagram/DM lead capture and qualification",
      "Automated funnel using Make.com (form > CRM > email/SMS sequence)",
      "AI-powered landing page with embedded chatbot for 24/7 lead conversion",
      "Website popup or embedded lead form with CRM integration & tagging system",
      "Lead scoring automation to identify hot prospects"
    ]
  },
  "Client communication": {
    title: "Bottleneck in Client Communication & DM Management",
    symptoms: [
      "Too much time spent manually replying to DMs",
      "Leads not followed up consistently and on time",
      "Delayed responses causing lost opportunities",
      "Same questions being answered repeatedly",
      "Client communication scattered across multiple channels"
    ],
    deliverables: [
      "Manychat + Make.com automation sequences to pre-qualify leads 24/7",
      "Auto-responder for social DMs with intelligent lead routing & tagging",
      "Calendar integration to automatically schedule meetings without back-and-forth",
      "Templated responses for common questions with personalization",
      "Multi-channel communication hub to centralize all client interactions"
    ]
  },
  "Sales process": {
    title: "Bottleneck in Sales Conversion & Closing",
    symptoms: [
      "Leads ghost after initial contact",
      "Low conversion rate from call to client",
      "Inconsistent follow-up process",
      "Time-consuming proposal creation",
      "Difficulty tracking sales pipeline progress"
    ],
    deliverables: [
      "AI proposal generator (personalized PDF offers based on client needs)",
      "Automated proposal follow-up email/text sequences via Make.com",
      "Lead scoring automation to prioritize hot leads and optimize follow-up",
      "Voiceflow bot to handle objections & pre-close before sales calls",
      "Sales pipeline automation with status updates and notifications"
    ]
  },
  "Content creation": {
    title: "Bottleneck in Content Creation & Distribution",
    symptoms: [
      "Time-consuming video/script creation process",
      "Inconsistent posting schedule and quality",
      "Lack of strategic content planning",
      "Manual content distribution across channels",
      "Difficulty measuring content performance"
    ],
    deliverables: [
      "Cursor AI content system for daily/weekly scripts with brand voice",
      "Auto-upload scripts to Notion/Google Docs with collaborative workflow",
      "Make.com workflow to auto-schedule content to Buffer/Publer across channels",
      "Content calendar generator AI tool with strategic planning features",
      "Automated content performance tracking and optimization system"
    ]
  },
  "Administrative tasks": {
    title: "Bottleneck in Administrative Workflows",
    symptoms: [
      "Manual creation of invoices, contracts and proposals",
      "Time-consuming client onboarding process",
      "Disorganized administrative systems",
      "Paper-based or manual document handling",
      "Repetitive data entry across multiple platforms"
    ],
    deliverables: [
      "Make.com automation: invoice + contract + onboarding in 1 click",
      "Custom form for client onboarding with automated document delivery",
      "Stripe + Make integration for auto-billing and payment reminders",
      "AI-powered proposal generator that pulls from audit data",
      "Document management system with automated filing and retrieval"
    ]
  },
  "Customer support": {
    title: "Bottleneck in Client Support & Service Delivery",
    symptoms: [
      "Repeating answers to the same questions",
      "Excessive time spent on routine support issues",
      "Slow response times to client inquiries",
      "Difficulty tracking support requests",
      "Inconsistent client experience"
    ],
    deliverables: [
      "Voiceflow chatbot or FAQ assistant on website to handle common questions",
      "AI assistant that answers queries from existing clients using company data",
      "Help center with searchable knowledge base and automated chatbot integration",
      "Automated check-in sequences for clients at strategic touchpoints",
      "Client portal with self-service options for common requests"
    ]
  },
  "Project management": {
    title: "Bottleneck in Team & Project Management",
    symptoms: [
      "Team tasks unorganized or unclear",
      "Difficulty tracking project progress and deadlines",
      "Communication breakdowns between team members",
      "Inefficient resource allocation",
      "Manual status reporting and updates"
    ],
    deliverables: [
      "Team dashboard with task automation via Make.com",
      "Custom internal tools for real-time workflow visibility and tracking",
      "Automated check-ins/reminders using Slack/Email triggers at key milestones",
      "Workflow templates for recurring projects with auto-assignment",
      "Resource management system with AI optimization"
    ]
  },
  "Marketing and advertising": {
    title: "Bottleneck in Marketing Campaigns & Advertising",
    symptoms: [
      "Inconsistent marketing results",
      "Manual campaign management taking too much time",
      "Difficulty tracking ROI across channels",
      "Ad creative and copy creation bottlenecks",
      "Poor targeting and audience segmentation"
    ],
    deliverables: [
      "Automated marketing campaign management system via Make.com",
      "AI-driven ad creative and copy generation tools",
      "Cross-channel performance tracking dashboard with ROI metrics",
      "Audience segmentation automation with personalized messaging",
      "Marketing calendar with automated execution and reporting"
    ]
  },
  "Data entry and processing": {
    title: "Bottleneck in Data Management & Analysis",
    symptoms: [
      "Manual data entry consuming valuable time",
      "Data scattered across multiple systems",
      "Inconsistent data formats and quality",
      "Difficulty extracting actionable insights",
      "Time-consuming report generation"
    ],
    deliverables: [
      "Automated data entry system using OCR and AI processing",
      "Data integration platform connecting all your business systems",
      "Automated data cleaning and standardization workflows",
      "AI-powered analytics dashboard with real-time insights",
      "Automated report generation and distribution on schedule"
    ]
  }
};

// Budget-specific recommendations
const budgetRecommendations: Record<string, string[]> = {
  "Less than $1,000": [
    "Done-with-you solution (templates, walkthroughs, weekly calls)",
    "Starter package (one high-leverage automation + tutorial)",
    "Mini-audit system you can use on your own",
    "AI tools training and implementation guidance"
  ],
  "$1,000 - $3,000": [
    "Custom automation system (focused on your top bottleneck)",
    "Basic chatbot build + CRM integration",
    "Implementation of 2-3 key automations",
    "30-day support and optimization"
  ],
  "$3,000 - $5,000": [
    "Comprehensive automation system (multi-step workflows)",
    "Full chatbot build + CRM integration",
    "Implementation of 4-5 key automations",
    "60-day support and optimization"
  ],
  "$5,000+": [
    "Full-service automation implementation",
    "Complete audit → strategy → implementation",
    "Custom AI tools development",
    "90-day support and ongoing optimization",
    "Dedicated automation specialist"
  ]
};

// This would ideally come from an actual AI service like OpenAI
const generateAIAudit = (surveyData: any): Promise<AuditResult> => {
  return new Promise((resolve) => {
    // Simulate AI processing time
    setTimeout(() => {
      console.log("Survey data for analysis:", surveyData);
      
      // Base audit result structure
      const result: AuditResult = {
        // Base score determined by several factors
        overallScore: 70, // Default score, will be adjusted
        automationOpportunities: [],
        recommendedTools: [],
        timeEstimate: "",
        costSavingsEstimate: "",
        topPriorities: []
      };
      
      // Score adjustments based on survey responses
      let scoreAdjustments = 0;
      
      // Tools usage affects score (using tools = more automation-ready)
      if (surveyData.usingAI === "Yes" && surveyData.currentTools) {
        scoreAdjustments += 10;
        
        // Add the tools they already use to consider in recommendations
        const toolsList = surveyData.currentTools.toLowerCase();
        
        // If they're already using certain tools, adjust recommendations accordingly
        if (toolsList.includes("make") || toolsList.includes("zapier")) {
          result.recommendedTools.push("Advanced Make.com or Zapier workflows to extend your current automations");
        }
        
        if (toolsList.includes("chatgpt") || toolsList.includes("openai")) {
          result.recommendedTools.push("Custom Cursor AI implementation for your specific workflows");
        }
        
        if (toolsList.includes("manychat")) {
          result.recommendedTools.push("Enhanced Manychat flows with advanced conditional logic");
        }
      } else {
        // Not using AI yet
        scoreAdjustments -= 5;
        result.recommendedTools.push("Starter AI tools bundle (Make.com, Manychat, Cursor AI)");
      }
      
      // Revenue impacts automation potential
      if (surveyData.revenue && (
        surveyData.revenue.includes("$50,000") || 
        surveyData.revenue.includes("$100,000")
      )) {
        scoreAdjustments += 5;
      }
      
      // Team size impacts automation complexity and need
      if (surveyData.teamSize) {
        if (surveyData.teamSize.includes("Medium") || surveyData.teamSize.includes("Larger")) {
          scoreAdjustments += 5;
          result.recommendedTools.push("Team workflow automation system with role-based dashboards");
        }
      }
      
      // Urgency affects recommendation approach
      if (surveyData.timeline === "ASAP (within a month)") {
        result.topPriorities.push("Quick-win automation implementation focused on immediate ROI");
      }
      
      // Analyze bottlenecks and apply specific recommendations
      if (surveyData.bottlenecks && Array.isArray(surveyData.bottlenecks)) {
        // Track which bottlenecks we've processed to avoid duplicates
        const processedBottlenecks = new Set<string>();
        
        // Process each bottleneck with more precise matching
        surveyData.bottlenecks.forEach((bottleneck: string) => {
          // Find matching bottleneck solution
          for (const [key, solution] of Object.entries(bottleneckSolutions)) {
            if (bottleneck.includes(key) && !processedBottlenecks.has(key)) {
              processedBottlenecks.add(key);
              
              // Add the automation opportunity with the specific title
              result.automationOpportunities.push(solution.title);
              
              // Choose 2 most relevant symptoms based on specific bottleneck
              const symptomDescription = solution.symptoms.slice(0, 2).join(" and ");
              if (!result.topPriorities.includes(`Address: ${symptomDescription}`)) {
                result.topPriorities.push(`Address: ${symptomDescription}`);
              }
              
              // Add 2 specific deliverables as priorities, not randomly selected
              // but chosen based on importance for this bottleneck
              const deliverables = solution.deliverables;
              
              // First deliverable is always the most important one
              if (!result.topPriorities.includes(deliverables[0])) {
                result.topPriorities.push(deliverables[0]);
              }
              
              // Second deliverable chosen based on budget if available
              let secondDeliverableIndex = 1;
              if (surveyData.budget) {
                if (surveyData.budget.includes("Less than $1,000")) {
                  // Choose simpler solution for low budget
                  secondDeliverableIndex = 1;
                } else if (surveyData.budget.includes("$5,000+")) {
                  // Choose more comprehensive solution for high budget
                  secondDeliverableIndex = deliverables.length - 1;
                } else {
                  // Middle budget gets a balanced solution
                  secondDeliverableIndex = Math.min(2, deliverables.length - 1);
                }
              }
              
              if (!result.topPriorities.includes(deliverables[secondDeliverableIndex])) {
                result.topPriorities.push(deliverables[secondDeliverableIndex]);
              }
              
              // Add relevant tool recommendations based on the specific bottleneck
              if (key === "Lead handling" || key === "Client communication") {
                result.recommendedTools.push("Manychat + Make.com automation suite");
              } else if (key === "Content creation") {
                result.recommendedTools.push("Cursor AI + content scheduling tools");
              } else if (key === "Administrative tasks") {
                result.recommendedTools.push("Make.com + document automation system");
              } else if (key === "Sales process") {
                result.recommendedTools.push("AI proposal generator + automated follow-up system");
              } else if (key === "Marketing and advertising") {
                result.recommendedTools.push("Make.com marketing automation + AI creative suite");
              } else if (key === "Data entry and processing") {
                result.recommendedTools.push("OCR + data integration platform");
              } else if (key === "Customer support") {
                result.recommendedTools.push("Voiceflow AI chatbot + knowledge base system");
              } else if (key === "Project management") {
                result.recommendedTools.push("Team workflow + Slack/Email automation suite");
              } else {
                result.recommendedTools.push("Custom AI workflow based on your specific needs");
              }
            }
          }
        });
        
        // Score adjustment based on number of bottlenecks
        // More bottlenecks = more potential for improvement
        scoreAdjustments += Math.min(15, surveyData.bottlenecks.length * 3);
      }
      
      // Adjust the overall score based on all factors
      result.overallScore = Math.max(60, Math.min(98, 70 + scoreAdjustments));
      
      // Add budget-specific recommendations if a budget was provided
      if (surveyData.budget) {
        let matchedRecommendations: string[] = [];
        
        for (const [budgetRange, recommendations] of Object.entries(budgetRecommendations)) {
          if (surveyData.budget === budgetRange) {
            matchedRecommendations = recommendations;
            break;
          }
        }
        
        // Add the most relevant budget recommendation based on their specific situation
        if (matchedRecommendations.length > 0) {
          // Choose based on team size
          let recIndex = 0;
          if (surveyData.teamSize) {
            if (surveyData.teamSize.includes("Solo")) {
              recIndex = 0; // First recommendation is typically more DIY friendly
            } else if (surveyData.teamSize.includes("Small")) {
              recIndex = 1; // Second recommendation is balanced
            } else {
              recIndex = Math.min(2, matchedRecommendations.length - 1); // More comprehensive for larger teams
            }
          }
          
          // Add the selected recommendation
          result.topPriorities.push(matchedRecommendations[recIndex]);
        }
      }
      
      // Time savings estimate based on manual task hours - with more precise estimates
      if (surveyData.manualHours) {
        if (surveyData.manualHours === "Less than 5 hours") {
          result.timeEstimate = "2-3 hours per week (40-60% time savings)";
        } else if (surveyData.manualHours === "5-10 hours") {
          result.timeEstimate = "4-6 hours per week (50-70% time savings)";
        } else if (surveyData.manualHours === "10-20 hours") {
          result.timeEstimate = "8-12 hours per week (60-80% time savings)";
        } else if (surveyData.manualHours === "20+ hours") {
          result.timeEstimate = "15+ hours per week (70-85% time savings)";
        }
      } else {
        result.timeEstimate = "5+ hours per week (estimated 60% time savings)";
      }
      
      // Cost savings estimate based on revenue and time saved
      // Now with more precise ROI calculations
      if (surveyData.revenue) {
        if (surveyData.revenue.includes("Less than $5,000")) {
          result.costSavingsEstimate = "$500-1,000 per month (potential 10-20% revenue increase)";
        } else if (surveyData.revenue.includes("$5,000 - $10,000")) {
          result.costSavingsEstimate = "$1,000-2,000 per month (potential 15-25% revenue increase)";
        } else if (surveyData.revenue.includes("$10,000 - $25,000")) {
          result.costSavingsEstimate = "$2,000-5,000 per month (potential 20-30% revenue increase)";
        } else if (surveyData.revenue.includes("$25,000 - $50,000")) {
          result.costSavingsEstimate = "$5,000-10,000 per month (potential 15-25% revenue increase)";
        } else if (surveyData.revenue.includes("$50,000") || surveyData.revenue.includes("$100,000")) {
          result.costSavingsEstimate = "$10,000+ per month (potential 15-20% revenue increase)";
        } else {
          result.costSavingsEstimate = "$2,000-5,000 per month (estimated based on industry averages)";
        }
      } else {
        result.costSavingsEstimate = "$2,000-5,000 per month (estimated based on industry averages)";
      }
      
      // Ensure we have at least some default values if analysis is limited
      if (result.automationOpportunities.length === 0) {
        result.automationOpportunities = [
          "Client communication automation",
          "Document processing automation",
          "Lead management workflow optimization",
          "Content creation and distribution system"
        ];
      }
      
      if (result.recommendedTools.length === 0) {
        result.recommendedTools = [
          "Cursor AI for content and workflow optimization",
          "Make.com for end-to-end workflow automation",
          "Manychat for lead capture and nurturing",
          "Industry-specific CRM with AI capabilities"
        ];
      }
      
      if (result.topPriorities.length === 0) {
        result.topPriorities = [
          "Conduct detailed workflow audit to identify automation opportunities",
          "Start with one high-impact automation project for quick ROI",
          "Implement time-tracking to measure automation effectiveness",
          "Develop an AI implementation roadmap for the next 6-12 months"
        ];
      }
      
      // Remove duplicates
      result.automationOpportunities = [...new Set(result.automationOpportunities)];
      result.recommendedTools = [...new Set(result.recommendedTools)];
      result.topPriorities = [...new Set(result.topPriorities)];
      
      // Limit to top 4 items
      result.automationOpportunities = result.automationOpportunities.slice(0, 4);
      result.recommendedTools = result.recommendedTools.slice(0, 4);
      result.topPriorities = result.topPriorities.slice(0, 4);
      
      resolve(result);
    }, 3000); // 3-second delay to simulate AI processing
  });
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-maroon-50">
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-3xl mx-auto shadow-lg border-maroon-200">
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-8">
                  Loading Results...
                </h1>
                
                <div className="flex flex-col items-center justify-center gap-4 my-12">
                  <Loader2 className="h-12 w-12 text-maroon-600 animate-spin" />
                  <p className="text-maroon-700">
                    Please wait while we load your audit results
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    }>
      <AuditResultsContent />
    </Suspense>
  );
}

function AuditResultsContent() {
  const searchParams = useSearchParams();
  const [auditResults, setAuditResults] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [surveyData, setSurveyData] = useState<any>(null);
  const [webhookStatus, setWebhookStatus] = useState<"idle" | "success" | "error">("idle");
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  
  // Function to handle webhook submission directly in the component
  const handleWebhookSubmission = async (data: any, results: AuditResult) => {
    try {
      setWebhookStatus("idle");
      setWebhookError(null);
      await sendToWebhook(data, results);
      setWebhookStatus("success");
      console.log("Webhook submission successful");
    } catch (error) {
      console.error("Error submitting to webhook:", error);
      setWebhookStatus("error");
      setWebhookError(error instanceof Error ? error.message : String(error));
      
      // Log this to the console for debugging
      if (data?.contactInfo) {
        console.log("Failed to send data for:", {
          name: data.contactInfo.name,
          email: data.contactInfo.email,
          business: data.businessName
        });
      }
    }
  };
  
  // Toggle debug info display
  const toggleDebugInfo = () => {
    setShowDebugInfo(!showDebugInfo);
  };
  
  // Function to download the audit report as PDF or text
  const downloadAuditReport = () => {
    setDownloading(true);
    
    // Get the business name for the filename
    const businessName = surveyData?.businessName || "your-business";
    const safeBusinessName = businessName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    
    try {
      // Create the report content
      let reportContent = `AI AUTOMATION AUDIT REPORT FOR: ${businessName}\n\n`;
      reportContent += `Date: ${new Date().toLocaleDateString()}\n\n`;
      reportContent += `AUTOMATION READINESS SCORE: ${auditResults?.overallScore}%\n\n`;
      
      reportContent += `ESTIMATED TIME SAVINGS: ${auditResults?.timeEstimate}\n`;
      reportContent += `POTENTIAL COST SAVINGS: ${auditResults?.costSavingsEstimate}\n\n`;
      
      reportContent += "TOP AUTOMATION OPPORTUNITIES:\n";
      auditResults?.automationOpportunities.forEach((opportunity, index) => {
        reportContent += `${index + 1}. ${opportunity}\n`;
      });
      reportContent += "\n";
      
      reportContent += "RECOMMENDED TOOLS & TECHNOLOGIES:\n";
      auditResults?.recommendedTools.forEach((tool, index) => {
        reportContent += `${index + 1}. ${tool}\n`;
      });
      reportContent += "\n";
      
      reportContent += "NEXT STEPS & PRIORITIES:\n";
      auditResults?.topPriorities.forEach((priority, index) => {
        reportContent += `${index + 1}. ${priority}\n`;
      });
      reportContent += "\n\n";
      
      reportContent += "To discuss implementing these recommendations, book a free strategy call:\n";
      reportContent += "https://calendly.com/stonebridgeacquisition-c6qp/30min\n\n";
      
      reportContent += "Report generated by StonebrídgeAcquisition AI Audit Tool\n";
      
      // Create a Blob to download
      const blob = new Blob([reportContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeBusinessName}-ai-audit-report.txt`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      console.log("Report downloaded successfully");
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setDownloading(false);
    }
  };
  
  // Function to send the audit report via email
  const sendReportByEmail = async () => {
    // This would typically call an API endpoint to send an email
    // For now, we'll just simulate it
    
    setSendingEmail(true);
    
    try {
      // In a real implementation, you would call your API endpoint
      // await fetch('/api/send-report', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: surveyData?.contactInfo?.email,
      //     auditResults,
      //     businessName: surveyData?.businessName
      //   }),
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Email would be sent to:", surveyData?.contactInfo?.email);
    } catch (error) {
      console.error("Error sending email:", error);
    } finally {
      setSendingEmail(false);
    }
  };
  
  useEffect(() => {
    const analyzeResults = async () => {
      try {
        // Get data from URL or session storage
        const encodedData = searchParams.get('data') || sessionStorage.getItem('surveyData');
        
        if (encodedData) {
          const decodedData = JSON.parse(decodeURIComponent(encodedData));
          
          // Prepare data for AI analysis
          const userData = {
            businessName: decodedData[1]?.businessName || "your business",
            bottlenecks: decodedData[2] || [],
            usingAI: decodedData[3] || "No",
            currentTools: decodedData[4]?.tools || "",
            revenue: decodedData[5] || "",
            revenueGoal: decodedData[6]?.revenueGoal || "",
            clientAcquisition: decodedData[7] || [],
            manualHours: decodedData[8] || "",
            teamSize: decodedData[9] || "",
            timeline: decodedData[10] || "",
            budget: decodedData[11] || "",
            contactInfo: decodedData[12] || {},
          };
          
          // Store the survey data for webhook use
          setSurveyData(userData);
          
          // Generate AI audit based on survey responses
          const results = await generateAIAudit(userData);
          setAuditResults(results);
          
          // Send results to webhook
          handleWebhookSubmission(userData, results);
        } else {
          // Fallback if no data is available
          const results = await generateAIAudit({});
          setAuditResults(results);
          
          // Send fallback results to webhook
          handleWebhookSubmission({}, results);
        }
      } catch (error) {
        console.error("Error analyzing survey data:", error);
        // Provide fallback results
        const fallbackResults = {
          overallScore: 75,
          automationOpportunities: [
            "Client communication automation",
            "Document processing automation",
            "Lead management workflow optimization"
          ],
          recommendedTools: [
            "AI writing assistants",
            "Workflow automation platforms (Make.com)",
            "CRM with AI capabilities",
            "Manychat for lead capture"
          ],
          timeEstimate: "5-10 hours per week",
          costSavingsEstimate: "$1,000-3,000 per month",
          topPriorities: [
            "Audit current workflows to identify automation opportunities",
            "Start with one high-impact automation project",
            "Implement time-tracking to measure ROI"
          ]
        };
        setAuditResults(fallbackResults);
        
        // Send fallback results to webhook
        handleWebhookSubmission({}, fallbackResults);
      } finally {
        setLoading(false);
      }
    };
    
    analyzeResults();
  }, [searchParams]);
  
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-maroon-50">
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-3xl mx-auto shadow-lg border-maroon-200">
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-8">
                  Analyzing Your Responses...
                </h1>
                
                <div className="flex flex-col items-center justify-center gap-4 my-12">
                  <Loader2 className="h-12 w-12 text-maroon-600 animate-spin" />
                  <p className="text-maroon-700">
                    Our AI is analyzing your survey responses and generating personalized automation recommendations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-maroon-50">
      <div className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-lg border-maroon-200 mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-maroon-100 mb-6">
                  <Check className="w-8 h-8 text-maroon-800" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-4">
                  Your AI Automation Audit Results
                </h1>
                
                <p className="text-maroon-700 text-lg mb-6 max-w-xl mx-auto">
                  We&apos;ve analyzed your responses and identified several automation opportunities for your business.
                </p>
                
                {/* Download/Email Report Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 border-maroon-200 text-maroon-800"
                    onClick={downloadAuditReport}
                    disabled={downloading}
                  >
                    {downloading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Download Audit Report
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 border-maroon-200 text-maroon-800"
                    onClick={sendReportByEmail}
                    disabled={sendingEmail || !surveyData?.contactInfo?.email}
                  >
                    {sendingEmail ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                    {surveyData?.contactInfo?.email ? 'Send to My Email' : 'Email Not Provided'}
                  </Button>
                </div>
              </div>
              
              {/* Automation Score */}
              <div className="mb-12">
                <h2 className="text-xl font-semibold text-maroon-900 mb-4 text-center">
                  Your Automation Readiness Score
                </h2>
                
                <div className="flex justify-center mb-2">
                  <div className="w-32 h-32 rounded-full bg-white border-8 border-maroon-600 flex items-center justify-center text-4xl font-bold text-maroon-900">
                    {auditResults?.overallScore}%
                  </div>
                </div>
                
                <p className="text-center text-maroon-700 mb-2">
                  {auditResults?.overallScore && auditResults.overallScore >= 80 
                    ? "Excellent! Your business is well-positioned for AI automation."
                    : auditResults?.overallScore && auditResults.overallScore >= 70
                    ? "Good! Your business has solid potential for AI automation."
                    : "Your business has significant opportunities for improvement with AI automation."}
                </p>
              </div>
              
              {/* Key Insights */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-maroon-200">
                  <h3 className="font-semibold text-maroon-900 text-lg mb-3">Estimated Time Savings</h3>
                  <p className="text-maroon-800 text-2xl font-bold">{auditResults?.timeEstimate}</p>
                  <p className="text-maroon-600 text-sm mt-2">Based on your current manual processes</p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-maroon-200">
                  <h3 className="font-semibold text-maroon-900 text-lg mb-3">Potential Cost Savings</h3>
                  <p className="text-maroon-800 text-2xl font-bold">{auditResults?.costSavingsEstimate}</p>
                  <p className="text-maroon-600 text-sm mt-2">Based on your revenue and business size</p>
                </div>
              </div>
              
              {/* Detailed Recommendations */}
              <div className="space-y-8 mb-10">
                <div>
                  <h3 className="text-xl font-semibold text-maroon-900 mb-4">
                    Top Automation Opportunities
                  </h3>
                  <ul className="space-y-4">
                    {auditResults?.automationOpportunities.map((opportunity, index) => (
                      <li key={index} className="bg-white/80 rounded-lg p-4 border border-maroon-100">
                        <div className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-maroon-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-maroon-800 text-sm font-semibold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-maroon-800 font-semibold">{opportunity}</p>
                            {opportunity.includes("Bottleneck") && (
                              <p className="text-maroon-600 text-sm mt-1 italic">
                                {(() => {
                                  const key = Object.keys(bottleneckSolutions).find(k => 
                                    opportunity.includes(bottleneckSolutions[k].title)
                                  );
                                  return key && bottleneckSolutions[key] ? bottleneckSolutions[key].symptoms[0] : "";
                                })()}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-maroon-900 mb-4">
                    Recommended Tools & Technologies
                  </h3>
                  <ul className="space-y-3">
                    {auditResults?.recommendedTools.map((tool, index) => (
                      <li key={index} className="flex gap-3 items-start bg-white/60 rounded-lg p-3 border border-maroon-100">
                        <div className="w-6 h-6 rounded-full bg-maroon-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-maroon-800 text-sm font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-maroon-800">{tool}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-maroon-900 mb-4">
                    Next Steps & Priorities
                  </h3>
                  <ul className="space-y-3">
                    {auditResults?.topPriorities.map((priority, index) => (
                      <li key={index} className="flex gap-3 items-start bg-white/60 rounded-lg p-3 border border-maroon-100">
                        <div className="w-6 h-6 rounded-full bg-maroon-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-maroon-800 text-sm font-semibold">{index + 1}</span>
                        </div>
                        <p className="text-maroon-800">
                          {priority.startsWith('Address:') ? (
                            <>
                              <span className="font-semibold">Key Issue to Solve:</span> {priority.replace('Address:', '')}
                            </>
                          ) : priority}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="w-full h-px bg-maroon-200 my-10"></div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold text-maroon-900 mb-4">
                  Ready to Implement These Recommendations?
                </h2>
                <p className="text-maroon-700 mb-8 max-w-xl mx-auto">
                  Book a free strategy call with our automation experts to discuss your results and create a personalized implementation plan.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <GradientButton asChild className="px-10">
                    <Link href="https://calendly.com/stonebridgeacquisition-c6qp/30min">
                      BOOK A FREE STRATEGY CALL
                    </Link>
                  </GradientButton>
                  
                  <Link 
                    href="/"
                    className="px-6 py-4 border border-maroon-300 rounded-[11px] text-maroon-800 font-medium hover:bg-maroon-50"
                  >
                    RETURN TO HOME
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-maroon-600">
            <p>A detailed copy of these results has also been sent to your email.</p>
            {webhookStatus === "success" && (
              <p className="mt-2 text-green-600">Your results have been successfully recorded in our system.</p>
            )}
            {webhookStatus === "error" && (
              <p className="mt-2 text-maroon-600">There was an issue saving your results, but don&apos;t worry - we&apos;ve captured your email and will follow up shortly.</p>
            )}
            
            {/* Debugging tool - only visible in development or when manually toggled */}
            <div className="mt-4">
              <button
                onClick={toggleDebugInfo}
                className="text-xs text-maroon-500 underline hover:text-maroon-700"
              >
                {showDebugInfo ? "Hide Debug Info" : "Show Debug Info"}
              </button>
              
              {showDebugInfo && (
                <div className="mt-2 p-4 border border-gray-300 rounded bg-white/50 text-left">
                  <h4 className="font-medium mb-2">Debug Information:</h4>
                  <p><strong>Webhook Status:</strong> {webhookStatus}</p>
                  {webhookError && (
                    <p className="text-red-600"><strong>Error:</strong> {webhookError}</p>
                  )}
                  <div className="mt-2">
                    <p className="font-medium">Contact Data Sent:</p>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-24">
                      {JSON.stringify({
                        name: surveyData?.contactInfo?.name || "None",
                        email: surveyData?.contactInfo?.email || "None",
                        business: surveyData?.businessName || "None",
                        phone: surveyData?.contactInfo?.phone || "None"
                      }, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 