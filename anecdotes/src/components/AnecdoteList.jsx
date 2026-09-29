import { useAnecdotes } from "../store";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();

  return (
    <div>
      {anecdotes.map((anecdote) => (
          <Anecdote anecdote={anecdote} key={anecdote.id}/>
        ))}
    </div>
  );
};

export default AnecdoteList;
