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
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

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
      setActiveTab("preview");
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

        <div className="mobile-tabs" role="tablist" aria-label="Panel view">
          <button
            role="tab"
            aria-selected={activeTab === "editor"}
            className={`tab-btn${activeTab === "editor" ? " tab-btn--active" : ""}`}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "preview"}
            className={`tab-btn${activeTab === "preview" ? " tab-btn--active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>

        <div className="panels-row">
          <div className={`panel-col${activeTab !== "editor" ? " panel-col--hidden-sm" : ""}`}>
            <TextEditor text={text} setText={setText} loading={isLoading} />
          </div>
          <div className={`panel-col${activeTab !== "preview" ? " panel-col--hidden-sm" : ""}`}>
            <Preview text={text} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
