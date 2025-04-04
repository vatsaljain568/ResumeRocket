import React from "react";

export function Examples() {
  const examples = [
    {
      id: 1,
      name: "Alex Johnson",
      title: "Web Developer",
      description: "Full-stack developer with expertise in React, Node.js, and database technologies.",
      imageBg: "bg-gradient-to-r from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      name: "Sarah Miller",
      title: "UX Designer",
      description: "User experience designer focused on creating intuitive and accessible digital products.",
      imageBg: "bg-gradient-to-r from-pink-500 to-rose-500"
    },
    {
      id: 3,
      name: "Michael Chen",
      title: "Data Scientist",
      description: "Data science professional with skills in machine learning, statistical analysis, and data visualization.",
      imageBg: "bg-gradient-to-r from-green-500 to-emerald-500"
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
              <div key={example.id} className="bg-white overflow-hidden shadow-lg rounded-lg">
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
                  <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700">
                    View Full Portfolio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-500 mb-8">
            Ready to create your own professional portfolio website?
          </p>
          <div className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700">
            <a href="/">Create Your Portfolio</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions to provide more details for each example
function getSkillsForExample(id: number) {
  switch (id) {
    case 1:
      return ["React", "Node.js", "TypeScript", "MongoDB", "Express"];
    case 2:
      return ["Figma", "Adobe XD", "User Research", "Prototyping", "UI Design"];
    case 3:
      return ["Python", "R", "TensorFlow", "SQL", "Data Visualization"];
    default:
      return [];
  }
}

function getProjectForExample(id: number) {
  switch (id) {
    case 1:
      return {
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB, featuring user authentication and payment processing."
      };
    case 2:
      return {
        title: "Mobile Banking App Redesign",
        description: "Conducted user research and redesigned a banking application to improve usability and accessibility for diverse users."
      };
    case 3:
      return {
        title: "Predictive Analytics Dashboard",
        description: "Developed a dashboard that uses machine learning to predict customer behaviors and business trends."
      };
    default:
      return { title: "", description: "" };
  }
}