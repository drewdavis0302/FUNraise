import React from 'react';
import { X, Sparkles, ArrowRight, DollarSign, Users, Calendar, Clock, Target } from 'lucide-react';
import { PRESET_PROFILES, PresetProfile } from '../data/presets';
import { FundraisingParameters } from '../types';

interface PresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (params: FundraisingParameters) => void;
}

export const PresetsModal: React.FC<PresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 font-fun">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>Pick a Fun Campaign Template or Idea</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant plans designed for elementary schools, middle/high school teams, clubs, and youth non-profits.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of presets */}
        <div className="p-6 overflow-y-auto space-y-3.5 divide-y divide-slate-100">
          {PRESET_PROFILES.map((preset) => (
            <div
              key={preset.id}
              className="pt-3.5 first:pt-0 group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 transition-all cursor-pointer"
              onClick={() => {
                onSelectPreset(preset.params);
                onClose();
              }}
            >
              <div className="space-y-1.5 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="text-base">{preset.emoji || '✨'}</span>
                  <span className="text-xs font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {preset.category}
                  </span>
                  <span className="text-[11px] text-slate-400">·</span>
                  <span className="text-xs font-medium text-slate-500">{preset.badge}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-900 transition-colors font-fun">
                  {preset.name}
                </h4>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  "{preset.params.missionStatement}"
                </p>

                {/* Metadata strip */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-800">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    ${preset.params.desiredFunds.toLocaleString()} Goal
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {preset.params.desiredTurnout} Attendees
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {preset.params.timeOfYear.split(' ')[0]}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {preset.params.timeOfDay.split(' ')[0]}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-center justify-end gap-2">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 group-hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                >
                  <span>Load Archetype</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
