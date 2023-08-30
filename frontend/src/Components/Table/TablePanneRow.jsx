import React from 'react'
import VoirButton from '../Buttons/buttonVoir';

import { useState} from 'react';


function TablePanneRow ({Panne}){



  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{Panne.id}</td>
      <td className="table-patients-td-nom">{Panne.Nom}{' '}{Panne.Prenom}</td>
      <td className="table-patients-td-annee">{Panne.DateDepot}</td>
      <td className="table-patients-td-willaya">{Panne.CentreDepot}</td>
      <td className="table-patients-td-region">{Panne.progrès}</td>
      <td className="table-patients-td table-patient-td-button">
        <VoirButton/>
      </td>
    </tr>
  )
}

export default TablePanneRow