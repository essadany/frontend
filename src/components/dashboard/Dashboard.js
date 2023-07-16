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
        const numbers_of_claims = jsonData.map((item) => item.number_of_claims);
        const labels = jsonData.map((item) => item.bontaz_part_number);

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
  // Histogram of number of claims by month and status-----------------------------------------------------------------------------------------
  const [year1,setYear1] = useState(2023);
  const [data1,setData1] = useState(null);

  useEffect(() => {
    // Fetch your JSON data
    fetch('http://127.0.0.1:8000/api/claims_status_by_month')
  .then((response) => response.json())
  .then((jsonData) => {
    // Prepare an array of all months in French
    const allMonths = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    // Filter data for the specified year and extract the number_of_claims for existing months
    const filteredData1 = jsonData.filter((item) => item.claim_confirmed === "YES" && item.year === year1);
    const numbers_of_claims_confirmed = allMonths.map((month, index) => {
      const dataItem = filteredData1.find((item) => item.month === index + 1);
      return dataItem ? dataItem.number_of_claims : 0;
    });
    // Filter data for the specified year and extract the number_of_claims for existing months
    const filteredData2 = jsonData.filter((item) => item.claim_confirmed === "NO" && item.year === year1);
    const numbers_of_claims_not_confirmed = allMonths.map((month, index) => {
      const dataItem = filteredData2.find((item) => item.month === index + 1);
      return dataItem ? dataItem.number_of_claims : 0;
    });
    // Filter data for the specified year and extract the number_of_claims for existing months
    const filteredData3 = jsonData.filter((item) => item.claim_confirmed === "NOT CONFIRMED" && item.year === year1);
    const numbers_of_claims_in_process = allMonths.map((month, index) => {
      const dataItem = filteredData3.find((item) => item.month === index + 1);
      return dataItem ? dataItem.number_of_claims : 0;
    });
    const sumData1 = numbers_of_claims_confirmed.map((value, index) => value + numbers_of_claims_not_confirmed[index] + numbers_of_claims_in_process[index]);

    // Prepare the chart data using the extracted numbers_of_claims_confirmed
    const chartData1 = {
      labels: allMonths, // Use the French month names as labels
      datasets: [
        {
          label: 'Total',
          data: sumData1,
          backgroundColor: 'blue',
          barThickness: 15,
        },
        {
          label: 'Nombre de réclamations en cours de confirmation',
          data: numbers_of_claims_in_process,
          backgroundColor: 'orange',
          barThickness: 15,
        },
        {
          label: 'Nombre de réclamations confirmées',
          data: numbers_of_claims_confirmed,
          backgroundColor: 'red',
          barThickness: 15,
        },
        {
          label: 'Nombre de réclamations non confirmées',
          data: numbers_of_claims_not_confirmed,
          backgroundColor: 'green',
          barThickness: 15,
        },
        
      ],
    };

    // Set the chart data to the 'data1' state
    setData1(chartData1);
  })
  .catch((error) => {
    console.error('Error fetching JSON data:', error);
  });

  }, [year1]);
  const options1 = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
        },
      },
      y: {
        beginAtZero: true,
        title: {
        },
        suggestedMax: 10,
        suggestedMin: 0, // Set the minimum value on the Y-axis
      },
    },
  };

  // Histogram of number of 8D by month and status for the claims confirmed ------------------------------------------------------------------------
  const [year2,setYear2] = useState(2023);
  const [data2,setData2] = useState(null);

  useEffect(() => {
    // Fetch your JSON data
    fetch('http://127.0.0.1:8000/api/claims_confirmed/8d_status_by_month')
  .then((response) => response.json())
  .then((jsonData) => {
    // Prepare an array of all months in French
    const allMonths = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];

    const filteredData3 = jsonData.filter((item) => item['8d_status'] === "Submitted" && item.year === year2);
    const numbers_of_8d_submitted = allMonths.map((month, index) => {
      const dataItem = filteredData3.find((item) => item.month === index + 1);
      return dataItem ? dataItem.number_of_8d : 0;
    });
    const filteredData4 = jsonData.filter((item) => item['8d_status'] === "On going" && item.year === year2);
    const numbers_of_8d_opened = allMonths.map((month, index) => {
      const dataItem = filteredData4.find((item) => item.month === index + 1);
      return dataItem ? dataItem.number_of_8d : 0;
    });
    const sumData2 = numbers_of_8d_submitted.map((value, index) => value + numbers_of_8d_opened[index]);

    // Prepare the chart data using the extracted numbers_of_claims_confirmed
    const chartData2 = {
      labels: allMonths, // Use the French month names as labels
      datasets: [
        {
          label: 'Total',
          data: sumData2,
          backgroundColor: 'blue',
          barThickness: 15,
        },
        {
          label: '8D Soumis',
          data: numbers_of_8d_submitted,
          backgroundColor: 'green',
          barThickness: 15,
        },
        {
          label: '8D Ouverts',
          data: numbers_of_8d_opened,
          backgroundColor: 'orange',
          barThickness: 15,
        },
        
      ],
    };

    // Set the chart data to the 'data1' state
    setData2(chartData2);
  })
  .catch((error) => {
    console.error('Error fetching JSON data:', error);
  });

  }, [year2]);
  const options2 = {
    scales: {
      x: {
        beginAtZero: true,
        title: {
        },
      },
      y: {
        beginAtZero: true,
        title: {
        },
        suggestedMax: 10,
        suggestedMin: 0, // Set the minimum value on the Y-axis
      },
    },
  };

  //PPM-----------------------------------------------------------------------------------------------------------------------------------------
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
           }),
         })
         
         if (res.status === 200) {
           setShippedParts('');
           setObjectif(3);
         } else {
           alert("Some error occured, try again!");
         }
       } catch (err) {
         console.log(err);
       }
     };
    // Show Histogram of PPM---------------------------------------------------------------------------------------------------------------
    const [year3, setYear3] = useState(2023);
    const [data3, setData3] = useState(null);
    
    // French month names array
    const weeks = [];
    for (let week = 1; week <= 52; week++) {
      weeks.push("S" + week);
    }    
    useEffect(() => {
      // Fetch your JSON data
      fetch(`http://127.0.0.1:8000/api/year/${year3}/week_ppm`)
        .then((response) => response.json())
        .then((jsonData3) => {
          const filteredData5 = jsonData3.filter((item)=>item.week_ppm)
          const ppm_values = weeks.map((week, index) => {
            const weekData = filteredData5.find((item) => item.week === index + 1);
            return weekData ? weekData.week_ppm : 0;
          });
          const filteredData6 = jsonData3.filter((item)=>item.objectif)
          const objectif_values = weeks.map((week, index) => {
            const weekData = filteredData5.find((item) => item.week === index + 1);
            return weekData ? weekData.objectif : objectif;
          });
         
          const chartData3 = {
            labels: weeks,
            datasets: [
              {
                label: 'ppm value',
                data: ppm_values,
                backgroundColor: 'blue',
                barThickness: 15,
                type : 'bar'
              },
              {
                label: 'objectif value',
                data: objectif_values,
                backgroundColor: 'green',
                fill : false,
                type : 'line',

              },
            ],
          };
    
          setData3(chartData3);
        })
        .catch((error) => {
          console.error('Error fetching JSON data:', error);
        });
    }, [year3]);
    

    const options3 = {
      scales: {
        x: {
          beginAtZero: true,
          title: {
          },
        },
        y: {
          beginAtZero: true,
          title: {
          },
          suggestedMax: 10,
          suggestedMin: 0, // Set the minimum value on the Y-axis
        },
      },
    };

  // Show the choosen histogram------------------------------------------------------------------------------------------------------
  const [display_css1, setDisplay_css1] = useState('disabled');
  const [display_css2, setDisplay_css2] = useState('none');
  const [display_css3, setDisplay_css3] = useState('none');
  const [display_css4, setDisplay_css4] = useState('none');
  const [histogram, setHistogram] = useState('1');
  
  /*const ShowHistogram = () => {
    if (histogram === '1') {
      setDisplay_css1('disabled');
      setDisplay_css2('none');
      setDisplay_css3('none');
      setDisplay_css4('none');
    } else if (histogram === '2') {
      setDisplay_css1('none');
      setDisplay_css2('disabled');
      setDisplay_css3('none');
      setDisplay_css4('none');
    } else if (histogram === '3') {
      setDisplay_css1('none');
      setDisplay_css2('none');
      setDisplay_css3('disabled');
      setDisplay_css4('none');
    } else if (histogram === '4') {
      setDisplay_css1('none');
      setDisplay_css2('none');
      setDisplay_css3('none');
      setDisplay_css4('disabled');
    }
  };*/

  return (
    <>
      <div className='main'>
        <h2>Dashboard</h2>
        <div className='border'>
          <div>
            <form>
              <label>
                Histogram:
                <select
                  className='selectpicker form-select form-select-sm'
                 
                  onChange={(e) => 
                    setHistogram(e.target.value)
                  }
                >
                  <option value='1'>TOP 5 PRODUCTS CLAIMED</option>
                  <option value='2'>CLAIMS STATUS</option>
                  <option value='3'>8D STATUS OF CONFIRMED CLAIMS</option>
                  <option value='4'>PPM</option>
                </select>
              </label>
            </form>
          </div>
          {
            histogram==='1'&&<div>
            {data && <Bar width={500} height={200} data={data} options={options} />}
          </div>
          }
          {
            histogram==='2'&& <div>
            <form>
              <label>
                Year:
                <select
                  className='selectpicker form-select form-select-sm'
                  value={year1}
                  onChange={(e) => setYear1(Number(e.target.value))}
                >
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                </select>
              </label>
            </form>
            {data1 && <Bar width={500} height={200} data={data1} options={options1} />}
          </div>
          }
          {
            histogram==='3' && <div>
            <form>
              <label>
                Year:
                <select
                  className='selectpicker form-select form-select-sm'
                  value={year2}
                  onChange={(e) => setYear2(Number(e.target.value))}
                >
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                </select>
              </label>
            </form>
            {data2 && <Bar width={500} height={200} data={data2} options={options2} />}
          </div>
          }
          {
            histogram==='4' && <div>
            <div className='ppm'>
              <form style={{ width: '500px' }} className='row container' onSubmit={handleSubmit}>
                <div className='col-4'>
                  <label>
                    Year:
                    <select
                      className='selectpicker form-select form-select-sm'
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                    </select>
                  </label>
                </div>
                <div className='col-4'>
                  <label>
                    Month:
                    <select
                      className='selectpicker form-select form-select-sm'
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      <option value={new Date().getMonth() + 1}>{new Date().toLocaleString('default', { month: 'long' })}</option>
                    </select>
                  </label>
                </div>
                <div className='col-4'>
                  <label>
                    Week:
                    <select className='selectpicker form-select form-select-sm' value={week} onChange={(e) => setWeek(e.target.value)}>
                      <option disabled={week === 1} value={getCurrentWeekNumber() - 1}>
                        {getCurrentWeekNumber() - 1}
                      </option>
                      <option disabled={week === 1} value={getCurrentWeekNumber()}>
                        {getCurrentWeekNumber()}
                      </option>
                    </select>
                  </label>
                </div>
                <div className='col-4'>
                  <label>
                    Shipped Parts:
                    <input
                      type='number'
                      className='form-control form-control-sm'
                      value={shippedParts}
                      onChange={(e) => setShippedParts(e.target.value)}
                    />
                  </label>
                </div>
                <div className='col-4'>
                  <label>
                    Objectif:
                    <input
                      type='number'
                      className='form-control form-control-sm'
                      value={objectif}
                      onChange={(e) => setObjectif(e.target.value)}
                    />
                  </label>
                </div>
                <div className='col-4' style={{ textAlign: 'center' }}>
                  <Button variant='success' className='btn btn-sm' type='submit'>
                    Add PPM
                  </Button>
                </div>
              </form>
            </div>
            <form>
            <label>
              Year:
              <select
                className='selectpicker form-select form-select-sm'
                value={year3}
                onChange={(e) => setYear3(Number(e.target.value))}
              >
                <option value={2023}>2023</option>
                <option value={2024}>2024</option>
                <option value={2025}>2025</option>
                <option value={2026}>2026</option>
              </select>
            </label>
          </form>
          <div>{data3 && <Bar width={500} height={400} data={data3} options={options3} />}</div>
          </div>
          }
          
          
        </div>
      </div>
    </>
  );
}
