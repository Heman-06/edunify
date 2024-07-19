"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterSchool() {
  const [school, setSchool] = useState({
    name: '', address: '', city: '', state: '', contact: '', email_id: '', image: null
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setSchool({ ...school, image: files[0] });
    } else {
      setSchool({ ...school, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    if (!form.checkValidity()) {
      alert('Please fill out all required fields.');
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(school).forEach(key => {
        formData.append(key, school[key]);
      });

      const response = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data);
      alert('School registered successfully');
      router.push('/schoolDirectory');
      setSchool({ name: '', address: '', city: '', state: '', contact: '', email_id: '', image: null });
    } catch (error) {
      console.error('Error registering school:', error);
      alert('Error registering school: ' + error.message);
    }
  };

  return (
    <div className='frm1'>
     

      <form onSubmit={handleSubmit} noValidate>
        <h2>School Registration</h2>
        <input name="name" value={school.name} onChange={handleChange} placeholder="School Name" required />
        <input name="address" value={school.address} onChange={handleChange} placeholder="Address" required />
        <input name="city" value={school.city} onChange={handleChange} placeholder="City" required />
        <input name="state" value={school.state} onChange={handleChange} placeholder="State" required />
        <input name="contact" value={school.contact} onChange={handleChange} placeholder="Contact" required />
        <input name="email_id" value={school.email_id} onChange={handleChange} placeholder="Email" required type="email" />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
          required
        />
        <button type="submit">Register School</button>
      </form>
    </div>
  );
}
