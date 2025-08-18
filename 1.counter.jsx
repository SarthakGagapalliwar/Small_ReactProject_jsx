import { useEffect, useState } from "react";

function Counter() {
  const [history, setHistory] = useState([0]);
  const [position, setPosition] = useState(0);

  const currval = history[position];

  const addValueHistory = (newvalue) => {
    const newHistory = history.slice(0, position + 1);
    setHistory([...newHistory, newvalue]);
    setPosition(position + 1);
  };
  console.log(history, position);

  const decrement = () => addValueHistory(currval - 1);
  const increment = () => addValueHistory(currval + 1);

  const undo = () =>{
    if(position>0){
        setPosition(position-1);
    }
  }

  const redo=()=>{
    if(position < history.length-1){
        setPosition(position+1);
    }
  }


  return (
    <div className="flex flex-col items-center pt-[155px] min-h-screen bg-gray-500 text-white">
      <h1 className="text-2xl font-bold mb-6">Counter with Undo/Redo</h1>

      <div className="flex items-center gap-6 mb-6">
        <button
          className="px-4 py-2 bg-red-600 rounded-lg shadow hover:bg-red-700"
          onClick={decrement}
        >
          -
        </button>

        <span className="text-3xl font-bold">{currval}</span>

        <button
          className="px-4 py-2 bg-green-600 rounded-lg shadow hover:bg-green-700"
          onClick={increment}
        >
          +
        </button>
      </div>

      <div className="flex gap-4">
        <button className="px-4 py-2 bg-yellow-500 rounded-lg shadow hover:bg-yellow-600 disabled:opacity-50"
        onClick={undo}>
          Undo
        </button>

        <button className="px-4 py-2 bg-blue-500 rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
        onClick={redo}>
          Redo
        </button>
      </div>
    </div>
  );
}

export default Counter;
