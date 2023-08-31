import React, { useEffect } from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import Panne from '../Components/Table/Panne';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import AdduserButton from '../Components/Buttons/AdduserButton';
import UserRow from '../Components/Table/UserRow';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import CostumSelect from '../Components/Form/CostumSelect';
import { useAuthContext } from '../hooks/useAuthContext';
const Users = () => {
    const [add, setAdd] = useState(false);
    const [act, setAct] = useState(false);
    const [search, setSearch] = useState("");
    const [centre, setcentre] = useState("All");
    const [role, setRole] = useState();
    const [UsersData, setUsersData] = useState([]);
    const { user } = useAuthContext();

    const handleCentreInputChange = (newValue) => {
      setcentre(newValue);
    };
    const handleRoleInputChange = (newValue) => {
      setRole(newValue);
    };
    useEffect(() => {
      const fetchUsersData = async () => {
        try {
          const response = await fetch(`http://localhost:8000/User`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setUsersData(data);
          } else {
            console.error("Error receiving Panne data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching Panne data:", error);
        }
      };
    
      fetchUsersData();
    }, [user?.id, UsersData]);
    const matchSearch = (item, search) => {
      const lowerSearch = search.toLowerCase();
      return (
        item.Telephone.toString().includes(lowerSearch) ||
        item.Nom.toLowerCase().includes(lowerSearch) ||
        item.Prenom.toLowerCase().includes(lowerSearch)
      );
    };

    const matchRole = (item, role) => {
      return role === "SAV" || item.Role.includes(role);
    };
    
    const matchCentre = (item, centre) => {
      return centre === "All" || item.Centre.toLowerCase().includes(centre.toLowerCase());
    };
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
            <CostumSelectCentre label='Centre:' onChange={handleCentreInputChange}/>
            </div>
            <div className="table-header-item">
            <CostumSelect label='Role:' onChange={handleRoleInputChange} value={role}/>
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
                <td className="table-patients-header-nom">Nom Complet</td>
                <td className="table-patients-header-Email">Email</td>
                <td className="table-patients-header-nom">Telephone</td>
                <td className="table-patients-header-nom">Role</td>
                <td className="table-patients-header-nom">Centre</td>
                <td className="table-patients-header-button"></td>
                <td className="table-patients-header-button"></td>
              </tr>
              {UsersData?.filter((item) => {
                const isMatchingSearch = matchSearch(item, search);

                if (item.Role && item.CentreDepot && item.Progres) {
                  const isMatchingRole = matchRole(item, role);
                  const isMatchingCentre = matchCentre(item, centre);
              
                  return isMatchingSearch && isMatchingCentre && isMatchingRole;
                } else {
                  return isMatchingSearch;
                }
              }).map((user) => (
                <UserRow User={user}/>
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Users