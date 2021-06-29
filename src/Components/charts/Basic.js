import React, { Component } from "react";
import Chart from "react-apexcharts";

class RadialBar extends Component {
  constructor(props) {
    super(props);

    var staff = props.staff;
    var female = props.female;
    var male = props.male;
    console.log(staff);
    this.state = {
      options: {
        stroke: {
          lineCap: "round",
        },
        legend: {
          show: true,
          position: "bottom",
          containerMargin: {
            top: 30,
          },
        },
        fill: {
          colors: ["#00ab55", "#6659ff"],
        },
        labels: ["Male", "Female"],

        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "70%",
            },

            dataLabels: {
              name: {
                color: "#333",
                fontSize: "20px",
              },
              value: {
                color: "#111",
                fontSize: "30px",
              },
              total: {
                show: true,
                label: "Total Staffs",
                color: "#888",
                fontSize: "15px",
                formatter: function (val) {
                  return staff;
                },
              },
            },
          },
        },
      },
      series: [male, female],
    };
  }

  render() {
    return (
      <div className="radialbar">
        <Chart
          options={this.state.options}
          series={this.state.series}
          legend={this.state.legend}
          type="radialBar"
          width="300"
        />
      </div>
    );
  }
}

export default RadialBar;
