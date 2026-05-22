import type {
  WordPackId,
  WordPackItem,
  LegacyWordData,
  DisplayWordData,
} from '../types/wordPack';

function isWordPackItem(item: unknown): item is WordPackItem {
  const w = item as Record<string, unknown>;
  return w && typeof w.term === 'string' && typeof w.example === 'string';
}

export function normalizeLegacyWord(
  item: LegacyWordData,
  packId: WordPackId,
): DisplayWordData {
  return {
    id: String(item.id),
    word: item.word || '',
    theme: item.theme || '',
    translation: item.translation || '',
    shortMeaningInSentence: item.shortMeaningInSentence || '',
    exampleEn: item.exampleEn || '',
    exampleZh: item.exampleZh || '',
    packId,
    term: item.word || '',
    type: 'word',
    topic: item.theme || '',
    shortMeaning: item.translation || '',
    example: item.exampleEn || '',
    difficulty: 1,
    tags: [],
  };
}

export function normalizeWordPackItem(item: WordPackItem): DisplayWordData {
  return {
    id: String(item.id),
    word: item.term || '',
    theme: item.topic || '',
    translation: item.shortMeaning || '',
    shortMeaningInSentence: item.shortMeaningInSentence || '',
    exampleEn: item.example || '',
    exampleZh: item.exampleZh || '',
    packId: item.packId,
    term: item.term,
    type: item.type,
    topic: item.topic,
    shortMeaning: item.shortMeaning,
    example: item.example,
    difficulty: item.difficulty,
    tags: item.tags ?? [],
    fullForm: item.fullForm,
    partOfSpeech: item.partOfSpeech,
  };
}

export function normalizeAnyWordItem(
  item: unknown,
  packId: WordPackId,
): DisplayWordData {
  if (!item || typeof item !== 'object') {
    return {
      id: '',
      word: '',
      theme: '',
      translation: '',
      shortMeaningInSentence: '',
      exampleEn: '',
      exampleZh: '',
      packId,
      difficulty: 1,
      tags: [],
    };
  }

  if (isWordPackItem(item)) {
    return normalizeWordPackItem(item);
  }

  return normalizeLegacyWord(item as LegacyWordData, packId);
}
