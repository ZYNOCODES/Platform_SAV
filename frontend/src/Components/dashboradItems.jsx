import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";


export default function MyDashboradTop( {Data}) {
  return (
    <div className="dashboard-top">
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>
            Produits En attente depot
          </a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>{Data?.ProduitEnAttente ? Data?.ProduitEnAttente : '0'}</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>Produits deposés</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>{Data?.ProduitDeposes ? Data?.ProduitDeposes : '0'}</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>Produits reparés</a>
          <AiOutlineArrowUp fill="#008000" />
        </div>
        <div className="dashboard-nombre">
          <h3>{Data?.ProduitRepares ? Data?.ProduitRepares : '0'}</h3>
          <h3 className="dashboard-pourcentage-good">0%</h3>
        </div>
      </div>
      <div className="dashboard-item">
        <div className="dashboard-item-title">
          <a>
            Délai moyen de réparation
          </a>
        </div>
        <div className="dashboard-nombre">
          <h3>{Data?.DelaiMoyenReparation ? Data?.DelaiMoyenReparation : '00:00:00'}</h3>
        </div>
      </div>
    </div>
  );
}
