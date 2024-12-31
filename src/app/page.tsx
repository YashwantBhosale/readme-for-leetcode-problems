"use client";
import SearchInput from "@/components/search/Search";
import TextEditor from "@/components/editor/Editor";
import Preview from "@/components/preview/Preview";
import { useState } from "react";
import { fetchProblem, fetchReadme } from "./utils";

export default function Home() {
	const [text, setText] = useState("");
	const [searchValue, setSearchValue] = useState("");

	async function onSearch(value: string) {
		try {
			const data = await fetchProblem(value);
			const html = data.data.question;
			const readme = await fetchReadme(html);

			const finalText = `## ${data.data.questionFrontendId}. ${
				data.data.questionTitle
			}  \n---  \n ${
				readme.data ? readme.data.replace(/<br \/>/g, "  \n") : ""
			}`;

			console.log(finalText);
			setText(finalText);
		} catch (e) {
			console.error("Error:", e);
		}
	}

	return (
		<div className="pt-10 flex flex-col items-center">
			<h1 className="text-4xl font-bold text-center">Welcome!</h1>
			<p className="mt-5 text-center w-[90%]">
				Welcome to leetcode problems readme generator. You can search for
				problems and generate markdown files for them.
			</p>
			<SearchInput
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				onSearch={onSearch}
				className="w-full max-w-md mt-10 flex-wrap sm:w-[90%]"
			/>
			<div className="mt-10 w-full h-full flex sm:flex-col sm:items-center">
				<TextEditor text={text} setText={setText} />
				<Preview text={text} />
			</div>
		</div>
	);
}
