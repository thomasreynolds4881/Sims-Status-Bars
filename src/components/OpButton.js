import React from 'react';

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

export default OpButton;