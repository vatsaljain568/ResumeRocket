import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
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
  app.post("/api/resume/upload", upload.single("file"), async (req: Request, res: Response) => {
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
      
      if (file.mimetype === "application/pdf") {
        extractedData = await extractDataFromPDF(file.buffer);
      } else if (file.mimetype.startsWith("image/")) {
        extractedData = await extractDataFromImage(file.buffer, file.mimetype);
      }
      
      // For demo purposes, prepare some sample data if we don't have real extraction
      // In a real implementation, this would come from the PDF/image parser
      if (Object.keys(extractedData).length === 0) {
        const fileName = file.originalname;
        extractedData = generateDummyPortfolioData(fileName);
      }
      
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

// Helper function to generate dummy portfolio data for demonstration
// In a real implementation, this would be replaced by actual data extraction
function generateDummyPortfolioData(fileName: string): Portfolio {
  const name = fileName.split('.')[0] || "Jane Doe";
  
  return {
    name: name,
    title: "Software Engineer",
    email: "contact@example.com",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    website: "https://example.com",
    about: "Experienced software engineer with a passion for developing innovative solutions. Skilled in JavaScript, React, and Node.js.",
    experience: [
      {
        position: "Senior Software Engineer",
        company: "TechCorp Inc.",
        duration: "Jan 2018 - Present",
        description: [
          "Led development of the company's flagship product, increasing performance by 40%",
          "Mentored junior developers and implemented code review processes",
          "Introduced modern JavaScript frameworks that improved developer productivity"
        ]
      },
      {
        position: "Web Developer",
        company: "Innovative Solutions LLC",
        duration: "Mar 2015 - Dec 2017",
        description: [
          "Developed responsive websites for clients across various industries",
          "Collaborated with design team to implement pixel-perfect UIs",
          "Optimized existing websites to improve SEO and performance metrics"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Computer Science",
        institution: "Stanford University",
        duration: "2013 - 2015",
        description: "Specialized in Artificial Intelligence and Data Structures"
      },
      {
        degree: "Bachelor of Science in Computer Engineering",
        institution: "MIT",
        duration: "2009 - 2013",
        description: "Graduated with honors, GPA 3.8/4.0"
      }
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "CSS/SCSS",
      "GraphQL",
      "REST APIs",
      "Responsive Design"
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Developed a full-stack e-commerce solution using React, Node.js, and MongoDB. Implemented features like product search, user authentication, and payment processing.",
        link: "https://example.com/projects/ecommerce"
      },
      {
        title: "Task Management App",
        description: "Created a productivity tool with drag-and-drop functionality, real-time updates, and team collaboration features using React and Firebase.",
        link: "https://example.com/projects/taskmanager"
      }
    ]
  };
}
