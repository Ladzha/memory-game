import React from 'react'

const Level = ({setLevel}) => {

  const handleEasy =()=>{
    setLevel('easy')
  }

  const handleMedium =()=>{
    setLevel('medium')
  }

  const handleHard =()=>{
    setLevel('hard')
  }


  return (
    <div className='level-container'>
      <button className='level-button button' onClick={handleEasy}>Easy</button>
      <button className='level-button button' onClick={handleMedium}>Medium</button>
      <button className='level-button button' onClick={handleHard}>Hard</button>
    </div>
  )
}

export default Level