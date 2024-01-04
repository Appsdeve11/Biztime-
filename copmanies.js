const express = require('express');
const router = express.Router();
const db = require('./db');


router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM companies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  const { code, name, description } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *',
      [code, name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;