var {Student} = require('./../models/student');

var studentAuth = (req, res, next) => {
  var token = req.header('x-auth');

  Student.findByToken(token).then((user) => {
    if(!user){
      return Promise.reject();
    }
    console.log(user);
    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send();
  });
};

module.exports = {
  studentAuth
}
