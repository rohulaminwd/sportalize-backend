import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getMyProfile);

export const ProfileRoutes = router;
