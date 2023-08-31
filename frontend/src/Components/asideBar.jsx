import { MdDashboard } from "react-icons/md";
import {FaList} from  "react-icons/fa"
import { BsFilePersonFill, BsFilePerson } from "react-icons/bs";
import { BsFillCalendarFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { NavLink, useLocation } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
export default function MyAsideBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const SubmitLogout = () => {
    logout();
  };

  const location = useLocation();
  return (
    <div className="asidebar">
      <aside className="aside">
        <ul>
          {user && user.Role === "Admin" &&(
            <li className="mb-6">
              <NavLink to="/Dashboard">
              <div
                  className={`link flex items-center justify-items-center ${
                    location.pathname === "/Dashboard" ? "aside-item-active" : ""
                  }`}
                >
                  <MdDashboard className="w-6 h-6 ml-2" />
                  <span className="title">Dashboard</span>
                </div>
              </NavLink>
            </li>
          )}
          
          <li className="mb-6">
            <NavLink to="/liste_des_pannes">
            <div
                className={`link flex items-center justify-items-center ${
                  location.pathname === "/liste_des_pannes" ? "aside-item-active" : ""
                }`}
              >
                <FaList className="w-6 h-6 ml-2" />
                <span className="title">Tickets Ouverts</span>
              </div>
            </NavLink>
          </li>
          {user && user.Role === "Admin" &&(
            <li className="mb-6">
            <NavLink to="/Utilisateurs">
            <div
                className={`link flex items-center justify-items-center ${
                  location.pathname === "/Dashboard" ? "aside-item-active" : ""
                }`}
              >
                <ImProfile className="w-6 h-6 ml-2" />
                <span className="title">Utilisateurs</span>
              </div>
            </NavLink>
          </li>
          )}
          

          <li>
            <NavLink to="">
              <div
                className={`link flex items-center justify-items-center ${
                  location.pathname === "" ? "aside-item-active" : ""
                }`}
              >
                <IoMdSettings className="w-6 h-6 ml-2" />
                <span className="title">Parametres</span>
              </div>
            </NavLink>
          </li>

          <li>
            <NavLink to="/">
              {user && (
                <div className="link flex items-center" onClick={SubmitLogout}>
                  <FiLogOut className="w-6 h-6 ml-2" />
                  <span className="title">Log Out</span>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className="lv"></div>
    </div>
  );
}
