"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check, Instagram, ArrowLeft, ArrowRight } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AboutPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/images/IMG_2309.JPG", "/images/IMG_2311.JPG"];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* About Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-maroon-900 mb-6">
              About Us
            </h1>
            <div className="text-xl md:text-2xl tracking-tighter flex flex-col items-center gap-2 mt-4 mb-8">
              <p className="font-thin text-maroon-800">We&#39;re a digital solutions agency built for the modern business world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-maroon-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto backdrop-blur-[0.5px] rounded-lg p-4 md:p-8">
            <div className="grid md:grid-cols-1 gap-6 md:gap-12">
              <Card className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                <CardContent className="p-8 md:p-10">
                  <div className="prose max-w-none text-maroon-800">
                    <p className="text-lg md:text-xl">
                      At our core, we help businesses unlock growth by automating what slows them down. From lead management and CRM systems to follow-ups and landing pages — we build AI-powered systems that save time, reduce manual work, and boost profits.
                    </p>
                    <p className="text-lg md:text-xl mt-6">
                      We don't do cookie-cutter solutions. Every system we build is tailored to your business, your workflow, and your goals. Whether you&#39;re a startup, a growing team, or an established company, we help you scale faster — with less effort.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 md:mt-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-maroon-900 text-center mb-10">
                Our Approach Is Simple
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {approachPoints.map((point, index) => (
                  <Card key={index} className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px]">
                    <CardContent className="p-6">
                      <div className="flex gap-4 items-start">
                        <div className="mt-1">
                          <div className="h-8 w-8 rounded bg-maroon-100 flex items-center justify-center">
                            <Check className="h-5 w-5 text-maroon-800" />
                          </div>
                        </div>
                        <p className="text-maroon-800 text-lg">{point}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Leadership Section - CEO Profile */}
            <div className="mt-16 md:mt-24">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-maroon-900 text-center mb-10">
                Leadership
              </h2>
              
              <Card className="border-maroon-200 bg-white/30 backdrop-blur-[0.25px] overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative h-[300px] md:h-full">
                      <div className="relative h-full w-full overflow-hidden">
                        {images.map((src, index) => (
                          <div 
                            key={index} 
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                              currentImage === index ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                          >
                            <Image 
                              src={src} 
                              alt={`Salim Kabir - CEO and Founder - Photo ${index + 1}`} 
                              fill
                              className="object-cover object-center"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              priority
                            />
                          </div>
                        ))}
                        
                        {/* Image Navigation */}
                        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-4 z-10">
                          <button 
                            onClick={prevImage}
                            className="w-8 h-8 bg-maroon-900/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors"
                            aria-label="Previous photo"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={nextImage}
                            className="w-8 h-8 bg-maroon-900/70 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-maroon-800 transition-colors"
                            aria-label="Next photo"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 bg-maroon-900/70 backdrop-blur-sm text-white px-4 py-2 rounded">
                        <div className="flex items-center gap-2">
                          <Instagram className="h-4 w-4" />
                          <a 
                            href="https://instagram.com/saalimkabir" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                          >
                            @saalimkabir
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Side */}
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-maroon-900 mb-2">Salim Kabir</h3>
                      <p className="text-maroon-700 text-lg mb-6">CEO & Founder</p>
                      
                      <div className="prose text-maroon-800">
                        <p className="mb-4">
                          With over a decade of experience in business automation and digital transformation, Salim founded Stonebridge Acquisition to help businesses harness the power of AI and smart systems.
                        </p>
                        <p className="mb-4">
                          Combining expertise in technology development with a deep understanding of business operations, Salim specializes in identifying inefficiencies and creating tailored digital solutions that deliver measurable results.
                        </p>
                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-maroon-900 mb-3">Areas of Expertise:</h4>
                          <ul className="space-y-2">
                            {expertise.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="mt-1">
                                  <div className="h-5 w-5 rounded-full bg-maroon-100 flex items-center justify-center">
                                    <Check className="h-3 w-3 text-maroon-800" />
                                  </div>
                                </div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <div className="w-full h-px bg-black/10 mb-12"></div>
              <div className="text-xl md:text-2xl lg:text-3xl tracking-tighter flex flex-col items-center gap-2">
                <p className="font-thin text-maroon-800 italic">"We're not just tech people — we&#39;re partners in your success.&quot;</p>
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
    </div>
  );
}

const approachPoints = [
  "Understand your bottlenecks",
  "Design smarter systems",
  "Help you grow without growing your workload"
];

const expertise = [
  "Business Process Automation",
  "CRM & Lead Management Systems",
  "AI Implementation for Business Growth",
  "Digital Transformation Strategy",
  "Custom Web & Mobile Solutions"
]; 