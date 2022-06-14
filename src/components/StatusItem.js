import React from 'react';
import StatusBar from './StatusBar';
import OpButton from './OpButton';
import img_hygiene from '../imgs/hygiene.png';
const { useState, useEffect } = React;

const StatusItem = props => {

    let [itemVal, setItemVal] = useState(150);
    const tick = 5; // how many seconds between ticks
  
    const changeVal = val => {
      let newVal = itemVal + val;
      if (newVal > 150) newVal = 150;
      setItemVal(newVal);
    }
  
    useEffect(() => {
      const interval = setInterval(() => {
        let newVal = itemVal - props.rate*tick;
        if (newVal > 0) {
          setItemVal(itemVal => itemVal - props.rate*tick);
        } else {
          setItemVal(itemVal => itemVal - itemVal);
        }
      }, tick*1000);
      return () => clearInterval(interval);
    }, [props.rate, itemVal, tick]);
  
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
  
  export default StatusItem;