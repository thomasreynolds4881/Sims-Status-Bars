import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import img_hygiene from './imgs/hygiene.png'

const { useState, useEffect } = React;

// Child Plus Button
const OpButton = ({val, onClick, text}) => {

  const handleClick = () => {
    onClick(val);
  }

  return (
    <div className="opbutton">
      <button onClick={handleClick}>{text}</button>
    </div>
  )
  
};

// Child Status Bar
const StatusBar = (props) => {
  const { curr, col } = props;

  const containerStyles = {
    height: 20,
    width: '150px',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: -40,
    marginLeft: 10,
    boxShadow: "1px 3px 1px #9E9E9E"
  }

  const fillerStyles = {
    height: '100%',
    width: `${curr}px`,
    backgroundColor: `${col}`,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}></div>
    </div>
  );
};

// Child Status Items
const StatusItem = props => {

  let [itemVal, setItemVal] = useState(150);

  const changeVal = val => {
    let newVal = itemVal + val;
    if (newVal > 150) newVal = 150;
    setItemVal(newVal);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let newVal = itemVal - props.rate;
      if (newVal > 0) {
        setItemVal(itemVal => itemVal - props.rate);
      } else {
        setItemVal(itemVal => itemVal - itemVal);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [props.rate, itemVal]);

  let curr_img;
  curr_img = img_hygiene;

  let curr_color;
  if (itemVal > 100) curr_color = '#00FF00';
  else if (itemVal > 50) curr_color = '#FFFF00';
  else curr_color = '#FF0000';

  const imgStyles = {
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginLeft: -3,
    background: `${curr_color}`,
    boxShadow: "1px 3px 1px #9E9E9E"
  }

  return (
    <div className = "item">
      <p>{props.itemName}</p>
      <div className="status">
        <img style={imgStyles} src={curr_img} alt="" />
        <StatusBar curr={Math.floor(itemVal)} col={curr_color} />
      </div>
      <div className = "mybuttons">
        <OpButton val={20} text="+" onClick={changeVal}/>
      </div>
    </div>
  )
};

// List of bars
const CardList = props => (
  <div className='status-bars'>
    <StatusItem key='Example Bar' itemName='Example Bar' rate={1} />
    {props.cards.map(card => (
      <StatusItem {...card} />
    ))}
  </div>
)

// Input Form
const Form = (props) => {
  const [item, setItem] = useState('')
  const [rate, setRate] = useState('1')

  const handleSubmit = event => {
    event.preventDefault()
    props.onSubmit({key: item, itemName: truncate(item), rate: rate})
    setItem('')
  }

  function truncate(str){
    return (str.length > 13) ? str.substr(0, 12) + '...' : str;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Status Bar</h2>
      <div className='form-items'>
        <input
          type="text"
          value={item}
          onChange={event => setItem(event.target.value)}
          placeholder="Enter bar name..."
          required
        />
        <select
          name="rate"
          onChange={event => setRate(event.target.value)}
          defaultValue={props.defaultval}
          >
          <option value={0.2}>Very Slow</option>
          <option value={0.5}>Slow</option>
          <option value={1}>Default</option>
          <option value={2}>Fast</option>
          <option value={5}>Very Fast</option>
        </select>
        <button type="submit">Add bar</button>
      </div>
    </form>
  )
}

// Parent App
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