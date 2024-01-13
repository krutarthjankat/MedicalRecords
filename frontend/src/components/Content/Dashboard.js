import React from "react";
import styles from "../../styles/Dashboard.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut} from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio:false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const statuslbl = [
  "Undetermined",
  "Good",
  "Fair",
  "Serious",
  "Critical",
  "Deceased",
];
const barlbl = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 1000),
      borderColor: "#2190e47a",
      backgroundColor: "#2190e47a",
    },
  ],
};
export const piedata = {
  labels: statuslbl,
  datasets: [
    {
      fill: true,
      label: "Patient Health Status",
      data: statuslbl.map(() => Math.random() * 100),
      borderColor: "lightblue",
      backgroundColor: ["gray", "green" ,"yellow" ,"orange" ,"red" ,"black"],
    },
  ],
};
export const bardata = {
  labels: barlbl,
  datasets: [
    {
      fill: true,
      label: "bar",
      data: barlbl.map(() => Math.random() * 100),
      borderColor: "navy",
      backgroundColor: ["gray", "green", "yellow", "orange", "red", "black"],
    },
  ],
};

function Dashboard() {
  return (
    <div className={`w-full d-flex flex-wrap`}>
      <div className={`${styles.line} m-2`}>
        <Line options={options} data={data} />
      </div>
      <div className={`${styles.status} m-2`}>
        <Doughnut
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: "Patient Status",
              },
            },
          }}
          data={piedata}
        />
      </div>
      <div className={`${styles.bar} m-2`}>
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Bar Label",
              },
            },
          }}
          data={bardata}
        />
      </div>
    </div>
  );
}
export default Dashboard;
