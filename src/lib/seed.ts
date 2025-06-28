import connectDB from './mongodb';
import Template from '@/models/Template';

const defaultTemplates = [
  {
    name: 'Modern Professional',
    description: 'A clean, modern template perfect for tech and business professionals',
    category: 'modern',
    previewImage: '/templates/modern-professional.png',
    htmlTemplate: `
      <div class="resume-container">
        <header class="header">
          <h1>{{personalInfo.firstName}} {{personalInfo.lastName}}</h1>
          <div class="contact-info">
            <p>{{personalInfo.email}} | {{personalInfo.phone}}</p>
            <p>{{personalInfo.address}}, {{personalInfo.city}}, {{personalInfo.state}} {{personalInfo.zipCode}}</p>
            {{#if personalInfo.linkedIn}}<p>LinkedIn: {{personalInfo.linkedIn}}</p>{{/if}}
            {{#if personalInfo.website}}<p>Website: {{personalInfo.website}}</p>{{/if}}
          </div>
        </header>
        
        <section class="summary">
          <h2>Professional Summary</h2>
          <p>{{personalInfo.summary}}</p>
        </section>
        
        <section class="experience">
          <h2>Professional Experience</h2>
          {{#each experience}}
          <div class="job">
            <h3>{{position}} - {{company}}</h3>
            <p class="date">{{formatDateRange startDate endDate current}}</p>
            <p>{{description}}</p>
            <ul>
              {{#each bulletPoints}}
              <li>{{this}}</li>
              {{/each}}
            </ul>
          </div>
          {{/each}}
        </section>
        
        <section class="education">
          <h2>Education</h2>
          {{#each education}}
          <div class="degree">
            <h3>{{degree}} in {{fieldOfStudy}}</h3>
            <p>{{institution}} - {{formatDateRange startDate endDate}}</p>
            {{#if gpa}}<p>GPA: {{gpa}}</p>{{/if}}
          </div>
          {{/each}}
        </section>
        
        <section class="skills">
          <h2>Skills</h2>
          {{#each skills}}
          <div class="skill-category">
            <h3>{{category}}</h3>
            <p>{{join skills ", "}}</p>
          </div>
          {{/each}}
        </section>
      </div>
    `,
    cssStyles: `
      .resume-container {
        font-family: 'Arial', sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        line-height: 1.6;
        color: #333;
      }
      
      .header {
        text-align: center;
        border-bottom: 2px solid #2563eb;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }
      
      .header h1 {
        font-size: 2.5em;
        margin: 0;
        color: #2563eb;
      }
      
      .contact-info p {
        margin: 5px 0;
        color: #666;
      }
      
      section {
        margin-bottom: 30px;
      }
      
      h2 {
        color: #2563eb;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 5px;
        margin-bottom: 15px;
      }
      
      .job, .degree {
        margin-bottom: 20px;
      }
      
      .job h3, .degree h3 {
        margin: 0;
        color: #1f2937;
      }
      
      .date {
        color: #6b7280;
        font-style: italic;
        margin: 5px 0;
      }
      
      ul {
        margin: 10px 0;
        padding-left: 20px;
      }
      
      li {
        margin-bottom: 5px;
      }
      
      .skill-category {
        margin-bottom: 10px;
      }
      
      .skill-category h3 {
        margin: 0;
        color: #374151;
        font-size: 1.1em;
      }
    `,
    isActive: true,
    isPremium: false,
  },
  {
    name: 'Classic Executive',
    description: 'A traditional, elegant template for senior executives and managers',
    category: 'classic',
    previewImage: '/templates/classic-executive.png',
    htmlTemplate: `
      <div class="resume-container">
        <header class="header">
          <div class="name-section">
            <h1>{{personalInfo.firstName}} {{personalInfo.lastName}}</h1>
            <p class="title">Professional Resume</p>
          </div>
          <div class="contact-section">
            <p>{{personalInfo.email}}</p>
            <p>{{personalInfo.phone}}</p>
            <p>{{personalInfo.address}}</p>
            <p>{{personalInfo.city}}, {{personalInfo.state}} {{personalInfo.zipCode}}</p>
          </div>
        </header>
        
        <section class="objective">
          <h2>Professional Summary</h2>
          <p>{{personalInfo.summary}}</p>
        </section>
        
        <section class="experience">
          <h2>Professional Experience</h2>
          {{#each experience}}
          <div class="position">
            <div class="position-header">
              <h3>{{position}}</h3>
              <span class="company">{{company}}</span>
            </div>
            <p class="dates">{{formatDateRange startDate endDate current}}</p>
            <p class="description">{{description}}</p>
            <ul class="achievements">
              {{#each bulletPoints}}
              <li>{{this}}</li>
              {{/each}}
            </ul>
          </div>
          {{/each}}
        </section>
        
        <section class="education">
          <h2>Education</h2>
          {{#each education}}
          <div class="education-item">
            <h3>{{degree}} in {{fieldOfStudy}}</h3>
            <p>{{institution}}</p>
            <p>{{formatDateRange startDate endDate}}</p>
          </div>
          {{/each}}
        </section>
        
        <section class="skills">
          <h2>Core Competencies</h2>
          {{#each skills}}
          <div class="competency-area">
            <strong>{{category}}:</strong> {{join skills ", "}}
          </div>
          {{/each}}
        </section>
      </div>
    `,
    cssStyles: `
      .resume-container {
        font-family: 'Times New Roman', serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 40px;
        line-height: 1.5;
        color: #000;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 3px solid #000;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }
      
      .name-section h1 {
        font-size: 2.2em;
        margin: 0;
        font-weight: bold;
      }
      
      .title {
        font-style: italic;
        margin: 5px 0 0 0;
      }
      
      .contact-section {
        text-align: right;
      }
      
      .contact-section p {
        margin: 2px 0;
        font-size: 0.9em;
      }
      
      h2 {
        font-size: 1.3em;
        font-weight: bold;
        margin: 25px 0 15px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      
      .position {
        margin-bottom: 25px;
      }
      
      .position-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
      
      .position h3 {
        margin: 0;
        font-weight: bold;
      }
      
      .company {
        font-style: italic;
      }
      
      .dates {
        margin: 5px 0;
        font-size: 0.9em;
      }
      
      .achievements {
        margin: 10px 0;
      }
      
      .education-item {
        margin-bottom: 15px;
      }
      
      .competency-area {
        margin-bottom: 8px;
      }
    `,
    isActive: true,
    isPremium: false,
  },
  {
    name: 'Creative Designer',
    description: 'A vibrant, creative template perfect for designers and creative professionals',
    category: 'creative',
    previewImage: '/templates/creative-designer.png',
    htmlTemplate: `
      <div class="resume-container">
        <div class="sidebar">
          <div class="profile">
            <h1>{{personalInfo.firstName}}<br>{{personalInfo.lastName}}</h1>
            <div class="contact">
              <p>{{personalInfo.email}}</p>
              <p>{{personalInfo.phone}}</p>
              <p>{{personalInfo.city}}, {{personalInfo.state}}</p>
              {{#if personalInfo.website}}<p>{{personalInfo.website}}</p>{{/if}}
            </div>
          </div>
          
          <section class="skills-sidebar">
            <h2>Skills</h2>
            {{#each skills}}
            <div class="skill-group">
              <h3>{{category}}</h3>
              {{#each skills}}
              <span class="skill-tag">{{this}}</span>
              {{/each}}
            </div>
            {{/each}}
          </section>
        </div>
        
        <div class="main-content">
          <section class="summary">
            <h2>About Me</h2>
            <p>{{personalInfo.summary}}</p>
          </section>
          
          <section class="experience">
            <h2>Experience</h2>
            {{#each experience}}
            <div class="job-item">
              <h3>{{position}}</h3>
              <h4>{{company}}</h4>
              <p class="duration">{{formatDateRange startDate endDate current}}</p>
              <p>{{description}}</p>
              <ul>
                {{#each bulletPoints}}
                <li>{{this}}</li>
                {{/each}}
              </ul>
            </div>
            {{/each}}
          </section>
          
          <section class="education">
            <h2>Education</h2>
            {{#each education}}
            <div class="edu-item">
              <h3>{{degree}}</h3>
              <p>{{institution}} | {{formatDateRange startDate endDate}}</p>
            </div>
            {{/each}}
          </section>
        </div>
      </div>
    `,
    cssStyles: `
      .resume-container {
        font-family: 'Helvetica', sans-serif;
        display: flex;
        max-width: 900px;
        margin: 0 auto;
        min-height: 100vh;
      }
      
      .sidebar {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        width: 300px;
        padding: 30px;
      }
      
      .profile h1 {
        font-size: 2em;
        margin: 0 0 20px 0;
        line-height: 1.2;
      }
      
      .contact p {
        margin: 8px 0;
        font-size: 0.9em;
      }
      
      .skills-sidebar {
        margin-top: 30px;
      }
      
      .skills-sidebar h2 {
        font-size: 1.3em;
        margin-bottom: 15px;
        color: #fff;
      }
      
      .skill-group {
        margin-bottom: 20px;
      }
      
      .skill-group h3 {
        font-size: 1em;
        margin: 0 0 10px 0;
        color: #e2e8f0;
      }
      
      .skill-tag {
        display: inline-block;
        background: rgba(255,255,255,0.2);
        padding: 4px 8px;
        margin: 2px;
        border-radius: 12px;
        font-size: 0.8em;
      }
      
      .main-content {
        flex: 1;
        padding: 30px;
        background: white;
      }
      
      .main-content h2 {
        color: #667eea;
        font-size: 1.4em;
        margin: 0 0 15px 0;
        border-bottom: 2px solid #667eea;
        padding-bottom: 5px;
      }
      
      .job-item, .edu-item {
        margin-bottom: 25px;
      }
      
      .job-item h3 {
        color: #2d3748;
        margin: 0;
        font-size: 1.2em;
      }
      
      .job-item h4 {
        color: #667eea;
        margin: 5px 0;
        font-weight: normal;
      }
      
      .duration {
        color: #718096;
        font-size: 0.9em;
        margin: 5px 0;
      }
      
      ul {
        margin: 10px 0;
        padding-left: 20px;
      }
      
      li {
        margin-bottom: 5px;
        color: #4a5568;
      }
    `,
    isActive: true,
    isPremium: true,
  }
];

export async function seedTemplates() {
  try {
    await connectDB();
    
    // Clear existing templates
    await Template.deleteMany({});
    
    // Insert default templates
    await Template.insertMany(defaultTemplates);
    
    console.log('Templates seeded successfully!');
    return { success: true, message: 'Templates seeded successfully!' };
  } catch (error) {
    console.error('Error seeding templates:', error);
    return { success: false, error: 'Failed to seed templates' };
  }
}

export async function getTemplates() {
  try {
    await connectDB();
    const templates = await Template.find({ isActive: true }).select('-htmlTemplate -cssStyles');
    return templates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return [];
  }
}
