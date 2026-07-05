"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Coffee,
  Beer,
  Wine,
  Martini,
  Droplets,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Cigarette,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type DrinkCategory = {
  id: string
  title: string
  icon: React.ReactNode
  items: DrinkItem[]
}

type DrinkItem = {
  name: string
  size?: string
  price: string
  note?: string
}

const categories: DrinkCategory[] = [
  {
    id: "hot",
    title: "Topli Napitci / Warm Drinks",
    icon: <Coffee className="w-6 h-6" />,
    items: [
      { name: "Kava espresso", size: "šal./cup", price: "€ 2,00" },
      { name: "Kava s mlijekom mala", size: "šal./cup", price: "€ 2,20" },
      { name: "Kava s mlijekom velika", size: "šal./cup", price: "€ 2,40" },
      { name: "Kava sa šlagom mala", size: "šal./cup", price: "€ 2,20" },
      { name: "Kava sa šlagom velika", size: "šal./cup", price: "€ 2,50" },
      { name: "Cappuccino", size: "šal./cup", price: "€ 2,60" },
      { name: "Cappuccino mali", size: "šal./cup", price: "€ 2,30" },
      { name: "Bijela kava", size: "šal./cup", price: "€ 3,20" },
      { name: "Kava bez kofeina", size: "šal./cup", price: "€ 2,30" },
      { name: "Kava bez kofeina s mlijekom", size: "šal./cup", price: "€ 2,60" },
      { name: "Cappuccino bez kofeina", size: "šal./cup", price: "€ 2,70" },
      { name: "Bijela kava bez kofeina / decaff. White coffee", size: "šal./cup", price: "€ 3,30" },
      { name: "Kava - zamjensko mlijeko", size: "šal./cup", price: "€ 2,60" },
      { name: "Bijela kava - zamjensko mlijeko", size: "šal./cup", price: "€ 3,40" },
      { name: "Čaj (med-limun)", size: "šal./cup", price: "€ 3,00" },
      { name: "Nescafe", size: "šal./cup", price: "€ 3,20" },
      { name: "Ledena kava", size: "šal./cup", price: "€ 3,50" },
      { name: "Kit-Kat Kakao", size: "šal./cup", price: "€ 3,20" },
      { name: "Kakao", size: "šal./cup", price: "€ 3,20" },
      { name: "Vruća čokolada", size: "šal./cup", price: "€ 4,00" },
      { name: "Vruća čokolada sa šlagom", size: "šal./cup", price: "€ 4,00" },
      { name: "Šlag", size: "šal./cup", price: "€ 1,50" },
      { name: "Med", size: "vreć./dose", price: "€ 0,50" },
      { name: "Babychino", size: "šal./cup", price: "€ 1,50" },
      { name: "Mlijeko / milk", size: "šal./cup", price: "€ 1,00" },
    ],
  },
  {
    id: "soft",
    title: "Bezalkoholna Pića / Non-Alcoholic Drinks",
    icon: <Droplets className="w-6 h-6" />,
    items: [
      { name: "Coca-Cola", size: "0,25 l", price: "€ 3,50" },
      { name: "Coca-Cola Zero Sugar", size: "0,25 l", price: "€ 3,50" },
      { name: "Fanta", size: "0,25 l", price: "€ 3,50" },
      { name: "Sprite", size: "0,25 l", price: "€ 3,50" },
      {
        name: "Schweppes",
        size: "0,25 l",
        price: "€ 3,50",
        note: "Tonic Water, Bitter Lemon, Tangerine, Tonic Water Slimline, Pink Grapefruit, Pomegranate",
      },
      { name: "Thomas Henry Tonic Water", size: "0,20 l", price: "€ 4,10" },
      { name: "Thomas Henry Cherry Blossom", size: "0,20 l", price: "€ 4,10" },
      { name: "Cockta", size: "0,275 l", price: "€ 3,50" },
      { name: "Hidra", size: "0,50 l", price: "€ 3,80" },
      { name: "Cedevita", size: "0,25 l", price: "€ 3,50" },
      { name: "Red Bull", size: "0,25 l", price: "€ 4,50" },
      { name: "Jana Ledeni čaj", size: "0,33 l", price: "€ 3,50", note: "breskva, šumsko voće" },
      { name: "Prirodni sok (razni okusi)", size: "0,20 l", price: "€ 3,50" },
    ],
  },
  {
    id: "juices",
    title: "Cijeđeni Sokovi / Fresh Juices",
    icon: <Sparkles className="w-6 h-6" />,
    items: [
      { name: "Limunada", size: "0,25 l", price: "€ 3,60" },
      { name: "Limunada sa đumbirom", size: "0,25 l", price: "€ 3,60" },
      { name: "Naranča", size: "0,25 l", price: "€ 4,40" },
      { name: "Jabuka", size: "0,25 l", price: "€ 4,40" },
      { name: "Mrkvoslav", size: "0,25 l", price: "€ 4,80", note: "naranča, jabuka, mrkva" },
      { name: "Citrusni Cirkus", size: "0,25 l", price: "€ 4,80", note: "naranča, jabuka, limun" },
      { name: "Roza", size: "0,25 l", price: "€ 4,80", note: "jabuka, cikla, đumbir" },
      { name: "Ljutko", size: "0,25 l", price: "€ 4,80", note: "jabuka, ananas, đumbir" },
    ],
  },
  {
    id: "water",
    title: "Prirodna Mineralna Voda / Natural Mineral Water",
    icon: <Droplets className="w-6 h-6" />,
    items: [
      { name: "Jana negazirana prirodna mineralna voda", size: "0,33 l", price: "€ 3,00" },
      { name: "Jana vitamin happy - naranča", size: "0,33 l", price: "€ 3,00" },
      { name: "Jana vitamin Immuno - limun", size: "0,33 l", price: "€ 3,00" },
      { name: "Jamnica, gazirana prirodna mineralna voda", size: "1,00 l", price: "€ 5,50" },
      { name: "Jamnica, gazirana prirodna mineralna voda", size: "0,33 l", price: "€ 3,50" },
      { name: "Sensation", size: "0,25 l", price: "€ 3,50", note: "limunska trava, bazga/limun, kiwano" },
      { name: "Jana negazirana prirodna mineralna voda", size: "0,75 l", price: "€ 5,00" },
      { name: "Romerquelle Limunska trava", size: "0,33 l", price: "€ 3,50" },
    ],
  },
  {
    id: "beer",
    title: "Pivo / Beer",
    icon: <Beer className="w-6 h-6" />,
    items: [
      { name: "Ožujsko", size: "0,50 l", price: "€ 3,80" },
      { name: "Nikšićko", size: "0,50 l", price: "€ 3,80" },
      { name: "Tomislav", size: "0,50 l", price: "€ 3,80" },
      { name: "Vukovarsko", size: "0,50 l", price: "€ 3,80" },
      { name: "Staropramen", size: "0,50 l", price: "€ 3,80" },
      { name: "Stella Artois", size: "0,33 l", price: "€ 4,20" },
      { name: "Beck's", size: "0,33 l", price: "€ 4,20" },
      { name: "Leffe Brune", size: "0,33 l", price: "€ 4,40" },
      { name: "Leffe Blonde", size: "0,33 l", price: "€ 4,40" },
      { name: "Corona extra", size: "0,355 l", price: "€ 4,80" },
      { name: "Grif Pale Ale", size: "0,50 l", price: "€ 4,80" },
      { name: "Franziskaner", size: "0,50 l", price: "€ 4,80" },
      { name: "Madri", size: "0,40 l", price: "€ 4,00" },
      { name: "Ožujsko limun", size: "0,50 l", price: "€ 3,80" },
      { name: "Točeno Staropramen", size: "0,30 l", price: "€ 3,70" },
      { name: "Točeno Staropramen", size: "0,50 l", price: "€ 4,20" },
    ],
  },
  {
    id: "cyder",
    title: "Cyder",
    icon: <Beer className="w-6 h-6" />,
    items: [
      { name: "Aspall", size: "0,33 l", price: "€ 4,50" },
    ],
  },
  {
    id: "wine",
    title: "Vino / Wine (Boce)",
    icon: <Wine className="w-6 h-6" />,
    items: [
      { name: "Josić Graševina", size: "0,75 l", price: "€ 37,00" },
      { name: "Coronica Malvazija", size: "0,75 l", price: "€ 37,00" },
      { name: "Josić Cuvee", size: "0,75 l", price: "€ 37,00" },
      { name: "Muškat", size: "0,75 l", price: "€ 37,00" },
    ],
  },
  {
    id: "wine-glass",
    title: "Vino na Čaše / Wine by Glass",
    icon: <Wine className="w-6 h-6" />,
    items: [
      { name: "Josić Graševina", size: "0,10 l", price: "€ 5,20" },
      { name: "Coronica Malvazija", size: "0,10 l", price: "€ 5,20" },
      { name: "Josić Cuvee", size: "0,10 l", price: "€ 5,20" },
      { name: "Muškat", size: "0,10 l", price: "€ 5,20" },
      { name: "Gemišt", size: "0,20 l", price: "€ 5,50" },
    ],
  },
  {
    id: "sparkling",
    title: "Pjenušava Vina / Sparkling Wine",
    icon: <Sparkles className="w-6 h-6" />,
    items: [
      { name: "Freixenet", size: "0,20 l", price: "€ 7,60" },
      { name: "Freixenet", size: "0,75 l", price: "€ 32,00" },
      { name: "Moet & Chandon", size: "0,75 l", price: "€ 125,00" },
      { name: "Prosecco", size: "0,10 l", price: "€ 5,00" },
    ],
  },
  {
    id: "winter",
    title: "Zimska Ponuda / Winter Menu",
    icon: <Flame className="w-6 h-6" />,
    items: [
      { name: "Kuhano vino", size: "0,20 l", price: "€ 4,20" },
      { name: "Kuhani Gin", size: "0,30 l", price: "€ 6,80" },
      { name: "Kuhani Antique", size: "0,30 l", price: "€ 6,20" },
      { name: "Kuhani Aperol", size: "0,30 l", price: "€ 6,80" },
    ],
  },
  {
    id: "domestic",
    title: "Domaća Alkoholna Pića / Domestic Spirits",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "Amaro", size: "0,03 l", price: "€ 3,50" },
      { name: "Pelinkovac", size: "0,03 l", price: "€ 3,50" },
      { name: "Borovnica", size: "0,03 l", price: "€ 3,50" },
      { name: "Višnjevac", size: "0,03 l", price: "€ 3,50" },
      { name: "Lozovača", size: "0,03 l", price: "€ 3,50" },
      { name: "Medica", size: "0,03 l", price: "€ 3,50" },
      { name: "Orahovac", size: "0,03 l", price: "€ 3,50" },
      { name: "Pelinkovac Antique", size: "0,03 l", price: "€ 3,90" },
      { name: "Rum", size: "0,03 l", price: "€ 3,50" },
      { name: "Šljivovica", size: "0,03 l", price: "€ 3,50" },
      { name: "Travarica", size: "0,03 l", price: "€ 3,50" },
      { name: "Viljamovka", size: "0,03 l", price: "€ 3,50" },
      { name: "Teranino", size: "0,03 l", price: "€ 3,50" },
    ],
  },
  {
    id: "imported",
    title: "Strana Alkoholna Pića / Imported Spirits",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "Jack Daniel's", size: "0,03 l", price: "€ 4,50" },
      { name: "Gentleman Jack Daniel's", size: "0,03 l", price: "€ 5,00" },
      { name: "Campari", size: "0,03 l", price: "€ 4,00" },
      { name: "Chivas Regal", size: "0,03 l", price: "€ 5,00" },
      { name: "Baileys", size: "0,03 l", price: "€ 4,00" },
      { name: "Hennessy", size: "0,03 l", price: "€ 5,00" },
      { name: "Jameson", size: "0,03 l", price: "€ 4,50" },
      { name: "Johnnie Walker Red", size: "0,03 l", price: "€ 4,50" },
      { name: "Johnnie Walker Black", size: "0,03 l", price: "€ 5,00" },
      { name: "Jagermeister", size: "0,03 l", price: "€ 4,50" },
      { name: "Martini", size: "0,05 l", price: "€ 4,50" },
      { name: "Tequila Sierra Silver", size: "0,03 l", price: "€ 4,50" },
      { name: "Disaronno Amaretto", size: "0,03 l", price: "€ 5,00" },
      { name: "Southern Comfort", size: "0,03 l", price: "€ 4,50" },
    ],
  },
  {
    id: "gin",
    title: "Gin",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "Tanqueray", size: "0,03 l", price: "€ 4,00" },
      { name: "Gin Mare", size: "0,03 l", price: "€ 6,00" },
      { name: "Hendricks", size: "0,03 l", price: "€ 5,00" },
      { name: "Monkey 47", size: "0,03 l", price: "€ 9,00" },
    ],
  },
  {
    id: "rum",
    title: "Rum",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "Havana Club 3 y Old", size: "0,03 l", price: "€ 4,50" },
      { name: "Bacardi", size: "0,03 l", price: "€ 4,50" },
      { name: "Malibu", size: "0,03 l", price: "€ 4,50" },
      { name: "Diplomatico Reserva Exclusiva", size: "0,03 l", price: "€ 6,50" },
    ],
  },
  {
    id: "vodka",
    title: "Vodka",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "Smirnoff", size: "0,03 l", price: "€ 4,50" },
      { name: "Belvedere", size: "0,03 l", price: "€ 6,00" },
      { name: "Beluga", size: "0,03 l", price: "€ 6,00" },
      { name: "Grey Goose", size: "0,03 l", price: "€ 6,00" },
    ],
  },
  {
    id: "cocktails",
    title: "Kokteli / Cocktails",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "SKINNY B*TCH", price: "€ 9,00" },
      { name: "COPACABANA", price: "€ 9,00" },
      { name: "MARGARITA", price: "€ 9,00" },
      { name: "MOJITO", price: "€ 9,00" },
      { name: "STRAWBERRY", price: "€ 9,00" },
      { name: "ESPRESSO MARTINI", price: "€ 9,00" },
      { name: "PORNSTAR MARTINI", price: "€ 9,00" },
      { name: "OLD FASHION", price: "€ 9,00" },
      { name: "NEGRONI", price: "€ 9,00" },
      { name: "SUMMER KISS (bezalkohola)", price: "€ 9,00" },
      { name: "TOM COLLINS", price: "€ 9,00" },
    ],
  },
  {
    id: "sours",
    title: "Sour's",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "Amaretto Sour", price: "€ 11,00" },
      { name: "Antique Sour", price: "€ 9,00" },
      { name: "Aperol Sour", price: "€ 9,00" },
      { name: "Gin Sour", price: "€ 9,00" },
      { name: "Rum Sour", price: "€ 9,00" },
      { name: "Teranino Sour", price: "€ 9,00" },
      { name: "Vodka Sour", price: "€ 9,00" },
      { name: "Whiskey Sour", price: "€ 9,00" },
    ],
  },
  {
    id: "spritz",
    title: "Spritz",
    icon: <Martini className="w-6 h-6" />,
    items: [
      { name: "RASPBERRY SPRITZ", price: "€ 8,00" },
      { name: "APEROL SPRITZ", price: "€ 8,00" },
      { name: "CAMPARI SPRITZ", price: "€ 8,00" },
      { name: "LIMONCELLO SPRITZ", price: "€ 8,00" },
      { name: "HUGO", price: "€ 8,00" },
    ],
  },
  {
    id: "promo",
    title: "Posebne Ponude / Special Offers",
    icon: <Sparkles className="w-6 h-6" />,
    items: [
      { name: "Kava + Limunada", size: "0,25 l", price: "€ 4,80" },
      { name: "Kava + Cijeđena naranča", size: "0,25 l", price: "€ 5,60" },
      { name: "Kava + Cijeđeni Mix", size: "0,25 l", price: "€ 6,00" },
    ],
  },
  {
    id: "cigarettes",
    title: "Cigarete / Cigarettes",
    icon: <Cigarette className="w-6 h-6" />,
    items: [
      { name: "Sobranie Gold", price: "€ 5,00" },
      { name: "Sobranie Black", price: "€ 5,00" },
      { name: "Sobranie Collection Cocktail", price: "€ 5,00" },
      { name: "Sobranie Laube Black", price: "€ 6,00" },
      { name: "Camel Yellow", price: "€ 4,50" },
      { name: "Camel Blue", price: "€ 4,50" },
      { name: "Winston Blue", price: "€ 4,50" },
    ],
  },
]

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
                {category.icon}
                <span className="font-medium whitespace-nowrap text-sm">{category.title.split("/")[0].trim()}</span>
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
              <div className="text-neutral-900">{category.icon}</div>
              <h2 className="text-2xl font-bold text-neutral-900">{category.title}</h2>
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
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {item.size && <span className="text-sm text-neutral-500">{item.size}</span>}
                    <span className="font-bold text-neutral-900 min-w-[4rem] text-right">{item.price}</span>
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
