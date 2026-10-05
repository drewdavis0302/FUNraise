import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ParameterForm } from './components/ParameterForm';
import { ProfitDashboard } from './components/ProfitDashboard';
import { DonorPyramid } from './components/DonorPyramid';
import { ProfitMaximizationTactics } from './components/ProfitMaximizationTactics';
import { EventFlyer } from './components/EventFlyer';
import { OutreachVault } from './components/OutreachVault';
import { TimelineAndRunOfShow } from './components/TimelineAndRunOfShow';
import { DynamicProfitSimulator } from './components/DynamicProfitSimulator';
import { AIChatModal } from './components/AIChatModal';
import { PresetsModal } from './components/PresetsModal';
import { ImpactTrackerModal } from './components/ImpactTrackerModal';
import { PrintExecutiveBrief } from './components/PrintExecutiveBrief';
import { PRESET_PROFILES } from './data/presets';
import { FundraisingParameters, GeneratedStrategy } from './types';
import {
  Sparkles,
  TrendingUp,
  FileText,
  ChevronDown,
  AlertCircle,
  MessageSquareText,
  HeartHandshake,
  DollarSign,
  Users,
  Calendar,
  Clock,
  SlidersHorizontal,
  Building
} from 'lucide-react';
import { CashStackSvg, FlyingMoneySvg, MoneyJarSvg, LaidBackCashChip } from './components/CashIllustrations';

