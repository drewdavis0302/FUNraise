import React, { useState } from 'react';
import {
  TrendingUp,
  Percent,
  Scissors,
  Zap,
  Building2,
  Clock,
  CheckCircle2,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { ProfitTactic } from '../types';

interface ProfitMaximizationTacticsProps {
  tactics: ProfitTactic[];
}

export const ProfitMaximizationTactics: React.FC<ProfitMaximizationTacticsProps> = ({ tactics }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Cost Reduction', 'Revenue Multiplier', 'Sponsorship & Underwriting', 'Psychological Timing'];

  const filteredTactics =
    selectedCategory === 'All'
      ? tactics
      : tactics.filter((t) => t.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Cost Reduction':
        return <Scissors className="w-4 h-4 text-rose-600" />;
      case 'Revenue Multiplier':
        return <Zap className="w-4 h-4 text-[#166534]" />;
      case 'Sponsorship & Underwriting':
        return <Building2 className="w-4 h-4 text-[#14532d]" />;
      case 'Psychological Timing':
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <TrendingUp className="w-4 h-4 text-[#166534]" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#d0e0d5] shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#e2efe7] pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#0d2d1e] tracking-tight flex items-center gap-2 font-fun">
            <TrendingUp className="w-5 h-5 text-[#166534]" />
            <span>Profit Boosters & Cost Killers</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Practical strategies to eliminate unnecessary venue fees and keep more money for your team.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#f4f7f5] rounded-xl overflow-x-auto border border-[#d2e2d8]">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-[#0d2d1e] shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tactics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTactics.map((tactic, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-[#d2e2d8] bg-white hover:border-[#166534] transition-all shadow-2xs flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#f0f7f3] border border-[#c4e0ce]">
                    {getCategoryIcon(tactic.category)}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{tactic.category}</span>
                </div>
                <span
                  className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    tactic.impactLevel === 'Transformative'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : tactic.impactLevel === 'High'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-slate-100 text-slate-700 border border-slate-300'
                  }`}
                >
                  {tactic.impactLevel} Impact
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-[#0d2d1e] group-hover:text-[#166534] transition-colors">
                {tactic.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">{tactic.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Estimated Take-Home Boost:</span>
                <span className="font-black text-[#14532d] font-mono-code">{tactic.netProfitBoostEstimate}</span>
              </div>

              <div className="p-3 bg-[#f8faf8] border border-[#e2efe7] rounded-xl text-[11px] text-slate-600 leading-snug">
                <strong className="text-[#0d2d1e] font-bold">Action Step: </strong>
                {tactic.implementationTip}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
