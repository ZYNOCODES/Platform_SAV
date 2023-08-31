import './FormInput.css'
import React from 'react'

const ProgressionSelect = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select
      onChange={handleChange}>
        <option>All</option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>Reparé en attente de livraison</option>
        <option>Livré</option>
      </select>
    </div>
    
  )
}

export default ProgressionSelect