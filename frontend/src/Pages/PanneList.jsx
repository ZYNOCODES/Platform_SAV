import React, { useEffect } from 'react'
import MyAsideBarActive from '../Components/asideBarActive'
import { useNavigate } from 'react-router-dom';
import { useState} from "react";
import TablePanneRow from '../Components/Table/TablePanneRow';
import Panne from '../Components/Table/Panne';
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useAuthContext } from '../hooks/useAuthContext';


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
              <label>Date</label>
              <select
                className="Annee-select"
                name="Annee-age"
                id="Annee-age"
              >
                <option value="All">Tous</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
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
              <label>Progression</label>
              <select
                className="Region-select"
                name="Region-age"
                id="Region-age"
              >
                <option value="All">Tous</option>
                <option value="Medea">En attente</option>
                <option value="Blida">Trensferer au centrale</option>
                <option value="Alger">Reparé</option>
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
