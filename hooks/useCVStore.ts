import { create } from "zustand";

export type SectionId = "experience" | "projects" | "skills" | "education";

export interface CVStore {
  sectionOrder: SectionId[];
  setSectionOrder: (order: SectionId[]) => void;
  reorderSection: (fromIndex: number, toIndex: number) => void;
}

export const useCVStore = create<CVStore>((set) => ({
  sectionOrder: ["experience", "projects", "skills", "education"],
  setSectionOrder: (order) => set({ sectionOrder: order }),
  reorderSection: (fromIndex, toIndex) => {
    set((state) => {
      const newOrder = [...state.sectionOrder];
      const [movedSection] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, movedSection);
      return { sectionOrder: newOrder };
    });
  },
}));
