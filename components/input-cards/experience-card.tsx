"use client";

import { Experience, useExperienceStore } from "@/hooks/useExperience";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { X } from "lucide-react";

interface ExperienceCardProps {
  experience: Experience;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const { updateExperience, addResponsibility } = useExperienceStore(
    (state) => ({
      experiences: state.experiences,
      updateExperience: state.updateExperience,
      addResponsibility: state.addResponsibility,
    })
  );
  const experienceId = experience.id;

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (experienceId) {
      updateExperience(experienceId, { role: e.target.value });
    }
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (experienceId) {
      updateExperience(experienceId, { company: e.target.value });
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (experienceId) {
      updateExperience(experienceId, { location: e.target.value });
    }
  };

  const handleFromDateChange = (date: Date | undefined) => {
    if (experienceId) {
      updateExperience(experienceId, { from: date });
    }
  };

  const handleToDateChange = (date: Date | undefined) => {
    if (experienceId) {
      updateExperience(experienceId, { to: date });
    }
  };

  const handleAddResponsibility = () => {
    if (experienceId) {
      addResponsibility(experienceId, "");
    }
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    if (experienceId) {
      updateExperience(experienceId, {
        responsibilities: (experience?.responsibilities || []).map((resp, i) =>
          i === index ? value : resp
        ),
      });
    }
  };

  const handleResponsibilityRemove = (index: number) => {
    if (experienceId) {
      updateExperience(experienceId, {
        responsibilities: (experience?.responsibilities || []).filter(
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
          placeholder="Role"
          value={experience?.role || ""}
          onChange={handleRoleChange}
        />
        <Input
          type="text"
          placeholder="Company"
          value={experience?.company || ""}
          onChange={handleCompanyChange}
        />
        <Input
          type="text"
          placeholder="Location"
          value={experience?.location || ""}
          onChange={handleLocationChange}
        />
        <DatePicker
          label="From"
          selectedDate={experience?.from}
          onDateChange={handleFromDateChange}
        />
        <DatePicker
          label="To"
          selectedDate={experience?.to}
          onDateChange={handleToDateChange}
        />

        <div>
          <h3 className="text-lg font-medium mb-2">Responsibilities</h3>
          {(experience?.responsibilities || []).map((resp, index) => (
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

export default ExperienceCard;
