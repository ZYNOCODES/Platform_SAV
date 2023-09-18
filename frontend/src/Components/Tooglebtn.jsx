import React, { useEffect, useState } from 'react';
import './Style/tooglebtn.css';
import ReactSwitch from 'react-switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const Tooglebtn = ({ label, value, onChange, disabled }) => {
  const [checked, setChecked] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState([
    false, false, false, false, false]);
    const [progress, setProgress] = useState(0);


  const [open,setOpen] = React.useState(false);
   

  const handleChange = (val) => {
    setChecked(val);
    if (val) {
      onChange(value);
    } else {
      onChange(0); // Reset to 0 if unchecked
    }


  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  const handleUncheck = (value) => {
    handleChange();
    const updatedDisabledButtons = [...disabledButtons];
    updatedDisabledButtons[value - 1] = false;
    setDisabledButtons(updatedDisabledButtons);
    setProgress(value);
    handleClose();
};
  useEffect(() => {
    setChecked(disabled);
  }, [disabled]);
  return (
    <>
    <div className='toogle-button'>
      <h4>{label}</h4>
      <ReactSwitch
        className='toogle'
        checked={checked}
        onChange={handleClickOpen}
        disabled={disabled}
      />
    </div>

<div>
<Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogTitle id="alert-dialog-title">
    {"Etes-vous sure de vouloir passer a l'etat suivant?"}
  </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">
      Si vous passer a l'etat suivant, vous ne pouvez pas revenir en arriere.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} 
    
    
    >Annuller</Button>
    <Button onClick={() => handleUncheck()} autoFocus
    >
      Oui, Passer
    </Button>
  </DialogActions>
</Dialog>`
</div>
</>
    
  );
};

export default Tooglebtn;

