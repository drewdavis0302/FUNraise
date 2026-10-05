import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, Clock, Users, ArrowUpRight } from 'lucide-react';
import { OutreachPitch } from '../types';

interface OutreachVaultProps {
  pitches: OutreachPitch[];
}

export const OutreachVault: React.FC<OutreachVaultProps> = ({ pitches }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [editedPitches, setEditedPitches] = useState<OutreachPitch[]>(pitches);

  const currentPitch = editedPitches[activeIdx] || pitches[0];

  const handleCopy = () => {
    if (!currentPitch) return;
    const fullText = `Subject: ${currentPitch.headlineOrSubject}\n\n${currentPitch.pitchContent}\n\nCall to Action: ${currentPitch.keyCallToAction}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextChange = (newBody: string) => {
    const updated = [...editedPitches];
    if (updated[activeIdx]) {
      updated[activeIdx] = { ...updated[activeIdx], pitchContent: newBody };
      setEditedPitches(updated);
    }
  };

  if (!pitches || pitches.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-600" />
            <span>High-Conversion Outreach Copy Vault</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-scripted multi-channel communications customized to your target demographic and emotional hook.
          </p>
        </div>

        {/* Tab switcher for channels */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {editedPitches.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setActiveIdx(idx);
                setCopied(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                activeIdx === idx
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p.channel.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Active Pitch Card */}
      <div className="space-y-4">
        {/* Metadata ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Channel & Target</span>
            <span className="font-semibold text-slate-800">{currentPitch.targetSegment}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Optimal Dispatch Timing</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-600" />
              {currentPitch.bestSendTiming}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Primary Call-to-Action</span>
            <span className="font-semibold text-slate-800">{currentPitch.keyCallToAction}</span>
          </div>
        </div>

        {/* Subject Line / Headline */}
        <div className="p-3.5 bg-white border border-slate-200 rounded-xl space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Subject Line / Headline
          </div>
          <div className="text-xs sm:text-sm font-semibold text-slate-900 font-mono-code select-all">
            {currentPitch.headlineOrSubject}
          </div>
        </div>

        {/* Body Text Box (Editable) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Message Body (Click to edit or personalize)
            </label>
            <span className="text-[11px] text-slate-400">Directly customizable</span>
          </div>
          <textarea
            rows={7}
            value={currentPitch.pitchContent}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-4 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-sans leading-relaxed transition-all"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tone matched for high donor trust and zero aggressive pressure.</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copy Pitch Script</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
