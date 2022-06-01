import React from 'react';
const { useState } = React;

const DeleteForm = (props) => {

    const [key, setKey] = useState('')

    const handleSubmit = event => {
        event.preventDefault()
        props.onSubmit(key)
        setKey(null)
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Delete Item</h2>
        <div className='form-items'>
          <select name="delete-list" onChange={event => setKey(event.target.selectedIndex)}>
            <option default>None</option>
            {props.cards.map((card) => {
                return <option key={card.itemName} value={card}>{card.itemName}</option>;
            })}
          </select>
          <button type="submit">Delete bar</button>
        </div>
      </form>
    )
  }

  export default DeleteForm;