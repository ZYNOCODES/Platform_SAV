import './FormInput.css';
import React from 'react';

const CostumSelect = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange} value={props.value}>
        <option>All</option>
        <option>Admin</option>
        <option>SAV</option>
        <option>Directeur Marketing</option>
      </select>
    </div>
  );
};

export default CostumSelect;
