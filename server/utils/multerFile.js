import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log("hello")

        cb(null,'./server/uploads/' );
    },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + '-' + file.originalname);
        
    }
});

export const upload = multer({ storage });

