// import express
const express = require('express')
const bodyParser = require('body-parser');
const app = express();

//import .env file
require('dotenv').config()

//import github routes
const router = express.Router();
require('./routes/github')(router);

//use github routes
app.use('/api/v1',router);

//define the initial port
const port = process.env.API_PORT || 3000;

//set json space to beautify json response..
app.set('json spaces', 40);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//start the server
app.listen(port,() => {
  console.info(`Server listening on ${port}`);  
});