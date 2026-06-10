"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import "highlight.js/styles/github-dark.css";

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "sup", "sub"],
};

function adjustMdText(text: string) {
  if (!text) return text;
  text = text.replace(/<br \/>/g, "\n");
  const lines = text.split("\n");
  let inside = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l.startsWith("```")) {
      if (!inside && l === "```") lines[i] = "```plaintext";
      inside = !inside;
    }
  }
  return lines.join("\n");
}

interface PreviewProps { text: string }

const Preview: React.FC<PreviewProps> = ({ text }) => {
  return (
    <div className="panel">
      <div className="preview-header">
        <span className="preview-label">Preview</span>
      </div>
      <div className="preview-body">
        <div className="markdown-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema], rehypeHighlight]}
            components={{
              code({ className, children, ...props }) {
                const isBlock = !!className;
                if (!isBlock) {
                  return <code className={className} {...props}>{children}</code>;
                }
                return (
                  <pre>
                    <code className={className} {...props}>{children}</code>
                  </pre>
                );
              },
            }}
          >
            {adjustMdText(text)}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Preview;
