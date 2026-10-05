import React from 'react';
import {
  FileText,
  Printer,
  MessageSquareText,
  HeartHandshake,
  DollarSign
} from 'lucide-react';
import { CashStackSvg, CoinBadgeSvg } from './CashIllustrations';

interface HeaderProps {
  onOpenCopilot: () => void;
  onOpenPresets: () => void;
  onOpenImpactModal: () => void;
  onPrint: () => void;
  hasStrategy: boolean;
  activeTab: 'strategy' | 'flyer' | 'pitches' | 'timeline';
  setActiveTab: (tab: 'strategy' | 'flyer' | 'pitches' | 'timeline') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCopilot,
  onOpenPresets,
  onOpenImpactModal,
  onPrint,
  hasStrategy,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0f2d21]/95 backdrop-blur-md border-b border-[#1b4332] text-white no-print shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Identity - Deep Forest Green & Consistent Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-[#14532d] border border-emerald-400/40 flex items-center justify-center text-white shadow-md shadow-emerald-950/40">
                <DollarSign className="w-6 h-6 text-emerald-100 stroke-[2.5]" />
              </div>
              <div className="absolute -top-1 -right-1">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-fun">
                  FUN<span className="text-emerald-300">raise</span> <span className="text-amber-400">AI</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-900/80 px-2 py-0.5 rounded-full border border-emerald-700/60 flex items-center gap-1">
                  <span>💰</span> Max Profit
                </span>
              </div>
              <p className="text-xs text-emerald-200/70 hidden sm:block">
                Laid-back fundraising strategy, realistic net profit & event flyers
              </p>
            </div>
          </div>

          {/* Clean Focused Tabs */}
          {hasStrategy && (
            <nav className="hidden md:flex items-center gap-1 p-1 bg-[#143e2e] border border-[#235843] rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('strategy')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'strategy'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/40'
                }`}
              >
                Strategy & Net Profit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('flyer')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'flyer'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/40'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-emerald-300" />
                <span>Event Flyers (Fun & Classic)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pitches')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'pitches'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/40'
                }`}
              >
                Outreach Copy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'timeline'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/40'
                }`}
              >
                Run of Show
              </button>
            </nav>
          )}

          {/* Action Controls */}
          <div className="flex items-center gap-2">
            {/* Cumulative Community Impact Button */}
            <button
              type="button"
              onClick={onOpenImpactModal}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 px-3 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
              title="View and report cumulative funds raised"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Report Raised / Wins</span>
              <span className="sm:hidden">Wins</span>
            </button>

            <button
              type="button"
              onClick={onOpenPresets}
              className="text-xs font-semibold text-emerald-100 hover:text-white bg-[#1a4a37] hover:bg-[#225c45] border border-[#2a6d53] px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Quick Examples
            </button>

            {hasStrategy && (
              <button
                type="button"
                onClick={onPrint}
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-emerald-100 hover:text-white bg-[#1a4a37] border border-[#2a6d53] px-3 py-2 rounded-xl transition-colors cursor-pointer"
                title="Print board memo or save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-300" />
                <span>Export Brief</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCopilot}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-emerald-300 hover:bg-emerald-200 px-3.5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <MessageSquareText className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">Ask AI Copilot</span>
              <span className="sm:hidden">AI</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
