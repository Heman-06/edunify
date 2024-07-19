"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SchoolDirectory() {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/getSchool');
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setError('Failed to fetch schools. Please try again later.');
      }
    };

    fetchSchools();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <>
      <h1>All Schools</h1>
      <div className='sh0'>
        {schools.length > 0 ? (
          schools.map((school) => (
            <div key={school.id} className='sh1'>
              <div className='img1'>
                <img src={school.image} alt={school.name} />
              </div>
              <p>{school.city}</p>
              <span className='name1'><h2>{school.name}</h2></span>
              <p>{school.address}</p>
            </div>
          ))
        ) : (
          <p>No schools found or still loading...</p>
        )}
      </div>
    </>

  );
}