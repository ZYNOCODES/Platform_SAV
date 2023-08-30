import './FormInput.css'
import React from 'react'

const ProgressionSelect = (props) => {
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select>
        <option>En attente de depot</option>
        <option>Deposé en attente de reparation</option>
        <option>En reparation</option>
        <option>Reparé en attente de livraison</option>
        <option>Livré</option>
      </select>
    </div>
    
  )
}

export default ProgressionSelect