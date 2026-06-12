import asyncHandler from "../utils/asyncHandler.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const result = await registerUser({
    firstName,
    lastName,
    email,
    password,
  });

  res.status(201).json(result);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await loginUser({
    email,
    password,
  });

  res.status(200).json(result);
});

const getMe = asyncHandler(async (req, res) => {
  const result = await getCurrentUser(req.user._id);

  res.status(200).json(result);
});

export { register, login, getMe };