import React from "react";
import { HiEllipsisVertical } from "react-icons/hi2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  scales: {
    xAxes: [
      {
        barThickness: 6, // number (pixels) or 'flex'
        maxBarThickness: 8, // number (pixels)
      },
    ],
  },
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const labels = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const data = {
  labels,
  datasets: [
    {
      label: "Nombre des Tickets Ouverts",
      data: [10, 15, 28, 12, 38, 34, 8],
      backgroundColor: "#DA171B",
      hoverBackgroundColor: "rgb(79, 129, 255)",

      barThickness: 16,
      borderRadius: 4,
    },
  ],
};

export default function MyChart() {
  return (
    <div className="dashboard-chart-container">
      <div className="chart-header">
        <a href="#">Nombre de Tickets ouverts</a>
        <div className="select-chart">
          <select
            className="nouveau-ne-chart"
            name="nouveau-ne-chart"
            id="nouveau-ne-chart"
          >
            <option value="day">Jour</option>
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
            <option value="year">An</option>
          </select>
          <HiEllipsisVertical
            className="chart-select-icon"
            size="24px"
            fill="#3889c1"
          />
        </div>
      </div>
      <div className="chart-line">
        <div className="chart-line-container"></div>
      </div>
      <div className="chart-nombre-nouveau-ne">
        <h2>
          120 <span>/Jour</span>
        </h2>
        <span className="title-chart">Nombre des Tickets</span>
      </div>
      <Bar className="chart-dashboard1" options={options} data={data} />
    </div>
  );
}
