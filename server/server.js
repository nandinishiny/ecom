import app from './app.js';
import dotenv from 'dotenv';
dotenv.config({path:"server/config/config.env"})
//Handling uncaught errors means in which they are undefined .--this should be at the top--
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to uncaught Exceptions`);
    process.exit(1);

});

const port = process.env.PORT||5000;
const server = app.listen(port,()=>console.log(`the server is running at ${port}`));

process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandling rejections`);
    server.close(()=>{
        process.exit(1);
})})