var {Student} = require('../models/student');
var {Schedule} = require('../models/schedule');
var {studentAuth} = require('../middleweare/studentAuth');
const {ObjectID} = require('mongodb');

var express = require('express');
var router = express.Router();

//GET profile
router.get('/me', studentAuth, async (req, res) => {
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


//Student LOGIN
router.post('/login', async (req, res) => {
  try {
    var email = req.body.email;
    var pass = req.body.password;
    const student = await Student.findByCredentials(email, pass);
    const token = await student.generateAuthToken();
    res.header('x-auth', token).send({token});
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Student Schedule
router.get('/schedule', studentAuth, async (req, res) => {
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

//Student Make Appointment
router.post('/schedule', studentAuth, async (req, res) => {
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

module.exports = router;
