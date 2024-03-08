import mongoose from "mongoose";

const userAddressSchema=mongoose.Schema({
    userID:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        require:true
    },
    mainMobileNo:{
        type:Number,
        require:true
    },
    alterMobileNo:{
        type:Number
    },
    address:{
        type:String
    },
    state:{
        type:String
    },
    district:{
        type:String
    },
    landmark:{
        type:String
    },
    addressType:{
        type:String
    },
    pincode:{
        type:Number,
       require:true
    }

})

const userAddressModel=mongoose.model("userAddress",userAddressSchema);

export {userAddressModel}