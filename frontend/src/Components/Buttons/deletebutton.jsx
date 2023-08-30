import React from 'react'
import { AiFillDelete } from "react-icons/ai";

const Deletebutton = () => {
  return (
    <div className="update-btn-class">
      <AiFillDelete size={15} fill="#fff" />
      <input type="submit" value="Supprimer" className="voir-btn" />
    </div>
  )
}

export default Deletebutton