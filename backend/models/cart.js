import mongoose from "mongoose";

const userCart_schema = mongoose.Schema({

   
    image: {
        type: String
    }
    ,
    price: {
        type: Number
    }
    ,
    productName: {
        type: String

    }
    ,
    category:{
        type: String,
        default:"about product"
    },
    description:{
        type:String
    },
    rating:{
        type:Object
    },
    userID:{
        type:String,
        required:true
    },
    Quantity:{
        type:Number,
        default:1
        
    },
    prdID:{
        type:String,
        required:true
    },

})

const userCartModel= new mongoose.model("cart",userCart_schema)


export default userCartModel;