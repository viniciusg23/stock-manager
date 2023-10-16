import { model, Schema } from "mongoose";
import { EnumMonth } from "../entities/product/EnumMonth";

const productSchema = new Schema(
  {
    code: { type: String, required: true },
    isFiscal: { type: Boolean, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    purchaseMonth: {
      type: String,
      enum: [
        "Janeiro",
        "Fevereiro",
        "Marco",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      required: true,
    },
    purchaseYear: { type: Number, required: true },
    supplier: { type: String, required: true },
    qrCode: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model("Product", productSchema);
