import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "../requests";

export const useAnecdote = () => {
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
        anecdoteMutate.mutate({ content, votes: 0 });
      }
    },
    addVote: (anecdote) => {
      updateAnecdoteMutate.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    },
  };
};
