const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var SessionSchema = new mongoose.Schema({
  future: [{
    from: {
      type: Number
    },
    to: {
      type: Number
    }
  }],
  completed: [{
    from: {
      type: Number
    },
    to: {
      type: Number
    }
  }],
  unconfirmed: [{
    from: {
      type: Number
    },
    to: {
      type: Number
    }
  }]
});

var Session = mongoose.model('Session', SessionSchema);

module.exports = {Session}
