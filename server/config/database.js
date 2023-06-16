import mongoose from 'mongoose';
export const mongoConnect = async()=>{
    await mongoose.connect(process.env.DB_URI,{
        dbName:"ecomtwo",
        useNewUrlParser: true,
         useUnifiedTopology: true
    }).then((data)=>console.log(`db is connected and the host is ${data.connection.host}`))

}