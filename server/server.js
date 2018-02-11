require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose.js');
var {Instructor} = require('./models/instructor');
var {Student} = require('./models/student');
var {autenticate} = require('./middleweare/autenticate');

var app = express();
var port = process.env.PORT;
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Works');
});

//Register instructor
app.post('/instructor', async (req, res) => {
  try {
    var instructor = new Instructor(req.body);
    await instructor.save();
    const token = await instructor.generateAuthToken();
    res.header('x-auth', token).send(instructor);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Isntructor details
app.get('/instructor/me', autenticate, async (req, res) => {
  try {
    const _id = req.user._id;
    var instructor = await Instructor.findById({_id});
    if(!instructor){
      return res.status(404).send('Instructor not found')
    }
    res.status(200).send(instructor);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Register a student
app.post('/student', autenticate, async (req, res) => {
  try {
    const student = new Student(req.body);
    student._instructorId = req.user._id;
    const registeredStudent = await student.save();
    res.status(200).send(registeredStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET all students
app.get('/student', autenticate, async (req, res) => {
  try {
    const _instructorId = req.user._id;
    const students = await Student.find({_instructorId});
    res.status(200).send(students);
  } catch (e) {
    res.status(400).send(e);
  }
})

//GET a student by ID
app.get('/student/:id', autenticate, async (req, res) => {
  const _id = req.params.id;
  if(!ObjectID.isValid(_id)){
    return res.status(404).send();
  }
  try {
    const student = await Student.find({_id, _instructorId: req.user._id});
    if(!student){
      return res.status(404).send();
    }
    res.status(200).send(student);
  } catch (e) {
    res.status(400).send(e);
  }
});

//UPDATE Student details
app.patch('/student/:id', autenticate, async (req, res) => {
  const _id = req.params.id;
  var body = _.pick(req.body, ['firstName', 'lastName', 'email', 'phone']);
  if(!ObjectID.isValid(_id)){
    return res.status(404).send('ID is not valid');
  }
  try {
    var student = await Student.findOneAndUpdate({_id, _instructorId: req.user._id}, {$set: body}, {new: true});
    if(!student){
      return res.status(404).send('Student was not found');
    }
    res.status(200).send(student);
  } catch (e) {
    res.status(400).send(e);
  }
});

//PATCH date, duration to Student's session
app.patch('/student/session/:id', autenticate, async (req, res) => {
  const _id = req.params.id;
  if(!ObjectID.isValid(_id)){
    return res.status(404).send('Student ID is invalid');
  }

  try {
    var student = await Student.findOneAndUpdate(
      {_id, _instructorId: req.user._id},
      {$push: {sessions: {sessionDate: req.body.date, duration: req.body.duration}}}
    );
    if(!student){
      return res.status(404).send('Student was not found');
    }
    res.status(200).send('Sessions updated');
  } catch (e) {
    res.status(400).send(e);
  }
});



app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
