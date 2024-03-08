
import  express, { text }  from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Cors  from "cors";
import cookieParser from "cookie-parser";
import DB_connection, { atlasDBConn } from "./dbs_config/connection.js";
import  {  UserAuth } from "./controllers/userController.js";
import Deals from "./controllers/dealController.js";
import { addUserCart, getAllProducts, getCartdata, removeCartdata }from "./controllers/userCartController.js";
import { userAuth } from "./middilwares/auth.js";
import { getProductData, getSingleData } from "./controllers/searchController.js";
import { UserAddress } from "./controllers/userAddressController.js";

const app=express();
let Url=process.env.SERVER_BASE_URL;

app.use(Cors({
    origin:[Url,"http://127.0.0.1:3000","http://localhost:3000","http://localhost:3002"],
    methods:["POST","GET","DELETE","PATCH"],
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());



// database connection
const url=process.env.SERVER_DB_URL;
DB_connection(url);
// const conn=atlasDBConn();
const port=process.env.PORT;

app.get("/",(req,res)=>{
res.send("<h1 > this is a server home page </h1>")
})

// user login & registration api 


app.post('/api/register',UserAuth.userRegistration);
app.post('/api/login',UserAuth.userLogin);
app.get('/api/user/verify',UserAuth.vailedUser)
app.get('/api/user/logout',UserAuth.userLogout)
app.get('/api/user/r1/login',UserAuth.loginWithOtp)

// deal related api 
app.get('/api/deal',Deals.homeDeal);


// cart related operations api
app.post('/api/user/addcart',addUserCart)
app.post('/api/user/remove/Cartdata',removeCartdata)
app.get('/api/user/cartdata',userAuth,getCartdata);



// user stored address related  api
app.post('/api/user/saveAddress',UserAddress.addUserAddress)
app.get('/api/user/getAddresses',UserAddress.getAllAddress)
app.delete('/api/user/removeAddress',UserAddress.removeAddress)
app.patch("/api/user/updateAddress",UserAddress.updateAddress)

app.get('/api/v1/products',getProductData)
app.get('/api/v1/product',getSingleData)

// add new product api

app.post('/api/v1/product',Deals.addProducts);









  

app.listen(port,()=>{
    console.log(`server started  on this port :${port}`)
})



// const main= async()=>{
//   try {
//     // await userModel.insertMany(data);

// const data1= await userModel.find();
// console.log(data1);


    
//   } catch (error) {
//     console.log(error);
    
//   }

//   finally{
//     mongoose.connection.close();
//   }
// };

// main();