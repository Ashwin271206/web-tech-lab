import React, { useState } from "react";

function Header() {
  return <h1>Counter App</h1>;
}

function Counter({ count }) {
  return <div className="counter">{count}</div>;
}

function Display({ count }) {
  return (
    <div className="display">
      <Header />
      <Counter count={count} />
    </div>
  );
}

function IncrementButton({ onIncrement }) {
  return (
    <button className="increment" onClick={onIncrement}>
      Increment
    </button>
  );
}

function DecrementButton({ onDecrement }) {
  return (
    <button className="decrement" onClick={onDecrement}>
      Decrement
    </button>
  );
}

function Button({ onIncrement, onDecrement }) {
  return (
    <div className="buttons">
      <IncrementButton onIncrement={onIncrement} />
      <DecrementButton onDecrement={onDecrement} />
    </div>
  );
}

function ButtonSection({ onIncrement, onDecrement }) {
  return (
    <div className="button-section">
      <Button
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="app">
      <Display count={count} />

      <ButtonSection
        onIncrement={increment}
        onDecrement={decrement}
      />
    </div>
  );
}

export default App;
