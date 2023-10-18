import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  // validateRequest(UserValidation.create),
  authController.signUp
);

router.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  authController.loginUser
);

router.patch('/change-password/:id', authController.ChangePassword);

export const AuthRoutes = router;
