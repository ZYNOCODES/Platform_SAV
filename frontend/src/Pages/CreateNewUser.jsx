import React from 'react'
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import Progress from '../Components/Progress';
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate} from 'react-router-dom';
import CostumSelect from '../Components/Form/CostumSelect';
import CostumSelectCentre from '../Components/Form/CostumSelectCentre';

const CreateNewUser = () => {


  const navigate = useNavigate();

  const navigatetoUserList=()=>{
    navigate('/liste_des_pannes');
  }

    const [act, setAct] = useState(false);
    
  return (
    <>
        <MyNavBar  act={act} setAct={setAct} />
        <MyAsideBar />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
                <div className='back-button' onClick={navigatetoUserList}>
                    <IoIosArrowBack className='icon' size={33} fill='#fff'/>
                </div>
                
                <h3>Ajouter un utilisateur :</h3>
            </div>
            <div className='pannedetails-info'>
                <form>
                    <FormInput label='Nom:' placeholder=' Enter Le Nom' type='text'/>
                    <FormInput label='Prenom:' placeholder='Entrer Le Prenom' type='text' />
                    <FormInput label='Email:' placeholder="Enter L'adresse Email" type='Email' />
                    <FormInput label='Numero Tel:' placeholder=' Entrer Le Numero de Telephone' type='text' />
                    <FormInput label='Wilaya:' placeholder=' Entrer La Wilaya de Trvail' type='text' />
                </form>
                <form>
                    <CostumSelect label='Role:'/>
                    <CostumSelectCentre label='Centre:'/>
                    <FormInput label='Mot de pass:' placeholder='Entrer Le Mot de pass' type='password' />
                    <FormInput label='Confirmation du mot de pass:' placeholder='Confirmer Le Mot De Pass' type='password'/>
                    
                    <div className='userbtn'>
                        <input className="InputButton-User" type='reset' value={'Annuler'}/>
                        <input className="InputButton-User" type='submit' value={'Ajouter'}/>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default CreateNewUser;