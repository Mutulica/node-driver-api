var {Instructor} = require('./../models/instructor');

var autenticate = async (req, res, next) => {

  var token = req.header('x-auth');

  try {
    const instructor = await Instructor.findByToken(token);
    if(!instructor){
      return res.status(404).send('Not Found');
    }
    req.user = instructor;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
  
};

module.exports = {
  autenticate
}
