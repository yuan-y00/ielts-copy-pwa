export type WordPackId =
  | "ielts-exam-context-2000"
  | "robotics-maintenance-troubleshooting-1000"
  | "foreign-trade-crowdfunding-dtc-operations-1000"
  | "robotics-rd-engineering-research-1000"
  | "ai-product-management-llm-products-1000"
  | "smart-hardware-overseas-channel-sales-core";

export type WordItemType =
  | "word"
  | "phrase"
  | "collocation"
  | "sentence_pattern";

export interface WordPackItem {
  id: string;
  packId: WordPackId;
  term: string;
  type: WordItemType;
  topic: string;
  shortMeaning: string;
  shortMeaningInSentence: string;
  example: string;
  exampleZh: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];

  partOfSpeech?:
    | "noun"
    | "noun_phrase"
    | "verb"
    | "phrasal_verb"
    | "adjective"
    | "adverb"
    | "collocation"
    | "sentence_pattern"
    | "abbreviation"
    | "technical_term";

  fullForm?: string;

  sourceType?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  sourceDate?: string;
  isRealSourceSentence?: boolean;

  audio?: {
    termEn?: string;
    meaningZh?: string;
    exampleEn?: string;
  };

  examSkill?: "Listening" | "Reading" | "Writing" | "Speaking";
  examUse?: string;
  register?: "spoken" | "neutral" | "semi-formal" | "formal" | "academic";

  workIntent?: string;
  scene?: string;
  role?: string;

  businessStage?: string;

  productStage?: string;

  salesStage?: string;
  channelType?: string;

  researchArea?: string;
  usageScene?: string;
}

export interface LegacyWordData {
  id: number | string;
  word: string;
  theme: string;
  translation: string;
  shortMeaningInSentence: string;
  exampleEn: string;
  exampleZh: string;
  partOfSpeech?: string;
  sourceSignals?: unknown;
}

export interface DisplayWordData {
  id: string;
  word: string;
  theme: string;
  translation: string;
  shortMeaningInSentence: string;
  exampleEn: string;
  exampleZh: string;

  packId?: WordPackId;
  term?: string;
  type?: WordItemType;
  topic?: string;
  shortMeaning?: string;
  example?: string;
  difficulty?: number;
  tags?: string[];
  fullForm?: string;
  partOfSpeech?: string;
}

export interface WordPackMeta {
  id: WordPackId;
  title: string;
  shortTitle: string;
  description: string;
  total: number;
  fileName: string;
}
