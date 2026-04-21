import { create } from "zustand";

const useInteract = create((set) => ({
  interactState: "",
  setInteractState: (value) => set({ interactState: value }),
}));

const usePremium = create((set) => ({
  premiumState: "",
  setPremiumState: (value) => set({ premiumState: value }),
}));

const useCredit = create((set) => ({
  creditState: "",
  setCreditState: (value) => set({ creditState: value }),
}));

export { useInteract, usePremium, useCredit };