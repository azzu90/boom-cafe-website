import type React from "react"
import { Coffee, Beer, Wine, Martini, Droplets, Sparkles, Flame, Cigarette, FlaskConical } from "lucide-react"

// "Dodatna cijena" (reference price) required by Croatian law from 01.10.2026.
// referencePrice must NEVER be changed when the current price changes.
// New items get the price and the date of the day they are introduced as referencePrice/referenceDate.
export const REFERENCE_DATE = "10.09.2026"

// Update on every price change (used in the CSV filename of /cjenik.csv).
export const PRICE_LIST_STORAGE_NUMBER = "001"
export const PRICE_LIST_PUBLISHED_AT = "01.10.2026_07:00"

export type DrinkItem = {
  name: string
  size?: string
  price: string
  note?: string
  description?: string
  image?: string | null
  referencePrice: string
  referenceDate: string
}

export type Category = {
  id: string
  title: string
  titleEn: string
  shortTitle: string
  icon: React.ReactNode
  accentColor: string
  items: DrinkItem[]
  isAlcoholic?: boolean
}

export type MainGroup = {
  id: string
  title: string
  icon: React.ReactNode
  categoryIds: string[]
}

// Card categories that use 2-column grid layout
export const cardCategories = ["cocktails", "sours", "spritz"]

// Alcoholic categories that need disclaimer
export const alcoholicCategories = ["beer", "cyder", "wine", "wine-glass", "sparkling", "winter", "domestic", "imported", "gin", "rum", "vodka", "cocktails", "sours", "spritz"]

