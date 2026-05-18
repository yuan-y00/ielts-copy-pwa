import words from '../src/data/ielts_words.json';

interface WordEntry {
  id: number;
  word: string;
  theme: string;
  translation: string;
  shortMeaningInSentence: string;
  exampleEn: string;
  exampleZh: string;
}

// 1. Must be a JSON array
if (!Array.isArray(words)) {
  console.error('ielts_words.json must be a JSON array');
  process.exit(1);
}

const data = words as WordEntry[];

const REQUIRED_FIELDS = [
  'id',
  'word',
  'theme',
  'translation',
  'shortMeaningInSentence',
  'exampleEn',
  'exampleZh',
] as const;

const CN_PUNCT = /[，。！？；：""''【】《》（）、…—～]/;
const EN_PUNCT = /[.,!?;:'"()\[\]{}…\-—]/;

function hasPunctuation(s: string): boolean {
  return CN_PUNCT.test(s) || EN_PUNCT.test(s);
}

const errors: string[] = [];
const seenWords = new Map<string, number>(); // lowercase word -> id
const seenIds = new Set<number>();

for (const w of data) {
  const tag = `[id=${w.id}]${w.word ? ` word="${w.word}"` : ''}`;

  // 2. Required fields exist
  for (const field of REQUIRED_FIELDS) {
    if (!(field in w)) {
      errors.push(`${tag}: missing field "${field}"`);
    }
  }
  // Stop further checks on this entry if fields are missing
  if (REQUIRED_FIELDS.some((f) => !(f in w))) continue;

  // 3. id must be a number
  if (typeof w.id !== 'number' || Number.isNaN(w.id)) {
    errors.push(`${tag}: id must be a number, got ${typeof w.id}`);
    continue;
  }

  // 4. id must not repeat
  if (seenIds.has(w.id)) {
    errors.push(`${tag}: duplicate id`);
    continue;
  }
  seenIds.add(w.id);

  // 6. word must not be empty
  if (typeof w.word !== 'string' || w.word.trim() === '') {
    errors.push(`${tag}: word is empty`);
    continue;
  }

  // 7. word must not repeat (case-insensitive)
  const lower = w.word.toLowerCase();
  if (seenWords.has(lower)) {
    errors.push(`${tag}: duplicate word (case-insensitive), first seen at id=${seenWords.get(lower)}`);
  } else {
    seenWords.set(lower, w.id);
  }

  // 8. word must not contain spaces
  if (/\s/.test(w.word)) {
    errors.push(`${tag}: word contains spaces`);
  }

  // 9. theme must not be empty
  if (typeof w.theme !== 'string' || w.theme.trim() === '') {
    errors.push(`${tag}: theme is empty`);
  }

  // 10. translation must not be empty
  if (typeof w.translation !== 'string' || w.translation.trim() === '') {
    errors.push(`${tag}: translation is empty`);
  } else if (hasPunctuation(w.translation)) {
    // 11. translation must not have punctuation
    errors.push(`${tag}: translation has punctuation: "${w.translation}"`);
  }

  // 12. shortMeaningInSentence must not be empty
  if (
    typeof w.shortMeaningInSentence !== 'string' ||
    w.shortMeaningInSentence.trim() === ''
  ) {
    errors.push(`${tag}: shortMeaningInSentence is empty`);
  } else if (hasPunctuation(w.shortMeaningInSentence)) {
    // 13. shortMeaningInSentence must not have punctuation
    errors.push(
      `${tag}: shortMeaningInSentence has punctuation: "${w.shortMeaningInSentence}"`
    );
  }

  // 14. exampleEn must not be empty
  if (typeof w.exampleEn !== 'string' || w.exampleEn.trim() === '') {
    errors.push(`${tag}: exampleEn is empty`);
  }

  // 15. exampleZh must not be empty
  if (typeof w.exampleZh !== 'string' || w.exampleZh.trim() === '') {
    errors.push(`${tag}: exampleZh is empty`);
  } else if (!w.exampleZh.includes(w.word)) {
    // 16. exampleZh must contain the English word
    errors.push(
      `${tag}: exampleZh does not contain the English word "${w.word}"`
    );
  }
}

// 5. id must start from 1 and increment consecutively (only if we have ids)
if (seenIds.size > 0) {
  const ids = [...seenIds].sort((a, b) => a - b);
  if (ids[0] !== 1) {
    errors.push(`ids must start from 1, first id is ${ids[0]}`);
  }
  for (let i = 1; i < ids.length; i++) {
    if (ids[i] !== ids[i - 1] + 1) {
      errors.push(`ids are not consecutive: gap after id=${ids[i - 1]}`);
      break;
    }
  }
}

if (errors.length === 0) {
  console.log('Word data check passed.');
} else {
  for (const err of errors) {
    console.error(err);
  }
  console.error(`\n${errors.length} error(s) found.`);
  process.exit(1);
}
