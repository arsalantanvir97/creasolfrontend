import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function PopularPackageChage({ chartData }) {
  return (
    <Pie
      data={chartData}
      options={{
        plugins: {
          title: {
            display: false,
            text: "",
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontSize: 16,
            },
          },
        },
      }}
    />
  );
}
