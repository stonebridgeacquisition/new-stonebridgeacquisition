"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Survey questions
const surveyQuestions = [
  {
    id: 1,
    question: "What's your business name and industry?",
    type: "text-input",
    fields: [
      { name: "businessName", label: "Business Name", required: true },
      { name: "industry", label: "Industry", required: true }
    ]
  },
  {
    id: 2,
    question: "What is your biggest workflow bottleneck right now?",
    options: [
      "Lead handling",
      "Client communication",
      "Content creation",
      "Administrative tasks",
      "Marketing and advertising",
      "Data entry and processing",
      "Customer support",
      "Project management",
      "Sales process",
      "Other (please specify)",
    ],
    type: "multi-select",
  },
  {
    id: 3,
    question: "Do you currently use any automation or AI tools?",
    options: [
      "Yes",
      "No",
    ],
    type: "single-select",
  },
  {
    id: 4,
    question: "Which automation or AI tools do you currently use?",
    type: "text-input",
    fields: [
      { name: "tools", label: "List the tools you use (e.g., Zapier, ChatGPT, etc.)", required: true }
    ],
    condition: {
      questionId: 3,
      answer: "Yes"
    }
  },
  {
    id: 5,
    question: "What is your average monthly revenue?",
    options: [
      "Less than $5,000",
      "$5,000 - $10,000",
      "$10,000 - $25,000",
      "$25,000 - $50,000",
      "$50,000 - $100,000",
      "More than $100,000",
      "Prefer not to say",
    ],
    type: "single-select",
  },
  {
    id: 6,
    question: "What is your revenue goal for the next 6-12 months?",
    type: "text-input",
    fields: [
      { name: "revenueGoal", label: "Revenue Goal ($)", required: false }
    ]
  },
  {
    id: 7,
    question: "How do you currently get clients?",
    options: [
      "Organic content (social media, blog, etc.)",
      "Paid advertising",
      "Referrals",
      "Partnerships",
      "Cold outreach",
      "Events and networking",
      "Other (please specify)",
    ],
    type: "multi-select",
  },
  {
    id: 8,
    question: "How much time do you spend per week on manual tasks?",
    options: [
      "Less than 5 hours",
      "5-10 hours",
      "10-20 hours",
      "20+ hours",
    ],
    type: "single-select",
  },
  {
    id: 9,
    question: "Do you work solo or have a team?",
    options: [
      "Solo",
      "Small team (2-5 people)",
      "Medium team (6-15 people)",
      "Larger team (15+ people)",
    ],
    type: "single-select",
  },
  {
    id: 10,
    question: "How soon would you like to solve these bottlenecks?",
    options: [
      "ASAP (within a month)",
      "1-3 months",
      "3-6 months",
      "6+ months",
    ],
    type: "single-select",
  },
  {
    id: 11,
    question: "What is your estimated budget for automation solutions?",
    options: [
      "Less than $1,000",
      "$1,000 - $3,000",
      "$3,000 - $5,000",
      "$5,000+",
      "Not sure / Need guidance",
    ],
    type: "single-select",
  },
  {
    id: 12,
    question: "What contact information can we use to send your personalized AI audit results?",
    type: "contact-info",
  },
];

