import mongoose, { Schema, model } from "mongoose";
import { options } from "./optionsMongoose/options";

export const BlogsSchema = new Schema(
    {
        topic: { type: String, require: true },
        article: { type: String, require: true },
        pictures: [{ type: String }],
        user_id: { type: mongoose.Schema.ObjectId, ref: 'users', require: true },
        comments: [{ type: mongoose.Schema.ObjectId, ref: 'comments' }],
        approved: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false }
    },
    options
)

const BlogsModel = model('blogs', BlogsSchema);
export default BlogsModel;