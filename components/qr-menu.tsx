"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { track } from "@vercel/analytics"
import { categories, mainGroups, cardCategories, alcoholicCategories, type DrinkItem, type Category } from "@/lib/menu-data"

// Helper function to convert item names to filename-safe slugs
function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Trim leading/trailing hyphens
}

// Skeleton loader for images
  function ImageSkeleton({ size }: { size: "small" | "large" }) {
    const sizeClasses = size === "large" ? "w-full aspect-square" : "w-20 h-20"
  return <div className={`${sizeClasses} rounded-md bg-muted animate-pulse flex-shrink-0`} />
}

// Placeholder component for items without images
  function ImagePlaceholder({ icon, accentColor, size }: { icon: React.ReactNode; accentColor: string; size: "small" | "large" }) {
    const sizeClasses = size === "large" ? "w-full aspect-square" : "w-20 h-20"
  
  return (
    <div
      className={`${sizeClasses} rounded-md flex items-center justify-center flex-shrink-0`}
      style={{ backgroundColor: `${accentColor}26` }}
    >
      <div style={{ color: accentColor }} className={size === "large" ? "scale-150" : ""}>
        {icon}
      </div>
    </div>
  )
}

// Image with loading state
function DrinkImage({ src, alt, size, icon, accentColor }: { 
  src: string | null | undefined
  alt: string
  size: "small" | "large"
  icon: React.ReactNode
  accentColor: string 
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return <ImagePlaceholder icon={icon} accentColor={accentColor} size={size} />
  }

  const sizeClasses = size === "large" ? "w-full aspect-square" : "w-20 h-20"

  return (
    <div 
      className={`relative ${sizeClasses} rounded-md overflow-hidden flex-shrink-0`}
      style={{ backgroundColor: "#000000" }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes={size === "large" ? "(max-width: 768px) 50vw, 200px" : "80px"}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
}

// Card item component for cocktails/sours/spritz
function CardItem({ item, category }: { item: DrinkItem; category: Category }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div style={{ backgroundColor: "#14110D" }}>
        <DrinkImage 
          src={item.image} 
          alt={item.name} 
          size="large" 
          icon={category.icon} 
          accentColor={category.accentColor} 
        />
      </div>
  <div className="p-3">
  <div className="text-sm font-medium text-foreground leading-tight">{item.name}</div>
  {item.description && (
    <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{item.description}</div>
  )}
  <div
  className="text-lg font-bold mt-1"
  style={{ color: category.accentColor }}
  >
  {item.price}
  </div>
  <div className="text-[11px] leading-tight text-muted-foreground text-left">
    <span className="block whitespace-nowrap">{item.referenceDate}.</span>
    <span className="block whitespace-nowrap">{item.referencePrice}</span>
  </div>
  </div>
    </div>
  )
}

// List item component for all other categories
function ListItem({ item, category }: { item: DrinkItem; category: Category }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-border/30 last:border-0 min-h-[56px]">
      <DrinkImage 
        src={item.image} 
        alt={item.name} 
        size="small" 
        icon={category.icon} 
        accentColor={category.accentColor} 
      />
      <div className="flex-1 min-w-0 pr-2">
        <div className="text-base font-medium text-foreground leading-snug break-words">{item.name}</div>
        {item.size && <div className="text-sm text-muted-foreground mt-0.5 leading-none">{item.size}</div>}
        {item.note && (
          <div className="text-sm text-muted-foreground mt-0.5 leading-snug line-clamp-1">{item.note}</div>
        )}
      </div>
      <div className="w-[80px] text-right flex-shrink-0">
        <div className="text-base font-bold tabular-nums" style={{ color: category.accentColor }}>
          {item.price}
        </div>
        <div className="text-[11px] leading-tight text-muted-foreground">
          <span className="block whitespace-nowrap">{item.referenceDate}.</span>
          <span className="block whitespace-nowrap">{item.referencePrice}</span>
        </div>
      </div>
    </div>
  )
}

