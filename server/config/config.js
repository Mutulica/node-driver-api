var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/DrivingSchoolDB';
}else if(env === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/DrivingSchoolDB';
}else {
  process.env.MONGODB_URI = 'mongodb://admin:admin123@ds141028.mlab.com:41028/driving-school-db';
}
