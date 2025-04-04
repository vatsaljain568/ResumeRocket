import type { Portfolio } from "@shared/schema";
// @ts-ignore
import pdfParse from "pdf-parse";

// Parser for extracting data from PDF files
export async function extractDataFromPDF(buffer: Buffer): Promise<Partial<Portfolio>> {
  try {
    // Parse PDF content
    const data = await pdfParse(buffer);
    const text = data.text;
    
    // Log the extracted text (for debugging)
    console.log("Extracted PDF text:", text.substring(0, 500) + "...");
    
    // Extract data from the parsed text
    const portfolio: Partial<Portfolio> = {
      // Extract basic information
      name: extractName(text),
      title: extractTitle(text),
      email: extractEmail(text),
      phone: extractPhone(text),
      location: extractLocation(text),
      website: extractWebsite(text),
      about: extractAbout(text),
      
      // Extract detailed sections
      experience: extractExperience(text),
      education: extractEducation(text),
      skills: extractSkills(text),
      projects: extractProjects(text)
    };
    
    return portfolio;
  } catch (error) {
    console.error("Error extracting data from PDF:", error);
    throw new Error("Failed to extract data from PDF");
  }
}

// Extract name (usually at the top of the resume)
function extractName(text: string): string | undefined {
  // Look for a name at the beginning of the document
  // Names are typically in larger font, on their own line at the start
  const lines = text.split("\n").filter(line => line.trim().length > 0);
  
  if (lines.length > 0) {
    const potentialName = lines[0].trim();
    // If the first line contains typical resume title words, try the second line
    if (potentialName.match(/resume|curriculum|vitae|cv/i) && lines.length > 1) {
      return lines[1].trim();
    }
    return potentialName;
  }
  
  return undefined;
}

// Extract professional title
function extractTitle(text: string): string | undefined {
  const titleRegex = /(?:^|\n)([\w\s]+(?:Developer|Engineer|Designer|Manager|Director|Consultant|Specialist|Analyst|Architect|Administrator))(?:$|\n)/i;
  const match = text.match(titleRegex);
  return match ? match[1].trim() : undefined;
}

// Extract email address
function extractEmail(text: string): string | undefined {
  const emailRegex = /[\w.-]+@[\w.-]+\.\w+/i;
  const match = text.match(emailRegex);
  return match ? match[0] : undefined;
}

// Extract phone number
function extractPhone(text: string): string | undefined {
  const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const match = text.match(phoneRegex);
  return match ? match[0] : undefined;
}

