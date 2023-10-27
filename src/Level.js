import React, {useEffect} from 'react'

const Level = ({setLevel, level, shuffleCard}) => {

  const handleEasy =()=>{
    setLevel('Easy')
  }

  const handleMedium =()=>{
    setLevel('Medium')
  }

  const handleHard =()=>{
    setLevel('Hard')
  }

  useEffect(()=>{
    shuffleCard()
  }, [level])

  return (
    <div className='level-button-container'>
      <button className= {level === 'Easy' ? 'level-button button selected' : 'level-button button'} onClick={handleEasy}>Easy</button>
      <button className= {level === 'Medium' ? 'level-button button selected' : 'level-button button'} onClick={handleMedium}>Medium</button>
      <button className= {level === 'Hard' ? 'level-button button selected' : 'level-button button'} onClick={handleHard}>Hard</button>
    </div>
  )
}

export default Level