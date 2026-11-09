import React, { useState } from 'react';
import { TeachingMode, CodeExplanationResult } from '../types';
import { BookOpen, Sparkles, Loader2, Lightbulb, Clock, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ExplainerViewProps {
  teachingMode: TeachingMode;
  initialCode?: string;
  onSendToDryRun?: (code: string) => void;
}

const PRESET_SNIPPETS = [
  {
    name: 'Binary Search',
    code: `def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1`,
  },
  {
    name: 'Anagram Check (Counter)',
    code: `def is_anagram(s1, s2):
    if len(s1) != len(s2):
        return False
        
    counts = {}
    for char in s1:
        counts[char] = counts.get(char, 0) + 1
        
    for char in s2:
        if char not in counts or counts[char] == 0:
            return False
        counts[char] -= 1
        
    return True`,
  },
  {
    name: 'Merge Sort Divide & Conquer',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  },
];

export const ExplainerView: React.FC<ExplainerViewProps> = ({
  teachingMode,
  initialCode,
  onSendToDryRun,
}) => {
  const [code, setCode] = useState<string>(initialCode || PRESET_SNIPPETS[0].code);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CodeExplanationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleExplain = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/explain-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, teachingMode }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to explain code');
      }

      const data: CodeExplanationResult = await res.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during code explanation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
            <span>DEEP CODE ARCHITECTURE & LOGIC</span>
            <span>·</span>
            <span className="uppercase">{teachingMode} Mode</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Explain Python Code & Algorithms
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Break down complicated Python code into intuitive logic, line-by-line tables, and complexity profiles.
          </p>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {PRESET_SNIPPETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setCode(p.code);
                setResult(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                code === p.code
                  ? 'bg-blue-950/60 text-blue-200 border-blue-600/60'
                  : 'bg-slate-900/60 text-slate-300 border-purple-900/30 hover:bg-slate-800'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Input */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Python Code to Explain
            </label>
            <div className="rounded-xl border border-purple-900/40 bg-slate-950 shadow-xl overflow-hidden">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={14}
                className="w-full p-4 bg-transparent text-slate-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                placeholder="Paste any Python code, function, or algorithm here..."
              />
            </div>
          </div>

          <button
            onClick={handleExplain}
            disabled={loading || !code.trim()}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Explaining Code...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>Explain Code Structure</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Deep Explanation */}
        <div className="lg:col-span-7 space-y-4">
          {errorMsg && (
            <div className="p-4 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {result ? (
            <div className="space-y-4">
              {/* Summary Card */}
              <div className="p-4 rounded-xl border border-purple-900/40 bg-slate-900/70 shadow-md">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider block mb-1">
                  Analysis Overview
                </span>
                <h3 className="text-lg font-bold text-white mb-2">{result.title}</h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {result.simpleSummary}
                </p>

                {/* Complexity & Concepts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-purple-900/30">
                  <div className="p-2.5 bg-slate-950/60 rounded-lg border border-purple-900/20">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
                      <Clock className="w-3 h-3 text-purple-400" />
                      <span>Time Complexity</span>
                    </div>
                    <div className="font-mono text-sm font-bold text-purple-300">
                      {result.complexity.time}
                    </div>
                  </div>

                  <div className="p-2.5 bg-slate-950/60 rounded-lg border border-purple-900/20">
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-0.5">
                      <Layers className="w-3 h-3 text-blue-400" />
                      <span>Space Complexity</span>
                    </div>
                    <div className="font-mono text-sm font-bold text-blue-300">
                      {result.complexity.space}
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-2.5 bg-slate-950/60 rounded-lg border border-purple-900/20">
                    <div className="text-[11px] text-slate-400 mb-0.5">Core Concepts</div>
                    <div className="text-xs font-semibold text-emerald-300 truncate">
                      {result.coreConceptsUsed?.join(', ') || 'Logic'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-World Analogy */}
              {result.realWorldAnalogy && (
                <div className="p-4 rounded-xl border border-indigo-900/40 bg-indigo-950/20 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Real-Life Analogy ({teachingMode === 'hinglish' ? 'Hinglish' : 'English'})</span>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
                    {result.realWorldAnalogy}
                  </p>
                </div>
              )}

              {/* Line-by-Line Breakdown Table */}
              {result.lineByLine && result.lineByLine.length > 0 && (
                <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-900/60 shadow-md">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    Line-by-Line Logical Breakdown
                  </h4>
                  <div className="space-y-2">
                    {result.lineByLine.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-bold text-purple-400">
                            {item.lines}
                          </span>
                          <span className="font-mono text-slate-500 text-[10px]">
                            {item.code.length > 30 ? item.code.slice(0, 30) + '...' : item.code}
                          </span>
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans">
                          {item.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Edge Cases & Optimization Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.potentialEdgeCases && result.potentialEdgeCases.length > 0 && (
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Potential Edge Cases</span>
                    </div>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      {result.potentialEdgeCases.map((ec, i) => (
                        <li key={i}>{ec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.optimizationTip && (
                  <div className="p-4 rounded-xl border border-purple-900/30 bg-purple-950/20">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>Pythonic Optimization Tip</span>
                    </div>
                    <p className="text-xs text-purple-200 leading-relaxed">
                      {result.optimizationTip}
                    </p>
                  </div>
                )}
              </div>

              {onSendToDryRun && (
                <div className="pt-2 text-right">
                  <button
                    onClick={() => onSendToDryRun(code)}
                    className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    <span>Watch this execute in Dry Run Visualizer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <div className="p-8 rounded-2xl border border-purple-900/30 bg-slate-900/30 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-950/40 border border-blue-800/40 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-base font-bold text-white">Deep Code Breakdown</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Enter your Python function or choose a preset to get time/space complexity, line-by-line annotations, and real-life analogies.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
