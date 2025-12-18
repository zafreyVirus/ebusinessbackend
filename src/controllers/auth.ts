import type { NextFunction, Request, Response } from "express"
import { prismaClient } from "../index.js";
import {compareSync, hashSync} from 'bcrypt';
import { BadRequestsException } from '../exceptions/bad_request.js';
// import {sign} from 'jsonwebtoken';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets.js";
import { ErrorCode } from "../exceptions/root.js";
import { UnprocessableEntity } from "../exceptions/validation.js";
import { SignUpSchema } from "../schema/users.js";
import { NotFoundException } from "../exceptions/not_found.js";


export const signup = async (req:Request, res:Response, next: NextFunction) =>{
        SignUpSchema.parse(req.body)
        const {email, name, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})

    if(user){
       new BadRequestsException('User not found', ErrorCode.USER_ALREADY_EXISTS)
    }
    user = await prismaClient.user.create(
        {
            data:{
                name,
                email,
                password:hashSync(password,10)
            }
        }
    )
    res.json(user)
}

export const login = async (req:Request, res:Response) =>{
    const {email, password} = req.body;

    let user = await prismaClient.user.findFirst({where: {email}})

    if(!user){
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND)
    }

    if(!compareSync(password,user.password)){
        throw new BadRequestsException("Incorrect password", ErrorCode.INCORRECT_PASSWORD)
    }

    const token = jwt.sign({
        userId: user.id,
    }, JWT_SECRET)
    
    res.json({user, token})
}