import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import ApiFeatures from "../utils/apiFeatures.js";

//--admin route
export const createProduct = catchAsyncErrors( async(req,res,next)=>{
    req.body.user = req.user.id; //we are assigning the value "user":"user id"
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })

    
});

export const getAllProducts =catchAsyncErrors(async(req,res,next)=>{
    const resultPerPage =8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount,
    });
});
//get single Product
export const getSingleProduct = catchAsyncErrors(async(req,res,next)=>{
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found",404));//this works only when we enter another id like wrong only if we skill skip anything we need to put that in try catch block.
        }
        res.status(200).json({
            success: true,
            product
        });
    
});
//admin route
export const updateProduct =catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
     if (!product) {
            return next(new ErrorHandler("Product not found",404));
        }
    
    product = await Product.findByIdAndUpdate(req.params.id,req.body,
        {new:true,runValidators:true,useFindAndModify:false});

    res.status(200).json({
        success:true,
        product
    })
})
export const deleteProduct =catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
        }
    
    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        msg:"successfully deleted"
    })
})

//Create a new review or update the Review --by user.
export const createProductReview = catchAsyncErrors(async(req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    if (!product.reviews) {
      product.reviews = [];
    }
    const isReviewed = product.reviews.find(rev => rev.user && rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
    }
    product.noOfReviews = product.reviews.length;
    product.ratings =
      product.reviews.reduce((total, rev) => total + rev.rating, 0) /
      product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
  //get all product reviews
  export const getProductReviews = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id); //in this id is queryname which is lhs of query.
    if(!product){
      return next(new ErrorHandler("the product is not found",404))
    }
    res.status(200).json({
      success:true,
      reviews:product.reviews
    })
  });
  export const deleteReview = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);
    if(!product){
      return next(new ErrorHandler("the product is not found",404));
    }
    const reviews =product.reviews.filter(rev=>rev._id.toString() !==req.query.reviewId.toString());//we are filtering all reviews except the one which we want to delete.
    const ratings =
      reviews.reduce((total, rev) => total + rev.rating, 0) /
      reviews.length;
   const noOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.id,{
      reviews,
      ratings,
      noOfReviews
    },{
      new:true,
      runValidators:true,
      useFindAndModify:false
    })

    res.status(200).json({
      success:true,
      msg:"successfuly deleted"
    })


  });