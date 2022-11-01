import express from "express";
import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
const router = express.Router();
const prisma = new PrismaClient();

export default router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    where: {},
  });
  res.status(200).json({ users });
});
