import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ data, labels }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Comidas",
        data: data, // debe de recibir un array
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Comidas en la última semana",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: labels, //debe de recibir un array
      },
    },
  });

  useEffect(() => {
    setChartData({
      ...chartData,
      series: [
        {
          name: "Comidas",
          data: data,
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          categories: labels,
        },
      },

    });
  }, [data, labels]);

  return (
    <div>
      <div id="lineChart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineChart;
