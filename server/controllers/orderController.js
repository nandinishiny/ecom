import Order from "../models/orderModel.js"
import Product from "../models/productModel.js";
import catchAsyncErrors from "../middleware/catchAsync.js";

// Create new order
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    console.log(req.body)
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;
    
    try {
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id,
        });
        
        res.status(201).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error:error,
        });
    }
});

// Get single order 
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if (!order) {
            return res.status(404).json({
                success: false,
                error: "Order not found with this id",
            });
        }
        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

// Get logged-in user orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
});

// Get all orders --admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const orders = await Order.find();
        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice;
        });
        res.status(200).json({
            success: true,
            totalAmount,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

// Update order status --admin
export const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    try {
        const orders = await Order.findById(req.params.id);
        if (orders.orderStatus === 'Delivered') {
            return res.status(404).json({
                success: false,
                error: "You have delivered this order",
            });
        }
        for (const order of orders.orderItems) {
            await updateStock(order.product, order.quantity);
        }
        orders.orderStatus = req.body.status;
        if (req.body.status === "Delivered") {
            orders.deliveredAt = Date.now();
        }
        await orders.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            msg: "Order delivered successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

// Delete orders --admin
export const deleteOrders = catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                error: "Order not found with this id",
            });
        }
        await Order.findByIdAndRemove(req.params.id);

        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});

// Helper function to update stock
async function updateStock(id, quantity) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        product.stock = product.stock - quantity;
        await product.save({ validateBeforeSave: false });
    } catch (err) {
        console.error(`Error updating stock for product with ID ${id}: ${err}`);
        throw err;
    }
}










// import Order from "../models/orderModel.js"
// import Product from "../models/productModel.js";
// import catchAsyncErrors from "../middleware/catchAsync.js";
// // import ErrorHandler from "../utils/errorhandler.js";
// // import ErrorHandler from "../utils/errorhandler.js";
// import ErrorHandler from '../utils/errorHandler.js'

// //create new order
// export const newOrder= catchAsyncErrors(async(req,res,next)=>{
//     const {
//         shippingInfo,
//         orderItems,
//         paymentInfo,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice
//     } = req.body;
//     const order = await Order.create({
//         shippingInfo,
//         orderItems,
//         paymentInfo,
//         itemsPrice,
//         taxPrice,
//         shippingPrice,
//         totalPrice,
//         paidAt:Date.now(),
//         user:req.user._id,
//     });
//     res.status(201).json({
//         success:true,
//         order,
//     });
// });
// //get single order 
// export const getSingleOrder = catchAsyncErrors(async(req,res,next)=>{
//     const order = await Order.findById(req.params.id).populate("user","name email"); 
//     // using populate we can use the documents in other collections
//     if(!order){
//         return next(new ErrorHandler("Order is not found with this id",404));
//     }
//     res.status(200).json({
//         success:true,
//         order
//     });
// });
// //get logged in user orders
// export const myOrders = catchAsyncErrors(async(req,res,next)=>{
//     const orders = await Order.find({user:req.user._id});
//     res.status(200).json({
//         success:true,
//         orders
//     })
// });
// //get all orders --admin
// export const getAllOrders = catchAsyncErrors(async(req,res,next)=>{
//     const orders = await Order.find();
//     let totalAmount = 0;
//     orders.forEach(order=>{
//         totalAmount+=order.totalPrice;
//     })
//     res.status(200).json({
//         success:true,
//         totalAmount,
//         orders
//     })
// });
// //update order status --admin
// export const updateOrderStatus = catchAsyncErrors(async(req,res,next)=>{
//     const orders = await Order.findById(req.params.id);
//     if(orders.orderStatus === 'Delivered'){
//         next(new ErrorHandler("You have delivered this order",404))
//     }
//     orders.orderItems.forEach(async order=>{
//          await updateStock(order.product,order.quantity);
//     });
//     orders.orderStatus= req.body.status;
//     if(req.body.status==="Delivered"){
//         orders.deliveredAt=Date.now();

//     }
//     await orders.save({validateBeforeSave:false});
   
//     res.status(200).json({
//         success:true,
//         msg:"order delivered successfully"
//     })
// });
// async function updateStock(id, quantity) {
//     try {
//       const product = await Product.findById(id);
//       if (!product) {
//         throw new Error(`Product with ID ${id} not found`);
//       }
//       product.stock = product.stock - quantity;
//       await product.save({ validateBeforeSave: false });
//     } catch (err) {
//       console.error(`Error updating stock for product with ID ${id}: ${err}`);
//       throw err;
//     }
//   }
// //delete orders --admin
// export const deleteOrders = catchAsyncErrors(async(req,res,next)=>{
//     const order = await Order.findById(req.params.id);
//     if(!order){
//         return next(new ErrorHandler("Order is not found with this id",404));
//     }
//     await Order.findByIdAndRemove(req.params.id);
    
    
//     res.status(200).json({
//         success:true,
//     })
// });
