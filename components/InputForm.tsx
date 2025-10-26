import React from 'react';
import type { CompanyData } from '../types';

interface InputFormProps {
  companyData: CompanyData;
  setCompanyData: React.Dispatch<React.SetStateAction<CompanyData>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ companyData, setCompanyData, onGenerate, isLoading }) => {
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg ring-1 ring-white/10 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">2. Enter Target Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-300 mb-1">Contact Person</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={companyData.contactPerson}
            onChange={handleInputChange}
            placeholder="e.g., Alex de Vries"
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={companyData.name}
            onChange={handleInputChange}
            placeholder="e.g., TechCorp B.V."
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Company Description / Context</label>
          <textarea
            id="description"
            name="description"
            value={companyData.description}
            onChange={handleInputChange}
            rows={5}
            placeholder="Paste company description, recent news, or any relevant context here..."
            className="w-full bg-gray-900/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Email'
        )}
      </button>
    </div>
  );
};

export default InputForm;
