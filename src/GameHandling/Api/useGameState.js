import { create } from "zustand";

export const useGameState = create((set) => ({
    player: null,
    opponent: null,
    currentEvent: null,
    currentGameWinner: null,
    matchWinner: null,
    setPlayer: (player) => set({ player }),
    setOpponent: (opponent) => set({ opponent }),
    setCurrentEvent: (currentEvent) => set({ currentEvent }),
    setCurrentGameWinner: (currentGameWinner) => set({ currentGameWinner }),
    setMatchWinner: (matchWinner) => set({ matchWinner })
}));
