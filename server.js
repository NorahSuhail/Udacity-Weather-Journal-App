let projectData = {};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

app.post('/add', addWeatherInformation);

function addWeatherInformation(req, res) {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    content:req.body.content
  }
  res.send(projectData);
}

// Callback function to complete GET '/all'
app.get('/all', getWeatherInformation);

function getWeatherInformation(req, res) {
  console.log(projectData);
  res.send(projectData);
}

// Setup Server

const port = 9000;
const server = app.listen(port, listener);

function listener() {
  console.log(`The server is running on localhost: http://localhost:${port}`);
};
