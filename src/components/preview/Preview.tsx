"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import 'highlight.js/styles/github-dark.css';

interface PreviewProps {
  text: string;
}

function adjustMdText(text: string) {
  if (!text) return text;
  text = text.replace(/<br \/>/g, "\n");
  const lines = text.split("\n");
  let insideCodeBlock = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      if (!insideCodeBlock && line.trim() === "```") {
        lines[i] = "```plaintext";
      }
      insideCodeBlock = !insideCodeBlock;
    }
  }
  return lines.join("\n");
}

const Preview: React.FC<PreviewProps> = ({ text }) => {
  return (
    <div className="mt-5 mx-3 w-[50%] min-h-[70vh] max-h-[70vh] overflow-scroll p-6 text-black bg-white rounded-lg shadow-lg flex-1 sm:w-[90%]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize, rehypeHighlight, rehypeRaw]}
        components={{
          code({ inline, className, children, ...props }) {
            const isInline = inline || !className;
            if (isInline) {
              return (
                <span className="bg-gray-800 font-mono text-gray-200 px-1 rounded">
                  {children}
                </span>
              );
            } else {
              return (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded mt-2 overflow-auto">
                  <code {...props} className={className}>
                    {children}
                  </code>
                </pre>
              );
            }
          },
          a({ children, href }) {
            return (
              <a href={href} className="text-blue-400 hover:underline">
                {children}
              </a>
            );
          },
          table({ children }) {
            return (
              <table className="table-auto w-full border-collapse my-4">
                {children}
              </table>
            );
          },
          tr({ children }) {
            return <tr className="border-b">{children}</tr>;
          },
          th({ children }) {
            return (
              <th className="text-left py-2 px-4 border-b bg-gray-800 text-gray-100">
                {children}
              </th>
            );
          },
          td({ children }) {
            return <td className="py-2 px-4 border-b">{children}</td>;
          },
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