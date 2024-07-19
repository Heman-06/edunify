import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(req, res) {
  try {
    const { name, address } = await req.json();
    const [result] = await pool.query('INSERT INTO schoolss (name, address) VALUES (?, ?)', [name, address]);
    res.status(200).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Error adding school' });
  }
}
