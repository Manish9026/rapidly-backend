import { userAddressModel } from "../models/addressModel.js";
import jwt  from "jsonwebtoken";


class UserAddress{

    static addUserAddress=async(req,res)=>{

        // console.log(req.body);
        try {

            const Token=req.cookies.jwt1 
            const {userID,email}= jwt.verify(Token, process.env.TOKENSECRETKRY)
            // console.log(userID)

            const {userName,mainMobileNo,alterMobileNo,userAddress,userDistrict,pincode,addressType,state,landmark}=req.body.data;
            console.log(alterMobileNo)
            const match =userName && mainMobileNo && userAddress && userDistrict && pincode && addressType && state ;
            if(match){

                const userAddresses= new userAddressModel({
                    userID,
                    userName,
                    mainMobileNo,
                    alterMobileNo,
                    address:userAddress,
                    district:userDistrict,
                    pincode,
                    addressType,
                    state,
                    landmark})

                     await userAddresses.save();

                     res.send({
                        message:"user successfully added",
                        status:true,


                     })
                
            }else{
                // console.log("hello failed")

                res.send({
                    message:"all feilds are required",
                    status:false
                })
            }

            
        } catch (error) {
            console.log(error)
        }

    }


    static getAllAddress=async(req,res)=>{
 try {
    const Token=req.cookies.jwt1 
     const {userID,email}= jwt.verify(Token, process.env.TOKENSECRETKRY)
//   console.log(userID)
     const match = await userAddressModel.find({userID})
// console.log(match);
     if(match){
        res.send({
            message:"succusfully find out data",
            status:true,
            data:match
        })
     }
     else{
        res.send({
            message:" not addresses exist in your account",
            status:false,
            data:null
           
        })
     }

    
 } catch (error) {
    res.send({
        message:" not addresses exist in your account",
        status:false,
        data:null
       
    })
    
 }
        



    }

    static removeAddress=async(req,res)=>{


        try {
            console.log(req.query.Aid)
            const id= req.query.Aid;
            const match = await userAddressModel.findOne({_id:id})
            console.log(match)
            if(match){
                await userAddressModel.deleteOne({_id:id})
                res.send({
                    message:"successfully removed",
                    status:true
                })
            }
            else{
                res.send({
                    message:"try sometime",
                    status:false
                })
            }

            
        } catch (error) {
            
        }
    }


    static updateAddress=async(req,res)=>{
       
        // console.log(req.body)
        try {
           const {addressType,alterMobileNo,landmark,mainMobileNo,pincode, state,userAddress,userDistrict,userName,id}=req.body.data;
        
            const match = await userAddressModel.findOne({_id:id})
            // console.log(match,id)

            if(addressType && mainMobileNo && pincode && state && userAddress && userDistrict && userName){
            if(match){

                await userAddressModel.updateOne({_id:id},{$set:{alterMobileNo,state,address:userAddress,pincode,landmark,mainMobileNo,district:userDistrict,userName,addressType}})
                res.send({
                    message:"successfully updated",
                    status:true,
                   
                })
            }
            else{
                res.send({
                    message:"try sometime ",
                    status:false
                })
            }
        }
        else {
            res.send({
                message:"all field are reqired",
                status:false,
            })
        }
            
        } catch (error) {
            console.log(error)
        }
    }
} 


export {UserAddress}