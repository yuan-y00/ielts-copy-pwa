// This script merges batch files and existing data into the final JSON
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, '../src/data/ielts_words.json');
const BATCH_DIR = path.resolve(__dirname, '../src/data/');

const ALLOWED_THEMES = [
  'Education and Work',
  'Environment and Energy',
  'Technology and Society',
  'Health and Psychology',
  'Culture and History',
  'Economy and Business',
  'Science and Research',
  'Urbanization and Transport',
  'Media and Communication',
  'Government and Law',
  'Family and Society',
  'Travel and Globalization',
];

interface WordEntry {
  id: number;
  word: string;
  theme: string;
  translation: string;
  shortMeaningInSentence: string;
  exampleEn: string;
  exampleZh: string;
}

// Read existing entries
let existingData: WordEntry[] = [];
if (fs.existsSync(DATA_PATH)) {
  existingData = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  console.log(`Read ${existingData.length} existing entries`);
}

// Collect all batch files
const batchFiles = fs.readdirSync(BATCH_DIR).filter(f => f.startsWith('new_batch_') && f.endsWith('.json'));
console.log(`Found ${batchFiles.length} batch files: ${batchFiles.join(', ')}`);

let newEntries: any[][] = [];
for (const f of batchFiles) {
  const content = JSON.parse(fs.readFileSync(path.join(BATCH_DIR, f), 'utf-8'));
  newEntries.push(...content);
  console.log(`Loaded ${content.length} entries from ${f}`);
}

console.log(`Total new entries from batches: ${newEntries.length}`);

// Convert array entries to WordEntry objects
const converted: WordEntry[] = newEntries.map((arr, i) => ({
  id: existingData.length + i + 1,
  word: String(arr[0]).trim(),
  theme: String(arr[1]).trim(),
  translation: String(arr[2]).trim(),
  shortMeaningInSentence: String(arr[3]).trim(),
  exampleEn: String(arr[4]).trim(),
  exampleZh: String(arr[5]).trim(),
}));

// Validate themes
for (const e of converted) {
  if (!ALLOWED_THEMES.includes(e.theme)) {
    console.error(`INVALID THEME: [id=${e.id}] ${e.word}: "${e.theme}"`);
  }
}

// Merge and write
const allEntries = [...existingData, ...converted];
console.log(`Writing ${allEntries.length} total entries...`);
fs.writeFileSync(DATA_PATH, JSON.stringify(allEntries, null, 2) + '\n', 'utf-8');
console.log('Done! Now run: npm run fix:words && npm run check:words');
