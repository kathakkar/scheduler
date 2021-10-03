import  { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (transitionMode, replace = false) => {
    if(replace){
      history.pop();
    }
    setHistory((prev) => ([...prev, transitionMode]));
    setMode(transitionMode);
  }
  const back = () => {
    if(history.length > 1){
      history.pop();
      setMode(history[history.length-1]);
    }
    
  }
  return { mode, transition, back };
}