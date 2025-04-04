import React from "react";
import { Link } from "wouter";

export function HowItWorks() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Transform your resume into a professional portfolio website in minutes with our simple 3-step process.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <span className="text-lg font-bold">1</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Upload Your Resume</h3>
                <p className="mt-2 text-base text-gray-500">
                  Simply upload your resume in PDF, JPG, or PNG format. We accept files up to 10MB in size.
                </p>
              </div>
              <div className="mt-6 ml-16">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <span className="text-lg font-bold">2</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Automated Processing</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our system extracts key information from your resume including your contact details, work experience, education, and skills.
                </p>
              </div>
              <div className="mt-6 ml-16">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                <span className="text-lg font-bold">3</span>
              </div>
              <div className="ml-16">
                <h3 className="text-xl font-medium text-gray-900">Preview & Customize</h3>
                <p className="mt-2 text-base text-gray-500">
                  Review your generated portfolio, make any necessary edits, and then download or publish your professional website.
                </p>
              </div>
              <div className="mt-6 ml-16">
                <div className="p-4 bg-white rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed process explanation section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Detailed Process</h3>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className="bg-primary text-white p-4">
              <h4 className="text-xl font-medium">Step 1: Upload Your Resume</h4>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p>Our user-friendly upload interface allows you to easily submit your resume for processing. We support multiple file formats to accommodate different resume types:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>PDF documents</strong> - Perfect for preserving formatting and layout</li>
                  <li><strong>JPG/JPEG images</strong> - If you have a scan or photo of your resume</li>
                  <li><strong>PNG images</strong> - For high-quality digital images of your resume</li>
                </ul>
                <p className="mt-4">The maximum file size is 10MB, which is more than sufficient for most resumes. Our system is designed to handle various resume layouts and styles, from traditional to modern formats.</p>
                <p className="mt-4">Simply drag and drop your file or click to browse and select from your device. Once selected, you'll see a preview of your file and can proceed to the next step.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className="bg-primary text-white p-4">
              <h4 className="text-xl font-medium">Step 2: Automated Processing</h4>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p>Once your resume is uploaded, our advanced processing engine goes to work. Here's what happens behind the scenes:</p>
                <ol className="list-decimal pl-6 mt-4">
                  <li><strong>Text Extraction</strong> - For PDFs, we use specialized parsing algorithms to extract text while maintaining structural information. For images, we employ optical character recognition (OCR) to convert the visual text into machine-readable data.</li>
                  <li><strong>Data Classification</strong> - Our system identifies and categorizes different sections of your resume, such as personal information, work experience, education, skills, and projects.</li>
                  <li><strong>Information Structuring</strong> - The extracted data is organized into a structured format that can be used to build your portfolio website.</li>
                </ol>
                <p className="mt-4">This entire process typically takes less than a minute, even for complex resumes. You'll see a progress indicator while the system works, and once complete, you'll be automatically taken to the preview stage.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white p-4">
              <h4 className="text-xl font-medium">Step 3: Preview & Customize</h4>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                <p>The final step puts you in control of your portfolio website:</p>
                <ul className="list-disc pl-6 mt-4">
                  <li><strong>Review Generated Content</strong> - See exactly how your information will be displayed on your portfolio website, organized into professional sections.</li>
                  <li><strong>Make Edits</strong> - If needed, you can adjust any details, add missing information, or enhance descriptions. Our intuitive interface makes editing simple and straightforward.</li>
                  <li><strong>Download or Share</strong> - Once you're satisfied with your portfolio, you can download it or receive a shareable link that you can include in job applications, your email signature, or social media profiles.</li>
                </ul>
                <p className="mt-4">Your portfolio website is professionally designed and fully responsive, ensuring it looks great on all devices, from desktops to smartphones. The layout emphasizes your skills and experience, making it easy for potential employers to see your qualifications at a glance.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h3>
          
          <div className="bg-white rounded-lg shadow-md">
            <div className="divide-y divide-gray-200">
              <div className="p-6">
                <h4 className="text-lg font-medium text-gray-900">Is my resume data secure?</h4>
                <p className="mt-2 text-gray-600">Yes, we take data security seriously. Your resume information is processed securely and is not shared with third parties. The data is used solely for generating your portfolio website.</p>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-medium text-gray-900">What if my resume has a unique format?</h4>
                <p className="mt-2 text-gray-600">Our system is designed to handle various resume formats. However, if your resume has a highly unique structure, you may need to make some minor adjustments in the preview stage. The system does its best to extract and organize information logically.</p>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-medium text-gray-900">Can I update my portfolio later?</h4>
                <p className="mt-2 text-gray-600">Yes, you can return to your portfolio at any time to make updates. Just save your portfolio ID or URL for future reference.</p>
              </div>
              
              <div className="p-6">
                <h4 className="text-lg font-medium text-gray-900">What file formats work best?</h4>
                <p className="mt-2 text-gray-600">For the best results, we recommend uploading a PDF file with selectable text. However, our system can also process JPG and PNG images using OCR technology.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/">
            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-700">
              Try It Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}