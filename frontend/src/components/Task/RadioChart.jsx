import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ["Completed", "Pending"],
  datasets: [
    {
      data: [1260, 570],
      backgroundColor: ["#50C878","#E74C3C"],
      hoverBackgroundColor: ["#40F27A", "#FA384F"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const RadioChart = () => {
  const totalTasks = chartData.datasets[0].data.reduce((a, b) => a + b, 0);

  return (
    <div style={{ textAlign: "center", padding: "5px", maxWidth: "200px" }}>
        <p className="text-xs">Task Completion status</p>
      <div style={{ position: "relative", width: "150px", height: "200px", marginTop: "10px" , left:"7%"}}>
        <Doughnut data={chartData} options={chartOptions} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
          <strong style={{ fontSize: "18px" }}>{totalTasks.toLocaleString()}</strong>
          <p style={{ fontSize: "12px", color: "#777" }}>Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default RadioChart;
