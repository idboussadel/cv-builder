import { Project, useProjectsStore } from "@/hooks/useProjects";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { addResponsibility, updateProject } = useProjectsStore((state) => ({
    addResponsibility: state.addResponsibility,
    updateProject: state.updateProject,
  }));
  const projectId = project.id;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (projectId) {
      updateProject(projectId, { name: e.target.value });
    }
  };

  const handleMainTechnologyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (projectId) {
      updateProject(projectId, { mainTechnology: e.target.value });
    }
  };

  const handleAddResponsibility = () => {
    if (projectId) {
      addResponsibility(projectId, "");
    }
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    if (projectId) {
      updateProject(projectId, {
        responsibilities: (project?.responsibilities || []).map((resp, i) =>
          i === index ? value : resp
        ),
      });
    }
  };

  const handleResponsibilityRemove = (index: number) => {
    if (projectId) {
      updateProject(projectId, {
        responsibilities: (project?.responsibilities || []).filter(
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
          value={project.name}
          placeholder="Project Name"
          onChange={handleNameChange}
        />
        <Input
          type="text"
          value={project.mainTechnology}
          placeholder="Main Technology"
          onChange={handleMainTechnologyChange}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium mb-2 mt-1">Responsibilities</h3>
        {(project?.responsibilities || []).map((resp, index) => (
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
  );
};

export default ProjectCard;
