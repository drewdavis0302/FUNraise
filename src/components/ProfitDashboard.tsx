import React from 'react';
import {
  TrendingUp,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Award,
  ArrowRight,
  PieChart,
  CheckCircle2,
  Calendar,
  Clock,
  Users,
  Building,
  Sparkles,
  Ticket,
  Heart,
  Flame
} from 'lucide-react';
import { GeneratedStrategy, FundraisingParameters } from '../types';
import { CashStackSvg, FlyingMoneySvg, MoneyJarSvg, LaidBackCashChip } from './CashIllustrations';
import { InteractiveSabotageMenu } from './InteractiveSabotageMenu';
import { EventDetailedWalkthrough } from './EventDetailedWalkthrough';

interface ProfitDashboardProps {
  strategy: GeneratedStrategy;
  parameters: FundraisingParameters;
}

export const ProfitDashboard: React.FC<ProfitDashboardProps> = ({ strategy, parameters }) => {
  const { recommendedFormat, alternativeFormats, financialBreakdown } = strategy;

  // Format currency helper
  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  // Use financialBreakdown if available, otherwise compute from recommended format
  const fb = financialBreakdown || {
    venueCost: parameters.knownVenueCost !== undefined ? parameters.knownVenueCost : Math.round(parameters.desiredFunds * 0.05),
    isVenueFreeOrDonated: parameters.knownVenueCost === 0,
    ticketRevenue: (parameters.knownTicketPrice || 20) * parameters.desiredTurnout,
    ticketPrice: parameters.knownTicketPrice || 20,
    sponsorshipRevenue: parameters.knownSponsorships || Math.round(parameters.desiredFunds * 0.25),
    directDonations: Math.round(parameters.desiredFunds * 0.6),
    foodAndCateringCost: parameters.knownFoodCost !== undefined ? parameters.knownFoodCost : Math.round(parameters.desiredTurnout * 6),
    otherExpenses: 300,
    totalExpenses: recommendedFormat.projectedExpenses,
    totalGrossRevenue: recommendedFormat.projectedGross,
    realisticNetProfit: recommendedFormat.projectedNetProfit,
    marginPct: recommendedFormat.marginPct,
    profitNotes: parameters.knownVenueCost === 0
      ? 'Zero venue rental fee ($0): Keeps overhead rock-bottom so over 88% goes directly to your cause!'
      : 'All venue costs and hard expenses are deducted for a crystal-clear take-home amount.',
  };

  return (
    <div className="space-y-8">
      {/* Top Hero Banner: Deep Forest Green & Money Focused */}
      <div className="bg-gradient-to-br from-[#0c281b] via-[#123827] to-[#071911] border border-[#235841] text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md">
        {/* Floating Cash Decorative Badges (Laid Back & Fun) */}
        <div className="absolute top-4 right-6 opacity-25 pointer-events-none hidden sm:block">
          <CashStackSvg className="w-24 h-24" />
        </div>
        <div className="absolute -bottom-6 right-28 opacity-15 pointer-events-none hidden lg:block">
          <FlyingMoneySvg className="w-28 h-28" />
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="bg-emerald-400 text-slate-950 font-black px-3 py-1 rounded-full uppercase tracking-wider text-[10px] flex items-center gap-1 shadow-xs">
              <span>💰</span> Maximum Net Profit Blueprint
            </span>
            <span className="text-emerald-400/80">•</span>
            <span className="text-emerald-200">{parameters.timeOfYear.split(' ')[0]}</span>
            <span className="text-emerald-400/80">•</span>
            <span className="text-emerald-200">{parameters.timeOfDay.split(' ')[0]}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-fun">
            {strategy.strategyName}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
            {strategy.executiveSummary}
          </p>

          {/* Giving Angle, Club Craft & Abstract Concept Hook Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex items-start gap-3 backdrop-blur-xs">
              <Award className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <span>Key Fundraising Angle</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-50 mt-0.5 leading-snug">
                  "{strategy.coreFundraisingHook}"
                </p>
              </div>
            </div>

            {(strategy.identityTieInRationale || parameters.organizationIdentity) && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-400/30 flex items-start gap-3 backdrop-blur-xs">
                <Sparkles className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                    <span>Tied to Club Craft & Identity</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-100 mt-0.5 leading-snug">
                    {strategy.identityTieInRationale ||
                      `Centered around ${parameters.organizationName || "your team's"} real passion: "${parameters.organizationIdentity}".`}
                  </p>
                </div>
              </div>
            )}

            {strategy.abstractConceptHook && (
              <div className="p-4 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-start gap-3 backdrop-blur-xs md:col-span-2 lg:col-span-1">
                <Flame className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                    <span>Abstract & Gamified Twist</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-100 mt-0.5 leading-snug">
                    "{strategy.abstractConceptHook}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* WHAT EXACTLY IS THIS EVENT? (Complete Visual & Experience Walkthrough)    */}
      {/* ========================================================================= */}
      <EventDetailedWalkthrough
        description={strategy.detailedEventDescription}
        strategyName={strategy.strategyName}
        formatName={recommendedFormat.formatName}
        parameters={parameters}
        abstractConceptHook={strategy.abstractConceptHook}
      />

      {/* ========================================================================= */}
      {/* REALISTIC NET PROFIT & BUDGET BREAKDOWN (Clear for Board/Principal/Team)  */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border-2 border-[#166534]/30 p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#e2efe7]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#eef7f2] border border-[#c4e0ce] flex items-center justify-center text-xl shadow-2xs">
              💵
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0d2d1e] font-fun flex items-center gap-2">
                <span>Realistic Net Profit & Budget Breakdown</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                  Defensible for Your Team
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Transparent math showing money coming in minus venue & hard costs = actual take-home profit.
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-[#14532d] bg-[#eef7f2] px-3 py-1.5 rounded-xl border border-[#c4e0ce] self-start sm:self-center">
            {fb.marginPct}% Net Profit Margin
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: Money Coming In (Gross Revenue) */}
          <div className="p-5 rounded-2xl bg-[#f8faf8] border border-[#d2e2d8] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#166534]" />
                <span>Money Coming In</span>
              </span>
              <span className="text-xs font-extrabold text-slate-900 font-mono-code">
                {fmt(fb.totalGrossRevenue)}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {/* Ticket Sales */}
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <span>Ticket Sales ({parameters.desiredTurnout} × ${fb.ticketPrice}):</span>
                  {fb.ticketPrice === 0 && (
                    <span className="text-[9px] font-bold uppercase bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded">
                      Free ($0)
                    </span>
                  )}
                </span>
                <span className={`font-semibold ${fb.ticketPrice === 0 ? 'text-slate-400' : 'text-slate-900'}`}>
                  {fmt(fb.ticketRevenue)}
                </span>
              </div>

              {/* Crowd Engagement & Spectator Perks (The Primary In-Event Engine) */}
              <div
                className={`flex items-center justify-between text-xs py-1.5 border-b border-slate-100 ${
                  fb.ticketPrice === 0 ? 'bg-emerald-50/80 -mx-2 px-2 rounded-lg' : ''
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-slate-700 font-semibold flex items-center gap-1">
                    <span>Crowd Engagement & Perks:</span>
                    {fb.ticketPrice === 0 && (
                      <span className="text-[9px] font-extrabold uppercase bg-emerald-200 text-emerald-950 px-1.5 py-0.2 rounded border border-emerald-300">
                        Primary In-Event Revenue
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    ~{parameters.desiredTurnout} guests ($18-$35 avg on spectator sabotages, bribes & raffles)
                  </span>
                </div>
                <span className="font-extrabold text-emerald-800 font-mono-code">
                  {fmt(fb.crowdEngagementRevenue || 0)}
                </span>
              </div>

              {/* Sponsorships */}
              <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                <span className="text-slate-600">Committed & Targeted Sponsors:</span>
                <span className="font-semibold text-slate-900">{fmt(fb.sponsorshipRevenue)}</span>
              </div>

              {/* Direct Donations */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-600">Live & Direct Donations:</span>
                <span className="font-semibold text-slate-900">{fmt(fb.directDonations)}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Hard Expenses & Venue Costs */}
          <div className="p-5 rounded-2xl bg-[#fef9f9] border border-rose-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-rose-600" />
                <span>Hard Costs & Venue</span>
              </span>
              <span className="text-xs font-extrabold text-rose-700 font-mono-code">
                -{fmt(fb.totalExpenses)}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs py-1 border-b border-rose-100">
                <span className="text-slate-600 flex items-center gap-1">
                  <span>Venue Rental:</span>
                  {fb.isVenueFreeOrDonated && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-1 rounded">
                      FREE ($0)
                    </span>
                  )}
                </span>
                <span className="font-semibold text-slate-900">{fmt(fb.venueCost)}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-rose-100">
                <span className="text-slate-600">Food, Snacks & Catering:</span>
                <span className="font-semibold text-slate-900">{fmt(fb.foodAndCateringCost)}</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-600">Supplies, AV & Prizes:</span>
                <span className="font-semibold text-slate-900">{fmt(fb.otherExpenses)}</span>
              </div>
            </div>
          </div>

          {/* Card 3: ACTUAL NET PROFIT (THE BIG HERO NUMBER) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#14532d] to-[#0a2618] border-2 border-[#166534] text-white flex flex-col justify-between shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Real Net Profit</span>
                </span>
                <span className="text-[10px] font-extrabold bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full">
                  Take-Home Cash
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono-code pt-2">
                {fmt(fb.realisticNetProfit)}
              </div>
              <p className="text-xs text-emerald-200/90 pt-1 leading-snug">
                {fb.profitNotes}
              </p>
            </div>

            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-emerald-100">
              <span>Goal: {fmt(parameters.desiredFunds)}</span>
              <span className="font-bold text-amber-300">
                {fb.realisticNetProfit >= parameters.desiredFunds ? '✓ Exceeds Target!' : 'On Track'}
              </span>
            </div>
          </div>
        </div>

        {/* In-Event Crowd Engagement Revenue Breakdown Panel */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#f0f7f3] border border-[#c4e0ce] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#c4e0ce]/60 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-sm font-bold shadow-2xs">
                🎟️
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#0d2d1e] font-fun flex items-center gap-2">
                  <span>How Crowd Engagement Powers Your Net Profit</span>
                  <span className="text-[10px] font-bold uppercase bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300">
                    {fmt(fb.crowdEngagementRevenue || 0)} Estimated In-Event Revenue
                  </span>
                </h4>
                <p className="text-[11px] text-slate-600">
                  {fb.ticketPrice === 0
                    ? 'Because admission is free ($0 entry), venue attendance is maximized without friction. In-person crowd micro-transactions generate defensible take-home profit with zero overhead!'
                    : 'Auxiliary spectator micro-actions and participatory perks generate high-margin revenue on top of ticket sales.'}
                </p>
              </div>
            </div>
            <div className="text-[11px] font-extrabold text-emerald-900 bg-white px-2.5 py-1 rounded-xl border border-[#c4e0ce] self-start sm:self-center shadow-2xs">
              100% Net Margin · $0 Overhead
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-white rounded-xl border border-[#d2e5d9] space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>😈 Spectator Sabotages & Perks</span>
                <span className="text-emerald-700 font-extrabold">~50%</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono-code">
                {fmt(Math.round((fb.crowdEngagementRevenue || 0) * 0.5))}
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Micro-bribes to bend rules, player handicaps, referee swaps & golden balls.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#d2e5d9] space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>🎟️ 50/50 Raffle & Live Match Blitz</span>
                <span className="text-emerald-700 font-extrabold">~30%</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono-code">
                {fmt(Math.round((fb.crowdEngagementRevenue || 0) * 0.3))}
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Halftime 50/50 ticket sales, rapid 15-min matching pledge challenges & auctions.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#d2e5d9] space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                <span>🍿 Concessions & Team Merch</span>
                <span className="text-emerald-700 font-extrabold">~20%</span>
              </div>
              <div className="text-base font-black text-slate-900 font-mono-code">
                {fmt(Math.round((fb.crowdEngagementRevenue || 0) * 0.2))}
              </div>
              <p className="text-[10px] text-slate-500 leading-tight">
                Volunteer-donated baked goods, drinks, pizza slices, and student stickers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SPECTATOR PAY-TO-PLAY & SABOTAGE MENU (Anti-Boring & Pure Net Profit)     */}
      {/* ========================================================================= */}
      <InteractiveSabotageMenu
        perks={strategy.interactiveSabotageMenu}
        abstractConceptHook={strategy.abstractConceptHook}
        parameters={parameters}
      />

      {/* Financial Maximization Comparison: Recommended vs Alternatives */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <div>
            <h3 className="text-base font-extrabold text-[#0d2d1e] font-fun">
              Event Structure & Format Comparison
            </h3>
            <p className="text-xs text-slate-500">
              Why this specific model keeps more money in your pocket than traditional galas.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-600">
            Net Margin = (Gross - Costs) ÷ Gross
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recommended Format (Dominant Card) */}
          <div className="lg:col-span-1 rounded-3xl border-2 border-[#166534] bg-white p-6 shadow-sm relative flex flex-col justify-between">
            <div className="absolute -top-3 left-6 bg-[#14532d] text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
              ★ Highest Net Profit Model
            </div>

            <div className="space-y-4 pt-1">
              <div>
                <h4 className="text-base font-extrabold text-[#0d2d1e]">
                  {recommendedFormat.formatName}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {recommendedFormat.rationale}
                </p>
              </div>

              {/* Financial Box */}
              <div className="p-4 bg-[#f0f7f3] border border-[#c4e0ce] rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Gross Projected:</span>
                  <span className="font-bold text-slate-900">{fmt(recommendedFormat.projectedGross)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Expenses & Hard Costs:</span>
                  <span className="font-bold text-rose-600">-{fmt(recommendedFormat.projectedExpenses)}</span>
                </div>
                <div className="pt-2 border-t border-[#c4e0ce] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0d2d1e]">Net Profit to Mission:</span>
                  <span className="text-base font-extrabold text-[#14532d]">
                    {fmt(recommendedFormat.projectedNetProfit)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#14532d] font-bold">Net Profit Margin:</span>
                  <span className="font-extrabold text-[#14532d] bg-emerald-100 px-2.5 py-0.5 rounded-full text-xs">
                    {recommendedFormat.marginPct}%
                  </span>
                </div>
              </div>

              {/* Key Strengths */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Why this maximizes profit:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {recommendedFormat.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#166534] shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Alternative Formats */}
          {alternativeFormats.map((alt, idx) => (
            <div
              key={idx}
              className="lg:col-span-1 rounded-3xl border border-[#d2e2d8] bg-white p-6 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-slate-800">{alt.formatName}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">Alternative {idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{alt.rationale}</p>
                </div>

                {/* Financial Box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Gross Projected:</span>
                    <span className="font-medium text-slate-800">{fmt(alt.projectedGross)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Operating Expenses:</span>
                    <span className="font-medium text-rose-600">-{fmt(alt.projectedExpenses)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">Net Profit to Mission:</span>
                    <span className="text-sm font-bold text-slate-900">{fmt(alt.projectedNetProfit)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-600">Net Profit Margin:</span>
                    <span className="font-semibold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded text-xs">
                      {alt.marginPct}%
                    </span>
                  </div>
                </div>

                {/* Drawback analysis */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Profit Limitations:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {alt.drawbacks.map((d, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Synthesis Insights: Temporal, Seasonal & Demographic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Seasonal Strategy */}
        <div className="p-5 rounded-3xl bg-white border border-[#d2e2d8] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0d2d1e]">
            <Calendar className="w-4 h-4 text-[#166534]" />
            <span>Seasonal Advantage ({parameters.timeOfYear.split(' ')[0]})</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {strategy.seasonalStrategyNotes}
          </p>
        </div>

        {/* Time of Day Run-of-Show Advantage */}
        <div className="p-5 rounded-3xl bg-white border border-[#d2e2d8] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0d2d1e]">
            <Clock className="w-4 h-4 text-[#166534]" />
            <span>Time of Day Timing ({parameters.timeOfDay.split(' ')[0]})</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {strategy.timeOfDayTactics}
          </p>
        </div>

        {/* Demographic Bridge Strategy */}
        <div className="p-5 rounded-3xl bg-white border border-[#d2e2d8] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0d2d1e]">
            <Users className="w-4 h-4 text-[#166534]" />
            <span>Demographic Bridge</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {strategy.demographicBridgeStrategy}
          </p>
        </div>
      </div>
    </div>
  );
};
