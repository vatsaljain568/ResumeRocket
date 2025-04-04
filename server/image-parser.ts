import type { Portfolio } from "@shared/schema";
// @ts-ignore
import Tesseract from 'tesseract.js';

// This parser extracts data from image files using OCR
export async function extractDataFromImage(buffer: Buffer, mimeType: string): Promise<Partial<Portfolio>> {
  try {
    console.log(`Processing image of type ${mimeType}...`);
    
    // Convert buffer to base64 for Tesseract.js
    const base64Image = buffer.toString('base64');
    const imageUrl = `data:${mimeType};base64,${base64Image}`;
    
    // Perform OCR on the image
    console.log("Starting OCR process...");
    const { data } = await Tesseract.recognize(
      imageUrl,
      'eng',
      {
        logger: m => {
          if (m.status === 'recognizing text' && typeof m.progress === 'number') {
            console.log(`OCR progress: ${(m.progress * 100).toFixed(2)}%`);
          }
        }
      }
    );
    
    const text = data.text;
    console.log("OCR completed. Extracted text sample:", text.substring(0, 200) + "...");
    
    // Now we'll use the same extraction methods as in pdf-parser.ts
    // We can import these functions, but for simplicity I'll implement similar logic here
    
    // Extract portfolio data using regex patterns
    const portfolio: Partial<Portfolio> = {
      name: extractNameFromImage(text),
      title: extractTitleFromImage(text),
      email: extractEmailFromImage(text),
      phone: extractPhoneFromImage(text),
      location: extractLocationFromImage(text),
      website: extractWebsiteFromImage(text),
      about: extractAboutFromImage(text),
      skills: extractSkillsFromImage(text)
    };
    
    // If we have significant text but no data was extracted, try harder
    // with more generic approaches
    if (text.length > 200 && !portfolio.name && !portfolio.title) {
      const lines = text.split('\n').filter(line => line.trim().length > 0);
      
      // Try to get name from the first line if not extracted
      if (!portfolio.name && lines.length > 0) {
        portfolio.name = lines[0].trim();
      }
      
      // Try to extract skills by looking for technical terms
      if (!portfolio.skills) {
        const techKeywords = [
          "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby", 
          "PHP", "Swift", "React", "Angular", "Vue", "Node.js", "HTML", "CSS",
          "SQL", "MongoDB", "PostgreSQL", "AWS", "Docker", "Git"
        ];
        
        const foundSkills = techKeywords.filter(keyword => 
          text.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (foundSkills.length > 0) {
          portfolio.skills = foundSkills;
        }
      }
    }
    
    return portfolio;
  } catch (error) {
    console.error("Error extracting data from image:", error);
    throw new Error("Failed to extract data from image");
  }
}

// Helper extraction functions
function extractNameFromImage(text: string): string | undefined {
  // Names are typically at the top of a resume
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  if (lines.length > 0) {
    // First line is often the name unless it contains "resume" or similar words
    const firstLine = lines[0].trim();
    if (!firstLine.match(/resume|curriculum|vitae|cv/i)) {
      return firstLine;
    } else if (lines.length > 1) {
      return lines[1].trim();
    }
  }
  
  return undefined;
}

function extractTitleFromImage(text: string): string | undefined {
  // Look for professional titles like "Software Engineer", "Project Manager", etc.
  const titleRegex = /(?:^|\n|\s)([\w\s]+(?:Developer|Engineer|Designer|Manager|Director|Consultant|Analyst|Specialist|Architect|Administrator))(?:$|\n|\s)/i;
  const match = text.match(titleRegex);
  return match ? match[1].trim() : undefined;
}

function extractEmailFromImage(text: string): string | undefined {
  // Extract email addresses
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/i;
  const match = text.match(emailRegex);
  return match ? match[0].trim() : undefined;
}

function extractPhoneFromImage(text: string): string | undefined {
  // Extract phone numbers in various formats
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const match = text.match(phoneRegex);
  return match ? match[0].trim() : undefined;
}

function extractLocationFromImage(text: string): string | undefined {
  // Look for city, state format
  const locationRegex = /(?:^|\n|\s)([A-Za-z\s]+,\s*[A-Za-z\s]+)(?:$|\n|\s)/g;
  const matches = [...text.matchAll(locationRegex)];
  
  for (const match of matches) {
    const location = match[1].trim();
    // Filter out names or other non-location matches
    if (location.length > 3 && location.length < 50 && location.includes(",")) {
      return location;
    }
  }
  
  return undefined;
}

function extractWebsiteFromImage(text: string): string | undefined {
  // Extract URLs
  const websiteRegex = /https?:\/\/(?:www\.)?[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]/i;
  const match = text.match(websiteRegex);
  
  if (match) {
    return match[0];
  }
  
  // Look for LinkedIn profiles
  const linkedinRegex = /linkedin\.com\/in\/[\w-]+/i;
  const linkedinMatch = text.match(linkedinRegex);
  
  return linkedinMatch ? `https://${linkedinMatch[0]}` : undefined;
}

function extractAboutFromImage(text: string): string | undefined {
  // Look for a summary or about section
  const aboutRegex = /(?:summary|about|profile|objective|professional summary)(?:[:\s]|.*\n)([\s\S]*?)(?:experience|education|skills|projects|employment|work|qualifications)/i;
  const match = text.match(aboutRegex);
  
  if (match && match[1]) {
    return match[1].trim().replace(/\n\s*\n/g, '\n').substring(0, 300);
  }
  
  // If no explicit section, try to get some content from the beginning
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  if (lines.length > 3) {
    // Skip the first few lines (likely name, title, contact info)
    return lines.slice(3, 7).join(' ').trim();
  }
  
  return undefined;
}

function extractSkillsFromImage(text: string): string[] | undefined {
  // Try to find a skills section
  const skillsRegex = /skills(?:[:\s]|.*\n)([\s\S]*?)(?:experience|education|projects|references|certifications|\n\s*\n\s*\n|$)/i;
  const match = text.match(skillsRegex);
  
  if (match && match[1]) {
    const skillsText = match[1].trim();
    
    // Try to parse skills separated by commas, bullets, or newlines
    let skills: string[] = [];
    
    if (skillsText.includes(',')) {
      // Comma-separated skills
      skills = skillsText.split(',').map(s => s.trim()).filter(s => s.length > 2 && s.length < 30);
    } else if (skillsText.match(/[•\-*]/)) {
      // Bullet-separated skills
      skills = skillsText.split(/[•\-*]/).map(s => s.trim()).filter(s => s.length > 2 && s.length < 30);
    } else {
      // Newline-separated skills
      skills = skillsText.split('\n').map(s => s.trim()).filter(s => s.length > 2 && s.length < 30);
    }
    
    return skills.length > 0 ? skills.slice(0, 10) : undefined;
  }
  
  // If no skills section, look for common technical terms
  const technicalTerms = text.match(/(?:JavaScript|TypeScript|Python|Java|C\+\+|C#|Ruby|PHP|Swift|Go|React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|ASP\.NET|SQL|MongoDB|PostgreSQL|MySQL|AWS|Azure|GCP|Docker|Kubernetes|Git|REST|GraphQL|HTML|CSS|SASS|LESS)/gi);
  
  if (technicalTerms) {
    // Remove duplicates and limit to 10 skills
    return [...new Set(technicalTerms.map(t => t.trim()))].slice(0, 10);
  }
  
  return undefined;
}
