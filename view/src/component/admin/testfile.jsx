
import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const ChartComponent = () => {
  let [data, setData] = useState([])
  let [dataY, setDataY] = useState([[[]]])
  let [final, setFinal] = useState([])
  // var final =[]
  let finalData =[[]]
  const fetchData = async () => {

    const response = await fetch('https://retoolapi.dev/gDa8uC/data');
    const jsonData = await response.json();
    setData(jsonData)
    const responseY = await fetch('https://retoolapi.dev/o5zMs5/data');
    const jsonDataY = await responseY.json();
    // setDataY(jsonDataY)
    setDataY(
      jsonDataY.map((item, index) => {
        return (
          [
            [jsonData[index].Label, parseFloat(jsonData[index].RandomNumber)],
            [item.Label, parseFloat(item.RandomNumber)],
          ]
        )
      })
    )
  }
  useEffect(() => {
    fetchData()
  }, [])


  const chartData = [
    ['Label', 'RandomNumber'],
    ...data.map(item => [item.Label, parseFloat(item.RandomNumber)]),
  ];
dataY.map((item, index) => {
  console.log('x',item[0][1])
  console.log('y',item[1][1])
  finalData[index]=[item[0][1], item[1][1]]

})

console.log('final data', finalData)

  console.log('final data', dataY[0][0][1])
  // console.log('final data', dataY[0])
  // setFinal(
  //   dataY.map(item => {
  //     return(
  //       [
  //         item[0][1]
  //       ]
  //     )
  //   })
  // )
  console.log("set final", final)
  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: 'Random Numbers Chart',
        hAxis: { title: 'Label', minValue: 0 },
        vAxis: { title: 'RandomNumber', minValue: 0 },
        chartArea: { width: '50%', height: '70%' },
      }}
    />
  );
};

export default ChartComponent;

// import React, { useEffect, useState } from "react";
// import { Scatter } from "react-chartjs-2";
// import {
//   Chart,
//   LinearScale,
//   PointElement,
//   Title,
//   CategoryScale,
//   Tooltip,
// } from "chart.js";
// import axios from "axios";

// Chart.register(CategoryScale, LinearScale, PointElement, Title, Tooltip);

// const test = () => {
//   const [chartData, setChartData] = useState(null);
//   const [yLabels, setYlabel] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const array1 = (await axios.get("https://retoolapi.dev/gDa8uC/data"))
//         .data;
//       const array2 = (await axios.get("https://retoolapi.dev/o5zMs5/data"))
//         .data;

//       // const array1 = [
//       //   { id: 1, label: "x1", valueX: 40 },
//       //   { id: 2, label: "x2", valueX: 50 },
//       //   { id: 3, label: "x3", valueX: 50 },
//       //   { id: 4, label: "x4", valueX: 50 },
//       // ];
//       // const array2 = [
//       //   { id: 1, label: "y1", valueY: 80 },
//       //   { id: 2, label: "y2", valueY: 50 },
//       //   { id: 3, label: "y3", valueY: 50 },
//       //   { id: 4, label: "y4", valueY: 50 },
//       // ];

//       console.log(array1);
//       const xLabels = array1.map((item) => item.Label);
//       setYlabel(array2.map((item) => item.Label));

//       const data = array1.map((item1) => {
//         const correspondingItem2 = array2.find(
//           (item2) => item2.id === item1.id
//         );
//         return {
//           x: item1.Label,
//           y: correspondingItem2 ? correspondingItem2.Label : null,
//           valueX: item1.RandomNumber,
//           valueY: correspondingItem2 ? correspondingItem2.RandomNumber : null,
//         };
//       });

//       setChartData({
//         labels: xLabels,
//         datasets: [
//           {
//             label: "Scatter Plot",
//             data: data,
//             backgroundColor: "rgba(136, 132, 216, 0.6)",
//             pointRadius: 8,
//             pointHoverRadius: 10,
//           },
//         ],
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div>
//       {chartData && (
//         <Scatter
//           data={chartData}
//           options={{
//             scales: {
//               x: {
//                 type: "category",
//                 position: "bottom",
//                 title: {
//                   display: true,
//                   text: "X-axis Label",
//                 },
//               },
//               y: {
//                 type: "category",
//                 position: "left",
//                 title: {
//                   display: true,
//                   text: "Y-axis Label",
//                 },
//                 labels: yLabels,
//               },
//             },
//             plugins: {
//               tooltip: {
//                 callbacks: {
//                   label: (tooltipItem) => {
                    
//                     const labelX = chartData.labels[tooltipItem.dataIndex];
//                     const labelY =
//                       chartData.datasets[0].data[tooltipItem.dataIndex].y;
//                     const valueX =
//                       chartData.datasets[0].data[tooltipItem.dataIndex].valueX;
//                     const valueY =
//                       chartData.datasets[0].data[tooltipItem.dataIndex].valueY;

//                     return   ${labelX}:${valueX} \n${labelY}:${valueY};
//                   },
//                 },
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };
// export default test;
