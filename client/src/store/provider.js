"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";

import { store } from "@/store/store";
import { setCredentials } from "@/features/auth/authSlice";
import { getCurrentUser } from "@/features/auth/authService";

function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const data = await getCurrentUser();

        if (isMounted && data?.user) {
          dispatch(
            setCredentials({
              user: data.user,
              profile: data.profile || null,
            })
          );
        }
      } catch (error) {
        // User stays logged out.
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}