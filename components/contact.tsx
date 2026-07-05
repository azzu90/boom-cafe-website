"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Instagram } from "lucide-react"
import { sendContactEmail } from "@/app/actions/send-email"
import { useTransition, useState, useRef } from "react"
import { track } from "@vercel/analytics"

export function Contact() {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus(null)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await sendContactEmail(formData)

      if (result.success) {
        setStatus({ type: "success", message: "Poruka uspješno poslana!" })
        track("contact_form_submitted", { status: "success" })
        formRef.current?.reset()
      } else {
        setStatus({ type: "error", message: result.error || "Greška pri slanju" })
        track("contact_form_submitted", { status: "error", error: result.error })
      }
    })
  }

  const handleGoogleMapsClick = () => {
    track("external_link_clicked", { type: "google_maps", destination: "boom_location" })
  }

  const handleInstagramClick = () => {
    track("external_link_clicked", { type: "instagram", destination: "boom_cvjetni" })
  }

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">Kontaktirajte nas</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-balance">
            Imate pitanja ili želite rezervirati stol? Javite nam se!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg mb-2">Adresa</h3>
                  <a
                    href="https://maps.app.goo.gl/2VQc1NMt1yTcMiaW8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground leading-relaxed hover:text-accent transition-colors inline-block"
                    onClick={handleGoogleMapsClick}
                  >
                    Preradovićeva ulica 4<br />
                    10 000 Zagreb, Hrvatska
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Instagram className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg mb-2">Instagram</h3>
                  <a
                    href="https://www.instagram.com/boom_cvjetni/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    onClick={handleInstagramClick}
                  >
                    @boom_cvjetni
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ime i prezime
                </label>
                <Input id="name" name="name" placeholder="Vaše ime" required disabled={isPending} />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" name="email" type="email" placeholder="vas@email.com" required disabled={isPending} />
              </div>

              <div className="hidden">
                <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Poruka
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Vaša poruka..."
                  rows={5}
                  required
                  disabled={isPending}
                />
              </div>

              {status && (
                <div
                  className={`p-4 rounded-lg text-sm ${
                    status.type === "success"
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Šalje se..." : "Pošalji poruku"}
              </Button>
            </form>
          </Card>
        </div>

        {/* Map */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="overflow-hidden">
            <div className="aspect-[21/9] bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2781.0234567890123!2d15.9819!3d45.8131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDQ4JzQ3LjIiTiAxNcKwNTgnNTQuOCJF!5e0!3m2!1sen!2shr!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BOOM Cafe Location"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
