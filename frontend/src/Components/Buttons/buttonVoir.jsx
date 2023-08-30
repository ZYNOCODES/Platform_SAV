import React from 'react'
import { FaRegEye } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

export default function VoirButton() {
  const navigate = useNavigate();

  const navigatetoPannedetails =()=>{
    navigate('/Details');
  }
  return (
    <div className="voir-btn-class">
      <FaRegEye size={15} fill="#fff" />
      <input type="submit" value="Voir" className="voir-btn" onClick={navigatetoPannedetails}/>
    </div>
  );
}
