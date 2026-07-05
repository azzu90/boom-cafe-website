import { Card } from "@/components/ui/card"
import { Clock, MapPin, Heart } from "lucide-react"

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">O nama</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            BOOM je više od običnog kafića - to je mjesto gdje se dan počinje s savršenom kavom, a večer nastavlja uz
            craft koktele. Smješteni u srcu Zagreba, nudimo jedinstveno iskustvo koje spaja opuštenu atmosferu dnevnog
            kafića s elegancijom večernjeg cocktail bara.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">Radno vrijeme</h3>
            <div className="text-muted-foreground text-sm">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 justify-center mx-auto w-fit">
                <span className="text-left">Pon - Čet:</span>
                <span>08:00 - 00:00</span>
                <span className="text-left">Pet - Sub:</span>
                <span>08:00 - 02:00</span>
                <span className="text-left">Ned:</span>
                <span>09:00 - 23:00</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">Lokacija</h3>
            <a
              href="https://maps.app.goo.gl/2VQc1NMt1yTcMiaW8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground leading-relaxed hover:text-accent transition-colors inline-block"
            >
              Preradovićeva ulica 4<br />
              10 000 Zagreb
              <br />
              Hrvatska
            </a>
          </Card>

          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-3">Naša misija</h3>
            <p className="text-muted-foreground leading-relaxed">
              Pružiti gostima nezaboravno iskustvo kroz kvalitetne napitke i toplu atmosferu
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
