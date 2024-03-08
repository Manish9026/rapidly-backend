// import { Jwt } from "jsonwebtoken"

import bcrypt from 'bcrypt';
import userModel from "../models/user.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Vonage} from '@vonage/server-sdk'
dotenv.config();
 

class UserAuth{


   static Token = 0;
   static createToken = async (email, userID) => {
        this.Token= await jwt.sign({ email, userID }, process.env.TOKENSECRETKRY)
        
    }
    
    
    
    static userRegistration = async (req, res) => {
        //  console.log("hello")
    
        const { userName, userEmail, userMobile, password, countryCode } = req.body.form_data;
        // console.log(req.body)
    
    
    
    
    
        const user = await userModel.findOne({ email: userEmail })
    
        if (user) {
            res.send({
                'status': 'failed',
                'message': 'Email already exist'
    
            })
        }
    
        else {
            const test = userName && userEmail && userMobile && password;
    
            if (test) {
                const newUser = new userModel({
                    name: userName,
                    email: userEmail,
                    mob_no: userMobile,
                    password: password,
                    country_code: countryCode
                })
                
    
    
                await newUser.save();
                
                res.send({
                    'status': 'success',
                    'message': 'data successfully saved'
    
                })
            }
            else {
                res.send({
                    'status': 'failed',
                    'message': 'All fields are required'
    
                })
            }
        }
    }
    
    
    
    
    
   static userLogin = async (req, res) => {
    console.log(req.query)
    const {type}=req.query;
switch(type){
case "loginWithNum":  try{
    
    const { userEmail, password, tc } = req.body;
    console.log(req.body)
    const userMatch = await userModel.findOne({ email:userEmail });
    console.log(userMatch)
    if (userEmail && password && tc) {

        if (userMatch && userMatch.password === password) {

             await this.createToken(userMatch.email, userMatch._id);
            // console.log(Token)
            res.cookie('jwt1', this.Token, { expire: 36000 + Date.now() }).send({
                'status': 'success',
                'message': 'successfully login',


            })

        }
        else {
            res.send({
                'status': 'failed',
                'message': 'your email & password does not exist !'

            })
        }
    }
    else {
        res.send({
            'status': 'failed',
            'message': 'All fields are required'

        })

    }
}catch( e){
    console.log(e)
}
    break;

 case "loginWithOtp":

 try {
    const mobNum=req.body.num;
    const match=await userModel.findOne({mob_no:mobNum});
 
    if(match){
        await this.createToken(match.email, match._id);
        // console.log(Token)
        res.cookie('jwt1', this.Token, { expire: 36000 + Date.now() }).send({
            'status': true,
            'message': 'successfully login',
        })
    }
    else{
        req.send({
            status:false,
            message:"please Enter registered number"
        })
    }
 
    
 } catch (error) {
    
 }
        break;
}

  
    
    
    
    }
    
    static vailedUser = async(req, res) => {
        
    
    try {
        let user = req.cookies.jwt1;
        if(user){
    
            const {userID,email}= jwt.verify(user, process.env.TOKENSECRETKRY)
            const userMatch = await userModel.findOne({email: email});
            // console.log(userMatch)
    
            res.send({
                status:"success",
                message:"user vailed",
                userName:userMatch.name
            })
        }
        else{
            res.send({
                status:"failed",
                message:"userID does not exist in cookie"
            })
        }
        
    } catch (error) {
        
    }
    
        // console.log(userMatch);
    
    }
    

    static userLogout=async(req,res)=>{
        try {
            res.clearCookie('jwt1')
            res.send({
                status:"failed",
                massage:"cookie successfully deleted"
            })
        } catch (error) {

            res.send(error)
            
        }
    }

    static loginWithOtp=async(req,res)=>{

        let {num,code}=req.query;
        console.log(num,code)
       

        let genOtp=(Math.floor(100000 + Math.random() * 900000));
       const message=`your otp is ${genOtp}`
try {

    const match=await userModel.findOne({mob_no:num});
    
if(match){

    console.log(this.smsConfig())
    if(this.smsConfig(code+num,message)){
        res.send({
            status:true,
            otp:genOtp,
            num,
            message:"successfully otp send on " + num,
            code,
           
        })
    }
    else{
        res.send({
            status:false,
            message:"please try again to send otp"
            
        })
    }



}else{

    res.send({
        status:false,
        message:"mobile number is not registered"
    
    })

}
    
    
} catch (error) {
    res.send({
        status:false,
        message:"please try again to send otp"
        
    })
    
}





       

    }


    static smsConfig=(to,message)=>{
       let  status=true;
        const vonage = new Vonage({
            apiKey: "22b71254",
            apiSecret: "bkUdUKCNyCCR1Jsz"
          })
          const from = "Vonage APIs"
          
         let text=String(message);
     
          console.log(to,message)
       


          try {
            async function sendSms(){
                await vonage.sms.send({to, from,text}) .then(resp => { console.log('Message sent successfully'); 
                            
                               console.log(resp);
                               status=true
                             })
                               .catch(err => { console.log('There was an error sending the messages.'); console.error(err);
                             status=false });
                       }
                        
             
                       sendSms();
          } catch (error) {
            return false
          }
     
          
          
            return status
     
    }
}

export {UserAuth}