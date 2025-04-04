import React from "react";

export function HowItWorks() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Transform your resume into a professional portfolio website in minutes with our simple 3-step process.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <span className="text-lg font-bold">1</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Upload Your Resume</h3>
                <p className="mt-2 text-base text-gray-500">
                  Simply upload your resume in PDF, JPG, or PNG format. We accept files up to 10MB in size.
                </p>
              </div>
              <div className="mt-6 ml-16">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <span className="text-lg font-bold">2</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Automated Processing</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our system extracts key information from your resume including your contact details, work experience, education, and skills.
                </p>
              </div>
              <div className="mt-6 ml-16">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <span className="text-lg font-bold">3</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Preview & Customize</h3>
                <p className="mt-2 text-base text-gray-500">
                  Review your generated portfolio, make any necessary edits, and then download or publish your professional website.
                </p>
              </div>
              <div className="mt-6 ml-16">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700">
            <a href="/">Try It Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}