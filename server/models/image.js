const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
//const upload = multer({dest: 'uploads/'});
const multerConf = {
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      next(null, 'uploads/');
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

module.exports = multerConf;
