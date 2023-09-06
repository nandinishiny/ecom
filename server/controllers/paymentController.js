import { instance } from "../server.js"
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
  console.log(DB_URI)
  // res.status(200).send('Payment verification successful. Redirecting...');
  res.redirect('${DB_URI}/payment/success');
  // Include a script to redirect to your frontend page
}