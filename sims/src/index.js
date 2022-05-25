import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const { useState } = React;

// Child Minus/Add Button
const OpButton = ({val, onClick}) => {

  const handleClick = () => {
    onClick(val);
  }

  if (val === -1) {
    return (
      <div>
        <button onClick={handleClick}>-</button>
      </div>
    )
  }

  else {
    return (
      <div>
        <button onClick={handleClick}>+</button>
      </div>
    )
  }
  
};

// Child Status Bar
const StatusItem = ({itemName}) => {

  let [itemVal, setItemVal] = useState(100);

  const changeVal = val => {
    let newVal = itemVal + val * 10;
    if (newVal > 100) newVal = 100;
    if (newVal < 0) newVal = 0;
    setItemVal(newVal);
  }

  return (
    <div className = "item">
      <p>{itemName}: {itemVal}</p>
      <OpButton val={-1} onClick={changeVal} />
      <OpButton val={1} onClick={changeVal}/>
    </div>
  )
};

// Parent App
const App = () => {

  return (
    <div className="form">
      <h1>Status</h1>
      <StatusItem itemName = {"Bladder"} initVal = {100} />
      <StatusItem itemName = {"Fun"} initVal = {100} />
      <StatusItem itemName = {"Hunger"} initVal = {100} />
      <StatusItem itemName = {"Social"} initVal = {100} />
      <StatusItem itemName = {"Energy"} initVal = {100} />
      <StatusItem itemName = {"Hygiene"} initVal = {100} />
    </div>
  )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);