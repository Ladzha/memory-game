import React, {useEffect} from 'react'
import ConfettiExplosion from 'react-confetti-explosion';


const WinWindow = ({turns, level, time, windowActive, setWindowActive, isExploding, setIsExploding}) => {

  const handleClose = ()=>{
    setWindowActive(false)
  }

  if(windowActive){
    setIsExploding(true)
  }
  else{
    setIsExploding(false)
  }

  // useEffect(()=>{
  //   setIsExploding(true)
  // }, [isExploding]) 


  return (
    <div className={windowActive ? 'win-window active' : 'win-window' } onClick={handleClose}>
      <div className= {windowActive ? 'win-container active' : 'win-container' }>
      {isExploding && <ConfettiExplosion />}
      <h3 className='bold'>You Win!</h3> 
        <p><span className='bold'>Level:</span> {level}.</p> 
        <p><span className='bold'> Moves:</span> {turns}.</p>
        <p><span className='bold'> Time:</span> {time}.</p>
        <button className='button' onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}

export default WinWindow