// class ErrorHandler extends Error {
//     constructor(message, statusCode) {
//       super(message);
//       this.statusCode = statusCode;
//       // this.message = message;
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
  
//   export default ErrorHandler;
// utils/errorhandler.js

class ErrorHandler extends Error {
  constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
