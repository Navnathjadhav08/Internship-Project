const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
// Removed authJwt import as it's no longer used
const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler); // Error handler remains as is

// Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// MongoDB Connection
mongoose.connect(process.env.CONNECTION_STRING, {
  dbName: 'Internship',
})
  .then(() => {
    console.log('Database connection is ready');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// Server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
