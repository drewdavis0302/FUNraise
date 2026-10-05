import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle2, Flame, ShieldAlert } from 'lucide-react';
import { TimelinePhase, RunOfShowItem } from '../types';

interface TimelineAndRunOfShowProps {
  timeline: TimelinePhase[];
  runOfShow: {
    recommendedScheduleTitle: string;
    schedule: RunOfShowItem[];
    peakAskWindow: string;
  };
  pitfalls: Array<{
    potentialTrap: string;
    financialExposure: string;
    preventiveAction: string;
  }>;
}

export const TimelineAndRunOfShow: React.FC<TimelineAndRunOfShowProps> = ({
  timeline,
  runOfShow,
  pitfalls,
}) => {
  return (
    <div className="space-y-8">
      {/* Run-of-Show: Day-Of Timing (Highlighted) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>{runOfShow.recommendedScheduleTitle}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Psychologically paced run of show designed to maximize donor generosity before attention fades.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Peak Ask Window: {runOfShow.peakAskWindow}</span>
          </div>
        </div>

        {/* Schedule Table / Step Cards */}
        <div className="space-y-3">
          {runOfShow.schedule.map((item, idx) => {
            const isPeak = item.activity.toUpperCase().includes('PEAK') || item.activity.toUpperCase().includes('ASK');
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-all ${
                  isPeak
                    ? 'border-emerald-400 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-400/30'
                    : 'border-slate-200 bg-slate-50/30 hover:bg-white'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-1 rounded shrink-0 ${
                        isPeak ? 'bg-emerald-600 text-white' : 'bg-slate-200/80 text-slate-700'
                      }`}
                    >
                      {item.timeOffset}
                    </span>
                    <div>
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isPeak ? 'text-emerald-950 font-extrabold' : 'text-slate-900'
                        }`}
                      >
                        {item.activity}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">
                        <strong className="text-slate-700 font-medium">Fundraising Trigger:</strong>{' '}
                        {item.fundraisingTrigger}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 max-w-xs">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Psychological Goal
                    </span>
                    <span className="text-xs text-slate-700 italic">"{item.psychologicalGoal}"</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4-Phase Campaign Milestone Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>Campaign Cadence & Financial Milestone Timeline</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Phased execution from silent major gift underwriting to post-campaign recurring donor stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeline.map((phase, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  {phase.weekTiming}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Yield Target: {phase.expectedYieldProgressPct}% of Goal
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900">{phase.phase}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{phase.primaryFocus}</p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Critical Milestones
                </div>
                <ul className="space-y-1 text-xs text-slate-700">
                  {phase.criticalMilestones.map((m, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk & Financial Pitfall Radar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <span>Profit Risk Radar & Expense Trap Mitigations</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Identifies the top financial sinkholes that degrade nonprofit profit margins and how to eliminate them.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pitfalls.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-rose-100 bg-rose-50/20 shadow-2xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{item.potentialTrap}</span>
                </div>
                <div className="text-xs font-medium text-rose-700 bg-rose-50 px-2.5 py-1 rounded border border-rose-200/60 leading-snug">
                  <strong>Financial Exposure:</strong> {item.financialExposure}
                </div>
              </div>

              <div className="pt-2 border-t border-rose-100 text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-semibold">Preventive Fix: </strong>
                {item.preventiveAction}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
