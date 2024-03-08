import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    mob_no:String,
    password:String,
    country_code:String
  
  })
  const userModel=new mongoose.model("user",userSchema);




  export default userModel;