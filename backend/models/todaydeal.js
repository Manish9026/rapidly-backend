
import mongoose from "mongoose";

const todaydeal_schema = mongoose.Schema({

    id: {
        type: Number
    }
    ,
    image: {
        type: String
    }
    ,
    price: {
        type:Number
    }
    ,
   title: {
        type: String

    }
    ,
    category: {
        type: String
    },
    rating:{
        type:Object

    },description:{
        type:String
    },
    prdId:{
        type:String
    }

})

const todaydealModel= new mongoose.model("todaydeal",todaydeal_schema)

export {todaydealModel};
