const fs = require('fs');
const path = require('path');

const DATA_PATH = path.resolve(__dirname, '../src/data/ielts_words.json');
const SCRIPTS_DIR = __dirname;

// Read existing entries
let existing = [];
if (fs.existsSync(DATA_PATH)) {
  existing = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  console.log('Existing entries:', existing.length);
}

// Collect all batch files
const batchFiles = fs.readdirSync(SCRIPTS_DIR)
  .filter(f => f.startsWith('words_batch') && f.endsWith('.cjs'))
  .sort();
console.log('Batch files:', batchFiles.join(', '));

// Load all batches and concatenate
let allNewEntries = [];
for (const f of batchFiles) {
  const entries = require('./' + f);
  console.log(`  ${f}: ${entries.length} entries`);
  allNewEntries = allNewEntries.concat(entries);
}
console.log('Total new entries from batches:', allNewEntries.length);

// Convert to full objects, starting IDs after existing entries
const startId = existing.length + 1;
const newEntries = allNewEntries.map((arr, i) => ({
  id: startId + i,
  word: String(arr[0]).trim(),
  theme: String(arr[1]).trim(),
  translation: String(arr[2]).trim(),
  shortMeaningInSentence: String(arr[3]).trim(),
  exampleEn: String(arr[4]).trim(),
  exampleZh: String(arr[5]).trim(),
}));

console.log(`Generated ${newEntries.length} entries (id ${startId} to ${startId + newEntries.length - 1})`);

// Merge and write
const all = [...existing, ...newEntries];
fs.writeFileSync(DATA_PATH, JSON.stringify(all, null, 2) + '\n', 'utf-8');
console.log(`\nWritten ${all.length} total entries to ielts_words.json`);
