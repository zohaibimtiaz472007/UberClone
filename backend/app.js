const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/db/db');
const userRoutes = require("./src/routes/user.routes")
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/users', userRoutes);



connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;