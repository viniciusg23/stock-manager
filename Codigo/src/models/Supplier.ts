import { model, Schema } from "mongoose";

const supplierSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

export const SupplierModel = model("Supplier", supplierSchema);