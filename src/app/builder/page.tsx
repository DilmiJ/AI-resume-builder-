"use client";

import { useState, useCallback, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import PersonalInfoForm from "@/components/builder/PersonalInfoForm";
import ExperienceForm from "@/components/builder/ExperienceForm";
import EducationForm from "@/components/builder/EducationForm";
import SkillsForm from "@/components/builder/SkillsForm";
import ResumePreview from "@/components/builder/ResumePreview";
import { type ResumeData } from "@/lib/templates";

const steps = [
  {
    id: "personal",
    title: "Personal Info",
    icon: User,
    description: "Basic information and summary",
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    description: "Work history and achievements",
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    description: "Educational background",
  },
  {
    id: "skills",
    title: "Skills",
    icon: Award,
    description: "Technical and soft skills",
  },
  {
    id: "preview",
    title: "Preview",
    icon: FileText,
    description: "Review and download",
  },
];

function BuilderContent() {
  const { status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  // No templates needed anymore - removed selectedTemplate state
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  });

  const updateResumeData = useCallback(
    (section: keyof ResumeData, data: ResumeData[keyof ResumeData]) => {
      setResumeData((prev: ResumeData) => ({
        ...prev,
        [section]: data,
      }));
    },
    []
  );

  // Load template from URL parameter
  // No template selection needed anymore

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "personal":
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={(data) => updateResumeData("personalInfo", data)}
            onNext={nextStep}
            hasPhotoSupport={true}
          />
        );
      case "experience":
        return (
          <ExperienceForm
            data={resumeData.experience}
            onUpdate={(data) => updateResumeData("experience", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case "education":
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={(data) => updateResumeData("education", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case "skills":
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={(data) => updateResumeData("skills", data)}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case "preview":
        return (
          <ResumePreview data={resumeData} onPrev={prevStep} template={null} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Resume Builder
              </span>
            </div>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
                <CardDescription>
                  Complete each step to create your professional resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = index < currentStep;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? "bg-blue-50 border-2 border-blue-200"
                          : isCompleted
                          ? "bg-green-50 border-2 border-green-200"
                          : "bg-gray-50 border-2 border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : isCompleted
                            ? "bg-green-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div
                          className={`font-medium ${
                            isActive ? "text-blue-900" : "text-gray-900"
                          }`}
                        >
                          {step.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {step.description}
                        </div>
                      </div>
                      {isCompleted && (
                        <ChevronRight className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}
