var express = require('express');
var router = express.Router();
// var {mongoose} = require ('../db/mongoose.js');

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');

var {Instructor} = require('../models/instructor');
var {autenticate} = require('../middleweare/autenticate');

const multerConf = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, './server/uploads');
    },
    filename: (req ,file, next) => {
      const ext = file.mimetype.split('/')[1];
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
          next(null, filename);
      });
    }
  }),
  fileFilter: (req, file, next) => {
    if(!file){
      next();
    }
    const image = file.mimetype.startsWith('image/');
    if(image){
      next(null, true);
    }else{
      next({message: 'File not suported'}, false);
    }
  }
}

// const url = 'mongodb://localhost:27017/DrivingSchoolDB';
// const conn = mongoose.createConnection(url);
//
// let gfs;
//
// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });
//
// // //create storage engine
// const storage = new GridFsStorage({
//   url: url,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });


//const upload = multer({storage: storage});
//Post route
router.post('/', [autenticate, multer(multerConf).single('image')], (req, res) => {

  var _id = req.user._id;

  if(req.file){
    console.log(req.file)
    req.body.image = req.file.filename;
  }
  // const image = {
  //   profileImage: {
  //     image: req.file
  //   }
  // }
  // console.log(image)
  // Instructor.findOneAndUpdate({_id}, { $set: image}).then((result) => {
  //   if(!result){
  //     res.status(404).send();
  //   }
  //   res.status(200).send(result);
  // });
  // try {
  //   var instructor =  Instructor.findById({_id});
  //   console.log(instructor);
  //   res.send(req.file);
  // } catch (e) {
  //
  // }

});


// router.post('/image', autenticate, async (req, res) => {
//
//   try {
//     const image = new Image(req.body);
//     const imageSaved = await image.save();
//     res.status(200).send(imageSaved);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.get('/', (req, res) => {

  res.send({file: 'abc'});
});

module.exports = router;
