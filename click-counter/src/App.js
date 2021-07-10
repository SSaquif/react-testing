import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div data-test="app-component">
      <h1 data-test="counter-display">
        Current Counter:<span data-test="count">{count}</span>
      </h1>
      <button onClick={handleClick} data-test="increment-button">
        Click Me
      </button>
    </div>
  );
}

export default App;
