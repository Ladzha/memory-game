import React from 'react'

const LostWindow = ({lostWindow, setLostWindow, shuffleCard}) => {

  const handleClose = ()=>{
    setLostWindow(false)
    shuffleCard()
  }


  return (
    <div className={lostWindow ? 'win-window active' : 'win-window' } onClick={handleClose}>
    <div className= {lostWindow ? 'win-container active' : 'win-container' }>
    <h3 className='bold'>Game Over!</h3> 
      <p>Good luck next time!</p> 
      <button className='button' onClick={handleClose}>Close</button>
    </div>
  </div>
  )
}

export default LostWindow

