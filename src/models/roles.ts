import { Schema, model } from "mongoose";
import { options } from "./optionsMongoose/options";

export const RoleSchema = new Schema(
    {
        role: String,
    },
    options
)

const RolesModel = model('roles', RoleSchema);
export default RolesModel;