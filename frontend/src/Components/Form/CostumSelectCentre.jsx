import './FormInput.css'
import React from 'react'

const CostumSelectCentre = (props) => {
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select>
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

