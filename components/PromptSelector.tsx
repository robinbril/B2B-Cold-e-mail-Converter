import React from 'react';
import type { PromptOption } from '../types';

interface PromptSelectorProps {
  prompts: PromptOption[];
  selectedPrompt: PromptOption;
  setSelectedPrompt: (prompt: PromptOption) => void;
}

const PromptSelector: React.FC<PromptSelectorProps> = ({ prompts, selectedPrompt, setSelectedPrompt }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg ring-1 ring-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">1. Select Outreach Strategy</h2>
      <div className="space-y-4">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            onClick={() => setSelectedPrompt(prompt)}
            className={`cursor-pointer p-4 rounded-md transition-all duration-200 ${
              selectedPrompt.id === prompt.id
                ? 'bg-blue-600/30 ring-2 ring-blue-500'
                : 'bg-gray-700/50 hover:bg-gray-700'
            }`}
          >
            <h3 className="font-bold text-white">{prompt.name}</h3>
            <p className="text-sm text-gray-400 mt-1">{prompt.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptSelector;