// Extract location
function extractLocation(text: string): string | undefined {
  // Look for common location patterns (City, State/Province or Country)
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

// Extract website/portfolio URL
function extractWebsite(text: string): string | undefined {
  const websiteRegex = /https?:\/\/(?:www\.)?[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]/i;
  const match = text.match(websiteRegex);
  
  if (match) {
    return match[0];
  }
  
  // Look for LinkedIn profile
  const linkedinRegex = /linkedin\.com\/in\/[\w-]+/i;
  const linkedinMatch = text.match(linkedinRegex);
  
  return linkedinMatch ? `https://${linkedinMatch[0]}` : undefined;
}

// Extract professional summary/about section
function extractAbout(text: string): string | undefined {
  // Look for summary/about/profile/objective section
  const sectionRegex = /(?:summary|about|profile|objective|professional summary)(?:\s*:|.*\n)([\s\S]*?)(?:experience|education|skills|projects|employment|work|qualifications)/i;
  const match = text.match(sectionRegex);
  
  if (match && match[1]) {
    return match[1].trim().replace(/\n\s*\n/g, '\n').substring(0, 500);
  }
  
  // If we can't find the section, use the first few lines after the header
  const lines = text.split("\n").filter(line => line.trim().length > 0);
  if (lines.length > 2) {
    return lines.slice(2, 5).join(" ").trim();
  }
  
  return undefined;
}

// Extract work experience entries
function extractExperience(text: string): Array<{
  position: string;
  company: string;
  duration: string;
  description: string[];
}> | undefined {
  // Find the experience section
  const experienceSection = text.match(/(?:experience|employment|work history)(?:[:\s]|.*\n)([\s\S]*?)(?:education|skills|projects|certifications|languages|interests|\n\s*\n\s*\n)/i);
  
  if (!experienceSection || !experienceSection[1]) return undefined;
  
  const experienceText = experienceSection[1];
  const experiences = [];
  
  // Split into entries
  const entries = experienceText.split(/\n\s*\n/);
  
  for (const entry of entries) {
    if (entry.trim().length < 10) continue;
    
    // Try to extract position, company, duration
    const position = entry.match(/(?:^|\n)([\w\s]+(?:Developer|Engineer|Designer|Manager|Director|Consultant|Specialist|Analyst|Architect|Administrator|Associate|Lead))(?:$|\n|\s+at|\s+\-)/i);
    
    const company = entry.match(/(?:at|@|with|for)\s+([\w\s&]+)(?:$|\n|,|\s+in|\s+from)/i) || 
                    entry.match(/(?:^|\n)([\w\s&.,]+?)(?:\s*\-|\s+from|\s+\(|\n)/i);
    
    const duration = entry.match(/(?:from\s+|between\s+)?((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|[0-9]{4})[\s\-to]+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|[0-9]{4}|Present|Current|Now))/i) ||
                     entry.match(/([0-9]{4}\s*\-\s*(?:[0-9]{4}|Present|Current|Now))/i);
    
    // Clean up entry to extract description points
    const cleanedEntry = entry
      .replace(position?.[0] || "", "")
      .replace(company?.[0] || "", "")
      .replace(duration?.[0] || "", "");
    
    // Extract bullet points
    let descriptionPoints = cleanedEntry
      .split(/\n\s*[\-•*]\s*/)
      .map(point => point.trim())
      .filter(point => point.length > 10 && point.length < 300);
    
    // If no bullet points, split by newlines
    if (descriptionPoints.length <= 1) {
      descriptionPoints = cleanedEntry
        .split(/\n/)
        .map(point => point.trim())
        .filter(point => point.length > 10 && point.length < 300);
    }
    
    if (position || company) {
      experiences.push({
        position: position ? position[1].trim() : "Professional Position",
        company: company ? company[1].trim() : "Company",
        duration: duration ? duration[1].trim() : "",
        description: descriptionPoints.length > 0 ? descriptionPoints : ["Responsibilities included professional tasks and achievements"]
      });
    }
    
    // Limit to 3 experiences
    if (experiences.length >= 3) break;
  }
  
  return experiences.length > 0 ? experiences : undefined;
}

// Extract education entries
function extractEducation(text: string): Array<{
  degree: string;
  institution: string;
  duration: string;
  description?: string;
}> | undefined {
  // Find the education section
  const educationSection = text.match(/education(?:[:\s]|.*\n)([\s\S]*?)(?:experience|skills|projects|certifications|languages|interests|\n\s*\n\s*\n|$)/i);
  
  if (!educationSection || !educationSection[1]) return undefined;
  
  const educationText = educationSection[1];
  const educationEntries = [];
  
  // Split into entries
  const entries = educationText.split(/\n\s*\n/);
  
  for (const entry of entries) {
    if (entry.trim().length < 10) continue;
    
    // Try to extract degree, institution, duration
    const degree = entry.match(/(?:^|\n)((?:Bachelor|Master|PhD|Doctorate|BSc|BA|MSc|MA|BEng|MEng|B\.S\.|M\.S\.|B\.A\.|M\.A\.|M\.B\.A\.|MBA|Ph\.D\.|Certificate|Diploma)[\s\w\.,]+)(?:$|\n|,|\s+at|\s+from)/i) ||
                   entry.match(/(?:^|\n)((?:[\w\s]+) (?:in|of) (?:[\w\s]+))(?:$|\n|,|\s+at|\s+from)/i);
    
    const institution = entry.match(/(?:at|from)\s+([\w\s&.,]+?)(?:$|\n|,|\s+in|\s+from)/i) || 
                         entry.match(/((?:University|College|School|Institute|Academy)[\s\w\.,]+)(?:$|\n|,|\s+in|\s+from)/i);
    
    const duration = entry.match(/(?:from\s+|between\s+)?((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|[0-9]{4})[\s\-to]+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|[0-9]{4}|Present|Current|Now))/i) ||
                     entry.match(/([0-9]{4}\s*\-\s*(?:[0-9]{4}|Present|Current|Now))/i);
    
    // Clean up the entry
    const cleanedEntry = entry
      .replace(degree?.[0] || "", "")
      .replace(institution?.[0] || "", "")
      .replace(duration?.[0] || "", "")
      .trim();
    
    if (degree || institution) {
      educationEntries.push({
        degree: degree ? degree[1].trim() : "Degree",
        institution: institution ? institution[1].trim() : "Educational Institution",
        duration: duration ? duration[1].trim() : "",
        description: cleanedEntry.length > 10 ? cleanedEntry : undefined
      });
    }
    
    // Limit to 2 education entries
    if (educationEntries.length >= 2) break;
  }
  
  return educationEntries.length > 0 ? educationEntries : undefined;
}

