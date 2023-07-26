import { create } from "zustand";

interface useProModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

// global state controls for opening and closing pro modal
export const useProModal = create<useProModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));