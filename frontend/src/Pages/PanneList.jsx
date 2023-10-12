import React, { useEffect } from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import {IoArrowBackCircleSharp, IoArrowForwardCircle} from  "react-icons/io5"
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import Panne from '../Components/Table/Panne';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useAuthContext } from '../hooks/useAuthContext';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import ProgressionSelect from '../Components/Form/ProgressionSelect';
import './Style/PanneList.css'

export const PanneList = () => {
    const [add, setAdd] = useState(false);
    const [act, setAct] = useState(false);
    const [search, setSearch] = useState("");
    const [centredepot, setcentredepot] = useState("All");
    const [progres, setprogres] = useState("All");
    const [datedepot, setdatedepot] = useState();
    const [ProduitenPanne, setProduitenPanne] = useState([]);
    const { user } = useAuthContext();
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 15;
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const handleCentreInputChange = (newValue) => {
      setcentredepot(newValue);
    };
    const handleProgresInputChange = (newValue) => {
      setprogres(newValue);
    };
    const handleDateInputChange = (event) => {
      setdatedepot(event.target.value);
    };
    useEffect(() => {
      const fetchPannesData = async () => {
        try {
          const queryParams = new URLSearchParams({
            Role: user?.Role,
            CentreDepot: user?.Centre,
          });
    
          const response = await fetch(`https://streamsav.onrender.com/Pannes/?${queryParams}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          });
    
          if (response.ok) {
            const data = await response.json();
            setProduitenPanne(data.Pannes);
          } else {
            console.error("Error receiving Panne data:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching Panne data:", error);
        }
      };
    
      fetchPannesData();
    }, [user?.Role, user.CentreDepot, ProduitenPanne, user?.Centre, user?.token]);
    const handleNextPage = () => {
      if (currentPage < Math.ceil(ProduitenPanne.length / rowsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
    };
    
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
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
              <label>Date :</label>
              <input
              type="Date"
              className="class-search"
              placeholder="Date"
              onChange={handleDateInputChange}
            />
            </div>
            <div className="table-header-item">
            <CostumSelectCentre label='Centre:' onChange={handleCentreInputChange}/>
            </div>
            <div className="table-header-item">
              <ProgressionSelect label='Progression:' onChange={handleProgresInputChange}/>
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
            
          </div>
          <div className="table-patients">
            <table>
              <tr className="table-patients-header">
                <td className="table-patients-header-nom">Id</td>
                <td className="table-patients-header-annee">Nom Complet</td>
                <td className="table-patients-header-annee">Date</td>
                <td className="table-patients-header-willaya">Centre</td>
                <td className="table-patients-header-progress">Type de panne</td>
                <td className="table-patients-header-progress">Statue de garantie</td>
                <td className="table-patients-header-button">
                  <div className="pagination-buttons">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                      <IoArrowBackCircleSharp className='next-back-row-table'/>
                    </button>
                    <button onClick={handleNextPage} disabled={currentPage === Math.ceil(ProduitenPanne.length / rowsPerPage)}>
                      <IoArrowForwardCircle className='next-back-row-table'/>
                    </button>
                  </div>
                </td>
                <td className="table-patients-header-button"></td>
              </tr>
              {ProduitenPanne?.slice(startIndex, endIndex).filter((item) => {
                if (
                  (search.toLowerCase() === "" ||
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.Nom.toLowerCase().includes(search.toLowerCase()) ||
                    item.Prenom.toLowerCase().includes(search.toLowerCase())||
                    item.Progres.toString().includes(search.toLowerCase())||
                    item.CentreDepot.toLowerCase().includes(search.toLowerCase())||
                    item.ReferanceProduit.toLowerCase().includes(search.toLowerCase())||
                    item.TypePanne.toLowerCase().includes(search.toLowerCase())) &&
                  (datedepot == null || item.DateDepot.includes(datedepot)) &&
                  (progres === "All" || item.Progres.toString().includes(progres.toString())) &&
                  (centredepot === "All" || item.CentreDepot.toLowerCase().includes(centredepot.toLowerCase()))
                ) {
                  return item;
                }
              }).map((Panne) => (
                <TablePanneRow Panne={Panne} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
