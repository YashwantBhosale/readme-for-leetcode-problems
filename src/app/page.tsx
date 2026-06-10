"use client";
import { useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import SearchInput from "@/components/search/Search";
import TextEditor from "@/components/editor/Editor";
import Preview from "@/components/preview/Preview";
import { fetchProblem, fetchReadme } from "./utils";

export default function Home() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  async function onSearch(value: string) {
    try {
      setIsLoading(true);
      const data = await fetchProblem(value);
      const html = data.data.question;
      const readme = await fetchReadme(html);

      const finalText = `## ${data.data.questionFrontendId}. ${data.data.questionTitle}\n\n${
        readme.data ? readme.data.replace(/<br \/>/g, "  \n") : ""
      }`;

      setText(finalText);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page-shell">
      <Header />

      <main className="main-content">
        <div className="hero">
          <h1>LeetCode README Generator</h1>
          <p>
            Search any problem and get a clean, copy-ready Markdown README in seconds.
          </p>
        </div>

        <SearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={onSearch}
        />

        <div className="panels-row">
          <TextEditor text={text} setText={setText} loading={isLoading} />
          <Preview text={text} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
