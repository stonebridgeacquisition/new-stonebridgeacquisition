import * as React from "react"
import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function Feature() {
  return (
    <div className="grid border rounded-lg container p-8 grid-cols-1 gap-8 items-center lg:grid-cols-2">
      <div className="flex gap-10 flex-col">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">Platform</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular text-maroon-900">
              Something new!
            </h2>
            <p className="text-lg leading-relaxed tracking-tight text-maroon-700 max-w-xl text-left">
              Managing a small business today is already tough.
            </p>
          </div>
        </div>
        <div className="lg:pl-6">
          <div className="flex flex-row gap-6 items-start">
            <Check className="w-4 h-4 mt-2 text-maroon-900" />
            <div className="flex flex-col gap-1">
              <p className="text-maroon-900">Easy to use</p>
              <p className="text-maroon-700 text-sm">
                We&apos;ve made it easy to use and understand.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-maroon-100/50 rounded-md aspect-square"></div>
    </div>
  )
} 