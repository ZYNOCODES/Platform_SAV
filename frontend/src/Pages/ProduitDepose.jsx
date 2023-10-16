import React, { useEffect } from 'react'
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState} from "react";
import FormInput from '../Components/Form/FormInput';
import './Style/detailspanne.css'
import Progress from '../Components/Progress';
import { IoIosArrowBack } from "react-icons/io";
import {useNavigate, useParams} from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { ToastContainer, toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment-timezone';

const ProduitDepose = () => {
    const [act, setAct] = useState(false);
    const notifyFailed = (message) => toast.error(message);
    const notifySuccess = (message) => toast.success(message);
    const navigate = useNavigate();
    const [PanneData, setPanneData] = useState();
    const {id} = useParams();
    const { user } = useAuthContext();


    const [open,setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const GoBackPressed =()=>{
        navigate(-1);
    }
    useEffect(() => {
        const fetchPanneData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/Pannes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user?.token}`,
            },
            });
    
            if (response.ok) {
            const data = await response.json();
            setPanneData(data);
            } else {
            console.error("Error receiving Panne data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching Panne data:", error);
        }
        };
    
        fetchPanneData();
        if (PanneData?.Progres === 1) {
            navigate(`/DetailPanneSav/${id}`)
        }
    }, [id, PanneData, user?.token, navigate]);
    const createAndDownloadPdf = async () => {
        try {
            const response = await fetch('http://localhost:8000/EmailGenerator/createPDF/BonV3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Nom: PanneData.Nom,
                    Prenom: PanneData.Prenom,
                    Email: PanneData.Email,
                    Telephone: PanneData.Telephone,
                    ReferanceProduit: PanneData.ReferanceProduit,
                    TypePanne: PanneData.TypePanne,
                    Wilaya: PanneData.Wilaya,
                    CentreDepot: PanneData.CentreDepot,
                    DateDepot: new Date().toISOString().slice(0, 10),
                })
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const uniqueFilename = await response.text();
    
            const pdfResponse = await fetch(`http://localhost:8000/EmailGenerator/fetchPDF?filename=${uniqueFilename}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf'
                }
            });
    
            if (!pdfResponse.ok) {
                throw new Error('Network response was not ok');
            }
    
            const pdfBlob = await pdfResponse.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = 'newPdf.pdf';
            link.click();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    const UpdatePanne = async () =>{
        handleClose();
        const reponse = await fetch(`http://localhost:8000/Pannes/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ 
            progres : 1, userID: user?.id, action: `deposer la panne ID= ${id}`,
          }),
        });
    
        const json = await reponse.json();
    
        if (!reponse.ok) {
            notifyFailed(json.message);
        }
        if (reponse.ok) {
            notifySuccess(json.message);
            createAndDownloadPdf();
            setTimeout(() => {
                navigate(`/DetailPanneSav/${id}`)
            }, 2000)
        }
    }
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
            <div className='pannedetails-info form-section'>
                <form>
                    <FormInput label='Nom :' value={PanneData?.Nom} readOnly type='text'/>
                    <FormInput label='Prenom :' value={PanneData?.Prenom} readOnly type='text' />
                    <FormInput label='Email' value={PanneData?.Email} readOnly type='text' />
                    <FormInput label='Num Tel:' value={PanneData?.Telephone} readOnly type='text' />
                    <FormInput label='Wilaya:' value={PanneData?.Wilaya} readOnly type='text' />
                </form>
                <form>
                    <FormInput label='Referance de produit :' value={PanneData?.ReferanceProduit} readOnly type='text'/>
                    <FormInput label='Type de panne :' value={PanneData?.TypePanne} readOnly type='text' />
                    <FormInput label='Centre de depot:' value={"SAV de "+PanneData?.CentreDepot} readOnly type='text' />
                    <FormInput label='Date de depot:' value={formatDate(PanneData?.DateDepot)} readOnly type='text' />
                    <FormInput label='Description:' value={PanneData?.Description} readOnly type='text' />
                </form>
            </div>

            <div className='pannedetails-Button1'>
                <button className='Cancel-btn' type='button' onClick={GoBackPressed}>Annuler</button>
                <button className='depose-btn' type='submit' onClick={handleClickOpen}>Deposer</button>
            </div>
            <ToastContainer />
        </div>

        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirmez-vous le dépôt de ce produit ? "}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Cette action permet de passe de l'etat en attente de depot a l'etat en attente de reparation.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} 
              
              
              >Annuller</Button>
              <Button onClick={UpdatePanne} autoFocus
             
              >
                Confirmer
              </Button>
            </DialogActions>
          </Dialog>
      </div>
    </>
  )
}
function formatDate(dateString) {
    const timeZone = 'Africa/Algiers'; // Algeria's time zone
    const date = moment(dateString).tz(timeZone);
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const month = monthNames[date.month()];
    const day = date.date();
    const year = date.year();
    const hours = date.hours();
    const minutes = date.minutes();
  
    const formattedDate = `${month} ${day}, ${year} at ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return formattedDate;
  
  }
export default ProduitDepose;