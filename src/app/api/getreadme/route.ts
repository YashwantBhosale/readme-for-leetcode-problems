// main route to generate readme
import { NextResponse } from "next/server";
import TurndownService from "turndown";

type ResponseData = {
	message: string;
	data: string;
};


export async function POST(req: Request) {
	try {
		const { html } = await req.json();

		if (!html) {
			return NextResponse.json(
				{ message: "HTML body is required", data: null },
				{ status: 400 }
			);
		}

		const turndownService = new TurndownService();

		turndownService.addRule("image", {
			filter: "img",
			replacement: (content: any, node: any) => {
				const src = node.getAttribute("src");
				const alt = node.getAttribute("alt") || "Image";
				return `![${alt}](${src})`;
			},
		});

		turndownService.addRule("bold", {
			filter: ["strong", "b"],
			replacement: (content: string) => `**${content}**`,
		});

		turndownService.addRule("italic", {
			filter: ["em", "i"],
			replacement: (content: string) => `*${content}*`,
		});

		let markdown = turndownService.turndown(html);
		markdown = markdown.replace(/\n/g, "  <br />");

        // remove all \\ before or after [ or ] character
        markdown = markdown.replace(/\\(\[|\])/g, "$1");

		return NextResponse.json({
			message: "Success",
			data: markdown,
		});
	} catch (e) {
		console.error("Error:", e);
		return NextResponse.json(
			{ message: "Error loading data", data: e },
			{ status: 500 }
		);
	}
}
