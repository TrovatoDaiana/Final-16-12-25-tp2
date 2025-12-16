import express from "express";
import morgan from "morgan";
import productoRoutes from "./routes/productoRoutes.js";
import albumsRoutes from "./routes/albumsRoutes.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms"),
);

// POST /api/v1/productos
// GET  /api/v1/productos
// GET  /api/v1/productos/:id
// PUT  /api/v1/productos/:id (protegido)
// DELETE /api/v1/productos/:id (protegido)
app.use("/api/v1/productos", productoRoutes);

// Ruta de albums CSV
app.use("/api/v1/albums", albumsRoutes);

// Not Found
app.use(notFoundHandler);

export default app;
