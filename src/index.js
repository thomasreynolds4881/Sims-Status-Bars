import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import img_bladder from './imgs/bladder.png'
import img_fun from './imgs/fun.png'
import img_hunger from './imgs/hunger.png'
import img_social from './imgs/social.png'
import img_energy from './imgs/energy.png'
import img_hygiene from './imgs/hygiene.png'

const { useState, useEffect } = React;

// Child Button
const OpButton = ({val, onClick}) => {

  const handleClick = () => {
    onClick(val);
  }

  return (
    <div className="opbutton">
      <button onClick={handleClick}>+</button>
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
const StatusItem = ({itemName, rate}) => {

  let [itemVal, setItemVal] = useState(150);

  const changeVal = val => {
    let newVal = itemVal + val;
    if (newVal > 150) newVal = 150;
    setItemVal(newVal);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let newVal = itemVal - rate/10;
      if (newVal > 0) {
        setItemVal(itemVal => itemVal - rate/10);
      } else {
        setItemVal(itemVal => itemVal - itemVal);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [rate, itemVal]);

  let curr_img;
  if (itemName === "Bladder") curr_img = img_bladder;
  else if (itemName === "Fun") curr_img = img_fun;
  else if (itemName === "Hunger") curr_img = img_hunger;
  else if (itemName === "Social") curr_img = img_social;
  else if (itemName === "Energy") curr_img = img_energy;
  else curr_img = img_hygiene;

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
      <p>{itemName}</p>
      <div className="status">
        <img style={imgStyles} src={curr_img} alt="" />
        <div>
          <StatusBar curr={Math.floor(itemVal)} col={curr_color} />
        </div>
      </div>
      <div className = "mybuttons">
        <OpButton val={10} onClick={changeVal}/>
      </div>
    </div>
  )
};

// Parent App
const App = () => {

  return (
    <div className='full'>
      <h1>User's Needs</h1>
      <div className="form">
        <div className='status_row'>
          <StatusItem itemName = {"Bladder"} rate = {4} />
          <StatusItem itemName = {"Hunger"} rate = {3} />
          <StatusItem itemName = {"Energy"} rate = {1} />
        </div>
        <div className='status_row'>
          <StatusItem itemName = {"Fun"} rate = {2} />
          <StatusItem itemName = {"Social"} rate = {2} />
          <StatusItem itemName = {"Hygiene"} rate = {2} />
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