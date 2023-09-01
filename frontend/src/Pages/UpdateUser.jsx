import React, { useEffect } from 'react'
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import { IoIosArrowBack } from "react-icons/io";
import {useParams, useNavigate} from 'react-router-dom';
import CostumSelect from '../Components/Form/CostumSelect';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../hooks/useAuthContext';

const UpdateUser = () => {
  const [act, setAct] = useState(false);
  const notifyFailed = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const navigate = useNavigate();
  const {id} = useParams();
  const { user } = useAuthContext();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ResetPassword, setResetPassword] = useState("");
  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [Role, setRole] = useState("");
  const [Centre, setCentre] = useState("");
  const [UserData, setUserData] = useState([]);
  const handleEmailInputChange = (newValue) => {
    setEmail(newValue);
  };
  const handlePasswordInputChange = (newValue) => {
    setPassword(newValue);
  };
  const handleResetPasswordInputChange = (newValue) => {
    setResetPassword(newValue);
  }
  const handleNomInputChange = (newValue) => {
    setNom(newValue);
  };
  const handlePrenomInputChange = (newValue) => {
    setPrenom(newValue);
  };
  const handleTelephoneInputChange = (newValue) => {
    setTelephone(newValue);
  };
  const handleRoleInputChange = (newValue) => {
    setRole(newValue);
  };
  const handleCentreInputChange = (newValue) => {
    setCentre(newValue);
  };
  //Get user data from server
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/User/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchUserData();
  }, [id, UserData, user?.token]);
  const UpdateUser = async () =>{
    const reponse = await fetch("http://localhost:8000/User", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        id: UserData.id,
        Nom : Nom,
        Prenom : Prenom,
        Email : Email,
        Telephone : Telephone,
        Role : Role,
        Centre : Centre,
        Password : Password,
        ResetPassword : ResetPassword
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
        notifyFailed(json.message);
    }
    if (reponse.ok) {
      notifySuccess(json.message);
      setTimeout(() => {
        navigate(-1)
      }, 2000)
    }
  }

  const GoBackPressed =()=>{
    navigate(-1);
  }
  return (
    <>
        <MyNavBar  act={act} setAct={setAct} />
        <MyAsideBar />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
                <h3>Modifier se utilisateur :</h3>
            </div>
            <div className='pannedetails-info'>
                <form>
                    <FormInput label='Nom:' placeholder={UserData.Nom} type='text' onChange={handleNomInputChange}/>
                    <FormInput label='Prenom:' placeholder={UserData.Prenom} type='text' onChange={handlePrenomInputChange}/>
                    <FormInput label='Email:' placeholder={UserData.Email} type='Email' onChange={handleEmailInputChange}/>
                    <FormInput label='Numero Tel:' placeholder={UserData.Telephone} type='text' onChange={handleTelephoneInputChange}/>
                </form>
                <form>
                    <CostumSelect label='Role:' value={UserData.Role} onChange={handleRoleInputChange}/>
                    <CostumSelectCentre label='Centre:' value={UserData.Centre} onChange={handleCentreInputChange}/>
                    <FormInput label='Mot de pass:' placeholder='Entrer Le Mot de pass' type='password' onChange={handlePasswordInputChange}/>
                    <FormInput label='Confirmation du mot de pass:' placeholder='Confirmer Le Mot De Pass' type='password'onChange={handleResetPasswordInputChange}/>
                    
                    <div className='userbtn'>
                        <input className="InputButton-User" type='button' value={'Annuler'} onClick={GoBackPressed}/>
                        <input className="InputButton-User" type='button' value={'Modifier'} onClick={UpdateUser}/>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    </>
  )
}

export default UpdateUser;