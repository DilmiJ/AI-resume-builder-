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
  layout: 'single-column' | 'two-column' | 'three-column';
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
  return templates.find(template => template.id === id);
};

export const templates: Template[] = [
  {
    id: 'modern-1',
    name: 'Modern Professional',
    category: 'Modern',
    description: 'Clean and modern design perfect for tech professionals',
    hasPhoto: true,
    isPremium: false,
    rating: 4.8,
    downloads: 15420,
    preview: '/templates/modern-1.jpg',
    colors: ['#3B82F6', '#1E40AF', '#F8FAFC'],
    layout: 'two-column',
    sections: ['header', 'summary', 'experience', 'education', 'skills']
  },
  {
    id: 'classic-1',
    name: 'Classic Executive',
    category: 'Classic',
    description: 'Traditional layout ideal for executive positions',
    hasPhoto: false,
    isPremium: false,
    rating: 4.6,
    downloads: 12350,
    preview: '/templates/classic-1.jpg',
    colors: ['#1F2937', '#374151', '#F9FAFB'],
    layout: 'single-column',
    sections: ['header', 'summary', 'experience', 'education', 'skills']
  },
  {
    id: 'creative-1',
    name: 'Creative Designer',
    category: 'Creative',
    description: 'Bold and creative design for designers and artists',
    hasPhoto: true,
    isPremium: true,
    rating: 4.9,
    downloads: 8920,
    preview: '/templates/creative-1.jpg',
    colors: ['#EC4899', '#BE185D', '#FDF2F8'],
    layout: 'two-column',
    sections: ['header', 'summary', 'experience', 'education', 'skills', 'portfolio']
  },
  {
    id: 'minimal-1',
    name: 'Minimal Clean',
    category: 'Minimal',
    description: 'Simple and clean layout focusing on content',
    hasPhoto: false,
    isPremium: false,
    rating: 4.7,
    downloads: 18750,
    preview: '/templates/minimal-1.jpg',
    colors: ['#000000', '#6B7280', '#FFFFFF'],
    layout: 'single-column',
    sections: ['header', 'summary', 'experience', 'education', 'skills']
  },
  {
    id: 'modern-2',
    name: 'Tech Innovator',
    category: 'Modern',
    description: 'Modern tech-focused design with photo section',
    hasPhoto: true,
    isPremium: false,
    rating: 4.5,
    downloads: 9840,
    preview: '/templates/modern-2.jpg',
    colors: ['#10B981', '#059669', '#ECFDF5'],
    layout: 'two-column',
    sections: ['header', 'summary', 'experience', 'skills', 'education', 'projects']
  }
  // ... more templates would be defined here
];

export const renderTemplate = (template: Template, data: ResumeData): string => {
  switch (template.id) {
    case 'modern-1':
      return renderModernTemplate1(template, data);
    case 'classic-1':
      return renderClassicTemplate1(template, data);
    case 'creative-1':
      return renderCreativeTemplate1(template, data);
    case 'minimal-1':
      return renderMinimalTemplate1(template, data);
    default:
      return renderDefaultTemplate(template, data);
  }
};

