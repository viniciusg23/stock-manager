import { model, Schema } from "mongoose";

const employeeSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        job: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

export const EmployeeModel = model("Employee", employeeSchema);