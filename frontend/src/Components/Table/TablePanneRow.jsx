import React, { useEffect } from 'react'
import VoirButton from '../Buttons/buttonVoir';

import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';


function TablePanneRow ({Panne}){
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [currentDate, setcurrentDate] = useState(new Date());
  const calculateDaysDifference = (databaseDate) => {
    if (databaseDate instanceof Date && !isNaN(databaseDate)) {
      const timeDifference = currentDate.getTime() - databaseDate.getTime();
      const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
      return daysDifference;
    }
  };
  const Redirect =()=>{
    if(Panne.Progres === 0 && user?.Role === "SAV"){
      navigate(`/EnAttenteDeDepot/${Panne.id}`);
    }else if(user?.Role === "SAV"){
      navigate(`/DetailPanneSav/${Panne.id}`)
    }else{
      navigate(`/Details/${Panne.id}`)
    }
  }
  var shouldHighlightRedRow = calculateDaysDifference(new Date(Panne.DateDepot)) > 3 && Panne.Progres < 3;
  var shouldHighlightOrangeRow = calculateDaysDifference(new Date(Panne.DateDepot)) > 3 && Panne.Progres >= 3 && Panne.Progres < 5;
  useEffect(() => {
    shouldHighlightRedRow = calculateDaysDifference() > 3 && Panne.Progres < 3;
    shouldHighlightOrangeRow = calculateDaysDifference() > 3 && Panne.Progres >= 3 && Panne.Progres < 5;
  },[shouldHighlightOrangeRow, shouldHighlightOrangeRow]);

  return (
    <tr className={`table-nouveau-ne-ligne${(shouldHighlightRedRow || shouldHighlightOrangeRow) ?
      (shouldHighlightRedRow ? ('-red-row') : (shouldHighlightOrangeRow ? '-orange-row' : '')): ''}`} >
      <td className="table-patients-td-nom">{Panne.id}</td>
      <td className="table-patients-td-nom">{Panne.Nom}{' '}{Panne.Prenom}</td>
      <td className="table-patients-td-annee">{Panne.DateDepot}</td>
      <td className="table-patients-td-willaya">{Panne.CentreDepot}</td>
      <td className="table-patients-td-region">{Panne.TypePanne}</td>
      <td className="table-patients-td-region">{Panne?.StatueGarantie}</td>
      <td className="table-patients-td table-patient-td-button">
        <VoirButton Redirect={Redirect} red={shouldHighlightRedRow}/>
      </td>
    </tr>
  )
}

export default TablePanneRow