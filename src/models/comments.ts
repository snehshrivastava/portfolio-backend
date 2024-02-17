import mongoose, { Schema, model } from "mongoose";
import { options } from "./optionsMongoose/options";

export const CommentSchema = new Schema(
    {
        comment: { type: String, require: true },
        userId: { type: mongoose.Schema.ObjectId, require: true, ref: 'users' },
        blogId: { type: mongoose.Schema.ObjectId, require: true, ref: 'blogs' },
        isDeleted: { type: Boolean, default: false }
    },
    options
)

const CommentsModel = model('comments', CommentSchema);
export default CommentsModel;