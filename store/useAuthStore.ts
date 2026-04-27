import { create } from "zustand";

interface AuthStore {
  isModalOpen: boolean;
  view: "login" | "register" | "forgot-password";
  openModal: (view?: "login" | "register" | "forgot-password") => void;
  closeModal: () => void;
  setView: (view: "login" | "register" | "forgot-password") => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isModalOpen: false,
  view: "login",
  openModal: (view = "login") => set({ isModalOpen: true, view }),
  closeModal: () => set({ isModalOpen: false }),
  setView: (view) => set({ view }),
}));
