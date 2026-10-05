import React, { useState } from 'react';
import { SlidersHorizontal, DollarSign, Users, TrendingUp, AlertCircle, RefreshCw, CheckCircle2, Building } from 'lucide-react';
import { FundraisingParameters } from '../types';
import { CashStackSvg } from './CashIllustrations';

interface DynamicProfitSimulatorProps {
  parameters: FundraisingParameters;
}

export const DynamicProfitSimulator: React.FC<DynamicProfitSimulatorProps> = ({ parameters }) => {
  const initialVenue = parameters.knownVenueCost !== undefined ? parameters.knownVenueCost : (parameters.desiredFunds < 25000 ? 0 : 1500);
  const initialTicket = parameters.knownTicketPrice !== undefined ? parameters.knownTicketPrice : (parameters.desiredFunds < 25000 ? 10 : 35);
  const initialSponsors = parameters.knownSponsorships !== undefined ? parameters.knownSponsorships : Math.round(parameters.desiredFunds * 0.25);

  // Simulator state initialized based on parameters & user inputs
  const [turnout, setTurnout] = useState<number>(parameters.desiredTurnout || 150);
  const [ticketPrice, setTicketPrice] = useState<number>(initialTicket);
  const [venueCost, setVenueCost] = useState<number>(initialVenue);
  const [sponsorshipTotal, setSponsorshipTotal] = useState<number>(initialSponsors);
  const [avgDonation, setAvgDonation] = useState<number>(Math.max(25, Math.round(parameters.desiredFunds / (parameters.desiredTurnout || 100))));
  const [givingConversionPct, setGivingConversionPct] = useState<number>(60);
  const [foodAndSuppliesCost, setFoodAndSuppliesCost] = useState<number>(
    parameters.knownFoodCost !== undefined ? parameters.knownFoodCost : Math.round((parameters.desiredTurnout || 150) * 6)
  );

  // Financial calculations
  const ticketGross = turnout * ticketPrice;
  const activeDonorsCount = Math.round(turnout * (givingConversionPct / 100));
  const donationGross = activeDonorsCount * avgDonation;
  const totalGross = ticketGross + sponsorshipTotal + donationGross;
  const totalExpenses = venueCost + foodAndSuppliesCost;
  const netProfit = totalGross - totalExpenses;
  const netMarginPct = totalGross > 0 ? Math.round((netProfit / totalGross) * 100) : 0;

  const targetGoal = parameters.desiredFunds || 50000;
  const goalVariance = netProfit - targetGoal;
  const isGoalReached = netProfit >= targetGoal;

  const handleResetToBaseline = () => {
    setTurnout(parameters.desiredTurnout || 150);
    setTicketPrice(initialTicket);
    setVenueCost(initialVenue);
    setSponsorshipTotal(initialSponsors);
    setAvgDonation(Math.max(25, Math.round(parameters.desiredFunds / (parameters.desiredTurnout || 100))));
    setGivingConversionPct(60);
    setFoodAndSuppliesCost(parameters.knownFoodCost !== undefined ? parameters.knownFoodCost : Math.round((parameters.desiredTurnout || 150) * 6));
  };

  return (
    <div className="bg-white rounded-3xl border border-[#d0e0d5] shadow-xs p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#e2efe7] pb-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#0d2d1e] tracking-tight flex items-center gap-2 font-fun">
            <SlidersHorizontal className="w-5 h-5 text-[#166534]" />
            <span>Interactive Net Profit & Venue Pricing Simulator</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Test what happens when you change venue pricing, ticket costs, sponsors, or attendance in real-time.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetToBaseline}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to Defaults</span>
        </button>
      </div>

      {/* Real-time KPI Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Gross */}
        <div className="p-4 rounded-2xl bg-[#f8faf8] border border-[#d2e2d8] space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Money In (Gross)
          </span>
          <div className="text-xl font-black text-slate-900 font-mono-code">
            ${totalGross.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">
            Tickets + Sponsors + Pledges
          </div>
        </div>

        {/* Total Expenses */}
        <div className="p-4 rounded-2xl bg-[#fef9f9] border border-rose-200 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700">
            Total Hard Costs Out
          </span>
          <div className="text-xl font-black text-rose-600 font-mono-code">
            -${totalExpenses.toLocaleString()}
          </div>
          <div className="text-[11px] text-rose-800">
            Venue (${venueCost}) + Food & AV (${foodAndSuppliesCost})
          </div>
        </div>

        {/* Net Profit to Cause */}
        <div className="p-4 rounded-2xl bg-[#eef7f2] border border-[#c4e0ce] space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#14532d]">
            Net Profit in Your Pocket
          </span>
          <div className="text-xl font-black text-[#14532d] font-mono-code">
            ${netProfit.toLocaleString()}
          </div>
          <div className="text-[11px] font-bold text-[#166534]">
            {netMarginPct}% Net Efficiency
          </div>
        </div>

        {/* Target Goal Comparison */}
        <div
          className={`p-4 rounded-2xl border space-y-1 ${
            isGoalReached
              ? 'bg-[#eef7f2] border-[#c4e0ce] text-[#0d2d1e]'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            vs. Target Goal (${targetGoal.toLocaleString()})
          </span>
          <div
            className={`text-xl font-black font-mono-code ${
              isGoalReached ? 'text-[#14532d]' : 'text-amber-700'
            }`}
          >
            {isGoalReached ? `+$${goalVariance.toLocaleString()}` : `-$${Math.abs(goalVariance).toLocaleString()}`}
          </div>
          <div className="text-[11px] font-medium">
            {isGoalReached ? '✓ Target achieved!' : 'Shortfall — try boosting sponsors or tickets'}
          </div>
        </div>
      </div>

      {/* Sliders Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {/* Slider 1: Venue Cost Override */}
        <div className="space-y-2 p-4 rounded-2xl border border-[#d2e2d8] bg-[#f8faf8]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0d2d1e] flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-[#166534]" />
              <span>Venue Booking Cost ($)</span>
            </label>
            <span className="text-xs font-black text-[#14532d] font-mono-code">
              {venueCost === 0 ? 'FREE ($0)' : `$${venueCost.toLocaleString()}`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={venueCost}
            onChange={(e) => setVenueCost(parseInt(e.target.value))}
            className="w-full accent-[#14532d] cursor-pointer"
          />
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <button
              type="button"
              onClick={() => setVenueCost(0)}
              className="text-[#14532d] font-bold hover:underline cursor-pointer"
            >
              $0 (School Gym/Park)
            </button>
            <span>$5,000</span>
            <span>$10,000</span>
          </div>
        </div>

        {/* Slider 2: Ticket / Entry Price */}
        <div className="space-y-2 p-4 rounded-2xl border border-[#d2e2d8] bg-[#f8faf8]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0d2d1e] flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#166534]" />
              <span>Ticket / Entry Price</span>
            </label>
            <span className="text-xs font-black text-[#14532d] font-mono-code">
              {ticketPrice === 0 ? 'Free Entry ($0)' : `$${ticketPrice}`}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="250"
            step="5"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(parseInt(e.target.value))}
            className="w-full accent-[#14532d] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Free ($0)</span>
            <span>$125</span>
            <span>$250</span>
          </div>
        </div>

        {/* Slider 3: Expected Turnout */}
        <div className="space-y-2 p-4 rounded-2xl border border-[#d2e2d8] bg-[#f8faf8]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0d2d1e] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#166534]" />
              <span>Turnout / Attendance</span>
            </label>
            <span className="text-xs font-black text-[#14532d] font-mono-code">
              {turnout} attendees
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="800"
            step="10"
            value={turnout}
            onChange={(e) => setTurnout(parseInt(e.target.value))}
            className="w-full accent-[#14532d] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>20</span>
            <span>400</span>
            <span>800</span>
          </div>
        </div>

        {/* Slider 4: Sponsorships */}
        <div className="space-y-2 p-4 rounded-2xl border border-[#d2e2d8] bg-[#f8faf8]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0d2d1e] flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#166534]" />
              <span>Local Business Sponsors</span>
            </label>
            <span className="text-xs font-black text-[#14532d] font-mono-code">
              ${sponsorshipTotal.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={Math.max(50000, targetGoal)}
            step="500"
            value={sponsorshipTotal}
            onChange={(e) => setSponsorshipTotal(parseInt(e.target.value))}
            className="w-full accent-[#14532d] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>$0</span>
            <span>${Math.round(targetGoal / 2).toLocaleString()}</span>
            <span>${targetGoal.toLocaleString()}</span>
          </div>
        </div>

        {/* Slider 5: Average Gift in Appeal */}
        <div className="space-y-2 p-4 rounded-2xl border border-[#d2e2d8] bg-[#f8faf8]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0d2d1e]">
              Average Donation / Pledge
            </label>
            <span className="text-xs font-black text-[#14532d] font-mono-code">
              ${avgDonation}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={avgDonation}
            onChange={(e) => setAvgDonation(parseInt(e.target.value))}
            className="w-full accent-[#14532d] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>$10</span>
            <span>$250</span>
            <span>$500</span>
          </div>
        </div>

        {/* Slider 6: Room Giving Conversion */}
        <div className="space-y-2 p-4 rounded-2xl border border-[#d2e2d8] bg-[#f8faf8]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#0d2d1e]">
              Attendee Giving Rate
            </label>
            <span className="text-xs font-black text-[#14532d] font-mono-code">
              {givingConversionPct}% ({activeDonorsCount} donors)
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="95"
            step="5"
            value={givingConversionPct}
            onChange={(e) => setGivingConversionPct(parseInt(e.target.value))}
            className="w-full accent-[#14532d] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>10% (Casual)</span>
            <span>50% (Standard)</span>
            <span>95% (High Energy)</span>
          </div>
        </div>
      </div>

      {/* Reassurance Guidance */}
      <div className="p-4 rounded-2xl bg-[#eef7f2] border border-[#c4e0ce] text-xs text-[#0d2d1e] space-y-1">
        <div className="font-extrabold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-[#166534]" />
          <span>Realistic Profit Tip:</span>
        </div>
        <p className="text-slate-600 leading-relaxed">
          {venueCost === 0 ? (
            <span>
              Hosting in a <strong>free school gym or community park ($0)</strong> allows you to keep an impressive <strong className="text-[#14532d]">{netMarginPct}% net profit</strong>! That means almost every single dollar raised goes straight to your kids and cause!
            </span>
          ) : (
            <span>
              With your <strong>${venueCost.toLocaleString()} venue cost</strong>, securing just <strong className="text-[#14532d]">${Math.round(venueCost * 1.2).toLocaleString()}</strong> in local sponsor banners fully pays for the room before doors open!
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
