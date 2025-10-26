import React, { useState } from 'react';
import type { GeneratedEmail } from '../types';
import Loader from './Loader';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface GeneratedEmailDisplayProps {
    generatedEmail: GeneratedEmail | null;
    isLoading: boolean;
    error: string | null;
}

const GeneratedEmailDisplay: React.FC<GeneratedEmailDisplayProps> = ({ generatedEmail, isLoading, error }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!generatedEmail) return;
        const fullEmailText = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.body}`;
        navigator.clipboard.writeText(fullEmailText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <Loader />
                    <p className="mt-4 text-lg font-semibold text-gray-300">Crafting the perfect email...</p>
                    <p className="text-sm text-gray-500">The AI is analyzing the target and applying Virelio's strategy.</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center bg-red-900/20 rounded-lg p-6">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="mt-4 text-lg font-semibold text-red-300">An Error Occurred</p>
                    <p className="text-sm text-red-400">{error}</p>
                </div>
            );
        }

        if (generatedEmail) {
            return (
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-white">Generated Email</h2>
                        <button
                            onClick={handleCopy}
                            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-sm text-white font-medium py-1.5 px-3 rounded-md transition-colors"
                        >
                            <ClipboardIcon className="w-4 h-4" />
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                    </div>

                    <div className="bg-gray-900/50 rounded-md p-4 flex-grow ring-1 ring-white/10">
                        <div className="border-b border-gray-700 pb-3 mb-3">
                            <span className="text-gray-400 text-sm font-medium">Subject: </span>
                            <span className="text-white font-semibold">{generatedEmail.subject}</span>
                        </div>
                        <div className="text-gray-300 whitespace-pre-wrap font-light text-base leading-relaxed">
                            {generatedEmail.body}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-lg font-semibold text-gray-400">Your generated email will appear here</p>
                <p className="text-sm text-gray-500">Select a strategy, fill in the details, and click 'Generate'.</p>
            </div>
        );
    };

    return <div className="h-full">{renderContent()}</div>;
};

export default GeneratedEmailDisplay;
