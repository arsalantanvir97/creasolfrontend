import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'

export default function UserChart({ chartData }) {

    return (
        <Bar
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: false,
                        text: ""
                    },
                    legend: {
                        display: false
                    }
                }
            }}
        />
    )
}
