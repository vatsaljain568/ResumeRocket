import React, { useState } from "react";
import { type Portfolio } from "@shared/schema";
import { downloadPortfolio, updatePortfolio } from "../lib/resumeUtils";
import { useToast } from "@/hooks/use-toast";

type PortfolioPreviewProps = {
  portfolio: Portfolio;
  portfolioId: number;
  onStartOver: () => void;
};

export function PortfolioPreview({ portfolio, portfolioId, onStartOver }: PortfolioPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPortfolio, setEditedPortfolio] = useState<Portfolio>(portfolio);
  const { toast } = useToast();

  const handleEditPortfolio = () => {
    setIsEditing(true);
  };

  const handleSavePortfolio = async () => {
    try {
      await updatePortfolio(portfolioId, editedPortfolio);
      setIsEditing(false);
      toast({
        title: "Portfolio updated",
        description: "Your portfolio has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating portfolio",
        description: "There was a problem updating your portfolio.",
        variant: "destructive",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditedPortfolio(portfolio);
    setIsEditing(false);
  };

  const handleDownloadPortfolio = () => {
    downloadPortfolio(isEditing ? editedPortfolio : portfolio);
    toast({
      title: "Portfolio downloaded",
      description: "Your portfolio has been downloaded as a JSON file.",
    });
  };

  const handlePublishPortfolio = () => {
    toast({
      title: "Portfolio published",
      description: "Your portfolio has been published successfully.",
    });
  };

  const handleChange = (field: keyof Portfolio, value: any) => {
    setEditedPortfolio(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderPortfolioContent = () => {
    const data = isEditing ? editedPortfolio : portfolio;

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Portfolio Header Preview */}
        <div className="relative">
          <div className="h-32 w-full bg-gradient-to-r from-primary to-indigo-800"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {isEditing ? (
                <input
                  type="text"
                  className="text-3xl font-bold text-white bg-transparent border-b border-white text-center w-full mb-2"
                  value={data.name || ""}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your Name"
                />
              ) : (
                <h1 className="text-3xl font-bold text-white">{data.name}</h1>
              )}
              
              {isEditing || data.title ? (
                isEditing ? (
                  <input
                    type="text"
                    className="text-xl text-white opacity-90 bg-transparent border-b border-white text-center w-full"
                    value={data.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Your Title"
                  />
                ) : (
                  <p className="text-xl text-white opacity-90">{data.title}</p>
                )
              ) : null}
            </div>
          </div>
        </div>

        {/* Portfolio Content */}
        <div className="p-6">
          {/* Contact Section - Only show if we have at least one contact field or in editing mode */}
          {(isEditing || data.email || data.phone || data.location || data.website) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Contact Information</h2>
              <div className="flex flex-wrap gap-4">
                {/* Email - Only show if available or in editing mode */}
                {(isEditing || data.email) && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {isEditing ? (
                      <input
                        type="email"
                        className="text-gray-600 border-b border-gray-300"
                        value={data.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="email@example.com"
                      />
                    ) : (
                      <span className="text-gray-600">{data.email}</span>
                    )}
                  </div>
                )}
                
                {/* Phone - Only show if available or in editing mode */}
                {(isEditing || data.phone) && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    {isEditing ? (
                      <input
                        type="tel"
                        className="text-gray-600 border-b border-gray-300"
                        value={data.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(123) 456-7890"
                      />
                    ) : (
                      <span className="text-gray-600">{data.phone}</span>
                    )}
                  </div>
                )}
                
                {/* Location - Only show if available or in editing mode */}
                {(isEditing || data.location) && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {isEditing ? (
                      <input
                        type="text"
                        className="text-gray-600 border-b border-gray-300"
                        value={data.location || ""}
                        onChange={(e) => handleChange("location", e.target.value)}
                        placeholder="City, State"
                      />
                    ) : (
                      <span className="text-gray-600">{data.location}</span>
                    )}
                  </div>
                )}
                
                {/* Website - Only show if available or in editing mode */}
                {(isEditing || data.website) && (
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                    </svg>
                    {isEditing ? (
                      <input
                        type="url"
                        className="text-primary hover:underline border-b border-gray-300"
                        value={data.website || ""}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <a href={data.website} className="text-primary hover:underline">
                        {data.website}
                      </a>
                    )}
                  </div>
                )}
                
                {/* Add contact info button in edit mode */}
                {isEditing && (
                  <div className="w-full mt-2">
                    <button 
                      className="text-xs text-primary hover:underline"
                      onClick={() => {
                        // Prompt for which field to add if missing
                        if (!data.email) handleChange("email", "");
                        else if (!data.phone) handleChange("phone", "");
                        else if (!data.location) handleChange("location", "");
                        else if (!data.website) handleChange("website", "");
                      }}
                    >
                      + Add missing contact information
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* About Section - Only show if we have content or in editing mode */}
          {(isEditing || data.about) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  className="w-full text-gray-600 border border-gray-300 rounded p-2 min-h-[100px]"
                  value={data.about || ""}
                  onChange={(e) => handleChange("about", e.target.value)}
                  placeholder="Write a brief description about yourself..."
                />
              ) : (
                <p className="text-gray-600">{data.about}</p>
              )}
            </div>
          )}

          {/* Experience Section - Only show if we have experience data or in editing mode */}
          {(isEditing || (data.experience && data.experience.length > 0)) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Work Experience</h2>
              {data.experience && data.experience.map((job, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="text-lg font-medium text-gray-900 border-b border-gray-300 w-full"
                          value={job.position}
                          onChange={(e) => {
                            const updatedExperience = [...data.experience!];
                            updatedExperience[index] = {
                              ...updatedExperience[index],
                              position: e.target.value
                            };
                            handleChange("experience", updatedExperience);
                          }}
                        />
                      ) : (
                        <h3 className="text-lg font-medium text-gray-900">{job.position}</h3>
                      )}
                      
                      {isEditing ? (
                        <input
                          type="text"
                          className="text-primary border-b border-gray-300"
                          value={job.company}
                          onChange={(e) => {
                            const updatedExperience = [...data.experience!];
                            updatedExperience[index] = {
                              ...updatedExperience[index],
                              company: e.target.value
                            };
                            handleChange("experience", updatedExperience);
                          }}
                        />
                      ) : (
                        <p className="text-primary">{job.company}</p>
                      )}
                    </div>
                    
                    {isEditing ? (
                      <input
                        type="text"
                        className="text-sm text-gray-500 border-b border-gray-300"
                        value={job.duration}
                        onChange={(e) => {
                          const updatedExperience = [...data.experience!];
                          updatedExperience[index] = {
                            ...updatedExperience[index],
                            duration: e.target.value
                          };
                          handleChange("experience", updatedExperience);
                        }}
                      />
                    ) : (
                      job.duration && <span className="text-sm text-gray-500">{job.duration}</span>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div>
                      {job.description.map((desc, descIndex) => (
                        <div key={descIndex} className="flex items-center mt-2">
                          <span className="mr-2">•</span>
                          <input
                            type="text"
                            className="flex-1 text-gray-600 border-b border-gray-300"
                            value={desc}
                            onChange={(e) => {
                              const updatedExperience = [...data.experience!];
                              const updatedDesc = [...updatedExperience[index].description];
                              updatedDesc[descIndex] = e.target.value;
                              updatedExperience[index] = {
                                ...updatedExperience[index],
                                description: updatedDesc
                              };
                              handleChange("experience", updatedExperience);
                            }}
                          />
                        </div>
                      ))}
                      <button
                        className="mt-2 text-xs text-primary hover:underline"
                        onClick={() => {
                          const updatedExperience = [...data.experience!];
                          updatedExperience[index] = {
                            ...updatedExperience[index],
                            description: [...updatedExperience[index].description, ""]
                          };
                          handleChange("experience", updatedExperience);
                        }}
                      >
                        + Add Description
                      </button>
                    </div>
                  ) : (
                    job.description && job.description.length > 0 && (
                      <ul className="mt-2 text-gray-600 list-disc list-inside pl-2 space-y-1">
                        {job.description.map((desc, descIndex) => (
                          <li key={descIndex}>{desc}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button
                  className="mt-2 text-sm text-primary hover:underline"
                  onClick={() => {
                    const newExperience = [
                      ...(data.experience || []),
                      {
                        position: "New Position",
                        company: "Company Name",
                        duration: "",
                        description: [""]
                      }
                    ];
                    handleChange("experience", newExperience);
                  }}
                >
                  + Add Work Experience
                </button>
              )}
            </div>
          )}

          {/* Education Section - Only show if we have education data or in editing mode */}
          {(isEditing || (data.education && data.education.length > 0)) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Education</h2>
              {data.education && data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="text-lg font-medium text-gray-900 border-b border-gray-300 w-full"
                          value={edu.degree}
                          onChange={(e) => {
                            const updatedEducation = [...data.education!];
                            updatedEducation[index] = {
                              ...updatedEducation[index],
                              degree: e.target.value
                            };
                            handleChange("education", updatedEducation);
                          }}
                        />
                      ) : (
                        <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                      )}
                      
                      {isEditing ? (
                        <input
                          type="text"
                          className="text-primary border-b border-gray-300"
                          value={edu.institution}
                          onChange={(e) => {
                            const updatedEducation = [...data.education!];
                            updatedEducation[index] = {
                              ...updatedEducation[index],
                              institution: e.target.value
                            };
                            handleChange("education", updatedEducation);
                          }}
                        />
                      ) : (
                        <p className="text-primary">{edu.institution}</p>
                      )}
                    </div>
                    
                    {isEditing ? (
                      <input
                        type="text"
                        className="text-sm text-gray-500 border-b border-gray-300"
                        value={edu.duration}
                        onChange={(e) => {
                          const updatedEducation = [...data.education!];
                          updatedEducation[index] = {
                            ...updatedEducation[index],
                            duration: e.target.value
                          };
                          handleChange("education", updatedEducation);
                        }}
                      />
                    ) : (
                      edu.duration && <span className="text-sm text-gray-500">{edu.duration}</span>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <input
                      type="text"
                      className="mt-1 w-full text-gray-600 border-b border-gray-300"
                      value={edu.description || ""}
                      onChange={(e) => {
                        const updatedEducation = [...data.education!];
                        updatedEducation[index] = {
                          ...updatedEducation[index],
                          description: e.target.value
                        };
                        handleChange("education", updatedEducation);
                      }}
                    />
                  ) : (
                    edu.description && <p className="mt-1 text-gray-600">{edu.description}</p>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button
                  className="mt-2 text-sm text-primary hover:underline"
                  onClick={() => {
                    const newEducation = [
                      ...(data.education || []),
                      {
                        degree: "Degree Name",
                        institution: "Institution Name",
                        duration: "",
                        description: ""
                      }
                    ];
                    handleChange("education", newEducation);
                  }}
                >
                  + Add Education
                </button>
              )}
            </div>
          )}

          {/* Skills Section - Only show if we have skills data or in editing mode */}
          {(isEditing || (data.skills && data.skills.length > 0)) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Skills</h2>
              {isEditing ? (
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(data.skills || []).map((skill, index) => (
                      <div key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-primary">
                        {skill}
                        <button
                          className="ml-1 text-indigo-800 hover:text-indigo-900"
                          onClick={() => {
                            const updatedSkills = (data.skills || []).filter((_, i) => i !== index);
                            handleChange("skills", updatedSkills);
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      id="new-skill"
                      className="flex-1 border border-gray-300 rounded-l-md p-2"
                      placeholder="Add new skill"
                    />
                    <button
                      className="bg-primary text-white px-3 py-2 rounded-r-md"
                      onClick={() => {
                        const input = document.getElementById("new-skill") as HTMLInputElement;
                        if (input.value.trim()) {
                          const updatedSkills = [...(data.skills || []), input.value.trim()];
                          handleChange("skills", updatedSkills);
                          input.value = "";
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {(data.skills || []).map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Projects Section - Only show if we have projects data or in editing mode */}
          {(isEditing || (data.projects && data.projects.length > 0)) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">Projects</h2>
              {data.projects && data.projects.map((project, index) => (
                <div key={index} className="mb-6">
                  {isEditing ? (
                    <input
                      type="text"
                      className="text-lg font-medium text-gray-900 border-b border-gray-300 w-full"
                      value={project.title}
                      onChange={(e) => {
                        const updatedProjects = [...data.projects!];
                        updatedProjects[index] = {
                          ...updatedProjects[index],
                          title: e.target.value
                        };
                        handleChange("projects", updatedProjects);
                      }}
                    />
                  ) : (
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                  )}
                  
                  {isEditing ? (
                    <textarea
                      className="mt-1 w-full text-gray-600 border border-gray-300 rounded p-2"
                      value={project.description}
                      onChange={(e) => {
                        const updatedProjects = [...data.projects!];
                        updatedProjects[index] = {
                          ...updatedProjects[index],
                          description: e.target.value
                        };
                        handleChange("projects", updatedProjects);
                      }}
                    />
                  ) : (
                    <p className="text-gray-600 mt-1">{project.description}</p>
                  )}
                  
                  <div className="mt-2">
                    {isEditing ? (
                      <input
                        type="url"
                        className="w-full text-primary border-b border-gray-300"
                        value={project.link || ""}
                        onChange={(e) => {
                          const updatedProjects = [...data.projects!];
                          updatedProjects[index] = {
                            ...updatedProjects[index],
                            link: e.target.value
                          };
                          handleChange("projects", updatedProjects);
                        }}
                        placeholder="https://project-link.com"
                      />
                    ) : (
                      project.link && (
                        <a href={project.link} className="text-primary hover:underline text-sm">
                          View Project →
                        </a>
                      )
                    )}
                  </div>
                </div>
              ))}
              
              {isEditing && (
                <button
                  className="mt-2 text-sm text-primary hover:underline"
                  onClick={() => {
                    const newProjects = [
                      ...(data.projects || []),
                      {
                        title: "New Project",
                        description: "Project description",
                        link: ""
                      }
                    ];
                    handleChange("projects", newProjects);
                  }}
                >
                  + Add Project
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Your Portfolio Preview</h2>
        <div className="flex space-x-4">
          {isEditing ? (
            <>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={handleSavePortfolio}
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={handleEditPortfolio}
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit
              </button>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={handleDownloadPortfolio}
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download
              </button>
            </>
          )}
        </div>
      </div>

      {/* Portfolio Preview Container */}
      {renderPortfolioContent()}

      <div className="mt-8 flex justify-end">
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-4"
          onClick={onStartOver}
        >
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Start Over
        </button>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          onClick={handlePublishPortfolio}
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Publish Portfolio
        </button>
      </div>
    </div>
  );
}
