import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { CompanyData, PromptOption, GeneratedEmail } from './types';
import { PROMPT_OPTIONS } from './constants/prompts';
import { generateEmail } from './services/geminiService';
import Header from './components/Header';
import PromptSelector from './components/PromptSelector';
import InputForm from './components/InputForm';
import GeneratedEmailDisplay from './components/GeneratedEmailDisplay';

const App: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptOption>(PROMPT_OPTIONS[0]);
  const [companyData, setCompanyData] = useState<CompanyData>({
    name: '',
    description: '',
    contactPerson: '',
  });
  const [generatedEmail, setGeneratedEmail] = useState<GeneratedEmail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!companyData.name || !companyData.description || !companyData.contactPerson) {
      setError('Please fill in all company details.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedEmail(null);
    try {
      const email = await generateEmail(selectedPrompt, companyData);
      setGeneratedEmail(email);
    } catch (e) {
      console.error(e);
      setError('Failed to generate email. Check the console for details and ensure your API key is configured correctly.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedPrompt, companyData]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Configuration */}
          <div className="flex flex-col gap-8">
            <PromptSelector
              prompts={PROMPT_OPTIONS}
              selectedPrompt={selectedPrompt}
              setSelectedPrompt={setSelectedPrompt}
            />
            <InputForm
              companyData={companyData}
              setCompanyData={setCompanyData}
              onGenerate={handleGenerateClick}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Output */}
          <div className="bg-gray-800/50 rounded-lg shadow-2xl ring-1 ring-white/10 p-4 md:p-6 flex flex-col">
             <GeneratedEmailDisplay 
                generatedEmail={generatedEmail}
                isLoading={isLoading}
                error={error}
             />
          </div>
        </div>
        <footer className="text-center text-gray-500 mt-12 text-sm">
            <p>Engineered by Virelio - Advanced Prompting for Human-Centric B2B Outreach</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
