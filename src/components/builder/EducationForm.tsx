"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function EducationForm({
  data,
  onUpdate,
  onNext,
  onPrev,
}: EducationFormProps) {
  const [educations, setEducations] = useState<Education[]>(
    data.length > 0
      ? data
      : [
          {
            id: "1",
            degree: "",
            school: "",
            location: "",
            startDate: "",
            endDate: "",
            gpa: "",
          },
        ]
  );

  useEffect(() => {
    onUpdate(educations);
  }, [educations]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setEducations([...educations, newEducation]);
  };

  const removeEducation = (id: string) => {
    if (educations.length > 1) {
      setEducations(educations.filter((edu) => edu.id !== id));
    }
  };

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string
  ) => {
    setEducations(
      educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const isValid = educations.every(
    (edu) => edu.degree && edu.school && edu.startDate && edu.endDate
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>
          Add your educational background, starting with your highest degree.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.map((education, index) => (
          <div key={education.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">
                Education {index + 1}
              </h3>
              {educations.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree *</Label>
                <Input
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(education.id, "degree", e.target.value)
                  }
                  placeholder="Bachelor of Science in Computer Science"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>School/University *</Label>
                <Input
                  value={education.school}
                  onChange={(e) =>
                    updateEducation(education.id, "school", e.target.value)
                  }
                  placeholder="University of Technology"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={education.location}
                onChange={(e) =>
                  updateEducation(education.id, "location", e.target.value)
                }
                placeholder="Boston, MA"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={education.startDate}
                  onChange={(e) =>
                    updateEducation(education.id, "startDate", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Input
                  type="month"
                  value={education.endDate}
                  onChange={(e) =>
                    updateEducation(education.id, "endDate", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>GPA (Optional)</Label>
                <Input
                  value={education.gpa}
                  onChange={(e) =>
                    updateEducation(education.id, "gpa", e.target.value)
                  }
                  placeholder="3.8"
                />
              </div>
            </div>
          </div>
        ))}

        <Button variant="outline" onClick={addEducation} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Another Education
        </Button>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={!isValid} className="hover-lift">
            Next: Skills
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
