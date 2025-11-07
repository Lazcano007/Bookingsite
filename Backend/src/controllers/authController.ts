import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel';
import { hashPassword, verifyPassword } from '../utils/bcrypt';
import generateToken from '../utils/generateToken';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import Booking from '../models/bookingModel';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'You have to fill all the fields!' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'This user already exists!' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken((newUser._id as string).toString(), newUser.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Theres been a server error!', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'You wrote the wrong email or password!' });
    }

    const isCorrectPassword = await verifyPassword(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: 'You wrote the Wrong email or password!' });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken((user._id as string).toString(), user.role),
    });
  } catch (error) {
    res.status(500).json({ message: 'Theres been a server error!' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { user } = req as AuthenticatedRequest;
    res
      .status(200)
      .json({ name: user.name, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Theres been a server error!', error });
  }
};

// --------ADMIN----------

export const getUserById = async (req: Request, res: Response) => {
  try {
    const getUser = await User.findById(req.params.id).select('-password');
    if (!getUser) {
      return res.status(404).json({ message: 'This user is not found!' });
    }
    res.status(200).json(getUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Theres been an error fetching this user!', error });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select( // den tar itne med lösenord, och $ne betyder "inte lika med" alltså att den hämtar alla användarer som inte är admin
      '-password'
    ); 
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Theres been an error fetching all user!', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    if (!name && !role) {
      return res.status(400).json({ message: 'You must update at least one fild to update!' });
    }

    const updateFields: any = {};
    if(name) updateFields.name = name;
    if(role) {
      if(!['user', 'admin'].includes(role))  {
        return res.status(400).json({ message: "This is an invalid value!" });
      }
      updateFields.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, select: '-password' }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'This user is not found!' });
    }
    res.status(200).json({
      message: 'This user has been successfilly updated!',
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Theres been an error updating this user!', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'This user is not found!' });
    }

    const deletedBookings = await Booking.deleteMany({
      userId: new mongoose.Types.ObjectId(id),
    });
    res.status(200).json({
      message: `You successfully deleted ${deletedUser.name} and ${deletedBookings.deletedCount} related bookings!`,
      deletedUser: { id: deletedUser._id, email: deletedUser.email },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Theres been an error deleting user!', error });
  }
};

export const createUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: 'You have to fill all the fields!' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'This user already exists!' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
    });
    res.status(201).json({
      message: 'This user has been successfully crated by an admin!',
      newUser: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Theres been an error creating this user!', error });
  }
};

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email');

    const validBookings = bookings.filter(booking => booking.userId !== null);
    res.status(200).json(validBookings);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Theres been an error fetching all bookings!', error });
  }
};

