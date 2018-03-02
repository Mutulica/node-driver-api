const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

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
  address: {
    type: String
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
  }],
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

StudentSchema.methods.toJSON = function() {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ['_id', 'firstName', 'lastName', 'email', 'phone', 'sessions', 'registeredAt', '_instructorId']);
}

//generate token
StudentSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

StudentSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

StudentSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      return Student.findOne({email}).then((user) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res){
            return resolve(user);
          }
          reject(err);
        });
      }).catch((err) => res.status(400).send(err));

    });
  });
};

StudentSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')){
    var pass = user.password;
    bcrypt.genSalt(10,(err, salt) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    });
  }else{
    next();
  }
});

var Student = mongoose.model('Student', StudentSchema);

module.exports = {Student}
