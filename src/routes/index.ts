import express from 'express';
import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
import { IUser } from '../types';
import jwt from 'jsonwebtoken';

const router = express.Router();
const prisma = new PrismaClient();
router.get('/', (req: Request, res: Response) => {
  console.log(req.session);
  res.send('hello session tut');
});

router.get('/getUsers', async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      where: {},
    });
    res.status(200).json({ users });
  } catch (err: any) {
    res.status(500).json({ message: 'internal server error', err: err.message });
  }
});

router.get('/getUser/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id: any = parseInt(req.params.id);
    const user: any = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    const token = jwt.sign({ userid: user.id }, 'supersecret', {
      expiresIn: '1h',
    });
    user ? res.status(200).json({ user, token }) : res.status(404).json({ message: 'user unknown' });
  } catch (err: any) {
    res.status(500).json({ message: 'internal server error', err: err.message });
  }
});

router.post('/createUser', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;
    const newUser: IUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    // req.session.user;
    //console.log('session', req.session.user);
    res.status(200).json(newUser);
  } catch (err: any) {
    res.status(500).json({ message: 'internal server error', err: err.message });
  }
});

router.delete('/deleteUsers', async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteUsers = await prisma.user.deleteMany({
      where: {},
    });
    res.status(200).json(deleteUsers);
  } catch (err: any) {
    res.status(500).json({ message: 'internal server error', err: err.message });
  }
});

router.delete('/deleteUser/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id: any = parseInt(req.params.id);
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json(deleteUser);
  } catch (err: any) {
    res.status(500).json({ message: 'internal server error', err: err.message });
  }
});

router.put('/updateUser/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { newName, newEmail } = req.body;
    const id: any = parseInt(req.params.id);
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: newName,
        email: newEmail,
      },
    });
    res.status(200).json(updateUser);
  } catch (err: any) {
    res.status(500).json({ message: 'internal server error', err: err.message });
  }
});

export default router;
