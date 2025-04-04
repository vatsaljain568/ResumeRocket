import { type Portfolio } from "@shared/schema";
import { apiRequest } from "./queryClient";
import { UploadResponse } from "./types";

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function validateFile(file: File | null): { valid: boolean; message: string } {
  // Check if file is provided
  if (!file) {
    return { valid: false, message: "Please select a file." };
  }

  // Check file size (10MB max)
  if (file.size > 10 * 1024 * 1024) {
    return { valid: false, message: "File is too large. Maximum size is 10MB." };
  }

  // Check file type
  const validTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      message: "Unsupported file format. Please upload a PDF, JPG, or PNG file.",
    };
  }

  return { valid: true, message: "" };
}

export async function uploadResume(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/resume/upload", {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to upload resume");
  }
  
  return await response.json();
}

export async function updatePortfolio(portfolioId: number, data: Portfolio): Promise<{ portfolio: Portfolio }> {
  const response = await apiRequest("PUT", `/api/portfolio/${portfolioId}`, { data });
  return response.json();
}

export function downloadPortfolio(portfolio: Portfolio): void {
  // This would normally generate an HTML file with the portfolio content
  // For this demo, we'll just create a JSON file with the portfolio data
  const dataStr = JSON.stringify(portfolio, null, 2);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  
  const exportName = `${portfolio.name?.replace(/\s+/g, '_')}_portfolio`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', `${exportName}.json`);
  linkElement.click();
}
