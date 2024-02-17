import { NextFunction, Request, Response } from "express";
import RolesModel from "../models/roles";

export const createrole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const role = new RolesModel(body);
        // userData = {...body};</
        const userData = await role.save();
        res.status(200).send({
            message: "success",
            data: userData
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const getAllRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // userData = {...body};</
        const userData = await RolesModel.find();
        res.status(200).send({
            message: "success",
            data: userData
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}