export default function AuditSurvey() {
  const router = useRouter();
  // State for current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State for storing answers
  const [answers, setAnswers] = useState<Record<number, any>>({});
  // State for contact information
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  // State for "other" responses
  const [otherResponse, setOtherResponse] = useState("&quot;);
  // State for text inputs
  const [textInputs, setTextInputs] = useState<Record<string, string>>({});

  // Current question
  const currentQuestion = surveyQuestions[currentQuestionIndex];

  // Check if current question should be skipped based on conditions
  React.useEffect(() => {
    if (currentQuestion.condition) {
      const { questionId, answer } = currentQuestion.condition;
      if (answers[questionId] !== answer) {
        // Skip this question if condition not met
        handleNextQuestion();
      }
    }
  }, [currentQuestionIndex]);

  // Handle single select
  const handleSingleSelect = (option: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    });
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      // Move to next question after selection
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setOtherResponse("&quot;); // Reset other response for next question
      }, 300);
    }
  };

  // Handle multi select
  const handleMultiSelect = (option: string) => {
    const currentAnswers = answers[currentQuestion.id] || [];
    let newAnswers;
    
    if (currentAnswers.includes(option)) {
      // Remove if already selected
      newAnswers = currentAnswers.filter((item: string) => item !== option);
    } else {
      // Add if not selected
      newAnswers = [...currentAnswers, option];
    }
    
    setAnswers({
      ...answers,
      [currentQuestion.id]: newAnswers,
    });
  };

  // Handle text input changes
  const handleTextInputChange = (field: string, value: string) => {
    setTextInputs({
      ...textInputs,
      [field]: value,
    });
  };

  // Handle contact info changes
  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the contactInfo state
    setContactInfo(prevInfo => {
      const updatedInfo = {
        ...prevInfo,
        [name]: value,
      };
      
      // Also immediately update the answers state for question 12
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        12: {
          ...updatedInfo
        }
      }));
      
      return updatedInfo;
    });
    
    // Log the update for debugging
    console.log(`Contact info field ${name} updated to: ${value}`);
    console.log("Full contact info:", contactInfo);
  };

  // Handle next question for multi-select and contact info
  const handleNextQuestion = () => {
    // For multi-select, make sure at least one option is selected
    if (currentQuestion.type === "multi-select") {
      const selectedAnswers = answers[currentQuestion.id] || [];
      if (selectedAnswers.length === 0) {
        alert("Please select at least one option");
        return;
      }
    }

    // For text-input, validate required fields
    if (currentQuestion.type === "text-input&quot; && currentQuestion.fields) {
      let isValid = true;
      const textInputAnswers: Record<string, string> = {};
      
      currentQuestion.fields.forEach(field => {
        if (field.required && !textInputs[field.name]) {
          alert(`Please fill in ${field.label}`);
          isValid = false;
          return;
        }
        textInputAnswers[field.name] = textInputs[field.name] || "";
      });
      
      if (!isValid) return;
      
      // Save text inputs to answers
      setAnswers({
        ...answers,
        [currentQuestion.id]: textInputAnswers,
      });
      
      // Clear text inputs for next question
      setTextInputs({});
    }

    // For contact info, validate required fields
    if (currentQuestion.type === "contact-info") {
      if (!contactInfo.name || !contactInfo.email) {
        alert("Please fill in your name and email");
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactInfo.email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Explicitly save contact info to answers for question 12
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        12: {
          name: contactInfo.name,
          email: contactInfo.email,
          phone: contactInfo.phone
        }
      }));
      
      // Log for debugging
      console.log("Contact info saved for question 12:&quot;, {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone
      });
    }

    // Move to next question
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setOtherResponse(""); // Reset other response for next question
    } else {
      // Submit the survey
      handleSubmitSurvey();
    }
  };

  // Handle prev question
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle submit survey
  const handleSubmitSurvey = () => {
    // Here you would typically submit to your backend
    console.log("Survey answers:", answers);
    
    // Store answers in sessionStorage for the thank you page to access
    try {
      // Convert answers to a JSON string and encode for URL safety
      const encodedData = encodeURIComponent(JSON.stringify(answers));
      
      // Store in sessionStorage as a backup
      sessionStorage.setItem('surveyData', encodedData);
      
      // Redirect to thank you page with data in URL
      router.push(`/audit-survey/thank-you?data=${encodedData}`);
    } catch (error) {
      console.error("Error storing survey data:", error);
      // Fallback to basic redirect if there&#39;s an error
      router.push("/audit-survey/thank-you&quot;);
    }
  };

  // Progress percentage
  const progress = ((currentQuestionIndex + 1) / surveyQuestions.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-maroon-50">
      <div className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-maroon-900">
              Free AI Audit for Your Business
            </h1>
            <p className="text-maroon-700 mt-2 max-w-2xl mx-auto">
              Answer a few questions about your business and receive a personalized AI automation audit
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-2xl mx-auto mb-10">
            <div className="flex justify-between text-xs text-maroon-800 mb-1">
              <span>Question {currentQuestionIndex + 1} of {surveyQuestions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-maroon-200 h-2 rounded-full">
              <div 
                className="bg-maroon-800 h-2 rounded-full transition-all duration-300 ease-in-out" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Survey card */}
          <Card className="max-w-2xl mx-auto shadow-md border-maroon-200">
            <CardContent className="p-8">
              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-maroon-900 mb-6">
                  {currentQuestion.question}
                </h2>

                {/* Different input types based on question type */}
                {currentQuestion.type === "single-select&quot; && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => (
                      <div 
                        key={index}
                        onClick={() => handleSingleSelect(option)}
                        className={`p-4 border rounded-md cursor-pointer transition-all ${
                          answers[currentQuestion.id] === option 
                            ? "border-black bg-black text-white" 
                            : "border-gray-200 hover:border-gray-400&quot;
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 flex items-center justify-center ${
                            answers[currentQuestion.id] === option 
                              ? "border-white bg-transparent" 
                              : "border-gray-300"
                          }`}>
                            {answers[currentQuestion.id] === option && (
                              <div className="w-3 h-3 rounded-full bg-white"></div>
                            )}
                          </div>
                          <span className={answers[currentQuestion.id] === option ? "text-white" : "text-maroon-800"}>{option}</span>
                        </div>

                        {/* Other input field */}
                        {option.includes("Other&quot;) && answers[currentQuestion.id] === option && (
                          <div className="mt-3 ml-8">
                            <input
                              type="text"
                              placeholder="Please specify"
                              className="w-full p-2 border border-gray-300 rounded-md text-black"
                              value={otherResponse}
                              onChange={(e) => setOtherResponse(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "multi-select&quot; && (
                  <div className="space-y-3">
                    {currentQuestion.options?.map((option, index) => {
                      const isSelected = (answers[currentQuestion.id] || []).includes(option);
                      return (
                        <div 
                          key={index}
                          onClick={() => handleMultiSelect(option)}
                          className={`p-4 border rounded-md cursor-pointer transition-all ${
                            isSelected 
                              ? "border-black bg-black text-white" 
                              : "border-gray-200 hover:border-gray-400&quot;
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center ${
                              isSelected 
                                ? "border-white bg-transparent" 
                                : "border-gray-300"
                            }`}>
                              {isSelected && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            <span className={isSelected ? "text-white" : "text-maroon-800"}>{option}</span>
                          </div>

                          {/* Other input field */}
                          {option.includes("Other&quot;) && isSelected && (
                            <div className="mt-3 ml-8">
                              <input
                                type="text"
                                placeholder="Please specify"
                                className="w-full p-2 border border-gray-300 rounded-md text-black"
                                value={otherResponse}
                                onChange={(e) => setOtherResponse(e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.type === "text-input&quot; && currentQuestion.fields && (
                  <div className="space-y-4">
                    {currentQuestion.fields.map((field, index) => (
                      <div key={index}>
                        <label className="block text-maroon-800 mb-1">
                          {field.label} {field.required && <span className="text-maroon-600">*</span>}
                        </label>
                        <input
                          type="text"
                          value={textInputs[field.name] || ""}
                          onChange={(e) => handleTextInputChange(field.name, e.target.value)}
                          placeholder={field.label}
                          className="w-full p-3 border border-maroon-200 rounded-md focus:border-maroon-600 focus:ring-1 focus:ring-maroon-600&quot;
                          required={field.required}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {currentQuestion.type === "contact-info&quot; && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-maroon-800 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={contactInfo.name}
                        onChange={handleContactInfoChange}
                        placeholder="John Doe"
                        className="w-full p-3 border border-maroon-200 rounded-md focus:border-maroon-600 focus:ring-1 focus:ring-maroon-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-maroon-800 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={contactInfo.email}
                        onChange={handleContactInfoChange}
                        placeholder="john@example.com"
                        className="w-full p-3 border border-maroon-200 rounded-md focus:border-maroon-600 focus:ring-1 focus:ring-maroon-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-maroon-800 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactInfo.phone}
                        onChange={handleContactInfoChange}
                        placeholder="(123) 456-7890"
                        className="w-full p-3 border border-maroon-200 rounded-md focus:border-maroon-600 focus:ring-1 focus:ring-maroon-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                {currentQuestionIndex > 0 ? (
                  <button
                    onClick={handlePrevQuestion}
                    className="py-2 px-4 rounded bg-white border border-maroon-300 text-maroon-800 hover:bg-maroon-50"
                  >
                    Previous
                  </button>
                ) : (
                  <div>{/* Empty div for flexbox spacing */}</div>
                )}

                {currentQuestion.type === "single-select&quot; ? (
                  <div>{/* No next button for single-select as it auto-advances */}</div>
                ) : (
                  <GradientButton
                    onClick={handleNextQuestion}
                    className="py-2 px-8"
                  >
                    {currentQuestionIndex === surveyQuestions.length - 1 ? "Submit" : "Next&quot;}
                  </GradientButton>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Return to home link */}
          <div className="text-center mt-6">
            <Link href="/" className="text-maroon-700 hover:text-maroon-900 underline text-sm">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 