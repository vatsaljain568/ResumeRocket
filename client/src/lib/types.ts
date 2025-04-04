import { type Portfolio } from "@shared/schema";

export type FileWithPreview = {
  file: File;
  preview: string;
};

export enum Step {
  Upload = 0,
  Process = 1,
  Preview = 2
}

export type UploadState = {
  file: File | null;
  filePreview: string | null;
  error: string | null;
  isProcessing: boolean;
  progress: number;
  portfolio: Portfolio | null;
  portfolioId: number | null;
  currentStep: Step;
};

export type UploadResponse = {
  message: string;
  portfolioId: number;
  data: Portfolio;
};
