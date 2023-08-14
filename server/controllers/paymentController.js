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
    res.status(200).json({
        success:true,
      })

}