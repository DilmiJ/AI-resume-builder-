'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Camera, Star, Search, Filter, Eye, Download } from 'lucide-react';

interface Template {
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
}

const templates: Template[] = [
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
    colors: ['#3B82F6', '#1E40AF', '#F8FAFC']
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
    colors: ['#1F2937', '#374151', '#F9FAFB']
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
    colors: ['#EC4899', '#BE185D', '#FDF2F8']
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
    colors: ['#000000', '#6B7280', '#FFFFFF']
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
    colors: ['#10B981', '#059669', '#ECFDF5']
  },
  {
    id: 'classic-2',
    name: 'Corporate Standard',
    category: 'Classic',
    description: 'Professional corporate template',
    hasPhoto: false,
    isPremium: false,
    rating: 4.4,
    downloads: 11200,
    preview: '/templates/classic-2.jpg',
    colors: ['#1E3A8A', '#3730A3', '#EFF6FF']
  },
  {
    id: 'creative-2',
    name: 'Artistic Portfolio',
    category: 'Creative',
    description: 'Creative template with photo showcase',
    hasPhoto: true,
    isPremium: true,
    rating: 4.8,
    downloads: 6750,
    preview: '/templates/creative-2.jpg',
    colors: ['#F59E0B', '#D97706', '#FFFBEB']
  },
  {
    id: 'minimal-2',
    name: 'Simple Elegance',
    category: 'Minimal',
    description: 'Elegant minimal design without photo',
    hasPhoto: false,
    isPremium: false,
    rating: 4.6,
    downloads: 14300,
    preview: '/templates/minimal-2.jpg',
    colors: ['#4B5563', '#6B7280', '#F9FAFB']
  },
  {
    id: 'modern-3',
    name: 'Digital Professional',
    category: 'Modern',
    description: 'Modern digital-age professional template',
    hasPhoto: true,
    isPremium: false,
    rating: 4.7,
    downloads: 10500,
    preview: '/templates/modern-3.jpg',
    colors: ['#8B5CF6', '#7C3AED', '#F5F3FF']
  },
  {
    id: 'classic-3',
    name: 'Traditional Business',
    category: 'Classic',
    description: 'Time-tested business template',
    hasPhoto: false,
    isPremium: false,
    rating: 4.3,
    downloads: 13600,
    preview: '/templates/classic-3.jpg',
    colors: ['#374151', '#4B5563', '#F3F4F6']
  },
  {
    id: 'creative-3',
    name: 'Vibrant Creative',
    category: 'Creative',
    description: 'Colorful creative template with photo',
    hasPhoto: true,
    isPremium: true,
    rating: 4.9,
    downloads: 5420,
    preview: '/templates/creative-3.jpg',
    colors: ['#EF4444', '#DC2626', '#FEF2F2']
  },
  {
    id: 'minimal-3',
    name: 'Pure Minimal',
    category: 'Minimal',
    description: 'Ultra-minimal design approach',
    hasPhoto: false,
    isPremium: false,
    rating: 4.5,
    downloads: 16800,
    preview: '/templates/minimal-3.jpg',
    colors: ['#1F2937', '#9CA3AF', '#FFFFFF']
  },
  {
    id: 'modern-4',
    name: 'Startup Professional',
    category: 'Modern',
    description: 'Perfect for startup professionals',
    hasPhoto: true,
    isPremium: false,
    rating: 4.6,
    downloads: 8900,
    preview: '/templates/modern-4.jpg',
    colors: ['#06B6D4', '#0891B2', '#ECFEFF']
  },
  {
    id: 'classic-4',
    name: 'Academic Scholar',
    category: 'Classic',
    description: 'Ideal for academic positions',
    hasPhoto: false,
    isPremium: false,
    rating: 4.4,
    downloads: 7650,
    preview: '/templates/classic-4.jpg',
    colors: ['#7C2D12', '#92400E', '#FEF7ED']
  },
  {
    id: 'creative-4',
    name: 'Designer Showcase',
    category: 'Creative',
    description: 'Showcase your creative work with photo',
    hasPhoto: true,
    isPremium: true,
    rating: 4.8,
    downloads: 4320,
    preview: '/templates/creative-4.jpg',
    colors: ['#DB2777', '#BE185D', '#FDF2F8']
  },
  {
    id: 'minimal-4',
    name: 'Clean Professional',
    category: 'Minimal',
    description: 'Clean and professional minimal design',
    hasPhoto: false,
    isPremium: false,
    rating: 4.7,
    downloads: 12900,
    preview: '/templates/minimal-4.jpg',
    colors: ['#0F172A', '#64748B', '#F8FAFC']
  },
  {
    id: 'modern-5',
    name: 'Future Forward',
    category: 'Modern',
    description: 'Forward-thinking modern design',
    hasPhoto: true,
    isPremium: true,
    rating: 4.9,
    downloads: 6780,
    preview: '/templates/modern-5.jpg',
    colors: ['#6366F1', '#4F46E5', '#EEF2FF']
  },
  {
    id: 'classic-5',
    name: 'Legal Professional',
    category: 'Classic',
    description: 'Professional template for legal careers',
    hasPhoto: false,
    isPremium: false,
    rating: 4.5,
    downloads: 9200,
    preview: '/templates/classic-5.jpg',
    colors: ['#1E40AF', '#1D4ED8', '#DBEAFE']
  },
  {
    id: 'creative-5',
    name: 'Media Creative',
    category: 'Creative',
    description: 'Perfect for media professionals',
    hasPhoto: true,
    isPremium: true,
    rating: 4.7,
    downloads: 3890,
    preview: '/templates/creative-5.jpg',
    colors: ['#059669', '#047857', '#ECFDF5']
  },
  {
    id: 'minimal-5',
    name: 'Scandinavian Style',
    category: 'Minimal',
    description: 'Scandinavian-inspired minimal design',
    hasPhoto: false,
    isPremium: false,
    rating: 4.6,
    downloads: 11400,
    preview: '/templates/minimal-5.jpg',
    colors: ['#475569', '#64748B', '#F1F5F9']
  },
  {
    id: 'modern-6',
    name: 'Data Scientist',
    category: 'Modern',
    description: 'Modern template for data professionals',
    hasPhoto: true,
    isPremium: false,
    rating: 4.8,
    downloads: 7560,
    preview: '/templates/modern-6.jpg',
    colors: ['#7C3AED', '#6D28D9', '#F5F3FF']
  },
  {
    id: 'classic-6',
    name: 'Finance Executive',
    category: 'Classic',
    description: 'Executive template for finance sector',
    hasPhoto: false,
    isPremium: false,
    rating: 4.4,
    downloads: 8750,
    preview: '/templates/classic-6.jpg',
    colors: ['#1F2937', '#374151', '#F9FAFB']
  },
  {
    id: 'creative-6',
    name: 'Brand Designer',
    category: 'Creative',
    description: 'Creative branding template with photo',
    hasPhoto: true,
    isPremium: true,
    rating: 4.9,
    downloads: 2980,
    preview: '/templates/creative-6.jpg',
    colors: ['#F97316', '#EA580C', '#FFF7ED']
  },
  {
    id: 'minimal-6',
    name: 'Swiss Minimal',
    category: 'Minimal',
    description: 'Swiss design inspired minimal template',
    hasPhoto: false,
    isPremium: false,
    rating: 4.7,
    downloads: 13200,
    preview: '/templates/minimal-6.jpg',
    colors: ['#000000', '#737373', '#FFFFFF']
  },
  {
    id: 'modern-7',
    name: 'Product Manager',
    category: 'Modern',
    description: 'Tailored for product management roles',
    hasPhoto: true,
    isPremium: false,
    rating: 4.6,
    downloads: 6890,
    preview: '/templates/modern-7.jpg',
    colors: ['#14B8A6', '#0D9488', '#F0FDFA']
  },
  {
    id: 'classic-7',
    name: 'Healthcare Professional',
    category: 'Classic',
    description: 'Professional template for healthcare',
    hasPhoto: false,
    isPremium: false,
    rating: 4.5,
    downloads: 10300,
    preview: '/templates/classic-7.jpg',
    colors: ['#DC2626', '#B91C1C', '#FEF2F2']
  },
  {
    id: 'creative-7',
    name: 'UX Designer',
    category: 'Creative',
    description: 'UX/UI designer focused template',
    hasPhoto: true,
    isPremium: true,
    rating: 4.8,
    downloads: 4560,
    preview: '/templates/creative-7.jpg',
    colors: ['#8B5CF6', '#7C3AED', '#F5F3FF']
  },
  {
    id: 'minimal-7',
    name: 'Architect Style',
    category: 'Minimal',
    description: 'Architectural inspired minimal design',
    hasPhoto: false,
    isPremium: false,
    rating: 4.6,
    downloads: 9870,
    preview: '/templates/minimal-7.jpg',
    colors: ['#0F172A', '#475569', '#F8FAFC']
  },
  {
    id: 'modern-8',
    name: 'Marketing Pro',
    category: 'Modern',
    description: 'Modern marketing professional template',
    hasPhoto: true,
    isPremium: false,
    rating: 4.7,
    downloads: 8120,
    preview: '/templates/modern-8.jpg',
    colors: ['#EC4899', '#DB2777', '#FDF2F8']
  },
  {
    id: 'classic-8',
    name: 'Engineering Standard',
    category: 'Classic',
    description: 'Standard template for engineers',
    hasPhoto: false,
    isPremium: false,
    rating: 4.3,
    downloads: 11800,
    preview: '/templates/classic-8.jpg',
    colors: ['#1E40AF', '#1D4ED8', '#DBEAFE']
  }
];

