export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  hasPhoto: boolean;
  isPremium: boolean;
  rating: number;
  downloads: number;
  preview: string;
  colors: string[];
  layout: "single-column" | "two-column" | "three-column";
  sections: string[];
}

export interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    photo?: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
}

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};

export const templates: Template[] = [];

export const renderTemplate = (
  template: Template,
  data: ResumeData
): string => {
  // Since there are no templates, return a basic CV layout
  return `
    <div class="bg-white p-8 max-w-4xl mx-auto" style="font-family: 'Arial', sans-serif; color: #1F2937;">
      <!-- Header -->
      <div class="mb-8 pb-6 border-b-2 border-gray-300">
        <h1 class="text-4xl font-bold mb-2 text-gray-900">
          ${data.personalInfo.firstName.toUpperCase()} ${data.personalInfo.lastName.toUpperCase()}
        </h1>
        <div class="text-sm text-gray-600 space-y-1">
          <div>Phone: ${data.personalInfo.phone}</div>
          <div>Email: ${data.personalInfo.email}</div>
          ${data.personalInfo.address ? `<div>Address: ${data.personalInfo.address}</div>` : ''}
        </div>
      </div>

      <!-- Summary -->
      ${data.personalInfo.summary ? `
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4 uppercase text-gray-800">Summary</h2>
          <p class="text-gray-700 leading-relaxed">${data.personalInfo.summary}</p>
        </div>
      ` : ''}

      <!-- Work Experience -->
      ${data.experience.length > 0 ? `
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4 uppercase text-gray-800">Work Experience</h2>
          ${data.experience.map(exp => `
            <div class="mb-6">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">${exp.title}</h3>
                  <p class="text-gray-600">${exp.company}</p>
                </div>
                <div class="text-right text-sm text-gray-500">
                  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                </div>
              </div>
              <p class="text-gray-700 text-sm">${exp.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Education -->
      ${data.education.length > 0 ? `
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4 uppercase text-gray-800">Education</h2>
          ${data.education.map(edu => `
            <div class="mb-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-semibold text-gray-900">${edu.degree}</h3>
                  <p class="text-gray-600">${edu.school}</p>
                </div>
                <div class="text-sm text-gray-500">
                  ${edu.startDate} - ${edu.endDate}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Skills -->
      ${data.skills.length > 0 ? `
        <div>
          <h2 class="text-xl font-bold mb-4 uppercase text-gray-800">Skills</h2>
          <div class="flex flex-wrap gap-2">
            ${data.skills.map(skill => `
              <span class="px-3 py-1 text-sm rounded bg-gray-200 text-gray-800">${skill.name}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
};
