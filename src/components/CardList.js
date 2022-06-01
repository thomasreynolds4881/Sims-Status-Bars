import React from 'react';
import StatusItem from './StatusItem';

const CardList = props => (
  <div className='status-bars'>
    {props.cards.map(card => (
      <StatusItem {...card} />
    ))}
  </div>
)

export default CardList;