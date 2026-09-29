import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  notification: null,
  actions: {
    addVote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((a) => (a.id === id ? updated : a)),
      }));
      get().actions.setNotification(`you voted '${anecdote.content}'`);
      setTimeout(() => {
        get().actions.setNotification(null);
      }, 5000);
    },
    addAnecdote: async (anecdote) => {
      const newAnecdote = await anecdoteService.createNew(anecdote);

      set((state) => ({ anecdotes: [...state.anecdotes, newAnecdote] }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
    setAnecdote: async () => {
      const fetchAnecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes: fetchAnecdotes }));
    },
    setNotification: (message) => set(() => ({ notification: message })),
    removeAnecdote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id);

      if (anecdote.votes === 0) {
        await anecdoteService.deleteAnecdote(id);
        set((state) => ({
          anecdotes: state.anecdotes.filter((n) => n.id !== id),
        }));
      }
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
export const useNotification = () =>
  useAnecdoteStore((state) => state.notification);
export const useAnecdotesControls = () =>
  useAnecdoteStore((state) => state.actions);
