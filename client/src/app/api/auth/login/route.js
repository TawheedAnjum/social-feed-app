import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/login`,
      {
        email: body.email,
        password: body.password,
      }
    );

    const { token, user, profile } = response.data;

    if (!token) {
      return NextResponse.json(
        {
          message: "Authentication token not received",
        },
        {
          status: 500,
        }
      );
    }

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json(
      {
        user,
        profile,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const status = error?.response?.status || 500;

    return NextResponse.json(
      {
        message:
          error?.response?.data?.message ||
          "Login failed",
      },
      {
        status,
      }
    );
  }
}