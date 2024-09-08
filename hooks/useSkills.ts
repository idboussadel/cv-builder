import { create } from "zustand";

export interface Skill {
  id: number;
  name: string;
}

interface SkillStore {
  skills: Skill[];
  nextId: number;
  addSkill: () => void;
  removeSkill: (id: number) => void;
  updateSkill: (id: number, name: string) => void;
}

export const useSkillStore = create<SkillStore>((set) => ({
  skills: [],
  nextId: 1,

  addSkill: () =>
    set((state) => {
      const newSkill: Skill = {
        id: state.nextId,
        name: "", // Initial empty name for new skillset
      };
      return {
        skills: [...state.skills, newSkill],
        nextId: state.nextId + 1,
      };
    }),

  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== id),
    })),

  updateSkill: (id, name) =>
    set((state) => ({
      skills: state.skills.map((skill) =>
        skill.id === id ? { ...skill, name } : skill
      ),
    })),
}));
