import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Users,
  Trophy,
  Flame,
  Sparkles,
  Copy,
  Check,
  Building,
  Gamepad2,
  Calendar,
  Share2
} from 'lucide-react';
import { FundraisingParameters } from '../types';

interface EventDetailedWalkthroughProps {
  description?: string;
  strategyName: string;
  formatName: string;
  parameters: FundraisingParameters;
  abstractConceptHook?: string;
}

interface ParsedSection {
  title: string;
  content: string;
  icon: React.ReactNode;
  badge: string;
  bgGradient: string;
  borderColor: string;
}

export const EventDetailedWalkthrough: React.FC<EventDetailedWalkthroughProps> = ({
  description,
  strategyName,
  formatName,
  parameters,
  abstractConceptHook,
}) => {
  const [copied, setCopied] = useState(false);

  // Parse the detailed description into structured sections if formatted with bullets
  const parseDescription = (rawText?: string): ParsedSection[] => {
    if (!rawText) return [];

    // Check if formatted with bullet points like "• What the Event Looks Like:" or "• How the Event Runs:"
    const bulletRegex = /•\s*([^:\n]+):\s*([^\n•]+(?:\n(?!\s*•)[^\n•]+)*)/g;
    const sections: ParsedSection[] = [];
    let match;

    const sectionIcons: Record<string, { icon: React.ReactNode; badge: string; bg: string; border: string }> = {
      venue: {
        icon: <Building className="w-4 h-4 text-emerald-700" />,
        badge: 'Venue & Environment',
        bg: 'bg-emerald-50/70',
        border: 'border-emerald-200',
      },
      runs: {
        icon: <Gamepad2 className="w-4 h-4 text-blue-700" />,
        badge: 'Core Action & Rules',
        bg: 'bg-blue-50/70',
        border: 'border-blue-200',
      },
      crowd: {
        icon: <Flame className="w-4 h-4 text-amber-700" />,
        badge: 'Spectator Participation ($0 Overhead)',
        bg: 'bg-amber-50/70',
        border: 'border-amber-200',
      },
      halftime: {
        icon: <Sparkles className="w-4 h-4 text-purple-700" />,
        badge: 'Peak Ask & Match Blitz',
        bg: 'bg-purple-50/70',
        border: 'border-purple-200',
      },
      finale: {
        icon: <Trophy className="w-4 h-4 text-rose-700" />,
        badge: 'Championship Finale',
        bg: 'bg-rose-50/70',
        border: 'border-rose-200',
      },
    };

    while ((match = bulletRegex.exec(rawText)) !== null) {
      const header = match[1].trim();
      const body = match[2].trim();
      const lower = header.toLowerCase();

      let styleKey = 'venue';
      if (lower.includes('run') || lower.includes('tournament') || lower.includes('action') || lower.includes('showcase')) {
        styleKey = 'runs';
      } else if (lower.includes('crowd') || lower.includes('spectator') || lower.includes('sabotage') || lower.includes('revenue')) {
        styleKey = 'crowd';
      } else if (lower.includes('halftime') || lower.includes('peak') || lower.includes('match') || lower.includes('ask')) {
        styleKey = 'halftime';
      } else if (lower.includes('final') || lower.includes('trophy') || lower.includes('award') || lower.includes('ceremony')) {
        styleKey = 'finale';
      }

      const style = sectionIcons[styleKey] || sectionIcons.venue;

      sections.push({
        title: header,
        content: body,
        icon: style.icon,
        badge: style.badge,
        bgGradient: style.bg,
        borderColor: style.border,
      });
    }

    return sections;
  };

  const parsedSections = parseDescription(description);

  const handleCopy = () => {
    const textToCopy = `📋 EVENT EXPERIENCE BREAKDOWN: ${strategyName}\nFormat: ${formatName}\nExpected Attendance: ${parameters.desiredTurnout} attendees\nTiming: ${parameters.timeOfYear}, ${parameters.timeOfDay}\n\n${description || abstractConceptHook || ''}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-600/30 p-6 sm:p-7 shadow-xs space-y-6 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-100/40 via-teal-100/20 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-100 pb-5 relative z-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-black text-xs uppercase tracking-wider border border-emerald-300 shadow-2xs">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Full Event Experience Blueprint</span>
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              <Calendar className="w-3 h-3 text-slate-600" />
              {parameters.timeOfYear.split(' ')[0]} · {parameters.timeOfDay.split(' ')[0]}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-fun flex items-center gap-2">
            <span>What Exactly Is This Event?</span>
            <span className="text-lg">🎯🎪</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Here is a complete, real-world walkthrough of the physical space, tournament or showcase flow, and how the crowd actively turns excitement into take-home profit.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#eef7f2] hover:bg-[#deede3] text-[#14532d] text-xs font-bold transition-all cursor-pointer border border-[#c4e0ce]"
            title="Copy this full walkthrough text to share with club officers, your principal, or faculty advisors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied Walkthrough!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span>Copy Event Pitch</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Event Fast Facts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-[#f8faf8] border border-[#d2e2d8] rounded-2xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Building className="w-3 h-3 text-emerald-700" />
            <span>Venue Setting</span>
          </div>
          <div className="text-xs font-extrabold text-slate-900 mt-1 truncate">
            {parameters.knownVenueCost === 0 ? 'Free Venue ($0 Rental)' : parameters.maxVenueCapacity || 'Campus / Local Space'}
          </div>
        </div>

        <div className="p-3 bg-[#f8faf8] border border-[#d2e2d8] rounded-2xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Users className="w-3 h-3 text-blue-700" />
            <span>Target Turnout</span>
          </div>
          <div className="text-xs font-extrabold text-slate-900 mt-1">
            {parameters.desiredTurnout} Guests & Participants
          </div>
        </div>

        <div className="p-3 bg-[#f8faf8] border border-[#d2e2d8] rounded-2xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>Pacing & Hours</span>
          </div>
          <div className="text-xs font-extrabold text-slate-900 mt-1 truncate">
            {parameters.timeOfDay.split('(')[0] || '2 to 3 Hours'}
          </div>
        </div>

        <div className="p-3 bg-[#f8faf8] border border-[#d2e2d8] rounded-2xl">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Flame className="w-3 h-3 text-rose-700" />
            <span>Admission Model</span>
          </div>
          <div className="text-xs font-extrabold text-slate-900 mt-1">
            {parameters.knownTicketPrice === 0
              ? '✨ Free ($0 Admission)'
              : `$${parameters.knownTicketPrice || 10} / Ticket`}
          </div>
        </div>
      </div>

      {/* Structured Sections (Either parsed from bullets or fallback format) */}
      {parsedSections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parsedSections.map((sec, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl border ${sec.borderColor} ${sec.bgGradient} space-y-2 flex flex-col justify-between ${
                idx === parsedSections.length - 1 && parsedSections.length % 2 !== 0 ? 'md:col-span-2' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                    {sec.icon}
                    <span>{sec.title}</span>
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 text-slate-700 shadow-2xs">
                    {sec.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {sec.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Fallback if raw text wasn't bulleted */
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Event Concept & Format Walkthrough</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {description ||
              `Held in a high-energy campus or community space with live music and an active spectator crowd. Participants face off in spirited rounds while spectators in the audience can buy playful rule-bends and power-ups to influence the outcome on the fly, culminating in a 1:1 match blitz and celebration!`}
          </p>
        </div>
      )}

      {/* Abstract Gamified Hook Callout Footer */}
      {abstractConceptHook && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900">
              The Unconventional Twist
            </span>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              "{abstractConceptHook}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
