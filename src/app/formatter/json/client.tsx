"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Code, Minimize2, Trash2, Copy, AlertTriangle } from "lucide-react";
import { useTheme } from "next-themes";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface JsonFormatterClientProps {
  initialValue?: string;
}

/**
 * Client-side JSON Formatter component.
 *
 * - Input textarea
 * - Format / Minify buttons
 * - Output textarea (read-only)
 * - Copy button (with clipboard fallback)
 * - Clear button
 * - Character counts and basic error display
 * - Keyboard shortcuts:
 *   - Ctrl/Cmd+Enter => Format
 *   - Ctrl/Cmd+M => Minify
 *   - Ctrl/Cmd+K => Clear
 */
export default function JsonFormatterClient({
  initialValue = "",
}: JsonFormatterClientProps) {
  const [input, setInput] = React.useState<string>(initialValue);
  const [output, setOutput] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [isMinified, setIsMinified] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const tryParse = (text: string) => {
    // Intentionally strict: use native JSON.parse
    return JSON.parse(text);
  };

  const formatJson = React.useCallback(() => {
    setError(null);
    try {
      const parsed = tryParse(input);
      const pretty = JSON.stringify(parsed, null, 2);
      setIsMinified(false);
      setOutput(pretty);
    } catch (e: any) {
      setOutput("");
      setError(e?.message ?? "Invalid JSON");
    }
  }, [input]);

  const minifyJson = React.useCallback(() => {
    setError(null);
    try {
      const parsed = tryParse(input);
      const min = JSON.stringify(parsed);
      setIsMinified(true);
      setOutput(min);
    } catch (e: any) {
      setOutput("");
      setError(e?.message ?? "Invalid JSON");
    }
  }, [input]);

  const copyOutput = React.useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      return;
    } catch {
      // fallback below
    }

    // Fallback for environments without navigator.clipboard
    try {
      const ta = document.createElement("textarea");
      ta.value = output;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    } catch {
      // ignore failures
    }
  }, [output]);

  const clearAll = React.useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold">JSON Formatter</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Paste JSON into the input area and click <strong>Format</strong> to
          pretty-print, or <strong>Minify</strong> to compress. Formatting runs
          entirely in your browser.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <section className="flex flex-col">
          <div className="border rounded-lg p-4 bg-card shadow-sm">
            <label className="mb-3 text-sm font-medium">Input</label>
            <Editor
              height="32rem"
              language="json"
              value={input}
              onChange={(value) => setInput(value || "")}
              theme={monacoTheme}
              options={{
                readOnly: false,
                minimap: { enabled: false },
                lineNumbers: "on",
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
              loading={<div>Loading editor...</div>}
            />
            <div className="flex items-center gap-2 mt-4">
              <Button size="sm" onClick={formatJson} disabled={!input}>
                <Code className="w-4 h-4 mr-1" />
                Format
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={minifyJson}
                disabled={!input}
              >
                <Minimize2 className="w-4 h-4 mr-1" />
                Minify
              </Button>
              <Button size="sm" variant="ghost" onClick={clearAll}>
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
              <div className="ml-auto text-sm text-muted-foreground">
                {input ? `${input.length} chars` : "empty"}
              </div>
            </div>
          </div>
        </section>

        {/* Output */}
        <section className="flex flex-col">
          <div className="border rounded-lg p-4 bg-card shadow-sm">
            <label className="mb-3 text-sm font-medium">Output</label>
            <Editor
              height="32rem"
              language="json"
              value={output}
              theme={monacoTheme}
              options={{
                readOnly: true,
                minimap: { enabled: false },
                lineNumbers: "on",
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: isMinified ? "on" : "off",
              }}
              loading={<div>Loading editor...</div>}
            />
            <div className="flex items-center gap-2 mt-4">
              <Button size="sm" onClick={copyOutput} disabled={!output}>
                <Copy className="w-4 h-4 mr-1" />
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  if (!output) {
                    formatJson();
                  }
                }}
              >
                Ensure Formatted
              </Button>

              <div className="ml-auto text-sm text-muted-foreground">
                {output ? `${output.length} chars` : "empty"}
              </div>
            </div>
          </div>
        </section>
      </div>

      {error && (
        <div
          className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex items-start gap-3"
          role="alert"
        >
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <strong className="font-medium">Error:</strong>
            <span className="ml-2">{error}</span>
          </div>
        </div>
      )}

      <footer className="mt-6 text-xs text-muted-foreground">
        Shortcuts: <kbd className="px-1 border rounded">Ctrl/Cmd+Enter</kbd>{" "}
        Format • <kbd className="px-1 border rounded">Ctrl/Cmd+M</kbd> Minify •{" "}
        <kbd className="px-1 border rounded">Ctrl/Cmd+K</kbd> Clear
      </footer>
    </div>
  );
}
