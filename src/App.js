import React, {useState, useEffect} from 'react';
import Card from './Card';
import Level from './Level';
import PopUpWindow from './PopUpWindow'
import './App.css';


const cardImages_1=[
  {'src':"./img/av_1.svg", matched: false},
  {'src':"./img/av_2.svg", matched: false},
  {'src':"./img/av_3.svg", matched: false},
  {'src':"./img/av_4.svg", matched: false},
]

const cardImages_2=[
  {'src':"./img/av_1.svg", matched: false},
  {'src':"./img/av_2.svg", matched: false},
  {'src':"./img/av_3.svg", matched: false},
  {'src':"./img/av_4.svg", matched: false},
  {'src':"./img/av_5.svg", matched: false},
  {'src':"./img/av_6.svg", matched: false},
]

const cardImages_3=[
  {'src':"./img/av_1.svg", matched: false},
  {'src':"./img/av_2.svg", matched: false},
  {'src':"./img/av_3.svg", matched: false},
  {'src':"./img/av_4.svg", matched: false},
  {'src':"./img/av_5.svg", matched: false},
  {'src':"./img/av_6.svg", matched: false},
  {'src':"./img/av_7.svg", matched: false},
  {'src':"./img/av_8.svg", matched: false},
  {'src':"./img/av_9.svg", matched: false},
  {'src':"./img/av_10.svg", matched: false},
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [flippedOne, setFlippedOne] = useState(null);
  const [flippedTwo, setFlippedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [level, setLevel] = useState('easy');
  const [gameEnd, setGameEnd] = useState(false)

  let cardImages = cardImages_1

switch (level) {
  case 'easy':
    cardImages = cardImages_1
    break;

  case 'medium':
    cardImages = cardImages_2
    break;

  case 'hard':
    cardImages = cardImages_3
    break;

  default:
    cardImages = cardImages_1
    break;
}


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
      <button className='button' onClick={shuffleCard}>New Game</button>

      <Level setLevel={setLevel}/>

      <div className="container">
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
      </div>

      <p className='moves'>Moves: {turns} </p>
      
      <PopUpWindow turns={turns} level ={level}/>

    </div>
  );
}

export default App;
