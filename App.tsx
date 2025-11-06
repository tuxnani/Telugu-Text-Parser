import React, { useState, useCallback } from 'react';
import { classifyText } from './services/languageService';
import SentenceInput from './components/SentenceInput';
import SentenceOutput from './components/SentenceOutput';
import { ClassifiedSentence, SentenceClassification, ClassificationResults } from './types';

// Initial state for classification results
const initialResults: ClassificationResults = {
  [SentenceClassification.PURE_TELUGU]: [],
  [SentenceClassification.MIXED_ENG_TELUGU]: [],
  [SentenceClassification.INCOMPLETE_TELUGU]: [],
  [SentenceClassification.IGNORED]: [],
};

const App: React.FC = () => {
  const [results, setResults] = useState<ClassificationResults>(initialResults);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleProcessText = useCallback((text: string) => {
    setIsLoading(true);
    // Simulate async processing
    setTimeout(() => {
      const classifiedSentences = classifyText(text);

      const newResults: ClassificationResults = { ...initialResults };
      classifiedSentences.forEach(sentence => {
        newResults[sentence.classification].push(sentence);
      });

      setResults(newResults);
      setIsLoading(false);
    }, 500); // Small delay to show loading state
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      <header className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
          Telugu Sentence Classifier
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Process text to categorize sentences as pure Telugu, mixed, incomplete, or ignored.
        </p>
      </header>

      <main className="flex-grow">
        <SentenceInput onProcess={handleProcessText} isLoading={isLoading} />
        <SentenceOutput results={results} />
      </main>

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Telugu Sentence Classifier. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