// Alcohol disclaimer
function AlcoholDisclaimer() {
  return (
    <p className="text-xs text-muted-foreground/70 mt-4 pt-3 border-t border-border/30 text-center">
      Osobama mlađim od 18 godina zabranjeno je posluživanje i konzumiranje alkoholnih pića.
    </p>
  )
}

export function QRMenu() {
  const [activeGroup, setActiveGroup] = useState("kava")
  const [activeCategory, setActiveCategory] = useState("hot")
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const stickyHeaderRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  // Get current group's categories
  const currentGroup = mainGroups.find((g) => g.id === activeGroup)
  const visibleCategories = categories.filter((c) => currentGroup?.categoryIds.includes(c.id))
  const activeFullCategory = categories.find((c) => c.id === activeCategory)

  // Check if current group has any alcoholic content
  const hasAlcoholicContent = visibleCategories.some((c) => alcoholicCategories.includes(c.id))

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return

        let maxRatio = 0
        let mostVisibleEntry: IntersectionObserverEntry | null = null

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio && currentGroup?.categoryIds.includes(entry.target.id)) {
            maxRatio = entry.intersectionRatio
            mostVisibleEntry = entry
          }
        })

        if (mostVisibleEntry && mostVisibleEntry.isIntersecting) {
          setActiveCategory(mostVisibleEntry.target.id)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        rootMargin: `-${(stickyHeaderRef.current?.offsetHeight || 120) + 8}px 0px -60% 0px`,
      },
    )

    Object.entries(categoryRefs.current).forEach(([id, ref]) => {
      if (ref && currentGroup?.categoryIds.includes(id)) {
        observer.observe(ref)
      }
    })

    return () => observer.disconnect()
  }, [activeGroup, currentGroup?.categoryIds])

  const handleGroupChange = useCallback((groupId: string) => {
    const group = mainGroups.find((g) => g.id === groupId)
    if (group) {
      setIsAnimating(true)
      setActiveGroup(groupId)
      const firstCategoryId = group.categoryIds[0]
      setActiveCategory(firstCategoryId)
      
      track("qr_menu_category_changed", { category_id: groupId, category_name: group.title })
      
      // Scroll to top of content area
      if (contentRef.current) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }

      // Reset animation state
      setTimeout(() => setIsAnimating(false), 150)
    }
  }, [])

  const scrollToCategory = useCallback((categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    if (category) {
      track("qr_menu_category_changed", { category_id: categoryId, category_name: category.title })
    }

    setActiveCategory(categoryId)
    isScrollingRef.current = true

    const element = categoryRefs.current[categoryId]
    if (element) {
      if (categoryId === currentGroup?.categoryIds[0]) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const headerHeight = stickyHeaderRef.current?.offsetHeight || 0
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        window.scrollTo({
          top: elementPosition - headerHeight - 16,
          behavior: "smooth",
        })
      }

      setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)
    }
  }, [])

  return (
    <div className="qr-menu-page min-h-screen pb-8">
      {/* Sticky Header with solid background */}
      <div 
        ref={stickyHeaderRef} 
        className="sticky top-0 z-50 border-b border-border"
        style={{ backgroundColor: "#14110D" }}
      >
        {/* Top bar */}
        <div className="px-4 py-3 flex items-center justify-between gap-4 max-w-full">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-foreground">BOOM</h1>
            <p className="text-xs text-muted-foreground">Coffee & Cocktail bar</p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors min-h-[44px] min-w-[44px] justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Website</span>
          </Link>
        </div>

        {/* Level 1: Main Group Navigation */}
        <div 
          className="overflow-x-auto scrollbar-hide border-t border-border/50"
          style={{ backgroundColor: "#14110D" }}
        >
          <div className="flex gap-2 px-4 py-2.5 min-w-max">
            {mainGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => handleGroupChange(group.id)}
                className={`flex items-center gap-2 px-4 rounded-full text-sm font-medium transition-all whitespace-nowrap min-h-[44px] flex-shrink-0 ${
                  activeGroup === group.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-card text-muted-foreground hover:bg-muted active:bg-muted"
                }`}
              >
                {group.icon}
                {group.title}
              </button>
            ))}
          </div>
        </div>

        {/* Level 2: Sub-category Chips */}
        {visibleCategories.length > 1 && (
          <div 
            className="overflow-x-auto scrollbar-hide border-t border-border/30"
            style={{ backgroundColor: "#1a1a14" }}
          >
            <div className="flex gap-2 px-4 py-2 min-w-max">
              {visibleCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToCategory(category.id)}
                  className={`px-3 rounded-full text-xs font-medium transition-all whitespace-nowrap min-h-[32px] ${
                    activeCategory === category.id
                      ? "bg-accent/20 text-accent border border-accent/40"
                      : "bg-transparent text-muted-foreground hover:text-foreground border border-border/50 active:bg-muted"
                  }`}
                >
                  {category.shortTitle}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Menu Content with fade animation */}
      <div 
        ref={contentRef}
        className={`px-4 pt-4 max-w-full overflow-x-hidden transition-opacity duration-150 relative ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
        style={{ zIndex: 1 }}
      >
        <p className="text-xs text-muted-foreground mb-3">
          Manji iznos ispod cijene = cijena na dan 10.09.2026.
        </p>
        {visibleCategories.map((category) => {
          const isCardLayout = cardCategories.includes(category.id)
          const isAlcoholic = alcoholicCategories.includes(category.id)
          const isLastAlcoholicInGroup = isAlcoholic && 
            visibleCategories.filter(c => alcoholicCategories.includes(c.id)).pop()?.id === category.id
          
          return (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el
              }}
              className="mb-6 scroll-mt-32"
            >
              {/* Category Header with bilingual title */}
              <div className="mb-3 pb-2 border-b border-accent/30 relative" style={{ zIndex: 0 }}>
                <div className="flex items-center gap-2">
                  <div className="text-accent">{category.icon}</div>
                  <h2 className="text-lg font-bold text-foreground uppercase tracking-wide">{category.title}</h2>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 ml-6">
                  {category.titleEn}
                </p>
              </div>

              {isCardLayout ? (
                <div className="grid grid-cols-2 gap-3">
                  {category.items.map((item, index) => (
                    <CardItem key={index} item={item} category={category} />
                  ))}
                </div>
              ) : (
                <div className="space-y-0">
                  {category.items.map((item, index) => (
                    <ListItem key={index} item={item} category={category} />
                  ))}
                </div>
              )}

              {/* Alcohol disclaimer at end of last alcoholic category in group */}
              {isLastAlcoholicInGroup && <AlcoholDisclaimer />}
            </div>
          )
        })}

        {/* Cigarettes disclaimer */}
        {visibleCategories.some(c => c.id === "cigarettes") && (
          <p className="text-xs text-muted-foreground/70 text-center -mt-2 mb-4">
            Zabranjena je prodaja cigareta i duhanskih proizvoda maloljetnicima.
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pt-6 pb-6 text-center">
        <div className="text-xs text-muted-foreground/60 space-y-1.5">
          <p>
            Sve cijene su izražene eurima. Obveznik nije u sustavu PDV-a, PDV nije obračunat na temelju čl. 90 st.1
            Zakona o PDV-u.
          </p>
          <p>Informacije o podnošenju prigovora nalaze se na šanku.</p>
        </div>
        <div className="pt-2 text-center">
          <a
            href="https://mirano-solutions.com/?utm_source=boom-bar.eu&utm_medium=referral&utm_campaign=footer_credit&utm_content=powered_by"
            target="_blank"
            rel="noopener noreferrer"
className="group inline-flex items-center gap-3 opacity-50 hover:opacity-100 hover:text-white transition-all"
  >
  <span className="text-sm">developed by</span>
  <Image src="/mirano-logo.svg" alt="Mirano Solutions" width={480} height={120} className="h-24 w-auto transition-[filter] group-hover:brightness-[1.18]" />
          </a>
        </div>
      </div>
    </div>
  )
}
