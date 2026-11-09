import React, { useState } from 'react';
import { PYTHON_KNOWLEDGE_BASE, CATEGORIES } from '../data/knowledgeBase';
import { KnowledgeTopic, TeachingMode } from '../types';
import { Search, X, BookOpen, Sparkles, Code2, AlertTriangle, Lightbulb } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface KnowledgeBaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  teachingMode: TeachingMode;
  onSelectTopicForChat: (topic: KnowledgeTopic) => void;
  onSendToDryRun: (code: string) => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({
  isOpen,
  onClose,
  teachingMode,
  onSelectTopicForChat,
  onSendToDryRun,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<KnowledgeTopic | null>(PYTHON_KNOWLEDGE_BASE[0]);

  if (!isOpen) return null;

  const filteredTopics = PYTHON_KNOWLEDGE_BASE.filter((t) => {
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-6xl h-[90vh] bg-slate-900 border border-purple-900/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-900/30 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Python Knowledge Base
              </h2>
              <p className="text-xs text-slate-400">
                Core concepts, standard syntax, and curated educational guides
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="px-6 py-3 border-b border-purple-900/20 bg-slate-950/40 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search topics, syntax, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-900/90 border border-purple-900/40 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-purple-600 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              All Topics ({PYTHON_KNOWLEDGE_BASE.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white font-medium'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Split: Left Topic List, Right Topic Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left Column: Topics List */}
          <div className="md:col-span-4 border-r border-purple-900/30 overflow-y-auto p-4 space-y-2 bg-slate-950/30">
            {filteredTopics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedTopic?.id === topic.id
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-900/20'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-purple-900/40'
                }`}
              >
                <div className="text-[11px] text-purple-400 font-medium mb-1">
                  {topic.category}
                </div>
                <div className="text-sm font-semibold text-slate-100 mb-1">
                  {topic.title}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {teachingMode === 'hinglish' ? topic.hinglishSummary : topic.summary}
                </p>
              </div>
            ))}

            {filteredTopics.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-500">
                No topics matched your search criteria.
              </div>
            )}
          </div>

          {/* Right Column: Active Topic Deep Dive */}
          <div className="md:col-span-8 overflow-y-auto p-6 bg-slate-900/40">
            {selectedTopic ? (
              <div className="space-y-6">
                {/* Topic Header & Chat Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
                  <div>
                    <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">
                      {selectedTopic.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                      {selectedTopic.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      onSelectTopicForChat(selectedTopic);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-purple-600/20 transition-all self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask PyBuddy to Teach This</span>
                  </button>
                </div>

                {/* 1. Definition & Beginner Explanation */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    1. Definition & Core Concept
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-purple-900/30">
                    {selectedTopic.summary}
                  </p>

                  {/* Hinglish Explanation Box */}
                  <div className="p-4 rounded-xl border border-amber-900/30 bg-amber-950/20 text-xs sm:text-sm text-amber-200 leading-relaxed">
                    <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                      <span className="text-xs">🇮🇳</span>
                      <span>Hinglish Explanation (Simple Words):</span>
                    </div>
                    {selectedTopic.hinglishExplanation}
                  </div>
                </div>

                {/* 2. Syntax & Real-life Analogy */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-950/60">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                      <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Python Syntax</span>
                    </div>
                    <pre className="font-mono text-xs text-slate-300 whitespace-pre-wrap bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      {selectedTopic.syntax}
                    </pre>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-950/60">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Real-Life Analogy</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedTopic.analogy}
                    </p>
                  </div>
                </div>

                {/* 3. Practical Code Example with Run in Dry Run */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Practical Code Example
                    </h4>
                    <span className="text-xs text-slate-500">Working Python 3</span>
                  </div>

                  <CodeBlock
                    code={selectedTopic.exampleCode}
                    onSendToDryRun={(code) => {
                      onSendToDryRun(code);
                      onClose();
                    }}
                  />
                </div>

                {/* Expected Output */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Expected Terminal Output
                  </h4>
                  <pre className="font-mono text-xs text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 whitespace-pre-wrap">
                    {selectedTopic.expectedOutput}
                  </pre>
                </div>

                {/* Common Beginner Errors */}
                {selectedTopic.commonErrors && selectedTopic.commonErrors.length > 0 && (
                  <div className="p-4 rounded-xl border border-rose-900/30 bg-rose-950/20">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Common Beginner Errors to Avoid</span>
                    </div>
                    <ul className="text-xs text-rose-200/90 space-y-1 list-disc list-inside">
                      {selectedTopic.commonErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">
                Select a topic from the left to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
