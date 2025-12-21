import { Router } from "express";
import { errorHandler } from "../error_handler.js";
import { addAddress, deleteAddress, listAddress, updateUser } from "../controllers/user.js";

const usersRoutes:Router = Router()

usersRoutes.post('/address', errorHandler(addAddress))
usersRoutes.delete('/address/:id', errorHandler(deleteAddress))
usersRoutes.get('/address', errorHandler(listAddress))
usersRoutes.put('/', errorHandler(updateUser))

export default usersRoutes

