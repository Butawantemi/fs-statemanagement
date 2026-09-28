import { create } from "zustand";
import { useShallow } from "zustand/shallow";

const useStatistics = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    setGood: () => set((state) => ({ good: state.good + 1 })),
    setNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
    setBad: () => set((state) => ({ bad: state.bad + 1 })),
  },
}));

export const useValues = () =>
  useStatistics(
    useShallow((state) => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad
    })),
  );

export const useStatisticsControls = () =>
  useStatistics((state) => state.actions);
