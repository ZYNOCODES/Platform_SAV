import './FormInput.css'
import React from 'react'

const PanneSelect = (props) => {
  const handleChange = (event) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <div className='forminput'>
      <label>{props.label}</label>
      <select onChange={handleChange}>
        <option value=''>Sélectionné votre panne</option>
        <option value="Fiche mal placée">Fiche mal placée</option>
        <option value="NDP">NDP</option>
        <option value="Standby">Standby</option>
        <option value="Ecran noir">Ecran noir</option>
        <option value="Ecran blanc">Ecran blanc</option>
        <option value="Pas d’affichage">Pas d’affichage</option>
        <option value="Mosaique">Mosaique</option>
        <option value="Pb d’image">Pb d’image</option>
        <option value="Trait vertical">Trait vertical</option>
        <option value="Trait horizontal">Trait horizontal</option>
        <option value="Tâche noire">Tâche noire</option>
        <option value="Bande vertical">Bande vertical</option>
        <option value="Bande horizontal">Bande horizontal</option>
        <option value="Bande noire">Bande noire</option>
        <option value="Pixel">Pixel</option>
        <option value="Particules">Particules</option>
        <option value="Dalle cassée">Dalle cassée</option>
        <option value="Pb de réceptrice IR">Pb de réceptrice IR</option>
        <option value="Pb de clavier">Pb de clavier</option>
        <option value="Pb de TLC">Pb de TLC</option>
        <option value="Blocage logo">Blocage logo</option>
        <option value="Blocage menu">Blocage menu</option>
        <option value="Pb de son">Pb de son</option>
        <option value="Bruit de son">Bruit de son</option>
        <option value="Arrêt après chauffe">Arrêt après chauffe</option>
        <option value="Standby après chauffe">Standby après chauffe</option>
        <option value="Ecran noir après chauffe">Ecran noir après chauffe</option>
        <option value="Pb Android">Pb Android</option>
        <option value="Problème HDMI, RCA, Tuner, USB">Problème HDMI, RCA, Tuner, USB</option>
        <option value="Blocage">Blocage</option>
        <option value="Pb baffe">Pb baffe</option>
        <option value="Pb HP">Pb HP</option>
        <option value="Pb de bouton ON/OFF">Pb de bouton ON/OFF</option>
        <option value="Pb réseau">Pb réseau</option>
        <option value="Pb Wifi">Pb Wifi</option>
        <option value="Pb application (YouTube, PlayStore, ….)">Pb application (YouTube, PlayStore, ….)</option>
        <option value="Sur chauffe">Sur chauffe</option>
        <option value="Pb connecteur">Pb connecteur</option>
        <option value="Branchement des fiches">Branchement des fiches</option>
        <option value="Branchement de LVDS">Branchement de LVDS</option>
        <option value="Branchement d’une nappe">Branchement d’une nappe</option>
        <option value="Shunt au niveau du MPCB">Shunt au niveau du MPCB</option>
        <option value="Changement de MPCB">Changement de MPCB</option>
        <option value="Changement de Sub Main">Changement de Sub Main</option>
        <option value="Changement de SMPS">Changement de SMPS</option>
        <option value="Changement de dalle">Changement de dalle</option>
        <option value="Changement de glass">Changement de glass</option>
        <option value="Changement de tactile">Changement de tactile</option>
        <option value="Changement de barrettes de LED (spécifier le nombre de barrettes)">Changement de barrettes de LED (spécifier le nombre de barrettes)</option>
        <option value="Changement de BLU">Changement de BLU</option>
        <option value="Changement de carte graphique">Changement de carte graphique</option>
        <option value="Changement d’inveter">Changement d’inveter</option>
        <option value="Changement de CPU">Changement de CPU</option>
        <option value="Modification diffuseur (et non pas tailler diffuseur, réparer diffuseur)">Modification diffuseur (et non pas tailler diffuseur, réparer diffuseur)</option>
        <option value="Changement de sheets">Changement de sheets</option>
        <option value="Changement de LVDS">Changement de LVDS</option>
        <option value="Isolation de la dalle">Isolation de la dalle</option>
        <option value="Changement de (le type spécifier)">Changement de … (spécifier le type et l’emplacement du composant sur la carte dans la description en bas) Exemple: Changement de circuit U12</option>
        <option value="Software (Et non pas Mise à jour)">Software (Et non pas Mise à jour)</option>
        <option value="Remise à zéro">Remise à zéro</option>
        <option value="Nettoyage de …">Nettoyage de …</option>
        <option value="Correction de soudure au niveau de … (spécifier l’endroit exacte)">Correction de soudure au niveau de … (spécifier l’endroit exacte)</option>
        <option value="Changement de la réceptrice IR">Changement de la réceptrice IR</option>
        <option value="Changement de clavier">Changement de clavier</option>
        <option value="Changement bouton ON/OFF">Changement bouton ON/OFF</option>
        <option value="Changement des HP">Changement des HP</option>
        <option value="Changement de l’interrupteur">Changement de l’interrupteur</option>
        <option value="Changement de fusible">Changement de fusible</option>
        <option value="Changement de flash Android">Changement de flash Android</option>
        <option value="Changement de cache arrière">Changement de cache arrière</option>
        <option value="RAS">RAS</option>
        <option value="Récupéré par le client sans réparation">Récupéré par le client sans réparation</option>
      </select>
    </div>
    
  )
}

export default PanneSelect
