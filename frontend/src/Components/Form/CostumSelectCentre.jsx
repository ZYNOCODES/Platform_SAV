import { useAuthContext } from '../../hooks/useAuthContext';
import './FormInput.css'
import React, { useEffect, useState } from 'react'

const CostumSelectCentre = (props) => {
  const { user } = useAuthContext();

  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  const [SAV, setSAV] = useState([]);
  const [Agent, setAgent] = useState([]);
  useEffect(() => {
    const fetchSAVData = async () => {
      try {
        const response = await fetch('https://streamsav.onrender.com/SAV', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setSAV(data);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchSAVData();
  }, [SAV]);
  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await fetch('https://streamsav.onrender.com/Agent', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setAgent(data);
        } else {
          console.error("Error receiving Panne data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching Panne data:", error);
      }
    };
  
    fetchAgentData();
  }, [Agent]);
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        {user && user.Role === 'DRCentre' &&
          <>
          {props.value === 'DRCentre' ? 
            <option value={props.value}>{props.value}</option>
            :
            <>
              <option value=''>Sélectionné le centre</option>
              <option value={user.Centre}>{user.Centre}</option>
            </>
          }
          </>
        }
        {user && user.Role === 'Admin' &&
          <>
            <option value='All'>
              Sélectionné le centre
            </option>
            {SAV.map((sav) => (
              <option key={sav?.id} value={sav?.Region}>
                {sav?.Region}
              </option>
            ))}  
            {Agent.map((agent) => (
              <option key={agent?.id} value={agent?.Region}>
                {agent?.Region}
              </option>
            ))}
          </>           
        }
        {user && user.Role === 'SAV' &&
          <option value={user.Centre}>
            {user.Centre}
          </option>   
        }
      </select>
    </div>
    
  )
}

export default CostumSelectCentre

