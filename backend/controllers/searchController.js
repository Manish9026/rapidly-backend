import { productsModel } from "../models/product.js";


const getProductData=async(req,res)=>{


    try {
        
        const {searchData ,skip,limit}=req.query
        const match= await productsModel.find({category:searchData}).skip(parseInt(skip)).limit(parseInt(limit))
     
        
            if(match.length!=0){
               
                res.send({
                    status:true,
                    data:match,
                    message:"succussfully find out",
                    skip:match.length
                })
            }
            else{
               
                res.send({
                    status:false,
                    data:[],
                    message:"category does not exist",
                    skip:match.length

                })
            }

    } catch (error) {

        res.send({
            status:false,
            message:"category does not exist",
            error
        })
        
    }
   

}

const getSingleData=async(req,res)=>{
    
    try {
        const {prdID}=req.query;
         const data=await productsModel.findOne({_id:prdID})
        //  console.log(data)
        if(data){
            res.status(200).send({
                status:true,
                message:"succussfully find",
                data
            })
        }
        else{
            res.status(404).send({
                status:false,
                message:"Given id does not exist",
                data:null
            })
        }
       
      
        
    } catch (error) {
        // console.log(error)

        res.status(404).send({
            status:false,
            message:"Given id does not exist",
            data:null
        })
    }

}

export {getProductData,getSingleData}