import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    addVote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id
            ? { ...anecdote, votes: anecdote.votes + 1 }
            : anecdote,
        ),
      })),
    addAnecdote: (anecdote) =>
      set((state) => ({ anecdotes: [...state.anecdotes, anecdote] })),
    setFilter: (value) => set(() => ({ filter: value })),
    setAnecdote: async () => {
      const fetchAnecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes: fetchAnecdotes }));
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  if (filter !== "") {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase()),
    );
  }
  return anecdotes;
};
export const useAnecdotesControls = () =>
  useAnecdoteStore((state) => state.actions);
