const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3002;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'akshay',
  password: 'akshay',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    console.log('Fetched data successfully:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
