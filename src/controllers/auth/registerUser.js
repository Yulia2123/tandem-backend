import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { userModel } from "../../models/user.js";
import { createSession, setSessionCookies } from '../../services/auth.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json({
    message: "User created successfully",
    data: newUser,
  });
};
