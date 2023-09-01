import React,{ useState } from 'react'
import './Style/tooglebtn.css'
import ReactSwitch from 'react-switch';
const Tooglebtn = (props) => {
    const [checked, setChecked] = useState(true);

    const handleChange = val => {
      setChecked(val)
    }
  return (
    <div className='toogle-button'>
        <h4>{props.label}</h4>
        <ReactSwitch
        className='toogle'
        checked={checked}
        onChange={handleChange}
      />
    </div>
  )
}

export default Tooglebtn