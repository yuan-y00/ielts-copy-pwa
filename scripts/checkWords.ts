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

const REQUIRED_FIELDS = [
  'id', 'word', 'theme', 'translation', 'shortMeaningInSentence', 'exampleEn', 'exampleZh',
] as const;

const CN_PUNCT = /[，。！？；：""''【】《》（）、…—～]/;
const EN_PUNCT = /[.,!?;:'"()\[\]{}…\-—]/;
const CN_CHAR = /[一-鿿]/;

function hasCnPunctuation(s: string): boolean {
  return CN_PUNCT.test(s);
}

function hasEnPunctuation(s: string): boolean {
  return EN_PUNCT.test(s);
}

function hasChinese(s: string): boolean {
  return CN_CHAR.test(s);
}

function countEnglishLetters(s: string): number {
  return (s.match(/[a-zA-Z]/g) || []).length;
}

function isEnglishPhrase(s: string): boolean {
  // If no Chinese characters and has more than 2 English letters, it's English
  return !hasChinese(s) && countEnglishLetters(s) > 2;
}

// 1. Must be a JSON array
if (!Array.isArray(words)) {
  console.error('ielts_words.json must be a JSON array');
  process.exit(1);
}

const data = words as WordEntry[];

console.log(`Checking ${data.length} entries...`);

const errors: string[] = [];
const seenWords = new Map<string, number>();
const seenIds = new Set<number>();

for (const w of data) {
  const tag = `[id=${w.id}]${w.word ? ` word="${w.word}"` : ''}`;

  // 3. Required fields exist
  for (const field of REQUIRED_FIELDS) {
    if (!(field in w)) {
      errors.push(`${tag}: missing field "${field}"`);
    }
  }
  if (REQUIRED_FIELDS.some((f) => !(f in w))) continue;

  // 4. id must be a number
  if (typeof w.id !== 'number' || Number.isNaN(w.id)) {
    errors.push(`${tag}: id must be a number, got ${typeof w.id}`);
    continue;
  }

  // 6. id must not repeat
  if (seenIds.has(w.id)) {
    errors.push(`${tag}: duplicate id`);
    continue;
  }
  seenIds.add(w.id);

  // 7. word must not be empty
  if (typeof w.word !== 'string' || w.word.trim() === '') {
    errors.push(`${tag}: word is empty`);
    continue;
  }

  // 8. word must not repeat (case-insensitive)
  const lower = w.word.toLowerCase();
  if (seenWords.has(lower)) {
    errors.push(`${tag}: duplicate word (case-insensitive), first seen at id=${seenWords.get(lower)}`);
  } else {
    seenWords.set(lower, w.id);
  }

  // 9. word must not contain spaces
  if (/\s/.test(w.word)) {
    errors.push(`${tag}: word contains spaces`);
  }

  // 11. theme must not be empty
  if (typeof w.theme !== 'string' || w.theme.trim() === '') {
    errors.push(`${tag}: theme is empty`);
  }

  // 12. theme must be in allowed list
  if (!ALLOWED_THEMES.includes(w.theme)) {
    errors.push(`${tag}: theme "${w.theme}" is not in the allowed theme list`);
  }

  // 13. translation must not be empty
  if (typeof w.translation !== 'string' || w.translation.trim() === '') {
    errors.push(`${tag}: translation is empty`);
  } else {
    // 14. translation must contain Chinese characters
    if (!hasChinese(w.translation)) {
      errors.push(`${tag}: translation has no Chinese characters: "${w.translation}"`);
    }
    // 15. translation must not have Chinese or English punctuation
    if (hasCnPunctuation(w.translation)) {
      errors.push(`${tag}: translation has Chinese punctuation: "${w.translation}"`);
    }
    if (hasEnPunctuation(w.translation)) {
      errors.push(`${tag}: translation has English punctuation: "${w.translation}"`);
    }
    // 16. translation must not be an English phrase
    if (isEnglishPhrase(w.translation)) {
      errors.push(`${tag}: translation appears to be English: "${w.translation}"`);
    }
    // 17. translation English letter count must not exceed 2
    const enCount = countEnglishLetters(w.translation);
    if (enCount > 2) {
      errors.push(`${tag}: translation has ${enCount} English letters (max 2): "${w.translation}"`);
    }
  }

  // 18. shortMeaningInSentence must not be empty
  if (typeof w.shortMeaningInSentence !== 'string' || w.shortMeaningInSentence.trim() === '') {
    errors.push(`${tag}: shortMeaningInSentence is empty`);
  } else {
    // 19. shortMeaningInSentence must contain Chinese characters
    if (!hasChinese(w.shortMeaningInSentence)) {
      errors.push(`${tag}: shortMeaningInSentence has no Chinese characters: "${w.shortMeaningInSentence}"`);
    }
    // 20. shortMeaningInSentence must not have punctuation
    if (hasCnPunctuation(w.shortMeaningInSentence)) {
      errors.push(`${tag}: shortMeaningInSentence has Chinese punctuation: "${w.shortMeaningInSentence}"`);
    }
    if (hasEnPunctuation(w.shortMeaningInSentence)) {
      errors.push(`${tag}: shortMeaningInSentence has English punctuation: "${w.shortMeaningInSentence}"`);
    }
    // 21. shortMeaningInSentence must not be an English phrase
    if (isEnglishPhrase(w.shortMeaningInSentence)) {
      errors.push(`${tag}: shortMeaningInSentence appears to be English: "${w.shortMeaningInSentence}"`);
    }
    // 22. shortMeaningInSentence English letter count must not exceed 2
    const enCount = countEnglishLetters(w.shortMeaningInSentence);
    if (enCount > 2) {
      errors.push(`${tag}: shortMeaningInSentence has ${enCount} English letters (max 2): "${w.shortMeaningInSentence}"`);
    }
  }

  // 23. exampleEn must not be empty
  if (typeof w.exampleEn !== 'string' || w.exampleEn.trim() === '') {
    errors.push(`${tag}: exampleEn is empty`);
  }

  // 24. exampleZh must not be empty
  if (typeof w.exampleZh !== 'string' || w.exampleZh.trim() === '') {
    errors.push(`${tag}: exampleZh is empty`);
  } else if (!w.exampleZh.includes(w.word)) {
    // 25. exampleZh must contain the English word
    errors.push(`${tag}: exampleZh does not contain the English word "${w.word}"`);
  }
}

// 5. id must be consecutive from 1
if (seenIds.size > 0) {
  for (let i = 1; i <= data.length; i++) {
    if (!seenIds.has(i)) {
      errors.push(`id ${i} is missing (ids must be consecutive from 1 to ${data.length})`);
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
