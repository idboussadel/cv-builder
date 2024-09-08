import { Project } from "@/hooks/useProjects";
import { SortableItem } from "../sortable-item";

interface ProjectItemProps {
  project: Project;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <SortableItem id={project.id}>
      <div className="flex gap-2">
        <p className="font-semibold">{project.name}</p>
        <p>{project.mainTechnology && `(${project.mainTechnology})`}</p>
      </div>

      <ul className="list-inside list-disc mt-1 ml-12">
        {project.responsibilities.map((resp, index) => (
          <li key={index} className="text-sm text-gray-700">
            {resp}
          </li>
        ))}
      </ul>
    </SortableItem>
  );
};

export default ProjectItem;
