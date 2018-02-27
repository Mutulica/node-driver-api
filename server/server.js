require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose.js');
var {Instructor} = require('./models/instructor');
var {Student} = require('./models/student');
var {Schedule} = require('./models/schedule');
var {autenticate} = require('./middleweare/autenticate');
var {studentAuth} = require('./middleweare/studentAuth');

const router = express.Router();
var app = express();
var port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.status(200).send('App Works');
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

//Get Student profile
app.get('/student/me', studentAuth, async (req, res) => {
  var _id = req.user.id;
  if(!ObjectID.isValid(_id)){
    return res.status(404).send();
  }
  const student = await Student.findOne({_id});
  if(!student){
    return res.status(404).send('Student not found');
  }
  res.status(200).send(student);
})

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

//Update Instructor details
app.patch('/instructor/me', autenticate, async (req, res) => {
  const _id = req.user._id;
  const body = req.body;

  if(!ObjectID.isValid(_id)){
    return res.status(404).send();
  }

  try {
    var instructor = await Instructor.findOneAndUpdate({_id}, {$set: body}, {new: true});
    if(!instructor){
      return res.status(404).send('Instructor was not found');
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
    return res.status(200).send({message: 'Student ID not valid'});
  }
  try {
    const student = await Student.findOne({_id, _instructorId: req.user._id});
    if(!student){
      return res.status(200).send({
        message: "Student not found"
      });
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

//Student LOGIN
app.post('/student/login', async (req, res) => {
  try {
    var email = req.body.email;
    var pass = req.body.password;
    const student = await Student.findByCredentials(email, pass);
    const token = await student.generateAuthToken();
    res.header('x-auth', token).send(student);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Student Make Appointment
app.post('/student/schedule', studentAuth, async (req, res) => {
  const _id = req.user.id;
  const _instructorId = req.params.id;

  if(!ObjectID.isValid(_id)){
    return res.status(404).send('Student ID is Invalid!')
  }

  try {
    const student = await Student.findOne({_id});
    if(!student){
      return res.status(404).send('Student not found');
    }

    const date = await Schedule.findOne({date: req.body.date});
    if(date){
      return res.status(200).send(`${req.body.date} is not available. Chose another date.`);
    }
    var obj = {
      _studentId: student._id,
      _instructorId: student._instructorId,
      date: req.body.date,
      firstName: student.firstName,
      lastName: student.lastName,
      phone: student.phone,
      email: student.email,
      confirmed: false
    };

    var appointment = new Schedule(obj)
    await appointment.save();
    res.status(200).send(appointment);

  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Student Schedule
app.get('/schedule/me', studentAuth, async (req, res) => {
  const _studentId = req.user.id;
  if(!ObjectID.isValid(_studentId)){
    return res.status(404).send('Student ID not valid');
  }

  try {
    const schedule = await Schedule.find({_studentId});
    if(!schedule){
      return res.status(404).send('There are no appointments');
    }
    res.status(200).send(schedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Instructor schedule
app.get('/instructor/schedule', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  if(!ObjectID.isValid(_instructorId)){
    return res.status(404).send('Instructor ID not valid');
  }

  try {
    const schedule = await Schedule.find({_instructorId});
    if(!schedule){
      return res.status(404).send('There are no appointments');
    }
    res.status(200).send(schedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Unconfirmed appointments/ Instructor schedule
app.get('/instructor/schedule/unconfirmed', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  if(!ObjectID.isValid(_instructorId)){
    return res.status(404).send('Instructor ID not valid');
  }

  try {
    const schedule = await Schedule.find({_instructorId, confirmed: false});
    if(!schedule){
      return res.status(404).send('There are no appointments');
    }
    res.status(200).send(schedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET a student Appointments
app.get('/instructor/schedule/:id', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  const _studentId = req.params.id;
  if(!ObjectID.isValid(_studentId)){
    return res.status(404).send();
  }

  try {
    const studentSchedule = await Schedule.find({_instructorId, _studentId});
    if(!studentSchedule){
      return res.status(404).send();
    }
    res.status(200).send(studentSchedule);
  } catch (e) {
    res.status(400).send(e);
  }
})

//Instructor Make Appointment
app.post('/instructor/schedule', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  const _id = req.body.studentId;

  if(!ObjectID.isValid(_id)){
    return res.status(404).send('Student ID is Invalid!')
  }

  try {
    const student = await Student.findOne({_id, _instructorId});
    if(!student){
      return res.status(404).send({message: 'Student not found'});
    }

    const date = await Schedule.findOne({date: {from: req.body.date.from, to: req.body.date.to}});
    if(date){
      return res.status(404).send(date);
    }

    var obj = {
      _studentId: student._id,
      _instructorId: student._instructorId,
      date: {
        from: req.body.date.from,
        to: req.body.date.to
      },
      firstName: student.firstName,
      lastName: student.lastName,
      phone: student.phone,
      email: student.email,
      confirmed: true
    };

    var appointment = new Schedule(obj)
    await appointment.save();
    res.status(200).send(appointment);

  } catch (e) {
    res.status(400).send({message: "Appointment could not be made!"});
  }
});

//instructor DELETE an Appointment
app.delete('/schedule/delete/:id', autenticate, async (req, res) => {
  const _id = req.params.id;
  const _instructorId = req.user.id;

  if(!ObjectID.isValid(_instructorId)){

    return res.status(404).send();
  }

  try {
    const date = await Schedule.deleteOne({_id, _instructorId});
    if(date.n === 0){
      return res.status(404).send('Appointment not found');
    }
    res.status(200).send(date);
  } catch (e) {
    res.status(400).send(e);
  }

});


//instructor Reschedule an Appointment
app.patch('/schedule/reschedule', autenticate, async (req, res) => {
  const _id = req.body.id;
  const date = req.body.date;

  if(!ObjectID.isValid(_id)){
    return res.status(404).send();
  }

  try {
    const data = await Schedule.findOneAndUpdate(
      {_id},
      { $set:{date}}
    );
    if(!data){
      return res.status(404).send('Appointment not found');
    }
    data.date = date;
    res.status(200).send(data);
  } catch (e) {
    res.status(400).send(e);
  }

});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
