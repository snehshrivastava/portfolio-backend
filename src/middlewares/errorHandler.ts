import { NextFunction, Request, Response } from "express"

export function errorHandler (err:Error, req:Request, res:Response, next:NextFunction) {
    res.status(500).send({
        message:"failed",
        data:err.message
    })
    // res.render('error', { error: err })
  }
  