import React, { useState, useRef } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  DollarSign,
  Palette,
  ShieldCheck,
  Flame,
  PartyPopper,
  GraduationCap,
  Smile,
  Zap,
  Ticket,
  Award,
  Layers,
  Heart
} from 'lucide-react';
import { EventFlyerData, FundraisingParameters } from '../types';
import { CashStackSvg, FlyingMoneySvg, LaidBackCashChip } from './CashIllustrations';

interface EventFlyerProps {
  flyer: EventFlyerData;
  parameters: FundraisingParameters;
  onUpdateFlyer?: (updated: EventFlyerData) => void;
}

export type FlyerStyle =
  | 'straightforward'
  | 'modern-minimal'
  | 'formal-charity'
  | 'community-notice'
  | 'school-spirit'
  | 'carnival'
  | 'comic-pop'
  | 'neon-glow'
  | 'forest-green';

interface StyleConfig {
  id: FlyerStyle;
  category: 'straightforward' | 'fun';
  label: string;
  emoji: string;
  badge: string;
  wrapper: string;
  titleFont: string;
  accentBadge: string;
  bulletIcon: string;
  heroBox: string;
  ticketBox: string;
  footerBtn: string;
  taglineColor: string;
  highlightBox: string;
  stickers: string[];
}

const FLYER_STYLES: StyleConfig[] = [
  // --- STRAIGHTFORWARD & CLASSIC OPTIONS ---
  {
    id: 'straightforward',
    category: 'straightforward',
    label: 'Clean & Straightforward Bulletin',
    emoji: '📄',
    badge: 'Direct, Crisp & Easy to Print',
    wrapper: 'from-white via-slate-50 to-slate-100 border-2 border-slate-300 text-slate-900 shadow-xl',
    titleFont: 'font-sans font-black tracking-tight text-slate-950',
    accentBadge: 'bg-[#14532d] text-white border-[#14532d] font-bold',
    bulletIcon: 'text-[#166534]',
    heroBox: 'bg-[#f0f7f3] border-2 border-[#c4e0ce] text-[#0d2d1e]',
    ticketBox: 'bg-white border border-slate-300 text-slate-900 shadow-2xs',
    footerBtn: 'bg-[#14532d] hover:bg-[#166534] text-white font-bold shadow-sm',
    taglineColor: 'text-slate-600 font-medium',
    highlightBox: 'bg-white border border-slate-200 text-slate-900 shadow-2xs',
    stickers: ['📌', '📋', '✅', '🤝', '💼'],
  },
  {
    id: 'modern-minimal',
    category: 'straightforward',
    label: 'Modern Minimalist',
    emoji: '📐',
    badge: 'Contemporary, High Contrast & Clean',
    wrapper: 'from-slate-900 via-[#0e241b] to-slate-900 border-2 border-[#2b664d] text-white shadow-2xl',
    titleFont: 'font-sans font-black tracking-tighter text-white',
    accentBadge: 'bg-emerald-400 text-slate-950 border-emerald-300 font-extrabold',
    bulletIcon: 'text-emerald-400',
    heroBox: 'bg-white/10 border border-white/20 text-white',
    ticketBox: 'bg-white/5 border border-white/15 text-slate-200',
    footerBtn: 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black shadow-md',
    taglineColor: 'text-emerald-200',
    highlightBox: 'bg-white/5 border border-white/10 text-white',
    stickers: ['✨', '📊', '🌐', '💡', '🎯'],
  },
  {
    id: 'formal-charity',
    category: 'straightforward',
    label: 'Formal Gala & Civic Evening',
    emoji: '🏛️',
    badge: 'Traditional, Elegant & Black-Tie',
    wrapper: 'from-[#0b1d16] via-[#102a20] to-[#07130e] border-2 border-[#2d5a45] text-white shadow-2xl',
    titleFont: 'font-serif-title tracking-wide text-amber-200',
    accentBadge: 'bg-amber-400/20 text-amber-300 border-amber-300/40 font-semibold uppercase tracking-widest',
    bulletIcon: 'text-amber-400',
    heroBox: 'bg-[#143528]/80 border border-amber-400/30 text-amber-100',
    ticketBox: 'bg-white/5 border border-white/10 text-slate-200',
    footerBtn: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md',
    taglineColor: 'text-slate-300 italic',
    highlightBox: 'bg-white/5 border border-white/10 text-white',
    stickers: ['🥂', '🎗️', '🏛️', '🌟', '✒️'],
  },
  {
    id: 'community-notice',
    category: 'straightforward',
    label: 'Community Board Notice',
    emoji: '📍',
    badge: 'Friendly, Local & Accessible',
    wrapper: 'from-amber-50/50 via-white to-amber-50/30 border-2 border-amber-200 text-slate-900 shadow-lg',
    titleFont: 'font-sans font-extrabold text-slate-900',
    accentBadge: 'bg-[#166534] text-white border-[#166534] font-bold',
    bulletIcon: 'text-[#166534]',
    heroBox: 'bg-amber-100/70 border border-amber-300 text-amber-950',
    ticketBox: 'bg-white border border-amber-200 text-slate-900 shadow-2xs',
    footerBtn: 'bg-[#14532d] hover:bg-[#166534] text-white font-bold shadow-sm',
    taglineColor: 'text-slate-600',
    highlightBox: 'bg-white border border-slate-200 text-slate-900',
    stickers: ['📍', '📢', '🏡', '🤝', '❤️'],
  },

  // --- FUN & YOUTHFUL OPTIONS ---
  {
    id: 'school-spirit',
    category: 'fun',
    label: 'School Spirit & Pep Rally',
    emoji: '🏆',
    badge: 'Varsity, Sporty & High Energy',
    wrapper: 'from-emerald-700 via-[#14532d] to-amber-500 border-2 border-amber-400 text-white shadow-xl',
    titleFont: 'font-fun uppercase tracking-wider',
    accentBadge: 'bg-amber-400 text-slate-950 border-amber-300 font-black',
    bulletIcon: 'text-amber-300',
    heroBox: 'bg-black/30 border border-amber-400/40 text-amber-200',
    ticketBox: 'bg-black/25 border border-white/20 text-white',
    footerBtn: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-lg hover:scale-105 transition-transform',
    taglineColor: 'text-emerald-100 font-medium',
    highlightBox: 'bg-black/20 border border-white/20 text-white',
    stickers: ['📣', '⚡', '🏆', '🥇', '🥁'],
  },
  {
    id: 'carnival',
    category: 'fun',
    label: 'Carnival & Fun Fair',
    emoji: '🎪',
    badge: 'Festive, Playful & High Turnout',
    wrapper: 'from-amber-400 via-rose-500 to-purple-600 border-2 border-amber-300 text-white shadow-xl',
    titleFont: 'font-fun',
    accentBadge: 'bg-yellow-300 text-purple-950 border-yellow-200 font-extrabold shadow-sm',
    bulletIcon: 'text-yellow-300',
    heroBox: 'bg-yellow-400/25 border border-yellow-300/40 text-yellow-100',
    ticketBox: 'bg-white/20 border border-white/30 text-white',
    footerBtn: 'bg-yellow-400 hover:bg-yellow-300 text-purple-950 font-black shadow-lg hover:scale-105 transition-transform',
    taglineColor: 'text-amber-100 font-medium',
    highlightBox: 'bg-white/15 border border-white/25 text-white',
    stickers: ['🎉', '🍿', '🎟️', '✨', '🎈'],
  },
  {
    id: 'comic-pop',
    category: 'fun',
    label: 'Comic Pop & Retro Fun',
    emoji: '💥',
    badge: 'Laid-Back, Comic & Bold',
    wrapper: 'from-yellow-400 via-amber-400 to-emerald-500 border-4 border-slate-950 text-slate-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]',
    titleFont: 'font-fun uppercase tracking-tight text-slate-950',
    accentBadge: 'bg-white text-slate-950 border-2 border-slate-950 font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    bulletIcon: 'text-slate-950',
    heroBox: 'bg-white border-2 border-slate-950 text-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
    ticketBox: 'bg-emerald-100 border-2 border-slate-950 text-slate-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
    footerBtn: 'bg-rose-500 hover:bg-rose-400 text-white font-black border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-transform',
    taglineColor: 'text-slate-900 font-bold',
    highlightBox: 'bg-white border-2 border-slate-950 text-slate-950',
    stickers: ['💥', '🚀', '⭐', '🎈', '🍕'],
  },
  {
    id: 'neon-glow',
    category: 'fun',
    label: 'Neon Arcade & Youth Rally',
    emoji: '⚡',
    badge: 'Cyber, Cool & Student Council',
    wrapper: 'from-slate-950 via-purple-950 to-indigo-950 border-2 border-cyan-400/50 text-white shadow-cyan-500/20',
    titleFont: 'font-fun tracking-tight',
    accentBadge: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40 font-bold',
    bulletIcon: 'text-pink-400',
    heroBox: 'bg-cyan-950/40 border border-cyan-400/40 text-cyan-200',
    ticketBox: 'bg-purple-900/30 border border-purple-400/30 text-purple-200',
    footerBtn: 'bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-300 hover:to-pink-400 text-slate-950 font-extrabold shadow-lg',
    taglineColor: 'text-purple-200',
    highlightBox: 'bg-white/5 border border-cyan-500/30 text-white',
    stickers: ['🎮', '🚀', '⚡', '👾', '🔥'],
  },
  {
    id: 'forest-green',
    category: 'fun',
    label: 'Deep Forest Non-Profit',
    emoji: '🌲',
    badge: 'Warm, Trustworthy & Grounded',
    wrapper: 'from-[#0b291d] via-[#123829] to-[#071a12] border-2 border-[#2b664d] text-white shadow-2xl',
    titleFont: 'font-fun font-bold',
    accentBadge: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/40 font-bold',
    bulletIcon: 'text-emerald-400',
    heroBox: 'bg-[#1b4334]/80 border border-emerald-400/30 text-emerald-100',
    ticketBox: 'bg-white/10 border border-white/20 text-white',
    footerBtn: 'bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold shadow-lg',
    taglineColor: 'text-emerald-200',
    highlightBox: 'bg-white/10 border border-white/15 text-white',
    stickers: ['🌱', '🤝', '🌲', '🌟', '💚'],
  },
];

