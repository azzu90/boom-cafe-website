import { categories, PRICE_LIST_STORAGE_NUMBER, PRICE_LIST_PUBLISHED_AT } from "@/lib/menu-data"

export const dynamic = "force-static"

const HEADER = [
  "naziv_usluge",
  "kategorija",
  "jedinica_mjere",
  "maloprodajna_cijena_eur",
  "posebni_oblik_prodaje",
  "dodatna_cijena_eur",
  "datum_dodatne_cijene",
]

function toDecimal(price: string): string {
  return price.replace(/[^\d,.]/g, "").replace(",", ".")
}

function escapeCsv(value: string): string {
  return /[",\n\r]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

export function GET() {
  const rows = categories.flatMap((category) =>
    category.items.map((item) => [
      item.size ? `${item.name} ${item.size}` : item.name,
      category.title,
      item.size ?? "",
      toDecimal(item.price),
      "ne",
      toDecimal(item.referencePrice),
      item.referenceDate,
    ]),
  )

  const csv = [HEADER, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\r\n") + "\r\n"
  const filename = `kafic_Preradoviceva ulica 4 Zagreb_01_${PRICE_LIST_STORAGE_NUMBER}_${PRICE_LIST_PUBLISHED_AT}.csv`

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  })
}
