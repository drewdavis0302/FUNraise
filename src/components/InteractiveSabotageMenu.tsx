import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  DollarSign,
  ShieldAlert,
  Zap,
  VolumeX,
  Shuffle,
  Plus,
  Copy,
  Check,
  Printer,
  Info
} from 'lucide-react';
import { InteractiveSabotagePerk, FundraisingParameters } from '../types';

interface InteractiveSabotageMenuProps {
  perks?: InteractiveSabotagePerk[];
  abstractConceptHook?: string;
  parameters: FundraisingParameters;
  onAddCustomPerk?: (newPerk: InteractiveSabotagePerk) => void;
}

export const InteractiveSabotageMenu: React.FC<InteractiveSabotageMenuProps> = ({
  perks = [],
  abstractConceptHook,
  parameters,
  onAddCustomPerk,
}) => {
  const [localPerks, setLocalPerks] = useState<InteractiveSabotagePerk[]>(perks);
  const [testCashRaised, setTestCashRaised] = useState(0);
  const [recentBribe, setRecentBribe] = useState<string | null>(null);
  const [copiedMenu, setCopiedMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New perk form state
  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState(10);
  const [newCategory, setNewCategory] = useState<'Sabotage' | 'Power-Up' | 'Crowd Control' | 'Rule Twist'>('Sabotage');
  const [newDescription, setNewDescription] = useState('');

  // Sync if parent updates
  React.useEffect(() => {
    if (perks && perks.length > 0) {
      setLocalPerks(perks);
    }
  }, [perks]);

  const handleTestTrigger = (perk: InteractiveSabotagePerk) => {
    setTestCashRaised((prev) => prev + perk.cost);
    setRecentBribe(`Spectator paid $${perk.cost} for "${perk.name}"!`);
    setTimeout(() => {
      setRecentBribe(null);
    }, 3500);
  };

  const handleAddPerkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const perk: InteractiveSabotagePerk = {
      name: newName.trim(),
      cost: Number(newCost) || 10,
      category: newCategory,
      description: newDescription.trim() || 'Custom spectator challenge or rule twist.',
      projectedRevenue: (Number(newCost) || 10) * 15,
    };

    setLocalPerks((prev) => [...prev, perk]);
    if (onAddCustomPerk) {
      onAddCustomPerk(perk);
    }

    setNewName('');
    setNewDescription('');
    setShowAddModal(false);
  };

  const handleCopyMenu = () => {
    const textLines = [
      `🎟️ ${parameters.organizationName || 'CLUB'} SPECTATOR PAY-TO-PLAY & SABOTAGE MENU 😈`,
      `Fundraising Target: ${parameters.missionStatement}`,
      `Every single dollar collected goes directly into our team budget ($0 overhead)!`,
      '',
      ...localPerks.map(
        (p) =>
          `[$${p.cost}] ${p.name.toUpperCase()} (${p.category})\n👉 ${p.description}\n`
      ),
      'Pay via Cash, Venmo, or CashApp at the scoring table!'
    ];

    navigator.clipboard.writeText(textLines.join('\n'));
    setCopiedMenu(true);
    setTimeout(() => setCopiedMenu(false), 2500);
  };

  const totalProjectedSabotageYield = localPerks.reduce((sum, p) => sum + (p.projectedRevenue || p.cost * 15), 0);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'Sabotage':
        return {
          icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />,
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          label: '😈 Sabotage'
        };
      case 'Power-Up':
        return {
          icon: <Zap className="w-3.5 h-3.5 text-amber-600" />,
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          label: '⚡ Power-Up'
        };
      case 'Crowd Control':
        return {
          icon: <VolumeX className="w-3.5 h-3.5 text-indigo-600" />,
          bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
          label: '📢 Crowd Control'
        };
      case 'Rule Twist':
      default:
        return {
          icon: <Shuffle className="w-3.5 h-3.5 text-emerald-600" />,
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          label: '🎲 Rule Twist'
        };
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-amber-500/30 p-6 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
      {/* Background playful glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amber-100/40 via-emerald-100/20 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100 pb-5 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-950 font-black text-xs uppercase tracking-wider border border-amber-300 shadow-2xs">
              <Flame className="w-3.5 h-3.5 text-amber-700" />
              <span>Anti-Boring Event Engine</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              100% Net Profit Margin ($0 Overhead)
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-fun flex items-center gap-2">
            <span>Spectator Pay-to-Play & Sabotage Menu</span>
            <span className="text-lg">😈⚡</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Passive spectators just watch; active crowds <strong className="text-slate-900 font-semibold">pay real money</strong> to participate live! All perks below are <strong className="text-slate-800">customizable examples and inspiration</strong>—you can freely modify prices, add your team's inside jokes, or swap in new activities.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyMenu}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer border border-slate-200"
            title="Copy printable menu for event day table stanchions or group chats"
          >
            {copiedMenu ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy Menu Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14532d] hover:bg-[#0e3d21] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-300" />
            <span>Add Custom Sabotage</span>
          </button>
        </div>
      </div>

      {/* Abstract Concept Hook Feature Card */}
      {abstractConceptHook && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-emerald-50 to-amber-50/60 border border-amber-200/80 text-slate-800 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-xs">
            💡
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 block">
              The Abstract & Gamified Event Hook
            </span>
            <p className="font-semibold text-slate-900 mt-0.5 leading-snug">
              "{abstractConceptHook}"
            </p>
            <p className="text-[11px] text-slate-600 mt-1">
              Directly integrates what <strong className="text-slate-800">{parameters.organizationName || 'your group'}</strong> does ({parameters.organizationIdentity || 'your craft'}) with a hilarious, memorable spectator fundraising loop.
            </p>
          </div>
        </div>
      )}

      {/* Interactive Simulation Strip */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center font-bold text-lg font-mono-code">
            💰
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Live Interactive Test Register
            </div>
            <div className="text-base font-extrabold text-white flex items-center gap-2 font-mono-code">
              <span>Simulated Crowd Cash: ${testCashRaised.toLocaleString()}</span>
              {testCashRaised > 0 && (
                <button
                  type="button"
                  onClick={() => setTestCashRaised(0)}
                  className="text-[10px] text-slate-400 hover:text-white underline font-sans font-normal"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {recentBribe ? (
          <div className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-black animate-bounce flex items-center gap-1.5 shadow-md">
            <span>🔥</span>
            <span>{recentBribe}</span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 italic">
            Click any perk below to simulate a spectator dropping cash into the box!
          </div>
        )}
      </div>

      {/* Sabotage & Perk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {localPerks.map((perk, index) => {
          const catInfo = getCategoryBadge(perk.category);
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md transition-all p-5 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${catInfo.bg}`}
                  >
                    {catInfo.icon}
                    <span>{catInfo.label}</span>
                  </span>

                  <div className="text-right">
                    <span className="text-base font-black text-[#14532d] font-mono-code">
                      ${perk.cost}
                    </span>
                    <span className="block text-[9px] text-slate-500 font-medium">per bribe</span>
                  </div>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug">
                  {perk.name}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {perk.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[10px] text-slate-500">
                  Est. Yield: <strong className="text-slate-800 font-semibold">${perk.projectedRevenue || perk.cost * 15}</strong>
                </div>

                <button
                  type="button"
                  onClick={() => handleTestTrigger(perk)}
                  className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-300 text-amber-950 font-black text-xs transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 font-fun flex items-center gap-1"
                >
                  <span>Pay ${perk.cost}</span>
                  <span>⚡</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer Callout */}
      <div className="p-4 rounded-2xl bg-[#f4f9f6] border border-[#c4e0ce] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-[#166534] shrink-0" />
          <span>
            Projected spectator micro-games net profit: <strong className="text-[#14532d] font-bold">${totalProjectedSabotageYield.toLocaleString()}</strong> with virtually <strong className="text-slate-900 font-semibold">$0 incremental costs</strong>.
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#14532d] bg-white px-3 py-1 rounded-xl border border-[#c4e0ce] shrink-0">
          Print on Table Tents & Flyers
        </span>
      </div>

      {/* Custom Perk Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Add Custom Spectator Sabotage</span>
                <span>😈</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPerkSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Perk / Sabotage Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Mute the Opposing Bench, Play in Oven Mitts..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#166534] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Price ($)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newCost}
                    onChange={(e) => setNewCost(Number(e.target.value))}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#166534] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#166534] focus:outline-none bg-white"
                  >
                    <option value="Sabotage">😈 Sabotage</option>
                    <option value="Power-Up">⚡ Power-Up</option>
                    <option value="Crowd Control">📢 Crowd Control</option>
                    <option value="Rule Twist">🎲 Rule Twist</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800">Description / Funny Effect</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe what happens when the spectator pays (e.g. Referee benching, player restriction, wacky music change)..."
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#166534] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#14532d] hover:bg-[#0f3d21] text-white font-bold cursor-pointer"
                >
                  Add to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
