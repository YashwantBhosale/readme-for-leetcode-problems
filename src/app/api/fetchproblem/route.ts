import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
  data: any;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return NextResponse.json(
        { message: "Title query parameter is required", data: null },
        { status: 400 }
      );
    }

    const response = await fetch(
      "http://localhost:3000/select?titleSlug=" + title
    );
    const data = await response.json();

    const responseData: ResponseData = {
      message: "Success",
      data: data,
    };

    return NextResponse.json(responseData);
  } catch (err) {
    console.error("Error:", err);

    return NextResponse.json(
      { message: "Error fetching data", data: err },
      { status: 500 }
    );
  }
}
