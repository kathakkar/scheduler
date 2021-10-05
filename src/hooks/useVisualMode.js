import  { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (transitionMode, replace = false ) => {
    const newHistory = [...history];
    if(replace === true){
      newHistory.pop();
    }
    newHistory.push(transitionMode);
    setHistory(newHistory);
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