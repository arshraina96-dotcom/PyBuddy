import React, { useState } from 'react';
import { TeachingMode, KnowledgeTopic } from './types';
import { Navbar } from './components/Navbar';
import { ChatView } from './components/ChatView';
import { DryRunView } from './components/DryRunView';
import { ExplainerView } from './components/ExplainerView';
import { DebuggerView } from './components/DebuggerView';
import { QuizPracticeView } from './components/QuizPracticeView';
import { HallmarkSkillsHub } from './components/HallmarkSkillsHub';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('chat');
  const [teachingMode, setTeachingMode] = useState<TeachingMode>('english');
  const [isKnowledgeBaseOpen, setIsKnowledgeBaseOpen] = useState<boolean>(false);

  // Cross-feature code passing state
  const [codeForDryRun, setCodeForDryRun] = useState<string | undefined>(undefined);
  const [codeForDebugger, setCodeForDebugger] = useState<string | undefined>(undefined);
  const [codeForExplainer, setCodeForExplainer] = useState<string | undefined>(undefined);
  const [promptForChat, setPromptForChat] = useState<string | undefined>(undefined);

  const handleSendToDryRun = (code: string) => {
    setCodeForDryRun(code);
    setActiveTab('dryrun');
  };

  const handleSendToDebugger = (code: string) => {
    setCodeForDebugger(code);
    setActiveTab('debug');
  };

  const handleSendToExplainer = (code: string) => {
    setCodeForExplainer(code);
    setActiveTab('explain');
  };

  const handleSendToChat = (query: string, context?: string) => {
    const formatted = context ? `[Context: ${context}]\n\n${query}` : query;
    setPromptForChat(formatted);
    setActiveTab('chat');
  };

  const handleSelectTopicFromKB = (topic: KnowledgeTopic) => {
    const query = teachingMode === 'hinglish'
      ? `PyBuddy, please mujhe "${topic.title}" detail me samjhao Hinglish me. Simple analogies aur real-world examples use karna.`
      : `PyBuddy, please teach me about "${topic.title}" with clean code examples, step-by-step breakdown, and real-life analogies.`;
    handleSendToChat(query, `Knowledge Base: ${topic.category}`);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-purple-600/40 selection:text-white">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        teachingMode={teachingMode}
        setTeachingMode={setTeachingMode}
        onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {activeTab === 'chat' && (
          <ChatView
            teachingMode={teachingMode}
            setTeachingMode={setTeachingMode}
            onSendToDryRun={handleSendToDryRun}
            onSendToDebugger={handleSendToDebugger}
            onSendToExplainer={handleSendToExplainer}
            onOpenKnowledgeBase={() => setIsKnowledgeBaseOpen(true)}
            initialPrompt={promptForChat}
          />
        )}

        {activeTab === 'dryrun' && (
          <DryRunView
            teachingMode={teachingMode}
            initialCode={codeForDryRun}
            onSendToChat={(code) => handleSendToChat(`Explain this dry run in detail:\n\`\`\`python\n${code}\n\`\`\``)}
          />
        )}

        {activeTab === 'explain' && (
          <ExplainerView
            teachingMode={teachingMode}
            initialCode={codeForExplainer}
            onSendToDryRun={handleSendToDryRun}
          />
        )}

        {activeTab === 'debug' && (
          <DebuggerView
            teachingMode={teachingMode}
            initialCode={codeForDebugger}
            onSendToDryRun={handleSendToDryRun}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizPracticeView
            teachingMode={teachingMode}
            onSendToDryRun={handleSendToDryRun}
            onSendToChat={handleSendToChat}
          />
        )}

        {activeTab === 'skills-hub' && (
          <HallmarkSkillsHub
            teachingMode={teachingMode}
            onSendToChat={handleSendToChat}
            onSendToDryRun={handleSendToDryRun}
          />
        )}
      </main>

      {/* Knowledge Base Modal Drawer */}
      <KnowledgeBaseModal
        isOpen={isKnowledgeBaseOpen}
        onClose={() => setIsKnowledgeBaseOpen(false)}
        teachingMode={teachingMode}
        onSelectTopicForChat={handleSelectTopicFromKB}
        onSendToDryRun={handleSendToDryRun}
      />
    </div>
  );
}