// Extract skills list
function extractSkills(text: string): string[] | undefined {
  // Find the skills section
  const skillsSection = text.match(/skills(?:[:\s]|.*\n)([\s\S]*?)(?:experience|education|projects|certifications|languages|interests|\n\s*\n\s*\n|$)/i);
  
  if (!skillsSection || !skillsSection[1]) {
    // If no dedicated skills section, try to extract skill words throughout the document
    const technicalWords = text.match(/(?:JavaScript|TypeScript|Python|Java|C\+\+|C#|Ruby|PHP|Swift|Go|Kotlin|React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|ASP\.NET|SQL|MongoDB|PostgreSQL|MySQL|Redis|AWS|Azure|GCP|Docker|Kubernetes|Git|REST|GraphQL|HTML|CSS|SASS|LESS|Webpack|Babel|Jenkins|CircleCI|Travis|Agile|Scrum|Kanban|TDD|CI\/CD|DevOps|UI\/UX|Figma|Sketch|Adobe XD|Photoshop|Illustrator)/gi);
    
    if (technicalWords) {
      // Convert to unique array of skills
      return [...new Set(technicalWords.map(w => w.trim()))].slice(0, 8);
    }
    
    return undefined;
  }
  
  const skillsText = skillsSection[1].trim();
  
  // Try to extract a list of skills
  const skills: string[] = [];
  
  // Check if skills are in a bullet list
  if (skillsText.includes('•') || skillsText.includes('-') || skillsText.includes('*')) {
    const bulletSkills = skillsText
      .split(/[•\-*]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0 && skill.length < 50);
    
    skills.push(...bulletSkills);
  } else {
    // Check if skills are comma-separated
    if (skillsText.includes(',')) {
      const commaSkills = skillsText
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0 && skill.length < 50);
      
      skills.push(...commaSkills);
    } else {
      // Try to split by whitespace or newlines
      const lineSkills = skillsText
        .split(/\n/)
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0 && skill.length < 50);
      
      skills.push(...lineSkills);
    }
  }
  
  // Filter out obvious non-skills (too short, or too long)
  const filteredSkills = skills.filter(skill => skill.length > 2 && skill.length < 50);
  
  // Limit to a reasonable number of skills
  return filteredSkills.slice(0, 12);
}

// Extract projects
function extractProjects(text: string): Array<{
  title: string;
  description: string;
  link?: string;
}> | undefined {
  // Find the projects section
  const projectsSection = text.match(/projects(?:[:\s]|.*\n)([\s\S]*?)(?:experience|education|skills|certifications|languages|interests|\n\s*\n\s*\n|$)/i);
  
  if (!projectsSection || !projectsSection[1]) return undefined;
  
  const projectsText = projectsSection[1];
  const projects = [];
  
  // Split into entries
  const entries = projectsText.split(/\n\s*\n/);
  
  for (const entry of entries) {
    if (entry.trim().length < 20) continue;
    
    // Try to extract project title
    const titleMatch = entry.match(/^([^.,:\n]+)/i) || 
                       entry.match(/(?:^|\n)(?:[\-•*]\s*)([^.,:\n]+)/i);
    
    const title = titleMatch ? titleMatch[1].trim() : undefined;
    
    // Extract URL if present
    const urlMatch = entry.match(/https?:\/\/(?:www\.)?[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]/i);
    const link = urlMatch ? urlMatch[0] : undefined;
    
    // Clean the entry for description
    let description = entry;
    if (title) description = description.replace(title, "");
    if (link) description = description.replace(link, "");
    
    description = description
      .replace(/^[\-•*\s]+/, "")
      .trim()
      .split("\n")
      .map(line => line.trim().replace(/^[\-•*\s]+/, ""))
      .filter(line => line.length > 0)
      .join(" ")
      .replace(/\s{2,}/g, " ");
    
    if (title && description) {
      projects.push({
        title: title || "Project",
        description: description || "Project description",
        link
      });
    }
    
    // Limit to 2 projects
    if (projects.length >= 2) break;
  }
  
  return projects.length > 0 ? projects : undefined;
}
