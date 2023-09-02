import React, { useEffect } from 'react'
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import Progress from '../Components/Progress';
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate, useParams} from 'react-router-dom';
import {BsCardImage} from"react-icons/bs"
import{AiOutlineCloudUpload}from"react-icons/ai"
import TablePanneRow from '../Components/Table/TablePanneRow';
import PanneTest from '../Components/Table/PanneTest';
import { useAuthContext } from '../hooks/useAuthContext';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooglebtn from '../Components/Tooglebtn';

const DetailsPanneSav = () => {
    const notifyFailed = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);
    const [ProductData, setProductData] = useState([]);
    const [act, setAct] = useState(false);
    const navigate = useNavigate();
    const [PanneData, setPanneData] = useState();
    const {id} = useParams();
    const { user } = useAuthContext();
    const [progress, setProgress] = useState(0);
    const [disabledButtons, setDisabledButtons] = useState([
        false, false, false, false, false]);
    //Get panne data from server
    useEffect(() => {
        const fetchPanneData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/Pannes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            });
    
            if (response.ok) {
            const data = await response.json();
            setPanneData(data);
            } else {
            console.error("Error receiving Panne data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching Panne data:", error);
        }
        };
    
        fetchPanneData();
    }, [id, PanneData, user?.token]);
    //Get panne data from server
    useEffect(() => {
        const fetchAllPannesDataOfProduct = async () => {
          try {
            const response = await fetch(`http://localhost:8000/Pannes/All/${PanneData?.ReferanceProduit}/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user?.token}`,
              },
            });
      
            if (response.ok) {
              const data = await response.json();
              setProductData(data.Pannes);
            } else {
              console.error('Error receiving Panne data:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching Panne data:', error);
          }
        };
      
        fetchAllPannesDataOfProduct();
      }, [id, user?.token, PanneData?.ReferanceProduit, ProductData]);
    const UpdatePanne = async (val) =>{
        const reponse = await fetch(`http://localhost:8000/Pannes/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ 
            progres : val,
          }),
        });
    
        const json = await reponse.json();
    
        if (!reponse.ok) {
            notifyFailed(json.message);
        }
        if (reponse.ok) {
            notifySuccess("Panne Updated");
        }
    }
    //Update progress state when a toggle button is clicked
    const handleProgressChange = (value) => {
        // Create a copy of the disabledButtons array and update it
        const updatedDisabledButtons = disabledButtons.map((_, index) => index < value - 1);
        setDisabledButtons(updatedDisabledButtons);
        setProgress(value);
        if (!disabledButtons[value - 1]) {
          // Call UpdatePanne when the button is checked
          UpdatePanne(value);
        } else {
          // Call UpdatePanne with a value of 0 when the button is unchecked
          UpdatePanne(0);
        }
      };
    //Function to handle unchecking a button
    const handleUncheck = (value) => {
        // Create a copy of the disabledButtons array and uncheck the current button
        const updatedDisabledButtons = [...disabledButtons];
        updatedDisabledButtons[value - 1] = false;
        setDisabledButtons(updatedDisabledButtons);
        setProgress(value);
    };
    //Go back to previous page
    const GoBackPressed =()=>{
        navigate(-1);
    }
  return (
    <>
        <MyNavBar  act={act} setAct={setAct} />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
                <div className='back-button' onClick={GoBackPressed}>
                    <IoIosArrowBack className='icon' size={33} fill='#fff'/>
                </div>
                <h3>Details de panne :</h3>
            </div>
            <div className='pannedetails-info'>
            <form>
                    <FormInput label='Nom :' value={PanneData?.Nom} readOnly type='text'/>
                    <FormInput label='Prenom :' value={PanneData?.Prenom} readOnly type='text' />
                    <FormInput label='Email' value={PanneData?.Email} readOnly type='text' />
                    <FormInput label='Num Tel:' value={PanneData?.Telephone} readOnly type='text' />
                    <FormInput label='Wilaya:' value={PanneData?.Wilaya} readOnly type='text' />
                </form>
                <form>
                    <FormInput label='Referance de produit :' value={PanneData?.ReferanceProduit} readOnly type='text'/>
                    <FormInput label='Type de panne :' value={PanneData?.TypePanne} readOnly type='text' />
                    <FormInput label='Centre de depot:' value={"SAV de "+PanneData?.CentreDepot} readOnly type='text' />
                    <FormInput label='Date de depot:' value={PanneData?.DateDepot} readOnly type='text' />
                    <FormInput label='Description:' value={PanneData?.Description} readOnly type='text' />
                </form>
            </div>
            <div className='pannedetails-title progress'>
                <h3>Progression :</h3>
            </div>
            <div className=' progress-toogle'>
                <div className='left-toogle'>
                    <Tooglebtn label='En attente de depot' value={1} onChange={handleProgressChange} disabled={disabledButtons[0]} onClick={() => handleUncheck(0)} />
                    <Tooglebtn label='En attente de reparation' value={2} onChange={handleProgressChange} disabled={disabledButtons[1]} onClick={() => handleUncheck(1)}/>
                    <Tooglebtn label='En reparation au centre' value={3} onChange={handleProgressChange} disabled={disabledButtons[2]} onClick={() => handleUncheck(2)}/>
                    
                </div>
                <div className='right-toogle'>
                    <Tooglebtn label='Repare en attente de pickup' value={4} onChange={handleProgressChange} disabled={disabledButtons[3]} onClick={() => handleUncheck(3)}/>
                    <Tooglebtn label='Livre' value={5} onChange={handleProgressChange} disabled={disabledButtons[4]} onClick={() => handleUncheck(4)}/>
                    <div className="inputButton">
                    <AiOutlineCloudUpload size={25} fill="#fff" />
                    <label htmlFor="file-input" className="file-input-label">
                        Joindre une Photo
                    </label>
                    <input id="file-input" className="file-input"type="file"baccept="image/*"/>
                </div>
                </div>
            </div>
            <div className='image'>
                <BsCardImage size={330} fill='#DADADA'/>
            </div>
            {ProductData &&
                <div className='Historique-container'>
                    <div className='pannedetails-title Historique'>
                        <h3>Historique de reparation :</h3>
                    </div>
                    <div className='pannedetails-info'>
                        <div className="table-patients">
                            <table>
                                <tr className="table-patients-header">
                                <td className="table-patients-header-annee">ID</td>
                                    <td className="table-patients-header-annee">Reference</td>
                                    <td className="table-patients-header-annee">Date</td>
                                    <td className="table-patients-header-willaya">Centre</td>
                                    <td className="table-patients-header-region">Type de panne</td>
                                </tr>
                                {ProductData?.map((Panne) => (
                                    <PanneTest Panne={Panne}/>
                                ))}
                            </table>
                        </div>
                    </div>
                </div>
            }
            
            <ToastContainer />
        </div>
    </>
  )
}

export default DetailsPanneSav