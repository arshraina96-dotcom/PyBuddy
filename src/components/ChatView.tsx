import React, { useState, useEffect, useRef } from 'react';
import { TeachingMode, ChatMessage } from '../types';
import {
  Send,
  Sparkles,
  Trash2,
  Terminal,
  Bot,
  User,
  Loader2,
  Play,
  Bug,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ChatViewProps {
  teachingMode: TeachingMode;
  setTeachingMode: (mode: TeachingMode) => void;
  onSendToDryRun: (code: string) => void;
  onSendToDebugger: (code: string) => void;
  onSendToExplainer: (code: string) => void;
  onOpenKnowledgeBase: () => void;
  initialPrompt?: string;
}

const SUGGESTED_QUESTIONS = [
  {
    title: 'For Loop with Example',
    query: 'Explain for loop with an example.',
    category: 'Loops',
  },
  {
    title: 'Recursion Intuition',
    query: 'What is recursion? Explain with a simple example.',
    category: 'Functions',
  },
  {
    title: 'Palindrome Checker',
    query: 'Write a Python program to check palindrome.',
    category: 'Problem Solving',
  },
  {
    title: 'List Slicing Tricks',
    query: 'Explain list slicing with syntax and practical examples.',
    category: 'Data Structures',
  },
  {
    title: 'Dry Run Factorial',
    query: 'Dry run factorial of 4 using recursion step by step.',
    category: 'Algorithms',
  },
  {
    title: 'List vs Tuple',
    query: 'What is the difference between a list and tuple?',
    category: 'Fundamentals',
  },
];

export const ChatView: React.FC<ChatViewProps> = ({
  teachingMode,
  setTeachingMode,
  onSendToDryRun,
  onSendToDebugger,
  onSendToExplainer,
  onOpenKnowledgeBase,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('pybuddy_chat_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
    return [];
  });

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('pybuddy_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history', e);
    }
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle external trigger (e.g. from Knowledge Base or Skills Hub)
  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
      teachingMode,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyForApi = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: historyForApi,
          teachingMode,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to get answer');
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.reply,
        timestamp: Date.now(),
        teachingMode,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: `⚠️ ${error?.message || 'Sorry, something went wrong while connecting with PyBuddy. Please try again.'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    localStorage.removeItem('pybuddy_chat_messages');
  };

  // Helper to render message content with embedded code blocks
  const renderMessageContent = (content: string) => {
    const codeBlockRegex = /```(?:python)?([\s\S]*?)```/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Preceding text
      if (match.index > lastIndex) {
        parts.push(
          <div key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-relaxed">
            {content.substring(lastIndex, match.index)}
          </div>
        );
      }

      // Code block
      const code = match[1].trim();
      parts.push(
        <CodeBlock
          key={`code-${match.index}`}
          code={code}
          onSendToDryRun={onSendToDryRun}
          onSendToDebugger={onSendToDebugger}
          onSendToExplainer={onSendToExplainer}
        />
      );

      lastIndex = match.index + match[0].length;
    }

    // Remaining text
    if (lastIndex < content.length) {
      parts.push(
        <div key={`text-${lastIndex}`} className="whitespace-pre-wrap leading-relaxed">
          {content.substring(lastIndex)}
        </div>
      );
    }

    return parts;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col h-[calc(100vh-4rem)]">
      {/* Top Banner / Mode Notice */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-purple-900/30 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-purple-400 font-semibold">TUTOR STATUS:</span>
          <span className="text-slate-300">
            {teachingMode === 'hinglish' ? (
              <span className="text-amber-300 font-medium flex items-center gap-1">
                <span>Hinglish Mode Active 🇮🇳 (Desi relatable analogies)</span>
              </span>
            ) : (
              <span className="text-purple-300 font-medium">
                Standard English Mode Active (Structured beginner explanations)
              </span>
            )}
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        )}
      </div>

      {/* Main Chat Stream */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {messages.length === 0 ? (
          /* Empty State / Welcome Screen with Hero and Suggested Questions */
          <div className="py-8 space-y-8">
            {/* Hero Brand Lockup */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-fuchsia-600 flex items-center justify-center shadow-xl shadow-purple-600/30">
                <Terminal className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                PyBuddy
              </h1>
              <p className="text-sm sm:text-base text-purple-300/90 font-medium">
                Learn Python. Understand Logic. Code Confidently.
              </p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                Your AI personal Python tutor. Ask questions in natural English, Hindi, or Hinglish, get line-by-line breakdowns, and master programming fundamentals.
              </p>

              {/* Mode Toggle Banner */}
              <div className="inline-flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-purple-900/40 text-xs">
                <span className="text-slate-400 px-2">Teaching Style:</span>
                <button
                  onClick={() => setTeachingMode('english')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    teachingMode === 'english'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setTeachingMode('hinglish')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 ${
                    teachingMode === 'hinglish'
                      ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Hinglish</span>
                  <span>🇮🇳</span>
                </button>
              </div>
            </div>

            {/* Suggested Question Cards */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold uppercase tracking-wider">Suggested Questions</span>
                <span>Click any card to start</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.query)}
                    className="p-4 rounded-xl border border-purple-900/30 bg-slate-900/60 hover:bg-purple-950/40 hover:border-purple-600/50 text-left transition-all shadow-md group"
                  >
                    <div className="text-[11px] font-mono text-purple-400 mb-1">
                      {q.category}
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white mb-2">
                      {q.title}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span className="line-clamp-1">{q.query}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-purple-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Feature Shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <button
                onClick={onOpenKnowledgeBase}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-purple-900/40 rounded-lg text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Browse Python Knowledge Base</span>
              </button>
            </div>
          </div>
        ) : (
          /* Message List */
          messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-purple-600/30 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-lg ${
                    isUser
                      ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white rounded-tr-xs'
                      : 'bg-slate-900/90 border border-purple-900/40 text-slate-100 rounded-tl-xs'
                  }`}
                >
                  {/* Sender label and mode indicator */}
                  <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-white/10 text-[11px] opacity-80">
                    <span className="font-semibold">{isUser ? 'You' : 'PyBuddy'}</span>
                    {msg.teachingMode && (
                      <span className="font-mono text-[10px] uppercase">
                        {msg.teachingMode === 'hinglish' ? 'Hinglish Mode 🇮🇳' : 'English Mode'}
                      </span>
                    )}
                  </div>

                  {/* Message Body */}
                  <div className="text-xs sm:text-sm space-y-2">
                    {renderMessageContent(msg.content)}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1 text-slate-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3 items-center text-xs text-purple-300 bg-slate-900/60 p-3 rounded-xl border border-purple-900/30 w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
            <span>PyBuddy is formulating structured explanation...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="pt-3 border-t border-purple-900/30">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              teachingMode === 'hinglish'
                ? 'Python ka koi bhi sawaal puchiye (e.g. For loop kaise kaam karta hai?)...'
                : 'Ask any Python question (e.g. How does list slicing work?)...'
            }
            disabled={loading}
            className="w-full pl-4 pr-12 py-3 bg-slate-900/90 border border-purple-900/50 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 shadow-inner"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="absolute right-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-purple-600/30 transition-all disabled:opacity-40"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 px-1">
          <span>Supported: English, Hindi, Hinglish</span>
          <span>Standard Python 3 code & syntax</span>
        </div>
      </div>
    </div>
  );
};
