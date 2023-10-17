import { model, Schema } from "mongoose";

const SaleSchema = new Schema(
    {
        productId: { type: String, required: true },
        quantity: { type: String, required: true },
        salePrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        employeeId: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

export const SaleModel = model("Sale", SaleSchema);