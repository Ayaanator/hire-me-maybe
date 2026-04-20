import { create } from "zustand";

const useInteract = create((set) => ({
  interactState: "",
  setInteractState: (value) => set({ interactState: value }),
}));

export default useInteract;