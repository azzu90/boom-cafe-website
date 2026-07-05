import { Button } from "@/components/ui/button"
import { Coffee, Wine } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src="/boom-terrace-wide.jpg" alt="BOOM Cafe Terrace" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="/boom-logo.jpg"
              alt="BOOM Logo"
              className="w-[450px] md:w-[600px] h-auto"
              style={{ width: "75%", maxWidth: "600px" }}
            />
          </div>
          
          <p className="text-lg md:text-xl mb-8 text-white text-balance drop-shadow-lg">
            Preradovićeva ulica 4, Zagreb
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5" />
              <span>Premium Coffee</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Wine className="w-5 h-5" />
              <span>Craft Cocktails</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <a href="#menu">Pogledaj Cijenik</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <a href="#contact">Kontaktiraj nas</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
