import { NextResponse } from "next/server";
import { Problem } from "@/types";
import { formatData } from "@/app/utils";

type ResponseData = {
	message: string;
	data: Problem;
};

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const titleSlug = searchParams.get("title");

		if (!titleSlug) {
			return NextResponse.json(
				{ message: "Title query parameter is required", data: null },
				{ status: 400 }
			);
		}

		const query = `#graphql
		query selectProblem($titleSlug: String!) {
			question(titleSlug: $titleSlug) {
				questionId
				questionFrontendId
				title
				titleSlug
				content
				difficulty
				likes
				dislikes
				topicTags {
					name
					slug
					translatedName
				}
				stats
				hints
				status
				note
			}
		}`;

		const response = await fetch("https://leetcode.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Referer: "https://leetcode.com",
			},
			body: JSON.stringify({
				query: query,
				variables: {
					titleSlug,
				},
			}),
		});

		const rawData = await response.json();
		console.log(rawData);
		const responseData: ResponseData = {
			message: "Success",
			data: formatData(rawData.data.question),
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
