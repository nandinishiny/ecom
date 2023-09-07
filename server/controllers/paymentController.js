import { instance } from "../server.js"
import dotenv from 'dotenv';
dotenv.config({path:"server/config/config.env"})
export const checkout = async(req,res)=>{
    const options = {
        amount: Number(req.body.amount)*100,  // amount in the smallest currency unit
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      res.status(200).json({
        success:true,
        order
      })
}
export const paymentVerify = (req,res)=>{
  // res.status(200).send('Payment verification successful. Redirecting...');
  res.redirect('${FRONTEND_URL}/payment/success');
  // Include a script to redirect to your frontend page
}