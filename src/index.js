import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CardList from './components/CardList';
import Form from './components/Form';
import DeleteForm from './components/DeleteForm';

const { useState } = React;

const App = () => {

  const [cards, setCards] = useState([])

  const addNewBar = cardInfo => {
    const found = cards.some(el => el.key === cardInfo.key);
    (!found) ? setCards(cards.concat(cardInfo)) : alert("Status bar is already in use")
  }

  const deleteBar = (index) => {
    console.log(index)
    if (typeof index !== typeof null && index !== "") {
      let temparr = [...cards]
      temparr.splice(index-1, 1)
      setCards(temparr)
    }
  }

  return (
    <div className='full'>
      <h1>Sims Status</h1>
      <div className='module'>
        <div className="form">
          <Form onSubmit={addNewBar} defaultval={1} />
          <DeleteForm onSubmit={deleteBar} cards={cards} />
        </div>
        <div className='card-form' style={{display: (cards.length > 0) ? 'block' : 'none'}}>
          <CardList cards={cards} />
        </div>
      </div>
      <div className='credit'>
        GitHub: @thomasreynolds4881
      </div>
    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);