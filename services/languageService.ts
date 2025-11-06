
import { SentenceClassification, ClassifiedSentence } from '../types';

// Regular expression for Telugu script characters (Unicode range U+0C00 to U+0C7F)
const TELUGU_REGEX = /\p{Script=Telugu}/u;
// Regular expression for basic Latin alphabet (English) characters
const ENGLISH_REGEX = /[a-zA-Z]/;
// Regular expression for common sentence-ending punctuation, including Telugu Danda (ౄ)
const SENTENCE_END_PUNCTUATION_REGEX = /[.!?\u0c64]/;

/**
 * Classifies a given input text into different categories of sentences.
 *
 * @param inputText The text content to classify, simulating content from multiple files.
 * @returns An array of ClassifiedSentence objects.
 */
export const classifyText = (inputText: string): ClassifiedSentence[] => {
  if (!inputText.trim()) {
    return [];
  }

  // Split text into lines first (simulating processing individual lines from files),
  // then further split each line into sentences based on common delimiters.
  // A basic sentence splitter; real-world scenarios might use more advanced NLP.
  const rawSentences = inputText
    .split(/[\n]/) // Split by new lines, as per user's "each text line"
    .flatMap(line => line.split(/(?<=[.!?\u0c64])(?!\S)/)) // Split by sentence-ending punctuation not followed by a non-whitespace character
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const results: ClassifiedSentence[] = [];

  for (let i = 0; i < rawSentences.length; i++) {
    const sentence = rawSentences[i];
    const hasTelugu = TELUGU_REGEX.test(sentence);
    const hasEnglish = ENGLISH_REGEX.test(sentence);
    // Check if the sentence ends with a recognized punctuation mark
    // Replace `sentence.at(-1)` with `sentence[sentence.length - 1]` for compatibility.
    const isComplete = SENTENCE_END_PUNCTUATION_REGEX.test(sentence[sentence.length - 1] || '');

    let classification: SentenceClassification = SentenceClassification.IGNORED;

    if (hasTelugu) {
      if (hasEnglish) {
        // Contains both Telugu and English
        if (isComplete) {
          classification = SentenceClassification.MIXED_ENG_TELUGU;
        } else {
          // Mixed but incomplete
          classification = SentenceClassification.INCOMPLETE_TELUGU;
        }
      } else {
        // Contains only Telugu (and possibly numbers/symbols)
        if (isComplete) {
          classification = SentenceClassification.PURE_TELUGU;
        } else {
          // Pure Telugu but incomplete
          classification = SentenceClassification.INCOMPLETE_TELUGU;
        }
      }
    }
    // Sentences that are purely English or other scripts, or only numbers/symbols,
    // and do not contain Telugu, will remain as IGNORED, as requested.

    results.push({ id: `sentence-${i}-${Date.now()}`, text: sentence, classification });
  }

  return results;
};
