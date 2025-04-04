import React, { useState } from "react";
import { Link } from "wouter";

export function Examples() {
  const [selectedExample, setSelectedExample] = useState<number | null>(null);

  const examples = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Web Developer",
      description: "Full-stack developer with expertise in React, Node.js, and database technologies.",
      imageBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
      location: "San Francisco, CA",
      email: "alex.johnson@example.com",
      phone: "(123) 456-7890",
      website: "alexjohnson.dev"
    },
    {
      id: 2,
      name: "Sarah Miller",
      title: "UX Designer",
      description: "User experience designer focused on creating intuitive and accessible digital products.",
      imageBg: "bg-gradient-to-r from-pink-500 to-rose-500",
      location: "New York, NY",
      email: "sarah.miller@example.com",
      phone: "(234) 567-8901",
      website: "sarahmiller.design"
    },
    {
      id: 3,
      name: "Michael Chen",
      title: "Data Scientist",
      description: "Data science professional with skills in machine learning, statistical analysis, and data visualization.",
      imageBg: "bg-gradient-to-r from-green-500 to-emerald-500",
      location: "Seattle, WA",
      email: "michael.chen@example.com",
      phone: "(345) 678-9012",
      website: "michaelchen.io"
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Portfolio Examples
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Check out these example portfolios created with our platform. Your resume can be transformed into a professional website just like these.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <div key={example.id} className="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
                <div className={`h-32 ${example.imageBg}`}>
                  <div className="h-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white opacity-50">
                      {example.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{example.name}</div>
                  <p className="text-primary text-base mb-4">{example.title}</p>
                  <p className="text-gray-700 text-base">
                    {example.description}
                  </p>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {example.location}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Skills</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {getSkillsForExample(example.id).map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-primary">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Featured Project</h3>
                    <div className="mt-2 text-sm text-gray-700">
                      <p className="font-medium">{getProjectForExample(example.id).title}</p>
                      <p className="mt-1">{getProjectForExample(example.id).description}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                  <button 
                    onClick={() => setSelectedExample(example.id)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700"
                  >
                    View Full Portfolio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed view of examples - shown when one is selected */}
        {selectedExample !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold">{examples.find(e => e.id === selectedExample)?.name}'s Portfolio</h3>
                <button 
                  onClick={() => setSelectedExample(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {selectedExample && <PortfolioDetail id={selectedExample} />}
              </div>
            </div>
          </div>
        )}
        
        {/* Testimonials Section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">What Users Say About Us</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div className="ml-4">
                  <p className="font-medium">James Donovan</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <div className="text-gray-700">
                <p>"I was skeptical at first, but this tool actually created an impressive portfolio from my resume. It saved me hours of work and the result looked professional. I've already received compliments on my new portfolio website!"</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                  RL
                </div>
                <div className="ml-4">
                  <p className="font-medium">Rachel Lin</p>
                  <p className="text-sm text-gray-500">Marketing Specialist</p>
                </div>
              </div>
              <div className="text-gray-700">
                <p>"As a non-technical person, I was worried about creating a portfolio website. This tool made it incredibly easy. I uploaded my resume, made a few edits to the generated content, and had a beautiful site within minutes!"</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Industries Section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Perfect For Professionals Across All Industries</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className="mt-2 font-medium">Tech & Development</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <p className="mt-2 font-medium">Marketing & Design</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="mt-2 font-medium">Business & Finance</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="mt-2 font-medium">Education & Research</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-500 mb-8">
            Ready to create your own professional portfolio website?
          </p>
          <Link href="/">
            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700">
              Create Your Portfolio
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Detailed portfolio component
function PortfolioDetail({ id }: { id: number }) {
  const example = {
    id,
    name: id === 1 ? "Alex Johnson" : id === 2 ? "Sarah Miller" : "Michael Chen",
    title: id === 1 ? "Web Developer" : id === 2 ? "UX Designer" : "Data Scientist",
    imageBg: id === 1 
      ? "bg-gradient-to-r from-blue-500 to-indigo-600" 
      : id === 2 
        ? "bg-gradient-to-r from-pink-500 to-rose-500" 
        : "bg-gradient-to-r from-green-500 to-emerald-500",
    about: id === 1 
      ? "I am a passionate full-stack web developer with over 5 years of experience building scalable web applications. I specialize in modern JavaScript frameworks and have a strong focus on creating performant, accessible, and user-friendly interfaces."
      : id === 2
        ? "I'm a user experience designer who believes in creating digital products that are both beautiful and functional. With a background in psychology and visual design, I bring a holistic approach to solving complex design challenges."
        : "As a data scientist with expertise in machine learning and statistical analysis, I help organizations transform raw data into actionable insights. I'm passionate about finding patterns in complex datasets and communicating findings effectively.",
    experience: getExperienceForExample(id),
    education: getEducationForExample(id),
    skills: getSkillsForExample(id),
    projects: getProjectsForExample(id),
    contact: {
      email: id === 1 ? "alex.johnson@example.com" : id === 2 ? "sarah.miller@example.com" : "michael.chen@example.com",
      phone: id === 1 ? "(123) 456-7890" : id === 2 ? "(234) 567-8901" : "(345) 678-9012",
      location: id === 1 ? "San Francisco, CA" : id === 2 ? "New York, NY" : "Seattle, WA",
      website: id === 1 ? "alexjohnson.dev" : id === 2 ? "sarahmiller.design" : "michaelchen.io",
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{example.name}</h1>
          <p className="text-xl text-primary">{example.title}</p>
        </div>
        <div className="mt-4 md:mt-0 space-y-2">
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {example.contact.email}
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {example.contact.phone}
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {example.contact.location}
          </div>
          <div className="flex items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
            </svg>
            {example.contact.website}
          </div>
        </div>
      </div>

      {/* About */}
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">About</h2>
        <p className="text-gray-700">{example.about}</p>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {example.skills.map((skill, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-primary">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Experience</h2>
        <div className="space-y-6">
          {example.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="text-lg font-medium">{exp.position}</h3>
                <p className="text-sm text-gray-500">{exp.duration}</p>
              </div>
              <p className="text-primary">{exp.company}</p>
              <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                {exp.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Education</h2>
        <div className="space-y-6">
          {example.education.map((edu, index) => (
            <div key={index}>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <h3 className="text-lg font-medium">{edu.degree}</h3>
                <p className="text-sm text-gray-500">{edu.duration}</p>
              </div>
              <p className="text-primary">{edu.institution}</p>
              <p className="mt-2 text-gray-700">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold border-b border-gray-200 pb-2 mb-4">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {example.projects.map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="mt-2 text-gray-700">{project.description}</p>
              {project.link && (
                <a 
                  href="#" 
                  className="mt-2 inline-flex items-center text-primary hover:text-indigo-700"
                  onClick={(e) => e.preventDefault()}
                >
                  View Project
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper functions to provide more details for each example
function getSkillsForExample(id: number) {
  switch (id) {
    case 1:
      return ["React", "Node.js", "TypeScript", "MongoDB", "Express", "GraphQL", "AWS", "Docker"];
    case 2:
      return ["Figma", "Adobe XD", "User Research", "Prototyping", "UI Design", "Wireframing", "A/B Testing", "Design Systems"];
    case 3:
      return ["Python", "R", "TensorFlow", "SQL", "Data Visualization", "Machine Learning", "Statistical Analysis", "Big Data"];
    default:
      return [];
  }
}

function getExperienceForExample(id: number) {
  switch (id) {
    case 1:
      return [
        {
          position: "Senior Software Engineer",
          company: "TechCorp Inc.",
          duration: "Jan 2019 - Present",
          description: [
            "Led development of the company's flagship product, increasing performance by 40%",
            "Mentored junior developers and implemented code review processes",
            "Introduced modern JavaScript frameworks that improved developer productivity"
          ]
        },
        {
          position: "Web Developer",
          company: "Innovative Solutions LLC",
          duration: "Mar 2017 - Dec 2018",
          description: [
            "Developed responsive websites for clients across various industries",
            "Collaborated with design team to implement pixel-perfect UIs",
            "Optimized existing websites to improve SEO and performance metrics"
          ]
        }
      ];
    case 2:
      return [
        {
          position: "Lead UX Designer",
          company: "DesignForward Agency",
          duration: "Jun 2018 - Present",
          description: [
            "Spearheaded design strategy for enterprise clients, resulting in 30% increase in user engagement",
            "Managed a team of 4 designers and established consistent design processes",
            "Conducted workshops to align stakeholders and gather requirements for complex projects"
          ]
        },
        {
          position: "UX/UI Designer",
          company: "CreativeTech Startup",
          duration: "Aug 2016 - May 2018",
          description: [
            "Redesigned mobile app interface, improving user retention by 25%",
            "Created and maintained the company's design system",
            "Collaborated with developers to ensure high-quality implementation of designs"
          ]
        }
      ];
    case 3:
      return [
        {
          position: "Senior Data Scientist",
          company: "Data Insights Corp",
          duration: "Apr 2019 - Present",
          description: [
            "Developed predictive models that increased revenue by 15% for e-commerce clients",
            "Led a team of data scientists on various machine learning projects",
            "Created automated data pipelines that reduced reporting time by 60%"
          ]
        },
        {
          position: "Data Analyst",
          company: "Analytics Partners",
          duration: "Sep 2017 - Mar 2019",
          description: [
            "Performed statistical analysis on large datasets to identify business opportunities",
            "Built interactive dashboards for executive decision-making",
            "Collaborated with marketing team to optimize campaign performance"
          ]
        }
      ];
    default:
      return [];
  }
}

function getEducationForExample(id: number) {
  switch (id) {
    case 1:
      return [
        {
          degree: "Master of Computer Science",
          institution: "Stanford University",
          duration: "2015 - 2017",
          description: "Specialized in Web Technologies and Distributed Systems"
        },
        {
          degree: "Bachelor of Science in Computer Engineering",
          institution: "University of California, Berkeley",
          duration: "2011 - 2015",
          description: "Graduated with honors, GPA 3.8/4.0"
        }
      ];
    case 2:
      return [
        {
          degree: "Master of Fine Arts in Interaction Design",
          institution: "Rhode Island School of Design",
          duration: "2014 - 2016",
          description: "Focused on user-centered design methodologies and accessibility"
        },
        {
          degree: "Bachelor of Arts in Psychology",
          institution: "New York University",
          duration: "2010 - 2014",
          description: "Minor in Visual Arts, Dean's List recipient"
        }
      ];
    case 3:
      return [
        {
          degree: "PhD in Computer Science",
          institution: "Massachusetts Institute of Technology",
          duration: "2014 - 2017",
          description: "Dissertation on 'Machine Learning Applications in Predictive Analytics'"
        },
        {
          degree: "Bachelor of Science in Statistics",
          institution: "University of Washington",
          duration: "2010 - 2014",
          description: "Minor in Computer Science, Summa Cum Laude"
        }
      ];
    default:
      return [];
  }
}

function getProjectsForExample(id: number) {
  switch (id) {
    case 1:
      return [
        {
          title: "E-commerce Platform",
          description: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB, featuring user authentication and payment processing.",
          link: "#"
        },
        {
          title: "Task Management App",
          description: "Created a productivity tool with drag-and-drop functionality, real-time updates, and team collaboration features.",
          link: "#"
        },
        {
          title: "API Gateway Service",
          description: "Developed a microservice-based API gateway that handles authentication, rate limiting, and request routing.",
          link: "#"
        },
        {
          title: "Developer Portfolio",
          description: "Designed and implemented a responsive portfolio website showcasing projects and skills.",
          link: "#"
        }
      ];
    case 2:
      return [
        {
          title: "Mobile Banking App Redesign",
          description: "Conducted user research and redesigned a banking application to improve usability and accessibility for diverse users.",
          link: "#"
        },
        {
          title: "E-learning Platform UX",
          description: "Led the user experience design for an online learning platform, focusing on engagement and completion rates.",
          link: "#"
        },
        {
          title: "Healthcare Dashboard",
          description: "Created an intuitive interface for healthcare professionals to manage patient data and track outcomes.",
          link: "#"
        },
        {
          title: "Design System Development",
          description: "Built a comprehensive design system for a tech company, including components, guidelines, and documentation.",
          link: "#"
        }
      ];
    case 3:
      return [
        {
          title: "Predictive Analytics Dashboard",
          description: "Developed a dashboard that uses machine learning to predict customer behaviors and business trends.",
          link: "#"
        },
        {
          title: "Sentiment Analysis Tool",
          description: "Built a natural language processing system that analyzes customer feedback and categorizes sentiment.",
          link: "#"
        },
        {
          title: "Supply Chain Optimization",
          description: "Created models to optimize inventory management and reduce costs by 22% for a retail client.",
          link: "#"
        },
        {
          title: "Financial Market Prediction",
          description: "Implemented algorithms for financial market analysis and prediction based on historical data patterns.",
          link: "#"
        }
      ];
    default:
      return [];
  }
}

function getProjectForExample(id: number) {
  const projects = getProjectsForExample(id);
  return projects.length > 0 ? projects[0] : { title: "", description: "" };
}