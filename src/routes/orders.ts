import { Router } from "express";
import { errorHandler } from "../error_handler.js";
import { cancelOrder, createOrder, getOrderById, listOrders } from "../controllers/orders.js";

const orderRoutes:Router = Router()

orderRoutes.post('/', errorHandler(createOrder))
orderRoutes.get('/', errorHandler(listOrders))
orderRoutes.put('/:id/cancel', errorHandler(cancelOrder))
orderRoutes.get('/:id', errorHandler(getOrderById))

export default orderRoutes