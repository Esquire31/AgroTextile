import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const translationsDir = path.resolve(__dirname, '../src/core/locale/translations')
const sourceFile = 'en-in.json'

const sourcePath = path.join(translationsDir, sourceFile)
const sourceMessages = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
const sourceEntries = Object.entries(sourceMessages)

const localeFiles = fs
  .readdirSync(translationsDir)
  .filter((file) => file.endsWith('.json') && file !== sourceFile)

if (localeFiles.length === 0) {
  console.log('No target locale files found.')
  process.exit(0)
}

for (const localeFile of localeFiles) {
  const localePath = path.join(translationsDir, localeFile)
  const localeMessages = JSON.parse(fs.readFileSync(localePath, 'utf8'))

  let missingCount = 0

  for (const [key, value] of sourceEntries) {
    if (!(key in localeMessages)) {
      localeMessages[key] = value
      missingCount += 1
    }
  }

  fs.writeFileSync(localePath, `${JSON.stringify(localeMessages, null, 4)}\n`, 'utf8')
  console.log(`${localeFile}: filled ${missingCount} missing keys`)
}

console.log('Translation sync complete.')
