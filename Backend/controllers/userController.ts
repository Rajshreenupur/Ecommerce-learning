import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken'
import dotenv from 'dotenv';
import User from '../models/userModel';

dotenv.config();

const SALT_ROUNDS = 10;

export const signUpUser = async (req: Request, res: Response): Promise<void> => {

  const { username,email, password } = req.body;
  if (!username||!email || !password) {
    res.status(400).json({ message: 'username,email and password are required' });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newAdmin = new User({ username,email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
};


export const signInUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' });
    return;
  }

  try {
    const user = await User.findOne({ email : email});

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
    const token = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.USER_JWT_SECRET as Secret,
      // { expiresIn: '1d' },
    );
    res.status(200).json({ message: 'Sign-in successful', token ,error:false });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error:true });
  }
};