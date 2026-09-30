#!/usr/bin/env node
// Usage: node scripts/process-menu-image.mjs <input-file> <output-file.webp>
import sharp from "sharp"

const TOLERANCE = 40
const TARGET = 564
const CANVAS = 600
const QUALITY = 85

const [, , input, output] = process.argv
if (!input || !output) {
  console.error("Usage: node scripts/process-menu-image.mjs <input-file> <output-file.webp>")
  process.exit(1)
}

const { data, info } = await sharp(input)
  .flatten({ background: "#ffffff" })
  .removeAlpha()
  .toColourspace("srgb")
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height } = info
const channels = info.channels
const total = width * height

const borderIndices = []
for (let x = 0; x < width; x++) {
  borderIndices.push(x, (height - 1) * width + x)
}
for (let y = 1; y < height - 1; y++) {
  borderIndices.push(y * width, y * width + width - 1)
}

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]
}
const reference = [0, 1, 2].map((c) => median(borderIndices.map((i) => data[i * channels + c])))

const isNearBackground = (i) => {
  const o = i * channels
  return (
    Math.abs(data[o] - reference[0]) <= TOLERANCE &&
    Math.abs(data[o + 1] - reference[1]) <= TOLERANCE &&
    Math.abs(data[o + 2] - reference[2]) <= TOLERANCE
  )
}

const background = new Uint8Array(total)
const stack = new Int32Array(total)
let top = 0
for (const i of borderIndices) {
  if (!background[i] && isNearBackground(i)) {
    background[i] = 1
    stack[top++] = i
  }
}
while (top > 0) {
  const i = stack[--top]
  const x = i % width
  const y = (i - x) / width
  const neighbors = [
    x > 0 ? i - 1 : -1,
    x < width - 1 ? i + 1 : -1,
    y > 0 ? i - width : -1,
    y < height - 1 ? i + width : -1,
  ]
  for (const n of neighbors) {
    if (n >= 0 && !background[n] && isNearBackground(n)) {
      background[n] = 1
      stack[top++] = n
    }
  }
}

let minX = width
let minY = height
let maxX = -1
let maxY = -1
for (let i = 0; i < total; i++) {
  const o = i * channels
  if (background[i]) {
    data[o] = 0
    data[o + 1] = 0
    data[o + 2] = 0
    continue
  }
  const x = i % width
  const y = (i - x) / width
  if (x < minX) minX = x
  if (x > maxX) maxX = x
  if (y < minY) minY = y
  if (y > maxY) maxY = y
}

if (maxX < 0) {
  console.error("No product found: the whole image matched the background.")
  process.exit(1)
}

const cropWidth = maxX - minX + 1
const cropHeight = maxY - minY + 1
const scale = TARGET / Math.max(cropWidth, cropHeight)
const productWidth = Math.round(cropWidth * scale)
const productHeight = Math.round(cropHeight * scale)

const product = await sharp(data, { raw: { width, height, channels } })
  .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
  .resize(productWidth, productHeight, { fit: "fill" })
  .png()
  .toBuffer()

await sharp({
  create: { width: CANVAS, height: CANVAS, channels: 3, background: "#000000" },
})
  .composite([
    {
      input: product,
      left: Math.round((CANVAS - productWidth) / 2),
      top: Math.round((CANVAS - productHeight) / 2),
    },
  ])
  .webp({ quality: QUALITY })
  .toFile(output)

console.log(`Product size: ${productWidth}x${productHeight}px`)
