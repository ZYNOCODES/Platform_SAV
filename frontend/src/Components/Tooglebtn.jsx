import React, { useEffect, useState } from 'react';
import './Style/tooglebtn.css';
import ReactSwitch from 'react-switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

const Tooglebtn = ({ label, value, onChange, disabled, onConfirm }) => {
  const [checked, setChecked] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState([
    false, false, false, false, false
  ]);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false); // State for CircularProgress

  const handleChange = (val) => {
    setChecked(val);
    if (val) {
      setLoading(true); // Show CircularProgress
      // Simulate some asynchronous action
      setTimeout(() => {
        onChange(value);
        setLoading(false); // Hide CircularProgress
        handleClose();
      }, 2000); // You can adjust the delay as needed
    } else {
      onChange(0); // Reset to 0 if unchecked
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setChecked(disabled);
  }, [disabled]);

  return (
    <>
      <div className="toogle-button">
        <h4>{label}</h4>
        <ReactSwitch
          className="toogle"
          checked={checked}
          onChange={handleClickOpen}
          disabled={disabled || loading} // Disable the switch when loading
        />
      </div>

      <div>
        <Dialog
          open={open}
          onClose={false}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Confirmez-vous la sélection de l'état "${label}" ?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si vous passez à l'état suivant, vous ne pouvez pas revenir en arrière.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>Annuler</Button>
            <Button onClick={handleChange} autoFocus disabled={loading}>
              Confirmer
            </Button>
          </DialogActions>
          {loading && (
            <div className="CircularProgress-container">
              <CircularProgress className="CircularProgress" />
            </div>
          )}
        </Dialog>
      </div>
    </>
  );
};

export default Tooglebtn;
