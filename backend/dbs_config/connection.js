import mongoose from "mongoose";
import { MongoClient, ServerApiVersion }  from 'mongodb';


const DB_connection=(uri)=>{
    mongoose.connect(uri,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>console.log("connect successfully")).catch((err)=>{
    console.log(err);
})
}

const atlasDBConn= async()=>{
//  uri = "mongodb+srv://Manish902:8009@cluster0.n8bm9rb.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0";
 let uri='mongodb+srv://Manish902:8009@cluster0.n8bm9rb.mongodb.net/e-commerce?retryWrites=true&w=majority'
 await mongoose.connect(uri,{
        useNewUrlParser:true,useUnifiedTopology:true
    }).then((res)=>{console.log("connect successfully");
return res}).catch((err)=>{
        console.log(err);
    })

    

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


}

export  default DB_connection
export {atlasDBConn}
// export default atlasDBConn;