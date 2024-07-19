import { NextResponse } from 'next/server';
import { createConnection } from 'mysql2/promise';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request) {


  console.log('DB_HOST:', process.env.DB_HOST);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
  console.log('DB_NAME:', process.env.DB_NAME);


  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const image = formData.get('image');

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = Date.now() + '-' + image.name;
    const imagePath = path.join(process.cwd(), 'public', 'schoolImages', imageName);
    await writeFile(imagePath, buffer);

    // const connection = await createConnection({
    //   host: 'localhost',
    //   port: 3306,
    //   user: 'root',
    //   password: 'root',
    //   database: 'school_managementt',
    // });

    const connection = createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    const [result] = await connection.execute(
      'INSERT INTO schoolss (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, `/schoolImages/${imageName}`, email_id]
    );

    await connection.end();

    return NextResponse.json({ message: 'School added successfully', insertId: result.insertId });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Error adding school', details: error.message }, { status: 500 });
  }
}
