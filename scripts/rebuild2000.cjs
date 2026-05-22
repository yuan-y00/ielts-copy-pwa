const fs = require('fs');
const path = require('path');

const SCRIPTS_DIR = __dirname;

// Load all batch files
const batchFiles = fs.readdirSync(SCRIPTS_DIR)
  .filter(f => f.startsWith('words_batch') && f.endsWith('.cjs'))
  .sort();

let allRaw = [];
for (const f of batchFiles) {
  const entries = require('./' + f);
  allRaw = allRaw.concat(entries);
}
console.log('Raw entries loaded:', allRaw.length);

// Deduplicate by word (case-insensitive), keeping first occurrence
const seen = new Set();
const unique = [];
for (const arr of allRaw) {
  const word = String(arr[0]).trim().toLowerCase();
  if (!seen.has(word)) {
    seen.add(word);
    unique.push(arr);
  }
}
console.log('Unique entries:', unique.length);

// Take only first N to reach exactly 2000
const target = 2000;
const selected = unique.slice(0, target);
console.log('Selected:', selected.length);

// Convert to JSON objects with sequential IDs
const entries = selected.map((arr, i) => ({
  id: i + 1,
  word: String(arr[0]).trim(),
  theme: String(arr[1]).trim(),
  translation: String(arr[2]).trim(),
  shortMeaningInSentence: String(arr[3]).trim(),
  exampleEn: String(arr[4]).trim(),
  exampleZh: String(arr[5]).trim(),
}));

const DATA_PATH = path.resolve(__dirname, '../src/data/ielts_words.json');
fs.writeFileSync(DATA_PATH, JSON.stringify(entries, null, 2) + '\n', 'utf-8');
console.log('Written', entries.length, 'entries to ielts_words.json');
