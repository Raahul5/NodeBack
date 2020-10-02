 const router = require('express').Router();
 const user = require('./userSchema');
 const addques = require('./addque');
 const bcrypt = require('bcryptjs');
 var jwt = require('jsonwebtoken');
 const fileUpload = require('express-fileupload');
const path = require('path');
const multer =  require('multer');
const gridFsStorage = require('multer-gridfs-storage');
const grid = require('gridfs-stream');
const crypto = require('crypto');

/*router.post('/upload', async(req,res) =>{
 var storage = new GridFsStorage({
    url: 'mongodb://localhost/userauth',
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
  const upload = multer({ storage });
}) */
  

router.post('/register',async (req,res)=>{
  try{
    var emailexist =await user.findOne({email:req.body.email})
    if(emailexist)
    {
      return res.status(400).json("Already Email Taken ");
    }
     
    var encod =await bcrypt.hash(req.body.password,10);
   
    //Password Encoded 
    const users  = new user({
      name : req.body.name,
      email : req.body.email,
      password : encod,
  });
   
  var data =await users.save();
    res.json(data);    
  }
  catch(err){
    res.json(err);
  }
 
});

router.post('/login',async(req,res)=>{
  try{
var userData =await user.findOne({email:req.body.email})
 if(!userData){
   res.status(400).json("Invalid Email Id");
 }
  var passcmp =await bcrypt.compare(req.body.password,userData.password)
   
  if(!passcmp){
  return res.status(400).json("Invalid Password");
  }
   var userToken = jwt.sign({email:userData.email},'raahul');

   res.header('auther',userToken).json(userToken);
   console.log("Token Created");
  }
  catch(err)
  {
    res.json(err);
  }
})

router.post('/addques',async(req,res)=>{ 

  const store = new addques ({
    ques:req.body.ques,
    op1:req.body.op1,
    op2:req.body.op2,
    op3:req.body.op3,
    op4:req.body.op4,
    answer:req.body.answer,

  });
  var addquedata =await store.save();
  res.json(addquedata);   
  console.log("saved"); 
   
})


function userValid (req,res,next) {
  var token = req.header('auther');
  req.token=token;
  next();
}

  router.get('/getAll',userValid,async (req,res)=>{
    jwt.verify(req.token,'raahul',async (err,data)=>{
    if(err){ 
      res.sendStatus(403)
    }
    else
    {
      const udata = await user.find().select(['-password']);
      res.json(udata);
    }
  })

})
 

module.exports = router;