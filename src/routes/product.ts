// import { Router } from "express";
// import { errorHandler } from "../error_handler.js";
// import { createProduct } from "../controllers/products.js";
// import authMiddleware from "../middlewares/auth.js";
// import adminMiddleware from "../middlewares/adminMiddleware.js";

// const productRoutes:Router = Router()

// productRoutes.post('/', errorHandler(createProduct))

// export default productRoutes

import { Router } from "express";
import { createProduct, UpdateProduct, DeleteProduct } from "../controllers/products.js";
import { validate } from "../middlewares/validate.js";
// import { CreateProductSchema } from "../schema/product.js";
import { CreateProductSchema } from "../schema/products.js";
import authMiddleware from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { errorHandler } from "../error_handler.js";

const productRoutes = Router();

productRoutes.post(
  "/",
//   authMiddleware,
//   adminMiddleware,
  validate(CreateProductSchema),
  errorHandler(createProduct)
);

productRoutes.put("/:id",
    errorHandler(UpdateProduct)
);

productRoutes.delete("/:id",
    errorHandler(DeleteProduct)
);

export default productRoutes;
