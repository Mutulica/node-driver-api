const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var ScheduleSchema = new mongoose.Schema({
  _studentId: {
    type: mongoose.Schema.Types.ObjectId,
    trquired: true
  },
  date: {
    type: Number,
    required: true
  },
  _instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  firstName : {
    type: String,
  },
  lastName: {
    type: String
  },
  phone: {
    type: Number
  },
  confirmed: {
    type: Boolean,
  }
});

var Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = {Schedule}
