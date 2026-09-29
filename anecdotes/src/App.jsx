import { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import { useAnecdotesControls } from "./store";

const App = () => {
  const { setAnecdote } = useAnecdotesControls();

  useEffect(() => {
    setAnecdote();
  }, [setAnecdote]);

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
