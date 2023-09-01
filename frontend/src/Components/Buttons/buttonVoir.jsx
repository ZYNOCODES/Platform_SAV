import React from 'react'
import { FaRegEye } from "react-icons/fa";

export default function VoirButton({Redirect}) {
  return (
    <div className="voir-btn-class" onClick={Redirect}>
      <FaRegEye size={15} fill="#fff" />
      <input type="submit" value="Voir" className="voir-btn"/>
    </div>
  );
}
