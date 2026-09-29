import { useAnecdotesControls } from "../store";

const Filter = () => {
  const { setFilter } = useAnecdotesControls();

  const handleChange = (event) => {
    // the value of the input field is in event.target.value
    event.preventDefault();
    setFilter(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter" />
    </div>
  );
};

export default Filter;
