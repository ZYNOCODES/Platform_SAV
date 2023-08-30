import './FormInput.css'
import React from 'react'

const CostumSelect = (props) => {
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select>
        <option>Admin</option>
        <option>Centre</option>
        <option>Directeur Marketing</option>
      </select>
    </div>
    
  )
}

export default CostumSelect
