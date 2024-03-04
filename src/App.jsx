import { useState, useEffect, useRef } from "react";

function App() {
  const ref = useRef();
  const inputRef = useRef();
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimer(300);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      ref.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            setIsRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ref.current);
  }, [isRunning]);

  return (
    <div className="text-center">
      <input
        type="number"
        placeholder="Enter seconds to start timer"
        className="border w-[80%] max-w-[500px] mt-5 border-black pl-2 "
        ref={inputRef}
      />
      <button
        onClick={() => {
          setTimer(Number(inputRef.current.value));
          setIsRunning(true);
        }}
        className="bg-orange-400 p-1 m-1 rounded-lg text-white"
      >
        Start
      </button>
      <h1 className="text-3xl my-5">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h1>
      <button
        onClick={handlePause}
        className="bg-orange-400 p-1 m-1 rounded-lg text-white"
      >
        Start/Pause
      </button>
      <button
        onClick={handleReset}
        className="bg-orange-400 p-1 m-1 rounded-lg text-white"
      >
        Reset
      </button>
    </div>
  );
}

export default App;
