import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export const POST = async (request: NextRequest) => {
  console.log("request");
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { username, email, password } = reqBody;

    // First check if user exist or not
    const user = await User.findOne({ email });
    if (user)
      return NextResponse.json({
        error: "User already exist",
        statusCode: 400,
      });

    // Generate hash password
    const generatedSalt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, generatedSalt);

    // Creating new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully !",
      statusCode: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: true,
      message: error.message,
      statusCode: 500,
    });
  }
};
