import { Education } from "@/hooks/useEducation";
import { formatEndDate, formatMonthYear } from "@/lib/utils";
import { SortableItem } from "../sortable-item";

interface EducationItemProps {
  education: Education;
}

const EducationItem = ({ education }: EducationItemProps) => {
  return (
    <SortableItem id={education.id}>
      <div className="flex justify-between">
        <p className="font-semibold">{education.school}</p>
        <p className="text-sm text-gray-700">{education.location}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-gray-600">{education.bachelor}</p>
        <p className="text-sm ">
          {formatMonthYear(education.from)} {education.from && "-"}{" "}
          {formatEndDate(education.to)}
        </p>
      </div>
      <ul className="list-inside list-disc mt-1 ml-12">
        {education.responsibilities.map((resp, index) => (
          <li key={index} className="text-sm text-gray-700">
            {resp}
          </li>
        ))}
      </ul>
    </SortableItem>
  );
};

export default EducationItem;
