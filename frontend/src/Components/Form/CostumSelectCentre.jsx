import './FormInput.css'
import React from 'react'

const CostumSelectCentre = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        <option>Direction General</option>
        <option>Direction Marketing</option>
        <option>Sav Alger Hamiz</option>
        <option>Sav Blida</option>
        <option>Sav Medea</option>
        <option>Sav Tipaza</option>
        <option>Sav Batna</option>
        <option>Sav Oran</option>
      </select>
    </div>
    
  )
}

export default CostumSelectCentre

