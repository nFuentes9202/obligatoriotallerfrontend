//Grafico cantidades por categorias
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = ({data, categorias}) => {
  const [chartData, setChartData] = useState({
    series: data,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: categorias,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });
  
  useEffect(() => {
    setChartData({
      ...chartData,
      series: data,
      options: { ...chartData.options, labels: categorias },
    });
  }, [categorias, data]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
