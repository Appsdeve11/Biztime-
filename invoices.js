const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM invoices');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new invoice
router.post('/', async (req, res) => {
  const { comp_Code, amt, paid, paid_date } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO invoices (comp_Code, amt, paid, paid_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [comp_Code, amt, paid, paid_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an invoice
router.delete('/:invoice_id', async (req, res) => {
  const invoiceId = req.params.invoice_id;
  try {
    await db.query('DELETE FROM invoices WHERE id = $1', [invoiceId]);
    res.json({ message: `Invoice with ID ${invoiceId} deleted successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;