import './FormInput.css';
import React from 'react';

function CostumSelect(props, {Newoption}) {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };

  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        {props.value && <option value={props.value}>{props.value}</option>}
        <option value='All'>All</option>
        <option value='Admin'>Admin</option>
        <option value='SAV'>SAV</option>
        <option value='Directeur Marketing'>Directeur Marketing</option>
      </select>
    </div>
  );
}

export default CostumSelect;
