import { useEffect, useState } from "react";

const useCountdown =()=>{
  const [timeLeft, settimeLeft]=useState(0);

  useEffect(()=>{
    if(timeLeft<=0) return;
    const timeout = setTimeout(()=>{
      settimeLeft(timeLeft-1);
    }, 1000)

    return () => clearTimeout(timeout)
  }, [timeLeft])


  function start(seconds){
    settimeLeft(seconds)
  }
  
  return {timeLeft, start}
}

export default useCountdown