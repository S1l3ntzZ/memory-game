import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';
import img1 from "./img/helmet-1.png";
import img2 from "./img/potion-1.png"
import img3 from "./img/ring-1.png"
import img4 from "./img/scroll-1.png"
import img5 from "./img/shield-1.png"
import img6 from "./img/sword-1.png"

// array of card images
const cardImages = [
  { "src": img1, matched: false },
  { "src": img2, matched: false },
  { "src": img3, matched: false },
  { "src": img4, matched: false },
  { "src": img5, matched: false },
  { "src": img6, matched: false },
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards, duplicate cards to get set of 12, assign random ID to each
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]      // 2 lots of card images
      .sort(() => Math.random() - 0.5)                        // shuffled array
      .map((card) => ({ ...card, id: Math.random() }))        // add on random ID number to each card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a user choice, update choice one or two
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)        // if choiceOne is null (is false), update with setChoiceOne, else update choiceTwo with setChoiceTwo
  }

  useEffect(() => {
    let result = cards.filter(card => card.matched)
    if (result.length===cards.length){
      
      setTimeout(() => {shuffleCards()}, 2000)
      
    }
  }, [cards])

  // reset game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase number of turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <h2>Magic Match</h2>
      <h5>A card memory game</h5>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
