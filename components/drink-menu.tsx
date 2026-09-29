"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/menu-data"

export function DrinkMenu() {
  const [activeCategory, setActiveCategory] = useState<string>("hot")
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" })
      setTimeout(checkScroll, 300)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <p className="text-xs text-muted-foreground mb-4">
        Manji iznos ispod cijene = cijena na dan 10.09.2026.
      </p>
      {/* Category Navigation */}
      <div className="mb-8 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="relative">
          {showLeftArrow && (
            <div className="absolute left-0 top-0 bottom-4 z-10 flex items-center bg-gradient-to-r from-background via-background to-transparent pr-8 pointer-events-none">
              <Button
                onClick={scrollLeft}
                variant="outline"
                size="icon"
                className="pointer-events-auto shadow-lg bg-white hover:bg-neutral-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          )}

          {showRightArrow && (
            <div className="absolute right-0 top-0 bottom-4 z-10 flex items-center bg-gradient-to-l from-background via-background to-transparent pl-8 pointer-events-none">
              <Button
                onClick={scrollRight}
                variant="outline"
                size="icon"
                className="pointer-events-auto shadow-lg bg-white hover:bg-neutral-100"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all flex-shrink-0 ${
                  activeCategory === category.id
                    ? "bg-neutral-900 text-white shadow-lg"
                    : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
                }`}
              >
                <span className="[&_svg]:w-6 [&_svg]:h-6">{category.icon}</span>
                <span className="font-medium whitespace-nowrap text-sm">{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Category Display */}
      {categories.map((category) => (
        <div key={category.id} className={activeCategory === category.id ? "block" : "hidden"}>
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <div className="text-neutral-900 [&_svg]:w-6 [&_svg]:h-6">{category.icon}</div>
              <h2 className="text-2xl font-bold text-neutral-900">
                {category.title} / {category.titleEn}
              </h2>
            </div>

            <div className="grid gap-3">
              {category.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start gap-4 py-3 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 px-3 rounded transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-neutral-900">{item.name}</div>
                    {item.note && <div className="text-xs text-neutral-500 mt-1 text-pretty">{item.note}</div>}
                  </div>
                  <div className="flex items-start gap-3 flex-shrink-0">
                    {item.size && <span className="text-sm text-neutral-500 leading-6">{item.size}</span>}
                    <div className="flex flex-col items-end text-right">
                      <span className="font-bold text-neutral-900 min-w-[4rem] text-right leading-6">{item.price}</span>
                      <span className="text-[11px] leading-tight text-muted-foreground">
                        <span className="sm:hidden">
                          <span className="block whitespace-nowrap">{item.referenceDate}.</span>
                          <span className="block whitespace-nowrap">{item.referencePrice}</span>
                        </span>
                        <span className="hidden sm:inline whitespace-nowrap">
                          Cijena na {item.referenceDate}.: {item.referencePrice}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
