import React from 'react'
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import Progress from '../Components/Progress';
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate} from 'react-router-dom';

const DetailsPanne = () => {


  const navigate = useNavigate();

  const navigatetoPannelist =()=>{
    navigate('/liste_des_pannes');
  }

    const labelArray = ['En attente de depot', 'En attente de reparation', 'En reparation', 'Repare en attente de pick up', 'Livre']
    const [currentStep, updateCurrentStep] = useState(1);
    const [act, setAct] = useState(false);
    function updateStep(step) {
        updateCurrentStep(step);
    }
  return (
    <>
        <MyNavBar  act={act} setAct={setAct} />
        <MyAsideBar />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
                <div className='back-button' onClick={navigatetoPannelist}>
                    <IoIosArrowBack className='icon' size={33} fill='#fff'/>
                </div>
                <h3>Details de panne</h3>
            </div>
            <div className='pannedetails-info'>
                <form>
                    <FormInput label='Nom :' placeholder=' Dekkiche' type='text'/>
                    <FormInput label='Prenom :' placeholder='Abdallah' type='text' />
                    <FormInput label='Email' placeholder=' Abdellahham06@gmail.com' type='text' />
                    <FormInput label='Num Tel:' placeholder=' 0664601590' type='text' />
                    <FormInput label='Wilaya:' placeholder=' Blida' type='text' />
                </form>
                <form>
                    <FormInput label='Description:' placeholder=' Remplacement afficheur' type='text' />
                    <FormInput label='Produit :' placeholder='6547893' type='text'/>
                    <FormInput label='Type de panne :' placeholder='Afficheur' type='text' />
                    <FormInput label='Centre:' placeholder=' Sav Blida' type='text' />
                    <FormInput label='Description:' placeholder=' Remplacement afficheur' type='text' />
                </form>
            </div>
            <div className='pannedetails-title progress'>
                <h3>Progression</h3>
            </div>

            <div className='pannedetails-info progressbar'>
                <Progress labelArray={labelArray} currentStep={currentStep} updateStep={updateStep}></Progress>
            </div>
        </div>
    </>
  )
}

export default DetailsPanne