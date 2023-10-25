import React from 'react'

const PopUpWindow = ({turns, level}) => {
  const handleWin = ()=>{
    
  }
  return (
    <div className='pop-window' onClick = {handleWin}>
     <p className='congratulation'>Congratulation!</p> 
     <p>You Win! Level: {level}. Moves: {turns}. </p> </div>
  )
}

export default PopUpWindow