export const EventFlyer: React.FC<EventFlyerProps> = ({
  flyer: initialFlyer,
  parameters,
  onUpdateFlyer,
}) => {
  const [flyer, setFlyer] = useState<EventFlyerData>(initialFlyer);
  const [selectedStyle, setSelectedStyle] = useState<FlyerStyle>('straightforward');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'straightforward' | 'fun'>('all');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);

  const currentTheme = FLYER_STYLES.find((s) => s.id === selectedStyle) || FLYER_STYLES[0];

  const handlePrintFlyer = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
📣 ${flyer.eventTitle} 📣
${flyer.tagline}

📅 WHEN: ${flyer.dateOrSeason} · ${flyer.timeAndVibe}
📍 WHERE: ${flyer.locationOrVenue}
🎟️ ADMISSION / TICKETS: ${flyer.ticketOrAdmissionText}

HIGHLIGHTS & WHAT'S HAPPENING:
${flyer.bulletHighlights.map((b) => `• ${b}`).join('\n')}

💡 MISSION IMPACT:
${flyer.impactCallout}
${flyer.matchingGrantCallout ? `⭐ NOTE: ${flyer.matchingGrantCallout}` : ''}

👉 RSVP & DETAILS: ${flyer.rsvpCallToAction}
100% of proceeds support: ${parameters.missionStatement}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const filteredStyles = categoryFilter === 'all'
    ? FLYER_STYLES
    : FLYER_STYLES.filter((s) => s.category === categoryFilter);

  return (
    <div className="space-y-6">
      {/* Control Toolbar */}
      <div className="bg-white rounded-3xl border border-[#d0e0d5] p-5 shadow-xs space-y-4 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#eef7f2] text-[#14532d] flex items-center justify-center font-bold text-lg border border-[#c4e0ce] shadow-2xs">
              📄
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0d2d1e] flex items-center gap-2 font-fun tracking-wide">
                <span>Deliverable Event Flyer Creator</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                  Ready to Distribute
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Choose straightforward bulletins for committees & businesses, or fun themes for school assemblies!
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              {isEditing ? 'Done Editing' : '✏️ Edit Flyer Text'}
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Copied Caption!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Text Caption</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrintFlyer}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#14532d] hover:bg-[#166534] px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save Flyer PDF</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills: Straightforward vs Fun */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-600 mr-1 flex items-center gap-1">
            <Palette className="w-3.5 h-3.5 text-[#166534]" />
            <span>Theme Type:</span>
          </span>
          <button
            type="button"
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-[#14532d] text-white border-[#14532d]'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Themes ({FLYER_STYLES.length})
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('straightforward')}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              categoryFilter === 'straightforward'
                ? 'bg-[#14532d] text-white border-[#14532d]'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>📋 Straightforward & Classic</span>
          </button>
          <button
            type="button"
            onClick={() => setCategoryFilter('fun')}
            className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
              categoryFilter === 'fun'
                ? 'bg-[#14532d] text-white border-[#14532d]'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>🎪 Fun & Youthful</span>
          </button>
        </div>

        {/* Style Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
          {filteredStyles.map((style) => (
            <button
              key={style.id}
              type="button"
              onClick={() => setSelectedStyle(style.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedStyle === style.id
                  ? 'border-[#14532d] bg-[#eef7f2] shadow-xs ring-2 ring-[#14532d]/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{style.emoji}</span>
                <span className="text-xs font-bold truncate">{style.label}</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 truncate">{style.badge}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Editing Drawer / Inputs */}
      {isEditing && (
        <div className="bg-[#f6faf7] border border-[#c4e0ce] rounded-3xl p-5 shadow-xs space-y-4 no-print animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0d2d1e] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#166534]" />
              <span>Customize Event Flyer Text In Real Time</span>
            </h4>
            <span className="text-xs text-slate-500">Changes reflect immediately on the flyer below</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Flyer Title</label>
              <input
                type="text"
                value={flyer.eventTitle}
                onChange={(e) => setFlyer({ ...flyer, eventTitle: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Catchy Tagline</label>
              <input
                type="text"
                value={flyer.tagline}
                onChange={(e) => setFlyer({ ...flyer, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Date / Season</label>
              <input
                type="text"
                value={flyer.dateOrSeason}
                onChange={(e) => setFlyer({ ...flyer, dateOrSeason: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Time & Vibe</label>
              <input
                type="text"
                value={flyer.timeAndVibe}
                onChange={(e) => setFlyer({ ...flyer, timeAndVibe: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Location / Venue</label>
              <input
                type="text"
                value={flyer.locationOrVenue}
                onChange={(e) => setFlyer({ ...flyer, locationOrVenue: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Ticket / Admission Info</label>
              <input
                type="text"
                value={flyer.ticketOrAdmissionText}
                onChange={(e) => setFlyer({ ...flyer, ticketOrAdmissionText: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>
          </div>
        </div>
      )}

      {/* FLYER CANVAS (Deliverable Preview) */}
      <div className="flex justify-center">
        <div
          ref={flyerRef}
          className={`w-full max-w-2xl rounded-3xl p-8 sm:p-12 bg-gradient-to-b ${currentTheme.wrapper} relative overflow-hidden transition-all duration-300`}
        >
          {/* Decorative Corner Badges */}
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${currentTheme.accentBadge}`}>
              <span>{currentTheme.stickers[0]}</span>
              <span>{currentTheme.badge}</span>
            </div>

            <div className="flex items-center gap-1.5 text-lg">
              {currentTheme.stickers.map((s, idx) => (
                <span key={idx} className="opacity-90 hover:scale-125 transition-transform cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Flyer Header: Title & Tagline */}
          <div className="text-center space-y-3 mb-8 relative z-10">
            <h1 className={`text-3xl sm:text-5xl font-extrabold leading-tight ${currentTheme.titleFont}`}>
              {flyer.eventTitle}
            </h1>
            <p className={`text-base sm:text-lg max-w-lg mx-auto ${currentTheme.taglineColor}`}>
              {flyer.tagline}
            </p>
          </div>

          {/* Quick Date, Time, Venue Banner */}
          <div className={`rounded-2xl p-4 sm:p-5 mb-6 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left ${currentTheme.ticketBox}`}>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Calendar className={`w-5 h-5 ${currentTheme.bulletIcon} shrink-0`} />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">When</div>
                <div className="text-xs sm:text-sm font-extrabold">{flyer.dateOrSeason}</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <Clock className={`w-5 h-5 ${currentTheme.bulletIcon} shrink-0`} />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">Time</div>
                <div className="text-xs sm:text-sm font-extrabold">{flyer.timeAndVibe}</div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <MapPin className={`w-5 h-5 ${currentTheme.bulletIcon} shrink-0`} />
              <div>
                <div className="text-[10px] uppercase font-bold tracking-wider opacity-75">Where</div>
                <div className="text-xs sm:text-sm font-extrabold truncate max-w-[140px]">{flyer.locationOrVenue}</div>
              </div>
            </div>
          </div>

          {/* Hero Highlight Box */}
          <div className={`rounded-2xl p-5 mb-6 text-center relative z-10 ${currentTheme.heroBox}`}>
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Special Feature & Benefit</span>
            </div>
            <p className="text-sm sm:text-base font-bold leading-snug">
              "{flyer.heroHighlight}"
            </p>
          </div>

          {/* Bullet Highlights */}
          <div className="space-y-3 mb-8 relative z-10">
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-80 text-center sm:text-left">
              What To Expect & Event Highlights:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {flyer.bulletHighlights.map((bullet, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 p-3 rounded-xl ${currentTheme.highlightBox}`}
                >
                  <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${currentTheme.bulletIcon}`} />
                  <span className="text-xs font-semibold leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spectator Sabotage Rules Active Callout */}
          {(parameters.eventVibe?.includes('Sabotage') || parameters.eventVibe?.includes('Chaos') || !parameters.eventVibe) && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-400/20 border-2 border-dashed border-amber-400/60 text-center relative z-10 backdrop-blur-xs">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 block mb-0.5 flex items-center justify-center gap-1.5">
                <span>😈</span>
                <span>SPECTATOR SABOTAGE RULES ACTIVE</span>
                <span>⚡</span>
              </span>
              <p className="text-xs sm:text-sm font-bold">
                Spectators can pay at the scoring table to restrict players, sub the referee, buy power-ups, and mute rival fans!
              </p>
            </div>
          )}

          {/* Matching Grant or Underwriter Callout */}
          {flyer.matchingGrantCallout && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-center relative z-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300 block mb-0.5">
                ★ 100% Matching Challenge Active ★
              </span>
              <p className="text-xs sm:text-sm font-medium">
                {flyer.matchingGrantCallout}
              </p>
            </div>
          )}

          {/* Admission & Call to Action Footer */}
          <div className="pt-6 border-t border-white/20 text-center space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/20 text-xs font-bold">
              <Ticket className="w-4 h-4" />
              <span>{flyer.ticketOrAdmissionText}</span>
            </div>

            <div>
              <button
                type="button"
                className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-black transition-all cursor-pointer ${currentTheme.footerBtn}`}
              >
                {flyer.rsvpCallToAction}
              </button>
            </div>

            <p className="text-[11px] opacity-75 max-w-md mx-auto">
              100% of proceeds directly fund: <span className="font-bold underline">{parameters.missionStatement}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
