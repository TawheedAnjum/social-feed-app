import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import generateToken, {
  JWT_EXPIRES_IN,
  getTokenExpiresAt,
} from "../utils/generateToken.js";

const registerUser = async ({ firstName, lastName, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error("User already exists with this email.");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({
    email,
    password,
  });

  const profile = await Profile.create({
    user: user._id,
    firstName,
    lastName,
  });

  const token = generateToken(user._id);
  const expiresAt = getTokenExpiresAt();

  return {
    token,
    expiresAt,
    user: {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    },
    profile,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401;
    throw error;
  }

  const profile = await Profile.findOne({ user: user._id });

  const token = generateToken(user._id);
  const expiresAt = getTokenExpiresAt();

  return {
    token,
    expiresAt,
    user: {
      _id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    },
    profile,
  };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password");
  const profile = await Profile.findOne({ user: userId });

  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }

  return {
    user,
    profile,
  };
};

export { registerUser, loginUser, getCurrentUser };