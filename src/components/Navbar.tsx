import React from 'react';
import { TeachingMode } from '../types';
import { Sparkles, Terminal, BookOpen, Bug, Play, HelpCircle, Layers, Cpu } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  teachingMode: TeachingMode;
  setTeachingMode: (mode: TeachingMode) => void;
  onOpenKnowledgeBase: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  teachingMode,
  setTeachingMode,
  onOpenKnowledgeBase,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 h-16">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <span 
            onClick={() => setActiveTab('chat')} 
            className="text-lg font-bold tracking-tight text-white cursor-pointer hover:text-purple-300 transition-colors whitespace-nowrap shrink-0"
          >
            PyBuddy
          </span>
        </div>

        {/* Zone 2: Navigation Links (Single-line controls) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                : 'hover:text-white hover:bg-slate-900/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Ask Python</span>
          </button>

          <button
            onClick={() => setActiveTab('dryrun')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'dryrun'
                ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                : 'hover:text-white hover:bg-slate-900/70'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dry Run</span>
          </button>

          <button
            onClick={() => setActiveTab('explain')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'explain'
                ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                : 'hover:text-white hover:bg-slate-900/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Explain Code</span>
          </button>

          <button
            onClick={() => setActiveTab('debug')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'debug'
                ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                : 'hover:text-white hover:bg-slate-900/70'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-amber-400" />
            <span>Debug My Code</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                : 'hover:text-white hover:bg-slate-900/70'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Quiz & Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('skills-hub')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'skills-hub'
                ? 'bg-purple-900/40 text-purple-200 border border-purple-700/50'
                : 'hover:text-white hover:bg-slate-900/70'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>AI Skills Hub</span>
          </button>

          <button
            onClick={onOpenKnowledgeBase}
            className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/70 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Knowledge Base</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Hinglish/English Teaching Mode Toggle) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-900/90 border border-purple-900/50 rounded-lg p-0.5">
            <button
              onClick={() => setTeachingMode('english')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                teachingMode === 'english'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setTeachingMode('hinglish')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 flex items-center gap-1 ${
                teachingMode === 'hinglish'
                  ? 'bg-gradient-to-r from-orange-500 via-purple-600 to-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Hinglish</span>
              <span className="text-[10px]">🇮🇳</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-purple-900/20 bg-slate-950/60 text-xs">
        {[
          { id: 'chat', label: 'Ask Python', icon: Sparkles },
          { id: 'dryrun', label: 'Dry Run', icon: Play },
          { id: 'explain', label: 'Explain', icon: BookOpen },
          { id: 'debug', label: 'Debug', icon: Bug },
          { id: 'quiz', label: 'Quiz', icon: HelpCircle },
          { id: 'skills-hub', label: 'Skills Hub', icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-900/60 text-purple-200 border border-purple-600/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={onOpenKnowledgeBase}
          className="px-2.5 py-1 rounded-md flex items-center gap-1 whitespace-nowrap shrink-0 text-slate-400 hover:text-white transition-colors"
        >
          <Layers className="w-3 h-3 text-violet-400" />
          <span>Docs</span>
        </button>
      </div>
    </header>
  );
};
