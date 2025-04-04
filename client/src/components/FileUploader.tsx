import React, { useCallback, useState, useRef } from "react";
import { formatFileSize, validateFile } from "../lib/resumeUtils";

type FileUploaderProps = {
  onFileSelected: (file: File) => void;
  file: File | null;
  error: string | null;
  isProcessing: boolean;
  onGenerate: () => void;
};

export function FileUploader({ onFileSelected, file, error, isProcessing, onGenerate }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      const validation = validateFile(droppedFile);
      
      if (validation.valid) {
        onFileSelected(droppedFile);
      }
    }
  }, [onFileSelected]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      const validation = validateFile(selectedFile);
      
      if (validation.valid) {
        onFileSelected(selectedFile);
      }
    }
  }, [onFileSelected]);

  const handleAreaClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleRemoveFile = useCallback(() => {
    onFileSelected(null as unknown as File);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onFileSelected]);

  return (
    <div className="max-w-2xl mx-auto">
      <div 
        className={`border-2 border-dashed ${isDragging ? 'border-primary' : 'border-gray-300'} rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer ${file ? 'hidden' : 'block'}`}
        onClick={handleAreaClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Drag and drop your resume
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          PDF, JPG, or PNG (max. 10MB)
        </p>
        <p className="mt-4">
          <span className="inline-flex rounded-md shadow-sm">
            <label htmlFor="file-upload" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer">
              Browse Files
              <input 
                id="file-upload" 
                name="file-upload" 
                type="file" 
                className="sr-only"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png" 
              />
            </label>
          </span>
        </p>
      </div>

      {/* File Information */}
      {file && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
            </div>
            <button 
              type="button" 
              className="ml-4 inline-flex text-gray-400 hover:text-gray-500"
              onClick={handleRemoveFile}
              disabled={isProcessing}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 text-sm text-error bg-red-50 rounded-lg">
          <div className="flex">
            <svg className="w-5 h-5 mr-2 text-error" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <div className="mt-6 text-center">
        <button 
          disabled={!file || isProcessing}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${!file || isProcessing ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-indigo-700'}`}
          onClick={onGenerate}
        >
          {isProcessing ? 'Processing...' : 'Generate Portfolio'}
        </button>
      </div>
    </div>
  );
}
