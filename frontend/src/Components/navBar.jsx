import { useState } from "react";
import Logo from './assets/Logo.png'
import { useAuthContext } from "../hooks/useAuthContext";
export default function MyNavBar({ act, setAct }) {
  const { user } = useAuthContext();
  
  return (
    <div className="Navbar">
      <nav>
        <div className="left-nav">
          <div className="image">
            <img src={Logo} alt="logo" height={90}/>
          </div>
        </div>
        <div className="right-nav">
          <div className="doctor">
            <div className="doctor-name">
              {user && <span>{user.CentreDepot}</span>}
            </div>
          </div>
        </div>
      </nav>
      <div>
       
      </div>
    </div>
  );
}
