import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// DB connection
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check user exist in db or not
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({
        error: "User does'nt exist",
        statusCode: 400,
      });

    // Check if user password correct or not
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword)
      return NextResponse.json({
        message: "Invalid password provided",
        error: true,
        statusCode: 401,
      });

    // Create token
    const tokenData = { id: user._id, username: user.name, email: user.email };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    let response = NextResponse.json({
      message: "Login Successfull",
      statusCode: 200,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      error: true,
      statusCode: 400,
    });
  }
};
