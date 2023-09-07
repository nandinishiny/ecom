import express from "express";
import productRouter from './routes/productRoute.js';
import { mongoConnect } from "./config/database.js";
import errorHandlerMiddleware from "./middleware/error.js";
import userRouter from "./routes/userRoute.js";
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import orderRouter from "./routes/orderRoute.js";
import bodyParser from "body-parser";
import paymentRouter from "./routes/paymentRoute.js";
import corouselRouter from "./routes/corouselRoute.js";
import path from 'path'
dotenv.config({path:"server/config/config.env"})
mongoConnect().then(console.log(`connected successfully in app`)).catch((e)=>console.log(`the error occusrs ${e}`))


const app = express();
// app.use(express.json());
app.use(bodyParser.json()); // for JSON-encoded bodies
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: ['https://ecom-88hx.vercel.app/'],
    credentials: true
  }));
app.use("/api/v1",productRouter);
app.use("/api/v1",userRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",paymentRouter);
app.use("/api/v1",corouselRouter);
app.get("/api/v1/getkey",(req,res)=>{
  res.status(200).json({
    key:"rzp_test_vTeNx7bSuCyyuP"
  })
})
app.get('/razorpay-callback', (req, res) => {
  // Process the callback data here

  // Assuming payment is successful
  const orderId = req.body.orderId; // Example: Get the order ID from the callback data

  // Construct the orders page URL
  const ordersPageUrl = `${process.env.FRONTEND_URL}/order/${orderId}`;

  // Send the orders page URL as part of the response
  res.json({ status: 'success', ordersPageUrl });
});
// //for production
// app.use(express.static(path.join(__dirname,'../client/dist')))
// app.get('*',function(req,res){
//   res.sendFile(path.join(__dirname,'../client/dist/index.html'))
// })
//middleware for errors
app.use(errorHandlerMiddleware);




export default app;