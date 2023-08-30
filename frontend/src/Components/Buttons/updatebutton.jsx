import React from 'react'
import { RxUpdate } from "react-icons/rx";


const Updatebutton = () => {
  return (
    <div className="update-btn-class">
      <RxUpdate size={15} fill='#fff'/>
      <input type="submit" value="Modifier" className="voir-btn" />

    </div>
  )
}

export default Updatebutton