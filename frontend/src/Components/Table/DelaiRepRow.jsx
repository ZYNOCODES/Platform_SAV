import React from 'react'
import VoirButton from '../Buttons/buttonVoir';

const DelaiRepRow = () => {
  return (
    <tr className='table-nouveau-ne-ligne'>
        <td className="table-patients-td-nom">56784322</td>
        <td className="table-patients-td-annee">24-08-2023</td>
        <td className="table-patients-td-willaya">01-09-2023</td>
        <td className="table-patients-td-region"><div className='delaimoy'>06 jours</div></td>
        <td className="table-patients-td-region">Blida</td>
        <td className="table-patients-td table-patient-td-button">
          <VoirButton/>
        </td>
      </tr>
  )
}

export default DelaiRepRow