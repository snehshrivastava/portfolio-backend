// const openRoutes = process.env.

import { NextFunction, Request, Response } from "express";
import { validateJwtToken } from "../common/jwtToken";

const admin = (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.headers['Authorization'];
    token = token.substring(7, token.length);
    const decodedData: any = validateJwtToken(token);
    req.headers.user_id = decodedData.user_id;
    // req.user.id = decodedData.user_id;
    if (decodedData.roles.includes("admin")) {
        next();
    }
    res.status(401).send("Not Authorized");
}

const user = (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.headers['Authorization'];
    token = token.substring(7, token.length);

    const decodedData: any = validateJwtToken(token);
    req.headers.user_id = decodedData.user_id;

    if (decodedData.roles.includes("user")) {
        next();
    }
    res.status(401).send("Not Authorized");
}

const approver = (req: Request, res: Response, next: NextFunction) => {
    let token: any = req.headers['Authorization'];
    token = token.substring(7, token.length);
    const decodedData: any = validateJwtToken(token);
    req.headers.user_id = decodedData.user_id;
    if (decodedData.roles.includes("admin")) {
        next();
    }
    res.status(401).send("Not Authorized");
}

export { admin, user, approver };