require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
// const http = require('http');
// const socketIO = require('socket.io');
//const socket = require('./config/io.config');

var instructorRoutes = require('./routes/instructor');
var studentRoutes = require('./routes/student');
var publicRoutes = require('./routes/public');
var uploadRoutes = require('./routes/upload');

var {mongoose} = require ('./db/mongoose.js');
var {Schedule} = require('./models/schedule');

var app = express();
var port = process.env.PORT;


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.status(200).send('App Works');
  next();
});

app.use('/instructor', instructorRoutes);
app.use('/student', studentRoutes);
app.use('/public', publicRoutes);
app.use('/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));


app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
