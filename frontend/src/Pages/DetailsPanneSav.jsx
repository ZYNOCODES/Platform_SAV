import React, { useEffect } from "react";
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";
import { useState } from "react";
import FormInput from "../Components/Form/FormInput";
import "./Style/detailspanne.css";
import Progress from "../Components/Progress";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";
import TablePanneRow from "../Components/Table/TablePanneRow";
import PanneTest from "../Components/Table/PanneTest";
import { useAuthContext } from "../hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tooglebtn from "../Components/Tooglebtn";
import axios from "axios";
import imageframe from "../Components/assets/imageframe.png";
import { Box, Checkbox, FormControlLabel } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import moment from 'moment-timezone';
import { Fa1 } from "react-icons/fa6";
import { CircularProgress } from '@mui/material';

const DetailsPanneSav = () => {
  const notifyFailed = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const [ProductData, setProductData] = useState([]);
  const [act, setAct] = useState(false);
  const navigate = useNavigate();
  const [PanneData, setPanneData] = useState();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [image, setSelectedImage] = useState(null);
  const [ToggleValue, setToggleValue] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [sousGarantieChecked, setSousGarantieChecked] = useState(false);
  const [horsGarantieChecked, setHorsGarantieChecked] = useState(false);
  const [sousReserveChecked, setSousReserveChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogPDF, setOpenDialogPDF] = useState(false);
  const [selectedCheckboxLabel, setSelectedCheckboxLabel] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for CircularProgress
  const [lableACT, setlableACT] = useState('');
  const [CodePostal, setCodePostal] = useState('0');

  //Upload image to server
  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);
    formData.append("userID", user?.id);

    const result = await axios.post(
      "http://localhost:8000/Pannes/IMG",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (result.status === 200) {
      notifySuccess("Image a été téléchargée avec succès.");
    } else {
      notifyFailed("Erreur lors du téléchargement de l'image.");
    }
  };
  //Get panne data from server
  useEffect(() => {
    const fetchPanneData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/Pannes/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

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
  }, [id, PanneData, user?.token]);
  //Get all pannes data of a product from server
  useEffect(() => {
    const fetchAllPannesDataOfProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/Pannes/All/${PanneData?.ReferanceProduit}/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProductData(data.Pannes);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };

    fetchAllPannesDataOfProduct();
  }, [id, user?.token, PanneData?.ReferanceProduit, ProductData]);
  useEffect(() => {
    const fetchCodePostalData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/Willaya/${PanneData?.Wilaya}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setCodePostal(data.code);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchCodePostalData();
  }, [CodePostal, PanneData?.Wilaya]);
  //create pdf file and download it
  const createAndDownloadPdf = async () => {
    setLoading(true); // show CircularProgress
    try {
      if(ToggleValue === 3 || ToggleValue === 4 || ToggleValue === 5){
        if(PanneData?.BLPDFfile === null || PanneData?.BLPDFfile === undefined){
            const response = await fetch('http://localhost:8000/EmailGenerator/createPDF/BonV2', {
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
                    type: 'BL',  
                    postalCode: CodePostal
                })
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                if(response.ok){
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
            
                    if(pdfResponse.ok){
                        const pdfBlob = await pdfResponse.blob();
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(pdfBlob);
                        link.download = uniqueFilename;
                        link.click();
                        if (ToggleValue === 3) {
                          UpdatePanne(ToggleValue, "Panne En reparation au centre a été vérifiée avec succès.",uniqueFilename);
                        } else if (ToggleValue === 4) {
                          UpdatePanne(ToggleValue, "Panne en attente de pickup a été vérifiée avec succès.",uniqueFilename);
                        } else if (ToggleValue === 5) {
                          UpdatePanne(ToggleValue, "Panne livrée a été vérifiée avec succès.",uniqueFilename);
                        }
                    }
                }
        }else{
          if (ToggleValue === 4) {
            UpdatePanne(ToggleValue, "Panne en attente de pickup a été vérifiée avec succès.");
          } else if (ToggleValue === 5) {
            UpdatePanne(ToggleValue, "Panne livrée a été vérifiée avec succès.");
          }
        }
      }else if(ToggleValue === 1 || ToggleValue === 2){
        if (ToggleValue === 1) {
          UpdatePanne(ToggleValue, "Panne en attente de depot a été vérifiée avec succès.");
        } else if (ToggleValue === 2) {
          UpdatePanne(ToggleValue, "Panne en attente de réparation a été vérifiée avec succès.");
        }
      }
    } catch (error) {
        console.error('Fetch error:', error);
    }
  }
  //update pannes progress state
  const UpdatePanne = async (val, Act,uniqueFilename) => {
    const reponse = await fetch(`http://localhost:8000/Pannes/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        progres: val,userID: user?.id, action: `Mettre à jour la Progression avec ${Act} pour la panne ID= ${id}`,
        PDFFilename: uniqueFilename
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      setLoading(false); // Hide CircularProgress
      setOpenDialogPDF(false);
      if (val === 1) {
        notifySuccess(Act);
      } else if (val === 2) {
        notifySuccess(Act);
      } else if (val === 3) {
        notifySuccess(Act);
      } else if (val === 4) {
        notifySuccess(Act);
      } else if (val === 5) {
        notifySuccess(Act);
      }
    }
  };
  const UpdatePanneGarantie = async (val) => {
    const reponse = await fetch(`http://localhost:8000/Pannes/Garantie/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        StatueGarantie: val,userID: user?.id, action: `Mettre à jour le Statut Garantie avec ${val} pour la panne ID= ${id}`
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
      if (val === 'Sous Garantie') {
        notifySuccess("Sous Garantie a été vérifiée avec succès.");
      } else if (val === 'Hors Garantie') {
        notifySuccess("Hors Garantie a été vérifiée avec succès.");
      } else if (val === 'Sous Reserve') {
        notifySuccess("Sous Reserve a été vérifiée avec succès.");
      }
    }
  };
  // Update progress state when a toggle button is clicked
  const handleProgressChange = (value) => {
    if (PanneData?.Progres > 0) {
      const updatedDisabledButtons = disabledButtons.map(
        (_, index) => index < value - 1
      );
      setDisabledButtons(updatedDisabledButtons);
      setToggleValue(value);
      if (!disabledButtons[value - 1]) {
        setOpenDialogPDF(true);
        if(value === 1) {
          setlableACT("Panne en attente de depot a été vérifiée avec succès.");
        }else if(value === 2) {
          setlableACT("Panne En reparation au centre a été vérifiée avec succès.");
        }else if(value === 3) {
          setlableACT("Panne en attente de réparation a été vérifiée avec succès.");
        }else if(value === 4) {
          setlableACT("Panne en attente de pickup a été vérifiée avec succès.");
        }else if(value === 5) {
          setlableACT("Panne livrée a été vérifiée avec succès.");
        }
      } else {
        UpdatePanne(1);
      }
    }
  };
  // Handle the specific behaviors based on PanneData?.Progres
  useEffect(() => {
    if (PanneData?.Progres > 0) {
      switch (PanneData.Progres) {
        case 5:
          setDisabledButtons([true, true, true, true, true]);
          break;
        case 4:
          setDisabledButtons([true, true, true, true, false]);
          break;
        case 3:
          setDisabledButtons([true, true, true, false, false]);
          break;
        case 2:
          setDisabledButtons([true, true, false, false, false]);
          break;
        case 1:
          setDisabledButtons([true, false, false, false, false]);
          break;
        default:
          // Reset the disabledButtons state if PanneData.Progres doesn't match any case
          setDisabledButtons([false, false, false, false, false]);
          break;
      }
    }
  }, [PanneData?.Progres]);
  // handle checkbox change according to the PanneData?.StatueGarantie
  useEffect(() => {
    if (PanneData?.StatueGarantie && PanneData.StatueGarantie === 'Sous Garantie') {
      setSousGarantieChecked(true);
      setHorsGarantieChecked(false);
      setSousReserveChecked(false);
    } else if (PanneData?.StatueGarantie && PanneData.StatueGarantie === 'Hors Garantie') {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(true);
      setSousReserveChecked(false);
    } else if (PanneData?.StatueGarantie && PanneData.StatueGarantie === 'Sous Reserve') {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(true);
    } else {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(false);
    }
  }, [PanneData?.StatueGarantie]);
  //download pdf directly 
  const downloadPDFFile = async (filename) => {
    try {
      const response = await fetch(`http://localhost:8000/EmailGenerator/downloaderPDF/${filename}`);
      if (response.status === 200) {
        // If the file exists, trigger the download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      } else if (response.status === 404) {
        notifyFailed('File not found');
      } else {
        notifyFailed('Error downloading the file');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handledownloadBDPDFfile = () => {
    downloadPDFFile(PanneData?.BDPDFfile);
  }
  const handledownloadBLPDFfile = () => {
    downloadPDFFile(PanneData?.BLPDFfile);
  }
  //Go back to previous page
  const GoBackPressed = () => {
    if (PanneData?.Progres != 0) {
      navigate("/liste_des_pannes");
    } else {
      navigate(-1);
    }
  };
  // handle open the dialog based on the selected value
  const handleCheckboxClick = (label) => {
    setSelectedCheckboxLabel(label);
    setOpenDialog(true);
  };
  // handle close button click of the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  // handle open button click of the dialog
  const handleCloseDialogPDF = () => {
    setOpenDialogPDF(false);
  };
  // handle the "Confirmer" button click of the dialog
  const handleChange = () => {
    if (selectedCheckboxLabel === 'Sous Garantie') {
      setSousGarantieChecked(true);
      setOpenDialog(false);
      UpdatePanneGarantie('Sous Garantie');
    } else if (selectedCheckboxLabel === 'Hors Garantie') {
      setHorsGarantieChecked(true);
      setOpenDialog(false);
      UpdatePanneGarantie('Hors Garantie');
    }
  };
  // handle sous rederve check box change
  const handleSousReserveChange = () => {
    if (sousReserveChecked) {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(false);
      UpdatePanneGarantie(null);
    } else {
      setSousGarantieChecked(false);
      setHorsGarantieChecked(false);
      setSousReserveChecked(true);
      UpdatePanneGarantie('Sous Reserve');
    }
  };
  return (
    <>
      <MyNavBar act={act} setAct={setAct} />
      <div className="pannedetails-container">
        <div className="pannedetails-title">
          <div className="back-button" onClick={GoBackPressed}>
            <IoIosArrowBack className="icon" size={33} fill="#fff" />
          </div>
          <h3>Details de panne :</h3>
        </div>
        <div className="pannedetails-info form-section">
          <form>
            <FormInput
              label="Nom :"
              value={PanneData?.Nom}
              readOnly
              type="text"
            />
            <FormInput
              label="Prenom :"
              value={PanneData?.Prenom}
              readOnly
              type="text"
            />
            <FormInput
              label="Email"
              value={PanneData?.Email}
              readOnly
              type="text"
            />
            <FormInput
              label="Num Tel:"
              value={PanneData?.Telephone}
              readOnly
              type="text"
            />
            <FormInput
              label="Wilaya:"
              value={PanneData?.Wilaya}
              readOnly
              type="text"
            />
          </form>
          <form>
            <FormInput
              label="Referance de produit :"
              value={PanneData?.ReferanceProduit}
              readOnly
              type="text"
            />
            <FormInput
              label="Type de panne :"
              value={PanneData?.TypePanne}
              readOnly
              type="text"
            />
            <FormInput
              label="Centre de depot:"
              value={"SAV de " + PanneData?.CentreDepot}
              readOnly
              type="text"
            />
            <FormInput
              label="Date de depot:"
              value={formatDate(PanneData?.DateDepot)}
              readOnly
              type="text"
            />
            <FormInput
              label="Description:"
              value={PanneData?.Description}
              readOnly
              type="text"
            />
          </form>
        </div>
        <div className="pannedetails-title progress">
          <h3>Statue Garantie :</h3>
        </div>
        <div className="STATUEG">
        <div>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={sousGarantieChecked}
              onChange={() => handleCheckboxClick('Sous Garantie')}
              disabled={sousGarantieChecked || horsGarantieChecked || sousReserveChecked}
            />
          }
          label={
            <Box className="Box" component="div" fontSize={18} marginLeft={10}>
              Sous Garantie
            </Box>
          }
          labelPlacement="start"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={horsGarantieChecked}
              onChange={() => handleCheckboxClick('Hors Garantie')}
              disabled={horsGarantieChecked || sousGarantieChecked || sousReserveChecked}
            />
          }
          label={
            <Box component="div" fontSize={18} marginLeft={10}>
              Hors Garantie
            </Box>
          }
          labelPlacement="start"
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={sousReserveChecked}
              onChange={() =>handleSousReserveChange('Sous Reserve')}
              disabled={horsGarantieChecked || sousGarantieChecked}
            />
          }
          label={
            <Box component="div" fontSize={18} marginLeft={10}>
              Sous Réserve
            </Box>
          }
          labelPlacement="start"
        />
      </div>
        </div>
        <div className="pannedetails-title progress">
          <h3>Progression :</h3>
        </div>
        <div className=" progress-toogle">
          <div className="left-toogle">
            <Tooglebtn
              label="En attente de depot"
              value={1}
              onChange={handleProgressChange}
              disabled={disabledButtons[0]}
            />
            <Tooglebtn
              label="En reparation au centre"
              value={2}
              onChange={handleProgressChange}
              disabled={disabledButtons[1]}
            />
            <Tooglebtn
              label="Produit réparé"
              value={3}
              onChange={handleProgressChange}
              disabled={disabledButtons[2]}
            />
            <Tooglebtn
              label="En attente de pickup"
              value={4}
              onChange={handleProgressChange}
              disabled={disabledButtons[3]}
            />
            <Tooglebtn
              label="Livré au client"
              value={5}
              onChange={handleProgressChange}
              disabled={disabledButtons[4]}
            />
          </div>
          <div className="right-toogle">
            <div className="right-toogle-container">
              <label>Joindre une Photo</label>
              <form className="inputButton" encType="multipart/form-data">
                <AiOutlineCloudUpload size={25} fill="#fff" />
                <label htmlFor="file-input" className="file-input-label">
                  Joindre
                </label>
                <input
                  id="file-input"
                  className="file-input"
                  name="image"
                  type="file"
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
              </form>
            </div>

            <div className="image">
              {image ? (
                <img
                  onClick={uploadImage}
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  style={{ maxWidth: "350px", width: "100%", height: "310px" }}
                />
              ) : (
                <img
                  src={imageframe}
                  style={{maxWidth: "350px",width: "100%",height: "250px",marginTop: "30px",}}
                />
              )}
            </div>
          </div>
        </div>
        <div className="Historique-container">
            <div className="pannedetails-title Historique">
              <h3>Bon :</h3>
            </div>
            <div className="Bons-container">
              <div className="buttonbons bd">
                  <input type="submit" value="Bon de depot" onClick={handledownloadBDPDFfile} className="voir-btn" />
              </div>
              <div className="buttonbons bl">
                  <input type="submit" value="Bon de Livraison" onClick={handledownloadBLPDFfile} className="voir-btn" />
              </div>
            </div>
          </div>
        {ProductData && (
          <div className="Historique-container">
            <div className="pannedetails-title Historique">
              <h3>Historique de reparation :</h3>
            </div>
            <div className="pannedetails-info">
              <div className="table-patients">
                <table>
                  <tr className="table-patients-header">
                    <td className="table-patients-header-annee">ID</td>
                    <td className="table-patients-header-annee">Reference</td>
                    <td className="table-patients-header-annee">Date</td>
                    <td className="table-patients-header-willaya">Centre</td>
                    <td className="table-patients-header-region">
                      Type de panne
                    </td>
                  </tr>
                  {ProductData?.map((Panne) => (
                    <PanneTest Panne={Panne} />
                  ))}
                </table>
              </div>
            </div>
          </div>
        )}
        <Dialog
          open={openDialog}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Confirmez-vous la sélection de l'état "${selectedCheckboxLabel}" ?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si vous passez à l'état suivant, vous ne pouvez pas revenir en arrière.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Annuler</Button>
            <Button onClick={handleChange} autoFocus>
              Confirmer
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialogPDF}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          {!loading && (<>
            <DialogTitle id="alert-dialog-title">
                {`Confirmez-vous la sélection de l'état "${lableACT}" ?`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Si vous passez à l'état suivant, vous ne pouvez pas revenir en arrière.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialogPDF} disabled={loading}>Annuler</Button>
                <Button onClick={createAndDownloadPdf} autoFocus disabled={loading}>
                    Confirmer
                </Button>
            </DialogActions>
            </>)}
            {loading && (
            <div className="CircularProgress-container">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ce processus peut prendre du temps en fonction de votre connexion Internet. Veuillez patienter jusqu'à la fin.
                    </DialogContentText>
                </DialogContent>
              <CircularProgress className="CircularProgress" />
            </div>
            )}
        </Dialog>
        <ToastContainer />
      </div>
    </>
  );
};
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
export default DetailsPanneSav;
