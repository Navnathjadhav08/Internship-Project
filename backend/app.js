const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');


app.use(cors());
app.options('*', cors())

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);


// MongoDB Connection
mongoose.connect(process.env.CONNECTION_STRING,{
    dbName : 'Internship',
    
})
.then(() => {
    console.log('Database connection is ready');
})
.catch((err) => {
    console.error('Database connection failed:', err);
});

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})