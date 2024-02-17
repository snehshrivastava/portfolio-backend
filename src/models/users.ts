import mongoose, { Schema, model } from "mongoose";
import { options } from "./optionsMongoose/options";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: Number, required: true, unique: true, min: 1000000000, max: 9999999999 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        roles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles', required: false }],
        isDeleted: { type: Boolean, default: false }
    },
    options
)

const UserModel = model('users', UserSchema);
export default UserModel;