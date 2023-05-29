import  {React, useState, useEffect } from 'react';

const Table = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Simulating data fetching from the server
    const fetchData = async () => {
      try {
        // Replace this with your actual API endpoint to fetch the data from the server
        const response = await fetch('/api/data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter table"
        value={filter}
        onChange={handleChange}
      />
      <table>
        <thead>
          <tr>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
