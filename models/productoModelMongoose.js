import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    producto: {
      type: String,
      required: true,
      trim: true,
    },
    stockAmount: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'stockAmount debe ser un entero',
      },
    },
    fechaIngreso: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    timestamps: false,
  }
);

export default mongoose.model('Producto', productoSchema);
