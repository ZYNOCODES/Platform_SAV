import React, { useEffect } from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import Panne from '../Components/Table/Panne';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useAuthContext } from '../hooks/useAuthContext';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import ProgressionSelect from '../Components/Form/ProgressionSelect';


export const PanneList = () => {
    const [add, setAdd] = useState(false);
    const [act, setAct] = useState(false);
    const history = useNavigate("/liste_des_pannes");
    const [search, setSearch] = useState("");
    const [Centre, setCentre] = useState("All");
    const [Progression, setProgression] = useState("All");
    const [Date, setDate] = useState("All");
    const [ProduitenPanne, setProduitenPanne] = useState([0]);
    const { user } = useAuthContext();
    useEffect(() => {
      const fetchPannesData = async () => {
          await fetch(`http://localhost:8000/Pannes/`, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.ok) {
              response
                .json()
                .then((data) => {
                  setProduitenPanne(data);
                })
                .catch((error) => {
                  console.error("Error fetching Panne data:", error);
                });
            } else {
              console.error("Error resieving Panne date", response.error);
            }
          });
      };
      fetchPannesData();
    }, [ProduitenPanne]);
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
            />
            </div>
            <div className="table-header-item">
            <CostumSelectCentre label='Centre:'/>
            </div>
            <div className="table-header-item">
              <ProgressionSelect label='Progression:'/>
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
                <td className="table-patients-header-region">Progression</td>
                <td className="table-patients-header-button"></td>
              </tr>
              {ProduitenPanne?.filter((item) => {
                if (search.toLowerCase() === "") {
                  if(user.CentreDepot === "DRMarketing"){
                    return item;
                  }else if(
                    item.CentreDepot === user.CentreDepot
                  ){
                    return item;
                  }
                } else if (
                  item.Nom.toLowerCase().includes(search.toLowerCase()) ||
                  item.Prenom.toLowerCase().includes(search.toLowerCase())
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