export const categories: Category[] = [
  {
    id: "hot",
    title: "Kava",
    titleEn: "Coffee",
    shortTitle: "Kava",
    icon: <Coffee className="w-4 h-4" />,
    accentColor: "#C4A574",
    items: [
      { name: "Kava espresso", size: "šal./cup", price: "€ 2,00", referencePrice: "€ 2,00", referenceDate: REFERENCE_DATE, image: "/menu/kava/espresso.webp" },
      { name: "Kava s mlijekom mala", size: "šal./cup", price: "€ 2,20", referencePrice: "€ 2,20", referenceDate: REFERENCE_DATE, image: "/menu/kava/kava-mlijekom.webp" },
      { name: "Kava s mlijekom velika", size: "šal./cup", price: "€ 2,40", referencePrice: "€ 2,40", referenceDate: REFERENCE_DATE, image: "/menu/kava/kava-mlijekom.webp" },
      { name: "Kava sa šlagom mala", size: "šal./cup", price: "€ 2,20", referencePrice: "€ 2,20", referenceDate: REFERENCE_DATE, image: "/menu/kava/kava-slagom.webp" },
      { name: "Kava sa šlagom velika", size: "šal./cup", price: "€ 2,50", referencePrice: "€ 2,50", referenceDate: REFERENCE_DATE, image: "/menu/kava/kava-slagom.webp" },
      { name: "Cappuccino", size: "šal./cup", price: "€ 2,60", referencePrice: "€ 2,60", referenceDate: REFERENCE_DATE, image: "/menu/kava/cappuccino.webp" },
      { name: "Cappuccino mali", size: "šal./cup", price: "€ 2,30", referencePrice: "€ 2,30", referenceDate: REFERENCE_DATE, image: "/menu/kava/cappuccino.webp" },
      { name: "Bijela kava", size: "šal./cup", price: "€ 3,20", referencePrice: "€ 3,20", referenceDate: REFERENCE_DATE, image: "/menu/kava/bijela-kava.webp" },
      { name: "Kava bez kofeina", size: "šal./cup", price: "€ 2,30", referencePrice: "€ 2,30", referenceDate: REFERENCE_DATE, image: "/menu/kava/espresso.webp" },
      { name: "Kava bez kofeina s mlijekom", size: "šal./cup", price: "€ 2,60", referencePrice: "€ 2,60", referenceDate: REFERENCE_DATE, image: "/menu/kava/kava-mlijekom.webp" },
      { name: "Cappuccino bez kofeina", size: "šal./cup", price: "€ 2,70", referencePrice: "€ 2,70", referenceDate: REFERENCE_DATE, image: "/menu/kava/cappuccino.webp" },
      { name: "Bijela kava bez kofeina / decaff. White coffee", size: "šal./cup", price: "€ 3,30", referencePrice: "€ 3,30", referenceDate: REFERENCE_DATE, image: "/menu/kava/bijela-kava.webp" },
      { name: "Kava - zamjensko mlijeko", size: "šal./cup", price: "€ 2,60", referencePrice: "€ 2,60", referenceDate: REFERENCE_DATE, image: "/menu/kava/kava-mlijekom.webp" },
      { name: "Bijela kava - zamjensko mlijeko", size: "šal./cup", price: "€ 3,40", referencePrice: "€ 3,40", referenceDate: REFERENCE_DATE, image: "/menu/kava/bijela-kava.webp" },
      { name: "Nescafe", size: "šal./cup", price: "€ 3,20", referencePrice: "€ 3,20", referenceDate: REFERENCE_DATE, image: null },
      { name: "Ledena kava", size: "šal./cup", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/kava/ledena-kava.webp" },
    ],
  },
  {
    id: "tea-cocoa",
    title: "Čaj, Kakao & Čokolada",
    titleEn: "Tea, Cocoa & Chocolate",
    shortTitle: "Čaj & Kakao",
    icon: <Coffee className="w-4 h-4" />,
    accentColor: "#C4A574",
    items: [
      { name: "Čaj (med-limun)", size: "šal./cup", price: "€ 3,00", referencePrice: "€ 3,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Kit-Kat Kakao", size: "šal./cup", price: "€ 3,20", referencePrice: "€ 3,20", referenceDate: REFERENCE_DATE, image: null },
      { name: "Kakao", size: "šal./cup", price: "€ 3,20", referencePrice: "€ 3,20", referenceDate: REFERENCE_DATE, image: null },
      { name: "Vruća čokolada", size: "šal./cup", price: "€ 4,00", referencePrice: "€ 4,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Vruća čokolada sa šlagom", size: "šal./cup", price: "€ 4,00", referencePrice: "€ 4,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Babychino", size: "šal./cup", price: "€ 1,50", referencePrice: "€ 1,50", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
  {
    id: "extras",
    title: "Dodaci",
    titleEn: "Extras",
    shortTitle: "Dodaci",
    icon: <Coffee className="w-4 h-4" />,
    accentColor: "#C4A574",
    items: [
      { name: "Šlag", size: "šal./cup", price: "€ 1,50", referencePrice: "€ 1,50", referenceDate: REFERENCE_DATE, image: "/menu/kava/slag.webp" },
      { name: "Med", size: "vreć./dose", price: "€ 0,50", referencePrice: "€ 0,50", referenceDate: REFERENCE_DATE, image: "/menu/kava/med.webp" },
      { name: "Mlijeko / milk", size: "šal./cup", price: "€ 1,00", referencePrice: "€ 1,00", referenceDate: REFERENCE_DATE, image: "/menu/kava/mlijeko.webp" },
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
      { name: "Coca-Cola", size: "0,25 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/cola.webp" },
      { name: "Coca-Cola Zero Sugar", size: "0,25 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/cola.webp" },
      { name: "Fanta", size: "0,25 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/fanta.webp" },
      { name: "Sprite", size: "0,25 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/sprite.webp" },
      {
        name: "Schweppes",
        size: "0,25 l",
        price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE,
        note: "Tonic Water, Bitter Lemon, Tangerine, Tonic Water Slimline, Pink Grapefruit, Pomegranate",
        image: "/menu/soft/schweppes.webp",
      },
      { name: "Thomas Henry Tonic Water", size: "0,20 l", price: "€ 4,10", referencePrice: "€ 4,10", referenceDate: REFERENCE_DATE, image: "/menu/soft/thomas-henry-tonic.webp" },
      { name: "Thomas Henry Cherry Blossom", size: "0,20 l", price: "€ 4,10", referencePrice: "€ 4,10", referenceDate: REFERENCE_DATE, image: "/menu/soft/thomas-henry-cherry.webp" },
      { name: "Cockta", size: "0,275 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/cockta.webp" },
      { name: "Hidra", size: "0,50 l", price: "€ 3,80", referencePrice: "€ 3,80", referenceDate: REFERENCE_DATE, image: "/menu/soft/hidra.webp" },
      { name: "Cedevita", size: "0,25 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/cedevita.webp" },
      { name: "Red Bull", size: "0,25 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/red-bull.webp" },
      { name: "Jana Ledeni čaj", size: "0,33 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, note: "breskva, šumsko voće", image: "/menu/soft/ledeni-caj.webp" },
      { name: "Prirodni sok (razni okusi)", size: "0,20 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/soft/prirodni-sok.webp" },
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
      { name: "Limunada", size: "0,25 l", price: "€ 3,60", referencePrice: "€ 3,60", referenceDate: REFERENCE_DATE, image: "/menu/cijedeni/limunada.webp" },
      { name: "Limunada sa đumbirom", size: "0,25 l", price: "€ 3,60", referencePrice: "€ 3,60", referenceDate: REFERENCE_DATE, image: "/menu/cijedeni/limunada-dumbir.webp" },
      { name: "Naranča", size: "0,25 l", price: "€ 4,40", referencePrice: "€ 4,40", referenceDate: REFERENCE_DATE, image: "/menu/cijedeni/naranca.webp" },
      { name: "Jabuka", size: "0,25 l", price: "€ 4,40", referencePrice: "€ 4,40", referenceDate: REFERENCE_DATE, image: "/menu/cijedeni/jabuka.webp" },
      { name: "Mrkvoslav", size: "0,25 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, note: "naranča, jabuka, mrkva", image: "/menu/cijedeni/mrkvoslav.webp" },
      { name: "Citrusni Cirkus", size: "0,25 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, note: "naranča, jabuka, limun", image: "/menu/cijedeni/citrusni-cirkus.webp" },
      { name: "Roza", size: "0,25 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, note: "jabuka, cikla, đumbir", image: "/menu/cijedeni/roza.webp" },
      { name: "Ljutko", size: "0,25 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, note: "jabuka, ananas, đumbir", image: "/menu/cijedeni/ljutko.webp" },
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
      { name: "Jana negazirana prirodna mineralna voda", size: "0,33 l", price: "€ 3,00", referencePrice: "€ 3,00", referenceDate: REFERENCE_DATE, image: "/menu/voda/jana-negazirana-033.webp" },
      { name: "Jana vitamin happy - naranča", size: "0,33 l", price: "€ 3,00", referencePrice: "€ 3,00", referenceDate: REFERENCE_DATE, image: "/menu/voda/jana-vitamin-happy-naranca.webp" },
      { name: "Jana vitamin Immuno - limun", size: "0,33 l", price: "€ 3,00", referencePrice: "€ 3,00", referenceDate: REFERENCE_DATE, image: "/menu/voda/jana-vitamin-immuno-limun.webp" },
      { name: "Jamnica, gazirana prirodna mineralna voda", size: "1,00 l", price: "€ 5,50", referencePrice: "€ 5,50", referenceDate: REFERENCE_DATE, image: "/menu/voda/jamnica-100.webp" },
      { name: "Jamnica, gazirana prirodna mineralna voda", size: "0,33 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/voda/jamnica-033.webp" },
      { name: "Sensation", size: "0,25 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, note: "limunska trava, bazga/limun, kiwano", image: "/menu/voda/sensation.webp" },
      { name: "Jana negazirana prirodna mineralna voda", size: "0,75 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: "/menu/voda/jana-negazirana-075.webp" },
      { name: "Romerquelle Limunska trava", size: "0,33 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: "/menu/voda/romerquelle-limunska-trava.webp" },
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
      { name: "Ožujsko", size: "0,50 l", price: "€ 3,80", referencePrice: "€ 3,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/ozujsko.webp" },
      { name: "Nikšićko", size: "0,50 l", price: "€ 3,80", referencePrice: "€ 3,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/niksicko.webp" },
      { name: "Tomislav", size: "0,50 l", price: "€ 3,80", referencePrice: "€ 3,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/tomislav.webp" },
      { name: "Vukovarsko", size: "0,50 l", price: "€ 3,80", referencePrice: "€ 3,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/vukovarsko.webp" },
      { name: "Staropramen", size: "0,50 l", price: "€ 3,80", referencePrice: "€ 3,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/staropramen.webp" },
      { name: "Stella Artois", size: "0,33 l", price: "€ 4,20", referencePrice: "€ 4,20", referenceDate: REFERENCE_DATE, image: "/menu/pivo/stella-artois.webp" },
      { name: "Beck's", size: "0,33 l", price: "€ 4,20", referencePrice: "€ 4,20", referenceDate: REFERENCE_DATE, image: "/menu/pivo/becks.webp" },
      { name: "Leffe Brune", size: "0,33 l", price: "€ 4,40", referencePrice: "€ 4,40", referenceDate: REFERENCE_DATE, image: "/menu/pivo/leffe-brune.webp" },
      { name: "Leffe Blonde", size: "0,33 l", price: "€ 4,40", referencePrice: "€ 4,40", referenceDate: REFERENCE_DATE, image: "/menu/pivo/leffe-blonde.webp" },
      { name: "Corona extra", size: "0,355 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/corona.webp" },
      { name: "Grif Pale Ale", size: "0,50 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/grif.webp" },
      { name: "Franziskaner", size: "0,50 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/franziskaner.webp" },
      { name: "Madri", size: "0,40 l", price: "€ 4,00", referencePrice: "€ 4,00", referenceDate: REFERENCE_DATE, image: "/menu/pivo/madri.webp" },
      { name: "Ožujsko limun", size: "0,50 l", price: "€ 3,80", referencePrice: "€ 3,80", referenceDate: REFERENCE_DATE, image: "/menu/pivo/ozujsko-limun.webp" },
      { name: "Točeno Staropramen", size: "0,30 l", price: "€ 3,70", referencePrice: "€ 3,70", referenceDate: REFERENCE_DATE, image: "/menu/pivo/staropramen-toceno.webp" },
      { name: "Točeno Staropramen", size: "0,50 l", price: "€ 4,20", referencePrice: "€ 4,20", referenceDate: REFERENCE_DATE, image: "/menu/pivo/staropramen-toceno.webp" },
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
      { name: "Aspall", size: "0,33 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: "/menu/cyder/aspall.webp" },
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
      { name: "Josić Graševina", size: "0,75 l", price: "€ 37,00", referencePrice: "€ 37,00", referenceDate: REFERENCE_DATE, image: "/menu/vino/josic-grasevina.webp" },
      { name: "Coronica Malvazija", size: "0,75 l", price: "€ 37,00", referencePrice: "€ 37,00", referenceDate: REFERENCE_DATE, image: "/menu/vino/coronica-malvazija.webp" },
      { name: "Josić Cuvee", size: "0,75 l", price: "€ 37,00", referencePrice: "€ 37,00", referenceDate: REFERENCE_DATE, image: "/menu/vino/josic-cuvee.webp" },
      { name: "Muškat", size: "0,75 l", price: "€ 37,00", referencePrice: "€ 37,00", referenceDate: REFERENCE_DATE, image: null },
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
      { name: "Josić Graševina", size: "0,10 l", price: "€ 5,20", referencePrice: "€ 5,20", referenceDate: REFERENCE_DATE, image: "/menu/vino/glas-bijelo.webp" },
      { name: "Coronica Malvazija", size: "0,10 l", price: "€ 5,20", referencePrice: "€ 5,20", referenceDate: REFERENCE_DATE, image: "/menu/vino/glas-bijelo.webp" },
      { name: "Josić Cuvee", size: "0,10 l", price: "€ 5,20", referencePrice: "€ 5,20", referenceDate: REFERENCE_DATE, image: "/menu/vino/glas-crno.webp" },
      { name: "Muškat", size: "0,10 l", price: "€ 5,20", referencePrice: "€ 5,20", referenceDate: REFERENCE_DATE, image: null },
      { name: "Gemišt", size: "0,20 l", price: "€ 5,50", referencePrice: "€ 5,50", referenceDate: REFERENCE_DATE, image: "/menu/vino/glas-bijelo.webp" },
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
      { name: "Freixenet", size: "0,20 l", price: "€ 7,60", referencePrice: "€ 7,60", referenceDate: REFERENCE_DATE, image: "/menu/pjenusci/freixenet-020.webp" },
      { name: "Freixenet", size: "0,75 l", price: "€ 32,00", referencePrice: "€ 32,00", referenceDate: REFERENCE_DATE, image: "/menu/pjenusci/freixenet-075.webp" },
      { name: "Moet & Chandon", size: "0,75 l", price: "€ 125,00", referencePrice: "€ 125,00", referenceDate: REFERENCE_DATE, image: "/menu/pjenusci/moet-chandon.webp" },
      { name: "Prosecco", size: "0,10 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: "/menu/pjenusci/prosecco.webp" },
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
      { name: "Kuhano vino", size: "0,20 l", price: "€ 4,20", referencePrice: "€ 4,20", referenceDate: REFERENCE_DATE, image: null },
      { name: "Kuhani Gin", size: "0,30 l", price: "€ 6,80", referencePrice: "€ 6,80", referenceDate: REFERENCE_DATE, image: null },
      { name: "Kuhani Antique", size: "0,30 l", price: "€ 6,20", referencePrice: "€ 6,20", referenceDate: REFERENCE_DATE, image: null },
      { name: "Kuhani Aperol", size: "0,30 l", price: "€ 6,80", referencePrice: "€ 6,80", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
  {
    id: "domestic",
    title: "Domaća Pića",
    titleEn: "Domestic Spirits",
    shortTitle: "Domaća",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#D9A45B",
    items: [
      { name: "Amaro", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Pelinkovac", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Borovnica", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Višnjevac", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Lozovača", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Medica", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Orahovac", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Pelinkovac Antique", size: "0,03 l", price: "€ 3,90", referencePrice: "€ 3,90", referenceDate: REFERENCE_DATE, image: null },
      { name: "Rum", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Šljivovica", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Travarica", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Viljamovka", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Teranino", size: "0,03 l", price: "€ 3,50", referencePrice: "€ 3,50", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
  {
    id: "imported",
    title: "Strana Pića",
    titleEn: "Imported Spirits",
    shortTitle: "Strana",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#D9A45B",
    items: [
      { name: "Jack Daniel's", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Gentleman Jack Daniel's", size: "0,03 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Campari", size: "0,03 l", price: "€ 4,00", referencePrice: "€ 4,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Chivas Regal", size: "0,03 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Baileys", size: "0,03 l", price: "€ 4,00", referencePrice: "€ 4,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Hennessy", size: "0,03 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Jameson", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Johnnie Walker Red", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Johnnie Walker Black", size: "0,03 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Jagermeister", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Martini", size: "0,05 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Tequila Sierra Silver", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Disaronno Amaretto", size: "0,03 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Southern Comfort", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
  {
    id: "gin",
    title: "Gin",
    titleEn: "Gin",
    shortTitle: "Gin",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#D9A45B",
    items: [
      { name: "Tanqueray", size: "0,03 l", price: "€ 4,00", referencePrice: "€ 4,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Gin Mare", size: "0,03 l", price: "€ 6,00", referencePrice: "€ 6,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Hendricks", size: "0,03 l", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Monkey 47", size: "0,03 l", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
  {
    id: "rum",
    title: "Rum",
    titleEn: "Rum",
    shortTitle: "Rum",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#D9A45B",
    items: [
      { name: "Havana Club 3 y Old", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Bacardi", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Malibu", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Diplomatico Reserva Exclusiva", size: "0,03 l", price: "€ 6,50", referencePrice: "€ 6,50", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
  {
    id: "vodka",
    title: "Vodka",
    titleEn: "Vodka",
    shortTitle: "Vodka",
    icon: <FlaskConical className="w-4 h-4" />,
    accentColor: "#D9A45B",
    items: [
      { name: "Smirnoff", size: "0,03 l", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Belvedere", size: "0,03 l", price: "€ 6,00", referencePrice: "€ 6,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Beluga", size: "0,03 l", price: "€ 6,00", referencePrice: "€ 6,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Grey Goose", size: "0,03 l", price: "€ 6,00", referencePrice: "€ 6,00", referenceDate: REFERENCE_DATE, image: null },
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
      { name: "SKINNY B*TCH", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/skinny-bitch.webp", description: "Vodka, soda water, limeta" },
      { name: "COPACABANA", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/copacabana.webp", description: "Rum, kokosov sirup, ananas, limeta" },
      { name: "MARGARITA", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/margarita.webp", description: "Tequila, triple sec, limeta, sol" },
      { name: "MOJITO", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/mojito.webp", description: "Rum, svježa metvica, limeta, šećer, soda" },
      { name: "STRAWBERRY", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/strawberry.webp", description: "Vodka, jagoda, limeta, soda" },
      { name: "ESPRESSO MARTINI", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, description: "Vodka, espresso, Kahlúa", image: "/menu/kokteli/espresso-martini.webp" },
      { name: "PORNSTAR MARTINI", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/pornstar-martini.webp", description: "Vodka, marakuja, vanilija, Prosecco" },
      { name: "OLD FASHION", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/old-fashioned.webp", description: "Whiskey, Angostura bitters, šećer, naranča" },
      { name: "NEGRONI", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, description: "Gin, Campari, slatki vermut", image: "/menu/kokteli/negroni.webp" },
      { name: "SUMMER KISS", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/summer-kiss.webp", description: "Bezalkoholni — limunada, bazga, metvica" },
      { name: "TOM COLLINS", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/tom-collins.webp", description: "Gin, limeta, šećer, soda" },
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
      { name: "Amaretto Sour", price: "€ 11,00", referencePrice: "€ 11,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/amaretto-sour.webp" },
      { name: "Antique Sour", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/antique-sour.webp" },
      { name: "Aperol Sour", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/aperol-sour.webp" },
      { name: "Gin Sour", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/gin-sour.webp" },
      { name: "Rum Sour", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/rum-sour.webp" },
      { name: "Teranino Sour", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/teranino-sour.webp" },
      { name: "Vodka Sour", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/vodka-sour.webp" },
      { name: "Whiskey Sour", price: "€ 9,00", referencePrice: "€ 9,00", referenceDate: REFERENCE_DATE, image: "/menu/kokteli/whiskey-sour.webp" },
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
      { name: "RASPBERRY SPRITZ", price: "€ 8,00", referencePrice: "€ 8,00", referenceDate: REFERENCE_DATE, image: "/menu/spritz/raspberry-spritz.webp" },
      { name: "APEROL SPRITZ", price: "€ 8,00", referencePrice: "€ 8,00", referenceDate: REFERENCE_DATE, image: "/menu/spritz/aperol-spritz.webp" },
      { name: "CAMPARI SPRITZ", price: "€ 8,00", referencePrice: "€ 8,00", referenceDate: REFERENCE_DATE, image: "/menu/spritz/campari-spritz.webp" },
      { name: "LIMONCELLO SPRITZ", price: "€ 8,00", referencePrice: "€ 8,00", referenceDate: REFERENCE_DATE, image: "/menu/spritz/limoncello-spritz.webp" },
      { name: "HUGO", price: "€ 8,00", referencePrice: "€ 8,00", referenceDate: REFERENCE_DATE, image: "/menu/spritz/hugo.webp" },
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
      { name: "Kava + Limunada", size: "0,25 l", price: "€ 4,80", referencePrice: "€ 4,80", referenceDate: REFERENCE_DATE, image: null },
      { name: "Kava + Cijeđena naranča", size: "0,25 l", price: "€ 5,60", referencePrice: "€ 5,60", referenceDate: REFERENCE_DATE, image: null },
      { name: "Kava + Cijeđeni Mix", size: "0,25 l", price: "€ 6,00", referencePrice: "€ 6,00", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
  {
    id: "cigarettes",
    title: "Cigarete",
    titleEn: "Cigarettes",
    shortTitle: "Cigarete",
    icon: <Cigarette className="w-4 h-4" />,
    accentColor: "#A3A3A3",
    items: [
      { name: "Sobranie Gold", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Sobranie Black", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Sobranie Collection Cocktail", price: "€ 5,00", referencePrice: "€ 5,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Sobranie Laube Black", price: "€ 6,00", referencePrice: "€ 6,00", referenceDate: REFERENCE_DATE, image: null },
      { name: "Camel Yellow", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Camel Blue", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
      { name: "Winston Blue", price: "€ 4,50", referencePrice: "€ 4,50", referenceDate: REFERENCE_DATE, image: null },
    ],
  },
]

// Main groups for Level 1 navigation
export const mainGroups: MainGroup[] = [
  {
    id: "kava",
    title: "Kava",
    icon: <Coffee className="w-4 h-4" />,
    categoryIds: ["hot", "tea-cocoa", "extras"],
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
