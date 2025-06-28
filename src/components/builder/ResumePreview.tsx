"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Eye, Save } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Template, renderTemplate } from "@/lib/templates";

interface ResumeData {
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

interface ResumePreviewProps {
  data: ResumeData;
  onPrev: () => void;
  template?: Template | null;
}

export default function ResumePreview({
  data,
  onPrev,
  template,
}: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(
        `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const saveResume = async () => {
    // TODO: Implement save to database
    alert("Save functionality will be implemented with database integration");
  };

  return (
    <div className="space-y-6">
      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Your Resume is Ready!</CardTitle>
          <CardDescription>
            Review your resume below and download it as a PDF when you're
            satisfied.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={downloadPDF} className="hover-lift">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={saveResume}>
              <Save className="w-4 h-4 mr-2" />
              Save Resume
            </Button>
            <Button variant="outline" onClick={onPrev}>
              <Eye className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resume Preview */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          ref={resumeRef}
          className="bg-white p-8 max-w-4xl mx-auto"
          style={{ minHeight: "11in", fontFamily: "Arial, sans-serif" }}
        >
          {template ? (
            <div
              dangerouslySetInnerHTML={{
                __html: renderTemplate(template, data),
              }}
            />
          ) : (
            // Default template rendering
            <div>
              {/* Header */}
              <div className="text-center mb-6 border-b-2 border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {data.personalInfo.firstName} {data.personalInfo.lastName}
                </h1>
                <div className="text-gray-600 space-y-1">
                  <div className="flex justify-center items-center space-x-4 text-sm">
                    {data.personalInfo.email && (
                      <span>{data.personalInfo.email}</span>
                    )}
                    {data.personalInfo.phone && <span>•</span>}
                    {data.personalInfo.phone && (
                      <span>{data.personalInfo.phone}</span>
                    )}
                  </div>
                  {data.personalInfo.address && (
                    <div className="text-sm">{data.personalInfo.address}</div>
                  )}
                </div>
              </div>

              {/* Summary */}
              {data.personalInfo.summary && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {data.personalInfo.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {data.experience.length > 0 && data.experience[0].title && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                    Professional Experience
                  </h2>
                  <div className="space-y-4">
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {exp.title}
                            </h3>
                            <p className="text-gray-700">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            <p>
                              {formatDate(exp.startDate)} -{" "}
                              {exp.current
                                ? "Present"
                                : formatDate(exp.endDate)}
                            </p>
                            {exp.location && <p>{exp.location}</p>}
                          </div>
                        </div>
                        {exp.description && (
                          <p className="text-gray-700 text-sm leading-relaxed mt-2">
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {data.education.length > 0 && data.education[0].degree && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {data.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="flex justify-between items-start"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {edu.degree}
                          </h3>
                          <p className="text-gray-700">{edu.school}</p>
                          {edu.location && (
                            <p className="text-sm text-gray-600">
                              {edu.location}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <p>
                            {formatDate(edu.startDate)} -{" "}
                            {formatDate(edu.endDate)}
                          </p>
                          {edu.gpa && <p>GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {data.skills.length > 0 && data.skills[0].name && (
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                    Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {data.skills.map((skill) => (
                      <div key={skill.id} className="flex justify-between">
                        <span className="text-gray-900">{skill.name}</span>
                        <span className="text-gray-600 text-sm capitalize">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
