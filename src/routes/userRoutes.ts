import { Router } from "express";
import * as userController from '../controllers/userController'
import { admin, user } from "../middlewares/authentication";

const router = Router();

router.get('/getAllUsers', admin, userController.getAllUsers);
router.get('/:id', userController.getAllUsers);

router.post('/', userController.createUser);
router.post('/login', userController.checkLogin);
router.post('/createToken', user, userController.createToken);
router.post('/refreshToken', user, userController.refreshToken);

router.put('/:id', userController.updateUser);


export { router as UserRouter };