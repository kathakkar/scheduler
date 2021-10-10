import  { useState } from "react";

export default function useVisualMode(initial){
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  console.log(history);
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

    if (history.length > 1) {
      setHistory(history => {
        const prevHistory = [...history].slice(0, history.length - 1);
        setMode(prevHistory[prevHistory.length - 1]);
        return prevHistory
      });
        
    }

    
  }
  return { mode, transition, back };
}