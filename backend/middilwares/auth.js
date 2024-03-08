import  jwt  from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();
import userModel from "../models/user.js";


const userAuth=async(req,res,next)=>{

    try {
    // console.log("hello")cls

    let token = req.cookies.jwt1;
       if(token){
        const {userID,email}= jwt.verify(token, process.env.TOKENSECRETKRY)
        const userMatch = await userModel.findOne({_id:userID});
        if(userMatch){
            // res.send({status:"true",message:"user exist"})
            next();
        }
        else{
            res.send(null)
        }
    }
    else{
        res.send(null)

    }
        

    } catch (error) {
       console.log(error)
        
    }
    

}

export {userAuth}