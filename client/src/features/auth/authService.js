import api from "@/lib/axios";

export const login = async (email, password) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async (firstName, lastName, email, password) => {
  const response = await api.post("/api/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });

  return response.data;
};

export const logout = async () => {
  const response = await api.post("/api/auth/logout");

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/api/auth/me");

  return response.data;
};