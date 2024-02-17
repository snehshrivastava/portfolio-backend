import { Schema, model } from "mongoose";
import { options } from "./optionsMongoose/options";

export const TokenSchema = new Schema(
    {
        user_id: { type: String, ref: 'users' },
        token: String,
        refreshToken: String,
        isDeleted: { type: Boolean, default: false }
    },
    options
)

const TokenModel = model('tokens', TokenSchema);
export default TokenModel;