export default function App() {
  // Initial parameters default: Youth STEM & Robotics Initiative
  const [parameters, setParameters] = useState<FundraisingParameters>(
    PRESET_PROFILES[0].params
  );

  const [strategy, setStrategy] = useState<GeneratedStrategy | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Clean, focused navigation tabs
  const [activeTab, setActiveTab] = useState<'strategy' | 'flyer' | 'pitches' | 'timeline'>('strategy');
  const [showSimulatorDrawer, setShowSimulatorDrawer] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState<boolean>(false);
  const [isImpactOpen, setIsImpactOpen] = useState<boolean>(false);
  const [isFormCollapsed, setIsFormCollapsed] = useState<boolean>(false);

  // Automatically generate initial strategy on mount
  useEffect(() => {
    handleGenerateStrategy(PRESET_PROFILES[0].params);
  }, []);

  const handleGenerateStrategy = async (customParams?: FundraisingParameters) => {
    const paramsToUse = customParams || parameters;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/strategy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paramsToUse),
      });

      if (!response.ok) {
        throw new Error('Failed to generate strategy');
      }

      const data = await response.json();
      if (data.strategy) {
        setStrategy(data.strategy);
        // Collapse form so the user immediately sees the generated plan & deliverable flyer
        setIsFormCollapsed(true);
      }
    } catch (err: any) {
      console.error('Error generating strategy:', err);
      setError('Unable to contact the strategy server. Please try again or adjust parameters.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (newParams: FundraisingParameters) => {
    setParameters(newParams);
    handleGenerateStrategy(newParams);
  };

  const handlePrint = () => {
    window.print();
  };

  // Safe fallback flyer data if strategy doesn't have it
  const flyerData = strategy?.eventFlyer || {
    eventTitle: parameters.organizationName
      ? `${parameters.organizationName} Rally`
      : (parameters.missionStatement ? `${parameters.missionStatement.slice(0, 30)}... Rally` : 'Community Impact Reception'),
    tagline: parameters.organizationIdentity
      ? `Celebrating our mission: ${parameters.organizationIdentity.slice(0, 80)}... where every dollar raised is doubled!`
      : 'An evening of direct mission impact, high-energy community, and dollar-for-dollar matched giving.',
    dateOrSeason: parameters.timeOfYear ? parameters.timeOfYear.split('(')[0].trim() : 'Coming This Season',
    timeAndVibe: parameters.timeOfDay ? `${parameters.timeOfDay.split('(')[0].trim()} · Inspiring & Fast-Paced` : 'Evening Reception (6:30 PM)',
    locationOrVenue: parameters.knownVenueCost === 0 ? `${parameters.maxVenueCapacity || 'Local Space'} (Free Facility)` : 'Community Hall',
    heroHighlight: '100% of your ticket and pledge goes directly to program beneficiaries.',
    bulletHighlights: [
      'Live 1:1 Challenge Match doubling every dollar pledged in the room',
      'Direct mission beneficiary spotlight & short high-impact presentation',
      'Curated reception appetizers, wine pairings & exclusive networking',
      'Zero donor transaction fees: 100% mission efficiency'
    ],
    ticketOrAdmissionText: parameters.knownTicketPrice !== undefined && parameters.knownTicketPrice > 0
      ? `Tickets: $${parameters.knownTicketPrice} per person`
      : 'Free Admission! Suggested donations welcome at the door',
    impactCallout: `Every $${Math.max(10, Math.round(parameters.knownTicketPrice || 25))} gifted funds immediate front-line programs for ${parameters.targetAudience || 'our beneficiaries'}.`,
    rsvpCallToAction: 'RSVP & Reserve Your Impact Seat Today',
    matchingGrantCallout: `Special Anchor Match Active for This Gathering`
  };

  return (
    <div className="min-h-screen bg-[#f3f7f4] text-[#11241a] flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Header
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenPresets={() => setIsPresetsOpen(true)}
        onOpenImpactModal={() => setIsImpactOpen(true)}
        onPrint={handlePrint}
        hasStrategy={!!strategy}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 no-print">
        {/* Quick Parameters Summary Strip & Mode Switcher */}
        {strategy && (
          <div className="bg-white rounded-3xl border border-[#d0e0d5] p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Target Goal
                </span>
                <span className="font-extrabold text-[#14532d] text-sm font-mono-code">
                  ${parameters.desiredFunds.toLocaleString()}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-4">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Venue & Turnout
                </span>
                <span className="font-semibold text-slate-800">
                  {parameters.desiredTurnout} guests · {parameters.knownVenueCost === 0 ? 'Free Venue ($0)' : (parameters.knownVenueCost ? `$${parameters.knownVenueCost} venue` : 'Venue budgeted')}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-4 hidden sm:block">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Season & Time
                </span>
                <span className="font-semibold text-slate-800">
                  {parameters.timeOfYear.split(' ')[0]} · {parameters.timeOfDay.split(' ')[0]}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-4 hidden md:block">
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Audience
                </span>
                <span className="font-semibold text-slate-800 truncate max-w-[200px]">
                  {parameters.targetAudience}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Deliverable flyer shortcut tab */}
              <button
                type="button"
                onClick={() => setActiveTab('flyer')}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'flyer'
                    ? 'bg-[#14532d] text-white shadow-xs'
                    : 'bg-[#eef7f2] text-[#14532d] hover:bg-[#deede3] border border-[#c4e0ce]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Event Flyers (8 Themes)</span>
              </button>

              {/* Sensitivity Simulator Drawer toggle */}
              <button
                type="button"
                onClick={() => setShowSimulatorDrawer(!showSimulatorDrawer)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all cursor-pointer ${
                  showSimulatorDrawer
                    ? 'bg-[#0d2d1e] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#166534]" />
                <span>{showSimulatorDrawer ? 'Hide Simulator' : 'Profit Simulator'}</span>
              </button>

              {/* Edit parameters button */}
              <button
                type="button"
                onClick={() => setIsFormCollapsed(!isFormCollapsed)}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isFormCollapsed ? 'Change Details' : 'Hide Form'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${isFormCollapsed ? '' : 'rotate-180'}`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Parameter Configuration Form */}
        {(!strategy || !isFormCollapsed) && (
          <ParameterForm
            parameters={parameters}
            onChange={setParameters}
            onSubmit={() => handleGenerateStrategy()}
            isLoading={isLoading}
          />
        )}

        {/* Loading Spinner State */}
        {isLoading && (
          <div className="bg-white rounded-3xl border border-[#d0e0d5] p-12 text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 border-3 border-emerald-200 border-t-[#14532d] rounded-full animate-spin mx-auto" />
            <div>
              <h3 className="text-base font-bold text-[#0d2d1e] font-fun">
                Calculating Maximum Net Profit & Deliverables...
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Deducting venue costs, optimizing ticket prices, and preparing your ready-to-distribute event flyer.
              </p>
            </div>
          </div>
        )}

        {/* Optional Interactive Simulator */}
        {showSimulatorDrawer && strategy && !isLoading && (
          <div className="transition-all">
            <DynamicProfitSimulator parameters={parameters} />
          </div>
        )}

        {/* Tab Views */}
        {strategy && !isLoading && (
          <div className="space-y-8">
            {/* Tab 1: Executive Strategy & Profit Plan (Primary View) */}
            {activeTab === 'strategy' && (
              <div className="space-y-8">
                <ProfitDashboard strategy={strategy} parameters={parameters} />

                {/* Quick Flyer Preview CTA Card - Deep Forest Green & Money Focused */}
                <div className="bg-gradient-to-r from-[#0d2d1e] via-[#14532d] to-[#0a2418] border border-[#235841] rounded-3xl p-6 sm:p-7 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                  <div className="space-y-1 text-center sm:text-left relative z-10">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-black uppercase tracking-wider text-emerald-300">
                      <span>📄 DELIVERABLE EVENT FLYERS READY</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white font-fun">
                      Printable Event Flyers in 8 Styles (Straightforward & Fun)
                    </h3>
                    <p className="text-xs text-emerald-100/90 max-w-xl">
                      Need a clean bulletin for corporate sponsors or a colorful carnival flyer for school kids? Switch styles with 1 click.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 relative z-10 shrink-0">
                    <CashStackSvg className="w-12 h-12 hidden md:block" />
                    <button
                      type="button"
                      onClick={() => setActiveTab('flyer')}
                      className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105 cursor-pointer shrink-0 font-fun"
                    >
                      View & Print Flyers 📄 →
                    </button>
                  </div>
                </div>

                <DonorPyramid
                  pyramid={strategy.donorPyramid}
                  targetGoal={parameters.desiredFunds}
                  totalTurnout={parameters.desiredTurnout}
                />
                <ProfitMaximizationTactics tactics={strategy.profitMaximizationTactics} />
              </div>
            )}

            {/* Tab 2: Deliverable Event Flyer */}
            {activeTab === 'flyer' && (
              <div className="space-y-8">
                <EventFlyer flyer={flyerData} parameters={parameters} />
              </div>
            )}

            {/* Tab 3: Outreach Copy Vault */}
            {activeTab === 'pitches' && (
              <div className="space-y-8">
                <OutreachVault pitches={strategy.outreachPitches} />
              </div>
            )}

            {/* Tab 4: Day-of Run of Show & Milestone Cadence */}
            {activeTab === 'timeline' && (
              <div className="space-y-8">
                <TimelineAndRunOfShow
                  timeline={strategy.timelineCadence}
                  runOfShow={strategy.dayOfRunOfShow}
                  pitfalls={strategy.pitfallsAndRiskMitigations}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Printable Board Memorandum */}
      {strategy && (
        <PrintExecutiveBrief strategy={strategy} parameters={parameters} />
      )}

      {/* Floating Action Button for AI Copilot */}
      <div className="fixed bottom-6 right-6 z-40 no-print flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => setIsImpactOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-emerald-50 text-[#14532d] border border-[#c4e0ce] shadow-md transition-all cursor-pointer text-xs font-bold"
        >
          <HeartHandshake className="w-4 h-4 text-[#166534]" />
          <span>Report Dollars Raised</span>
        </button>

        <button
          type="button"
          onClick={() => setIsCopilotOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#0d2d1e] hover:bg-[#14532d] text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-[#225c43] group"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <MessageSquareText className="w-4 h-4 text-emerald-300" />
          <span className="text-xs font-bold">Ask AI Copilot</span>
        </button>
      </div>

      {/* Modals & Drawers */}
      <AIChatModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        parameters={parameters}
        strategy={strategy}
      />

      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        onSelectPreset={handleSelectPreset}
      />

      <ImpactTrackerModal
        isOpen={isImpactOpen}
        onClose={() => setIsImpactOpen(false)}
        defaultTargetGoal={parameters.desiredFunds}
      />

      {/* Footer - Consistent Deep Forest Green */}
      <footer className="mt-auto border-t border-[#d0e0d5] bg-white py-6 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#0d2d1e] font-fun text-sm">
              FUN<span className="text-[#166534]">raise</span> <span className="text-amber-500">AI</span>
            </span>
            <span>· Easy & High-Profit Strategy & Event Flyer Generator for Schools & Teams</span>
          </div>
          <button
            type="button"
            onClick={() => setIsImpactOpen(true)}
            className="text-[#14532d] hover:text-[#0d2d1e] font-bold cursor-pointer underline text-[11px]"
          >
            Submit Dollars Raised & View Community Total →
          </button>
        </div>
      </footer>
    </div>
  );
}
