import React, {useEffect} from 'react'

const Level = ({level, setLevel, shuffleCard, setGridSizeClass }) => {


  const handleSuperEasy =()=>{
    setLevel('Super Easy')
    setGridSizeClass('card-grid-easy')
  }


  const handleEasy =()=>{
    setLevel('Easy')
    setGridSizeClass('card-grid-easy')
  }

  const handleMedium =()=>{
    setLevel('Medium')
    setGridSizeClass('card-grid-medium')
  }

  const handleHard =()=>{
    setLevel('Hard')
    setGridSizeClass('card-grid-hard')
  }

  useEffect(()=>{
    shuffleCard()
  }, [level])

  return (
    <div className='level-button-container'>
      <button className= {level === 'Super Easy' ? 'level-button button selected' : 'level-button button'} onClick={handleSuperEasy}>Super Easy</button>
      <button className= {level === 'Easy' ? 'level-button button selected' : 'level-button button'} onClick={handleEasy}>Easy</button>
      <button className= {level === 'Medium' ? 'level-button button selected' : 'level-button button'} onClick={handleMedium}>Medium</button>
      <button className= {level === 'Hard' ? 'level-button button selected' : 'level-button button'} onClick={handleHard}>Hard</button>
    </div>
  )
}

export default Level