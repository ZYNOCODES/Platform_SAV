import React from 'react'
import Updatebutton from '../Buttons/updatebutton'
import Deletebutton from '../Buttons/deletebutton'

function UserRow(User){
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{User.id}</td>
      <td className="table-patients-td-nom">{User.Nom}{' '}{User.Prenom}</td>
      <td className="table-patients-td-annee">{User.Email}</td>
      <td className="table-patients-td-willaya">{User.NumTel}</td>
      <td className="table-patients-td-region">{User.NomUtil}</td>
      <td className="btn-column">
        <Updatebutton/>
      </td>
      <td className="btn-column">
        <Deletebutton/>
      </td>
    </tr>
  )
}

export default UserRow