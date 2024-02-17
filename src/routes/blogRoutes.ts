import { Router } from "express";
import { fileUpload } from "../middlewares/fileUpload";
import * as blogsController from "../controllers/blogsController";
import { user } from "../middlewares/authentication";

const router = Router();

router.get('/', blogsController.getAllBlogs);
router.get('/:id', blogsController.getBlog);

router.post('/', user, blogsController.createBlog);
router.post('/uploadPics', user, fileUpload.array('pictures', 5), blogsController.uploadPicture);

router.put('/:id', user, blogsController.updateBlog);

// router.put('/role/:id',userController.updateUser);


export { router as BlogRouter };