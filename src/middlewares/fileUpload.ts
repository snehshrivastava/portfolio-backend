
import multer from 'multer';
import fs from 'fs';
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        fs.mkdirSync('./tmp/my-uploads', { recursive: true })
        cb(null, './tmp/my-uploads')
    },
    filename: function (_req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
export { upload as fileUpload };