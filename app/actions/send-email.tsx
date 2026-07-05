"use server"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string
  const honeypot = formData.get("website") as string

  if (honeypot) {
    return { success: false, error: "Spam detected" }
  }

  if (!name || !email || !message) {
    return { success: false, error: "Sva polja su obavezna" }
  }

  if (!email.includes("@")) {
    return { success: false, error: "Unesite valjanu email adresu" }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "BOOM Kontakt <info@boom-bar.eu>",
        to: ["neubar.zg@gmail.com"],
        reply_to: email,
        subject: `Nova poruka od ${name}`,
        html: `
          <h2>Nova kontakt forma poruka</h2>
          <p><strong>Ime:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Poruka:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[v0] Resend API error:", data)
      throw new Error(data.message || "Failed to send email")
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Email send error:", error)
    return { success: false, error: "Greška pri slanju poruke. Molimo pokušajte kasnije." }
  }
}
