var {Student} = require('./../models/student');

var studentAuth = async (req, res, next) => {

  var token = req.header('x-auth');
  try {
    const student = await Student.findByToken(token);
    if(!student){
      return res.status(404).send('Not Found');
    }
    req.user = student;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send(e);
  }

  // Student.findByToken(token).then((user) => {
  //   console.log(user);
  //   if(!user){
  //     return Promise.reject();
  //   }
  //   req.user = user;
  //   req.token = token;
  //   next();
  // }).catch((err) => {
  //   res.status(401).send(err);
  // });
};

module.exports = {
  studentAuth
}
