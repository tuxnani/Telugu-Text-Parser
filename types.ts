export enum SentenceClassification {
  PURE_TELUGU = 'PURE_TELUGU',
  MIXED_ENG_TELUGU = 'MIXED_ENG_TELUGU',
  INCOMPLETE_TELUGU = 'INCOMPLETE_TELUGU',
  IGNORED = 'IGNORED',
}

export interface ClassifiedSentence {
  id: string; // Unique ID for React list keys
  text: string;
  classification: SentenceClassification;
}

export interface ClassificationResults {
  [SentenceClassification.PURE_TELUGU]: ClassifiedSentence[];
  [SentenceClassification.MIXED_ENG_TELUGU]: ClassifiedSentence[];
  [SentenceClassification.INCOMPLETE_TELUGU]: ClassifiedSentence[];
  [SentenceClassification.IGNORED]: ClassifiedSentence[];
}
