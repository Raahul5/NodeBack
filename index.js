const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./userRouter');
const user = require('./userSchema');
const morgan = require('morgan');  
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const multer =  require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const crypto = require('crypto');
const metodOverride = require('method-override');
const bodyParser = require('body-parser')
const once = require('once');


const app = express();

 app.use(express.json());
 app.use(bodyParser.json());
 app.use(morgan('dev'));
 app.use(cors());

 app.use('/api',userRouter);

const PORT = process.env.PORT || 4000;
 app.listen(PORT,()=>{
     console.log("Localhost connect");
 })


 const conn = mongoose.connect('mongodb://localhost/userauth',{ 
     useNewUrlParser: true,
     useUnifiedTopology: true },()=>{

     console.log("Server Connected");
     
 })

/*et gfs;
 
conn.once('open',()=>{
    gfs=grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
})

var storage = new GridFsStorage({
    url: 'mongodb://host:27017/database',
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });*/