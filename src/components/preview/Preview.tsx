"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

interface PreviewProps {
	text: string;
}

function adjustMdText(text: string) {
	text = text.replace(/<br \/>/g, "  \n");

	const lines = text.split("\n");
	let insideCodeBlock = false; // Flag to track if we are inside a code block

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Detect opening code block (```)
		if (line.startsWith("```") && line.length === 3 && !insideCodeBlock) {
			// If it's an opening code block and we haven't inserted a language yet
			lines[i] = "```plaintext";
			insideCodeBlock = true;
		}
		// Detect closing code block (```)
		else if (line.startsWith("```") && line.length === 3 && insideCodeBlock) {
			// If it's a closing code block, we stop modifying
			insideCodeBlock = false;
		}
	}

	return lines.join("\n");
}

const Preview: React.FC<PreviewProps> = ({ text }) => {
	console.log(text);
	return (
		<div className="mt-5 mx-3 w-[50%] min-h-[500px] h-[100%] p-6 text-black bg-white rounded-lg shadow-lg">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeSanitize, rehypeHighlight, rehypeRaw]} // Add plugins as necessary
				components={{
					// Inline Code
					code({ inline, className, children, ...props }) {
						const isInline = inline || !className;
						if (isInline) {
							return (
								<span className="bg-gray-200 font-mono text-black px-1 rounded">
									{children}
								</span>
							);
						} else {
							return (
								<pre className="bg-gray-800 text-white p-4 rounded mt-2 overflow-auto">
									<code {...props} className={className}>
										{children}
									</code>
								</pre>
							);
						}
					},
					// links
					a({ children, href }) {
						return (
							<a href={href} className="text-blue-500 hover:underline">
								{children}
							</a>
						);
					},
					// Tables
					table({ children }) {
						return (
							<table className="table-auto w-full border-collapse my-4">
								{children}
							</table>
						);
					},
					// Table Rows
					tr({ children }) {
						return <tr className="border-b">{children}</tr>;
					},
					// Table Header
					th({ children }) {
						return (
							<th className="text-left py-2 px-4 border-b bg-gray-200">
								{children}
							</th>
						);
					},
					// Table Data Cells
					td({ children }) {
						return <td className="py-2 px-4 border-b">{children}</td>;
					},
					//line break
					br() {
						return <br />;
					}

				}}
			>
				{adjustMdText(text)}
			</ReactMarkdown>
		</div>
	);
};

export default Preview;
