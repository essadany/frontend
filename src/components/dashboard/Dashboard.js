import React, { useEffect } from 'react'
//import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const users = [
    { name: 'John', salary: 50000 },
    { name: 'Jane', salary: 60000 },
    { name: 'Mike', salary: 70000 },
    // ... other users
  ];
  const [most_porducts_claimed,setMost_products_claimed]= useState([]);
  /*const getMostProductsClaimed = ()=>{
    fetch("http://127.0.0.1:8000/api/most_products_claimed")
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setMost_products_claimed(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }*/
  useEffect(() => {
    // Fetch your JSON data
    fetch('http://127.0.0.1:8000/api/most_products_claimed')
      .then((response) => response.json())
      .then((jsonData) => {
        // Process your JSON data to extract required information (e.g., salaries)
        const numbers_of_claims = jsonData.map((user) => user.number_of_claims);
        const labels = jsonData.map((user) => user.bontaz_part_number);

        // Prepare the chart data using the extracted salaries
        const chartData = {
          labels:labels,
          datasets: [
            {
              label: 'Number of Claims',
              data: numbers_of_claims,
              backgroundColor: 'blue',
              barThickness: 20, 
            },
          ],
        };

        // Set the chart data to the 'data' state
        setData(chartData);
      })
      .catch((error) => {
        console.error('Error fetching JSON data:', error);
      });
  }, []);
  const options = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Products Reference',
          color : 'green',
          fontSize : 40, 
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nomber Of claims',
          color : 'orange',
          fontSize : 40, 
        },
        suggestedMax: 8,
          suggestedMin: 0, // Set the minimum value on the Y-axis
      },
    },
  };
  return (
    <>
        
        <div className='main'>
        <h2 >Dashboard</h2>
        <div  className='border'>
          <div className='histogram'>
            <div>
              {data && <Bar  width={500} height={400} data={data} options={options}/>}
            </div>
            <div>
              {data && <Bar  width={500} height={400} data={data} options={options}/>}
            </div>
            <div>
              {data && <Bar  width={500} height={400} data={data} options={options}/>}
            </div>
            <div>
              {data && <Bar  width={500} height={400} data={data} options={options}/>}
            </div>
          </div>
        </div>
        
    </div>
    
    </>
    
  )
}
