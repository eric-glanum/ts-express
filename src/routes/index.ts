import express from "express";
import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";
import { IUser } from "../types";
const router = express.Router();
const prisma = new PrismaClient();

router.get("/getUsers", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      where: {},
    });
    res.status(200).json({ users });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "internal server error", err: err.message });
  }
});

router.get(
  '/getUser/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: any = req.params;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json(user);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "internal server error", err: err.message });
    }
  }
);

router.post(
  "/createUser",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
        },
      });
      res.status(200).json(newUser);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "internal server error", err: err.message });
    }
  }
);

router.delete(
  "/deleteUsers",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deleteUsers = await prisma.user.deleteMany({
        where: {},
      });
      res.status(200).json(deleteUsers);
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "internal server error", err: err.message });
    }
  }
);

router.delete(
  "/deleteUser/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: any = req.params
      const deleteUser = await prisma.user.delete({
        where: {
          id,
        }
      });
      res.status(200).json(deleteUser)
    } catch (err: any) {
      res
        .status(500)
        .json({ message: "internal server error", err: err.message });
    }
  }
);

export default router;
