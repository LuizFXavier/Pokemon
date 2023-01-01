import multer from "multer"
import {resolve} from "path"

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, resolve("./src/uploads"))
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.especie + ".png");
    }

})

const upload = multer({storage})

export default upload;