import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.get('/', OrderController.getAllOrders);

router.get('/:id', OrderController.getSingleOrder);

router.post('/create-order', OrderController.createOrder);
router.delete('/id', OrderController.createOrder);

export const OrderRoutes = router;
