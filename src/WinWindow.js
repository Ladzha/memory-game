import React from 'react'
import ConfettiExplosion from 'react-confetti-explosion';


const WinWindow = ({turns, level, time, winWindow, setWinWindow, isExploding, setIsExploding, shuffleCard}) => {

  const handleClose = ()=>{
    setWinWindow(false)
    shuffleCard()
  }

  if(winWindow){
    setIsExploding(true)
  }
  else{
    setIsExploding(false)
  }
  
  return (
    <div className={winWindow ? 'win-window active' : 'win-window' } onClick={handleClose}>
      <div className= {winWindow ? 'win-container active' : 'win-container' }>
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