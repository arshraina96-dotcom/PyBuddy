import React, { useState } from 'react';
import { TeachingMode, DebugResult } from '../types';
import { Bug, CheckCircle2, AlertOctagon, Lightbulb, Loader2, Sparkles, ShieldAlert, ArrowRight } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface DebuggerViewProps {
  teachingMode: TeachingMode;
  initialCode?: string;
  onSendToDryRun?: (code: string) => void;
}

const BUGGY_PRESETS = [
  {
    name: 'IndexError (Off-by-One)',
    errorType: 'IndexError: list index out of range',
    code: `items = [10, 20, 30, 40]
for i in range(len(items) + 1):
    print("Item at index", i, "is", items[i])`,
    notes: 'Loop tries to access index 4, but list only has indices 0 to 3.',
  },
  {
    name: 'Mutable Default Argument',
    errorType: 'Logical Bug (State leakage)',
    code: `def add_item(val, items=[]):
    items.append(val)
    return items

print(add_item("Apple"))
print(add_item("Banana")) # Prints ['Apple', 'Banana'] unexpectedly!`,
    notes: 'Default list is created once at function definition time, not per call.',
  },
  {
    name: 'TypeError (Str + Int)',
    errorType: 'TypeError: can only concatenate str to str',
    code: `user_age = input("Enter age: ") # e.g. "20"
next_year = user_age + 1
print("Next year you will be " + next_year)`,
    notes: 'input() returns string; adding integer raises TypeError.',
  },
  {
    name: 'Infinite Recursion',
    errorType: 'RecursionError: maximum depth exceeded',
    code: `def count_down(n):
    print(n)
    count_down(n - 1) # Missing base case!

count_down(5)`,
    notes: 'Missing base condition n <= 0 causes call stack overflow.',
  },
];

export const DebuggerView: React.FC<DebuggerViewProps> = ({
  teachingMode,
  initialCode,
  onSendToDryRun,
}) => {
  const [code, setCode] = useState<string>(initialCode || BUGGY_PRESETS[0].code);
  const [errorTrace, setErrorTrace] = useState<string>(BUGGY_PRESETS[0].errorType);
  const [loading, setLoading] = useState<boolean>(false);
  const [debugResult, setDebugResult] = useState<DebugResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleDebug = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          errorMessage: errorTrace,
          teachingMode,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to debug code');
      }

      const data: DebugResult = await res.json();
      setDebugResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during debugging analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <span>PYTHON ERROR EXPLAINER & DEBUGGER</span>
            <span>·</span>
            <span className="uppercase">{teachingMode} Mode</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Debug My Code & Fix Python Errors
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Identify syntax, runtime, and logical bugs with clear explanations and corrected code.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {BUGGY_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setCode(p.code);
                setErrorTrace(p.errorType);
                setDebugResult(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                code === p.code
                  ? 'bg-amber-950/60 text-amber-200 border-amber-600/60'
                  : 'bg-slate-900/60 text-slate-300 border-purple-900/30 hover:bg-slate-800'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Trace Input */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code and Error Trace Input */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Buggy Python Code
            </label>
            <div className="rounded-xl border border-purple-900/40 bg-slate-950 shadow-xl overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                className="w-full p-4 bg-transparent text-slate-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                placeholder="Paste buggy Python code here..."
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Error Message / Traceback (Optional)
            </label>
            <input
              type="text"
              value={errorTrace}
              onChange={(e) => setErrorTrace(e.target.value)}
              placeholder="e.g. IndexError: list index out of range or leave blank"
              className="w-full px-4 py-2 bg-slate-950 border border-purple-900/40 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono"
            />
          </div>

          <button
            onClick={handleDebug}
            disabled={loading || !code.trim()}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-amber-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Diagnosing Bug with PyBuddy...</span>
              </>
            ) : (
              <>
                <Bug className="w-4 h-4" />
                <span>Diagnose & Fix Error</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Diagnosis & Corrected Code */}
        <div className="lg:col-span-6 space-y-4">
          {errorMsg && (
            <div className="p-4 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {debugResult ? (
            <div className="space-y-4">
              {/* Error Header Badge */}
              <div className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/20 shadow-md">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs sm:text-sm font-bold text-amber-300">
                      {debugResult.errorType}
                    </span>
                  </div>
                  {debugResult.errorLine && (
                    <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                      Line {debugResult.errorLine}
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  <span className="font-semibold text-amber-400">Why it occurred: </span>
                  {debugResult.whyErrorOccurred}
                </div>
              </div>

              {/* Corrected Code */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Corrected Code</span>
                  </span>
                  {onSendToDryRun && (
                    <button
                      onClick={() => onSendToDryRun(debugResult.correctedCode)}
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-medium"
                    >
                      <span>Verify in Dry Run</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <CodeBlock
                  code={debugResult.correctedCode}
                  onSendToDryRun={onSendToDryRun}
                />
              </div>

              {/* Code Diff Explanation */}
              {debugResult.codeDiffExplanation && debugResult.codeDiffExplanation.length > 0 && (
                <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-900/60 shadow-sm">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    What Changed & Why:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
                    {debugResult.codeDiffExplanation.map((diff, i) => (
                      <li key={i}>{diff}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prevention Rules & Pro Tip */}
              <div className="p-4 rounded-xl border border-emerald-900/30 bg-emerald-950/20 shadow-sm space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>How to Avoid Similar Errors</span>
                </div>
                <ul className="text-xs text-emerald-200/90 space-y-1 list-disc list-inside">
                  {debugResult.preventionTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>

                {debugResult.proTip && (
                  <div className="pt-2 border-t border-emerald-900/30 text-xs text-emerald-300/80 italic">
                    <strong>Pythonic Pro Tip:</strong> {debugResult.proTip}
                  </div>
                )}
              </div>
            </div>
          ) : (
            !loading && (
              <div className="p-8 rounded-2xl border border-purple-900/30 bg-slate-900/30 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-center">
                  <Bug className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white">Debug & Fix Your Code</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Paste any code throwing an error or behaving unexpectedly, then hit <strong>"Diagnose & Fix Error"</strong> to see root causes and verified corrections.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
