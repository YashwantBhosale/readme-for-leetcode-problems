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
			replacement: (_content: string, node: Node) => {
				const src = (node as Element).getAttribute("src");
				const alt = (node as Element).getAttribute("alt") || "Image";
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

		turndownService.addRule("superscript", {
			filter: "sup",
			replacement: (content: string) => `<sup>${content}</sup>`,
		});

		turndownService.addRule("subscript", {
			filter: "sub",
			replacement: (content: string) => `<sub>${content}</sub>`,
		});

		// Use HTML <code> instead of backticks so nested sup/sub tags render
		turndownService.addRule("inlineCode", {
			filter: (node: Node) =>
				(node as Element).nodeName === "CODE" &&
				node.parentNode?.nodeName !== "PRE",
			replacement: (content: string) => `<code>${content}</code>`,
		});

		let markdown = turndownService.turndown(html);
		markdown = markdown.replace(/\n/g, "  <br />");
		markdown = markdown.replace(/\\(\[|\])/g, "$1");

		const responseData: ResponseData = {
			message: "Success",
			data: markdown,
		};

		return NextResponse.json(responseData);
	} catch (e) {
		console.error("Error:", e);
		return NextResponse.json(
			{ message: "Error loading data", data: e },
			{ status: 500 }
		);
	}
}
