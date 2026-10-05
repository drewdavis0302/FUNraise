import React from 'react';
import { GeneratedStrategy, FundraisingParameters } from '../types';

interface PrintExecutiveBriefProps {
  strategy: GeneratedStrategy;
  parameters: FundraisingParameters;
}

export const PrintExecutiveBrief: React.FC<PrintExecutiveBriefProps> = ({
  strategy,
  parameters,
}) => {
  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans text-xs space-y-6 max-w-4xl mx-auto">
      {/* Memo Header */}
      <div className="border-b-2 border-slate-900 pb-4 space-y-2">
        <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-mono">
          <span>FUNRAISE AI · CAMPAIGN STRATEGY & MEMORANDUM</span>
          <span>DATE: {new Date().toLocaleDateString()}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Campaign Profit Maximization Plan & Event Strategy
        </h1>
        <p className="text-sm text-slate-700 italic">
          Mission Focus: "{parameters.missionStatement}"
        </p>
      </div>

      {/* Campaign Parameters Summary */}
      <div className="grid grid-cols-4 gap-4 p-3 bg-slate-100 border border-slate-300 rounded text-[11px]">
        <div>
          <span className="font-bold block text-slate-600">Fundraising Target:</span>
          <span className="font-extrabold text-slate-900 text-sm">
            ${parameters.desiredFunds.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="font-bold block text-slate-600">Desired Turnout:</span>
          <span className="font-semibold text-slate-900">{parameters.desiredTurnout} Attendees</span>
        </div>
        <div>
          <span className="font-bold block text-slate-600">Timing & Season:</span>
          <span className="font-semibold text-slate-900">
            {parameters.timeOfYear.split(' ')[0]} / {parameters.timeOfDay.split(' ')[0]}
          </span>
        </div>
        <div>
          <span className="font-bold block text-slate-600">Target Demographic:</span>
          <span className="font-semibold text-slate-900">
            {parameters.targetAudience} ({parameters.ageRange.split(' ')[0]})
          </span>
        </div>
      </div>

      {/* Executive Summary & Hook */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
          1. Strategic Summary & Profit Architecture
        </h2>
        <p className="text-xs leading-relaxed text-slate-800">
          {strategy.executiveSummary}
        </p>
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs">
          <strong>Core Emotional Ask Hook: </strong>
          <span>"{strategy.coreFundraisingHook}"</span>
        </div>
      </div>

      {/* Financial Comparison */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
          2. Financial Projections & Expense Control
        </h2>
        <table className="w-full border-collapse border border-slate-300 text-left text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 font-bold">Campaign Format</th>
              <th className="border border-slate-300 p-2 font-bold">Projected Gross</th>
              <th className="border border-slate-300 p-2 font-bold">Estimated Costs</th>
              <th className="border border-slate-300 p-2 font-bold">Net Proceeds to Mission</th>
              <th className="border border-slate-300 p-2 font-bold">Net Margin</th>
            </tr>
          </thead>
          <tbody>
            <tr className="font-semibold bg-emerald-50">
              <td className="border border-slate-300 p-2">
                {strategy.recommendedFormat.formatName} (Recommended)
              </td>
              <td className="border border-slate-300 p-2">
                ${strategy.recommendedFormat.projectedGross.toLocaleString()}
              </td>
              <td className="border border-slate-300 p-2 text-rose-700">
                -${strategy.recommendedFormat.projectedExpenses.toLocaleString()}
              </td>
              <td className="border border-slate-300 p-2 text-emerald-800 font-bold">
                ${strategy.recommendedFormat.projectedNetProfit.toLocaleString()}
              </td>
              <td className="border border-slate-300 p-2 text-emerald-800 font-bold">
                {strategy.recommendedFormat.marginPct}%
              </td>
            </tr>
            {strategy.alternativeFormats.map((alt, idx) => (
              <tr key={idx}>
                <td className="border border-slate-300 p-2">{alt.formatName}</td>
                <td className="border border-slate-300 p-2">${alt.projectedGross.toLocaleString()}</td>
                <td className="border border-slate-300 p-2 text-rose-700">-${alt.projectedExpenses.toLocaleString()}</td>
                <td className="border border-slate-300 p-2">${alt.projectedNetProfit.toLocaleString()}</td>
                <td className="border border-slate-300 p-2">{alt.marginPct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Giving Pyramid */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
          3. Donor Giving Pyramid Matrix
        </h2>
        <table className="w-full border-collapse border border-slate-300 text-left text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 p-2 font-bold">Tier Name</th>
              <th className="border border-slate-300 p-2 font-bold">Gift Amount</th>
              <th className="border border-slate-300 p-2 font-bold">Donors Needed</th>
              <th className="border border-slate-300 p-2 font-bold">Total Yield</th>
              <th className="border border-slate-300 p-2 font-bold">Donor Segment</th>
            </tr>
          </thead>
          <tbody>
            {strategy.donorPyramid.map((t, idx) => (
              <tr key={idx}>
                <td className="border border-slate-300 p-2 font-medium">{t.tierName}</td>
                <td className="border border-slate-300 p-2">${t.giftAmount.toLocaleString()}</td>
                <td className="border border-slate-300 p-2">{t.targetDonorCount}</td>
                <td className="border border-slate-300 p-2 font-bold">${t.projectedTotal.toLocaleString()}</td>
                <td className="border border-slate-300 p-2">{t.donorPersona}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Tactics */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
          4. Profit Maximization & Expense Reductions
        </h2>
        <div className="grid grid-cols-2 gap-3 text-[11px]">
          {strategy.profitMaximizationTactics.map((tac, idx) => (
            <div key={idx} className="p-2 border border-slate-200 rounded">
              <div className="font-bold text-slate-900">{tac.title} ({tac.category})</div>
              <div className="text-slate-600 mt-0.5">{tac.description}</div>
              <div className="text-emerald-700 font-semibold mt-1">Impact: {tac.netProfitBoostEstimate}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Signoff / Adoption Block */}
      <div className="pt-6 border-t-2 border-slate-900 grid grid-cols-2 gap-8 text-xs">
        <div>
          <div className="border-b border-slate-400 pb-8 mb-1"></div>
          <span className="font-bold text-slate-700 block">Board Development Chair / President</span>
          <span className="text-[10px] text-slate-500">Signature & Date</span>
        </div>
        <div>
          <div className="border-b border-slate-400 pb-8 mb-1"></div>
          <span className="font-bold text-slate-700 block">Executive Director / Chief Development Officer</span>
          <span className="text-[10px] text-slate-500">Signature & Date</span>
        </div>
      </div>
    </div>
  );
};
