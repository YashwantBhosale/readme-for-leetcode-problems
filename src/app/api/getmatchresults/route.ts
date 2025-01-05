import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const title = searchParams.get("title") || "";
		const limit = parseInt(searchParams.get("limit") || "10");
		const skip = parseInt(searchParams.get("skip") || "0");

		if (!title) {
			return NextResponse.json(
				{ message: "Title query parameter is required", data: null },
				{ status: 400 }
			);
		}

		// GraphQL Query
		const query = `#graphql
			query getProblems($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
				problemsetQuestionList: questionList(
					categorySlug: $categorySlug
					limit: $limit
					skip: $skip
					filters: $filters
				) {
					total: totalNum
					questions: data {
						acRate
						difficulty
						questionFrontendId
						isFavor
						isPaidOnly
						title
						titleSlug
						topicTags {
							name
							id
							slug
						}
						hasSolution
						hasVideoSolution
					}
				}
			}`;

		// Filters for title search
		const variables = {
			categorySlug: "",
			limit,
			skip,
			filters: { searchKeywords: title },
		};

		// Fetch from GraphQL API
		const response = await fetch("https://leetcode.com/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ query, variables }),
		});

		// Parse JSON
		const result = await response.json();
		console.log("API Response:", JSON.stringify(result, null, 2));

		// Handle errors
		if (!response.ok || result.errors) {
			return NextResponse.json(
				{ message: "Failed to fetch data", data: result.errors || null },
				{ status: 500 }
			);
		}

		// Extract data safely
		const problems = result.data?.problemsetQuestionList?.questions || [];

		return NextResponse.json({
			message: "Success",
			data: problems,
		});
	} catch (err) {
		console.error("Error:", err);
		return NextResponse.json(
			{ message: "Error loading data", data: err },
			{ status: 500 }
		);
	}
}
