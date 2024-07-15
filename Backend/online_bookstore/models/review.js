const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book',
        required:true
    },
    customerId:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
});

const Review=mongoose.model('Review',reviewSchema);
module.exports=Review;