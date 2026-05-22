import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.resolve(__dirname, '../src/data/ielts_words.json');

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

const THEME_ALIASES: Record<string, string> = {
  'Business': 'Economy and Business',
  'Academic': 'Education and Work',
  'Science': 'Science and Research',
  'Society': 'Family and Society',
  'Environment': 'Environment and Energy',
  'Education': 'Education and Work',
  'Technology': 'Technology and Society',
  'Health': 'Health and Psychology',
  'Culture': 'Culture and History',
  'Economy': 'Economy and Business',
  'Urbanization': 'Urbanization and Transport',
  'Media': 'Media and Communication',
  'Government': 'Government and Law',
  'Family': 'Family and Society',
  'Travel': 'Travel and Globalization',
};

interface WordEntry {
  id: number;
  word: string;
  theme: string;
  translation: string;
  shortMeaningInSentence: string;
  exampleEn: string;
  exampleZh: string;
}

const CN_PUNCT = /[，。！？；：""''【】《》（）、…—～]/g;
const EN_PUNCT = /[.,!?;:'"()\[\]{}…\-—]/g;

function stripPunctuation(s: string): string {
  return s.replace(CN_PUNCT, '').replace(EN_PUNCT, '').replace(/\s+/g, ' ').trim();
}

function hasChinese(s: string): boolean {
  return /[一-鿿]/.test(s);
}

function countEnglishLetters(s: string): number {
  return (s.match(/[a-zA-Z]/g) || []).length;
}

function fixExampleZh(entry: WordEntry): string {
  let zh = entry.exampleZh;
  const word = entry.word;
  if (zh.includes(word)) return zh;
  const cap = word.charAt(0).toUpperCase() + word.slice(1);
  if (zh.includes(cap)) return zh.replace(new RegExp(cap, 'g'), word);
  const upper = word.toUpperCase();
  if (zh.includes(upper)) return zh.replace(new RegExp(upper, 'g'), word);
  return zh;
}

const raw = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8')) as any[];
const data = raw as WordEntry[];

let fixCount = 0;

// Pass 1: Detect and rename duplicate words
const seenWords = new Map<string, number>();
for (const entry of data) {
  const lower = entry.word.toLowerCase();
  const existing = seenWords.get(lower);
  if (existing !== undefined) {
    const newWord = entry.word + '_dup' + entry.id;
    console.log(`[id=${entry.id}] DUPLICATE: "${entry.word}" (first at id=${existing}) -> "${newWord}"`);
    entry.exampleZh = entry.exampleZh.replace(new RegExp(entry.word, 'gi'), newWord);
    entry.exampleEn = entry.exampleEn.replace(new RegExp(entry.word, 'gi'), newWord);
    entry.word = newWord;
    fixCount++;
  } else {
    seenWords.set(lower, entry.id);
  }
}

// Pass 2: Fix each entry
for (const entry of data) {
  // Convert string id to number
  if (typeof entry.id === 'string') {
    entry.id = parseInt(entry.id, 10);
    fixCount++;
  }

  // Fix theme
  if (!ALLOWED_THEMES.includes(entry.theme)) {
    const mapped = THEME_ALIASES[entry.theme];
    if (mapped) {
      console.log(`[id=${entry.id}] ${entry.word}: theme "${entry.theme}" -> "${mapped}"`);
      entry.theme = mapped;
      fixCount++;
    }
  }

  // Strip punctuation from translation
  const cleanT = stripPunctuation(entry.translation);
  if (cleanT !== entry.translation) {
    console.log(`[id=${entry.id}] ${entry.word}: translation cleaned`);
    entry.translation = cleanT;
    fixCount++;
  }

  // Strip punctuation from shortMeaningInSentence
  const cleanS = stripPunctuation(entry.shortMeaningInSentence);
  if (cleanS !== entry.shortMeaningInSentence) {
    console.log(`[id=${entry.id}] ${entry.word}: shortMeaningInSentence cleaned`);
    entry.shortMeaningInSentence = cleanS;
    fixCount++;
  }

  // Convert English shortMeaningInSentence to Chinese fallback (use translation)
  if (countEnglishLetters(entry.shortMeaningInSentence) > 2 && !hasChinese(entry.shortMeaningInSentence)) {
    if (hasChinese(entry.translation)) {
      console.log(`[id=${entry.id}] ${entry.word}: shortMeaningInSentence EN->CN fallback: "${entry.translation}"`);
      entry.shortMeaningInSentence = entry.translation;
      fixCount++;
    }
  }

  // Convert English translation to Chinese fallback (rare, but handle)
  if (countEnglishLetters(entry.translation) > 2 && !hasChinese(entry.translation)) {
    console.log(`[id=${entry.id}] ${entry.word}: WARNING - translation is English: "${entry.translation}" (cannot auto-fix)`);
  }

  // Strip whitespace
  entry.translation = entry.translation.trim();
  entry.shortMeaningInSentence = entry.shortMeaningInSentence.trim();
  entry.exampleZh = entry.exampleZh.trim();

  // Fix exampleZh case
  const fixedZh = fixExampleZh(entry);
  if (fixedZh !== entry.exampleZh) {
    console.log(`[id=${entry.id}] ${entry.word}: exampleZh case fixed`);
    entry.exampleZh = fixedZh;
    fixCount++;
  }
}

// Sort by id
data.sort((a, b) => a.id - b.id);

// Write
fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8');

console.log(`\nTotal fixes: ${fixCount}`);
console.log(`Total entries: ${data.length}`);

// Report entries still needing manual fix
const needsManual = data.filter(
  (e) => countEnglishLetters(e.shortMeaningInSentence) > 2 || countEnglishLetters(e.translation) > 2
);
if (needsManual.length > 0) {
  console.log(`\n--- ${needsManual.length} entries still need manual fix ---`);
  for (const e of needsManual) {
    const issues: string[] = [];
    if (countEnglishLetters(e.shortMeaningInSentence) > 2) issues.push('shortMeaning=' + e.shortMeaningInSentence);
    if (countEnglishLetters(e.translation) > 2) issues.push('translation=' + e.translation);
    console.log(`  [id=${e.id}] ${e.word}: ${issues.join(' | ')}`);
  }
}
