"use client"

import * as React from "react"
import { motion, PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: number | string
  name: string
  avatar: string
  description: string
}

interface TestimonialCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[]
  showArrows?: boolean
  showDots?: boolean
  autoPlayInterval?: number
}

const TestimonialCarousel = React.forwardRef<
  HTMLDivElement,
  TestimonialCarouselProps
>(
  (
    { 
      className, 
      testimonials, 
      showArrows = true, 
      showDots = true, 
      autoPlayInterval = 4000,
      ...props 
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [exitX, setExitX] = React.useState<number>(0)
    const [isPaused, setIsPaused] = React.useState(false)

    React.useEffect(() => {
      const timer = setInterval(() => {
        if (!isPaused) {
          setExitX(-200) // Slide left
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            setExitX(0)
          }, 200)
        }
      }, autoPlayInterval)

      return () => clearInterval(timer)
    }, [testimonials.length, autoPlayInterval, isPaused])

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      if (Math.abs(info.offset.x) > 100) {
        setExitX(info.offset.x)
        setTimeout(() => {
          if (info.offset.x > 0) {
            // Dragged right, go to previous
            setCurrentIndex((prev) => 
              prev === 0 ? testimonials.length - 1 : prev - 1
            )
          } else {
            // Dragged left, go to next
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
          }
          setExitX(0)
        }, 200)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "h-96 w-full flex items-center justify-center",
          className
        )}
        {...props}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-full max-w-xl h-80">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex
            const isPrevCard =
              index === (currentIndex + 1) % testimonials.length
            const isNextCard =
              index === (currentIndex + 2) % testimonials.length

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  "absolute w-full h-full rounded-2xl cursor-grab active:cursor-grabbing",
                  "bg-white/80 backdrop-blur-[2px] shadow-xl border border-maroon-200",
                )}
                style={{
                  zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1,
                }}
                drag={isCurrentCard ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(event, info) => {
                  handleDragEnd(event, info)
                  setIsPaused(false)
                }}
                initial={{
                  scale: 0.95,
                  opacity: 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4,
                }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.6 : 0.3,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 20 : isPrevCard ? -2 : -4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-2 flex justify-between px-4">
                    <span 
                      className="text-2xl select-none cursor-pointer text-maroon-300 hover:text-maroon-400"
                      onClick={(e) => {
                        e.stopPropagation()
                        setExitX(200) // Slide right
                        setTimeout(() => {
                          setCurrentIndex((prev) => 
                            prev === 0 ? testimonials.length - 1 : prev - 1
                          )
                          setExitX(0)
                        }, 200)
                      }}
                    >
                      &larr;
                    </span>
                    <span 
                      className="text-2xl select-none cursor-pointer text-maroon-300 hover:text-maroon-400"
                      onClick={(e) => {
                        e.stopPropagation()
                        setExitX(-200) // Slide left
                        setTimeout(() => {
                          setCurrentIndex((prev) => (prev + 1) % testimonials.length)
                          setExitX(0)
                        }, 200)
                      }}
                    >
                      &rarr;
                    </span>
                  </div>
                )}

                <div className="p-8 flex flex-col items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-maroon-200"
                  />
                  <h3 className="text-xl font-semibold text-maroon-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-center text-base text-maroon-800 italic">
                    "{testimonial.description}"
                  </p>
                </div>
              </motion.div>
            )
          })}
          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors cursor-pointer",
                    index === currentIndex
                      ? "bg-maroon-500"
                      : "bg-maroon-200 hover:bg-maroon-300",
                  )}
                  onClick={() => {
                    setExitX(index < currentIndex ? 200 : -200)
                    setTimeout(() => {
                      setCurrentIndex(index)
                      setExitX(0)
                    }, 200)
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)
TestimonialCarousel.displayName = "TestimonialCarousel"

export { TestimonialCarousel, type Testimonial } 