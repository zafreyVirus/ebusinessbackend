import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  price: z.union([
    z.number().positive(),
    z.string().regex(/^\d+(\.\d+)?$/, "Invalid price"),
  ]),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
