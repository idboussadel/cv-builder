import { create } from "zustand";

export type InfoState = {
  name: string;
  githubOrEmail: string;
  setName: (value: string) => void;
  setGithubOrEmail: (value: string) => void;
};

const useInfo = create<InfoState>((set) => ({
  name: "",
  githubOrEmail: "",

  setName: (value: string) => set({ name: value }),
  setGithubOrEmail: (value: string) => set({ githubOrEmail: value }),
}));

export default useInfo;
