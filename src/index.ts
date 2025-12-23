import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import rootRouter from "./routes/index.js";
import { connectionString, PORT } from "./secrets.js";
import { errorMiddleware } from "./middlewares/errors.js";
import { SignUpSchema } from "./schema/users.js";

const pool = new Pool({
  connectionString: connectionString,
});

const adapter = new PrismaPg(pool);

const app = express();

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  adapter,
  log: ["query"],
}).$extends({
  result:{
    address:{
      formattedAddress:{
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          pincode: true
        },
        compute: (addr) => {
          return `${addr.lineOne}, ${addr.lineTwo}, ${addr.city}, ${addr.country}-${addr.pincode}`
        }
      }
    }
  }
})

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("Here we Go!!!!");
});
