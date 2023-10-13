import React, {useState, useEffect} from 'react';
import Card from './Card';
import './App.css';

const cardImages=[
  {'src':"./img/av1.svg", matched: false},
  {'src':"./img/av2.svg", matched: false},
  {'src':"./img/av3.svg", matched: false},
  {'src':"./img/av4.svg", matched: false},
  {'src':"./img/av5.svg", matched: false},
  {'src':"./img/av6.svg", matched: false},
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [flippedOne, setFlippedOne] = useState(null);
  const [flippedTwo, setFlippedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);


//shuffle cards 
const shuffleCard = () => {
  const shuffleCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card, index) => {
    return{...card, id: index};
  });
  setFlippedOne(null)
  setFlippedTwo(null)
  setCards(shuffleCards)
  setTurns(0)
}

//handle choice of cards 
const handleChoice=(card)=>{
  flippedOne ? setFlippedTwo(card) : setFlippedOne(card)
}

//compare two selected cards
useEffect(() => {

  if(flippedOne && flippedTwo){
    setDisabled(true)
    if(flippedOne.src === flippedTwo.src){
      setCards(prevCards=>{
        return prevCards.map(card=>{
          if(card.src === flippedOne.src){
            return {...card, matched: true}
          }else{
            return card
          }
        })
      })
      resetTurn()
    }
    else {
      setTimeout(()=>resetTurn(), 1000)
      
    } 
  }
  

}, [flippedOne, flippedTwo])

console.log(cards)

//reset choices and increase turn 
const resetTurn =()=>{
  setFlippedOne(null)
  setFlippedTwo(null)
  setTurns(prevTurns => prevTurns +1)
  setDisabled(false)
}

useEffect(()=>{
  shuffleCard()
}, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
    
      <div className="card-grid">
        {cards.map((card) => (
          <Card 
          card={card} 
          key={card.id} 
          handleChoice={handleChoice}
          flipped = {card === flippedOne || card === flippedTwo || card.matched}
          disabled={disabled}/>
        ))}
      </div>

      <p>Turns: {turns} </p>

    </div>
  );
}

export default App;
