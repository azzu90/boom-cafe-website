import { DrinkMenu } from "@/components/drink-menu"

export function Menu() {
  return (
    <section id="menu" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">Naš Cijenik</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Od jutarnje kave do večernjih koktela - istražite našu bogatu ponudu pića za svaki trenutak dana
          </p>
        </div>

        <DrinkMenu />

        <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <p className="mb-2">Zabranjeno usluživanje alkoholnih pića osobama mlađim od 18 godina.</p>
          <p className="mb-2">Zabranjena je prodaja cigareta i duhanskih proizvoda maloljetnicima.</p>
          <p>
            Sve cijene su izražene u eurima. Obveznik nije u sustavu PDV-a, PDV nije obračunat na temelju čl. 90 st.1
            Zakona o PDV-u.
          </p>
        </div>
      </div>
    </section>
  )
}
