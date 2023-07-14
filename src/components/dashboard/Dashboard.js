import React, { useEffect } from 'react'
//import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

import { useState } from 'react';
import { Button } from 'react-bootstrap';

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

  //PPM--------------------------------------------------------------------------------------------------------------------------
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [week, setWeek] = useState(getCurrentWeekNumber());
  const [shippedParts, setShippedParts] = useState('');
  const [ppm, setPpm] = useState('');

  const [objectif, setObjectif] = useState(3);

  // Function to get the current week number
  function getCurrentWeekNumber() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

   // Add PPM ------------------------------------------------------------------------------------------------
   const [PPM, setPPM] = useState("");
   const [name, setName] = useState("");
   const [category, setCategory] = useState("");
   const [info, setInfo] = useState("");
   const [deleted, setDeleted] = useState(false);
   const [message, setMessage] = useState("");
   const [editB,setEditB] = useState(true);

   let handleSubmit = async (e) => {
       e.preventDefault();
       try {
         let res = await fetch("http://127.0.0.1:8000/api/ppm", {
           method: "POST",
           headers: {
               'Content-Type' : 'application/json'
           },
           body: JSON.stringify({
              year : year,
              month : month, 
              week : week,
             shipped_parts : shippedParts,
             objectif: objectif,
             ppm: ppm,
           }),
         })
         let resJson = await res.json();
         
         if (res.status === 200) {
           setShippedParts('');
         } else {
           alert("Some error occured, try again!");
         }
       } catch (err) {
         console.log(err);
       }
     };
  return (
    <>
        
        <div className='main'>
        <h2 >Dashboard</h2>
        <div  className='border'>
          <div className='ppm'>
          <form style={{width:'500px'}} className='row container' onSubmit={handleSubmit}>
          <div className='col-4'>
            <label>Year:
          <select className='selectpicker form-select form-select-sm' value={year} onChange={(e) => setYear(e.target.value)}>
            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          </select></label>
          </div>
          <div className='col-4'>
                <label>
              Month:
              <select className='selectpicker form-select form-select-sm' value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value={new Date().getMonth() + 1}>{new Date().toLocaleString('default', { month: 'long' })}</option>
              </select>
            </label>
          </div>
          <div className='col-4'>
              <label>
            Week :
            <select className='selectpicker form-select form-select-sm' value={week} onChange={(e) => setWeek(e.target.value)}>
            <option disabled={week===1}  value={getCurrentWeekNumber()-1}>{getCurrentWeekNumber()-1}</option>
              <option disabled={week===1} value={getCurrentWeekNumber()}>{getCurrentWeekNumber()}</option>
            </select>
          </label>
          </div>
          <div className='col-4'>
            <label>
              Shipped Parts:
              <input type="number" className="form-control form-control-sm" value={shippedParts} onChange={(e) => setShippedParts(e.target.value)} />
            </label>
          </div>
          <div className='col-4'>
          <label>
            Objectif:
            <input type="number" className="form-control form-control-sm" value={objectif} onChange={(e) => setObjectif(e.target.value)} />
          </label>
          </div>
          <div className='col-4' style={{textAlign:'center'}}>
          <Button variant='success' className='btn btn-sm' type="submit">Add PPM</Button>
          </div>
        
    </form>
          </div>
        
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
