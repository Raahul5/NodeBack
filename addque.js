const mongoose = require('mongoose');
  

const Addquestion = mongoose.Schema({

    ques: {
        type:String,
        require:true,
        
    },
    op1: {
        type:String,
        require:true
    },
    op2: {
        type:String,
        required:true
    },
    op3: {
        type:String,
        require:true
    },
    op4: {
        type:String,
        required:true
    },
    answer: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('addques',Addquestion);