import React from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import Panne from '../Components/Table/Panne';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import AdduserButton from '../Components/Buttons/AdduserButton';
import UserRow from '../Components/Table/UserRow';

const Users = () => {
    const [add, setAdd] = useState(false);
    const [act, setAct] = useState(false);
    const history = useNavigate("/liste_des_pannes");
    const [search, setSearch] = useState("");
    const [Centre, setCentre] = useState("All");
    const [Progression, setProgression] = useState("All");
    const [Date, setDate] = useState("All");
    const [Users, setUsers] = useState([0]);
  return (
    <>
    <MyNavBar  act={act} setAct={setAct} />
      <MyAsideBar />
    <div className="Patients-Details">
      <div className="patient-table">
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="patient-table-container">
          <div className="patient-table-header">
            <div className="table-header-item">
              <label>Centre SAV</label>
              <select
                className="Wilaya-select"
                name="Wilaya-age"
                id="Wilaya-age"
              >
                <option value="All">Tous</option>
                <option value="Medea">Medea</option>
                <option value="Blida">Blida</option>
                <option value="Alger">Alger-Hamiz</option>
              </select>
            </div>
            <div className="table-header-item">
              <label>Recherche</label>
              <input
              type="search"
              className="class-search"
              placeholder="Search.."
              onChange={(e) => setSearch(e.target.value)}
            />
            </div>

            

<div className="table-header-item">
            <div className='add-user-btn'>
                <AdduserButton/>
            </div>
          </div>
            
          </div>

          <div className="table-patients">
            <table>
              <tr className="table-patients-header">
                <td className="table-patients-header-nom">Id</td>
                <td className="table-patients-header-nom">Nom Complet</td>
                <td className="table-patients-header-Email">Email</td>
                <td className="table-patients-header-nom">N Tel</td>
                <td className="table-patients-header-nom">Nom Utilisateur</td>
                <td className="table-patients-header-button"></td>
                <td className="table-patients-header-button"></td>

              </tr>
              <UserRow/>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Users