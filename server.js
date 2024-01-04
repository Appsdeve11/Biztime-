const express = require('express');
const app = express();
const companiesRouter = require('./companies');
const invoicesRouter = require('./invoices');

app.use(express.json());

app.use('/companies', companiesRouter);
app.use('/invoices', invoicesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});