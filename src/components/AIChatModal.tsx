import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  CornerDownLeft,
  Lightbulb
} from 'lucide-react';
import { ChatMessage, FundraisingParameters, GeneratedStrategy } from '../types';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  parameters: FundraisingParameters;
  strategy: GeneratedStrategy | null;
}

const QUICK_PROMPTS = [
  'What are 3 more hilarious spectator sabotage rules we can add?',
  'How do we hype up spectators to pay for ref bribes & player restrictions?',
  'How do I tie what our club does into a viral, abstract mini-game?',
  'Draft a 60-second in-class announcement script for our tournament',
  'How do we hit our fundraising goal with $0 venue rental overhead?',
];

export const AIChatModal: React.FC<AIChatModalProps> = ({
  isOpen,
  onClose,
  parameters,
  strategy,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hey there! 🎉 I'm your FUNraise AI Copilot. I've got your plan loaded:
• Target: $${parameters.desiredFunds.toLocaleString()} | Turnout: ${parameters.desiredTurnout}
• Audience: ${parameters.targetAudience} (${parameters.ageRange.split('(')[0].trim()})
• Timing: ${parameters.timeOfYear.split('(')[0].trim()} · ${parameters.timeOfDay.split('(')[0].trim()}

Whether you're running a school carnival, student council drive, sports booster, or charity night, ask me anything! How can I help make your fundraiser super fun and profitable today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/strategy/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          parameters,
          currentStrategy: strategy,
        }),
      });

      if (!response.ok) throw new Error('Chat failed');
      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          'I apologize, but I encountered a temporary connection issue. To maximize profit, remember to focus on corporate underwriting for fixed costs and deploy a live match during your peak ask window!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs no-print">
      <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-sm font-bold">
              ✨
            </div>
            <div>
              <div className="text-sm font-bold flex items-center gap-2 font-fun">
                <span>FUNraise AI Copilot</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono px-1.5 py-0.2 rounded border border-amber-400/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fundraising coach for schools, clubs, sports & nonprofits
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-600 text-white shadow-xs'
                }`}
              >
                {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-normal">{m.content}</div>

                <div
                  className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[10px] ${
                    m.role === 'user'
                      ? 'border-white/10 text-slate-400'
                      : 'border-slate-100 text-slate-400'
                  }`}
                >
                  <span>{m.timestamp}</span>
                  {m.role === 'assistant' && (
                    <button
                      type="button"
                      onClick={() => handleCopy(m.id, m.content)}
                      className="opacity-0 group-hover:opacity-100 hover:text-slate-700 transition-opacity flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-xs shadow-xs text-xs text-slate-500 flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-slate-300 border-t-emerald-600 rounded-full animate-spin" />
                <span>Formulating profit-maximizing advice...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="p-3 bg-white border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <Lightbulb className="w-3 h-3 text-amber-500" />
            <span>Suggested Tactical Questions:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="text-[11px] text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md whitespace-nowrap transition-colors shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about cutting costs, corporate pitch scripts, or donor tiers..."
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold transition-colors cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
