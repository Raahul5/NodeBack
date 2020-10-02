const mongoose = require('mongoose');
  

const Userschema = mongoose.Schema({

    name : {
        type:String,
        require:true,
        lowercase:true
    },
    email : {
        type:String,
        require:true
    },
    password : {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('user',Userschema);