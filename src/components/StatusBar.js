import React from 'react';

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

export default StatusBar;