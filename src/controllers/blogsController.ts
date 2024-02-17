import { NextFunction, Request, Response } from "express";
import BlogsModel from "../models/blogs";
import fs from 'fs';
import db from "../server";

export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = req.body;
        const blog = new BlogsModel(data);
        // userData = {...body};</
        const blogData = await blog.save();
        res.status(200).send({
            message: "success",
            data: blogData
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const getAllBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const blogData = await BlogsModel.find();
        res.status(200).send({
            message: "success",
            data: blogData
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const getBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // const { topic, article, pictures } = req.body;
        // const blog = new BlogsModel({ topic, article, pictures });
        // userData = {...body};
        const _id = req.params.id;
        const blogData = await BlogsModel.findById(_id);
        res.status(200).send({
            message: "success",
            data: blogData
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const _id = req.params.id;
        // const { topic, article, pictures } = req.body;
        const blog = await BlogsModel.findOneAndUpdate({ _id, user_id: req.headers.user_id }, { ...req.body }, { new: true });
        // userData = {...body};
        // const blogData = await blog.save();
        console.log('db', db);
        res.status(200).send({
            message: "success",
            data: blog
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }

}

export const uploadPicture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const files: any = req.files;
        // upload to s3
        files.map((f: any) => {
            fs.unlink(f.path, (err) => {
                if (err) {
                    console.error('error deleting the file', err)
                }

                //file removed
            })
        });

        res.status(200).send({
            message: "success",
            data: "blogData"
        });
    } catch (e) {
        console.log('error in createUser', e);
        next(e);
    }
}