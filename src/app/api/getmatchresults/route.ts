import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const title = searchParams.get("title") || "";

		if (!title) {
			return NextResponse.json(
				{ message: "Title query parameter is required", data: null },
				{ status: 400 }
			);
		}

		const filePath = path.join(process.cwd(), "public", "problems.json");
		const fileContent = fs.readFileSync(filePath, "utf-8");
		const raw = JSON.parse(fileContent);

		const filteredProblems = raw.problems.filter((problem: any) =>
			problem.stat.question__title.toLowerCase().includes(title.toLowerCase())
		);

		return NextResponse.json({
			message: "Success",
			data: filteredProblems.slice(0, 10),
		});
	} catch (err) {
		console.error("Error:", err);
		return NextResponse.json(
			{ message: "Error loading data", data: err },
			{ status: 500 }
		);
	}
}
