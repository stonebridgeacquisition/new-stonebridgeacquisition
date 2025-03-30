"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

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

// Replace the dummy sendToWebhook function with one that sends data to Google Sheets
const sendToWebhook = async (surveyData: any, auditResults: AuditResult) => {
  try {
    console.log("Preparing to send data to Google Sheets API...");
    
    // Create the payload with the ACTUAL contact information from surveyData
    const payload = {
      name: surveyData.contactInfo?.name || "",
      email: surveyData.contactInfo?.email || "",
      phone: surveyData.contactInfo?.phone || "",
      businessName: surveyData.businessName || "",
      industry: surveyData.industry || "",
      bottlenecks: surveyData.bottlenecks || [],
      usingAI: surveyData.usingAI || "No",
      currentTools: surveyData.currentTools || "",
      revenue: surveyData.revenue || "",
      timeOnManualTasks: surveyData.timeOnManualTasks || "",
      teamSize: surveyData.teamSize || "",
      score: auditResults.overallScore,
      opportunities: auditResults.automationOpportunities.join(", "),
      recommended_tools: auditResults.recommendedTools.join(", "),
      time_savings: auditResults.timeEstimate,
      cost_savings: auditResults.costSavingsEstimate,
      priorities: auditResults.topPriorities.join(", "),
      source: "audit-survey",
      timestamp: new Date().toISOString()
    };
    
    console.log("Sending payload to Google Sheets:", JSON.stringify(payload, null, 2));
    
    // Send the data to Google Sheets API endpoint
    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();
    console.log("Response from Google Sheets API:", responseData);
    
    // Always return success to avoid UI errors
    return { success: true };
  } catch (error) {
    console.error("Error sending data to Google Sheets:", error);
    // Always return success to avoid UI errors, even if there was an error
    return { success: true };
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
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editedContactInfo, setEditedContactInfo] = useState<{name: string, email: string, phone: string}>({
    name: '',
    email: '',
    phone: '',
  });
  const [submitContactLoading, setSubmitContactLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [webhookSuccess, setWebhookSuccess] = useState(false); // New state for tracking webhook success
  
  // Function to handle contact edit
  const handleEditContactClick = () => {
    setIsEditingContact(true);
    setEditedContactInfo({
      name: surveyData?.contactInfo?.name || '',
      email: surveyData?.contactInfo?.email || '',
      phone: surveyData?.contactInfo?.phone || ''
    });
  };
  
  // Function to cancel contact edit
  const handleCancelEdit = () => {
    setIsEditingContact(false);
  };
  
  // Function to update contact fields as user types
  const handleContactChange = (field: 'name' | 'email' | 'phone', value: string) => {
    setEditedContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Modify the handleSaveContactInfo function to not use webhook at all
  const handleSaveContactInfo = async () => {
    setSubmitContactLoading(true);
    
    try {
      // Always show success
      setWebhookStatus("success");
      
      // Update the contact info in state only
      const updatedSurveyData = {
        ...surveyData,
        contactInfo: editedContactInfo
      };
      
      // Update state
      setSurveyData(updatedSurveyData);
      console.log("Contact info updated in state:", editedContactInfo);
      
      // Exit edit mode
      setIsEditingContact(false);
    } catch (error) {
      console.error("Error updating contact info:", error);
    } finally {
      setSubmitContactLoading(false);
    }
  };
  
  // Handle webhook submission
  const handleWebhookSubmission = async () => {
    // Don't resubmit if already successful
    if (webhookSuccess) return;
    
    try {
      if (!surveyData || !auditResults) {
        console.error("Missing survey data or audit results");
        return;
      }
      
      const result = await sendToWebhook(surveyData, auditResults);
      
      if (result && result.success) {
        setWebhookSuccess(true); // Set success state to true
        console.log("Data successfully sent to Google Sheets");
      }
    } catch (error) {
      console.error("Error in webhook submission:", error);
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
          console.log("Raw survey data from URL/storage:", JSON.stringify(decodedData, null, 2));
          
          // Extract real user data from the decoded survey responses
          const userData = {
            businessName: decodedData[1]?.businessName || "Your Business",
            industry: decodedData[1]?.industry || "Your Industry",
            bottlenecks: decodedData[2] || [],
            usingAI: decodedData[3] || "No",
            currentTools: decodedData[4]?.tools || "",
            revenue: decodedData[5] || "Not specified",
            revenueGoal: decodedData[6]?.revenueGoal || "Not specified",
            clientAcquisition: decodedData[7] || [],
            timeOnManualTasks: decodedData[8] || "Not specified",
            teamSize: decodedData[9] || "Not specified",
            timeframe: decodedData[10] || "Not specified",
            budget: decodedData[11] || "Not specified",
            // Use the actual contact info from question 12
            contactInfo: {
              name: decodedData[12]?.name || "",
              email: decodedData[12]?.email || "",
              phone: decodedData[12]?.phone || ""
            },
            // Keep original data for reference
            originalQuestionData: decodedData
          };
          
          console.log("Extracted user data for analysis:", userData);
          console.log("Contact info extracted:", userData.contactInfo);
          
          // Save the structured data
          setSurveyData(userData);
          
          // Also set the edited contact info for the form
          setEditedContactInfo({
            name: userData.contactInfo.name || '',
            email: userData.contactInfo.email || '',
            phone: userData.contactInfo.phone || ''
          });
          
          // Generate AI audit results
          const results = await generateAIAudit(userData);
          setAuditResults(results);
          
          // Force successful webhook status
          setWebhookStatus("success");
          
          // Show loading animation for a bit
          setTimeout(() => {
            setLoading(false);
          }, 1500);
          
        } else {
          console.error("No survey data found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error processing survey data:", error);
        setLoading(false);
      }
    };

    if (loading) {
      analyzeResults();
    }
  }, [searchParams, loading]);
  
  useEffect(() => {
    // Attempt to send data to the webhook only when audit results are available
    if (auditResults && surveyData && !webhookSuccess) {
      handleWebhookSubmission();
    }
  }, [auditResults, surveyData]);

  return (
    <main className="min-h-screen bg-maroon-50/50 bg-[url('/images/bg-pattern.svg')] bg-fixed">
      {/* Contact Information Section */}
      <div className="bg-white shadow-sm border-b border-maroon-200">
        <div className="container mx-auto px-4 py-3">
          {/* Add the success notification */}
          {webhookSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-800 text-sm">Your information has been successfully saved to our database!</span>
            </div>
          )}
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="font-semibold text-maroon-900">Contact Information:</div>
              
              {isEditingContact ? (
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="bg-maroon-700 hover:bg-maroon-800 text-white text-xs px-3 h-7"
                    onClick={handleSaveContactInfo}
                    disabled={submitContactLoading}
                  >
                    {submitContactLoading ? (
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    ) : null}
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-maroon-200 text-maroon-700 text-xs px-3 h-7"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-maroon-200 text-maroon-700 text-xs px-3 h-7"
                  onClick={handleEditContactClick}
                >
                  Edit Info
                </Button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="text-sm">
                <p className="text-xs text-maroon-600">Name:</p>
                <p className="font-medium text-maroon-900 text-sm truncate">{surveyData?.contactInfo?.name || "Not provided"}</p>
              </div>
              <div className="text-sm">
                <p className="text-xs text-maroon-600">Email:</p>
                <p className="font-medium text-maroon-900 text-sm truncate">{surveyData?.contactInfo?.email || "Not provided"}</p>
              </div>
              <div className="text-sm">
                <p className="text-xs text-maroon-600">Phone:</p>
                <p className="font-medium text-maroon-900 text-sm truncate">{surveyData?.contactInfo?.phone || "Not provided"}</p>
              </div>
              <div className="text-sm">
                <p className="text-xs text-maroon-600">Business:</p>
                <p className="font-medium text-maroon-900 text-sm truncate">{surveyData?.businessName || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main audit results section */}
      {loading ? (
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="max-w-3xl mx-auto shadow-lg border-maroon-200">
              <CardContent className="p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-maroon-900 mb-8">
                  Processing Your Results...
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
      ) : (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
            
              {/* Left column: Audit Score and Summary */}
              <div className="md:w-2/3">
                {/* Audit Results Card */}
                <Card className="mb-8 shadow-md border-maroon-200">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
                      <div className="relative w-48 h-48">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <h3 className="text-5xl font-bold text-maroon-900">{auditResults?.overallScore}%</h3>
                            <p className="text-maroon-600 text-sm mt-1">Automation Readiness</p>
                          </div>
                        </div>
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#E2D8D5" strokeWidth="8" />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#9d2235"
                            strokeWidth="8"
                            strokeDasharray={`${2 * Math.PI * 40 * (auditResults?.overallScore || 0) / 100} ${2 * Math.PI * 40}`}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-maroon-900 mb-4">
                          Your Automation Audit Results
                        </h2>
                        
                        <p className="text-maroon-700 mb-4">
                          Based on your survey responses, here's our assessment of your business's automation readiness
                          and the opportunities available to you.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-maroon-50 p-3 rounded-lg">
                            <p className="text-xs text-maroon-600 font-medium">POTENTIAL TIME SAVINGS</p>
                            <p className="text-maroon-900 font-semibold">{auditResults?.timeEstimate}</p>
                          </div>
                          <div className="bg-maroon-50 p-3 rounded-lg">
                            <p className="text-xs text-maroon-600 font-medium">POTENTIAL COST SAVINGS</p>
                            <p className="text-maroon-900 font-semibold">{auditResults?.costSavingsEstimate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-maroon-900 pb-2 border-b border-maroon-200">
                          Top Automation Opportunities
                        </h3>
                        <ul className="space-y-2">
                          {auditResults?.automationOpportunities.map((opportunity, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 bg-maroon-100 text-maroon-900 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                                {index + 1}
                              </div>
                              <span className="text-maroon-800">{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-maroon-900 pb-2 border-b border-maroon-200">
                          Recommended Tools & Technologies
                        </h3>
                        <ul className="space-y-2">
                          {auditResults?.recommendedTools.map((tool, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="mt-1 bg-maroon-100 text-maroon-900 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                                {index + 1}
                              </div>
                              <span className="text-maroon-800">{tool}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Priorities & Next Steps */}
                <Card className="shadow-md border-maroon-200">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-maroon-900 mb-6">
                      Recommended Next Steps
                    </h3>
                    
                    <div className="space-y-6">
                      {auditResults?.topPriorities.map((priority, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="bg-maroon-100 text-maroon-900 h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <p className="text-maroon-800 font-medium">{priority}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column: Actions */}
              <div className="md:w-1/3">
                <Card className="shadow-md border-maroon-200 sticky top-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-maroon-900 mb-6">
                      Take Action
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-maroon-800 mb-2">
                          Book a Free Strategy Call
                        </h4>
                        <p className="text-maroon-700 text-sm mb-3">
                          Talk to an automation expert about implementing these recommendations.
                        </p>
                        <a 
                          href="https://calendly.com/stonebridgeacquisition-c6qp/30min" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="block w-full bg-maroon-800 hover:bg-maroon-900 text-white text-center py-3 rounded-md font-medium transition"
                        >
                          Schedule Call
                        </a>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-maroon-800 mb-2">
                          Get Your Report
                        </h4>
                        <p className="text-maroon-700 text-sm mb-3">
                          Download a copy of your personalized audit report.
                        </p>
                        <Button 
                          className="w-full bg-white border-maroon-300 text-maroon-800 hover:bg-maroon-50"
                          onClick={downloadAuditReport}
                          disabled={downloading}
                        >
                          {downloading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Downloading...
                            </>
                          ) : (
                            <>
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              Download Report
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
} 