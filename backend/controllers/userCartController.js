import userCartModel from "../models/cart.js"
import { productsModel } from "../models/product.js";


import jwt  from "jsonwebtoken";




const  addUserCart=async(req,res)=>{

const {title,price,category,rating,image, description,images,_id} =req.body;
const Token=req.cookies.jwt1 
 const {userID,email}= jwt.verify(Token, process.env.TOKENSECRETKRY)




const userCart= await userCartModel.findOne( {$and:[{productName:title},{userID:userID}]})


try {
    if(userCart){

        res.json({"status":"failed","message":"already added in your cartlist"})
        console.log("product already exist")
    }
    else{
        const cartData =new userCartModel({
            image: image || images[0],
            price,
            category,
            userID,
            description,
            productName:title,
            rating,
            prdID:_id
            
        })
    
        await cartData.save();
    
        res.send({"status":"success",
            message:"data successfully saved in cart"
        })
    }
} catch (error) {
    console.log(error)
}



}

   

const removeCartdata=async(req,res)=>{
    
    const prdID=req.body.id;
    
   
    try {//$and:[{_id:prdID},{email:email}
        let data=await userCartModel.findOne({_id:prdID})

        if(data){
        await userCartModel.deleteOne({_id:prdID});
        
        res.send({status:"success",message:"item succussfully removed from your cart"});
        }
        else{
            res.send({status:"failed",message:"item Already removed"})
        }
    } catch (error) {
        console.log(error)
        res.send(error);
    }
   



}








const getCartdata=async(req,res)=>{

 
  


    try {
        const Token=req.cookies.jwt1 
        if(Token){
        const {userID,email}= jwt.verify(Token, process.env.TOKENSECRETKRY)

        console.log(userID)
        
        const data=await userCartModel.find({userID});
       
        res.send(data);}
    } catch (error) {
        console.log(error)
    }
    
    

}


const getAllProducts=async(req,res)=>{


    const product=await productsModel.find();

    res.send(product);

}

export {getAllProducts}


export  {addUserCart,
 getCartdata,removeCartdata};