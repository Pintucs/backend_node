const mongoose=require('mongoose');

const User=mongoose.Schema({
    name:{
        type:String
    },
    gmail:{
        type:String
    },
    password:{
        type:String
    }
});

module.exports=mongoose.model('user',User);