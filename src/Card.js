import React from 'react'

function Card({card, handleChoice, flipped, disabled}) {


const handleClick = () => {
  if(!disabled){
    handleChoice(card)
  }
}

  return (
    <div className='card'>
    <div className={flipped ? 'flipped' : ''}>
      <img className='front' src={card.src} alt="card's front"/>
       
      <img className='back' src="./img/cover_1.svg" alt="card's back" onClick={handleClick}/>
      
    </div>
  </div>
  )
}

export default Card