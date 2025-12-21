import { Response, Request } from "express"
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart.js"
import { Product } from "../generated/prisma/index.js"
import { NotFoundException } from "../exceptions/not_found.js"
import { ErrorCode } from "../exceptions/root.js"
import { prismaClient } from "../index.js"
import { success } from "zod"

export const addItemToCart = async (req:Request, res:Response) =>{

    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product

    if (!req.user) {
    throw new NotFoundException("User not authenticated", ErrorCode.UNAUTHORIZED_EXCEPTION);
  }

    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validatedData.productId
            }
        })
    } catch (error) {
        throw new NotFoundException("Product not found!", ErrorCode.PRODUCT_NOT_FOUND)
    }

    const cart = await prismaClient.cartItem.create({
        data:{
            userId: req.user.id,
            productId: product.id,
            quantity: validatedData.quantity
        }
    })
    res.json(cart)
}

export const deleteItemFromCart = async (req:Request, res:Response)=>{

    await prismaClient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    })
    res.json({success: true})
}

export const changeQuantity = async (req:Request, res:Response)=>{

    const validatedData = ChangeQuantitySchema.parse(req.body)

    const updatedCart = prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data:{
            quantity: validatedData.quantity
        }
    })

    res.json(updatedCart)
    
}

export const getCart = async (req: Request, res:Response)=>{
 const cart = await prismaClient.cartItem.findMany({
    where: {
        userId: req.user?.id
    },
    include: {
        product: true
    }
 })
 res.json(cart)
}