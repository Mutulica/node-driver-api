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
    res.header('x-auth', token).send({token, student});
  } catch (e) {
    res.status(400).send(e);
  }
});

//Student Logout
router.delete('/logout', studentAuth, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send({message: 'User logged out'});
  },
  (e) => {
    res.status(400).send(err)
  });
});


//GET Student Next Appointments ( status incomplete)
router.get('/schedule/next', studentAuth, async (req, res) => {
  const _studentId = req.user.id;
  if(!ObjectID.isValid(_studentId)){
    return res.status(404).send('Student ID not valid');
  }

  try {
    const schedule = await Schedule.find({_studentId, status: 'incomplete', confirmed: true});
    if(!schedule){
      return res.status(404).send('There are no appointments');
    }
    res.status(200).send(schedule);
  } catch (e) {
    res.status(400).send(e);
  }
});

//GET Student History Appointments ( status completed)
router.get('/schedule/past', studentAuth, async (req, res) => {
  const _studentId = req.user.id;
  if(!ObjectID.isValid(_studentId)){
    return res.status(404).send('Student ID not valid');
  }

  try {
    const schedule = await Schedule.find({_studentId, status: 'completed'});
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
      status: 'incomplete',
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

//Student Request Appointment
// router.post('/session/request', studentAuth, async (req, res) => {
//   const _id = req.user.id;
//
//   if(!ObjectID.isValid(_id)){
//     return res.status(404).send('Student ID is Invalid!')
//   }
//
//   try {
//
//     const student = await Student.findById({_id});
//     if(!student){
//       return res.status(200).send('Not Found');
//     }
//
//     var obj = {
//       status: 'incomplete',
//       _studentId: student._id,
//       _instructorId: student._instructorId,
//       date: {
//         from: req.body.from,
//         to: req.body.to
//       },
//       firstName: student.firstName,
//       lastName: student.lastName,
//       phone: student.phone,
//       email: student.email,
//       confirmed: false
//     };
//     var appointment = new Schedule(obj);
//
//     const saved = await appointment.save();
//     if(!saved){
//       return res.status(404).send();
//     }
//     student.sessions.push({
//       from: req.body.from,
//       to: req.body.to,
//       appointId: saved._id,
//       status: obj.status,
//       confirmed: obj.confirmed
//     });
//     await student.save();
//     res.status(200).send(student);
//
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

module.exports = router;
