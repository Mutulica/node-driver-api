const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var StudentSchema = new mongoose.Schema({
  email:  {
    required: true,
    type: String,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} nu este un email valid!'
    }
  },
  password: {
    required: true,
    type: String,
    minlength: 6
  },
  firstName: {
    required: true,
    type: String
  },
  lastName: {
    required: true,
    type: String
  },
  phone: {
    required: true,
    type: Number
  },
  _instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  registeredAt: {
    type: Number,
    default: new Date().getTime()
  },
  sessions: [{
    sessionDate: {
      type: Number
    },
    duration: {
      type: String
    }
  }]
});

var Student = mongoose.model('Student', StudentSchema);

module.exports = {Student}
