import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CardList from './components/CardList';
import Form from './components/Form';

const { useState } = React;

const App = () => {

  const [cards, setCards] = useState([])

  const addNewBar = cardInfo => {
    setCards(cards.concat(cardInfo))
  }

  return (
    <div className='full'>
      <h1>Sims Status</h1>
      <div className='module'>
        <div className="form">
          <Form onSubmit={addNewBar} defaultval={1} />
        </div>
        <div className='card-form'>
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