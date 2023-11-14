import { model, Schema } from "mongoose";

const SaleSchema = new Schema(
    {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        salePrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        employeeId: { type: String, required: true },
        buyerName: { type: String, required: true },
        buyerEmail: { type: String },
        buyerNumber: { type: String }
    },
    {
        timestamps: true
    }
)

export const SaleModel = model("Sale", SaleSchema);