import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import type { FileFilterCallback } from "multer";
import { extractDataFromPDF } from "./pdf-parser";
import { extractDataFromImage } from "./image-parser";
import { portfolioSchema, type Portfolio } from "@shared/schema";
import path from "path";
import { z } from "zod";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
});

// Schema for portfolio data validation
const updatePortfolioSchema = z.object({
  data: portfolioSchema
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Upload and process resume
  app.post("/api/resume/upload", upload.single("file"), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const file = req.file;
      
      // Validate file type
      const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.mimetype)) {
        return res.status(400).json({ 
          message: "Unsupported file format. Please upload a PDF, JPG, or PNG file." 
        });
      }
      
      // Extract data from file based on type
      let extractedData: Partial<Portfolio> = {};
      
      console.log(`Processing ${file.originalname} (${file.mimetype})...`);
      
      if (file.mimetype === "application/pdf") {
        console.log("Extracting data from PDF...");
        extractedData = await extractDataFromPDF(file.buffer);
      } else if (file.mimetype.startsWith("image/")) {
        console.log(`Extracting data from image (${file.mimetype})...`);
        extractedData = await extractDataFromImage(file.buffer, file.mimetype);
      }
      
      console.log("Extracted data from file:", JSON.stringify(extractedData, null, 2).substring(0, 500));
      
      // We want to work only with the extracted data, without adding placeholders
      // Just use whatever fields we could successfully extract from the resume
      
      // Get name from filename only if we absolutely couldn't extract a name and need one for identification
      if (!extractedData.name && file.originalname) {
        const nameFromFile = file.originalname.split('.')[0].replace(/[_-]/g, ' ');
        extractedData.name = nameFromFile;
      }
      
      // Don't add any generic placeholder content to the portfolio - only use what was actually extracted
      // This ensures the portfolio shows real data from the resume and has appropriate headings/sections
      
      // Log what data we found to help with debugging
      console.log("Using only extracted data:");
      for (const [key, value] of Object.entries(extractedData)) {
        console.log(`- ${key}: ${typeof value === 'object' ? JSON.stringify(value).substring(0, 50) : value}`);
      }
      
      console.log("Final portfolio data:", JSON.stringify(extractedData, null, 2).substring(0, 500));
      
      // Store the portfolio data
      const portfolio = await storage.createPortfolio({
        userId: 1, // Since we don't have authentication, use a default user
        data: extractedData as Portfolio
      });
      
      return res.status(200).json({ 
        message: "Resume processed successfully",
        portfolioId: portfolio.id,
        data: portfolio.data
      });
    } catch (error) {
      console.error("Error processing resume:", error);
      return res.status(500).json({ message: "Failed to process resume" });
    }
  });
  
  // Get portfolio by ID
  app.get("/api/portfolio/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid portfolio ID" });
      }
      
      const portfolio = await storage.getPortfolio(id);
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      
      return res.status(200).json({ portfolio });
    } catch (error) {
      console.error("Error retrieving portfolio:", error);
      return res.status(500).json({ message: "Failed to retrieve portfolio" });
    }
  });
  
  // Update portfolio data
  app.put("/api/portfolio/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid portfolio ID" });
      }
      
      // Validate request body
      const validation = updatePortfolioSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid portfolio data", 
          errors: validation.error.format() 
        });
      }
      
      const portfolio = await storage.getPortfolio(id);
      if (!portfolio) {
        return res.status(404).json({ message: "Portfolio not found" });
      }
      
      const updatedPortfolio = await storage.updatePortfolio(id, validation.data.data);
      
      return res.status(200).json({ 
        message: "Portfolio updated successfully",
        portfolio: updatedPortfolio
      });
    } catch (error) {
      console.error("Error updating portfolio:", error);
      return res.status(500).json({ message: "Failed to update portfolio" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
