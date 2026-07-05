"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Coffee, Beer, Wine, Martini, Droplets, Sparkles, ArrowLeft, Flame, Cigarette, FlaskConical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { track } from "@vercel/analytics"

// Helper function to convert item names to filename-safe slugs
function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, "") // Trim leading/trailing hyphens
}

type DrinkItem = {
  name: string
  size?: string
  price: string
  note?: string
  description?: string
  image?: string | null
}

type Category = {
  id: string
  title: string
  titleEn: string
  shortTitle: string
  icon: React.ReactNode
  accentColor: string
  items: DrinkItem[]
  isAlcoholic?: boolean
}

type MainGroup = {
  id: string
  title: string
  icon: React.ReactNode
  categoryIds: string[]
}

// Card categories that use 2-column grid layout
const cardCategories = ["cocktails", "sours", "spritz"]

// Alcoholic categories that need disclaimer
const alcoholicCategories = ["beer", "cyder", "wine", "wine-glass", "sparkling", "winter", "domestic", "imported", "gin", "rum", "vodka", "cocktails", "sours", "spritz"]

const categories: Category[] = [
  {
    id: "hot",
    title: "Topli Napitci",
    titleEn: "Hot Drinks",
    shortTitle: "Kava",
    icon: <Coffee className="w-4 h-4" />,
    accentColor: "#C4A574",
    items: [
      { name: "Kava espresso", size: "šal./cup", price: "€ 2,00", image: "/menu/kava/espresso.png" },
      { name: "Kava s mlijekom mala", size: "šal./cup", price: "€ 2,20", image: "/menu/kava/kava-mlijekom.png" },
      { name: "Kava s mlijekom velika", size: "šal./cup", price: "€ 2,40", image: "/menu/kava/kava-mlijekom.png" },
      { name: "Kava sa šlagom mala", size: "šal./cup", price: "€ 2,20", image: "/menu/kava/kava-slagom.png" },
      { name: "Kava sa šlagom velika", size: "šal./cup", price: "€ 2,50", image: "/menu/kava/kava-slagom.png" },
      { name: "Cappuccino", size: "šal./cup", price: "€ 2,60", image: "/menu/kava/cappuccino.png" },
      { name: "Cappuccino mali", size: "šal./cup", price: "€ 2,30", image: "/menu/kava/cappuccino.png" },
      { name: "Bijela kava", size: "šal./cup", price: "€ 3,20", image: "/menu/kava/bijela-kava.png" },
      { name: "Kava bez kofeina", size: "šal./cup", price: "€ 2,30", image: "/menu/kava/espresso.png" },
      { name: "Kava bez kofeina s mlijekom", size: "šal./cup", price: "€ 2,60", image: "/menu/kava/kava-mlijekom.png" },
      { name: "Cappuccino bez kofeina", size: "šal./cup", price: "€ 2,70", image: "/menu/kava/cappuccino.png" },
      { name: "Bijela kava bez kofeina / decaff. White coffee", size: "šal./cup", price: "€ 3,30", image: "/menu/kava/bijela-kava.png" },
      { name: "Kava - zamjensko mlijeko", size: "šal./cup", price: "€ 2,60", image: "/menu/kava/kava-mlijekom.png" },
      { name: "Bijela kava - zamjensko mlijeko", size: "šal./cup", price: "€ 3,40", image: "/menu/kava/bijela-kava.png" },
      { name: "Čaj (med-limun)", size: "šal./cup", price: "€ 3,00", image: null },
      { name: "Nescafe", size: "šal./cup", price: "€ 3,20", image: null },
      { name: "Ledena kava", size: "šal./cup", price: "€ 3,50", image: null },
      { name: "Kit-Kat Kakao", size: "šal./cup", price: "€ 3,20", image: null },
      { name: "Kakao", size: "šal./cup", price: "€ 3,20", image: null },
      { name: "Vruća čokolada", size: "šal./cup", price: "€ 4,00", image: null },
      { name: "Vruća čokolada sa šlagom", size: "šal./cup", price: "€ 4,00", image: null },
      { name: "Šlag", size: "šal./cup", price: "€ 1,50", image: null },
      { name: "Med", size: "vreć./dose", price: "€ 0,50", image: null },
      { name: "Babychino", size: "šal./cup", price: "€ 1,50", image: null },
      { name: "Mlijeko / milk", size: "šal./cup", price: "€ 1,00", image: null },
    ],
  },
  {
    id: "soft",
    title: "Bezalkoholna Pića",
    titleEn: "Soft Drinks",
    shortTitle: "Soft",
    icon: <Droplets className="w-4 h-4" />,
    accentColor: "#60A5FA",
    items: [
      { name: "Coca-Cola", size: "0,25 l", price: "€ 3,50", image: "/menu/soft/cola.png" },
      { name: "Coca-Cola Zero Sugar", size: "0,25 l", price: "€ 3,50", image: "/menu/soft/cola.png" },
      { name: "Fanta", size: "0,25 l", price: "€ 3,50", image: "/menu/soft/fanta.png" },
      { name: "Sprite", size: "0,25 l", price: "€ 3,50", image: "/menu/soft/sprite.png" },
      {
        name: "Schweppes",
        size: "0,25 l",
        price: "€ 3,50",
        note: "Tonic Water, Bitter Lemon, Tangerine, Tonic Water Slimline, Pink Grapefruit, Pomegranate",
        image: "/menu/soft/schweppes.png",
      },
      { name: "Thomas Henry Tonic Water", size: "0,20 l", price: "€ 4,10", image: "/menu/soft/thomas-henry-tonic.png" },
      { name: "Thomas Henry Cherry Blossom", size: "0,20 l", price: "€ 4,10", image: "/menu/soft/thomas-henry-cherry.png" },
      { name: "Cockta", size: "0,275 l", price: "€ 3,50", image: "/menu/soft/cockta.png" },
      { name: "Hidra", size: "0,50 l", price: "€ 3,80", image: "/menu/soft/hidra.png" },
      { name: "Cedevita", size: "0,25 l", price: "€ 3,50", image: "/menu/soft/cedevita.png" },
      { name: "Red Bull", size: "0,25 l", price: "€ 4,50", image: "/menu/soft/red-bull.png" },
      { name: "Jana Ledeni čaj", size: "0,33 l", price: "€ 3,50", note: "breskva, šumsko voće", image: "/menu/soft/ledeni-caj.png" },
      { name: "Prirodni sok (razni okusi)", size: "0,20 l", price: "€ 3,50", image: "/menu/soft/prirodni-sok.png" },
    ],
  },
  {
    id: "juices",
    title: "Cijeđeni Sokovi",
    titleEn: "Fresh Juices",
    shortTitle: "Sokovi",
    icon: <Sparkles className="w-4 h-4" />,
    accentColor: "#F59E0B",
    items: [
      { name: "Limunada", size: "0,25 l", price: "€ 3,60", image: null },
      { name: "Limunada sa đumbirom", size: "0,25 l", price: "€ 3,60", image: null },
      { name: "Naranča", size: "0,25 l", price: "€ 4,40", image: null },
      { name: "Jabuka", size: "0,25 l", price: "€ 4,40", image: null },
      { name: "Mrkvoslav", size: "0,25 l", price: "€ 4,80", note: "naranča, jabuka, mrkva", image: null },
      { name: "Citrusni Cirkus", size: "0,25 l", price: "€ 4,80", note: "naranča, jabuka, limun", image: null },
      { name: "Roza", size: "0,25 l", price: "€ 4,80", note: "jabuka, cikla, đumbir", image: null },
      { name: "Ljutko", size: "0,25 l", price: "€ 4,80", note: "jabuka, ananas, đumbir", image: null },
    ],
  },
  {
    id: "water",
    title: "Mineralna Voda",
    titleEn: "Mineral Water",
    shortTitle: "Voda",
    icon: <Droplets className="w-4 h-4" />,
    accentColor: "#38BDF8",
    items: [
      { name: "Jana negazirana prirodna mineralna voda", size: "0,33 l", price: "€ 3,00", image: null },
      { name: "Jana vitamin happy - naranča", size: "0,33 l", price: "€ 3,00", image: null },
      { name: "Jana vitamin Immuno - limun", size: "0,33 l", price: "€ 3,00", image: null },
      { name: "Jamnica, gazirana prirodna mineralna voda", size: "1,00 l", price: "€ 5,50", image: null },
      { name: "Jamnica, gazirana prirodna mineralna voda", size: "0,33 l", price: "€ 3,50", image: null },
      { name: "Sensation", size: "0,25 l", price: "€ 3,50", note: "limunska trava, bazga/limun, kiwano", image: null },
      { name: "Jana negazirana prirodna mineralna voda", size: "0,75 l", price: "€ 5,00", image: null },
      { name: "Romerquelle Limunska trava", size: "0,33 l", price: "€ 3,50", image: null },
    ],
  },
  {
    id: "beer",
    title: "Pivo",
    titleEn: "Beer",
    shortTitle: "Pivo",
    icon: <Beer className="w-4 h-4" />,
    accentColor: "#EAB308",
    items: [
      { name: "Ožujsko", size: "0,50 l", price: "€ 3,80", image: null },
      { name: "Nikšićko", size: "0,50 l", price: "€ 3,80", image: null },
      { name: "Tomislav", size: "0,50 l", price: "€ 3,80", image: null },
      { name: "Vukovarsko", size: "0,50 l", price: "€ 3,80", image: null },
      { name: "Staropramen", size: "0,50 l", price: "€ 3,80", image: null },
      { name: "Stella Artois", size: "0,33 l", price: "€ 4,20", image: null },
      { name: "Beck's", size: "0,33 l", price: "€ 4,20", image: null },
      { name: "Leffe Brune", size: "0,33 l", price: "€ 4,40", image: null },
      { name: "Leffe Blonde", size: "0,33 l", price: "€ 4,40", image: null },
      { name: "Corona extra", size: "0,355 l", price: "€ 4,80", image: null },
      { name: "Grif Pale Ale", size: "0,50 l", price: "€ 4,80", image: null },
      { name: "Franziskaner", size: "0,50 l", price: "€ 4,80", image: null },
      { name: "Madri", size: "0,40 l", price: "€ 4,00", image: null },
      { name: "Ožujsko limun", size: "0,50 l", price: "€ 3,80", image: null },
      { name: "Točeno Staropramen", size: "0,30 l", price: "€ 3,70", image: null },
      { name: "Točeno Staropramen", size: "0,50 l", price: "€ 4,20", image: null },
    ],
  },
  {
    id: "cyder",
    title: "Cyder",
    titleEn: "Cider",
    shortTitle: "Cyder",
    icon: <Beer className="w-4 h-4" />,
    accentColor: "#84CC16",
    items: [
      { name: "Aspall", size: "0,33 l", price: "€ 4,50", image: "/menu/cyder/aspall.png" },
    ],
  },
  {
    id: "wine",
    title: "Vino (Boce)",
    titleEn: "Wine (Bottles)",
    shortTitle: "Boce",
    icon: <Wine className="w-4 h-4" />,
    accentColor: "#A855F7",
    items: [
      { name: "Josić Graševina", size: "0,75 l", price: "€ 37,00", image: null },
      { name: "Coronica Malvazija", size: "0,75 l", price: "€ 37,00", image: null },
      { name: "Josić Cuvee", size: "0,75 l", price: "€ 37,00", image: null },
      { name: "Muškat", size: "0,75 l", price: "€ 37,00", image: null },
    ],
  },
  {
    id: "wine-glass",
    title: "Vino na Čaše",
    titleEn: "Wine by Glass",
    shortTitle: "Čaše",
    icon: <Wine className="w-4 h-4" />,
    accentColor: "#EC4899",
    items: [
      { name: "Josić Graševina", size: "0,10 l", price: "€ 5,20", image: null },
      { name: "Coronica Malvazija", size: "0,10 l", price: "€ 5,20", image: null },
      { name: "Josić Cuvee", size: "0,10 l", price: "€ 5,20", image: null },
      { name: "Muškat", size: "0,10 l", price: "€ 5,20", image: null },
      { name: "Gemišt", size: "0,20 l", price: "€ 5,50", image: null },
    ],
  },
  {
    id: "sparkling",
    title: "Pjenušava Vina",
    titleEn: "Sparkling Wine",
    shortTitle: "Pjenušci",
    icon: <Sparkles className="w-4 h-4" />,
    accentColor: "#F472B6",
    items: [
      { name: "Freixenet", size: "0,20 l", price: "€ 7,60", image: null },
      { name: "Freixenet", size: "0,75 l", price: "€ 32,00", image: null },
      { name: "Moet & Chandon", size: "0,75 l", price: "€ 125,00", image: null },
      { name: "Prosecco", size: "0,10 l", price: "€ 5,00", image: null },
    ],
  },
  {
    id: "winter",
    title: "Zimska Ponuda",
    titleEn: "Winter Menu",
    shortTitle: "Zimski",
    icon: <Flame className="w-4 h-4" />,
    accentColor: "#EF4444",
    items: [
      { name: "Kuhano vino", size: "0,20 l", price: "€ 4,20", image: null },
      { name: "Kuhani Gin", size: "0,30 l", price: "€ 6,80", image: null },
      { name: "Kuhani Antique", size: "0,30 l", price: "€ 6,20", image: null },
      { name: "Kuhani Aperol", size: "0,30 l", price: "€ 6,80", image: null },
    ],
  },
  {
    id: "domestic",
    title: "Domaća Pića",
    titleEn: "Domestic Spirits",
    shortTitle: "Domaća",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#78716C",
    items: [
      { name: "Amaro", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Pelinkovac", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Borovnica", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Višnjevac", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Lozovača", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Medica", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Orahovac", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Pelinkovac Antique", size: "0,03 l", price: "€ 3,90", image: null },
      { name: "Rum", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Šljivovica", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Travarica", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Viljamovka", size: "0,03 l", price: "€ 3,50", image: null },
      { name: "Teranino", size: "0,03 l", price: "€ 3,50", image: null },
    ],
  },
  {
    id: "imported",
    title: "Strana Pića",
    titleEn: "Imported Spirits",
    shortTitle: "Strana",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#A3A3A3",
    items: [
      { name: "Jack Daniel's", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Gentleman Jack Daniel's", size: "0,03 l", price: "€ 5,00", image: null },
      { name: "Campari", size: "0,03 l", price: "€ 4,00", image: null },
      { name: "Chivas Regal", size: "0,03 l", price: "€ 5,00", image: null },
      { name: "Baileys", size: "0,03 l", price: "€ 4,00", image: null },
      { name: "Hennessy", size: "0,03 l", price: "€ 5,00", image: null },
      { name: "Jameson", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Johnnie Walker Red", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Johnnie Walker Black", size: "0,03 l", price: "€ 5,00", image: null },
      { name: "Jagermeister", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Martini", size: "0,05 l", price: "€ 4,50", image: null },
      { name: "Tequila Sierra Silver", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Disaronno Amaretto", size: "0,03 l", price: "€ 5,00", image: null },
      { name: "Southern Comfort", size: "0,03 l", price: "€ 4,50", image: null },
    ],
  },
  {
    id: "gin",
    title: "Gin",
    titleEn: "Gin",
    shortTitle: "Gin",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#06B6D4",
    items: [
      { name: "Tanqueray", size: "0,03 l", price: "€ 4,00", image: null },
      { name: "Gin Mare", size: "0,03 l", price: "€ 6,00", image: null },
      { name: "Hendricks", size: "0,03 l", price: "€ 5,00", image: null },
      { name: "Monkey 47", size: "0,03 l", price: "€ 9,00", image: null },
    ],
  },
  {
    id: "rum",
    title: "Rum",
    titleEn: "Rum",
    shortTitle: "Rum",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#92400E",
    items: [
      { name: "Havana Club 3 y Old", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Bacardi", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Malibu", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Diplomatico Reserva Exclusiva", size: "0,03 l", price: "€ 6,50", image: null },
    ],
  },
  {
    id: "vodka",
    title: "Vodka",
    titleEn: "Vodka",
    shortTitle: "Vodka",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#64748B",
    items: [
      { name: "Smirnoff", size: "0,03 l", price: "€ 4,50", image: null },
      { name: "Belvedere", size: "0,03 l", price: "€ 6,00", image: null },
      { name: "Beluga", size: "0,03 l", price: "€ 6,00", image: null },
      { name: "Grey Goose", size: "0,03 l", price: "€ 6,00", image: null },
    ],
  },
  {
    id: "cocktails",
    title: "Kokteli",
    titleEn: "Cocktails",
    shortTitle: "Kokteli",
    icon: <Martini className="w-4 h-4" />,
    accentColor: "#F97316",
    items: [
      { name: "SKINNY B*TCH", price: "€ 9,00", image: "/menu/kokteli/skinny-bitch.png", description: "Vodka, soda water, limeta" },
      { name: "COPACABANA", price: "€ 9,00", image: "/menu/kokteli/copacabana.png", description: "Rum, kokosov sirup, ananas, limeta" },
      { name: "MARGARITA", price: "€ 9,00", image: "/menu/kokteli/margarita.png", description: "Tequila, triple sec, limeta, sol" },
      { name: "MOJITO", price: "€ 9,00", image: "/menu/kokteli/mojito.png", description: "Rum, svježa metvica, limeta, šećer, soda" },
      { name: "STRAWBERRY", price: "€ 9,00", image: "/menu/kokteli/strawberry.png", description: "Vodka, jagoda, limeta, soda" },
      { name: "ESPRESSO MARTINI", price: "€ 9,00", description: "Vodka, espresso, Kahlúa", image: "/menu/kokteli/espresso-martini.png" },
      { name: "PORNSTAR MARTINI", price: "€ 9,00", image: "/menu/kokteli/pornstar-martini.png", description: "Vodka, marakuja, vanilija, Prosecco" },
      { name: "OLD FASHION", price: "€ 9,00", image: "/menu/kokteli/old-fashioned.png", description: "Whiskey, Angostura bitters, šećer, naranča" },
      { name: "NEGRONI", price: "€ 9,00", description: "Gin, Campari, slatki vermut", image: "/menu/kokteli/negroni.png" },
      { name: "SUMMER KISS", price: "€ 9,00", image: "/menu/kokteli/summer-kiss.png", description: "Bezalkoholni — limunada, bazga, metvica" },
      { name: "TOM COLLINS", price: "€ 9,00", image: "/menu/kokteli/tom-collins.png", description: "Gin, limeta, šećer, soda" },
    ],
  },
  {
    id: "sours",
    title: "Sour's",
    titleEn: "Sour Cocktails",
    shortTitle: "Sour's",
    icon: <Martini className="w-4 h-4" />,
    accentColor: "#FACC15",
    items: [
      { name: "Amaretto Sour", price: "€ 11,00", image: null },
      { name: "Antique Sour", price: "€ 9,00", image: null },
      { name: "Aperol Sour", price: "€ 9,00", image: null },
      { name: "Gin Sour", price: "€ 9,00", image: null },
      { name: "Rum Sour", price: "€ 9,00", image: null },
      { name: "Teranino Sour", price: "€ 9,00", image: null },
      { name: "Vodka Sour", price: "€ 9,00", image: null },
      { name: "Whiskey Sour", price: "€ 9,00", image: null },
    ],
  },
  {
    id: "spritz",
    title: "Spritz",
    titleEn: "Spritz",
    shortTitle: "Spritz",
    icon: <Martini className="w-4 h-4" />,
    accentColor: "#FB923C",
    items: [
      { name: "RASPBERRY SPRITZ", price: "€ 8,00", image: null },
      { name: "APEROL SPRITZ", price: "€ 8,00", image: null },
      { name: "CAMPARI SPRITZ", price: "€ 8,00", image: null },
      { name: "LIMONCELLO SPRITZ", price: "€ 8,00", image: null },
      { name: "HUGO", price: "€ 8,00", image: null },
    ],
  },
  {
    id: "promo",
    title: "Posebne Ponude",
    titleEn: "Special Offers",
    shortTitle: "Akcije",
    icon: <Sparkles className="w-4 h-4" />,
    accentColor: "#10B981",
    items: [
      { name: "Kava + Limunada", size: "0,25 l", price: "€ 4,80", image: null },
      { name: "Kava + Cijeđena naranča", size: "0,25 l", price: "€ 5,60", image: null },
      { name: "Kava + Cijeđeni Mix", size: "0,25 l", price: "€ 6,00", image: null },
    ],
  },
  {
    id: "cigarettes",
    title: "Cigarete",
    titleEn: "Cigarettes",
    shortTitle: "Cigarete",
    icon: <Cigarette className="w-4 h-4" />,
    accentColor: "#737373",
    items: [
      { name: "Sobranie Gold", price: "€ 5,00", image: null },
      { name: "Sobranie Black", price: "€ 5,00", image: null },
      { name: "Sobranie Collection Cocktail", price: "€ 5,00", image: null },
      { name: "Sobranie Laube Black", price: "€ 6,00", image: null },
      { name: "Camel Yellow", price: "€ 4,50", image: null },
      { name: "Camel Blue", price: "€ 4,50", image: null },
      { name: "Winston Blue", price: "€ 4,50", image: null },
    ],
  },
]

// Main groups for Level 1 navigation
const mainGroups: MainGroup[] = [
  {
    id: "kava",
    title: "Kava",
    icon: <Coffee className="w-4 h-4" />,
    categoryIds: ["hot"],
  },
  {
    id: "sokovi",
    title: "Sokovi & Voda",
    icon: <Droplets className="w-4 h-4" />,
    categoryIds: ["soft", "juices", "water"],
  },
  {
    id: "pivo-vino",
    title: "Pivo & Vino",
    icon: <Beer className="w-4 h-4" />,
    categoryIds: ["beer", "cyder", "wine", "wine-glass", "sparkling", "winter"],
  },
  {
    id: "zestoka",
    title: "Žestoka Pića",
    icon: <FlaskConical className="w-4 h-4" />,
    categoryIds: ["domestic", "imported", "gin", "rum", "vodka"],
  },
  {
    id: "kokteli",
    title: "Kokteli",
    icon: <Martini className="w-4 h-4" />,
    categoryIds: ["cocktails", "sours", "spritz"],
  },
  {
    id: "posebno",
    title: "Posebno",
    icon: <Sparkles className="w-4 h-4" />,
    categoryIds: ["promo", "cigarettes"],
  },
]

// Skeleton loader for images
  function ImageSkeleton({ size }: { size: "small" | "large" }) {
    const sizeClasses = size === "large" ? "w-full aspect-[4/3]" : "w-20 h-20"
  return <div className={`${sizeClasses} rounded-md bg-muted animate-pulse flex-shrink-0`} />
}

// Placeholder component for items without images
  function ImagePlaceholder({ icon, accentColor, size }: { icon: React.ReactNode; accentColor: string; size: "small" | "large" }) {
    const sizeClasses = size === "large" ? "w-full aspect-[4/3]" : "w-20 h-20"
  
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

  const sizeClasses = size === "large" ? "w-full aspect-[4/3]" : "w-20 h-20"

  return (
    <div 
      className={`relative ${sizeClasses} rounded-md overflow-hidden flex-shrink-0`}
      style={{ backgroundColor: "#14110D" }}
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
          <div className="text-sm text-muted-foreground mt-0.5 leading-none line-clamp-1">{item.note}</div>
        )}
      </div>
      <div 
        className="w-[80px] text-right text-base font-bold flex-shrink-0 tabular-nums"
        style={{ color: category.accentColor }}
      >
        {item.price}
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
        rootMargin: "-120px 0px -60% 0px",
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
        const headerHeight = stickyHeaderRef.current?.offsetHeight || 0
        window.scrollTo({ top: headerHeight - 20, behavior: "smooth" })
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
      const headerHeight = stickyHeaderRef.current?.offsetHeight || 0
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - headerHeight - 16,
        behavior: "smooth",
      })

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
        style={{ maxHeight: "120px", backgroundColor: "#14110D" }}
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

        {/* Section Title - shows the active group's main category title */}
        {(() => {
          const activeGroupData = mainGroups.find(g => g.id === activeGroup)
          const firstCategory = visibleCategories[0]
          if (!firstCategory) return null
          
          // Get a display title based on group
          const groupTitles: Record<string, { hr: string, en: string }> = {
            "kava": { hr: "Topli Napitci", en: "Hot Drinks" },
            "sokovi": { hr: "Bezalkoholna Pića", en: "Soft Drinks & Juices" },
            "pivo-vino": { hr: "Pivo & Vino", en: "Beer & Wine" },
            "zestoka": { hr: "Žestoka Pića", en: "Spirits" },
            "kokteli": { hr: "Kokteli", en: "Cocktails" },
            "posebno": { hr: "Posebne Ponude", en: "Special Offers" },
          }
          const titles = groupTitles[activeGroup] || { hr: firstCategory.title, en: firstCategory.titleEn }
          
          return (
            <div 
              className="px-4 py-2 border-t border-border/30"
              style={{ backgroundColor: "#14110D" }}
            >
              <div className="flex items-center gap-2">
                <div className="text-accent">{activeGroupData?.icon}</div>
                <h2 className="text-base font-bold text-foreground uppercase tracking-wide">{titles.hr}</h2>
              </div>
              <p className="text-xs text-muted-foreground font-serif ml-6">{titles.en}</p>
            </div>
          )
        })()}

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
                <p className="text-xs text-muted-foreground font-serif mt-0.5 ml-6">
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
      </div>
    </div>
  )
}
