import React from 'react';
import StatusItem from './StatusItem';

const CardList = props => (
  <div className='status-bars'>
    <StatusItem key='Example Bar' itemName='Example Bar' rate={1} />
    {props.cards.map(card => (
      <StatusItem {...card} />
    ))}
  </div>
)

export default CardList;