import React from "react";

type ProcessingIndicatorProps = {
  progress: number;
};

export function ProcessingIndicator({ progress }: ProcessingIndicatorProps) {
  const getProcessingStatus = () => {
    if (progress < 30) {
      return "Extracting data...";
    } else if (progress < 60) {
      return "Analyzing content...";
    } else if (progress < 90) {
      return "Generating portfolio...";
    } else {
      return "Finalizing...";
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-900">Processing your resume</h2>
      <p className="mt-2 text-gray-600">
        We're extracting information and creating your portfolio website. This will take less than a minute.
      </p>
      
      <div className="mt-8 relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-indigo-100">
              {getProcessingStatus()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-primary">
              {progress}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-100">
          <div 
            style={{ width: `${progress}%` }} 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-500"
          />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center">
        <div className="mt-4 flex justify-center">
          <div className="animate-[bounce_3s_linear_infinite]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="ml-4 animate-[bounce_3s_linear_infinite]" style={{ animationDelay: "0.15s" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-[#10B981] opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
