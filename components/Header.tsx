import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-md sticky top-0 z-10 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
                </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Virelio AI Cold Email Generator
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
