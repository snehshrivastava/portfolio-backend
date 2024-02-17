import { Mongoose } from "mongoose";
import { server } from "./src/server";
declare global {
  var customvar: any;
};
server();