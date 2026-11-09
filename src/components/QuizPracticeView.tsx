import React, { useState } from 'react';
import { TeachingMode, QuizQuestion, PracticeProblem } from '../types';
import { CATEGORIES } from '../data/knowledgeBase';
import { HelpCircle, Code2, Check, X, Sparkles, Loader2, Award, Lightbulb, ChevronRight, RotateCcw, ArrowRight } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface QuizPracticeViewProps {
  teachingMode: TeachingMode;
  onSendToDryRun?: (code: string) => void;
  onSendToChat?: (query: string) => void;
}

export const QuizPracticeView: React.FC<QuizPracticeViewProps> = ({
  teachingMode,
  onSendToDryRun,
  onSendToChat,
}) => {
  const [subTab, setSubTab] = useState<'quiz' | 'practice'>('quiz');

  // Quiz State
  const [quizTopic, setQuizTopic] = useState<string>('Python Fundamentals');
  const [quizDifficulty, setQuizDifficulty] = useState<string>('Beginner');
  const [quizLoading, setQuizLoading] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Practice Challenge State
  const [practiceTopic, setPracticeTopic] = useState<string>('Loops');
  const [practiceDifficulty, setPracticeDifficulty] = useState<string>('Beginner');
  const [practiceLoading, setPracticeLoading] = useState<boolean>(false);
  const [problem, setProblem] = useState<PracticeProblem | null>(null);
  const [userCode, setUserCode] = useState<string>('');
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Fetch Quiz
  const handleGenerateQuiz = async () => {
    setQuizLoading(true);
    setQuizCompleted(false);
    setSelectedAnswers({});
    setActiveQuestionIdx(0);
    setShowExplanation(false);
    setShowHint(false);
    setScore(0);

    try {
      const res = await fetch('/api/gemini/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: quizTopic,
          difficulty: quizDifficulty,
          count: 5,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate quiz');
      const data = await res.json();
      setQuizQuestions(data.questions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (selectedAnswers[qIdx] !== undefined) return; // Already answered
    const currentQ = quizQuestions[qIdx];
    const isCorrect = optionIdx === currentQ.correctIndex;

    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optionIdx }));
    setShowExplanation(true);

    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    setShowHint(false);
    if (activeQuestionIdx < quizQuestions.length - 1) {
      setActiveQuestionIdx((p) => p + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Fetch Practice Challenge
  const handleGeneratePractice = async () => {
    setPracticeLoading(true);
    setShowSolution(false);

    try {
      const res = await fetch('/api/gemini/practice-problem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: practiceTopic,
          difficulty: practiceDifficulty,
        }),
      });

      if (!res.ok) throw new Error('Failed to generate practice challenge');
      const data: PracticeProblem = await res.json();
      setProblem(data);
      setUserCode(data.starterCode);
    } catch (err) {
      console.error(err);
    } finally {
      setPracticeLoading(false);
    }
  };

  const currentQ = quizQuestions[activeQuestionIdx];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* View Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span>ASSESSMENT & HANDS-ON PRACTICE</span>
            <span>·</span>
            <span className="uppercase">{teachingMode} Mode</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Python Quizzes & Practice Hub
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Test your knowledge with multiple-choice quizzes or write Python programs against real challenge specifications.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center bg-slate-900/90 border border-purple-900/40 rounded-xl p-1 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setSubTab('quiz')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              subTab === 'quiz'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Quiz</span>
          </button>
          <button
            onClick={() => setSubTab('practice')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              subTab === 'practice'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Coding Practice</span>
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: QUIZ MODE ===================== */}
      {subTab === 'quiz' && (
        <div className="space-y-6">
          {/* Quiz Topic & Difficulty Filter Bar */}
          <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Topic
                </label>
                <select
                  value={quizTopic}
                  onChange={(e) => setQuizTopic(e.target.value)}
                  className="bg-slate-950 border border-purple-900/40 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="Slicing & Indexing">Slicing & Indexing</option>
                  <option value="Recursion & Scope">Recursion & Scope</option>
                  <option value="Exception Handling">Exception Handling</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Difficulty
                </label>
                <select
                  value={quizDifficulty}
                  onChange={(e) => setQuizDifficulty(e.target.value)}
                  className="bg-slate-950 border border-purple-900/40 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="Beginner">Beginner (College Starter)</option>
                  <option value="Intermediate">Intermediate (Logic & Tricks)</option>
                  <option value="Advanced">Advanced (OOP & Complexities)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateQuiz}
              disabled={quizLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-500 hover:to-purple-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
            >
              {quizLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start New Quiz</span>
                </>
              )}
            </button>
          </div>

          {/* Active Quiz Card */}
          {quizQuestions.length > 0 && !quizCompleted && currentQ && (
            <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-purple-900/40 bg-slate-900/80 shadow-2xl space-y-6">
              {/* Question Header & Counter */}
              <div className="flex items-center justify-between pb-3 border-b border-purple-900/20 text-xs">
                <span className="font-mono text-purple-400 font-semibold">
                  Question {activeQuestionIdx + 1} of {quizQuestions.length}
                </span>
                <span className="font-mono text-emerald-400 font-semibold">
                  Current Score: {score} / {activeQuestionIdx}
                </span>
              </div>

              {/* Question Statement */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                  {currentQ.question}
                </h3>

                {currentQ.codeSnippet && (
                  <div className="rounded-xl border border-purple-900/40 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto whitespace-pre">
                    {currentQ.codeSnippet}
                  </div>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswers[activeQuestionIdx] === optIdx;
                  const isAnswered = selectedAnswers[activeQuestionIdx] !== undefined;
                  const isCorrectAnswer = optIdx === currentQ.correctIndex;

                  let borderClass = 'border-slate-800 hover:border-purple-700/60 bg-slate-950/70';
                  if (isAnswered) {
                    if (isCorrectAnswer) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-medium';
                    } else if (isSelected) {
                      borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200';
                    } else {
                      borderClass = 'border-slate-800/40 opacity-50 bg-slate-950/30';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(activeQuestionIdx, optIdx)}
                      disabled={isAnswered}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm text-slate-200 transition-all flex items-center justify-between gap-3 ${borderClass}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-purple-900/40 flex items-center justify-center font-mono text-xs text-purple-300 font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && (
                        <span>
                          {isCorrectAnswer ? (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : isSelected ? (
                            <X className="w-4 h-4 text-rose-400 shrink-0" />
                          ) : null}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Hint Box (Optional reveal) */}
              {currentQ.hint && (
                <div className="pt-1">
                  {!showHint ? (
                    <button
                      onClick={() => setShowHint(true)}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Need a hint?</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-amber-950/20 border border-amber-900/30 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">Hint: </strong>
                        {currentQ.hint}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Answer Explanation & Next Question Button */}
              {showExplanation && (
                <div className="space-y-4 pt-3 border-t border-purple-900/30">
                  <div className="p-4 rounded-xl border border-purple-900/30 bg-purple-950/20 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    <span className="font-bold text-purple-300 block mb-1">
                      Explanation:
                    </span>
                    {currentQ.explanation}
                  </div>

                  <div className="text-right">
                    <button
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/30 transition-all"
                    >
                      <span>
                        {activeQuestionIdx < quizQuestions.length - 1
                          ? 'Next Question'
                          : 'View Final Score'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quiz Completed Summary */}
          {quizCompleted && (
            <div className="max-w-lg mx-auto p-8 rounded-2xl border border-purple-900/50 bg-slate-900/90 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Award className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Quiz Completed!</h3>
                <p className="text-sm text-slate-400 mt-1">
                  You scored {score} out of {quizQuestions.length} ({Math.round((score / quizQuestions.length) * 100)}%)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-purple-900/30 text-xs text-slate-300">
                {score === quizQuestions.length
                  ? '🌟 Outstanding! You have complete command over this Python concept.'
                  : score >= quizQuestions.length * 0.6
                  ? '👍 Good job! Review the explanations to solidify edge cases.'
                  : '💡 Keep practicing! Try reading the knowledge base topic or asking PyBuddy in Hinglish mode.'}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleGenerateQuiz}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>

                {onSendToChat && (
                  <button
                    onClick={() => onSendToChat(`Teach me more about ${quizTopic} with practical examples`)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <span>Ask PyBuddy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {quizQuestions.length === 0 && !quizLoading && (
            <div className="p-12 rounded-2xl border border-purple-900/30 bg-slate-900/30 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-950/40 border border-emerald-800/40 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white">Ready for a Quiz?</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Choose a Python category and difficulty level above, then click <strong>"Start New Quiz"</strong> to test your skills.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ===================== TAB 2: PRACTICE CHALLENGES ===================== */}
      {subTab === 'practice' && (
        <div className="space-y-6">
          {/* Practice Controls */}
          <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Topic Area
                </label>
                <select
                  value={practiceTopic}
                  onChange={(e) => setPracticeTopic(e.target.value)}
                  className="bg-slate-950 border border-purple-900/40 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="Loops">Loops & Iterations</option>
                  <option value="Lists & Comprehensions">Lists & Comprehensions</option>
                  <option value="Dictionaries">Dictionaries & Hashmaps</option>
                  <option value="Functions & Recursion">Functions & Recursion</option>
                  <option value="Problem Solving">Problem Solving (Palindrome, Primes, Fibonacci)</option>
                  <option value="Object Oriented Programming">Object Oriented Programming</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Difficulty Level
                </label>
                <select
                  value={practiceDifficulty}
                  onChange={(e) => setPracticeDifficulty(e.target.value)}
                  className="bg-slate-950 border border-purple-900/40 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGeneratePractice}
              disabled={practiceLoading}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-purple-600/20 transition-all disabled:opacity-50"
            >
              {practiceLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating Challenge...</span>
                </>
              ) : (
                <>
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Generate Challenge</span>
                </>
              )}
            </button>
          </div>

          {/* Active Problem View */}
          {problem && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Problem Statement & Test Cases */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl border border-purple-900/40 bg-slate-900/70 shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                      {problem.difficulty} Challenge
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{problem.title}</h3>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {problem.problemStatement}
                  </p>

                  {/* Input / Output Formats */}
                  <div className="space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-400">Input Format: </strong>
                      <span className="text-slate-300">{problem.inputFormat}</span>
                    </div>
                    <div>
                      <strong className="text-slate-400">Output Format: </strong>
                      <span className="text-slate-300">{problem.outputFormat}</span>
                    </div>
                  </div>

                  {/* Sample Examples */}
                  {problem.examples && problem.examples.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-purple-900/30">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                        Sample Test Cases:
                      </span>
                      {problem.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-950 rounded-lg border border-purple-900/20 font-mono text-xs space-y-1"
                        >
                          <div>
                            <span className="text-slate-500">Input: </span>
                            <span className="text-purple-300">{ex.input}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Output: </span>
                            <span className="text-emerald-400">{ex.output}</span>
                          </div>
                          {ex.explanation && (
                            <p className="text-[11px] text-slate-400 font-sans pt-1">
                              {ex.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hints */}
                  {problem.hints && problem.hints.length > 0 && (
                    <div className="p-3 rounded-xl border border-amber-900/30 bg-amber-950/20 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Hints:</span>
                      </div>
                      <ul className="text-amber-200/90 space-y-1 list-disc list-inside">
                        {problem.hints.map((hint, i) => (
                          <li key={i}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Code Workspace & Solution */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl border border-purple-900/40 bg-slate-900/70 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Your Python Solution
                    </span>
                    <div className="flex items-center gap-2">
                      {onSendToDryRun && (
                        <button
                          onClick={() => onSendToDryRun(userCode)}
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                        >
                          <span>Dry Run Code</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-purple-900/30 bg-slate-950 overflow-hidden">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      rows={12}
                      className="w-full p-4 bg-transparent text-slate-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                      placeholder="Write your Python function here..."
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors"
                    >
                      {showSolution ? 'Hide Solution' : 'Reveal Solution & Logic'}
                    </button>
                  </div>
                </div>

                {/* Solution Reveal Box */}
                {showSolution && (
                  <div className="p-5 rounded-2xl border border-emerald-900/40 bg-slate-900/90 shadow-xl space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Official Solution & Explanation</span>
                    </div>

                    <CodeBlock
                      code={problem.solutionCode}
                      onSendToDryRun={onSendToDryRun}
                    />

                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                      {problem.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {!problem && !practiceLoading && (
            <div className="p-12 rounded-2xl border border-purple-900/30 bg-slate-900/30 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-purple-950/40 border border-purple-800/40 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-base font-bold text-white">Interactive Coding Exercises</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Click <strong>"Generate Challenge"</strong> to get a tailored problem with sample test cases, starter code template, and full walkthrough.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
