import { User } from "@prisma/client"
import { AddressSchema, UpdateUserSchema } from "../schema/users.js"
import { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { NotFoundException } from "../exceptions/not_found.js";
import { ErrorCode } from "../exceptions/root.js";
import { success } from "zod";
import { Address } from "../generated/prisma/index.js";
import { BadRequestsException } from "../exceptions/bad_request.js";

export const addAddress = async(req:Request, res:Response) => {

if (!req.user) {
    throw new NotFoundException("User not authenticated", ErrorCode.UNAUTHORIZED_EXCEPTION);
  }
    AddressSchema.parse(req.body)

    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            userId: req.user.id
        }
    })

    res.json(address)
}

export const deleteAddress = async(req:Request, res:Response) => {

    try {
        await prismaClient.address.delete({
            where:{
                id: +req.params.id
            }
        })
        res.json({success: true})
        
    } catch (error) {
        throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND)
    }

}

export const listAddress = async(req:Request, res:Response)=>{

    
if (!req.user) {
    throw new NotFoundException("User not authenticated", ErrorCode.UNAUTHORIZED_EXCEPTION);
  }

    const addresses = prismaClient.address.findMany({
        where: {
            userId: req.user.id
        }
    })
    res.json(addresses)
}

export const updateUser = async (req:Request, res:Response) => {

if (!req.user) {
    throw new NotFoundException("User not authenticated", ErrorCode.UNAUTHORIZED_EXCEPTION);
  }
    const validatedData = UpdateUserSchema.parse(req.body)

    let shippingAddress: Address;
    let billingAddress: Address;

    if(validatedData.defaultShippingAddress){

            try {
        shippingAddress = await prismaClient.address.findFirstOrThrow({
            where: {
                id: validatedData.defaultShippingAddress
            }
        })
    } catch (error) {
        throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND)
    }
            if(shippingAddress.userId != req.user.id){
            throw new BadRequestsException('Address does not belong to the user', ErrorCode.ADDRESS_NOT_FOUND)
        }
    }

        if(validatedData.defaultBillingAddress){

            try {
        billingAddress = await prismaClient.address.findFirstOrThrow({
            where: {
                id: validatedData.defaultBillingAddress
            }
        })
    } catch (error) {
        throw new NotFoundException('Address not found', ErrorCode.ADDRESS_NOT_FOUND)
    }
            if(billingAddress.userId != req.user.id){
            throw new BadRequestsException('Address does not belong to the user', ErrorCode.ADDRESS_NOT_FOUND)
        }
    }

    const updateUser = await prismaClient.user.update({
        where:{
            id: req.user.id
        },
        data: validatedData
    })
    res.json(updateUser)
}