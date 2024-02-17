import { Schema, model } from "mongoose";
import { options } from "./optionsMongoose/options";

const TestSchema = new Schema(
    {
        name:String,
        age:Number,
        val:String
    },
    options
)

const TestModel = model('test',TestSchema);
export default TestModel;