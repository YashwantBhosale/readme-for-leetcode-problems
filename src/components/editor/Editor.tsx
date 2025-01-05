"use client";
import React, { useState } from "react";
import {
	FaBold,
	FaItalic,
	FaCog,
	FaFileExport,
	FaCopy,
} from "react-icons/fa";

interface TextEditorProps {
	text: string;
	setText: (text: string) => void;
	loading?: boolean;
}

const TextEditor = ({ text, setText, loading }: TextEditorProps) => {
	const [fontSize, setFontSize] = useState(16);
	const [fontFamily, setFontFamily] = useState("sans");
	const [showSettings, setShowSettings] = useState(false);

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value.replace(/<br \/>/g, "  \n");
		setText(newValue);
	};

	const wrapSelectedText = (textarea: HTMLTextAreaElement, wrapper: string) => {
		const { selectionStart, selectionEnd, value } = textarea;
		const selectedText = value.slice(selectionStart, selectionEnd);
		const before = value.slice(0, selectionStart);
		const after = value.slice(selectionEnd);

		const wrappedText = `${wrapper}${selectedText}${wrapper}`;
		setText(before + wrappedText + after);

		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(
				selectionStart + wrapper.length,
				selectionEnd + wrapper.length
			);
		}, 0);
	};

	const toggleBold = () => {
		const textarea = document.querySelector("textarea");
		if (textarea) {
			wrapSelectedText(textarea, "**");
		}
	};

	const toggleItalic = () => {
		const textarea = document.querySelector("textarea");
		if (textarea) {
			wrapSelectedText(textarea, "*");
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
		} catch (err) {
			console.error('Failed to copy text:', err);
		}
	};

	const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFontSize(parseInt(e.target.value));
	const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setFontFamily(e.target.value);

	const handleExport = () => {
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "README.md";
		a.click();
	};

	return (
		<div className="w-[50%] mx-5 min-h-[70vh] max-h-[70vh] px-2 my-5 overflow-hidden bg-white rounded-lg shadow-lg min-w-[300px] pb-3 flex-1 sm:w-[90%]">
			<div className="my-2 flex items-center justify-between">
				<div className="space-x-2">
					<button
						onClick={toggleBold}
						className={`p-2 rounded text-black hover:bg-gray-100`}
						aria-label="Toggle Bold"
					>
						<FaBold />
					</button>
					<button
						onClick={toggleItalic}
						className={`p-2 rounded text-black hover:bg-gray-100`}
						aria-label="Toggle Italic"
					>
						<FaItalic />
					</button>
				</div>
				<div className="space-x-2">
					<button
						onClick={handleCopy}
						className="p-2 rounded text-black hover:bg-gray-100"
						aria-label="Copy Text"
					>
						<FaCopy />
					</button>
					<button
						onClick={() => setShowSettings(!showSettings)}
						className="p-2 rounded text-black hover:bg-gray-100"
						aria-label="Settings"
					>
						<FaCog />
					</button>
					<button
						onClick={handleExport}
						className="p-2 rounded text-black hover:bg-gray-100"
						aria-label="Export"
					>
						<FaFileExport />
					</button>
				</div>
			</div>
			{showSettings && (
				<div className="mb-4 p-4 bg-gray-100 rounded text-black">
					<div className="flex items-center space-x-4">
						<label className="flex items-center">
							Font Size:
							<input
								type="number"
								value={fontSize}
								onChange={handleFontSizeChange}
								className="ml-2 p-1 w-16 rounded border"
							/>
						</label>
						<label className="flex items-center">
							Font Family:
							<select
								value={fontFamily}
								onChange={handleFontFamilyChange}
								className="ml-2 p-1 rounded border"
							>
								<option value="sans">Sans-serif</option>
								<option value="serif">Serif</option>
								<option value="mono">Monospace</option>
							</select>
						</label>
					</div>
				</div>
			)}
			<textarea
				disabled={loading}
				value={loading ? "Loading..." : text}
				onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
					handleTextChange(e);
					// autoResize(e);
				}}
				className={`w-full h-full max-h-[90%] py-5 resize-none outline-none border overflow-scroll px-4 rounded-lg focus:outline-none text-black`}
				style={{
					fontFamily: `${fontFamily}, sans-serif`,
					fontSize: `${fontSize}px`,
				}}
			></textarea>
		</div>
	);
};

export default TextEditor;