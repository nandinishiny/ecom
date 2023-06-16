
//(err,req,res,next) this for error handling middleware functions and
//(req,res,next,err) for normal middle ware functions
//err is instance of errorHandler class.not understand much about this.
const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb id error
  if(err.name==="CastError"){
    const message =`Resource not found.Invalid:${err.path}`;
    err= new ErrorHandler(message,400);
  }

  //mongodb duplicate key erro means regestering with same email.
  if(err.code===11000){
    const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
    err= new ErrorHandler(message,400);

  }
  //wrong jwt error
  if(err.name==="JsonWebTokenError"){
    const message=`Json web token is invalid, try again`
    err= new ErrorHandler(message,400);
  }

  //wrong jwt expire err
  if(err.name==="TokenExpireError"){
    const message=`Json web token is expired, try again`
    err= new ErrorHandler(message,400);
    
  }
  res.status(err.statusCode).json({
    success: false,
    message:err.message,
   
  });
};

export default errorHandlerMiddleware;