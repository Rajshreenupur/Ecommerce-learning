import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/adminModel';
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

export const signUpAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username,email, password } = req.body;

  if (!username||!email || !password) {
    res.status(400).json({ message: 'Username,Email and password are required' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newAdmin = new Admin({ username,email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
};


export const signInAdmin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const admin = await Admin.findOne({ email : email});

    if (!admin) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const token = jwt.sign(
      { email: admin.email, _id: admin._id },
      process.env.JWT_SECRET as Secret,
      // { expiresIn: '1d' },
    );
    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
};