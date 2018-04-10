var express = require('express');
var router = express.Router();

var {Instructor} = require('../models/instructor');
var {Student} = require('../models/student');
var {Schedule} = require('../models/schedule');
var {autenticate} = require('../middleweare/autenticate');
const {ObjectID} = require('mongodb');


//Register instructor
router.post('/register', async (req, res) => {
  try {
    var instructor = new Instructor(req.body);
    await instructor.save();
    const token = await instructor.generateAuthToken();
    res.header('x-auth', token).send(instructor);
  } catch (e) {
    res.status(400).send(e);
  }
});


router.post('/login', async (req, res) => {
  try {
    var email = req.body.email;
    var pass = req.body.password;
    const instructor = await Instructor.findByCredentials(email, pass);
    const token = await instructor.generateAuthToken();
    res.header('x-auth', token).send({token, instructor});
  } catch (e) {
    res.status(400).send(e);
  }
});

//instructor Logout
router.delete('/logout', autenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  },
  (e) => {
    res.status(400).send(err)
  });
});

//GET Instructor details
router.get('/me', autenticate, async (req, res) => {
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
router.patch('/me', autenticate, async (req, res) => {
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
router.post('/student', autenticate, async (req, res) => {

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
router.get('/students', autenticate, async (req, res) => {
  try {
    const _instructorId = req.user._id;
    const students = await Student.find({_instructorId});
    res.status(200).send(students);
  } catch (e) {
    res.status(400).send(e);
  }
});


//GET a student by ID
router.get('/student/:id', autenticate, async (req, res) => {
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

//Mark Appointment as completed
router.patch('/schedule/complete', autenticate, async (req, res) => {
  const _instructorId = req.user._id;
  const _id = req.body._id;
  const body = req.body;
  req.body.status = 'completed';
  if(!ObjectID.isValid(_id)){
    return res.status(404).send();
  }

  try {
    var appoint  = await Schedule.findOneAndUpdate({_id, _instructorId}, {$set: body}, {new: true});
    if(!appoint){
      return res.status(404).send('Appointment was not found');
    }
    res.status(200).send(appoint);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Instructor Confirmed and Incomplete Appointments
router.get('/schedule', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  if(!ObjectID.isValid(_instructorId)){
    return res.status(404).send('Instructor ID not valid');
  }

  try {
    const schedule = await Schedule.find({_instructorId, confirmed: true, status: 'incomplete'});
    if(!schedule){
      return res.status(404).send('There are no appointments');
    }
    res.status(200).send(schedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get Instructor Appointments History (completed Appointments)
router.get('/schedule/history', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  if(!ObjectID.isValid(_instructorId)){
    return res.status(404).send('Instructor ID not valid');
  }

  try {
    const schedule = await Schedule.find({_instructorId, confirmed: true, status: 'completed'});
    if(!schedule){
      return res.status(404).send('There are no appointments');
    }
    res.status(200).send(schedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Unconfirmed appointments/ Instructor schedule
router.get('/schedule/unconfirmed', autenticate, async (req, res) => {
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

//Confirm Appointment
router.patch('/schedule/confirm', autenticate, async (req, res) => {
  const _instructorId = req.user._id;
  const _id = req.body._id;
  const body = req.body;
  req.body.confirmed = true;
  if(!ObjectID.isValid(_id)){
    return res.status(404).send();
  }

  try {
    var appoint  = await Schedule.findOneAndUpdate({_id, _instructorId}, {$set: body}, {new: true});
    if(!appoint){
      return res.status(404).send('Appointment was not found');
    }
    res.status(200).send(appoint);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET all Student Incomplete Appointments
router.get('/schedule/:id', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  const _studentId = req.params.id;
  if(!ObjectID.isValid(_studentId)){
    return res.status(404).send();
  }

  try {
    const studentSchedule = await Schedule.find({_instructorId, _studentId, status: 'incomplete'});
    if(!studentSchedule){
      return res.status(404).send();
    }
    res.status(200).send(studentSchedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET all Student Completed Appointments
router.get('/sessions/history/:id', autenticate, async (req, res) => {
  const _instructorId = req.user.id;
  const _studentId = req.params.id;
  if(!ObjectID.isValid(_studentId)){
    return res.status(404).send();
  }

  try {
    const studentSchedule = await Schedule.find({_instructorId, _studentId, status: 'completed'});
    if(!studentSchedule){
      return res.status(404).send();
    }
    res.status(200).send(studentSchedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//PATCH date, duration to Student's session
router.patch('/student/session/:id', autenticate, async (req, res) => {
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

//Instructor Make Appointment
router.post('/schedule', autenticate, async (req, res) => {
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
      status: 'incomplete',
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
router.delete('/schedule/delete/:id', autenticate, async (req, res) => {
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
router.patch('/schedule/reschedule', autenticate, async (req, res) => {
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

module.exports = router;
