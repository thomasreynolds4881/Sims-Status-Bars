import React from 'react';
const { useState } = React;

const Form = (props) => {
    const [item, setItem] = useState('')
    const [rate, setRate] = useState('1')
  
    const handleSubmit = event => {
      event.preventDefault()
      props.onSubmit({key: item, itemName: truncate(item), rate: rate})
      setItem('')
    }
  
    function truncate(str){
      return (str.length > 13) ? str.substr(0, 12) + '...' : str;
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>New Status Bar</h2>
        <div className='form-items'>
          <input
            type="text"
            value={item}
            onChange={event => setItem(event.target.value)}
            placeholder="Enter bar name..."
            required
          />
          <select
            name="rate"
            onChange={event => setRate(event.target.value)}
            defaultValue={props.defaultval}
            >
            <option value={0.2}>Very Slow</option>
            <option value={0.5}>Slow</option>
            <option value={1}>Default</option>
            <option value={2}>Fast</option>
            <option value={5}>Very Fast</option>
          </select>
          <button type="submit">Add bar</button>
        </div>
      </form>
    )
  }

  export default Form;