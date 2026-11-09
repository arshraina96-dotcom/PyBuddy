import React, { useState, useEffect, useRef } from 'react';
import { TeachingMode, DryRunResult, DryRunStep } from '../types';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Sparkles, Loader2, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface DryRunViewProps {
  teachingMode: TeachingMode;
  initialCode?: string;
  onSendToChat?: (code: string) => void;
}

const PRESET_CODES = [
  {
    name: 'Factorial Recursion',
    description: 'Traces recursive stack frame and return values',
    code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

ans = factorial(4)
print("Final result:", ans)`,
  },
  {
    name: 'Palindrome Check',
    description: 'Two-pointer or index tracking for palindrome',
    code: `word = "radar"
is_palindrome = True
left = 0
right = len(word) - 1

while left < right:
    if word[left] != word[right]:
        is_palindrome = False
        break
    left += 1
    right -= 1

print("Is Palindrome:", is_palindrome)`,
  },
  {
    name: 'Fibonacci Series',
    description: 'Iterative variable swapping and accumulator',
    code: `n = 5
a, b = 0, 1
fib_series = []

for i in range(n):
    fib_series.append(a)
    a, b = b, a + b

print("Series:", fib_series)`,
  },
  {
    name: 'Loop Pattern (Pyramid)',
    description: 'Nested loop counter progression',
    code: `rows = 4
for i in range(1, rows + 1):
    spaces = " " * (rows - i)
    stars = "*" * (2 * i - 1)
    print(spaces + stars)`,
  },
];

export const DryRunView: React.FC<DryRunViewProps> = ({
  teachingMode,
  initialCode,
  onSendToChat,
}) => {
  const [code, setCode] = useState<string>(initialCode || PRESET_CODES[0].code);
  const [loading, setLoading] = useState<boolean>(false);
  const [dryRunData, setDryRunData] = useState<DryRunResult | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update code if initialCode changes
  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
      handleExecuteDryRun(initialCode);
    }
  }, [initialCode]);

  const handleExecuteDryRun = async (codeToRun: string = code) => {
    setLoading(true);
    setErrorMsg(null);
    setIsPlaying(false);
    if (playTimerRef.current) clearInterval(playTimerRef.current);

    try {
      const res = await fetch('/api/gemini/dry-run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToRun, teachingMode }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to perform dry run');
      }

      const data: DryRunResult = await res.json();
      setDryRunData(data);
      setCurrentStepIdx(0);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during dry run analysis');
    } finally {
      setLoading(false);
    }
  };

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && dryRunData && dryRunData.steps.length > 0) {
      playTimerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= dryRunData.steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, dryRunData]);

  const currentStep: DryRunStep | undefined = dryRunData?.steps[currentStepIdx];
  const codeLines = code.split('\n');

  // Accumulate console output up to current step
  const accumulatedOutput = dryRunData?.steps
    .slice(0, currentStepIdx + 1)
    .map((s) => s.output)
    .filter(Boolean)
    .join('\n');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title & Mode Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <span>DEDICATED CODE SIMULATOR</span>
            <span>·</span>
            <span className="uppercase">{teachingMode} Mode</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Step-by-Step Python Dry Run Mode
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Visualize line-by-line program execution, memory state tables, and variable changes in real-time.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {PRESET_CODES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setCode(preset.code);
                handleExecuteDryRun(preset.code);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                code === preset.code
                  ? 'bg-purple-900/60 text-purple-200 border-purple-600/60'
                  : 'bg-slate-900/60 text-slate-300 border-purple-900/30 hover:bg-slate-800'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Editor & Control Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Editor & Execution Pointer */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>Python Source Code</span>
            </label>
            <button
              onClick={() => handleExecuteDryRun(code)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-purple-600/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Code...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Dry Run</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Code Window with Line Pointer */}
          <div className="rounded-xl border border-purple-900/40 bg-slate-950 shadow-xl overflow-hidden font-mono text-xs sm:text-sm">
            {dryRunData ? (
              <div className="p-3 overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {codeLines.map((line, idx) => {
                      const lineNum = idx + 1;
                      const isCurrentLine = currentStep?.lineNumber === lineNum;
                      return (
                        <tr
                          key={idx}
                          className={`transition-colors ${
                            isCurrentLine
                              ? 'bg-purple-900/50 border-l-2 border-purple-400 text-white font-semibold'
                              : 'hover:bg-slate-900/40 text-slate-300'
                          }`}
                        >
                          <td className="w-10 select-none py-1 text-center font-mono text-xs">
                            {isCurrentLine ? (
                              <ArrowRight className="w-3.5 h-3.5 text-purple-400 inline animate-pulse" />
                            ) : (
                              <span className="text-slate-600">{lineNum}</span>
                            )}
                          </td>
                          <td className="whitespace-pre py-1 pl-2">
                            {line || ' '}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full p-4 bg-transparent text-slate-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                placeholder="Write or paste Python code here to dry run..."
              />
            )}
          </div>

          {dryRunData && (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={() => setDryRunData(null)}
                className="hover:text-purple-300 underline underline-offset-4"
              >
                Edit Code
              </button>
              {onSendToChat && (
                <button
                  onClick={() => onSendToChat(code)}
                  className="hover:text-purple-300 flex items-center gap-1"
                >
                  <span>Ask PyBuddy to explain further</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Execution Deck & Memory Inspector */}
        <div className="lg:col-span-6 space-y-4">
          {errorMsg && (
            <div className="p-4 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          {dryRunData && (
            <div className="space-y-4">
              {/* Step Navigation Controls */}
              <div className="p-4 rounded-xl border border-purple-900/40 bg-slate-900/80 shadow-lg flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Step {currentStepIdx + 1} of {dryRunData.steps.length}
                    </span>
                    {currentStep && (
                      <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                        Line {currentStep.lineNumber}
                      </span>
                    )}
                  </div>

                  {/* Playback Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentStepIdx((p) => Math.max(0, p - 1))}
                      disabled={currentStepIdx === 0}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg transition-colors"
                      title="Previous Step"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isPlaying
                          ? 'bg-amber-600 text-white'
                          : 'bg-purple-600 hover:bg-purple-500 text-white'
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Auto Play</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        setCurrentStepIdx((p) =>
                          Math.min(dryRunData.steps.length - 1, p + 1)
                        )
                      }
                      disabled={currentStepIdx === dryRunData.steps.length - 1}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-lg transition-colors"
                      title="Next Step"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setCurrentStepIdx(0);
                      }}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                      title="Reset to Start"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar / Slider */}
                <input
                  type="range"
                  min={0}
                  max={dryRunData.steps.length - 1}
                  value={currentStepIdx}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setCurrentStepIdx(Number(e.target.value));
                  }}
                  className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Step Explanation Callout */}
              {currentStep && (
                <div className="p-4 rounded-xl border border-indigo-900/40 bg-indigo-950/20 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Step Explanation ({teachingMode === 'hinglish' ? 'Hinglish' : 'English'})</span>
                  </div>
                  <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-sans">
                    {currentStep.explanation}
                  </p>
                </div>
              )}

              {/* Memory Inspector / Variables State Table */}
              <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-900/70 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Variables State (Memory Table)
                  </h3>
                  <span className="text-[11px] text-slate-500">Live snapshot</span>
                </div>

                {currentStep && currentStep.variables && Object.keys(currentStep.variables).length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-purple-900/30 text-slate-400">
                          <th className="py-1.5 px-3">Variable</th>
                          <th className="py-1.5 px-3">Current Value</th>
                          <th className="py-1.5 px-3">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-900/20">
                        {Object.entries(currentStep.variables).map(([key, val]) => (
                          <tr key={key} className="hover:bg-purple-950/20">
                            <td className="py-2 px-3 text-purple-300 font-semibold">{key}</td>
                            <td className="py-2 px-3 text-amber-300">
                              {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                            </td>
                            <td className="py-2 px-3 text-slate-400">
                              {Array.isArray(val)
                                ? 'list'
                                : typeof val === 'number'
                                ? Number.isInteger(val)
                                  ? 'int'
                                  : 'float'
                                : typeof val === 'boolean'
                                ? 'bool'
                                : typeof val === 'string'
                                ? 'str'
                                : typeof val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 py-3 text-center">
                    No active local variables initialized at this line.
                  </div>
                )}
              </div>

              {/* Console Output Buffer */}
              <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-950 shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Console Standard Output (stdout)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">live stream</span>
                </div>
                <pre className="font-mono text-xs text-emerald-400 min-h-12 max-h-36 overflow-y-auto whitespace-pre-wrap">
                  {accumulatedOutput || '<No output printed yet>'}
                </pre>
              </div>

              {/* Key Takeaways */}
              {dryRunData.keyTakeaways && dryRunData.keyTakeaways.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 mb-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Key Takeaways & Logic Notes</span>
                  </div>
                  <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                    {dryRunData.keyTakeaways.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!dryRunData && !loading && (
            <div className="p-8 rounded-2xl border border-purple-900/30 bg-slate-900/30 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-950/60 border border-purple-800/40 flex items-center justify-center">
                <Play className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white">Ready to Dry Run</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Click <strong>"Start Dry Run"</strong> or pick one of the sample programs above to step through execution line by line.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
