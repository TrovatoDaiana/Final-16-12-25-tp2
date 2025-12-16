import mongooseConnection from "../database/mongoose.cnx.js";
import ProductoModel from "../models/productoModelMongoose.js";

export const ProductoRepository = {
	// Obtiene todos los productos
	getAll: async () => {
		await mongooseConnection.connect();
		return await ProductoModel.find({}).lean();
	},

	// Obtiene un producto por id
	getOne: async (id) => {
		await mongooseConnection.connect();
		return await ProductoModel.findById(id).lean();
	},

	// Crea un producto
	createOne: async ({ producto, stockAmount, fechaIngreso }) => {
		await mongooseConnection.connect();
		const doc = await ProductoModel.create({
			producto,
			stockAmount,
			fechaIngreso,
		});
		return doc.toObject();
	},

	// Actualiza un producto por id
	updateOne: async ({ id, producto, stockAmount, fechaIngreso }) => {
		await mongooseConnection.connect();
		return await ProductoModel.findByIdAndUpdate(
			id,
			{ producto, stockAmount, fechaIngreso },
			{ new: true, runValidators: true },
		).lean();
	},

	// Elimina un producto por id
	deleteOne: async (id) => {
		await mongooseConnection.connect();
		return await ProductoModel.findByIdAndDelete(id).lean();
	},
};

export default ProductoRepository;
