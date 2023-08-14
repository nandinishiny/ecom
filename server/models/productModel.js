import mongoose,{Schema} from 'mongoose';
const productSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please Enter the product Name"],
    },
    description:{
        type:String,
        required:[true,"Please enter the description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the product price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    }],
    category:{
        type:String,
        required:[true,"Please enter a product category"],
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock cannot exceed 4 letters"],
        default:1
    },
    offer:{
        type:Number,
        default:5
    },
    noOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

})


// ,
    // "reviews": [
    //     {
    //       "user":"647b385e4fcb7b03e4357aba",
    //         "name": "nandini",
    //         "rating": 5,
    //         "comment": "the very good product"
    //     }
    // ]




export default mongoose.model('Product',productSchema);