import { create } from "zustand";

export interface Experience {
  id: number;
  company: string;
  from: Date | undefined;
  to: Date | undefined;
  role: string;
  location: string;
  responsibilities: string[];
}

interface ExperienceStore {
  experiences: Experience[];
  nextId: number;
  addExperience: () => void;
  removeExperience: (id: number) => void;
  updateExperience: (
    id: number,
    updatedExperience: Partial<Omit<Experience, "id">>
  ) => void;
  addResponsibility: (experienceId: number, responsibility: string) => void;
  updateExperienceOrder: (fromId: number, toId: number) => void;
}

export const useExperienceStore = create<ExperienceStore>((set) => ({
  experiences: [],
  nextId: 1,

  addExperience: () =>
    set((state) => {
      const newExperience: Experience = {
        id: state.nextId,
        company: "",
        from: undefined,
        to: undefined,
        role: "",
        location: "",
        responsibilities: [""],
      };
      return {
        experiences: [...state.experiences, newExperience],
        nextId: state.nextId + 1,
      };
    }),

  removeExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),

  updateExperience: (id, updatedExperience) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExperience } : exp
      ),
    })),

  addResponsibility: (experienceId, responsibility) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === experienceId
          ? {
              ...exp,
              responsibilities: [...exp.responsibilities, responsibility],
            }
          : exp
      ),
    })),

  updateExperienceOrder: (fromId, toId) =>
    set((state) => {
      const experiences = [...state.experiences];
      const fromIndex = experiences.findIndex((exp) => exp.id === fromId);
      const toIndex = experiences.findIndex((exp) => exp.id === toId);

      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        // Swap positions of experiences
        const [movedExperience] = experiences.splice(fromIndex, 1);
        experiences.splice(toIndex, 0, movedExperience);
      }
      console.log(experiences);
      return { experiences };
    }),
}));
