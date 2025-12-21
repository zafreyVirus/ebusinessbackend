import { Router } from "express";
import { errorHandler } from "../error_handler.js";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart.js";

const cartRoutes:Router = Router()

cartRoutes.post('/', errorHandler(addItemToCart))
cartRoutes.get('/', errorHandler(getCart))
cartRoutes.delete('/:id', errorHandler(deleteItemFromCart))
cartRoutes.put('/:id', errorHandler(changeQuantity))

export default cartRoutes