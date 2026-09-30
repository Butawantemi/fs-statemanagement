import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";
import useNotification from "./useNotification";

export const useAnecdote = () => {
  const { addNotification } = useNotification();
  const quearyClient = useQueryClient();

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const anecdoteMutate = useMutation({
    mutationFn: createAnecdote,
    onSuccess: async (anecdote) => {
      const anecdotes = quearyClient.getQueryData(["anecdotes"]);
      quearyClient.setQueryData(["anecdotes"], anecdotes.concat(anecdote));
    },
  });

  const updateAnecdoteMutate = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: async () => {
      quearyClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => {
      if (content.length >= 5) {
        addNotification(`anecdote '${content}' created`);
        setTimeout(() => {
          addNotification(null);
        }, 5000);
        return anecdoteMutate.mutate({ content, votes: 0 });
      }
      addNotification("too short anecdote, must have length 5, or more");
      setTimeout(() => {
        addNotification(null);
      }, 5000);
    },
    addVote: (anecdote) => {
      updateAnecdoteMutate.mutate({ ...anecdote, votes: anecdote.votes + 1 });
      addNotification(`anecdote '${anecdote.content}' voted`);
      setTimeout(() => {
        addNotification(null);
      }, 5000);
    },
  };
};
