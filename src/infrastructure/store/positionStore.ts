import { create } from "zustand";

type Position = {
    x: number;
    y: number;
    z: number;
};

type Store = {
    position: Position;
    setPosition: (pos: Position) => void;
};

export const useStore = create<Store>((set) => ({
    position: { x: 0, y: 0, z: 0 },
    setPosition: (pos) => set({ position: pos }),
}));
