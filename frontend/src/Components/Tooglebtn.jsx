import React, { useEffect, useState } from 'react';
import './Style/tooglebtn.css';
import ReactSwitch from 'react-switch';

const Tooglebtn = ({ label, value, onChange, disabled }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (val) => {
    setChecked(val);
    if (val) {
      onChange(value);
    } else {
      onChange(0); // Reset to 0 if unchecked
    }
  };
  useEffect(() => {
    setChecked(disabled);
  }, [disabled]);
  return (
    <div className='toogle-button'>
      <h4>{label}</h4>
      <ReactSwitch
        className='toogle'
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default Tooglebtn;

