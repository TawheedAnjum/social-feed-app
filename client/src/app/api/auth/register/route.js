import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function getErrorPayload(error, fallbackMessage) {
  const status = error?.response?.status || 500;
  const data = error?.response?.data;

  return {
    status,
    body: {
      success: false,
      message: data?.message || fallbackMessage,
      errors: data?.errors || [],
    },
  };
}

export async function POST(request) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/register`,
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
      }
    );

    const { token, user, profile } = response.data;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
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
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        user,
        profile,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const { status, body } = getErrorPayload(error, "Registration failed");

    return NextResponse.json(body, {
      status,
    });
  }
}