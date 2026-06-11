import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const body = await request.json();

        /*
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/auth/login`,
      {
        email: body.email,
        password: body.password,
      }
    );
    */

        // dummay response
        const response = {
            data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummyTokenSignature",
                user: {
                    _id: "507f1f7bbcf8390f1b0e1234",
                    email: "tawheed.anjum@example.com",
                    password: "a1b2c3d4e5f6g7h8i9j0hashedWithBcrypt", // already hashed
                    createdAt: new Date("2025-03-15T08:30:00Z"),
                },
                profile: {
                    _id: "507f1f7bbcf8390f1b0e5678",
                    user: "507f1f7bbcf8390f1b0e1234", // FK → User._id
                    firstName: "Tawheed",
                    lastName: "Anjum",
                    avatar: "https://res.cloudinary.com/mycloud/image/upload/v1234/avatars/tawheed_anjum.jpg",
                    createdAt: new Date("2025-03-15T08:31:00Z"),
                },
            },
        };

        const { token, user, profile } = response.data;

        if (!token) {
            return NextResponse.json(
                {
                    message: "Authentication token not received",
                },
                {
                    status: 500,
                },
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
            },
        );
    } catch (error) {
        const status = error?.response?.status || 500;

        return NextResponse.json(
            {
                message: error?.response?.data?.message || "Login failed",
            },
            {
                status,
            },
        );
    }
}
