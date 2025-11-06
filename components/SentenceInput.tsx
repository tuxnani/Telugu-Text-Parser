
import React, { useState, useCallback } from 'react';

interface SentenceInputProps {
  onProcess: (text: string) => void;
  isLoading: boolean;
}

const SentenceInput: React.FC<SentenceInputProps> = ({ onProcess, isLoading }) => {
  const [inputText, setInputText] = useState<string>('');

  const handleTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  }, []);

  const handleProcessClick = useCallback(() => {
    if (inputText.trim()) {
      onProcess(inputText);
    }
  }, [inputText, onProcess]);

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Input Text for Classification</h2>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-700 min-h-[200px] resize-y"
        placeholder="Paste your Telugu and English mixed text here. Each line will be processed similar to your text files."
        value={inputText}
        onChange={handleTextChange}
        disabled={isLoading}
      ></textarea>
      <button
        onClick={handleProcessClick}
        disabled={isLoading || !inputText.trim()}
        className={`mt-4 w-full px-6 py-3 rounded-md text-white font-bold transition-colors duration-200
          ${isLoading || !inputText.trim()
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          }`}
      >
        {isLoading ? 'Processing...' : 'Process Text'}
      </button>
      {isLoading && (
        <p className="mt-2 text-center text-sm text-gray-500">Classifying sentences...</p>
      )}
    </div>
  );
};

export default SentenceInput;