const renderModernTemplate1 = (template: Template, data: ResumeData): string => {
  return `
    <div class="bg-white p-8 max-w-4xl mx-auto" style="font-family: 'Inter', sans-serif; color: ${template.colors[1]};">
      <!-- Header with Photo -->
      <div class="flex items-start gap-6 mb-8 pb-6 border-b-2" style="border-color: ${template.colors[0]};">
        ${template.hasPhoto && data.personalInfo.photo ? `
          <div class="w-24 h-24 rounded-full overflow-hidden border-4" style="border-color: ${template.colors[0]};">
            <img src="${data.personalInfo.photo}" alt="Profile" class="w-full h-full object-cover" />
          </div>
        ` : ''}
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-2" style="color: ${template.colors[1]};">
            ${data.personalInfo.firstName} ${data.personalInfo.lastName}
          </h1>
          <div class="text-lg text-gray-600 space-y-1">
            <div>${data.personalInfo.email} | ${data.personalInfo.phone}</div>
            ${data.personalInfo.address ? `<div>${data.personalInfo.address}</div>` : ''}
          </div>
        </div>
      </div>

      <!-- Summary -->
      ${data.personalInfo.summary ? `
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-4" style="color: ${template.colors[0]};">Professional Summary</h2>
          <p class="text-gray-700 leading-relaxed">${data.personalInfo.summary}</p>
        </div>
      ` : ''}

      <!-- Two Column Layout -->
      <div class="grid grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="col-span-2 space-y-8">
          <!-- Experience -->
          ${data.experience.length > 0 ? `
            <div>
              <h2 class="text-2xl font-bold mb-6" style="color: ${template.colors[0]};">Professional Experience</h2>
              <div class="space-y-6">
                ${data.experience.map(exp => `
                  <div class="border-l-4 pl-4" style="border-color: ${template.colors[0]};">
                    <div class="flex justify-between items-start mb-2">
                      <div>
                        <h3 class="text-xl font-semibold" style="color: ${template.colors[1]};">${exp.title}</h3>
                        <p class="text-lg font-medium text-gray-700">${exp.company}</p>
                      </div>
                      <div class="text-right text-sm text-gray-600">
                        <p>${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                        ${exp.location ? `<p>${exp.location}</p>` : ''}
                      </div>
                    </div>
                    ${exp.description ? `<p class="text-gray-700 leading-relaxed">${exp.description}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Education -->
          ${data.education.length > 0 ? `
            <div>
              <h2 class="text-xl font-bold mb-4" style="color: ${template.colors[0]};">Education</h2>
              <div class="space-y-4">
                ${data.education.map(edu => `
                  <div>
                    <h3 class="font-semibold" style="color: ${template.colors[1]};">${edu.degree}</h3>
                    <p class="text-gray-700">${edu.school}</p>
                    <p class="text-sm text-gray-600">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
                    ${edu.gpa ? `<p class="text-sm text-gray-600">GPA: ${edu.gpa}</p>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Skills -->
          ${data.skills.length > 0 ? `
            <div>
              <h2 class="text-xl font-bold mb-4" style="color: ${template.colors[0]};">Skills</h2>
              <div class="space-y-3">
                ${data.skills.map(skill => `
                  <div>
                    <div class="flex justify-between mb-1">
                      <span class="font-medium" style="color: ${template.colors[1]};">${skill.name}</span>
                      <span class="text-sm text-gray-600 capitalize">${skill.level}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="h-2 rounded-full" style="background-color: ${template.colors[0]}; width: ${getSkillWidth(skill.level)}%;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
};

const renderClassicTemplate1 = (template: Template, data: ResumeData): string => {
  return `
    <div class="bg-white p-8 max-w-4xl mx-auto" style="font-family: 'Times New Roman', serif; color: ${template.colors[1]};">
      <!-- Header -->
      <div class="text-center mb-8 pb-6 border-b-2" style="border-color: ${template.colors[1]};">
        <h1 class="text-4xl font-bold mb-4" style="color: ${template.colors[1]};">
          ${data.personalInfo.firstName} ${data.personalInfo.lastName}
        </h1>
        <div class="text-lg space-y-1">
          <div>${data.personalInfo.email} | ${data.personalInfo.phone}</div>
          ${data.personalInfo.address ? `<div>${data.personalInfo.address}</div>` : ''}
        </div>
      </div>

      <!-- Summary -->
      ${data.personalInfo.summary ? `
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-4 text-center" style="color: ${template.colors[1]};">PROFESSIONAL SUMMARY</h2>
          <p class="text-center text-gray-700 leading-relaxed">${data.personalInfo.summary}</p>
        </div>
      ` : ''}

      <!-- Experience -->
      ${data.experience.length > 0 ? `
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-6 text-center" style="color: ${template.colors[1]};">PROFESSIONAL EXPERIENCE</h2>
          <div class="space-y-6">
            ${data.experience.map(exp => `
              <div class="text-center">
                <h3 class="text-xl font-bold" style="color: ${template.colors[1]};">${exp.title}</h3>
                <p class="text-lg font-semibold">${exp.company}</p>
                <p class="text-sm text-gray-600 mb-3">
                  ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                  ${exp.location ? ` | ${exp.location}` : ''}
                </p>
                ${exp.description ? `<p class="text-gray-700 leading-relaxed">${exp.description}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Education -->
      ${data.education.length > 0 ? `
        <div class="mb-8">
          <h2 class="text-2xl font-bold mb-6 text-center" style="color: ${template.colors[1]};">EDUCATION</h2>
          <div class="space-y-4">
            ${data.education.map(edu => `
              <div class="text-center">
                <h3 class="text-lg font-bold" style="color: ${template.colors[1]};">${edu.degree}</h3>
                <p class="font-semibold">${edu.school}</p>
                <p class="text-sm text-gray-600">
                  ${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
                  ${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Skills -->
      ${data.skills.length > 0 ? `
        <div>
          <h2 class="text-2xl font-bold mb-6 text-center" style="color: ${template.colors[1]};">SKILLS</h2>
          <div class="text-center">
            <p class="text-gray-700">${data.skills.map(skill => skill.name).join(' • ')}</p>
          </div>
        </div>
      ` : ''}
    </div>
  `;
};

const renderCreativeTemplate1 = (template: Template, data: ResumeData): string => {
  // Creative template with photo and colorful design
  return renderModernTemplate1(template, data); // Simplified for now
};

const renderMinimalTemplate1 = (template: Template, data: ResumeData): string => {
  // Minimal template without photo
  return renderClassicTemplate1(template, data); // Simplified for now
};

const renderDefaultTemplate = (template: Template, data: ResumeData): string => {
  return renderModernTemplate1(template, data);
};

const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString + '-01');
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

const getSkillWidth = (level: string): number => {
  switch (level.toLowerCase()) {
    case 'beginner': return 25;
    case 'intermediate': return 50;
    case 'advanced': return 75;
    case 'expert': return 100;
    default: return 50;
  }
};