const categories = ['All', 'Modern', 'Classic', 'Creative', 'Minimal'];

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPhotoOnly, setShowPhotoOnly] = useState(false);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhoto = !showPhotoOnly || template.hasPhoto;
    const matchesPremium = !showPremiumOnly || template.isPremium;
    
    return matchesCategory && matchesSearch && matchesPhoto && matchesPremium;
  });

  const useTemplate = (templateId: string) => {
    router.push(`/builder?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🎨</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Browse Templates</h1>
                <p className="text-gray-600">Explore our collection of professional resume templates</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showPhotoOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPhotoOnly(!showPhotoOnly)}
              >
                <Camera className="w-4 h-4 mr-2" />
                With Photo
              </Button>
              <Button
                variant={showPremiumOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              >
                <Star className="w-4 h-4 mr-2" />
                Premium
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover-lift cursor-pointer group">
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-4 mx-auto">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto"></div>
                      <div className="h-2 bg-gray-300 rounded w-1/2 mx-auto"></div>
                      <div className="h-2 bg-gray-300 rounded w-2/3 mx-auto"></div>
                    </div>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" onClick={() => useTemplate(template.id)}>
                      Use Template
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {template.hasPhoto && (
                    <Badge variant="secondary" className="text-xs">
                      <Camera className="w-3 h-3 mr-1" />
                      Photo
                    </Badge>
                  )}
                  {template.isPremium && (
                    <Badge className="text-xs bg-yellow-500">
                      <Star className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">{template.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {template.rating}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{template.description}</p>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {template.category}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {template.downloads.toLocaleString()} downloads
                  </span>
                </div>

                {/* Color palette */}
                <div className="flex gap-1 mt-3">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
