const mongoose=require('mongoose');
const bookSchema=new  mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    }
});

const Book=mongoose.model("Book",bookSchema);
module.exports=Book