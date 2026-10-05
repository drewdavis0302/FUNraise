import React from 'react';
import { Layers, Users, DollarSign, Award, Target } from 'lucide-react';
import { DonorTier } from '../types';

interface DonorPyramidProps {
  pyramid: DonorTier[];
  targetGoal: number;
  totalTurnout: number;
}

export const DonorPyramid: React.FC<DonorPyramidProps> = ({
  pyramid,
  targetGoal,
  totalTurnout,
}) => {
  const totalCalculated = pyramid.reduce((acc, t) => acc + t.projectedTotal, 0);
  const totalDonors = pyramid.reduce((acc, t) => acc + t.targetDonorCount, 0);

  return (
    <div className="bg-white rounded-3xl border border-[#d0e0d5] shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#e2efe7] pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#0d2d1e] tracking-tight flex items-center gap-2 font-fun">
            <Layers className="w-5 h-5 text-[#166534]" />
            <span>Giving Levels & Donor Tiers</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            How many supporters at each level are needed to hit your target easily.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="text-right">
            <span className="text-slate-500 block">Total Pyramid Capacity:</span>
            <span className="font-black text-[#14532d] text-sm font-mono-code">
              ${totalCalculated.toLocaleString()}
            </span>
          </div>
          <div className="text-right border-l border-slate-200 pl-3">
            <span className="text-slate-500 block">Supporters Needed:</span>
            <span className="font-bold text-slate-900 text-sm">
              {totalDonors} / {totalTurnout} attendees
            </span>
          </div>
        </div>
      </div>

      {/* Visual Pyramid Tier Cards */}
      <div className="space-y-3">
        {pyramid.map((tier, idx) => {
          const shareOfTotal = totalCalculated > 0 ? (tier.projectedTotal / totalCalculated) * 100 : 0;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-[#d2e2d8] bg-[#f8faf8] hover:bg-white hover:border-[#166534] transition-all shadow-2xs group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Left: Tier Name & Gift Amount */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#eef7f2] text-[#14532d] border border-[#c4e0ce] font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    T{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{tier.tierName}</h4>
                      <span className="text-xs font-black text-[#14532d] bg-[#eef7f2] px-2 py-0.5 rounded-md border border-[#c4e0ce] font-mono-code">
                        ${tier.giftAmount.toLocaleString()} each
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">
                      <strong className="text-slate-700 font-medium">Who this is:</strong> {tier.donorPersona}
                    </p>
                  </div>
                </div>

                {/* Right: Numbers & Progress Bar */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-2 md:pt-0 border-slate-200">
                  <div className="text-left md:text-right">
                    <span className="text-[11px] text-slate-500 block">People Needed</span>
                    <span className="text-sm font-bold text-slate-800">
                      {tier.targetDonorCount} {tier.targetDonorCount === 1 ? 'supporter' : 'supporters'}
                    </span>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <span className="text-[11px] text-slate-500 block">Projected Total</span>
                    <span className="text-sm font-black text-slate-900 font-mono-code">
                      ${tier.projectedTotal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-[#166534] font-bold block">
                      {shareOfTotal.toFixed(1)}% of total
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar of Yield Share */}
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>
                    <strong className="text-slate-700 font-medium">Recognition / Activation:</strong>{' '}
                    {tier.suggestedPerkOrRecognition}
                  </span>
                </div>
                <div className="w-28 bg-slate-200 h-1.5 rounded-full overflow-hidden shrink-0">
                  <div
                    className="bg-[#14532d] h-full rounded-full"
                    style={{ width: `${Math.min(100, Math.max(8, shareOfTotal))}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="p-4 bg-[#eef7f2] border border-[#c4e0ce] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-700">
        <div>
          <span className="font-semibold text-slate-900">Total Giving Coverage: </span>
          <span>
            {totalCalculated >= targetGoal ? (
              <span className="text-[#14532d] font-bold">
                ✓ 100% of goal covered with a safety cushion (+${(totalCalculated - targetGoal).toLocaleString()})
              </span>
            ) : (
              <span className="text-amber-800 font-bold">
                Covers {Math.round((totalCalculated / targetGoal) * 100)}% of goal
              </span>
            )}
          </span>
        </div>
        <div className="text-slate-600">
          Giving rate needed: {totalTurnout > 0 ? ((totalDonors / totalTurnout) * 100).toFixed(0) : 0}% of room participating
        </div>
      </div>
    </div>
  );
};
