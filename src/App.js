import React, {useState, useEffect} from 'react';
import Card from './Card';
import Level from './Level';
import WinWindow from './WinWindow'
import Time from './Time'
import './App.css';

const all_images=[
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
  // const [cardImages, setCardImages]=useState([]);
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [flippedOne, setFlippedOne] = useState(null);
  const [flippedTwo, setFlippedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [level, setLevel] = useState('Easy');
  const [win, setWin] = useState(false);
  const [windowActive, setWindowActive] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  const time = 0;
  

let cardImages=randomCardSelection(4);

switch (level) {
  case 'Easy':
    cardImages=randomCardSelection(4)
    // setCardImages([])
    break;

  case 'Medium':
    cardImages=randomCardSelection(6)
    // setCardImages(cardImages_2)
    break;

  case 'Hard':
    cardImages=randomCardSelection(8)
    // setCardImages(cardImages_3)
    break;

  default:
    cardImages=randomCardSelection(4)
    // setCardImages(cardImages_1)
    break;
}

//random set of card from all img array
function randomCardSelection(number){

  let randomImgSet =[];
  while(randomImgSet.length<number){
    const randomIndex = Math.floor(Math.random()*all_images.length)
    if(!randomImgSet.includes(all_images[randomIndex])){
      randomImgSet.push(all_images[randomIndex])
    }
  }
  console.log(randomImgSet);
  return randomImgSet
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
  randomCardSelection()
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

  checkWin(cards)

}, [flippedOne, flippedTwo])


// checking if all cards matched
const checkWin =(cardArray)=>{
  const allMatched =cardArray.every(card => card.matched)
  if(allMatched){
    setWin(true)
    if(win){
      showWindow()
    }
  }
}

function showWindow(){
  setTimeout(() => {
    setWindowActive(true);
  }, 1000);
};


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
      <h1>Matching game</h1>
      <div className='button-container'>

      <Level 
      setLevel={setLevel} 
      level={level}
      shuffleCard={shuffleCard}/>

      {/* <button className='button' onClick={shuffleCard}>Play</button> */}
      </div>

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

      <Time/>

      <WinWindow 
      turns={turns} 
      level ={level} 
      time = {time}
      windowActive={windowActive}
      setWindowActive={setWindowActive}
      isExploding={isExploding}
      setIsExploding={setIsExploding}
      shuffleCard={shuffleCard} />

    </div>
  );
}

export default App;
