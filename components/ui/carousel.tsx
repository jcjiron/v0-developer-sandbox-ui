"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext<{
  api: {
    canScrollPrev: boolean
    canScrollNext: boolean
    scrollPrev: () => void
    scrollNext: () => void
  } | null
}>({ api: null })

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    opts?: {
      align?: "start" | "center" | "end"
      loop?: boolean
    }
  }
>(({ className, children, opts, ...props }, ref) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [itemsCount, setItemsCount] = React.useState(0)

  const scrollPrev = React.useCallback(() => {
    if (!containerRef.current) return

    const newIndex = currentIndex > 0 ? currentIndex - 1 : opts?.loop ? itemsCount - 1 : 0
    setCurrentIndex(newIndex)

    const items = containerRef.current.querySelectorAll('[role="group"]')
    if (items[newIndex]) {
      items[newIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: opts?.align || "center",
      })
    }
  }, [currentIndex, itemsCount, opts?.align, opts?.loop])

  const scrollNext = React.useCallback(() => {
    if (!containerRef.current) return

    const newIndex = currentIndex < itemsCount - 1 ? currentIndex + 1 : opts?.loop ? 0 : itemsCount - 1
    setCurrentIndex(newIndex)

    const items = containerRef.current.querySelectorAll('[role="group"]')
    if (items[newIndex]) {
      items[newIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: opts?.align || "center",
      })
    }
  }, [currentIndex, itemsCount, opts?.align, opts?.loop])

  // Count carousel items
  React.useEffect(() => {
    if (containerRef.current) {
      setItemsCount(containerRef.current.querySelectorAll('[role="group"]').length)
    }
  }, [children])

  const canScrollPrev = opts?.loop || currentIndex > 0
  const canScrollNext = opts?.loop || currentIndex < itemsCount - 1

  const api = React.useMemo(
    () => ({
      canScrollPrev,
      canScrollNext,
      scrollPrev,
      scrollNext,
    }),
    [canScrollPrev, canScrollNext, scrollPrev, scrollNext],
  )

  return (
    <CarouselContext.Provider value={{ api }}>
      <div ref={ref} className={cn("relative", className)} {...props}>
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex", className)} {...props} />,
)
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full snap-center", className)}
      {...props}
    />
  ),
)
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { api } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("absolute left-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full", className)}
        disabled={!api?.canScrollPrev}
        onClick={api?.scrollPrev}
        {...props}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    )
  },
)
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { api } = useCarousel()

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("absolute right-3 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full", className)}
        disabled={!api?.canScrollNext}
        onClick={api?.scrollNext}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    )
  },
)
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
