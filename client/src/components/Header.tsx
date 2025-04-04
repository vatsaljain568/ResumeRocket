import React from "react";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2a1 1 0 011-1h8a1 1 0 011 1z" clipRule="evenodd" />
          </svg>
          <h1 className="ml-2 text-xl font-semibold text-gray-900">ResumeToPortfolio</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-500 hover:text-primary">How it works</a></li>
            <li><a href="#" className="text-gray-500 hover:text-primary">Examples</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
