import React, {useState, useEffect} from 'react';
import Card from './Card';
import Level from './Level';
import WinWindow from './WinWindow';
import LostWindow from './LostWindow';
import Footer from './Footer'
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
  {'src':"./img/av_11.svg", matched: false},
  {'src':"./img/av_12.svg", matched: false},
  {'src':"./img/av_13.svg", matched: false},
  {'src':"./img/av_14.svg", matched: false},
  {'src':"./img/av_15.svg", matched: false},
]

function App() {

  //Card parameters
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [flippedOne, setFlippedOne] = useState(null);
  const [flippedTwo, setFlippedTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // const [cardImages, setCardImages] =useState(randomCardSelection(4));

  //Game status
  const [gameStart, setGameStart]=useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [winGame, setWinGame] = useState(false);
  const [lostGame, setLostGame] = useState(false);

  //Game status windows: win, lost
  const [winWindow, setWinWindow] = useState(false);
  const [lostWindow, setLostWindow] = useState(false);

  //Game level
  const [level, setLevel] = useState('Easy');

  //Timer
  const [maxTime, setMaxTime]=useState(100);
  const [timeLeft, setTimeLeft]=useState(maxTime);

  //Confetti effect 
  const [isExploding, setIsExploding] = useState(false);

  //Grid view depends of game level
  const [gridSizeClass, setGridSizeClass ] =useState('card-grid-easy')


let cardImages=randomCardSelection(4);

switch (level) {

  case 'Super Easy':
    cardImages=randomCardSelection(4)
    // setCardImages([])
    // StartTimer(100)
    console.log('super');
    break;

  case 'Easy':
    cardImages=randomCardSelection(6)
    // setCardImages([])
    // StartTimer(100)
    break;

  case 'Medium':
    cardImages=randomCardSelection(8)
    // setCardImages(cardImages_2)
    // StartTimer(120)
    break;

  case 'Hard':
    cardImages=randomCardSelection(10)
    // setCardImages(cardImages_3)
    // StartTimer(180)
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

  checkGameStart(cards)
  checkWin(cards)
  checkLost(timeLeft)

}, [flippedOne, flippedTwo])

let time = maxTime;

const handleTimeLine =((event)=>{
    time = event.target.value;
})

//TIMER 
useEffect(()=>{
  if(timeLeft<=0) return;
  const timeout = setTimeout(()=>{
    setTimeLeft(timeLeft-1);
  }, 1000)

  return () => clearTimeout(timeout)

}, [timeLeft])

function StartTimer(seconds){
  setTimeLeft(seconds)
}

//checking if game start
const checkGameStart=(cardArray)=>{

  const oneMatched =cardArray.every(card => card.matched)
  if(oneMatched){
    setGameStart(true)
  }
  console.log(gameStart)
}

//CHECK LOST
// checking if game time out
const checkLost =(time)=>{
  if(time===0){
    setLostGame(true)
    setGameEnd(true)
    if(lostGame){
      showLostWindow()
    }  
  }
}

//CHECK WIN
// checking if all cards matched
const checkWin =(cardArray)=>{
  const allMatched =cardArray.every(card => card.matched)
  if(allMatched){
    setWinGame(true)
    setGameEnd(true)
    if(winGame){
      showWinWindow()
    }
  }
}

//show win and game over windows
function showWinWindow(){
  setTimeout(() => {
    setWinWindow(true);
  }, 1000);
};

function showLostWindow(){
  setTimeout(() => {
    setLostWindow(true);
  }, 500);
};


//reset choices and increase turn 
const resetTurn =()=>{
  setFlippedOne(null)
  setFlippedTwo(null)
  setTurns(prevTurns => prevTurns +1)
  setDisabled(false)
}

// useEffect(()=>{
//   shuffleCard()
// }, [])

  return (
    <div className="App">
      <div className='main'>
      <p className='main-title'>MEMORY GAME</p>
      <div className='button-container'>

      <Level 
      level={level}
      setLevel={setLevel} 
      shuffleCard={shuffleCard}
      setGridSizeClass={setGridSizeClass}/>
      
      </div>

      <input className='timer-range' type ='range' max={maxTime} min='0' value={timeLeft} onChange={handleTimeLine}/>

      {timeLeft}

      <WinWindow 
      turns={turns} 
      level ={level} 
      time = {timeLeft}
      winWindow={winWindow}
      setWinWindow={setWinWindow}
      isExploding={isExploding}
      setIsExploding={setIsExploding}
      shuffleCard={shuffleCard} />

      <LostWindow
      lostWindow={lostWindow}
      setLostWindow={setLostWindow}
      shuffleCard={shuffleCard}
      />

      <div className="container">

      <div className={`card-grid ${gridSizeClass}`}>
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
      </div>
      <Footer/>
    </div>
  );
}

export default App;
