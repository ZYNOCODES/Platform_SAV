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
  const [progress, setProgress] = useState(0);
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
  const [selectedCheckboxLabel, setSelectedCheckboxLabel] = useState('');
  //Upload image to server
  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("id", id);
    formData.append("userID", user?.id);

    const result = await axios.post(
      "https://streamsav.onrender.com/Pannes/IMG",
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
          `https://streamsav.onrender.com/Pannes/${id}`,
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
          `https://streamsav.onrender.com/Pannes/All/${PanneData?.ReferanceProduit}/${id}`,
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
  const UpdatePanne = async (val, Act) => {
    const reponse = await fetch(`https://streamsav.onrender.com/Pannes/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        progres: val,userID: user?.id, action: `Mettre à jour la Progression avec ${Act} pour la panne ID= ${id}`
      }),
    });

    const json = await reponse.json();

    if (!reponse.ok) {
      notifyFailed(json.message);
    }
    if (reponse.ok) {
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
    const reponse = await fetch(`https://streamsav.onrender.com/Pannes/Garantie/${id}`, {
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
      setProgress(value);
      if (!disabledButtons[value - 1]) {
        if (value === 1) {
          UpdatePanne(value, "Panne en attente de depot a été vérifiée avec succès.");
        } else if (value === 2) {
          UpdatePanne(value, "Panne en attente de réparation a été vérifiée avec succès.");

        } else if (value === 3) {
          UpdatePanne(value, "Panne En reparation au centre a été vérifiée avec succès.");

        } else if (value === 4) {
          UpdatePanne(value, "Panne en attente de pickup a été vérifiée avec succès.");
        } else if (value === 5) {
          UpdatePanne(value, "Panne livrée a été vérifiée avec succès.");
        }else{
          UpdatePanne(value)
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
  //Go back to previous page
  const GoBackPressed = () => {
    if (PanneData?.Progres != 0) {
      navigate("/liste_des_pannes");
    } else {
      navigate(-1);
    }
  };
  //confirm the change of progress state
  const handleConfirm = (value) => {
    // Handle the "Confirmer" button click based on the selected value
    UpdatePanne(value);
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
              value={PanneData?.DateDepot}
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
              onConfirm={handleConfirm}
            />
            <Tooglebtn
              label="en attente de réparation"
              value={2}
              onChange={handleProgressChange}
              disabled={disabledButtons[1]}
              onConfirm={handleConfirm}
            />
            <Tooglebtn
              label="En reparation au centre"
              value={3}
              onChange={handleProgressChange}
              disabled={disabledButtons[2]}
              onConfirm={handleConfirm}
            />
            <Tooglebtn
              label="En attente de pickup"
              value={4}
              onChange={handleProgressChange}
              disabled={disabledButtons[3]}
              onConfirm={handleConfirm}
            />
            <Tooglebtn
              label="Livré au client"
              value={5}
              onChange={handleProgressChange}
              disabled={disabledButtons[4]}
              onConfirm={handleConfirm}
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
          onClose={handleCloseDialog}
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
        <ToastContainer />
      </div>
    </>
  );
};

export default DetailsPanneSav;
