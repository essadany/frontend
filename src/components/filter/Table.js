import {React,  useState}  from 'react';

const Table = ({ data }) => {
  const [filter, setFilter] = useState('');

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
      <table className='table'>
        <thead className='table-light '>
            <tr>
                <th scope="col">Item</th>
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
