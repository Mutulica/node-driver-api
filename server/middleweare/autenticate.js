var {Instructor} = require('./../models/instructor');

var autenticate = (req, res, next) => {
  var token = req.header('x-auth');

  Instructor.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send();
  });
};

module.exports = {
  autenticate
}
