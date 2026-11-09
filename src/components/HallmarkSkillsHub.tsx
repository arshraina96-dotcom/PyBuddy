import React, { useState } from 'react';
import { TeachingMode, HallmarkSkill } from '../types';
import { HALLMARK_SKILLS } from '../data/hallmarkSkills';
import {
  Code2,
  Bug,
  BookOpen,
  Workflow,
  PlayCircle,
  HelpCircle,
  Languages,
  Rocket,
  Search,
  Sparkles,
  Loader2,
  CheckCircle,
  ArrowRight,
  Send,
  Sliders,
  History,
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface HallmarkSkillsHubProps {
  teachingMode: TeachingMode;
  onSendToChat?: (query: string, context?: string) => void;
  onSendToDryRun?: (code: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Code2,
  Bug,
  BookOpen,
  Workflow,
  PlayCircle,
  HelpCircle,
  Languages,
  Rocket,
};

export const HallmarkSkillsHub: React.FC<HallmarkSkillsHubProps> = ({
  teachingMode,
  onSendToChat,
  onSendToDryRun,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<HallmarkSkill>(HALLMARK_SKILLS[0]);
  const [activeSkillIds, setActiveSkillIds] = useState<string[]>([
    'python-code-assistant',
    'code-debugger',
    'hinglish-tutor',
    'dry-run-assistant',
  ]);
  const [recentSkillIds, setRecentSkillIds] = useState<string[]>([
    'python-code-assistant',
    'hinglish-tutor',
  ]);

  // Skill Execution State
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [skillOutput, setSkillOutput] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Toggle active/inactive skill state
  const toggleSkillActive = (skillId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleSelectSkill = (skill: HallmarkSkill) => {
    setSelectedSkill(skill);
    setUserInput(skill.samplePresetCode || '');
    setSkillOutput(null);
    setErrorMsg(null);

    // Track recently used
    setRecentSkillIds((prev) => [skill.id, ...prev.filter((id) => id !== skill.id)].slice(0, 4));
  };

  const handleExecuteSkill = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/gemini/skill-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillId: selectedSkill.id,
          inputData: {
            query: userInput,
            code: userInput,
            problem: userInput,
            concept: userInput,
            projectName: userInput,
          },
          teachingMode,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to execute skill action');
      }

      const data = await res.json();
      setSkillOutput(data.result);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Execution error');
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = HALLMARK_SKILLS.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const ActiveIcon = ICON_MAP[selectedSkill.iconName] || Sparkles;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400">
            <span>HALLMARK AI SKILLS INTEGRATION</span>
            <span>·</span>
            <span className="uppercase">{teachingMode} Mode</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1">
            Hallmark AI Skills Hub
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Discover, activate, and trigger specialized Hallmark AI skills designed specifically for Python programming mastery.
          </p>
        </div>

        {/* Recently Used Skills Quick Strip */}
        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
            <History className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Recent:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {recentSkillIds.map((id) => {
              const skill = HALLMARK_SKILLS.find((s) => s.id === id);
              if (!skill) return null;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectSkill(skill)}
                  className={`px-2.5 py-1 text-xs rounded-md border whitespace-nowrap transition-colors ${
                    selectedSkill.id === id
                      ? 'bg-purple-900/60 text-purple-200 border-purple-500'
                      : 'bg-slate-900/60 text-slate-400 border-purple-900/30 hover:text-white'
                  }`}
                >
                  {skill.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-slate-900/40 p-3 rounded-xl border border-purple-900/30">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search Hallmark skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-950 border border-purple-900/40 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { id: 'all', label: 'All Skills' },
            { id: 'code', label: 'Code Gen' },
            { id: 'debugging', label: 'Debugging' },
            { id: 'learning', label: 'Learning' },
            { id: 'projects', label: 'Projects' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white font-medium shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Skills Catalog & Skill Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Skill Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>AVAILABLE SKILLS ({filteredSkills.length})</span>
            <span>Click to select & configure</span>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredSkills.map((skill) => {
              const Icon = ICON_MAP[skill.iconName] || Sparkles;
              const isSelected = selectedSkill.id === skill.id;
              const isActive = activeSkillIds.includes(skill.id);

              return (
                <div
                  key={skill.id}
                  onClick={() => handleSelectSkill(skill)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-950/40 border-purple-500/80 shadow-lg shadow-purple-900/20'
                      : 'bg-slate-900/60 border-purple-900/30 hover:bg-slate-800/60 hover:border-purple-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-900/80 to-indigo-900/80 border border-purple-700/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-purple-300" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white tracking-tight">
                            {skill.name}
                          </h3>
                        </div>
                        <div className="text-[11px] font-mono text-purple-400">
                          {skill.tagline}
                        </div>
                      </div>
                    </div>

                    {/* Active Status Badge & Toggle */}
                    <button
                      onClick={(e) => toggleSkillActive(skill.id, e)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold transition-colors shrink-0 ${
                        isActive
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/60'
                          : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                      }`}
                      title={isActive ? 'Click to deactivate' : 'Click to activate'}
                    >
                      {isActive ? 'ACTIVE' : 'INACTIVE'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dedicated Skill Interaction Workbench */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl border border-purple-900/40 bg-slate-900/80 shadow-xl space-y-5">
            {/* Workbench Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-900/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shadow-md">
                  <ActiveIcon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {selectedSkill.name}
                    </h2>
                    <span className="text-[10px] font-mono bg-purple-950 px-2 py-0.5 rounded text-purple-300 border border-purple-800/40">
                      HALLMARK
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{selectedSkill.tagline}</p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                    activeSkillIds.includes(selectedSkill.id)
                      ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {activeSkillIds.includes(selectedSkill.id) ? 'Integrated & Ready' : 'Standby'}
                </span>
              </div>
            </div>

            {/* Quick Presets */}
            {selectedSkill.presetQueries && selectedSkill.presetQueries.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Starter Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSkill.presetQueries.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUserInput(preset)}
                      className="px-2.5 py-1 bg-slate-950 hover:bg-purple-950/50 text-slate-300 hover:text-purple-200 border border-purple-900/30 rounded-lg text-xs transition-colors text-left"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* User Input Deck */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Skill Input Parameter
              </label>
              <div className="rounded-xl border border-purple-900/40 bg-slate-950 overflow-hidden shadow-inner">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  rows={6}
                  className="w-full p-4 bg-transparent text-slate-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                  placeholder={selectedSkill.inputPlaceholder}
                />
              </div>
            </div>

            {/* Trigger Button */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-slate-500">
                Mode: <strong className="text-purple-400">{teachingMode}</strong>
              </span>

              <button
                onClick={handleExecuteSkill}
                disabled={loading || !userInput.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Executing Skill...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Hallmark Skill</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-4 bg-rose-950/40 border border-rose-900/50 rounded-xl text-rose-300 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Output Panel */}
            {skillOutput && (
              <div className="pt-4 border-t border-purple-900/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Execution Result</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onSendToChat && (
                      <button
                        onClick={() =>
                          onSendToChat(
                            `Based on Hallmark ${selectedSkill.name} analysis: ${userInput}`,
                            `Hallmark Skill: ${selectedSkill.name}`
                          )
                        }
                        className="text-xs text-slate-300 hover:text-purple-300 flex items-center gap-1"
                      >
                        <Send className="w-3 h-3 text-purple-400" />
                        <span>Send to Chat</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-purple-900/30 bg-slate-950 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                  {skillOutput}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
