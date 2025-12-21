import { Request, Response } from "express";
import { prismaClient } from "../index.js";
import { Prisma } from "../generated/prisma/index.js";
import { NotFoundException } from "../exceptions/not_found.js";
import { ErrorCode } from "../exceptions/root.js";

export const createProduct = async (req: Request, res: Response) => {
  const { name, description, tags, price } = req.body;

  const product = await prismaClient.product.create({
    data: {
      name,
      description,
      tags: tags.join(","),
      price: new Prisma.Decimal(price),
    },
  });
  

  res.status(201).json(product);
};


export const UpdateProduct = async (req:Request, res:Response) =>{
    try {
        const product = req.body;

        if(product.tags){
            product.tags = product.tags.join(',')
        }

        const updateProduct = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        })
        res.json(updateProduct)
    } catch (error) {
        throw new NotFoundException('Product not Found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const DeleteProduct = async (req:Request, res:Response) =>{
    try {

        const DeleteProduct = await prismaClient.product.delete({
            where: {
                id: +req.params.id
            },
        })
        res.json(DeleteProduct)
    } catch (error) {
        throw new NotFoundException('Product not Found', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

export const getProduct = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count();

  const skip =
    typeof req.query.skip === "string" ? Number(req.query.skip) : 0;

  const products = await prismaClient.product.findMany({
    skip,
    take: 5,
  });

  res.json({
    count,
    data: products,
  });
};


export const getProductById = async (req:Request, res:Response) => {

try {
        const getProduct = await prismaClient.product.findFirstOrThrow({
        where:{
            id: +req.params.id
        },
    })
    res.json(getProduct)
} catch (error) {
    throw new NotFoundException('Product not Found', ErrorCode.PRODUCT_NOT_FOUND)
}
}