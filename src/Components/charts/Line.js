import React from "react";

import { Line } from "react-chartjs-2";


export default function App(props) {
  let xLabel = props.newtrydate
  let present = props.newpresent
  let absent = props.newabsent
  let leave = props.newleave

  const data =(canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 800);
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 800);
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 800);
    gradient.addColorStop(0, 'rgb(0, 171, 85,0.2)');
    gradient.addColorStop(0.19, 'rgb(0, 171, 85,0)');

    gradient1.addColorStop(0, 'rgb(255, 199, 25, 1)');
    gradient1.addColorStop(0.19, 'rgb(255, 199, 25,0)');

    gradient2.addColorStop(0, 'rgb(0,143,251, 1)');
    gradient2.addColorStop(0.19, 'rgb(0,143,251,0)');

    return {
    labels: xLabel,
    datasets: [
      {
        label: "Present",
        data: present,
        fill: true,
        borderColor: "rgb(0, 171, 85)",
        backgroundColor: gradient,
      },
      {
        label: "Absent",
        data: absent,
        fill: true,
        borderColor: "rgb(255, 199, 25)",
        backgroundColor: gradient1,
       
      }
      ,
      {
        label: "Leave",
        data: leave,
        fill: true,
        borderColor: "rgb(0,143,251)",
        backgroundColor: gradient2,

      }
    ]
  }
  };
  
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
          tension: 0.5
      }
  },
    plugins:{
      legend:{
        position:'bottom',
        labels: {
          boxWidth: 5,
          boxheight: 5,
          padding: 25,
          usePointStyle:true,
          font: {
            size: 14,
            weight: 700
        }
        },
      },
    },
    scales: {
      y: {
        min: 0,
        grid: {
          borderDash: [4, 4],
        }
      },
      x: {
        grid: {
          display:false
        }
      }
    }
  };
  return (
    <div >
      <Line data={data} options={options} height="240px" width="700px" />
    </div>
  );
}
