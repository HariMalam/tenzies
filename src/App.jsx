
import { useEffect, useState } from 'react';
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const generateDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    const id = nanoid();
    return { value, isHeld: false, id };
  }

  const generate = () => {
    let list = [];
    for (let i = 0; i < 10; i++) {
      const dice = generateDice()
      list.push(dice);
    }
    return list;
  }

  const [dieValues, setDieValues] = useState(generate())
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const isTenzies = dieValues.every(die => die.isHeld && die.value === dieValues[0].value);
    isTenzies && setTenzies(true);
  }, [dieValues])

  const handleHoldDie = (id) => {
    setDieValues(prev => prev.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
    }))
  }

  const diceElement = dieValues.map(die => (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDie={() => handleHoldDie(die.id)} />
  ));

  const roll = () => {
    setDieValues(prev => prev.map(die => {
      return die.isHeld ? die : generateDice();
    }));
  }

  const newGame = () => {
    setDieValues(generate());
    setTenzies(false);
  }

  const rollDice = () => {
    tenzies ? newGame() : roll();
  }



  return (
    <main>
      {tenzies && <Confetti />}
      <div className="header">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className='dice-container'>
        {diceElement}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
