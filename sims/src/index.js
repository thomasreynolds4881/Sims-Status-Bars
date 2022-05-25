import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const { useState, useEffect } = React;

// Child Minus/Add Button
const OpButton = ({val, onClick}) => {

  const handleClick = () => {
    onClick(val);
  }

  if (val === 5) {
    return (
      <div>
        <button onClick={handleClick}>+5</button>
      </div>
    )
  }

  else {
    return (
      <div>
        <button onClick={handleClick}>+10</button>
      </div>
    )
  }
  
};

// Child Status Bar
const StatusItem = ({itemName, rate}) => {

  let [itemVal, setItemVal] = useState(100);

  const changeVal = val => {
    let newVal = itemVal + val;
    if (newVal > 100) newVal = 100;
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

  return (
    <div className = "item">
      <p>{itemName} {Math.floor(itemVal)}</p>
      <div className = "buttons">
        <OpButton val={5} onClick={changeVal} />
        <OpButton val={10} onClick={changeVal}/>
      </div>
    </div>
  )
};

// Parent App
const App = () => {

  return (
    <div>
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
    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);