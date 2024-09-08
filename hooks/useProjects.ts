import { create } from "zustand";

export interface Project {
  id: number;
  name: string;
  mainTechnology: string;
  responsibilities: string[];
}

interface ProjectStore {
  projects: Project[];
  nextId: number;
  addProject: () => void;
  removeProject: (id: number) => void;
  updateProject: (
    id: number,
    updatedProject: Partial<Omit<Project, "id">>
  ) => void;
  addResponsibility: (projectId: number, responsibility: string) => void;
  updateProjectOrder: (fromId: number, toId: number) => void;
}

export const useProjectsStore = create<ProjectStore>((set) => ({
  projects: [],
  nextId: 1,

  addProject: () =>
    set((state) => {
      const newProject: Project = {
        id: state.nextId,
        name: "",
        mainTechnology: "",
        responsibilities: [""],
      };
      return {
        projects: [...state.projects, newProject],
        nextId: state.nextId + 1,
      };
    }),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((proj) => proj.id !== id),
    })),

  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((proj) =>
        proj.id === id ? { ...proj, ...updatedProject } : proj
      ),
    })),

  addResponsibility: (projectId, responsibility) =>
    set((state) => ({
      projects: state.projects.map((proj) =>
        proj.id === projectId
          ? {
              ...proj,
              responsibilities: [...proj.responsibilities, responsibility],
            }
          : proj
      ),
    })),

  updateProjectOrder: (fromId, toId) =>
    set((state) => {
      const projects = [...state.projects];
      const fromIndex = projects.findIndex((proj) => proj.id === fromId);
      const toIndex = projects.findIndex((proj) => proj.id === toId);

      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        // Swap positions of projects
        const [movedProject] = projects.splice(fromIndex, 1);
        projects.splice(toIndex, 0, movedProject);
      }
      return { projects };
    }),
}));
