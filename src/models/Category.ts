import { model, Schema } from "mongoose";

const categorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        fiscalCode: { type: String, required: true, unique: true },
    },
    {
        timestamps: true
    }
)

export const CategoryModel = model("Category", categorySchema);