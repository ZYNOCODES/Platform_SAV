import React from 'react'
import { GrUpdate } from "react-icons/gr";


const Updatebutton = () => {
  return (
    <div className="update-btn-class">
      <GrUpdate size={15} fill="#fff" />
      <input type="submit" value="Modifier" className="voir-btn" />
    </div>
  )
}

export default Updatebutton