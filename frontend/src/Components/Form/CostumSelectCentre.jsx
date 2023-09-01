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
        {props.value && <option value={props.value}>{props.value}</option>}
        <option value={"All"||"all"}>All</option>
        <option value={"Direction General"||"direction general"}>Direction General</option>
        <option value={"Alger"||"alger"}>Alger</option>
        <option value={"Blida"||"blida"}>Blida</option>
        <option value={"Medea"||"medea"}>Medea</option>
        <option value={"Tipaza"||"tipaza"}>Tipaza</option>
        <option value={"Batna"||"batna"}>Batna</option>
        <option value={"Oran"||"oran"}>Oran</option>
        <option value={"Chlef"||"chlef"}>Chlef</option>
      </select>
    </div>
    
  )
}

export default CostumSelectCentre

