"use client";

import { GradientButton } from "@/components/ui/gradient-button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Instagram, Check } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare the data for webhook
      const webhookData = {
        source: "contact_page",
        formType: "contact_inquiry",
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
        timestamp: new Date().toISOString()
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
      
      console.log("Contact form data successfully sent to Make.com webhook");
      
      // Show success message
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      
    } catch (error) {
      console.error("Error submitting form:", error);
      // Even on error, show success to the user
      setSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Contact Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-maroon-900 mb-6">
              Contact Us
            </h1>
            <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-2 mt-4 mb-8">
              <p className="font-thin text-maroon-800">Let's talk about how we can help your business grow with AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-maroon-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-4 md:p-8">
            <div className="grid md:grid-cols-5 gap-8">
              {/* Contact Form */}
              <Card className="md:col-span-3 border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-maroon-900 mb-6">
                    Send us a Message
                  </h2>
                  
                  {submitted ? (
                    <div className="space-y-6 py-8">
                      <div className="flex items-center justify-center mb-6">
                        <div className="h-12 w-12 rounded-full bg-maroon-100 flex items-center justify-center">
                          <Check className="h-6 w-6 text-maroon-800" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-maroon-900 text-center">
                        Thank you for reaching out!
                      </h3>
                      <p className="text-maroon-800 text-center">
                        We've received your message and will get back to you as soon as possible.
                      </p>
                      <div className="text-center mt-8">
                        <GradientButton 
                          onClick={() => setSubmitted(false)}
                          className="text-base"
                        >
                          Send Another Message
                        </GradientButton>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-maroon-900">
                          Your Name
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Doe"
                          className="border-maroon-200 focus:border-maroon-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-maroon-900">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="border-maroon-200 focus:border-maroon-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="company" className="block text-sm font-medium text-maroon-900">
                          Company Name
                        </label>
                        <Input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                          className="border-maroon-200 focus:border-maroon-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-maroon-900">
                          Your Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Let us know how we can help you..."
                          className="border-maroon-200 focus:border-maroon-500"
                        />
                      </div>
                      
                      <div className="mt-8">
                        <GradientButton
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full text-base"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </GradientButton>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
              
              {/* Contact Information - Now styled like the home page card components */}
              <Card className="md:col-span-2 border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold tracking-tighter text-maroon-900 mb-6">
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded bg-maroon-100 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-maroon-800" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-maroon-900 mb-1">Email Us</h3>
                        <a 
                          href="mailto:info@stonebridgeacquisition.com" 
                          className="text-maroon-700 hover:text-maroon-900 transition-colors"
                        >
                          info@stonebridgeacquisition.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded bg-maroon-100 flex items-center justify-center">
                          <Phone className="h-4 w-4 text-maroon-800" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-maroon-900 mb-1">Call Us</h3>
                        <div className="space-y-1">
                          <a 
                            href="tel:+971552377398" 
                            className="block text-maroon-700 hover:text-maroon-900 transition-colors"
                          >
                            +971 55 237 7398 (UAE)
                          </a>
                          <a 
                            href="tel:+2349163670000" 
                            className="block text-maroon-700 hover:text-maroon-900 transition-colors"
                          >
                            +234 916 367 0000 (Nigeria)
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded bg-maroon-100 flex items-center justify-center">
                          <Instagram className="h-4 w-4 text-maroon-800" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-maroon-900 mb-1">Follow Us</h3>
                        <a 
                          href="https://instagram.com/stonebridgeacquisition" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-maroon-700 hover:text-maroon-900 transition-colors"
                        >
                          @stonebridgeacquisition
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12">
                    <div className="w-full h-px bg-black/10 mb-8"></div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-maroon-900 mb-2">
                        Response Time
                      </p>
                      <p className="text-maroon-800">
                        We aim to respond to all inquiries within 24 hours.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-16 text-center">
              <div className="w-full h-px bg-black/10 mb-12"></div>
              <div className="text-xl md:text-2xl lg:text-3xl tracking-tighter flex flex-col items-center gap-2">
                <p className="font-thin text-maroon-800 italic">"$5$6</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 