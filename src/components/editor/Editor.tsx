"use client";
import React, { useState } from "react";
import { Bold, Italic, Copy, Download, Settings2, Check } from "lucide-react";

interface TextEditorProps {
  text: string;
  setText: (text: string) => void;
  loading?: boolean;
}

const FONT_FAMILIES = [
  { value: "mono", label: "Mono" },
  { value: "sans-serif", label: "Sans" },
  { value: "serif", label: "Serif" },
];

const TextEditor = ({ text, setText, loading }: TextEditorProps) => {
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState("mono");
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.replace(/<br \/>/g, "  \n"));
  };

  const wrapSelection = (wrapper: string) => {
    const ta = document.querySelector<HTMLTextAreaElement>(".editor-textarea");
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const wrapped = `${wrapper}${value.slice(s, e)}${wrapper}`;
    setText(value.slice(0, s) + wrapped + value.slice(e));
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(s + wrapper.length, e + wrapper.length);
    }, 0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const handleExport = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const resolvedFont =
    fontFamily === "mono"
      ? "var(--font-geist-mono), monospace"
      : fontFamily === "serif"
      ? "Georgia, serif"
      : "var(--font-geist-sans), sans-serif";

  return (
    <div className="panel">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button onClick={() => wrapSelection("**")} className="toolbar-btn" title="Bold" aria-label="Bold">
            <Bold size={14} />
          </button>
          <button onClick={() => wrapSelection("*")} className="toolbar-btn" title="Italic" aria-label="Italic">
            <Italic size={14} />
          </button>
        </div>
        <div className="toolbar-group">
          <button onClick={handleCopy} className="toolbar-btn" title="Copy markdown" aria-label="Copy">
            {copied ? <Check size={14} style={{ color: "var(--accent)" }} /> : <Copy size={14} />}
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="toolbar-btn"
            title="Editor settings"
            aria-label="Settings"
            style={showSettings ? { background: "var(--surface-2)", color: "var(--ink)" } : {}}
          >
            <Settings2 size={14} />
          </button>
          <button onClick={handleExport} className="toolbar-btn" title="Download README.md" aria-label="Export">
            <Download size={14} />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="editor-settings-panel">
          <label>
            Size
            <input
              type="number"
              value={fontSize}
              min={10}
              max={24}
              onChange={(e) => setFontSize(parseInt(e.target.value) || 14)}
              style={{ width: 56 }}
            />
          </label>
          <label>
            Font
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
              {FONT_FAMILIES.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </label>
        </div>
      )}

      <textarea
        className={`editor-textarea${loading ? " loading-shimmer" : ""}`}
        disabled={loading}
        value={loading ? "Loading…" : text}
        onChange={handleChange}
        placeholder="Search a problem above to generate its README…"
        spellCheck={false}
        style={{ fontFamily: resolvedFont, fontSize }}
      />
    </div>
  );
};

export default TextEditor;
