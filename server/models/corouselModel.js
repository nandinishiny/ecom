import mongoose,{Schema} from 'mongoose';
const corouselShema = new Schema({
    name:{
        type:String,
        required:true
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
    }]  
});

export default mongoose.model('Corousel',corouselShema);