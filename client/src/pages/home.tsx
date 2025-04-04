import React, { useState, useCallback, useEffect } from "react";
import { Header } from "../components/Header";
import { Stepper } from "../components/Stepper";
import { FileUploader } from "../components/FileUploader";
import { ProcessingIndicator } from "../components/ProcessingIndicator";
import { PortfolioPreview } from "../components/PortfolioPreview";
import { Step, UploadState } from "../lib/types";
import { validateFile, uploadResume } from "../lib/resumeUtils";
import { useToast } from "@/hooks/use-toast";

const initialState: UploadState = {
  file: null,
  filePreview: null,
  error: null,
  isProcessing: false,
  progress: 0,
  portfolio: null,
  portfolioId: null,
  currentStep: Step.Upload,
};

export default function Home() {
  const [state, setState] = useState<UploadState>(initialState);
  const { toast } = useToast();

  const handleFileSelected = useCallback((file: File | null) => {
    if (file === null) {
      setState((prev) => ({
        ...prev,
        file: null,
        filePreview: null,
        error: null,
      }));
      return;
    }

    const validation = validateFile(file);
    if (!validation.valid) {
      setState((prev) => ({
        ...prev,
        error: validation.message,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      file,
      error: null,
    }));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!state.file) return;

    setState((prev) => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      currentStep: Step.Process,
    }));

    // Set up progress simulation
    const progressInterval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        progress: Math.min(prev.progress + 5, 95), // Cap at 95% until we get response
      }));
    }, 300);

    try {
      const response = await uploadResume(state.file);
      
      // Complete progress
      setState((prev) => ({
        ...prev,
        progress: 100,
        portfolio: response.data,
        portfolioId: response.portfolioId,
      }));

      // Wait a moment to show 100% progress before moving to preview
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          isProcessing: false,
          currentStep: Step.Preview,
        }));
      }, 500);
      
      toast({
        title: "Resume processed successfully",
        description: "Your portfolio has been generated. You can now preview and edit it.",
      });
    } catch (error) {
      let errorMessage = "Failed to process your resume. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setState((prev) => ({
        ...prev,
        isProcessing: false,
        error: errorMessage,
        currentStep: Step.Upload,
      }));
      
      toast({
        title: "Error processing resume",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
    }
  }, [state.file, toast]);

  const handleStartOver = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Stepper currentStep={state.currentStep} />
        
        {state.currentStep === Step.Upload && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Create your portfolio website</h2>
              <p className="mt-4 text-lg text-gray-600">
                Upload your resume and we'll automatically generate a beautiful portfolio website for you in less than a minute.
              </p>
            </div>
            
            <FileUploader 
              onFileSelected={handleFileSelected}
              file={state.file}
              error={state.error}
              isProcessing={state.isProcessing}
              onGenerate={handleGenerate}
            />
          </div>
        )}
        
        {state.currentStep === Step.Process && (
          <ProcessingIndicator progress={state.progress} />
        )}
        
        {state.currentStep === Step.Preview && state.portfolio && state.portfolioId && (
          <PortfolioPreview 
            portfolio={state.portfolio} 
            portfolioId={state.portfolioId}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
}
