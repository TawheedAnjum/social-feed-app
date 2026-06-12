import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = cookies().get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const response = await axios.get(
      `${process.env.BACKEND_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { user, profile } = response.data;

    return NextResponse.json(
      {
        success: true,
        user,
        profile,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error?.response?.data?.message ||
          "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}