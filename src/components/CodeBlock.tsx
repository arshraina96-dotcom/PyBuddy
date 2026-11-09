import React, { useState } from 'react';
import { Check, Copy, Play, Bug, BookOpen } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  onSendToDryRun?: (code: string) => void;
  onSendToDebugger?: (code: string) => void;
  onSendToExplainer?: (code: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  onSendToDryRun,
  onSendToDebugger,
  onSendToExplainer,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-3 rounded-xl border border-purple-900/40 bg-slate-950/90 shadow-lg overflow-hidden">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-purple-900/30 bg-slate-900/70 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-purple-300 font-medium tracking-wide">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onSendToDryRun && (
            <button
              onClick={() => onSendToDryRun(code)}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-purple-300 hover:bg-purple-950/50 rounded transition-colors text-xs"
              title="Open in Dry Run Visualizer"
            >
              <Play className="w-3.5 h-3.5 text-purple-400" />
              <span>Dry Run</span>
            </button>
          )}

          {onSendToDebugger && (
            <button
              onClick={() => onSendToDebugger(code)}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-amber-300 hover:bg-amber-950/50 rounded transition-colors text-xs"
              title="Debug this snippet"
            >
              <Bug className="w-3.5 h-3.5 text-amber-400" />
              <span>Debug</span>
            </button>
          )}

          {onSendToExplainer && (
            <button
              onClick={() => onSendToExplainer(code)}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-blue-300 hover:bg-blue-950/50 rounded transition-colors text-xs"
              title="Explain this code"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Explain</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white hover:bg-purple-900/40 rounded transition-colors text-xs font-medium"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-3 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-100">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-purple-950/20">
                <td className="w-8 select-none pr-4 text-right text-slate-600 font-mono text-xs align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-slate-200">
                  {formatPythonTokens(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Lightweight Python syntax tokenizer for clean presentation
function formatPythonTokens(line: string): React.ReactNode {
  if (line.trim().startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Keywords highlighting
  const pythonKeywords = [
    'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'break',
    'continue', 'import', 'from', 'as', 'try', 'except', 'finally', 'with',
    'lambda', 'yield', 'in', 'is', 'not', 'and', 'or', 'True', 'False', 'None'
  ];

  const words = line.split(/(\s+|[()[\]{},.:=+\-*/%<>!]+)/);

  return words.map((token, i) => {
    if (pythonKeywords.includes(token)) {
      return (
        <span key={i} className="text-purple-400 font-semibold">
          {token}
        </span>
      );
    }
    if (/^["'].*["']$/.test(token)) {
      return (
        <span key={i} className="text-emerald-300">
          {token}
        </span>
      );
    }
    if (/^\d+(\.\d+)?$/.test(token)) {
      return (
        <span key={i} className="text-amber-300">
          {token}
        </span>
      );
    }
    if (['print', 'range', 'len', 'type', 'input', 'int', 'str', 'float', 'list', 'dict', 'set', 'tuple', 'enumerate'].includes(token)) {
      return (
        <span key={i} className="text-blue-400 font-medium">
          {token}
        </span>
      );
    }
    return <span key={i}>{token}</span>;
  });
}
