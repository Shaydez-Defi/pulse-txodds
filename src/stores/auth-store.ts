import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  name: string;
  email?: string;
  wallet?: string;
  type: "google" | "wallet" | "guest";
};

type AuthState = {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    { name: "pulse-auth" }
  )
);
