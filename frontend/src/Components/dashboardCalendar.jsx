import { React } from "react";
import { generateDate, months } from "../util/Calendar";
import check from "../util/cn";
import dayjs from "dayjs";
import { useState } from "react";
import{AiOutlineCaretRight} from"react-icons/ai";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function MyDashboradCalendar() {
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectdate] = useState(currentDate);

  return (
    <div className="dashboard-calendar-container">
      <div className="calendar-dashboard-header">
        <h2>Top 3 des produits :</h2>
      </div>
      <div className="w-96 h-96">
        <div className="dashboard-calendar-doctor-meet">
              <AiOutlineCaretRight size={30}/>
              <h2>Television Stream R894k </h2>
          </div>
          <div className="dashboard-calendar-doctor-meet">
              <AiOutlineCaretRight size={30}/>
              <h2>Climatiseur 3468</h2>
          </div>
          <div className="dashboard-calendar-doctor-meet">
              <AiOutlineCaretRight size={30}/>

              <h2>Frigo stream 4457 2018</h2>
          </div>
      </div>
      <div className="calendar-dashboard-header">
        <h2>Top 3 des Pannes :</h2>
      </div>
      <div className="w-96 h-96">
        <div className="dashboard-calendar-doctor-meet">
              <AiOutlineCaretRight size={30}/>
              <h2>Ecran noire </h2>
          </div>
          <div className="dashboard-calendar-doctor-meet">
            
              <AiOutlineCaretRight size={30}/>
              <h2>Piece R9123</h2>
          </div>
          <div className="dashboard-calendar-doctor-meet">
              <AiOutlineCaretRight size={30}/>

              <h2>Compresseur clim</h2>
          </div>
      </div>
    </div>
  );
}
