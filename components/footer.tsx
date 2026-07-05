"use client"

import Image from "next/image"
import { track } from "@vercel/analytics"

export function Footer() {
  const handleGoogleMapsClick = () => {
    track("external_link_clicked", { type: "google_maps", destination: "boom_location", location: "footer" })
  }

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 ml-0 mb-8 px-0 gap-16 mt-0">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">BOOM</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Coffee & Cocktail bar u srcu Zagreba. Vaše omiljeno mjesto za jutarnju kavu i večernje koktele.
            </p>
          </div>

          <div className="mx-16">
            <h4 className="font-serif font-bold mb-4">Radno vrijeme</h4>
            <div className="text-sm opacity-90">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                <span>Pon - Čet:</span>
                <span>08:00 - 00:00</span>
                <span>Pet - Sub:</span>
                <span>08:00 - 02:00</span>
                <span>Ned:</span>
                <span>09:00 - 23:00</span>
              </div>
            </div>
          </div>

          <div className="mx-16">
            <h4 className="font-serif font-bold mb-4">Kontakt</h4>
            <div className="text-sm space-y-2 opacity-90">
              <a
                href="https://maps.app.goo.gl/2VQc1NMt1yTcMiaW8"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors inline-block"
                onClick={handleGoogleMapsClick}
              >
                <p>Preradovićeva ulica 4</p>
                <p>10 000 Zagreb</p>
              </a>
              <p>OIB: 04072113619</p>
            </div>
          </div>

          <div>
            <Image
              src="/boom-logo.jpg"
              alt="BOOM Coffee & Cocktail bar"
              width={300}
              height={300}
              className="h-auto my-0 py-0 w-[205px]"
            />
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
          <p>© {new Date().getFullYear()} BOOM - Coffee & Cocktail bar. Sva prava pridržana.</p>
        </div>

        <div className="pt-2 text-center">
          <a
            href="https://mirano-solutions.com/?utm_source=boom-bar.eu&utm_medium=referral&utm_campaign=footer_credit&utm_content=powered_by"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 opacity-50 hover:opacity-70 transition-opacity"
          >
            <span className="text-sm">developed by</span>
            <Image src="/mirano-logo.svg" alt="Mirano Solutions" width={480} height={120} className="h-24 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  )
}
