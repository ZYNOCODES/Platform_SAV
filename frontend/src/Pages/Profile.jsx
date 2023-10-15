import React, { useEffect } from "react";
import MyNavBar from "../Components/navBar";
import { useState } from "react";
import FormInput from "../Components/Form/FormInput";
import "./Style/detailspanne.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import DelaiRepRow from "../Components/Table/DelaiRepRow";




const Profile = () =>{
    const [act, setAct] = useState(false);
    const navigate = useNavigate();

    const GoBackPressed = () => {
        
        navigate(-1);
        
    };
    return (
        <>
        <MyNavBar  act={act} setAct={setAct} />
        <div className='pannedetails-container'>
            <div className='pannedetails-title'>
                <div className='back-button' onClick={GoBackPressed}>
                    <IoIosArrowBack className='icon' size={33} fill='#fff'/>
                </div>
                <h3>Details de panne</h3>
            </div>
            <div className='pannedetails-info'>
                <form>
                    <FormInput label='Nom :' value='Dekkiche' readOnly type='text'/>
                    <FormInput label='Prenom :' value='Dekkiche' readOnly type='text' />
                    <FormInput label='Email' value='Abdellahham06@gmail.com' readOnly type='text' />
                </form>
                <form>
                    <FormInput label='Num Tel:' value='0664601590' readOnly type='text' />
                    <FormInput label='Role :' value='DR centre' readOnly type='text' />
                    <FormInput label='Centre :' value='Blida' readOnly type='text' />
                    
                </form>
            </div>
            <div className='pannedetails-title progress'>
                <h3>Délai moyen de réparation pour chaque produit :</h3>

                
                <div className='GlobalInput '>
                    <h4>Globale :</h4>

                    <FormInput label='' value='02 jours et 48h' readOnly type='text'/>
                </div>

                <div className="searchclass">
                <input
                    type="search"
                    className="searchfield"
                    placeholder="Search.."
                   
                    />
                </div>
            </div>


             <div className="pannedetails-info">
              <div className="table-patients">
                <table>
                  <tr className="table-patients-header">
                    <td className="table-patients-header-annee">ID</td>
                    <td className="table-patients-header-annee">Date de depot</td>
                    <td className="table-patients-header-annee">Fin de reparation</td>
                    <td className="table-patients-header-willaya">Délai Moyen</td>
                    <td className="table-patients-header-willaya">Centre</td>
                    <td className="table-patients-header-region"></td>
                  </tr>

                  <DelaiRepRow/>

                  
                  
                </table>
              </div>
            </div>    
            
                
                
        </div>
    </>
    )
}
export default Profile