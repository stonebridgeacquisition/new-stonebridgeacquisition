"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { GradientButton } from "@/components/ui/gradient-button";

type FormData = {
  name: string;
  email: string;
};

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    // Reset the popup status to make it show every time
    localStorage.removeItem("welcomePopupStatus");
    localStorage.removeItem("welcomePopupLastTime");
    
    // Set a slight delay before showing the popup
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Prepare the data for webhook
      const webhookData = {
        source: "welcome_popup",
        formType: "contact_inquiry",
        name: data.name,
        email: data.email,
        company: "",
        message: "Welcome popup sign-up",
        timestamp: new Date().toISOString(),
      };
      
      // Send data directly to the Make.com webhook
      const webhookUrl = "https://hook.eu2.make.com/110ry9rcde1i4wask86l6rfl2byiskn4";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });
      
      if (!response.ok) {
        throw new Error(`Error sending data: ${response.statusText}`);
      }
      
      console.log("Welcome popup data successfully sent to Make.com webhook");
      
      // Mark that the user has completed the form
      localStorage.setItem("welcomePopupStatus", "completed");
      localStorage.setItem("hasSeenWelcomePopup", "true");
      
      // Close the dialog
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // You could show an error message to the user here
      
      // Even if there's an error, close the popup
      setIsOpen(false);
      
      // And mark it as completed so it doesn&#39;t keep showing
      localStorage.setItem("welcomePopupStatus", "completed");
      localStorage.setItem("hasSeenWelcomePopup", "true");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    // Mark that the user skipped the popup
    localStorage.setItem("welcomePopupStatus", "skipped");
    localStorage.setItem("welcomePopupLastTime", new Date().getTime().toString());
    localStorage.setItem("hasSeenWelcomePopup", "true&quot;);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-maroon-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-maroon-900">Welcome to Stonebridge Acquisition</DialogTitle>
          <DialogDescription className="text-maroon-700 mt-2">
            Get personalized AI insights and automation solutions for your business. Join our community today!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-maroon-900">
              Your Name
            </label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className="border-maroon-200 focus:border-maroon-500"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-maroon-900">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                } 
              })}
              className="border-maroon-200 focus:border-maroon-500"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSkip}
              className="mt-3 sm:mt-0"
              disabled={isSubmitting}
            >
              Skip for now
            </Button>
            <GradientButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Get Started&quot;}
            </GradientButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 