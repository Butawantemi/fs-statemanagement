import { useAnecdote } from "../hooks/useAnecdote";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdote();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    addAnecdote(content);
    console.log(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
