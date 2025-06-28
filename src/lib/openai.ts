// OpenAI API integration for AI-powered content suggestions

export interface AIContentRequest {
  type: 'bullet_points' | 'summary' | 'job_description' | 'skills_optimization';
  context: {
    position?: string;
    company?: string;
    industry?: string;
    experience?: string;
    skills?: string[];
    jobDescription?: string;
  };
  existingContent?: string;
}

export interface AIContentResponse {
  suggestions: string[];
  optimizedContent?: string;
  confidence: number;
}

class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. AI features will be disabled.');
    }
  }

  async generateContent(request: AIContentRequest): Promise<AIContentResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      const prompt = this.buildPrompt(request);
      
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume writer and career coach. Provide helpful, specific, and actionable suggestions for resume content.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content || '';
      
      return this.parseResponse(content, request.type);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate AI content suggestions');
    }
  }

  private buildPrompt(request: AIContentRequest): string {
    const { type, context, existingContent } = request;

    switch (type) {
      case 'bullet_points':
        return `Generate 3-5 professional bullet points for a ${context.position} role at ${context.company}. 
                Focus on achievements, quantifiable results, and relevant skills. 
                Industry: ${context.industry}
                Experience level: ${context.experience}
                ${existingContent ? `Improve these existing bullet points: ${existingContent}` : ''}`;

      case 'summary':
        return `Write a compelling professional summary for a ${context.position} with ${context.experience} experience in ${context.industry}. 
                Skills: ${context.skills?.join(', ')}
                Keep it concise (2-3 sentences) and highlight key strengths.
                ${existingContent ? `Improve this existing summary: ${existingContent}` : ''}`;

      case 'job_description':
        return `Analyze this job description and suggest how to optimize a resume for this role:
                ${context.jobDescription}
                Provide specific keywords and skills to emphasize.`;

      case 'skills_optimization':
        return `Suggest relevant technical and soft skills for a ${context.position} role in ${context.industry}.
                Current skills: ${context.skills?.join(', ')}
                Recommend additional skills that would strengthen the profile.`;

      default:
        return 'Please provide resume writing assistance.';
    }
  }

  private parseResponse(content: string, type: string): AIContentResponse {
    const lines = content.split('\n').filter(line => line.trim());
    
    if (type === 'bullet_points') {
      const suggestions = lines
        .filter(line => line.includes('•') || line.includes('-') || line.includes('*'))
        .map(line => line.replace(/^[•\-*]\s*/, '').trim())
        .filter(line => line.length > 0);
      
      return {
        suggestions,
        confidence: 0.8,
      };
    }

    if (type === 'summary') {
      return {
        suggestions: [content.trim()],
        optimizedContent: content.trim(),
        confidence: 0.85,
      };
    }

    return {
      suggestions: lines.filter(line => line.length > 10),
      confidence: 0.75,
    };
  }

  async optimizeForJob(resumeContent: string, jobDescription: string): Promise<string[]> {
    const request: AIContentRequest = {
      type: 'job_description',
      context: {
        jobDescription,
      },
      existingContent: resumeContent,
    };

    const response = await this.generateContent(request);
    return response.suggestions;
  }
}

export const openAIService = new OpenAIService();
