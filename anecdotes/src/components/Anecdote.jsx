import { useAnecdotesControls } from "../store";

const Anecdote = ({ anecdote }) => {
  const { addVote, removeAnecdote } = useAnecdotesControls();
  const vote = (id) => {
    addVote(id);
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
        {anecdote.votes === 0 && (
          <button onClick={() => removeAnecdote(anecdote.id)}>delete</button>
        )}
      </div>
    </div>
  );
};

export default Anecdote;
