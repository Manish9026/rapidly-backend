
import { productsModel } from "../models/product.js";
import { todaydealModel } from "../models/todaydeal.js";

class Deals {
    static homeDeal = async (req, res) => {
        console.log(req.query.prdType);
        const { prdType } = req.query;
        //    res.cookie('jwt',"manish maurya")
        try {


            let data = await productsModel.find({ category: prdType })
            console.log(data.length)
            if (data) {
                res.status(200).json({ data })
            } else {
                res.status(404).send({ status: false, data: null })
            }

            // const data= await todaydealModel.find({}).then(result=>{

            //      res.json({result})

            // }).catch(err=>{
            //     res.json(err)

            // })

        }


        catch (error) {
            console.log(error)
        }
    }


    static addProducts = async (req, res) => {



        try {
            const { title,
                description, images, price, discountPercentage, stock, brand, category } = req.body.formData
            console.log(req.body)
            if (title.length == 0 || price.length == 0 || brand.length == 0 || category.length == 0 || description.length == 0) {
                res.status(200).send({
                    status: false,
                    message: "all fields are required"
                })
            }
            else {



                const prdData = new productsModel({
                    title,
                    description,
                    images,
                    price: Number(price),
                    discountPercentage: Number(discountPercentage),
                    stock: Number(stock),
                    brand,
                    category,
                })

                const status = await prdData.save();
                if (status) {
                    res.status(200).send({
                        status: true,
                        message: "successfully product added"
                    })
                } else {
                    res.status(404).send({
                        status: false,
                        message: "please try again otherwise try after sometime"
                    })
                }

            }




        } catch (e) {
            console.log(e)
            res.status(404).send({
                status: false,
                message: "please try again otherwise try after sometime"
            })
        }
    }
}

export default Deals;