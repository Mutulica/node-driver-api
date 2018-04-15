const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

InstructorSchema = new mongoose.Schema({
  email: {
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
    type: String
  },
  address: {
    type: String
  },
  profileDescription: {
    type: String,
    maxlength: 500
  },
  instructorSchedule: [{
    day : {
      type: Number
    },
    workingHours: {
      from:{
        type: Number
      },
      to: {
        type: Number
      }
    }
  }],
  profileImage: {
    type: String
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  registeredAt:{
    type: Number,
    default: new Date().getTime()
  }
});

InstructorSchema.methods.toJSON = function() {
  var user = this;
  var userObj = user.toObject();
  return _.pick(userObj, ['_id', 'firstName', 'lastName', 'email', 'phone', 'address','profileDescription', 'profileImage','instructorSchedule', 'registeredAt']);
}

//generate token
InstructorSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});
  return user.save().then(() => {
    return token;
  });
};

InstructorSchema.methods.removeToken = function (token) {
  var user = this;
  return user.update({
      $pull : {
        tokens: {
          token
        }
      }
  });
};

InstructorSchema.statics.findByToken = function(token){
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

InstructorSchema.statics.findByCredentials = function(email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      return Instructor.findOne({email}).then((user) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res){
            return resolve(user);
          }
          reject(err);
        });
      }).catch((err) => res.status(400).send(err));

    });
  });
}

InstructorSchema.pre('save', function(next) {
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

var Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = { Instructor }
