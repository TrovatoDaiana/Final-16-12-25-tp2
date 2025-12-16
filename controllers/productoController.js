import { ProductoRepository as ProductoRepositoryMongoose } from "../repository/productoRepositoryMongoose.js";

function formatYYYYMMDD(date) {
	const d = new Date(date);
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, "0");
	const dd = String(d.getDate()).padStart(2, "0");
	return `${yyyy}-${mm}-${dd}`;
}

export const ProductoController = {
	getAllProducts: async (request, response) => {
		try {
			const productos = await ProductoRepositoryMongoose.getAll();
			response.json({ code: 200, ok: true, payload: productos });
		} catch (error) {
			console.log("Error al obtener los productos:", error.message);
			response
				.status(500)
				.json({ statusCode: 500, error: "Error interno del servidor" });
		}
	},

	getById: async (request, response) => {
		const { id } = request.params;
		try {
			const producto = await ProductoRepositoryMongoose.getOne(id);
			if (!producto) {
				return response
					.status(404)
					.json({ statusCode: 404, error: "Producto no encontrado" });
			}
			response.json({ code: 200, ok: true, payload: producto });
		} catch (error) {
			console.log("Error al obtener el producto:", error.message);
			response
				.status(500)
				.json({ statusCode: 500, error: "Error interno del servidor" });
		}
	},

	createOne: async (request, response) => {
		try {
			const { producto, stockAmount, fechaIngreso } = request.body || {};

			if (
				!producto ||
				typeof producto !== "string" ||
				producto.trim().length === 0
			) {
				return response
					.status(400)
					.json({
						statusCode: 400,
						error: "producto es requerido y no puede estar vacío",
					});
			}
			const amount = Number(stockAmount);
			if (!Number.isInteger(amount) || amount < 0) {
				return response
					.status(400)
					.json({
						statusCode: 400,
						error: "stockAmount debe ser un entero mayor o igual a 0",
					});
			}

			const creado = await ProductoRepositoryMongoose.createOne({
				producto: producto.trim(),
				stockAmount: amount,
				fechaIngreso,
			});
			if (creado?.fechaIngreso)
				creado.fechaIngreso = formatYYYYMMDD(creado.fechaIngreso);
			response.status(201).json({ code: 201, ok: true, payload: creado });
		} catch (error) {
			console.log("Error al crear el producto:", error.message);
			response
				.status(500)
				.json({ statusCode: 500, error: "Error interno del servidor" });
		}
	},

	updateOne: async (request, response) => {
		const { id } = request.params;
		const { producto, stockAmount, fechaIngreso } = request.body || {};
		try {
			if (
				producto !== undefined &&
				(typeof producto !== "string" || producto.trim().length === 0)
			) {
				return response
					.status(400)
					.json({
						statusCode: 400,
						error: "producto debe ser string no vacío",
					});
			}
			if (stockAmount !== undefined) {
				const amount = Number(stockAmount);
				if (!Number.isInteger(amount) || amount < 0) {
					return response
						.status(400)
						.json({
							statusCode: 400,
							error: "stockAmount debe ser un entero mayor o igual a 0",
						});
				}
			}

			const actualizado = await ProductoRepositoryMongoose.updateOne({
				id,
				producto,
				stockAmount,
				fechaIngreso,
			});
			if (!actualizado) {
				return response
					.status(404)
					.json({ statusCode: 404, error: "Producto no encontrado" });
			}
			if (actualizado?.fechaIngreso)
				actualizado.fechaIngreso = formatYYYYMMDD(actualizado.fechaIngreso);
			response.json({ code: 200, ok: true, payload: actualizado });
		} catch (error) {
			console.log("Error al actualizar el producto:", error.message);
			response
				.status(500)
				.json({ statusCode: 500, error: "Error interno del servidor" });
		}
	},

		updateStock: async (request, response) => {
			const { id } = request.params;
			const { increment } = request.body || {};
			try {
				const inc = Number(increment);
				if (!Number.isInteger(inc) || inc < 1) {
					return response
						.status(400)
						.json({
							statusCode: 400,
							error: "increment debe ser un entero mayor o igual a 1",
						});
				}

				const actualizado = await ProductoRepositoryMongoose.incrementStock(
					id,
					inc,
				);
				if (!actualizado) {
					return response
						.status(404)
						.json({ statusCode: 404, error: "Producto no encontrado" });
				}
				if (actualizado?.fechaIngreso)
					actualizado.fechaIngreso = formatYYYYMMDD(actualizado.fechaIngreso);
				response.json({ code: 200, ok: true, payload: actualizado });
			} catch (error) {
				console.log("Error al incrementar stock:", error.message);
				response
					.status(500)
					.json({ statusCode: 500, error: "Error interno del servidor" });
			}
		},

	deleteOne: async (request, response) => {
		const { id } = request.params;
		try {
			const eliminado = await ProductoRepositoryMongoose.deleteOne(id);
			if (!eliminado) {
				return response
					.status(404)
					.json({ statusCode: 404, error: "Producto no encontrado" });
			}
			response.json({ code: 200, ok: true, payload: eliminado });
		} catch (error) {
			console.log("Error al eliminar el producto:", error.message);
			response
				.status(500)
				.json({ statusCode: 500, error: "Error interno del servidor" });
		}
	},
};

export default ProductoController;
