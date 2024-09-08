import { Experience } from "@/hooks/useExperience";
import { formatEndDate, formatMonthYear } from "@/lib/utils";
import { SortableItem } from "../sortable-item";

interface ExperienceItemProps {
  experience: Experience;
}

const ExperienceItem = ({ experience }: ExperienceItemProps) => {
  return (
    <SortableItem id={experience.id}>
      <div className="flex justify-between">
        <p className="font-semibold">{experience.company}</p>
        <p className="text-sm text-gray-700">{experience.location}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-600">{experience.role}</p>
        <p className="text-sm ">
          {formatMonthYear(experience.from)} {experience.from && "-"}{" "}
          {formatEndDate(experience.to)}
        </p>
      </div>
      <ul className="list-inside list-disc mt-1 ml-12">
        {experience.responsibilities.map((resp, index) => (
          <li key={index} className="text-sm text-gray-700">
            {resp}
          </li>
        ))}
      </ul>
    </SortableItem>
  );
};

export default ExperienceItem;
