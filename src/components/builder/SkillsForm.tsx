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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface SkillsFormProps {
  data: Skill[];
  onUpdate: (data: Skill[]) => void;
  onNext: () => void;
  onPrev: () => void;
}

const skillLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const commonSkills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "HTML/CSS",
  "Java",
  "C++",
  "SQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Git",
  "Agile",
  "Project Management",
  "Communication",
  "Leadership",
  "Problem Solving",
];

export default function SkillsForm({
  data,
  onUpdate,
  onNext,
  onPrev,
}: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>(
    data.length > 0
      ? data
      : [
          {
            id: "1",
            name: "",
            level: "intermediate",
          },
        ]
  );

  useEffect(() => {
    onUpdate(skills);
  }, [skills]);

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "intermediate",
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(skills.filter((skill) => skill.id !== id));
    }
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    setSkills(
      skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  const addCommonSkill = (skillName: string) => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: skillName,
      level: "intermediate",
    };
    setSkills([...skills, newSkill]);
  };

  const isValid = skills.every((skill) => skill.name.trim() !== "");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>
          Add your technical and soft skills. Include programming languages,
          tools, and other relevant abilities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Common Skills Quick Add */}
        <div className="space-y-2">
          <Label>Quick Add Common Skills</Label>
          <div className="flex flex-wrap gap-2">
            {commonSkills.map((skill) => (
              <Button
                key={skill}
                variant="outline"
                size="sm"
                onClick={() => addCommonSkill(skill)}
                className="text-xs"
                disabled={skills.some(
                  (s) => s.name.toLowerCase() === skill.toLowerCase()
                )}
              >
                + {skill}
              </Button>
            ))}
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={skill.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Skill {index + 1}</h3>
                {skills.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeSkill(skill.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Skill Name *</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) =>
                      updateSkill(skill.id, "name", e.target.value)
                    }
                    placeholder="e.g., JavaScript, Project Management"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Proficiency Level</Label>
                  <Select
                    value={skill.level}
                    onValueChange={(value) =>
                      updateSkill(skill.id, "level", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {skillLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" onClick={addSkill} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Another Skill
        </Button>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrev}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={!isValid} className="hover-lift">
            Preview Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
