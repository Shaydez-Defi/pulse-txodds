import { create } from "zustand";

type AuthModalState = {
  isOpen: boolean;
  pendingAction: (() => void) | null;
  open: (onSuccess?: () => void) => void;
  close: () => void;
  runPendingAction: () => void;
};

export const useAuthModalStore = create<AuthModalState>((set, get) => ({
  isOpen: false,
  pendingAction: null,
  open: (onSuccess) =>
    set({ isOpen: true, pendingAction: onSuccess ?? null }),
  close: () => set({ isOpen: false, pendingAction: null }),
  runPendingAction: () => {
    const action = get().pendingAction;
    if (action) action();
    set({ pendingAction: null });
  },
}));