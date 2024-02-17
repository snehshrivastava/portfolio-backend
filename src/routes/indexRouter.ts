import { Router } from "express";
import { RoleRouter } from "./roleRoutes";
import { UserRouter } from "./userRoutes";
import express, { Request, Response } from 'express';
import { BlogRouter } from "./blogRoutes";
const app = express();

app.use('/roles', RoleRouter);
app.use('/users', UserRouter);
app.use('/blogs', BlogRouter);


export { app as indexRouter };