"use client";

import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { TestimonialCarousel } from "@/components/ui/testimonial";
import { WeBelieveSection } from "@/components/blocks/we-believe-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* We Believe Section - Only on homepage */}
      <WeBelieveSection />

      {/* Free AI Audit Section */}
      <section className="py-16 bg-maroon-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
              <GooeyText
                texts={["FREE", "AI", "AUDIT"]}
                morphTime={1}
                cooldownTime={0.25}
                className="font-bold text-maroon-900"
              />
            </h2>
            <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-2 mt-4 mb-8">
              <div className="flex gap-2">
                <p className="font-semibold text-maroon-900">Not Sure Where to Start</p>
                <p className="font-thin text-maroon-800">with AI?</p>
              </div>
              <p className="font-thin text-maroon-800">Let us show you exactly what to automate first.</p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-xl font-medium text-maroon-900 mb-6">Get a Free AI Audit where we:</p>
              
              <div className="grid md:grid-cols-1 gap-4">
                {auditBenefits.map((benefit, index) => (
                  <Card key={index} className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          <div className="h-6 w-6 rounded bg-maroon-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-maroon-800" />
                          </div>
                        </div>
                        <p className="text-maroon-800">{benefit}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="w-full h-px bg-black/10 mb-12"></div>
            <div className="text-center">
              <div className="text-xl md:text-2xl lg:text-3xl tracking-tighter flex flex-col items-center gap-2">
                <p className="font-thin text-maroon-800 italic">"You&#39;ll walk away with a clear, personalized action plan — no fluff, no jargon.&quot;</p>
              </div>
            </div>
            
            <div className="mt-8">
              <GradientButton asChild className="text-lg">
                <Link href="/audit-survey">FREE AI AUDIT</Link>
              </GradientButton>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-4 md:p-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-maroon-900 mb-4">
                Who We Help & What We Solve
              </h2>
              
              {/* Mobile-optimized subtitle */}
              <div className="md:hidden tracking-tighter text-center text-lg px-2">
                <p className="font-thin text-maroon-800 mb-1">We help <span className="font-semibold text-maroon-900">ambitious businesses</span></p>
                <p>
                  <span className="font-thin text-maroon-800">that are </span>
                  <span className="font-semibold text-maroon-900">ready to grow</span>
                  <span className="font-thin text-maroon-800">:</span>
                </p>
              </div>
              
              {/* Desktop subtitle */}
              <div className="hidden md:flex md:text-2xl tracking-tighter flex-col items-center gap-2">
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">We help</p>
                  <p className="font-semibold text-maroon-900">ambitious businesses</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">that are</p>
                  <p className="font-semibold text-maroon-900">ready to grow</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
              {/* Pain Points Column(s) */}
              <div className="space-y-4 md:space-y-6">
                {painPoints.map((point, index) => (
                  <Card key={index} className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex gap-3 md:gap-4">
                        <div className="mt-1 flex-shrink-0">
                          <div className="h-5 w-5 md:h-6 md:w-6 rounded bg-maroon-100 flex items-center justify-center">
                            <Check className="h-3 w-3 md:h-4 md:w-4 text-maroon-800" />
                          </div>
                        </div>
                        <p className="text-maroon-800 text-sm md:text-base">{point}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Bottom Message */}
            <div className="mt-10 md:mt-12">
              <div className="w-full h-px bg-black/10 mb-8 md:mb-12"></div>
              <div className="text-center">
                {/* Mobile version */}
                <div className="md:hidden tracking-tighter text-center text-lg">
                  <p className="font-thin text-maroon-800 mb-1">
                    We help you <span className="font-semibold text-maroon-900">automate</span> and <span className="font-semibold text-maroon-900">optimize</span>
                  </p>
                  <p className="font-thin text-maroon-800 italic mt-2 mb-3">"using tailored AI solutions for your industry.&quot;</p>
                </div>
                
                {/* Desktop version */}
                <div className="hidden md:flex text-xl md:text-2xl lg:text-3xl tracking-tighter flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <p className="font-thin text-maroon-800">We help you</p>
                    <p className="font-semibold text-maroon-900">automate</p>
                    <p className="font-thin text-maroon-800">and</p>
                    <p className="font-semibold text-maroon-900">optimize</p>
                  </div>
                  <p className="font-thin text-maroon-800 italic">"using tailored AI solutions for your industry.&quot;</p>
                </div>
                
                <div className="mt-6 md:mt-8">
                  <GradientButton asChild className="text-base">
                    <Link href="/audit-survey">START YOUR FREE AI AUDIT</Link>
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automation Solutions Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-4 md:p-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-maroon-900 mb-4">
                Want to Automate & Grow Your Business?
              </h2>
              
              {/* Mobile-optimized subtitle */}
              <div className="md:hidden tracking-tighter text-center text-lg px-2">
                <p className="font-thin text-maroon-800 mb-1">We&#39;ll build the <span className="font-semibold text-maroon-900">systems</span></p>
                <p>
                  <span className="font-thin text-maroon-800">so you can focus on </span>
                  <span className="font-semibold text-maroon-900">closing deals</span>
                </p>
              </div>
              
              {/* Desktop subtitle */}
              <div className="hidden md:flex md:text-2xl tracking-tighter flex-col items-center gap-2">
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">We&#39;ll build the</p>
                  <p className="font-semibold text-maroon-900">systems</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">so you can focus on</p>
                  <p className="font-semibold text-maroon-900">closing deals</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              {automationFeatures.map((feature, index) => (
                <Card key={index} className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex gap-3 md:gap-4">
                      <div className="mt-1 flex-shrink-0">
                        <div className="h-5 w-5 md:h-6 md:w-6 rounded bg-maroon-100 flex items-center justify-center">
                          <Check className="h-3 w-3 md:h-4 md:w-4 text-maroon-800" />
                        </div>
                      </div>
                      <p className="text-maroon-800 text-sm md:text-base">{feature}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 md:mt-12">
              <div className="w-full h-px bg-black/10 mb-8 md:mb-12"></div>
              <div className="text-center">
                {/* Mobile version */}
                <div className="md:hidden tracking-tighter text-center text-lg">
                  <p className="font-thin text-maroon-800 mb-1">
                    <span className="font-semibold text-maroon-900">Done-For-You</span> or <span className="font-semibold text-maroon-900">Hybrid Support</span>
                  </p>
                  <p className="font-thin text-maroon-800 italic mt-2 mb-3">"– your choice.&quot;</p>
                </div>
                
                {/* Desktop version */}
                <div className="hidden md:flex text-xl md:text-2xl lg:text-3xl tracking-tighter flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <p className="font-semibold text-maroon-900">Done-For-You</p>
                    <p className="font-thin text-maroon-800">or</p>
                    <p className="font-semibold text-maroon-900">Hybrid Support</p>
                  </div>
                  <p className="font-thin text-maroon-800 italic">"– your choice.&quot;</p>
                </div>
                
                <div className="mt-6 md:mt-8">
                  <GradientButton asChild className="text-lg">
                    <Link href="/audit-survey">GET YOUR FREE AI AUDIT NOW</Link>
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Centered Heading */}
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-maroon-900 mb-4">
                Wondering If It Works?
              </h2>
              <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">Here&#39;s What</p>
                  <p className="font-semibold text-maroon-900">Our Clients</p>
                  <p className="font-thin text-maroon-800">Say:</p>
                </div>
              </div>
            </div>

            <TestimonialCarousel 
              testimonials={TESTIMONIAL_DATA}
              className="max-w-3xl mx-auto"
              showArrows={true}
              showDots={true}
            />

            <div className="mt-16 text-center">
              <div className="w-full h-px bg-black/10 mb-12"></div>
              <div className="text-xl md:text-2xl lg:text-3xl tracking-tighter flex flex-col items-center gap-2">
                <p className="font-thin text-maroon-800">These are just a few success stories from</p>
                <div className="flex gap-2">
                  <p className="font-semibold text-maroon-900">businesses</p>
                  <p className="font-thin text-maroon-800">we&#39;ve helped</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-semibold text-maroon-900">automate</p>
                  <p className="font-thin text-maroon-800">and</p>
                  <p className="font-semibold text-maroon-900">grow.</p>
                </div>
                <p className="font-thin text-maroon-800 italic">"Your story could be next.&quot;</p>
              </div>
              <div className="mt-8">
                <GradientButton asChild className="text-lg">
                  <Link href="/audit-survey">START WITH A FREE AI AUDIT</Link>
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-maroon-900 mb-4">
                Worried It Won&#39;t Work for You?
              </h2>
              <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">We remove all the</p>
                  <p className="font-semibold text-maroon-900">risk</p>
                  <p className="font-thin text-maroon-800">with our guarantee:</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <div className="h-12 w-12 rounded bg-maroon-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-maroon-800">30</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-maroon-900 text-lg mb-2">30-Day Risk-Free Guarantee</h3>
                      <p className="text-maroon-800">If you're not satisfied, you don&#39;t pay</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      <div className="h-12 w-12 rounded bg-maroon-100 flex items-center justify-center">
                        <Check className="h-6 w-6 text-maroon-800" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-maroon-900 text-lg mb-2">Results Guarantee</h3>
                      <p className="text-maroon-800">We&#39;ll keep working with you until you see real results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12">
              <div className="w-full h-px bg-black/10 mb-12"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl tracking-tighter flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <p className="font-thin text-maroon-800">You have</p>
                    <p className="font-semibold text-maroon-900">nothing to lose</p>
                    <p className="font-thin text-maroon-800">—</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-thin text-maroon-800">and</p>
                    <p className="font-semibold text-maroon-900">automation</p>
                    <p className="font-thin text-maroon-800">to gain.</p>
                  </div>
                  <p className="font-thin text-maroon-800 italic">"Nothing to lose, everything to gain.&quot;</p>
                </div>
                <div className="mt-8">
                  <GradientButton asChild className="text-lg">
                    <Link href="/audit-survey">BEGIN WITH A FREE AI AUDIT</Link>
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Value Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-maroon-900 mb-4">
                Want Even More Value?
              </h2>
              <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-2">
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">Get these</p>
                  <p className="font-semibold text-maroon-900">exclusive bonuses</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-thin text-maroon-800">at</p>
                  <p className="font-semibold text-maroon-900">no extra cost</p>
                  <p className="font-thin text-maroon-800">when you work with us:</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bonusFeatures.map((bonus, index) => (
                <div 
                  key={index} 
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-maroon-100/50 to-maroon-200/50 rounded-lg blur-xl transition-all duration-500 group-hover:scale-105 opacity-50"></div>
                  <div className="relative bg-white/30 backdrop-blur-[0.25px] border border-maroon-200 rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
                    <div className="flex gap-4 items-start">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded bg-maroon-100 flex items-center justify-center">
                          <span className="text-maroon-800 font-semibold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-maroon-900 mb-2">{bonus.title}</h3>
                        <p className="text-maroon-700 text-sm">{bonus.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <div className="w-full h-px bg-black/10 mb-12"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl tracking-tighter flex flex-col items-center gap-2">
                  <div className="flex gap-2">
                    <p className="font-thin text-maroon-800">All included,</p>
                    <p className="font-semibold text-maroon-900">completely free,</p>
                  </div>
                  <p className="font-thin text-maroon-800 italic">"when you partner with us.&quot;</p>
                </div>
                <div className="mt-8">
                  <GradientButton asChild className="text-lg">
                    <Link href="/audit-survey">CLAIM YOUR FREE AI AUDIT</Link>
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-maroon-900 mb-4">
                Ready to Start? Don&#39;t Wait.
              </h2>
              <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-maroon-900">
                  <span className="text-2xl md:text-3xl">⚠️</span>
                  <p className="font-semibold">We&#39;re only accepting 10 new clients this month</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="w-full h-px bg-black/10 mb-12"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl lg:text-3xl tracking-tighter flex flex-col items-center gap-2">
                  <p className="font-thin text-maroon-800 italic">"Every day you wait, your competitors get ahead with AI. Don&#39;t miss your chance to automate and grow.&quot;</p>
                </div>
                <div className="mt-8">
                  <GradientButton asChild className="text-lg">
                    <Link href="/audit-survey">GET YOUR FREE AI AUDIT</Link>
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section with Timer */}
      <section className="py-24 bg-maroon-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-8">
            {/* Centered Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-maroon-900 mb-4">
                Want to Automate & Scale Your Business?
              </h2>
              <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-2">
                <p className="font-thin text-maroon-800">Let&#39;s build your AI systems and help you grow faster.</p>
              </div>
            </div>

            <div className="text-center">
              <GradientButton asChild className="text-xl px-12 py-5">
                <Link href="/audit-survey">START YOUR FREE AI AUDIT</Link>
              </GradientButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const auditFeatures = [
  {
    title: "Process Analysis",
    description: "We analyze your current workflows and identify processes that can be enhanced through AI automation.&quot;,
    icon: (
      <svg className="w-6 h-6 text-maroon-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "AI Opportunity Map",
    description: "Get a detailed map of where AI can create the most impact in your business operations.&quot;,
    icon: (
      <svg className="w-6 h-6 text-maroon-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    title: "ROI Projection",
    description: "Receive clear projections of potential cost savings and efficiency gains through AI implementation.&quot;,
    icon: (
      <svg className="w-6 h-6 text-maroon-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const painPoints = [
  "Drowning in manual tasks (data entry, client follow-ups, scheduling, etc.)",
  "Struggling with inefficiencies in lead management, CRM systems, and workflows",
  "Missing out on AI integration that could streamline operations and boost profitability",
];

const auditBenefits = [
  "Identify your biggest time-wasting tasks",
  "Find the fastest wins for automation",
  "Show you how to integrate AI without disrupting your workflow",
];

const automationFeatures = [
  "Custom AI automations (leads, onboarding, workflows)",
  "AI chatbots to qualify and nurture leads 24/7",
  "CRM and system integrations",
  "Automated follow-ups (emails, texts, reminders)",
  "Landing pages and funnels to convert more leads",
  "Dashboards to track your numbers in real-time",
];

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: "Devouge Couture",
    avatar: "/images/DVC.jpg",
    description: "The website and CRM they built for me was exactly what I needed. It's clean, easy to use, and already making my daily operations a lot easier."
  },
  {
    id: 2,
    name: "New Homes Consultants",
    avatar: "/images/NHC.jpg",
    description: "What stood out the most was how easy it was to work with them. Clear communication, quick turnaround, and a deep understanding of what my business needed. Couldn&#39;t ask for more."
  },
  {
    id: 3,
    name: "Archlid Ltd",
    avatar: "/images/ARCH.jpg",
    description: "I had no idea where to start with automating my business until I found them. They took the time to understand my workflow and came up with solutions that actually work and save me a lot of hours every week."
  }
];

const bonusFeatures = [
  {
    title: "AI Playbook",
    description: "Your step-by-step guide to automating faster",
  },
  {
    title: "Pre-built Automation Templates",
    description: "Ready to plug & play templates for immediate use",
  },
  {
    title: "CRM Toolkit",
    description: "Tailored specifically for your business needs",
  },
  {
    title: "Private 1-on-1 Strategy Call",
    description: "Free consultation to map your AI rollout",
  },
  {
    title: "Priority Support Upgrade",
    description: "Fast-track your success with premium support&quot;,
  }
];
