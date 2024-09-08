import { create } from "zustand";

export interface Education {
  id: number;
  school: string;
  from: Date | undefined;
  to: Date | undefined;
  bachelor: string;
  location: string;
  responsibilities: string[];
}

interface EducationStore {
  educations: Education[];
  nextId: number;
  addEducation: () => void;
  removeEducation: (id: number) => void;
  updateEducation: (
    id: number,
    updatedEducation: Partial<Omit<Education, "id">>
  ) => void;
  addResponsibility: (educationId: number, responsibility: string) => void;
  updateEducationOrder: (fromId: number, toId: number) => void;
}

export const useEducationStore = create<EducationStore>((set) => ({
  educations: [],
  nextId: 1,

  addEducation: () =>
    set((state) => {
      const newEducation: Education = {
        id: state.nextId,
        school: "",
        from: undefined,
        to: undefined,
        bachelor: "",
        location: "",
        responsibilities: [""],
      };
      return {
        educations: [...state.educations, newEducation],
        nextId: state.nextId + 1,
      };
    }),

  removeEducation: (id) =>
    set((state) => ({
      educations: state.educations.filter((edu) => edu.id !== id),
    })),

  updateEducation: (id, updatedEducation) =>
    set((state) => ({
      educations: state.educations.map((edu) =>
        edu.id === id ? { ...edu, ...updatedEducation } : edu
      ),
    })),

  addResponsibility: (educationId, responsibility) =>
    set((state) => ({
      educations: state.educations.map((edu) =>
        edu.id === educationId
          ? {
              ...edu,
              responsibilities: [...edu.responsibilities, responsibility],
            }
          : edu
      ),
    })),

  updateEducationOrder: (fromId, toId) =>
    set((state) => {
      const educations = [...state.educations];
      const fromIndex = educations.findIndex((edu) => edu.id === fromId);
      const toIndex = educations.findIndex((edu) => edu.id === toId);

      if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
        const [movedEducation] = educations.splice(fromIndex, 1);
        educations.splice(toIndex, 0, movedEducation);
      }
      console.log(educations);
      return { educations };
    }),
}));
