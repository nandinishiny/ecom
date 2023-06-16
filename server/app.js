import express from "express";
import productRouter from './routes/productRoute.js';
import { mongoConnect } from "./config/database.js";
import errorHandlerMiddleware from "./middleware/error.js";
import userRouter from "./routes/userRoute.js";
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderRoute.js";
dotenv.config({path:"server/config/config.env"})
mongoConnect().then(console.log(`connected successfully in app`)).catch((e)=>console.log(`the error occusrs ${e}`))


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use("/api/v1",productRouter);
app.use("/api/v1",userRouter);
app.use("/api/v1",orderRouter);



//middleware for errors
app.use(errorHandlerMiddleware);




export default app;