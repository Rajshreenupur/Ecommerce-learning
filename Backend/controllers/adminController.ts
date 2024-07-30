// controllers/admin.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/adminModel';

const SALT_ROUNDS = 10;

export const signUpAdmin = async (req: Request, res: Response): Promise<void> => {
  const { username,email, password } = req.body;

  if (!username||!email || !password) {
    res.status(400).json({ message: 'Username,Email and password are required' });
    return;
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new admin with the hashed password
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
    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Authentication successful
    res.status(200).json({ message: 'Sign-in successful', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
};