const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/db/db');
const userRoutes = require("./src/routes/user.routes")
const captainRoutes = require("./src/routes/captain.routes")
const mapsRoutes = require("./src/routes/maps.routes")
const cookieParser = require('cookie-parser');
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Routes
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);



connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


module.exports = app;