import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

const ROOTS = ['public/images', 'public']
const MIN_BYTES = 400_000

async function walk(dir) {
  let entries
  try {
    entries = await readdir(dir)
  } catch {
    return
  }
  for (const name of entries) {
    const filePath = join(dir, name)
    const info = await stat(filePath)
    if (info.isDirectory()) {
      await walk(filePath)
      continue
    }
    if (!/\.(png|jpe?g)$/i.test(name) || info.size < MIN_BYTES) continue

    const before = info.size
    const pipeline = /\.png$/i.test(name)
      ? sharp(filePath).png({ compressionLevel: 9, effort: 10, palette: true })
      : sharp(filePath).jpeg({ quality: 82, mozjpeg: true })

    const out = await pipeline.toBuffer()
    if (out.length < before) {
      await sharp(out).toFile(filePath)
      console.log(`${filePath}: ${(before / 1024 / 1024).toFixed(2)} MB → ${(out.length / 1024 / 1024).toFixed(2)} MB`)
    }
  }
}

for (const root of ROOTS) {
  await walk(root)
}
