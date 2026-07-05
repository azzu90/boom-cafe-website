import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Playfair_Display, Inter, Cabin as V0_Font_Cabin, Geist_Mono as V0_Font_Geist_Mono } from "next/font/google"

// Initialize fonts
const _cabin = V0_Font_Cabin({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const _geistMono = V0_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "BOOM - Coffee & Cocktail bar | Zagreb",
  description:
    "Premium coffee shop and cocktail bar in the heart of Zagreb. Enjoy artisan coffee by day and craft cocktails by night at Preradovićeva ulica 4.",
  keywords: "coffee shop, cocktail bar, Zagreb, Preradovićeva, cafe, bar, drinks",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
