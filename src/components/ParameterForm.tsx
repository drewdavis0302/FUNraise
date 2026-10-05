import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  Target,
  Sparkles,
  Building,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  Info,
  Wand2,
  Sliders,
  ShieldCheck,
  Check,
  Plus,
  Hourglass,
  Tag,
  Flame
} from 'lucide-react';
import { FundraisingParameters } from '../types';
import { CashStackSvg, FlyingMoneySvg, MoneyJarSvg, LaidBackCashChip } from './CashIllustrations';

interface ParameterFormProps {
  parameters: FundraisingParameters;
  onChange: (params: FundraisingParameters) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const AGE_RANGES = [
  'Not sure yet (Auto-optimize across generations)',
  'Elementary School (Ages 5-10 / Kids, Teachers & PTA Families)',
  'Middle School (Ages 11-13 / Youth Clubs & Families)',
  'High School (Ages 14-18 / Teens, Student Council, Sports & Arts)',
  'College & Young Adults (Ages 18-24 / Campus & Rising Grads)',
  'Young Adults & Millennials (Ages 25-40 / Working Professionals)',
  'Adults & Families (Ages 41-60 / Peak Earning Donors)',
  'Seniors & Legacy Supporters (Ages 60+ / Endowments & Trustees)',
  'All Ages / Entire School & Community Together',
];

interface SeasonOption {
  label: string;
  sub: string;
  category: 'all' | 'spring' | 'fall' | 'summer' | 'holidays';
}

const TIMES_OF_YEAR: SeasonOption[] = [
  {
    label: 'Early Spring / Semester Launch & Rush (January – Mid-February)',
    sub: 'College spring semester start, syllabus week, quad club fairs, fresh student energy & new budget cycles',
    category: 'spring',
  },
  {
    label: 'Mid-Spring / Pre-Break & Showcase Season (Late February – March)',
    sub: 'Midterms wind-down, spring break energy, campus showcases & warm weather reopening',
    category: 'spring',
  },
  {
    label: 'Late Spring / Spring Festivals & Earth Day (April)',
    sub: 'Peak outdoor campus fairs, athletic tournaments, corporate Q2 sponsorship cycles',
    category: 'spring',
  },
  {
    label: 'End-of-School / Finals Relief, Banquets & Graduation (Late April – May)',
    sub: 'Senior send-offs, end-of-year awards galas, alumni reunion weekends & graduation milestone gifts',
    category: 'spring',
  },
  {
    label: 'Summer Session & Warm-Weather Community Drives (June – July / Early August)',
    sub: 'Summer classes, athletic camps, outdoor park rallies, car washes & casual community drives',
    category: 'summer',
  },
  {
    label: 'Early Fall / Semester Kickoff & Welcome Week (Late August – September)',
    sub: 'Move-in week, quad involvement fairs, syllabus week excitement & incoming freshman engagement',
    category: 'fall',
  },
  {
    label: 'Mid-Fall / Homecoming, Spirit Week & Halloween (October)',
    sub: 'Homecoming tailgates, parent weekends, costume parties, fall sports rallies & booster drives',
    category: 'fall',
  },
  {
    label: 'Late Fall / Friendsgiving & Pre-Finals Giving (November)',
    sub: 'Friendsgiving campus meals, donor gratitude drives, pre-holiday fellowship before finals crunch',
    category: 'fall',
  },
  {
    label: 'Giving Season / Giving Tuesday & Year-End Holidays (Late November – December)',
    sub: 'Highest charitable giving velocity, 501(c)(3) tax deductions, corporate matching & holiday appeals',
    category: 'holidays',
  },
  {
    label: 'Winter Break & New Year Re-Engagement (Late December – Early January)',
    sub: 'Virtual alumni appeals, holiday giving follow-ups, and pre-semester student leadership prep',
    category: 'holidays',
  },
  {
    label: 'All-Year / Evergreen Flexible Timing',
    sub: 'Ongoing milestone campaign, rolling club dues, or flexible multi-month challenge',
    category: 'all',
  },
  {
    label: 'Not sure yet (Auto-optimize for highest profit window)',
    sub: 'AI will analyze your mission and audience to recommend the most lucrative calendar month',
    category: 'all',
  },
];

const OUTREACH_MEANS = [
  'Professor Promotions & In-Class Announcements (Start of Lecture 2-min pitch / slide deck plug)',
  'Faculty & Department Endorsement (Canvas/Blackboard announcements, email blast to majors)',
  'Campus Group Chats (GroupMe, Discord, WhatsApp & Club Slack channels)',
  'Campus Quads, Chalking & Student Union Flyering',
  'Greek Life & Student Org Coalitions (Co-hosting, chapter meetings & cross-promotions)',
  'Campus Dining Halls & Library Plaza Tabling',
  'Instagram, TikTok & Campus Student Influencers',
  'School Morning PA Announcements & All-Hands Assemblies',
  'School Backpack Flyers & Take-Home Parent Folders',
  'Classroom & Parent Chats (WhatsApp / Remind / ParentSquare)',
  'Email Newsletters & Campus/Alumni Listservs',
  'Local College Town Restaurant Percentage Nights & Pizza Sponsors',
  'Peer-to-Peer Student & Team Contests',
];

const DEMOGRAPHIC_OPTIONS = [
  'Not sure / Open to best suggestion',
  'Student Body, Classmates & Campus Youth Clubs',
  'Elementary / Middle / High School Families & PTA',
  'School Alumni, Sports Boosters & Band Fans',
  'Neighborhood Small Businesses & Family Sponsors',
  'Working Professionals & Civic Leaders',
  'Grandparents, Seniors & Community Patrons',
  'Grassroots Online Community & Youth Advocates',
];

const TIMES_OF_DAY = [
  {
    title: '5:00 PM – 8:00 PM (Post-Class Evening Prime Window)',
    detail: 'Optimal college & student window: classes are out, students are free on campus, peak turnout before evening study',
  },
  {
    title: '6:00 PM – 8:00 PM (2-Hour Evening Mixer & Social)',
    detail: 'Concise 2-hour sweet spot: high student & young professional turnout, low catering cost, focused appeal',
  },
  {
    title: '4:30 PM – 7:30 PM (Late Afternoon / Campus Transition)',
    detail: 'Catches students right as afternoon lectures dismiss, heavy foot traffic across central quad',
  },
  {
    title: '7:00 PM – 10:00 PM (Night Rally, Showcase & Greek Life Social)',
    detail: 'Higher evening energy, student showcases, musical performances, trivia, or mixer format',
  },
  {
    title: '11:30 AM – 1:30 PM (Midday Campus Lunch Rush & Commons)',
    detail: 'Between class passing periods; high foot traffic through student union, minimal food overhead',
  },
  {
    title: '1:00 PM – 5:00 PM (Weekend Afternoon Festival or Tournament)',
    detail: 'Saturday/Sunday outdoor tournaments, club competitions, alumni family fairs, relaxed atmosphere',
  },
  {
    title: '8:00 AM – 11:00 AM (Morning Breakfast or 5K Fun Run)',
    detail: 'Pancake breakfasts, pre-game tailgates, coffee socials, or athletic run pledges',
  },
  {
    title: 'Digital / 24-Hour Giving Sprint (Anytime Asynchronous)',
    detail: '$0 physical venue overhead; continuous mobile pledges and matched countdown milestones',
  },
  {
    title: 'Not sure yet (Auto-optimize for highest attendance & profits)',
    detail: 'AI balances student class schedules with lowest venue overhead and peak donor attention',
  },
];

const DURATION_OPTIONS = [
  {
    title: '2 Hours (Standard Evening Event / High Attendance)',
    detail: 'Optimal length for college clubs & evening fundraisers: compact, high-attendance, zero audience fatigue',
  },
  {
    title: '3 Hours (Showcase, Dinner & Live Appeal)',
    detail: 'Full program: check-in, performance / keynote, peak matching ask, and celebration',
  },
  {
    title: '1.5 Hours (Focused Meeting & Pitch)',
    detail: 'Short, high-impact presentation + 15-minute live matching window with light snacks',
  },
  {
    title: '1 Hour (Lightning Flash Blitz)',
    detail: 'Fast-paced classroom or student union rally with $0 venue rental or food overhead',
  },
  {
    title: '4 Hours (Half-Day Tournament or Fair)',
    detail: 'Campus quad festival, sports tournament, hackathon showcase, or community carnival',
  },
  {
    title: 'All-Day (6–8 Hours Campus Festival)',
    detail: 'Multi-stage daytime event with rotational activities, food trucks, and continuous giving scoreboard',
  },
  {
    title: 'Multi-Day / Weekend Sprint (48 Hours)',
    detail: 'Alumni homecoming weekend, multi-day dance marathon, or 48-hour challenge match sprint',
  },
];

const QUICK_GOALS = [5000, 15000, 35000, 75000, 150000];

export const ParameterForm: React.FC<ParameterFormProps> = ({
  parameters,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const [showFinancialDetails, setShowFinancialDetails] = useState(
    Boolean(
      parameters.knownVenueCost !== undefined ||
      parameters.knownTicketPrice !== undefined ||
      parameters.knownFoodCost !== undefined ||
      parameters.knownSponsorships !== undefined ||
      parameters.knownOtherExpenses !== undefined ||
      parameters.knownDirectDonations !== undefined
    )
  );
  const [showAdvancedRules, setShowAdvancedRules] = useState(false);
  const [seasonCategoryFilter, setSeasonCategoryFilter] = useState<'all' | 'spring' | 'fall' | 'summer' | 'holidays'>('all');
  const [timeMode, setTimeMode] = useState<'clock' | 'duration'>('clock');
  const [customOutreachInput, setCustomOutreachInput] = useState('');

  const handleOutreachToggle = (channel: string) => {
    const exists = parameters.meansOfOutreach.includes(channel);
    const updated = exists
      ? parameters.meansOfOutreach.filter((c) => c !== channel)
      : [...parameters.meansOfOutreach, channel];
    onChange({ ...parameters, meansOfOutreach: updated });
  };

  const handleAddCustomOutreach = () => {
    const trimmed = customOutreachInput.trim();
    if (!trimmed) return;
    if (!parameters.meansOfOutreach.includes(trimmed)) {
      onChange({
        ...parameters,
        meansOfOutreach: [...parameters.meansOfOutreach, trimmed],
      });
    }
    setCustomOutreachInput('');
  };

  const isVirtual =
    parameters.maxVenueCapacity.toLowerCase().includes('digital') ||
    parameters.maxVenueCapacity.toLowerCase().includes('virtual') ||
    parameters.maxVenueCapacity === '0';

  // Smart Fill: Instantly fills sensible fundraising defaults for college clubs and teams
  const handleAutoFillSensibleDefaults = () => {
    onChange({
      organizationName: 'Collegiate Society of Women Engineers & Robotics',
      organizationIdentity:
        'We are a campus engineering and robotics organization that builds autonomous submersibles, hosts coding bootcamps, and mentors high school girls in STEM.',
      missionStatement:
        'Funding travel expenses, tournament entry fees, student equipment, and leadership workshops for 45 active club members.',
      ageRange: 'College & Young Adults (Ages 18-24 / Campus & Rising Grads)',
      timeOfYear: 'Early Spring / Semester Launch & Rush (January – Mid-February)',
      meansOfOutreach: [
        'Professor Promotions & In-Class Announcements (Start of Lecture 2-min pitch / slide deck plug)',
        'Campus Group Chats (GroupMe, Discord, WhatsApp & Club Slack channels)',
        'Campus Quads, Chalking & Student Union Flyering',
        'Local College Town Restaurant Percentage Nights & Pizza Sponsors',
      ],
      strongestDemographic: 'Student Body, Classmates & Campus Youth Clubs',
      targetAudience: 'Fellow Students, Campus Faculty, Alumni & Local College Town Businesses',
      maxVenueCapacity: '200 seats (Campus Student Center / Free University Hall)',
      desiredTurnout: 160,
      desiredFunds: 12000,
      timeOfDay: '5:00 PM – 8:00 PM (Post-Class Evening Prime Window)',
      knownVenueCost: 0, // University classroom or student center booked for $0!
      knownTicketPrice: 10,
      knownFoodCost: 350,
      knownSponsorships: 2500,
      knownOtherExpenses: 150,
      notesOrConstraints: 'Keep venue cost $0 with campus room reservation. 60-second in-class pitches in large lecture halls during syllabus week.',
    });
  };

  // Filtered seasons based on filter pill
  const filteredSeasons = TIMES_OF_YEAR.filter((toy) => {
    if (seasonCategoryFilter === 'all') return true;
    return toy.category === seasonCategoryFilter || toy.category === 'all';
  });

  return (
    <div className="bg-white rounded-3xl border border-[#d2e2d8] shadow-sm p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Decorative Money Accents (Laid-back & Money Focused) */}
      <div className="absolute top-3 right-4 opacity-15 pointer-events-none hidden sm:block">
        <CashStackSvg className="w-24 h-24" />
      </div>
      <div className="absolute bottom-6 left-4 opacity-10 pointer-events-none hidden md:block">
        <FlyingMoneySvg className="w-20 h-20" />
      </div>

      {/* Header & Friendly Guidance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e5efe9]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef7f2] text-[#14532d] text-xs font-bold border border-[#c4e0ce]">
              <DollarSign className="w-3.5 h-3.5 text-[#166534]" />
              Step 1: Tell Us What You're Planning
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">• Friendly & Laid-Back Setup</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d2d1e] tracking-tight font-fun">
            Your Campaign Details & Budget
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Fill in what you know! If you're booking a venue or know your costs, pop them in for a 100% realistic net profit. If not, don't worry—we'll calculate safe estimates for you.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoFillSensibleDefaults}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#eef7f2] hover:bg-[#dff0e6] text-[#14532d] text-xs font-bold border border-[#b9dec6] transition-all cursor-pointer shadow-2xs self-start md:self-center shrink-0"
          title="Auto-fill with typical college / school club parameters"
        >
          <Wand2 className="w-3.5 h-3.5 text-[#166534]" />
          <span>Quick Smart-Fill (Campus & Club)</span>
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-8"
      >
        {/* Core Question 1: Organization Identity & Specific Fundraising Goal */}
        <div className="rounded-2xl border-2 border-[#166534]/25 bg-[#f6faf7] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-[#d2e5d9] pb-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#0f3d28] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center font-bold">1</span>
              <span>Your Organization Identity & Fundraising Goal</span>
            </label>
            <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Tying events to your club's identity raises 2x more
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1A: Optional Name */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-bold text-[#14532d] flex items-center justify-between">
                <span>Club / Organization Name (Optional)</span>
                <span className="text-[10px] text-slate-500 font-normal">Appears on flyers & banners</span>
              </label>
              <input
                type="text"
                value={parameters.organizationName || ''}
                onChange={(e) => onChange({ ...parameters, organizationName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#c4ded0] rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                placeholder="e.g. UNC Robotics Club, Westside High Marching Band, Pre-Dental Society..."
              />
            </div>

            {/* 1B: What your club / organization does (Identity & Craft) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#14532d] flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-[#166534]" />
                  <span>What does your organization / club do?</span>
                </label>
                <span className="text-[10px] text-slate-500 font-normal">Identity & Craft</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Describe your group's passions or day-to-day focus so the AI can craft unique event activities and hooks around your talent!
              </p>
              <textarea
                rows={3}
                value={parameters.organizationIdentity || ''}
                onChange={(e) => onChange({ ...parameters, organizationIdentity: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#c4ded0] rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                placeholder="e.g. We design and pilot autonomous robots for collegiate tournaments and host STEM coding workshops; or We are a student cultural dance troupe performing folklórico..."
              />

              {/* Quick inspiration chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] text-slate-500 font-semibold">Examples:</span>
                {[
                  { tag: '🤖 Robotics & STEM', text: 'We design and build autonomous competitive robots and teach STEM workshops to local kids.' },
                  { tag: '💃 Dance & Performing Arts', text: 'We are a student-run dance and performance troupe that choreographs and stages community showcases.' },
                  { tag: '🎺 Band & Music Ensemble', text: 'We are a student marching band and music ensemble performing at games and civic parades.' },
                  { tag: '🩺 Pre-Health / Medical', text: 'We are a campus pre-health association providing free community health screenings and CPR education.' },
                  { tag: '⚽ Club Sports & Athletics', text: 'We are a collegiate club athletic team competing in regional tournaments and hosting campus clinics.' },
                  { tag: '🐾 Animal Rescue', text: 'We are a volunteer animal foster network providing veterinary care and adoption events for rescue pets.' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => onChange({ ...parameters, organizationIdentity: item.text })}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      parameters.organizationIdentity === item.text
                        ? 'bg-[#14532d] text-white border-[#14532d]'
                        : 'bg-white text-slate-700 border-[#d2e5d9] hover:bg-[#eef7f2]'
                    }`}
                  >
                    {item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 1C: Specific Fundraising Goal / Need */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#14532d] flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-[#166534]" />
                  <span>What are you raising money for right now?</span>
                </label>
                <span className="text-[10px] text-slate-500 font-normal">Specific Goal / Need</span>
              </div>
              <p className="text-[11px] text-slate-600">
                What is the specific milestone, equipment, or trip your team needs to fund with this event?
              </p>
              <textarea
                rows={3}
                value={parameters.missionStatement}
                onChange={(e) => onChange({ ...parameters, missionStatement: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#c4ded0] rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                placeholder="e.g. To cover travel, hotel, and registration fees for 25 members to attend the national competition in Orlando..."
              />

              {/* Quick goal tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] text-slate-500 font-semibold">Common needs:</span>
                {[
                  { tag: '🏆 Competition Travel & Entry', text: 'To fund travel, lodging, and registration fees for our student team to compete at the national tournament.' },
                  { tag: '🛠️ Equipment & Gear', text: 'Purchasing new competition equipment, tools, raw materials, and team uniforms.' },
                  { tag: '🎓 Member Scholarships & Dues', text: 'Providing need-based dues waivers and scholarships so every student can participate debt-free.' },
                  { tag: '📦 Community Service Project', text: 'Assembling and distributing 500 care packages and school supplies for local families.' },
                ].map((item) => (
                  <button
                    key={item.tag}
                    type="button"
                    onClick={() => onChange({ ...parameters, missionStatement: item.text })}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      parameters.missionStatement === item.text
                        ? 'bg-[#14532d] text-white border-[#14532d]'
                        : 'bg-white text-slate-700 border-[#d2e5d9] hover:bg-[#eef7f2]'
                    }`}
                  >
                    {item.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 1D: Event Creativity Style & Spectator Sabotage Level */}
            <div className="space-y-2 md:col-span-2 pt-3 border-t border-[#d2e5d9]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-bold text-[#14532d] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-600" />
                  <span>Event Creativity Style & Spectator Sabotage (Make It Fun & Unconventional!)</span>
                </label>
                <span className="text-[10px] text-amber-900 font-extrabold bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300 self-start sm:self-center">
                  ⚡ Anti-Boring Event Guarantee
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Choose the overall energy style for your event. These guide the general vibe—they are <strong className="text-slate-800">NOT rigid rules</strong>! Any activities or rules suggested are simply <strong className="text-slate-800">examples and inspiration</strong> that you can customize or adapt for your club.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                {[
                  {
                    id: 'chaos-sabotage',
                    label: '🔥 Audience-Interactive & Crowd Influence',
                    sub: 'Spectators actively influence the action live rather than passively watching. (Example: In a tournament or game, spectators might pay micro-fees to bend a rule, trigger a funny player handicap, or sub the ref).',
                    badge: 'Vibe: Interactive & Participatory',
                  },
                  {
                    id: 'abstract-pop-up',
                    label: '💡 Abstract & Thematic Experience',
                    sub: 'An unconventional concept centered around your group’s craft with a playful twist. (Example: A mystery challenge gauntlet, sensory demo, or creative role-reversal tied to your club).',
                    badge: 'Vibe: Creative & Abstract',
                  },
                  {
                    id: 'high-energy-tournament',
                    label: '⚡ High-Energy Tournament & Friendly Showdown',
                    sub: 'A dynamic, head-to-head competition with high team spirit. (Example: Fast bracket heats, skills showcases, or friendly challenges with audience cheering and voting).',
                    badge: 'Vibe: Spirited & Dynamic',
                  },
                  {
                    id: 'classic-showcase',
                    label: '📋 Community Showcase & Celebration',
                    sub: 'A welcoming gathering highlighting your team’s talents and mission. (Example: Live exhibitions, open participatory stations, and celebratory milestone moments).',
                    badge: 'Vibe: Welcoming & Showcase',
                  },
                ].map((style) => {
                  const currentVibe = parameters.eventVibe || '🔥 Audience-Interactive & Crowd Influence';
                  const isSelected = currentVibe.includes(style.id.split('-')[0]) || currentVibe === style.label;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => onChange({ ...parameters, eventVibe: style.label })}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#166534] bg-[#eef7f2] text-slate-900 shadow-2xs ring-2 ring-[#166534]/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold leading-tight">{style.label}</div>
                        <div className="text-[10px] text-slate-500 mt-1 leading-snug">{style.sub}</div>
                      </div>
                      <span className="mt-2 inline-block text-[9px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded self-start">
                        {style.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[10px] text-slate-500 italic pt-0.5">
                * Note: These options set the overall vibe and energy level. The AI will invent an original event tailored to your exact club, and any specific activities are just flexible examples you can easily adapt.
              </p>
            </div>
          </div>
        </div>

        {/* Core Question 2: The Money Target & Turnout */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0f3d28] flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center font-bold">2</span>
            <span>How much money do you want to raise & how many people?</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Desired Funds */}
            <div className="p-4 rounded-2xl bg-[#f6faf7] border border-[#d2e5d9] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14532d] flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-[#166534]" />
                  <span>Target Amount Needed ($)</span>
                </span>
                <span className="text-xs font-extrabold text-[#14532d] font-mono-code bg-white px-2 py-0.5 rounded-lg border border-[#c4e0ce]">
                  ${Number(parameters.desiredFunds || 0).toLocaleString()}
                </span>
              </div>

              <input
                type="number"
                min="500"
                step="500"
                value={parameters.desiredFunds || ''}
                onChange={(e) => onChange({ ...parameters, desiredFunds: Math.max(0, Number(e.target.value)) })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#c4ded0] rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                placeholder="e.g. 15000"
              />

              {/* Quick Select Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-500 font-semibold mr-1">Popular:</span>
                {QUICK_GOALS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => onChange({ ...parameters, desiredFunds: amt })}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                      parameters.desiredFunds === amt
                        ? 'bg-[#14532d] text-white border-[#14532d]'
                        : 'bg-white text-slate-700 border-[#d2e5d9] hover:bg-[#eef7f2]'
                    }`}
                  >
                    ${(amt / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
            </div>

            {/* Turnout & Capacity */}
            <div className="p-4 rounded-2xl bg-[#f6faf7] border border-[#d2e5d9] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14532d] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#166534]" />
                  <span>Expected Turnout (People)</span>
                </span>
                <span className="text-xs font-extrabold text-[#14532d] font-mono-code bg-white px-2 py-0.5 rounded-lg border border-[#c4e0ce]">
                  {parameters.desiredTurnout} guests
                </span>
              </div>

              <input
                type="number"
                min="10"
                step="5"
                value={parameters.desiredTurnout || ''}
                onChange={(e) => onChange({ ...parameters, desiredTurnout: Math.max(0, Number(e.target.value)) })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#c4ded0] rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                placeholder="e.g. 150"
              />

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-600 block">
                  Venue Type or Capacity
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={parameters.maxVenueCapacity}
                    onChange={(e) => onChange({ ...parameters, maxVenueCapacity: e.target.value })}
                    className="flex-1 px-3 py-1.5 bg-white border border-[#c4ded0] rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    placeholder="e.g. Campus auditorium (200 cap), Student Union, or Park"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        ...parameters,
                        maxVenueCapacity: isVirtual ? '200 seats' : 'Digital / Virtual (Unlimited)',
                      })
                    }
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer shrink-0 ${
                      isVirtual
                        ? 'bg-[#14532d] text-white border-[#14532d]'
                        : 'bg-white text-slate-700 border-[#c4ded0] hover:bg-[#eef7f2]'
                    }`}
                  >
                    {isVirtual ? '✓ Digital Event' : 'Make Digital'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SELF-INPUT FINANCIAL FIELDS (Realistic Net Profit Guarantee) */}
        <div className="rounded-2xl border-2 border-[#166534]/30 bg-[#f4f8f5] p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-[#14532d] text-white">
                <Sliders className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#0d2d1e] flex items-center gap-2">
                  <span>Realistic Financial Details (Costs & Revenues)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] font-extrabold uppercase">
                    Self-Input
                  </span>
                </h3>
                <p className="text-[11px] text-slate-600">
                  Got an exact venue cost, planned ticket price, or locked sponsor? Enter them here for an exact net profit.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFinancialDetails(!showFinancialDetails)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#14532d] hover:text-[#0d2d1e] bg-white px-3 py-1.5 rounded-xl border border-[#c4e0ce] shadow-2xs transition-colors cursor-pointer self-start sm:self-center"
            >
              <span>{showFinancialDetails ? 'Hide Self-Inputs' : 'Customize Budget Inputs'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showFinancialDetails ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {showFinancialDetails && (
            <div className="pt-3 border-t border-[#d2e5d9] space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Venue Cost */}
                <div className="bg-white p-3.5 rounded-xl border border-[#c8e0d1] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#14532d]">
                      Known Venue Cost ($)
                    </label>
                    <button
                      type="button"
                      onClick={() => onChange({ ...parameters, knownVenueCost: 0 })}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        parameters.knownVenueCost === 0
                          ? 'bg-[#14532d] text-white border-[#14532d]'
                          : 'bg-[#eef7f2] text-[#14532d] border-[#b8dc mode border-[#b9dec6]'
                      }`}
                    >
                      $0 Free (Campus/Park)
                    </button>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={parameters.knownVenueCost !== undefined ? parameters.knownVenueCost : ''}
                    onChange={(e) =>
                      onChange({
                        ...parameters,
                        knownVenueCost: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    placeholder="Enter $0 if free/school/park, or rental price"
                  />
                  <p className="text-[10px] text-slate-500">
                    If hosted at your school, campus center, or church for free, leave as $0.
                  </p>
                </div>

                {/* 2. Ticket Price */}
                <div className="bg-white p-3.5 rounded-xl border border-[#c8e0d1] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#14532d]">
                      Ticket Price Per Attendee ($)
                    </label>
                    <button
                      type="button"
                      onClick={() => onChange({ ...parameters, knownTicketPrice: 0 })}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        parameters.knownTicketPrice === 0
                          ? 'bg-[#14532d] text-white border-[#14532d]'
                          : 'bg-[#eef7f2] text-[#14532d] border-[#b9dec6]'
                      }`}
                    >
                      $0 Free Entry
                    </button>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={parameters.knownTicketPrice !== undefined ? parameters.knownTicketPrice : ''}
                    onChange={(e) =>
                      onChange({
                        ...parameters,
                        knownTicketPrice: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    placeholder="e.g. 10 (or 0 for free admission)"
                  />
                  {parameters.knownTicketPrice === 0 ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between font-bold text-xs">
                        <span className="flex items-center gap-1.5 text-emerald-950">
                          <span>✨</span>
                          <span>Free Admission Model ($0 Entry)</span>
                        </span>
                        <span className="text-emerald-900 bg-emerald-200/90 px-2 py-0.5 rounded-full font-mono-code text-[11px] font-extrabold border border-emerald-300">
                          ~${Math.round((parameters.desiredTurnout || 100) * 22).toLocaleString()} Est. Crowd Rev
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-800 leading-snug">
                        Zero entrance fee removes all friction and packs the house ({parameters.desiredTurnout || 100} guests). Revenue is estimated from live crowd engagement (spectator sabotages, player handicaps, 50/50 raffles, live challenge match pledges & concessions) averaging ~$22/attendee!
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-500">
                      Expected ticket revenue: ${((parameters.knownTicketPrice || 0) * (parameters.desiredTurnout || 0)).toLocaleString()}
                    </p>
                  )}
                </div>

                {/* 3. Food & Catering Expense */}
                <div className="bg-white p-3.5 rounded-xl border border-[#c8e0d1] space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#14532d]">
                      Food & Snacks Budget ($)
                    </label>
                    <button
                      type="button"
                      onClick={() => onChange({ ...parameters, knownFoodCost: 0 })}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        parameters.knownFoodCost === 0
                          ? 'bg-[#14532d] text-white border-[#14532d]'
                          : 'bg-[#eef7f2] text-[#14532d] border-[#b9dec6]'
                      }`}
                    >
                      $0 BYO / Sponsored
                    </button>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={parameters.knownFoodCost !== undefined ? parameters.knownFoodCost : ''}
                    onChange={(e) =>
                      onChange({
                        ...parameters,
                        knownFoodCost: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    placeholder="e.g. 350 for pizza & drinks (or $0 if sponsored)"
                  />
                  <p className="text-[10px] text-slate-500">
                    Cost of refreshments, pizza, or catering.
                  </p>
                </div>

                {/* 4. Other Hard Direct Expenses */}
                <div className="bg-white p-3.5 rounded-xl border border-[#c8e0d1] space-y-1.5 shadow-2xs">
                  <label className="text-xs font-bold text-[#14532d] flex items-center justify-between">
                    <span>Other Expenses (AV, DJ, Prizes) ($)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={parameters.knownOtherExpenses !== undefined ? parameters.knownOtherExpenses : ''}
                    onChange={(e) =>
                      onChange({
                        ...parameters,
                        knownOtherExpenses: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    placeholder="e.g. 150 for decorations & awards"
                  />
                  <p className="text-[10px] text-slate-500">
                    Direct hard costs that need to be deducted from revenue.
                  </p>
                </div>

                {/* 5. Confirmed Sponsorships */}
                <div className="bg-white p-3.5 rounded-xl border border-[#c8e0d1] space-y-1.5 shadow-2xs">
                  <label className="text-xs font-bold text-[#14532d] flex items-center justify-between">
                    <span>Pledged Sponsorships / Grants ($)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={parameters.knownSponsorships !== undefined ? parameters.knownSponsorships : ''}
                    onChange={(e) =>
                      onChange({
                        ...parameters,
                        knownSponsorships: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    placeholder="e.g. 1500 from local businesses"
                  />
                  <p className="text-[10px] text-slate-500">
                    Any sponsors already locked in or targeted to offset costs.
                  </p>
                </div>

                {/* 6. Direct Donations Pledged */}
                <div className="bg-white p-3.5 rounded-xl border border-[#c8e0d1] space-y-1.5 shadow-2xs">
                  <label className="text-xs font-bold text-[#14532d] flex items-center justify-between">
                    <span>Direct Seed Donations ($)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100"
                    value={parameters.knownDirectDonations !== undefined ? parameters.knownDirectDonations : ''}
                    onChange={(e) =>
                      onChange({
                        ...parameters,
                        knownDirectDonations: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                    placeholder="e.g. 1000 from lead alumni / board"
                  />
                  <p className="text-[10px] text-slate-500">
                    Any early donations or challenge match gifts already promised.
                  </p>
                </div>
              </div>

              {/* Friendly Reassurance */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-emerald-950 text-xs font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>
                  <strong>Board & Faculty Ready:</strong> When you enter your real costs, FUNraise AI computes the exact net profit you'll actually take home, so your proposal is 100% realistic and defensible!
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Core Question 3: Who is participating? (Age Range & Demographic) */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0f3d28] flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center font-bold">3</span>
            <span>Who is participating? (Age Range & Target Crowd)</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Age Range */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Age Range (Kids, Teens, College or Everyone)
              </label>
              <select
                value={parameters.ageRange}
                onChange={(e) => onChange({ ...parameters, ageRange: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#f8faf8] border border-[#d0e0d5] rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              >
                {AGE_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Strongest Demographic */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Strongest Support Base
              </label>
              <select
                value={parameters.strongestDemographic}
                onChange={(e) => onChange({ ...parameters, strongestDemographic: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#f8faf8] border border-[#d0e0d5] rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              >
                {DEMOGRAPHIC_OPTIONS.map((demo) => (
                  <option key={demo} value={demo}>
                    {demo}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-semibold text-slate-700">
                Specific Group You Want to Invite / Focus On
              </label>
              <input
                type="text"
                value={parameters.targetAudience}
                onChange={(e) => onChange({ ...parameters, targetAudience: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#f8faf8] border border-[#d0e0d5] rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                placeholder="e.g. Fellow college students, campus faculty, alumni network, neighborhood supporters..."
              />
            </div>
          </div>
        </div>

        {/* Core Question 4: Outreach Channels (Enriched for College & Student Clubs) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#0f3d28] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center font-bold">4</span>
              <span>Ways you can spread the word (Outreach Channels)</span>
            </label>
            <span className="text-[11px] text-emerald-800 font-semibold">
              {parameters.meansOfOutreach.length} channel{parameters.meansOfOutreach.length === 1 ? '' : 's'} selected
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Select the channels available to your team. Includes college-proven tactics like in-class professor shoutouts, campus group chats, and student org partnerships:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {OUTREACH_MEANS.map((channel) => {
              const selected = parameters.meansOfOutreach.includes(channel);
              const isProfessor = channel.includes('Professor');
              return (
                <button
                  key={channel}
                  type="button"
                  onClick={() => handleOutreachToggle(channel)}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                    selected
                      ? 'border-[#166534] bg-[#eef7f2] text-slate-900 shadow-2xs font-semibold'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      selected
                        ? 'bg-[#14532d] border-[#14532d] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {selected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs leading-snug block">{channel}</span>
                    {isProfessor && (
                      <span className="inline-block text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                        ★ College Favorite: 2-min in-class plug
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Render any custom added outreach channels */}
            {parameters.meansOfOutreach
              .filter((c) => !OUTREACH_MEANS.includes(c))
              .map((customChannel) => (
                <button
                  key={customChannel}
                  type="button"
                  onClick={() => handleOutreachToggle(customChannel)}
                  className="flex items-start gap-2.5 p-3 rounded-xl border border-[#166534] bg-[#eef7f2] text-slate-900 shadow-2xs font-semibold text-left transition-all cursor-pointer"
                >
                  <div className="mt-0.5 w-4 h-4 rounded flex items-center justify-center border border-[#14532d] bg-[#14532d] text-white shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs leading-snug block">{customChannel}</span>
                    <span className="text-[10px] text-emerald-700 font-semibold">(Custom Channel)</span>
                  </div>
                </button>
              ))}
          </div>

          {/* Add Custom Outreach Channel Input */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={customOutreachInput}
                onChange={(e) => setCustomOutreachInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomOutreach();
                  }
                }}
                className="w-full px-3.5 py-2 bg-[#f8faf8] border border-[#d0e0d5] rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#166534] focus:bg-white"
                placeholder="Type any other outreach channel (e.g. Club podcast, Campus Radio, Fraternity meeting...)"
              />
            </div>
            <button
              type="button"
              onClick={handleAddCustomOutreach}
              disabled={!customOutreachInput.trim()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#14532d] hover:bg-[#166534] text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Channel</span>
            </button>
          </div>
        </div>

        {/* Core Question 5: When (Time of Year & Time of Day / Duration) */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-[#0f3d28] flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center font-bold">5</span>
            <span>Timing (Season & Time of Day or Duration)</span>
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Time of Year / Season Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Time of Year / Season</span>
                </label>
                <span className="text-[10px] text-slate-500 font-normal">All 12 months & semesters</span>
              </div>

              {/* Season Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1">
                {[
                  { id: 'all', label: 'All Windows' },
                  { id: 'spring', label: '🌱 Spring (Jan–May)' },
                  { id: 'fall', label: '🍂 Fall (Aug–Nov)' },
                  { id: 'holidays', label: '🎁 Holidays (Nov–Jan)' },
                  { id: 'summer', label: '☀️ Summer' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSeasonCategoryFilter(tab.id as any)}
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      seasonCategoryFilter === tab.id
                        ? 'bg-[#14532d] text-white border-[#14532d]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-[#eef7f2]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scrollable list of seasons */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {filteredSeasons.map((toy) => {
                  const isSelected = parameters.timeOfYear === toy.label;
                  return (
                    <button
                      key={toy.label}
                      type="button"
                      onClick={() => onChange({ ...parameters, timeOfYear: toy.label })}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#166534] bg-[#eef7f2] text-slate-900 shadow-2xs ring-1 ring-[#166534]/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-semibold flex items-center justify-between">
                        <span>{toy.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#166534]" />}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{toy.sub}</div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Date / Timeframe Self-Input & Quick Jump Chips */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <label className="block text-[11px] font-bold text-[#14532d]">
                  Or type a specific date, month, or event window:
                </label>
                <input
                  type="text"
                  value={parameters.timeOfYear}
                  onChange={(e) => onChange({ ...parameters, timeOfYear: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#c4ded0] rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  placeholder="e.g. First week of February, Syllabus Week, Midterms, Friendsgiving..."
                />

                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] text-slate-500 font-semibold">Quick suggestions:</span>
                  {[
                    'January (Spring Kickoff)',
                    'February (Rush & Club Fairs)',
                    'October (Homecoming)',
                    'November (Friendsgiving)',
                    'December (Year-End Giving)',
                    'April (Spring Fling)',
                  ].map((sugg) => (
                    <button
                      key={sugg}
                      type="button"
                      onClick={() => onChange({ ...parameters, timeOfYear: sugg })}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                        parameters.timeOfYear.includes(sugg.split(' ')[0])
                          ? 'bg-[#14532d] text-white border-[#14532d]'
                          : 'bg-white text-slate-700 border-[#d2e5d9] hover:bg-[#eef7f2]'
                      }`}
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time of Day & Duration Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Time of Day & Duration</span>
                </label>
                <span className="text-[10px] text-slate-500 font-normal">Pick hours or duration</span>
              </div>

              {/* Mode Toggle: Specific Clock Hours vs Just Event Duration */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setTimeMode('clock')}
                  className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    timeMode === 'clock'
                      ? 'bg-white text-[#14532d] shadow-2xs border border-[#c4ded0]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Clock Hours (e.g. 5–8 PM)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTimeMode('duration')}
                  className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    timeMode === 'duration'
                      ? 'bg-white text-[#14532d] shadow-2xs border border-[#c4ded0]'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Hourglass className="w-3.5 h-3.5 text-[#166534]" />
                  <span>Duration Only (e.g. 2 Hours)</span>
                </button>
              </div>

              {/* Options list based on mode */}
              <div className="space-y-2 max-h-[265px] overflow-y-auto pr-1">
                {timeMode === 'clock' ? (
                  TIMES_OF_DAY.map((tod) => {
                    const isSelected =
                      parameters.timeOfDay.startsWith(tod.title.split(' ')[0]) ||
                      parameters.timeOfDay.includes(tod.title.slice(0, 10));
                    return (
                      <button
                        key={tod.title}
                        type="button"
                        onClick={() => onChange({ ...parameters, timeOfDay: tod.title })}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#166534] bg-[#eef7f2] text-slate-900 shadow-2xs ring-1 ring-[#166534]/30'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-semibold flex items-center justify-between">
                          <span>{tod.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#166534]" />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{tod.detail}</div>
                      </button>
                    );
                  })
                ) : (
                  DURATION_OPTIONS.map((dur) => {
                    const isSelected =
                      parameters.timeOfDay.toLowerCase().startsWith(dur.title.split(' ')[0].toLowerCase()) ||
                      parameters.timeOfDay.toLowerCase().includes(dur.title.slice(0, 7).toLowerCase());
                    return (
                      <button
                        key={dur.title}
                        type="button"
                        onClick={() => onChange({ ...parameters, timeOfDay: dur.title })}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#166534] bg-[#eef7f2] text-slate-900 shadow-2xs ring-1 ring-[#166534]/30'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-semibold flex items-center justify-between">
                          <span>{dur.title}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#166534]" />}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{dur.detail}</div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Custom Hours / Duration Self-Input & Quick Chips */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <label className="block text-[11px] font-bold text-[#14532d]">
                  Or enter your exact hours or duration:
                </label>
                <input
                  type="text"
                  value={parameters.timeOfDay}
                  onChange={(e) => onChange({ ...parameters, timeOfDay: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#c4ded0] rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#166534]"
                  placeholder="e.g. 5:00 PM - 8:00 PM (3 hours), 6:00 PM - 8:00 PM (2 hours), or 2-hour evening mixer..."
                />

                {/* Quick Helper Chips for College & Club Events */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-semibold text-slate-500">Quick set:</span>
                  {[
                    '5:00 PM - 8:00 PM (Post-Class)',
                    '6:00 PM - 8:00 PM (2 Hours)',
                    '4:30 PM - 7:00 PM',
                    '2 Hours (Evening)',
                    '3 Hours (Showcase)',
                    '4 Hours (Half-Day)',
                    '11:30 AM - 1:30 PM (Lunch)',
                  ].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onChange({ ...parameters, timeOfDay: preset })}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                        parameters.timeOfDay.includes(preset.split(' ')[0])
                          ? 'bg-[#14532d] text-white border-[#14532d]'
                          : 'bg-white text-slate-700 border-[#d2e5d9] hover:bg-[#eef7f2]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Guidelines Accordion */}
        <div className="pt-2 border-t border-[#e2efe7]">
          <button
            type="button"
            onClick={() => setShowAdvancedRules(!showAdvancedRules)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showAdvancedRules ? 'rotate-180' : ''}`}
            />
            <span>Have any special team rules or donor requests? (Optional)</span>
          </button>

          {showAdvancedRules && (
            <div className="mt-3">
              <textarea
                rows={2}
                value={parameters.notesOrConstraints || ''}
                onChange={(e) =>
                  onChange({ ...parameters, notesOrConstraints: e.target.value })
                }
                placeholder="e.g. Someone offered a $5,000 matching challenge; school prohibits open flames; need vegetarian options..."
                className="w-full px-4 py-2.5 bg-[#f8faf8] border border-[#d0e0d5] rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534]"
              />
            </div>
          )}
        </div>

        {/* Submit Button & Reassurance */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#e2efe7]">
          <div className="flex items-center gap-3">
            <CashStackSvg className="w-8 h-8 shrink-0 hidden sm:block" />
            <div className="text-xs text-slate-600">
              Generates a <strong>realistic net profit breakdown</strong>, donor levels, and <strong>customizable event flyers</strong> (fun & classic!).
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-[#14532d] hover:bg-[#166534] active:bg-[#0f3d28] text-white font-bold text-sm shadow-md shadow-[#14532d]/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Calculating Maximum Net Profit...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Calculate Net Profit & Generate Flyers</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
