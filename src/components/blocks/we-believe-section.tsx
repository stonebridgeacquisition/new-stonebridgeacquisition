"use client";

import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import DotPattern from "@/components/ui/dot-pattern-1";

export function WeBelieveSection() {
  return (
    <section className="pt-4 pb-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex flex-col items-center border border-maroon-800">
            <DotPattern
              width={16}
              height={16}
              cx={1}
              cy={1}
              cr={0.5}
              className="opacity-80"
            />

            <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-maroon-800 text-white" />
            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-maroon-800 text-white" />
            <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-maroon-800 text-white" />
            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-maroon-800 text-white" />

            <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-16">
              <p className="md:text-md text-xs text-maroon-800 lg:text-lg xl:text-2xl">
                We believe
              </p>
              <div className="text-2xl tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl">
                <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                  <h1 className="font-semibold">"AI should be</h1>
                  <p className="font-thin">accessible to</p>
                </div>
                <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                  <p className="font-thin">every business</p>
                  <h1 className="font-semibold">because</h1>
                  <p className="font-thin">smart</p>
                </div>
                <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                  <p className="font-thin">automation</p>
                  <h1 className="font-semibold">leads to faster</h1>
                </div>
                <h1 className="font-semibold">growth..."</h1>
              </div>
              <div className="mt-8 flex justify-center">
                <GradientButton asChild className="text-lg">
                  <Link href="/audit-survey">
                    GET YOUR FREE AI AUDIT
                  </Link>
                </GradientButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 