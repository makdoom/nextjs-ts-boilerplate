import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    let response = NextResponse.json({
      message: "Logout successfull",
      statusCode: 200,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      error: true,
      statusCode: 500,
    });
  }
};
