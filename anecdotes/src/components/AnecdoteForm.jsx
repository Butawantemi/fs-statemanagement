import { useAnecdotesControls } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdotesControls();

  const handleAddAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    addAnecdote({ content: content, votes: 0 });
    e.target.reset();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
