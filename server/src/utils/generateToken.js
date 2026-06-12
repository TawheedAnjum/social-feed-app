import jwt from "jsonwebtoken";

export const JWT_EXPIRES_IN = "7d";

export const getTokenExpiresAt = () => {
  return new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
  ).toISOString();
};

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

export default generateToken;