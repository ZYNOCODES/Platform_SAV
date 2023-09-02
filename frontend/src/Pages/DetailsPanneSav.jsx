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
    const labelArray = ['Produit deposer', 'En attente de reparation', 'En reparation', 'Repare en attente de pick up', 'Livre']
    const [currentStep, updateCurrentStep] = useState(1);
    const [act, setAct] = useState(false);
    function updateStep(step) {
        updateCurrentStep(step);
    }
    const navigate = useNavigate();
    const [PanneData, setPanneData] = useState();
    const {id} = useParams();
    const { user } = useAuthContext();
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
      console.log(ProductData);
    const UpdatePanne = async () =>{
        const reponse = await fetch(`http://localhost:8000/Pannes/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ 
            progres : 1,
          }),
        });
    
        const json = await reponse.json();
    
        if (!reponse.ok) {
            notifyFailed(json.message);
        }
        if (reponse.ok) {
            notifySuccess(json.message);
        }
    }
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
            <div className='pannedetails-info progressbar'>
                <Progress labelArray={labelArray} currentStep={currentStep} updateStep={updateStep}></Progress>
            </div>
            <div className=' progress-toogle'>
                <div className='left-toogle'>
                    <Tooglebtn label='En attente de depot'/>
                    <Tooglebtn label='En attente de reparation'/>
                    <Tooglebtn label='En reparation au centre'/>
                    
                </div>
                <div className='right-toogle'>
                    <Tooglebtn label='Repare en attente de pickup'/>
                    <Tooglebtn label='Livre'/>
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