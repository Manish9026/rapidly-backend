import mongoose, { model } from "mongoose";

const product_schema=mongoose.Schema({
    

title:{
    type:String
}
,
description:{
    type:String
}
,
price:{
    type:Number
}
,
discountPercentage:{
    type:Number
}
,
rating:{
    type:Object
    ,default:{
        rate:0,
        count:0
    }
},

stock:{type:Number}
,
brand:{
    type:String
},

category:{
    type:String
},
thumbnail:{
    type:String
},

images:{
    type:Array
}

})


const productsModel=new mongoose.model("product_collectons",product_schema);

export {productsModel}