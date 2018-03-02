var {Student} = require('../models/student');
var {Instructor} = require('../models/instructor');
var {Schedule} = require('../models/schedule');

const {ObjectID} = require('mongodb');

var express = require('express');
var router = express.Router();


//GET Instructor details
router.get('/instructor/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    var instructor = await Instructor.findById({_id});
    if(!instructor){
      return res.status(404).send('Instructor not found')
    }
    res.status(200).send(instructor);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get Instructor All Future Appointments
router.get('/instructor-schedule/:id', async (req, res) => {
  try {
    const _instructorId = req.params.id;
    const allAppointments = await Schedule.find({_instructorId});
    if(!allAppointments){
      return res.status(404).send('Instructor not found')
    }
    res.status(200).send(allAppointments);
  } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;
