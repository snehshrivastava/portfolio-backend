import { NextFunction, Request, Response } from "express";
import UserModel from "../models/users";
import { compare, encrypt } from "../common/bcrypt";
import { generateRefreshToken, generateToken, validateJwtToken } from "../common/jwtToken";
import RolesModel, { RoleSchema } from "../models/roles";
import TokenModel, { TokenSchema } from "../models/tokens";


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const userData = await UserModel.find().populate('roles').select({ name: 1, phone: 1, email: 1, roles: 1 });
    res.status(200).send({
        message: "success",
        data: userData
    });
}
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const hashedPass = await encrypt(body.password);
        body.password = hashedPass;
        if (!body.roles) {
            body.roles = ['65cdf7b049824f29193ceab5']; // default user role
        }
        const user = new UserModel(body);
        // userData = {...body};</
        const userData = await user.save();
        res.status(200).send({
            message: "success",
            data: userData
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const checkLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const body = req.body;
        const userData = await UserModel.find({ email: body.email })
        const check = await compare(body.password, userData[0].password);
        if (check) {
            res.status(200).send({
                message: "success",
                data: userData
            });
        } else {
            throw Error('wrong password entered');
        }

    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const _id = req.params.id;
        const body = req.body;
        const userData = await UserModel.findByIdAndUpdate(_id, body, { upsert: false, new: true });
        res.status(200).send({
            message: "success",
            data: userData
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const createToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const _id = req.body.id;
        const userData = await UserModel.findById(_id).populate('roles');
        const roleData: any = userData?.roles;
        if (!userData) {
            throw new Error(`no user data with this id: ${_id}`);
        }
        const roles = roleData.map((r: any) => {
            return r.role
        });
        // const rolesArray = userData?.roles.map(r => r.role)
        const jwtData = {
            user_id: _id,
            roles: roles
        }
        let token = generateToken(jwtData);
        const refreshToken = generateRefreshToken(jwtData);
        const tokenDataToSave = new TokenModel();
        tokenDataToSave.user_id = _id;
        tokenDataToSave.token = token;
        tokenDataToSave.refreshToken = refreshToken;
        await tokenDataToSave.save();
        res.status(200).send({
            message: "success",
            data: { token, refreshToken }
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}
export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken = req.body.refreshToken;
        const decodedData: any = validateJwtToken(refreshToken);

        const userData = await UserModel.findById(decodedData?.user_id).populate('roles');
        const roleData: any = userData?.roles;
        if (!userData) {
            throw new Error(`no user data with this id: ${decodedData?.user_id}`);
        }
        const roles = roleData.map((r: any) => {
            return r.role
        });
        // const rolesArray = userData?.roles.map(r => r.role)
        const jwtData = {
            user_id: decodedData?.user_id,
            roles: roles
        }
        const token = generateToken(jwtData);
        const getTokenData: any = await TokenModel.find({ refreshToken: refreshToken });
        if (!getTokenData || !getTokenData.length) {
            throw new Error('No such token present');
        }
        await TokenModel.findByIdAndUpdate(getTokenData._id, { token })
        // const refreshToken = generateRefreshToken(jwtData);

        res.status(200).send({
            message: "success",
            data: { token }
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}
// export {getAllUsers};