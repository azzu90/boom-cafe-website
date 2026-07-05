import { QRMenu } from "@/components/qr-menu"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Menu - BOOM Coffee & Cocktail bar",
  description: "Cijenik - BOOM Coffee & Cocktail bar Zagreb",
  robots: "noindex, nofollow",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function QRPage() {
  return (
    <div className="min-h-screen bg-background qr-menu-page">
      <QRMenu />
    </div>
  )
}
