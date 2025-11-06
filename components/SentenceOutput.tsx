
import React from 'react';
import { ClassifiedSentence, SentenceClassification, ClassificationResults } from '../types';

interface SentenceOutputProps {
  results: ClassificationResults;
}

// Helper component to render a list of sentences
const SentenceList: React.FC<{ title: string; sentences: ClassifiedSentence[]; className: string }> = ({
  title,
  sentences,
  className,
}) => (
  <div className={`p-4 rounded-lg shadow-md ${className}`}>
    <h3 className="text-lg font-semibold mb-3 border-b pb-2">{title} ({sentences.length})</h3>
    {sentences.length === 0 ? (
      <p className="text-gray-600 italic">No sentences found in this category.</p>
    ) : (
      <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2">
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {sentences.map((item) => (
            <li key={item.id} className="leading-relaxed">{item.text}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const SentenceOutput: React.FC<SentenceOutputProps> = ({ results }) => {
  const { PURE_TELUGU, MIXED_ENG_TELUGU, INCOMPLETE_TELUGU, IGNORED } = results;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Classification Results</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <SentenceList
          title="Pure Telugu Sentences"
          sentences={PURE_TELUGU}
          className="bg-green-50 border-l-4 border-green-500"
        />
        <SentenceList
          title="Mixed English & Telugu Sentences"
          sentences={MIXED_ENG_TELUGU}
          className="bg-yellow-50 border-l-4 border-yellow-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SentenceList
          title="Incomplete Telugu Sentence Sequences"
          sentences={INCOMPLETE_TELUGU}
          className="bg-red-50 border-l-4 border-red-500"
        />
        <SentenceList
          title="Ignored Sentences"
          sentences={IGNORED}
          className="bg-blue-50 border-l-4 border-blue-500"
        />
      </div>
    </div>
  );
};

export default SentenceOutput;
