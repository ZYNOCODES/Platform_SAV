import React from 'react'
import {useNavigate} from 'react-router-dom';
import Updatebutton from '../Buttons/updatebutton'
import Deletebutton from '../Buttons/deletebutton'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserRow(User){
  const notify = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const DeleteUser = async () =>{
    const reponse = await fetch("http://localhost:8000/User", {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ 
        id: User.User.id
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notify(json.message);
    }
    if (reponse.ok) {
      notifySuccess(json.message);
    }
  }
  const navigate = useNavigate();

  const Redirect =()=>{
    navigate(`/UpdateUser/${User.User.id}`);
  }
  return (
    <tr className="table-nouveau-ne-ligne">
      <td className="table-patients-td-nom">{User.User.Nom}{' '}{User.User.Prenom}</td>
      <td className="table-patients-td-annee">{User.User.Email}</td>
      <td className="table-patients-td-willaya">{User.User.Telephone}</td>
      <td className="table-patients-td-region">{User.User.Role}</td>
      <td className="table-patients-td-region">{User.User.Centre}</td>
      <td className="btn-column">
        <Updatebutton Redirection={Redirect}/>
      </td>
      <td className="btn-column">
        <Deletebutton DeleteUser={DeleteUser}/>
      </td>
      <ToastContainer />
    </tr>
  )
}

export default UserRow