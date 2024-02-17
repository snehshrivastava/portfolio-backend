import { Router } from "express";
import * as roleController from '../controllers/rolesController'

const router = Router();

router.get('/', roleController.getAllRoles);
router.post('/', roleController.createrole);
// router.put('/role/:id',userController.updateUser);


export { router as RoleRouter };