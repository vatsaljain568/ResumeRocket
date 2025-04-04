import React from "react";
import { Step } from "../lib/types";

type StepperProps = {
  currentStep: Step;
};

export function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="mb-8">
      <ol className="flex items-center w-full text-sm font-medium text-gray-500 sm:text-base">
        <li className={`flex md:w-full items-center ${currentStep >= Step.Upload ? "text-primary" : ""} after:content-[''] after:w-full after:h-1 after:border-b after:border-${currentStep >= Step.Upload ? "primary" : "gray-200"} after:border-4 after:inline-block`}>
          <span className={`flex items-center justify-center w-10 h-10 ${currentStep >= Step.Upload ? "bg-primary" : "bg-gray-200"} rounded-full shrink-0`}>
            <svg className={`w-5 h-5 ${currentStep >= Step.Upload ? "text-white" : "text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
          </span>
          <span className="ml-2">Upload</span>
        </li>
        <li className={`flex md:w-full items-center ${currentStep >= Step.Process ? "text-primary" : ""} after:content-[''] after:w-full after:h-1 after:border-b after:border-${currentStep >= Step.Process ? "primary" : "gray-200"} after:border-4 after:inline-block`}>
          <span className={`flex items-center justify-center w-10 h-10 ${currentStep >= Step.Process ? "bg-primary" : "bg-gray-200"} rounded-full shrink-0`}>
            <svg className={`w-5 h-5 ${currentStep >= Step.Process ? "text-white" : "text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
            </svg>
          </span>
          <span className="ml-2">Process</span>
        </li>
        <li className={`flex items-center ${currentStep >= Step.Preview ? "text-primary" : ""}`}>
          <span className={`flex items-center justify-center w-10 h-10 ${currentStep >= Step.Preview ? "bg-primary" : "bg-gray-200"} rounded-full shrink-0`}>
            <svg className={`w-5 h-5 ${currentStep >= Step.Preview ? "text-white" : "text-gray-500"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
            </svg>
          </span>
          <span className="ml-2">Preview</span>
        </li>
      </ol>
    </div>
  );
}
