import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const { useState, useEffect } = React;

// Child Minus/Add Button
const OpButton = ({val, onClick}) => {

  const handleClick = () => {
    onClick(val);
  }

  return (
    <div>
      <button onClick={handleClick}>+</button>
    </div>
  )
  
};

// Child Status Bar
const StatusBar = (props) => {
  const { curr } = props;

  let curr_color;
  if (curr > 66) curr_color = '#00FF00';
  else if (curr > 33) curr_color = '#FFFF00';
  else curr_color = '#FF0000';


  const containerStyles = {
    height: 20,
    width: '150px',
    backgroundColor: "#e0e0de",
    borderRadius: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${curr}px`,
    backgroundColor: `${curr_color}`,
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
      let newVal = itemVal - rate/1;
      if (newVal > 0) {
        setItemVal(itemVal => itemVal - rate/1);
      } else {
        setItemVal(itemVal => itemVal - itemVal);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [rate, itemVal]);

  return (
    <div className = "item">
      <p>{itemName}</p>
      <div className="status">
        <StatusBar curr={Math.floor(itemVal)} />
      </div>
      <div className = "buttons">
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