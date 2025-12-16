import { Router } from "express";
import { ProductoController } from "../controllers/productoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Crea un producto (sin autenticación)
router.post("/", ProductoController.createOne);

// Lista todos los productos (sin autenticación)
router.get("/", ProductoController.getAllProducts);

// Devuelve un producto por id (sin autenticación)
router.get("/:id", ProductoController.getById);

// Edita producto por id (protegido)
router.put("/:id", authMiddleware, ProductoController.updateOne);

// Incrementa stock (protegido)
router.put("/:id/stock", authMiddleware, ProductoController.updateStock);

// Elimina producto por id (protegido)
router.delete("/:id", authMiddleware, ProductoController.deleteOne);

export default router;
