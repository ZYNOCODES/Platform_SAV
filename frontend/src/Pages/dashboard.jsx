import { useState } from "react";
import "../App.css";
import MyAsideBarActive from "../Components/asideBarActive";
import MyDashboradCalendar from "../Components/dashboardCalendar";
import MyChart from "../Components/charts/dashboardChart";
import MyDashboradTop from "../Components/dashboradItems";
import TableTraitement from "../Components/Table/tableDashboardTraitement";
import SexeChart from "../Components/charts/dashboardChart2";
import MyAsideBar from "../Components/asideBar";
import MyNavBar from "../Components/navBar";

function Dashboard() {
  const [act, setAct] = useState(false);

  return (
    <>
      <MyNavBar  act={act} setAct={setAct} />
      <MyAsideBar />
      <div className="Dashboard">
        <MyAsideBarActive act={act} setAct={setAct}></MyAsideBarActive>
        <div className="dashboard-container">
          <MyDashboradTop></MyDashboradTop>
          <div className="dashboard-charts-calnedar">
            <MyChart></MyChart>
            <MyDashboradCalendar></MyDashboradCalendar>
          </div>
          {/*<TableTraitement></TableTraitement>
          <SexeChart></SexeChart>*/}
        </div>
      </div>
    </>
    
  );
}

export default Dashboard;
