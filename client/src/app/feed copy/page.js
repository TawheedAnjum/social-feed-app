"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { logout } from "@/features/auth/authService";
import { clearCredentials } from "@/features/auth/authSlice";

export default function FeedPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(clearCredentials());
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Feed Page</h1>

      <button
        type="button"
        className="btn btn-danger"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}