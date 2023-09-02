import React from 'react'
import VoirButton from '../Buttons/buttonVoir';

import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';


function TablePanneRow ({Panne}){
  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  const Redirect =()=>{
    if(Panne.Progres === 0 && user?.Role === "SAV"){
      navigate(`/EnAttenteDeDepot/${Panne.id}`);
    }else{
      navigate(`/DetailPanneSav/${Panne.id}`)
    }
  }
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{Panne.id}</td>
      <td className="table-patients-td-nom">{Panne.Nom}{' '}{Panne.Prenom}</td>
      <td className="table-patients-td-annee">{Panne.DateDepot}</td>
      <td className="table-patients-td-willaya">{Panne.CentreDepot}</td>
      <td className="table-patients-td-region">{Panne.Progres}</td>
      <td className="table-patients-td table-patient-td-button">
        <VoirButton Redirect={Redirect}/>
      </td>
    </tr>
  )
}

export default TablePanneRow