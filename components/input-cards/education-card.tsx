"use client";

import { Education, useEducationStore } from "@/hooks/useEducation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { X } from "lucide-react";

interface EducationCardProps {
  education: Education;
}

const EducationCard = ({ education }: EducationCardProps) => {
  const { updateEducation, addResponsibility } = useEducationStore((state) => ({
    updateEducation: state.updateEducation,
    addResponsibility: state.addResponsibility,
  }));
  const educationId = education.id;

  const handleBachelorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (educationId) {
      updateEducation(educationId, { bachelor: e.target.value });
    }
  };

  const handleSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (educationId) {
      updateEducation(educationId, { school: e.target.value });
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (educationId) {
      updateEducation(educationId, { location: e.target.value });
    }
  };

  const handleFromDateChange = (date: Date | undefined) => {
    if (educationId) {
      updateEducation(educationId, { from: date });
    }
  };

  const handleToDateChange = (date: Date | undefined) => {
    if (educationId) {
      updateEducation(educationId, { to: date });
    }
  };

  const handleAddResponsibility = () => {
    if (educationId) {
      addResponsibility(educationId, "");
    }
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    if (educationId) {
      updateEducation(educationId, {
        responsibilities: (education?.responsibilities || []).map((resp, i) =>
          i === index ? value : resp
        ),
      });
    }
  };

  const handleResponsibilityRemove = (index: number) => {
    if (educationId) {
      updateEducation(educationId, {
        responsibilities: (education?.responsibilities || []).filter(
          (_, i) => i !== index
        ),
      });
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md my-3">
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Bachelor"
          value={education?.bachelor || ""}
          onChange={handleBachelorChange}
        />
        <Input
          type="text"
          placeholder="School"
          value={education?.school || ""}
          onChange={handleSchoolChange}
        />
        <Input
          type="text"
          placeholder="Location"
          value={education?.location || ""}
          onChange={handleLocationChange}
        />
        <DatePicker
          label="From"
          selectedDate={education?.from}
          onDateChange={handleFromDateChange}
        />
        <DatePicker
          label="To"
          selectedDate={education?.to}
          onDateChange={handleToDateChange}
        />

        <div>
          <h3 className="text-lg font-medium mb-2">Responsibilities</h3>
          {(education?.responsibilities || []).map((resp, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                placeholder="Responsibility"
                value={resp}
                onChange={(e) =>
                  handleResponsibilityChange(index, e.target.value)
                }
                className="flex-1"
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleResponsibilityRemove(index)}
              >
                <X size={21} />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddResponsibility}
            className="mt-2"
          >
            Add Responsibility
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
