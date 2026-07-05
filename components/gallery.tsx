export function Gallery() {
  const images = [
    {
      src: "/espresso-coffee-being-made.jpg",
      alt: "Espresso preparation",
    },
    {
      src: "/colorful-cocktails-on-bar.jpg",
      alt: "Craft cocktails",
    },
    {
      src: "/cozy-cafe-interior-seating.jpg",
      alt: "Cafe interior",
    },
    {
      src: "/latte-art-cappuccino.jpg",
      alt: "Latte art",
    },
    {
      src: "/bartender-cocktail.png",
      alt: "Bartender at work",
    },
    {
      src: "/boom-terrace-golden-hour.jpg",
      alt: "BOOM terrace during golden hour",
    },
  ]

  return (
    <section id="gallery" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">Galerija</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Zavirite u našu atmosferu i otkrijte zašto je BOOM omiljeno mjesto za opuštanje u Zagrebu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer">
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
