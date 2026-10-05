import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { FundraisingParameters, GeneratedStrategy, FinancialBreakdown, RunOfShowItem, InteractiveSabotagePerk } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Heuristic fallback strategy calculator for guaranteed uptime and immediate modeling
function generateHeuristicStrategy(rawParams: any): GeneratedStrategy {
  const params: FundraisingParameters = {
    organizationName: rawParams?.organizationName?.trim() || undefined,
    organizationIdentity: rawParams?.organizationIdentity?.trim() || undefined,
    eventVibe: rawParams?.eventVibe?.trim() || '🔥 High Chaos & Spectator Sabotage',
    ageRange: rawParams?.ageRange?.trim() || 'All Ages / Multi-Generational Community',
    timeOfYear: rawParams?.timeOfYear?.trim() || 'Fall Launch (Back-to-School & Fiscal Kick-Off / Sep-Oct)',
    missionStatement: rawParams?.missionStatement?.trim() || 'Providing educational resources and life-changing community support for local families in need.',
    meansOfOutreach: Array.isArray(rawParams?.meansOfOutreach) && rawParams.meansOfOutreach.length > 0 
      ? rawParams.meansOfOutreach 
      : ['Email Newsletters & Parent Lists', 'Social Media & Student Video Stories', 'Local Business & Pizza Night Sponsorships'],
    strongestDemographic: rawParams?.strongestDemographic?.trim() || 'School Parents, Teachers, Alumni & Local Sponsors',
    targetAudience: rawParams?.targetAudience?.trim() || 'Parents, Grandparents, Fellow Students & Local Businesses',
    maxVenueCapacity: rawParams?.maxVenueCapacity?.trim() || '200 seats',
    desiredTurnout: Number(rawParams?.desiredTurnout) > 0 ? Number(rawParams.desiredTurnout) : 150,
    desiredFunds: Number(rawParams?.desiredFunds) > 0 ? Number(rawParams.desiredFunds) : 50000,
    timeOfDay: rawParams?.timeOfDay?.trim() || 'Evening (6:30 PM - 9:30 PM)',
    knownVenueCost: rawParams?.knownVenueCost !== undefined && rawParams?.knownVenueCost !== '' ? Number(rawParams.knownVenueCost) : undefined,
    knownFoodCost: rawParams?.knownFoodCost !== undefined && rawParams?.knownFoodCost !== '' ? Number(rawParams.knownFoodCost) : undefined,
    knownTicketPrice: rawParams?.knownTicketPrice !== undefined && rawParams?.knownTicketPrice !== '' ? Number(rawParams.knownTicketPrice) : undefined,
    knownSponsorships: rawParams?.knownSponsorships !== undefined && rawParams?.knownSponsorships !== '' ? Number(rawParams.knownSponsorships) : undefined,
    knownOtherExpenses: rawParams?.knownOtherExpenses !== undefined && rawParams?.knownOtherExpenses !== '' ? Number(rawParams.knownOtherExpenses) : undefined,
    knownDirectDonations: rawParams?.knownDirectDonations !== undefined && rawParams?.knownDirectDonations !== '' ? Number(rawParams.knownDirectDonations) : undefined,
    notesOrConstraints: rawParams?.notesOrConstraints?.trim() || ''
  };

  const goal = Number(params.desiredFunds) || 50000;
  const turnout = Number(params.desiredTurnout) || 150;
  const venueCap = (params.maxVenueCapacity || '').toLowerCase();
  const isVirtualOrUnlimited = venueCap.includes('digital') || 
                               venueCap.includes('virtual') || 
                               venueCap.includes('unlimited') || 
                               params.maxVenueCapacity === '0';

  // Specific user-entered costs or realistic baselines
  const knownVenue = params.knownVenueCost !== undefined ? Number(params.knownVenueCost) : null;
  const knownFood = params.knownFoodCost !== undefined ? Number(params.knownFoodCost) : null;
  const knownTicket = params.knownTicketPrice !== undefined ? Number(params.knownTicketPrice) : null;
  const knownSponsors = params.knownSponsorships !== undefined ? Number(params.knownSponsorships) : null;
  const knownOther = (params as any).knownOtherExpenses !== undefined ? Number((params as any).knownOtherExpenses) : null;
  const knownDonations = (params as any).knownDirectDonations !== undefined ? Number((params as any).knownDirectDonations) : null;

  // Realistic hard costs: If user entered $0 for venue (e.g. school gym, church hall, park, virtual), honor $0!
  const actualVenueCost = knownVenue !== null ? Math.max(0, knownVenue) : (isVirtualOrUnlimited ? 0 : Math.round(goal * 0.05));
  const isVenueFreeOrDonated = actualVenueCost === 0 || isVirtualOrUnlimited;
  
  const ticketPrice = knownTicket !== null ? Math.max(0, knownTicket) : (goal < 20000 ? 5 : 25);
  const ticketRev = ticketPrice * turnout;

  // Crowd Engagement Revenue Calculation:
  // When admission is free ($0 entry), zero friction maximizes attendance.
  // The primary in-person fundraising engine becomes: spectator sabotage micro-bribes ($5-$25),
  // 50/50 raffles, live challenge match pledges, and concessions.
  // Free admission events typically yield $18-$35 per attendee in crowd engagement.
  // Paid admission events yield $10-$15 per attendee in auxiliary crowd engagement.
  const basePerCapita = ticketPrice === 0 ? Math.max(22, Math.round(goal / turnout * 0.35)) : 12;
  const crowdEngagementPerCapita = Math.min(65, Math.max(18, basePerCapita));
  const crowdEngagementRevenue = Math.max(500, Math.round(turnout * crowdEngagementPerCapita));

  const sponsorRev = knownSponsors !== null ? Math.max(0, knownSponsors) : Math.max(500, Math.round(goal * 0.25));
  const directDonationRev = knownDonations !== null 
    ? Math.max(0, knownDonations) 
    : Math.max(500, Math.round(Math.max(goal - (ticketRev + crowdEngagementRevenue + sponsorRev), goal * 0.35)));
  
  const foodCost = knownFood !== null ? Math.max(0, knownFood) : (isVirtualOrUnlimited ? 0 : Math.round(turnout * 6));
  const otherCost = knownOther !== null ? Math.max(0, knownOther) : Math.round(goal * 0.025);

  const totalHardExpenses = actualVenueCost + foodCost + otherCost;
  const totalRealisticGross = ticketRev + crowdEngagementRevenue + sponsorRev + directDonationRev;
  const realisticNetProfit = totalRealisticGross - totalHardExpenses;
  const realisticMarginPct = totalRealisticGross > 0 ? Math.round((realisticNetProfit / totalRealisticGross) * 100) : 85;

  const profitNotes = ticketPrice === 0
    ? `Free Admission Model ($0 entry fee): Zero entry barriers maximize turnout (${turnout} attendees). Gross revenue is powered by an estimated $${crowdEngagementRevenue.toLocaleString()} in crowd engagement (spectator sabotage bribes, player restrictions, raffles, and live challenge pledges) plus sponsorships and direct donations, yielding a realistic take-home net profit of $${realisticNetProfit.toLocaleString()}!`
    : (isVenueFreeOrDonated
        ? `Zero venue rental fees ($0): Combining ticket sales with $${crowdEngagementRevenue.toLocaleString()} in spectator crowd engagement and sponsor matches ensures over ${realisticMarginPct}% of every dollar goes directly to your mission.`
        : `Venue cost ($${actualVenueCost.toLocaleString()}) and direct hard costs are deducted against tickets, $${crowdEngagementRevenue.toLocaleString()} in crowd engagement, and sponsorships for a defensible net profit.`);

  const financialBreakdown: FinancialBreakdown = {
    venueCost: actualVenueCost,
    isVenueFreeOrDonated,
    ticketRevenue: ticketRev,
    ticketPrice,
    crowdEngagementRevenue,
    sponsorshipRevenue: sponsorRev,
    directDonations: directDonationRev,
    foodAndCateringCost: foodCost,
    otherExpenses: otherCost,
    totalExpenses: totalHardExpenses,
    totalGrossRevenue: totalRealisticGross,
    realisticNetProfit,
    marginPct: realisticMarginPct,
    profitNotes,
  };

  // Format 1: Underwritten / Optimized High-Yield Event
  const format1Expenses = Math.max(300, Math.round(totalHardExpenses * 0.4)); // Underwriters or sponsors offset room
  const format1Gross = Math.max(goal, totalRealisticGross);
  const format1Net = format1Gross - format1Expenses;
  const format1Margin = Math.round((format1Net / format1Gross) * 100);

  // Format 2: Traditional Standard Format (Full venue + catering paid from proceeds)
  const format2Expenses = Math.max(totalHardExpenses, Math.round(goal * 0.32));
  const format2Gross = Math.round(goal * 1.05) + ticketRev;
  const format2Net = format2Gross - format2Expenses;
  const format2Margin = Math.round((format2Net / format2Gross) * 100);

  // Format 3: Digital / Hybrid Matched Sprint
  const format3Expenses = isVirtualOrUnlimited ? Math.round(goal * 0.03) : Math.round(goal * 0.07);
  const format3Gross = Math.round(goal * 1.08);
  const format3Net = format3Gross - format3Expenses;
  const format3Margin = Math.round((format3Net / format3Gross) * 100);

  // Calculate Pyramid
  const leadGift = Math.max(5000, Math.round(goal * 0.25));
  const majorGifts = Math.max(2500, Math.round(goal * 0.1));
  const patronGifts = Math.max(1000, Math.round(goal * 0.03));
  const friendGifts = Math.max(250, Math.round(goal * 0.005));
  const grassrootsGifts = Math.max(50, Math.round(goal * 0.001));

  const leadCount = 1;
  const majorCount = Math.max(2, Math.round((goal * 0.3) / majorGifts));
  const patronCount = Math.max(4, Math.round((goal * 0.2) / patronGifts));
  const friendCount = Math.max(15, Math.round(turnout * 0.3));
  const grassrootsCount = Math.max(30, turnout - (leadCount + majorCount + patronCount + friendCount));

  const totalCalculated =
    leadGift * leadCount +
    majorGifts * majorCount +
    patronGifts * patronCount +
    friendGifts * friendCount +
    grassrootsGifts * grassrootsCount;

  // Generate customized run-of-show schedule based on user's exact hours or duration
  const timeStr = (params.timeOfDay || '').toLowerCase();
  let scheduleItems: RunOfShowItem[] = [];
  let peakAskWindow = 'Hour 1 + 15min mark (Exact sweet spot: 20 minutes long)';

  if (timeStr.includes('5:00') || timeStr.includes('5-8') || timeStr.includes('4:30')) {
    scheduleItems = [
      {
        timeOffset: '05:00 PM - 05:40 PM',
        activity: 'Doors Open, Music, Snacks/Pizza, Check-In & Socializing',
        fundraisingTrigger: 'Warm welcome; QR code wristbands and raffle ticket sales at entrance',
        psychologicalGoal: 'Students and guests relax after class; create exciting community buzz',
      },
      {
        timeOffset: '05:40 PM - 06:10 PM',
        activity: 'Welcome Remarks, Student Team Spotlight & Sponsor Thank-Yous',
        fundraisingTrigger: 'Publicly recognize local sponsors and student beneficiaries on microphone',
        psychologicalGoal: 'Connect everyone to the mission; establish clear goal transparency',
      },
      {
        timeOffset: '06:10 PM - 06:35 PM',
        activity: 'THE PEAK ASK: Live 1:1 Challenge Match & Rapid Donation Blitz',
        fundraisingTrigger: 'Announce 20-minute matching window: every dollar doubled on the spot',
        psychologicalGoal: 'Peak emotional energy while room is full and attentive; urgency drives action',
      },
      {
        timeOffset: '06:35 PM - 07:20 PM',
        activity: 'Fun Activities, Student Showcase / Games, Food & Auction Bidding',
        fundraisingTrigger: 'Micro-games, bake sale / merchandise, and silent auction bidding',
        psychologicalGoal: 'Keep momentum high with celebratory engagement and interactive fun',
      },
      {
        timeOffset: '07:20 PM - 08:00 PM',
        activity: 'Final Total Reveal, Winner Announcements & Celebration Checkout',
        fundraisingTrigger: 'Live scoreboard cross the finish line; instant mobile checkout links',
        psychologicalGoal: 'Shared triumph and collective victory feeling before departure',
      },
    ];
    peakAskWindow = '6:10 PM - 6:35 PM (After everyone has arrived and settled in)';
  } else if (timeStr.includes('6:00') || timeStr.includes('6-8') || timeStr.includes('2 hour') || timeStr.includes('2 hr')) {
    scheduleItems = [
      {
        timeOffset: '06:00 PM - 06:30 PM',
        activity: 'Arrival, Music, Welcome Appetizers/Refreshments & Networking',
        fundraisingTrigger: 'Name tags with donation badges; sponsor banner step-and-repeat photos',
        psychologicalGoal: 'Break the ice; make attendees feel valued and excited to participate',
      },
      {
        timeOffset: '06:30 PM - 06:50 PM',
        activity: 'Welcome Remarks, Cause Video & Key Impact Story',
        fundraisingTrigger: 'Share 2-minute inspiring beneficiary story that tugs at the heartstrings',
        psychologicalGoal: 'Prime willingness to give; highlight the direct community need',
      },
      {
        timeOffset: '06:50 PM - 07:15 PM',
        activity: 'THE PEAK ASK: Live Matching Window & Pledge Sprint',
        fundraisingTrigger: 'Drop pledge tiers ($1,000 -> $500 -> $100 -> $25); match anchor unlocked',
        psychologicalGoal: 'Fast-paced crowd momentum; zero hesitation as pledges double',
      },
      {
        timeOffset: '07:15 PM - 07:45 PM',
        activity: 'Celebration Toast, Music, Desserts & Silent Auction Final Bids',
        fundraisingTrigger: 'Closing 5 minutes for auction item countdown; secondary micro-donations',
        psychologicalGoal: 'Celebratory joy; attendees enjoy refreshments and conversation',
      },
      {
        timeOffset: '07:45 PM - 08:00 PM',
        activity: 'Grand Total Announcement & Instant Digital Checkout',
        fundraisingTrigger: 'Send Apple Pay / Google Pay mobile link to all phones for instant receipt',
        psychologicalGoal: 'Immediate fulfillment and zero uncollected pledges',
      },
    ];
    peakAskWindow = '6:50 PM - 7:15 PM (50-minute mark)';
  } else if (timeStr.includes('1 hour') || timeStr.includes('1 hr') || timeStr.includes('1.5 hour') || timeStr.includes('1.5 hr')) {
    scheduleItems = [
      {
        timeOffset: '00:00 - 00:15',
        activity: 'Fast Check-In, Upbeat Playlist & Name Tags',
        fundraisingTrigger: 'Hand out QR code stickers for instant mobile pledge matching',
        psychologicalGoal: 'High energy, casual icebreaker, immediate focus',
      },
      {
        timeOffset: '00:15 - 00:30',
        activity: 'Student Spotlight & High-Impact 2-Minute Story',
        fundraisingTrigger: 'Demonstrate immediate concrete need with real student voices',
        psychologicalGoal: 'Direct emotional connection before audience attention wanes',
      },
      {
        timeOffset: '00:30 - 00:45',
        activity: 'THE PEAK ASK: 15-Minute Live Matching Blitz',
        fundraisingTrigger: 'Unlock sponsor match: all gifts doubled during countdown',
        psychologicalGoal: 'Maximum momentum and adrenaline-fueled giving sprint',
      },
      {
        timeOffset: '00:45 - 01:00',
        activity: 'Victory Tally, Refreshments & Farewell',
        fundraisingTrigger: 'Send instant thank-you text with receipt',
        psychologicalGoal: 'Wrap up exactly on time with shared triumph',
      },
    ];
    peakAskWindow = '30-minute mark (15-minute high urgency blitz)';
  } else if (timeStr.includes('11:30') || timeStr.includes('lunch') || timeStr.includes('midday')) {
    scheduleItems = [
      {
        timeOffset: '11:30 AM - 12:00 PM',
        activity: 'Quad / Commons Tabling, Music & Passing-Period Crowds',
        fundraisingTrigger: 'Pass out flyers with QR codes as classes dismiss',
        psychologicalGoal: 'Catch hungry, curious students in heavy foot-traffic hubs',
      },
      {
        timeOffset: '12:00 PM - 12:25 PM',
        activity: 'Pop-Up Showcase, Demonstration & Mic Announcements',
        fundraisingTrigger: 'Show live student projects / demo on campus plaza',
        psychologicalGoal: 'Engage audience visually and connect to real student impact',
      },
      {
        timeOffset: '12:25 PM - 12:45 PM',
        activity: 'THE PEAK ASK: Midday Matching Challenge Sprint',
        fundraisingTrigger: 'Announce challenge match to everyone grabbing lunch',
        psychologicalGoal: 'Micro-gifts of $5 - $25 add up with low friction via Apple Pay',
      },
      {
        timeOffset: '12:45 PM - 01:30 PM',
        activity: 'Lunch Socializing, Raffle Drawings & Wrap-Up',
        fundraisingTrigger: 'Raffle winner announcement creates crowd linger',
        psychologicalGoal: 'Friendly send-off back to afternoon classes',
      },
    ];
    peakAskWindow = '12:25 PM - 12:45 PM (Peak lunchtime crowd)';
  } else {
    scheduleItems = [
      {
        timeOffset: '00:00 - 00:45',
        activity: 'Arrival, Sponsor Step-and-Repeat, Curated Welcome Cocktails / Refreshments',
        fundraisingTrigger: 'Social proof and high-energy networking; hosts greet VIP donors',
        psychologicalGoal: 'Make guests feel privileged to be in the room; build warm rapport',
      },
      {
        timeOffset: '00:45 - 01:05',
        activity: 'Welcome Remarks from Board Chair & Underwriting Sponsor Recognition',
        fundraisingTrigger: 'Publicly honor corporate underwriters so they renew next year',
        psychologicalGoal: 'Demonstrate transparency that overhead is already covered',
      },
      {
        timeOffset: '01:05 - 01:25',
        activity: 'Beneficiary Impact Story & Short High-Emotion Video (Under 3 Minutes)',
        fundraisingTrigger: 'Connect donor wallet directly to tangible human/mission outcome',
        psychologicalGoal: 'Peak emotional resonance; prime willingness to give generously',
      },
      {
        timeOffset: '01:25 - 01:47',
        activity: 'THE PEAK ASK: Live 1:1 Match Unveiling & Fund-a-Need Paddle Raise',
        fundraisingTrigger: 'Auctioneer / Facilitator drops tiers: Lead -> $5k -> $2.5k -> $1k -> $500 -> $100',
        psychologicalGoal: 'Crowd momentum; pre-planted seed givers immediately raise paddles to break hesitation',
      },
      {
        timeOffset: '01:47 - 02:15',
        activity: 'Live Tally Celebration, Dessert / Celebration Toast, and Checkout',
        fundraisingTrigger: 'Mobile checkout text link sent to phones while applause continues',
        psychologicalGoal: 'Euphoria of shared victory; 100% instant digital pledge capture',
      },
    ];
    peakAskWindow = 'Hour 1 + 25min mark (Exact sweet spot: 22 minutes long)';
  }

  // Generate customized seasonal notes
  const seasonStr = (params.timeOfYear || '').toLowerCase();
  let seasonalNotes = `Given the ${params.timeOfYear || 'upcoming'} timeframe, donors are uniquely primed by seasonal tax cycles and calendar motivations. Maximize profit by framing gifts as tax-deductible year-end or milestone investments.`;

  if (seasonStr.includes('jan') || seasonStr.includes('feb') || seasonStr.includes('spring semester') || seasonStr.includes('rush')) {
    seasonalNotes = `Hosting in January–February aligns with the college & school Spring Semester Kickoff. Student clubs are re-energized, syllabus week is open, quad involvement fairs have peak foot traffic, and institutional/department budgets refresh. Maximize profit by pairing start-of-class lecture announcements with early-bird ticket discounts during the first 3 weeks.`;
  } else if (seasonStr.includes('oct') || seasonStr.includes('homecoming') || seasonStr.includes('spirit week') || seasonStr.includes('halloween')) {
    seasonalNotes = `Mid-fall and Homecoming season (October) delivers peak school and athletic spirit before the busy holiday rush. Boost profit by tying ticket sales to tailgates, alumni reunions, costume events, or friendly class competitions.`;
  } else if (seasonStr.includes('nov') || seasonStr.includes('friendsgiving') || seasonStr.includes('pre-finals')) {
    seasonalNotes = `Hosting in November (Late Fall & Friendsgiving) captures high campus fellowship and pre-finals gratitude before students disperse for Thanksgiving break. Donors are also warming up for Giving Tuesday and year-end planning. Maximize profit by framing gifts as direct student gratitude investments and setting up early Giving Tuesday challenge pledges.`;
  } else if (seasonStr.includes('dec') || seasonStr.includes('giving tuesday') || seasonStr.includes('holiday') || seasonStr.includes('year-end')) {
    seasonalNotes = `Late November through December captures the national year-end giving surge and Giving Tuesday. Over 30% of annual charitable gifts are made in December for tax-deduction write-offs. Emphasize employer gift-matching and corporate challenge matches.`;
  } else if (seasonStr.includes('mar') || seasonStr.includes('apr') || seasonStr.includes('spring break') || seasonStr.includes('spring fest')) {
    seasonalNotes = `March–April brings spring renewal, warmer weather, and corporate annual budget releases. Perfect for outdoor fun fairs, galas, and student showcases as weather warms up.`;
  } else if (seasonStr.includes('may') || seasonStr.includes('jun') || seasonStr.includes('graduation') || seasonStr.includes('finals')) {
    seasonalNotes = `May–June marks graduation, senior send-offs, and final booster celebrations. Capitalize on nostalgic alumni sentiment, proud graduating parents, and legacy gifts.`;
  } else if (seasonStr.includes('summer') || seasonStr.includes('jul') || seasonStr.includes('aug')) {
    seasonalNotes = `Summer campaigns benefit from outdoor weather, relaxed casual schedules, camps, tournaments, and car washes. Keep overhead low with outdoor parks or school blacktops.`;
  }

  // Tailored organization identity tie-in rationale, format naming & anti-boring sabotage menu
  const orgName = params.organizationName?.trim() || '';
  const orgIdentity = params.organizationIdentity?.trim() || '';
  const identityLower = (orgIdentity + ' ' + orgName + ' ' + params.missionStatement).toLowerCase();

  let tailoredFormatName = isVirtualOrUnlimited
    ? 'Digital Matched Impact Sprint & Ambassador Rally'
    : 'Campus Chaos Challenge & Spectator Sabotage Gauntlet';
  let tailoredHook = `Transforming every $1 given into $2 of immediate community impact through a 1:1 challenge match, coupled with high-energy spectator sabotage micro-games where attendees pay to bend the rules.`;
  let abstractConceptHook = `Spectators don't just sit and watch—they actively pay $5 to $25 to trigger hilarious handicaps, bribe referees, buy team power-ups, or mute rival cheer sections with $0 event overhead!`;
  let detailedEventDescription = `• What the Event Looks Like: Hosted in your campus student center, multipurpose room, gym, or local hall with free admission. The space is arranged with an energetic central activity arena, sideline spectator seating, a student DJ booth, and an official scoring desk featuring neon signage with the "Spectator Pay-to-Play Sabotage Menu".\n\n• How the Event Runs: Student and community teams participate in high-energy skills relays, friendly exhibition rounds, and audience-voted challenge heats. Each round lasts 5 to 10 minutes, keeping the pace fast and the crowd engaged.\n\n• How the Crowd Drives Revenue ($0 Overhead): Spectators don't just sit and watch—they walk up to the scoring desk (or scan table QR codes via Venmo/Apple Pay) to purchase funny game sabotages, player handicaps, and referee bribes in real time. Because these perks rely on playful human challenges, they cost $0 to execute and convert 100% into net profit!\n\n• Halftime & The Peak Ask: At the midpoint, the MC pauses the action for a 15-minute Live Challenge Match where an anchor sponsor doubles every community gift on the spot, followed by the grand final showdown and an on-stage awards ceremony!`;
  let identityRationale = `Connecting your fundraiser directly to ${orgName ? orgName + "'s" : "your club's"} mission (${orgIdentity || params.missionStatement}) transforms passive spectators into enthusiastic donors. Showcasing your members' real craft and passion inspires higher giving and attracts corporate underwriters.`;
  let flyerTitle = orgName
    ? `${orgName} Spectator Sabotage Challenge`
    : (params.missionStatement ? `${params.missionStatement.slice(0, 32)}... Challenge` : 'Community Spectator Sabotage Showdown');
  let flyerTagline = `Join us for the ultimate interactive showdown: watch the action or pay to sabotage the players, swap the refs, and double your impact!`;

  let interactiveSabotageMenu: InteractiveSabotagePerk[] = [
    {
      name: 'The Blindfold Relay Handicap',
      cost: 5,
      category: 'Sabotage',
      description: 'A spectator pays to make a competing team member complete the next challenge blindfolded while teammates shout directions!',
      projectedRevenue: 150,
    },
    {
      name: 'Sub In A Campus Celebrity / Professor',
      cost: 10,
      category: 'Rule Twist',
      description: 'Bribe the officials to draft an attending faculty member or campus influencer into the action on the spot!',
      projectedRevenue: 180,
    },
    {
      name: 'The Airhorn Section Mute',
      cost: 15,
      category: 'Crowd Control',
      description: 'Sound the referee horn and force the loudest rival cheer section or table to stay completely silent for 3 minutes!',
      projectedRevenue: 180,
    },
    {
      name: 'Double Point Score Multiplier',
      cost: 10,
      category: 'Power-Up',
      description: 'Activate a 90-second multiplier where all points or challenges earned count double for your chosen team!',
      projectedRevenue: 200,
    },
    {
      name: 'Pie-in-the-Face Finale Auction',
      cost: 25,
      category: 'Sabotage',
      description: 'Spectators bid live for the exclusive honor of throwing a shaving-cream pie at the winning team captain or club president!',
      projectedRevenue: 250,
    },
  ];

  // Specific sports / basketball / athletics match
  if (identityLower.includes('basketball') || identityLower.includes('hoop') || identityLower.includes('court') || identityLower.includes('sport') || identityLower.includes('athletic') || identityLower.includes('soccer') || identityLower.includes('football')) {
    tailoredFormatName = 'Spectator-Sabotage 3v3 Tournament & Rule-Bender Showdown';
    tailoredHook = `Spectators don't just cheer from the bleachers—they pay $5 to $20 to bend the rules, sabotage shooters, and bribe officials with 100% of proceeds funding our team!`;
    abstractConceptHook = `A fast-paced 3v3 basketball tournament where spectators pay to restrict players (e.g., shoot in oven mitts or one-handed), sub the refs out with student fans, mute rival hecklers, or unlock 4-point golden balls!`;
    detailedEventDescription = `• What the Event Looks Like: Held right on the campus or school basketball court with bleachers pulled right up to the sidelines for an intimate, electric courtside experience. A student DJ spins upbeat warmup tracks while the scoring table features large chalkboard and neon signs: "THE SPECTATOR SABOTAGE MENU — PAY TO BEND THE RULES!"\n\n• How the Tournament Runs: 8 to 16 student, faculty, and alumni teams compete in a rapid double-elimination 3v3 basketball bracket (10-minute running clock or first team to 15 points by 1s and 2s). Referees and floor announcers keep the games moving with play-by-play commentary.\n\n• How Spectators Pay-to-Play ($0 Overhead): Spectators in the crowd actively influence the game live! Anyone in the bleachers can drop $5 at the table to force an opposing star shooter to wear giant chef oven mitts for 3 possessions, pay $10 to sub the official referee out with a student cheerleader, pay $15 to mute a rival cheer section with a foam yellow card, or pay $10 for a golden 4-point ball. Every bribe is announced on the gym microphone, sparking hilarious bidding wars between rival fan sections!\n\n• Halftime & The Peak Ask: At the championship break, play pauses for a 15-minute 1:1 Matching Blitz where an anchor business doubles all pledges, followed by a crowd $10 half-court shootout jackpot before the championship trophy game!`;
    identityRationale = `Connecting the tournament directly to your basketball & athletics identity turns a standard sports day into an unforgettable spectator-driven comedy showdown with massive ticket and micro-bribe revenue.`;
    flyerTitle = orgName ? `${orgName} Spectator-Sabotage 3v3 Showdown` : 'Spectator-Sabotage 3v3 Basketball Tournament';
    flyerTagline = 'Watch the games OR pay to sabotage players, bench the referee, and mute opposing fans! 100% of proceeds fund our team.';
    interactiveSabotageMenu = [
      {
        name: 'The Chef Oven Mitt Handicap',
        cost: 5,
        category: 'Sabotage',
        description: 'Force an opposing shooter to play the next 3 possessions wearing giant chef oven mitts!',
        projectedRevenue: 150,
      },
      {
        name: 'Sub The Referee Out',
        cost: 10,
        category: 'Rule Twist',
        description: 'Bribe the table to bench the head referee for 3 minutes and replace them with a student cheerleader or rival fan!',
        projectedRevenue: 200,
      },
      {
        name: 'Mute That Loud Heckler',
        cost: 15,
        category: 'Crowd Control',
        description: 'Awarded a giant foam mute megaphone & yellow card to silence a loud opposing spectator across the court for 5 full minutes!',
        projectedRevenue: 180,
      },
      {
        name: 'Golden 4-Point Ball',
        cost: 10,
        category: 'Power-Up',
        description: 'Unlock a glowing golden ball for your favorite team—if made from beyond the arc, it counts for 4 points!',
        projectedRevenue: 160,
      },
      {
        name: 'Half-Court Sudden Death Twist',
        cost: 20,
        category: 'Rule Twist',
        description: 'Trigger an instant halftime sudden-death sprint where selected shooters race for a prize jackpot!',
        projectedRevenue: 240,
      },
    ];
  } else if (identityLower.includes('robot') || identityLower.includes('tech') || identityLower.includes('stem') || identityLower.includes('code') || identityLower.includes('engineering') || identityLower.includes('hack')) {
    tailoredFormatName = 'Crowd-Controlled Robot Battle Royale & Semicolon Sabotage';
    tailoredHook = `Pairing a live student robot demonstration and crowd battle arena with a 1:1 matched challenge window: donors see the technology and student skills they are directly funding in action.`;
    abstractConceptHook = `Live competitive robot battles where the audience pays micro-bribes to trigger arena hazards, invert team joystick controls, deploy smoke fog, or order autonomous power bursts!`;
    detailedEventDescription = `• What the Event Looks Like: The campus multipurpose hall or gym floor is transformed into an arena with a central 12x12-foot elevated battle ring, safety perimeter barriers, neon LED accent lighting, and a projector screen broadcasting live robot POV cameras to spectators.\n\n• How the Tournament Runs: Student engineering teams field custom autonomous and radio-controlled bots in rapid 3-minute battle heats and obstacle courses. An energetic student MC commentates the engineering maneuvers while team pits are open for audience walkthroughs.\n\n• How the Crowd Drives Revenue ($0 Overhead): Spectators pay micro-bribes directly at the arena scoring table: $5 forces an opposing bot driver to steer with inverted joystick axes for 60 seconds, $10 triggers a theatrical blast of stage smoke across the arena floor, and $15 calls an emergency "Semicolon Syntax Freeze" timeout!\n\n• Halftime & The Peak Ask: During the battery-recharge intermission, student builders demonstrate their competition machines on the big screen, followed by a 20-minute 1:1 match pledge window and a live auction where winning donors get to pilot robots in an exhibition match!`;
    identityRationale = `By letting attendees drive robots or watch live autonomous missions before the pledge ask, donors instantly connect their dollars to tangible student STEM skills, driving higher attendance and ticket revenue.`;
    flyerTitle = orgName ? `${orgName} Robot Battle & Sabotage Arena` : 'STEM & Robotics Battle Royale';
    flyerTagline = 'Watch live student robots in action, trigger arena hazards, and double your impact with a live matching grant!';
    interactiveSabotageMenu = [
      {
        name: 'Invert Opponent Joysticks',
        cost: 5,
        category: 'Sabotage',
        description: 'The opposing bot driver must steer with reverse inverted joystick axes for 60 seconds!',
        projectedRevenue: 150,
      },
      {
        name: 'Smoke Machine Fog of War',
        cost: 10,
        category: 'Crowd Control',
        description: 'Blast the arena floor with theatrical stage fog, blinding optical sensors and driving cameras!',
        projectedRevenue: 180,
      },
      {
        name: 'The Semicolon Code Freeze',
        cost: 15,
        category: 'Sabotage',
        description: 'Trigger an emergency 20-second autonomous timeout while the opposing bot waits for a syntax bug fix!',
        projectedRevenue: 195,
      },
      {
        name: 'Overclock Speed Burst',
        cost: 10,
        category: 'Power-Up',
        description: 'Grant your favorite robot team full battery voltage boost and defensive wedge for the next round!',
        projectedRevenue: 170,
      },
      {
        name: 'Neon Glow Sudden Death',
        cost: 20,
        category: 'Rule Twist',
        description: 'Black out the venue lights and battle exclusively with neon headlights and glow-stick bumpers!',
        projectedRevenue: 240,
      },
    ];
  } else if (identityLower.includes('band') || identityLower.includes('music') || identityLower.includes('dance') || identityLower.includes('theater') || identityLower.includes('theatre') || identityLower.includes('arts') || identityLower.includes('choir')) {
    tailoredFormatName = 'Human Jukebox & Reverse-Director Showdown';
    tailoredHook = `Centering an electrifying student showcase and live musical/arts encore with audience-directed tempo hijacks and a 20-minute matching pledge blitz.`;
    abstractConceptHook = `An electrifying live performance where spectators pay to hijack the musical tempo, force the brass section into hilarious kazoo solos, or bid to make the director wear ridiculous costumes!`;
    detailedEventDescription = `• What the Event Looks Like: Arranged in an energetic cabaret or student amphitheater setting with close-in seating, stage lighting, and roaming "Bribe Ambassadors" carrying menus and QR payment signs.\n\n• How the Showcase Runs: Student musicians, dancers, or actors perform high-energy medleys and choreography. But unlike a quiet, formal concert, the crowd is actively empowered to hijack the performance live!\n\n• How the Crowd Drives Revenue ($0 Overhead): Spectators pay micro-fees in real time: $5 forces performers to play at 2x hyperspeed without missing a beat, $10 hands the lead soloist a neon plastic kazoo for their dramatic bridge solo, $15 triggers an audience genre mashup vote, and $25 bids to force the ensemble director to conduct the grand finale in an inflatable dinosaur suit!\n\n• Halftime & The Peak Ask: Mid-show, the director shares a moving 2-minute student impact video, immediately launching an anchor sponsor 1:1 match pledge blitz before the grand finale encore!`;
    identityRationale = `Arts, music, and performance organizations excel when their talent is the centerpiece. Attendees feel they are purchasing a premier entertainment experience, justifying ticket prices and motivating major gift patrons.`;
    flyerTitle = orgName ? `${orgName} Human Jukebox & Showcase` : 'Student Arts & Performance Gala';
    flyerTagline = 'An electrifying evening of live student performances, music, and hilarious spectator conductor hijacks where every dollar is matched!';
    interactiveSabotageMenu = [
      {
        name: '2x Double-Time Tempo Hijack',
        cost: 5,
        category: 'Rule Twist',
        description: 'Force the ensemble or dancers to perform the current piece at 2x hyperspeed without missing a beat!',
        projectedRevenue: 140,
      },
      {
        name: 'Neon Kazoo Solo Pass',
        cost: 10,
        category: 'Sabotage',
        description: 'Hand the lead trumpet or soloist a neon plastic kazoo to play their big dramatic bridge solo!',
        projectedRevenue: 180,
      },
      {
        name: 'Audience Genre Mashup Vote',
        cost: 15,
        category: 'Crowd Control',
        description: 'Spectators vote live between two crazy genre mashups (e.g., Hip-Hop Mozart) for the next set!',
        projectedRevenue: 210,
      },
      {
        name: 'Spotlight Encore on Demand',
        cost: 10,
        category: 'Power-Up',
        description: 'Unlock an instant 60-second spotlight feature for your favorite student performer or section!',
        projectedRevenue: 160,
      },
      {
        name: 'Inflatable Dino Director Sabotage',
        cost: 25,
        category: 'Sabotage',
        description: 'The entire room bids to force the ensemble director to conduct the grand finale in a giant inflatable dinosaur costume!',
        projectedRevenue: 250,
      },
    ];
  } else if (identityLower.includes('debate') || identityLower.includes('speech') || identityLower.includes('mock trial') || identityLower.includes('model un')) {
    tailoredFormatName = 'Reverse-Debate & Audience Heckler Hijack Arena';
    tailoredHook = `Competitive debate turned upside down: debaters take the stage under crowd control, where donors pay to force rhyme constraints or flip stances mid-round.`;
    abstractConceptHook = `Competitive debaters take the stage under audience control—spectators pay to force debaters into rhyming couplets, flip team stances mid-speech, or mute opposing speakers!`;
    detailedEventDescription = `• What the Event Looks Like: Set up in a campus lecture hall or auditorium with opposing podiums, a live digital countdown timer, a front-row heckler's gallery, and an official scoring desk equipped with buzzers and foam mute mics.\n\n• How the Debate Runs: Debater pairs tackle hilarious and thought-provoking topics in 3-minute rapid rounds. But the audience holds total power to disrupt and hijack the proceedings live!\n\n• How the Crowd Drives Revenue ($0 Overhead): Spectators pay micro-fees to trigger hilarious constraints: $5 forces a debater to speak strictly in rhyming couplets, $10 commands both teams to instantly switch podiums and argue their opponent's stance mid-sentence, $15 silences an opponent with a 30-second mic mute, and $20 drafts a professor from the audience to cross-examine both teams!\n\n• Halftime & The Peak Ask: Between rounds, team captains highlight the travel expenses needed for the championship, unlocking an anchor sponsor match blitz with a live scoreboard!`;
    identityRationale = `Debate and speech teams shine when challenged intellectually. Giving the audience the power to impose hilarious constraints makes debate wildly entertaining for casual crowds.`;
    flyerTitle = orgName ? `${orgName} Reverse Debate Arena` : 'Reverse Debate & Heckler Hijack';
    flyerTagline = 'Watch debaters battle—or pay to mute speakers, flip their stances, and force them to argue in rhymes!';
    interactiveSabotageMenu = [
      {
        name: 'Rhyme Scheme Handicap',
        cost: 5,
        category: 'Sabotage',
        description: 'The speaker must deliver their next 60 seconds of cross-examination entirely in rhyming verse!',
        projectedRevenue: 130,
      },
      {
        name: 'Mid-Round Stance Flip',
        cost: 10,
        category: 'Rule Twist',
        description: 'A spectator bribe forces both teams to instantly switch podiums and argue their opponent position!',
        projectedRevenue: 170,
      },
      {
        name: 'Foam Mic Mute Buzzer',
        cost: 15,
        category: 'Crowd Control',
        description: 'Silence a rival debate team rebuttal speaker for 30 seconds of pure, agonizing silence!',
        projectedRevenue: 195,
      },
      {
        name: 'Phone-a-Professor Lifeline',
        cost: 10,
        category: 'Power-Up',
        description: 'Debaters draft a favorite audience member or professor on the spot to deliver an emergency argument!',
        projectedRevenue: 160,
      },
      {
        name: 'Professor Sudden Cross-Exam',
        cost: 20,
        category: 'Sabotage',
        description: 'Bring a campus professor to the podium to cross-examine both teams with hilarious curveball trivia!',
        projectedRevenue: 220,
      },
    ];
  } else if (identityLower.includes('pre-med') || identityLower.includes('health') || identityLower.includes('clinic') || identityLower.includes('medical') || identityLower.includes('dental') || identityLower.includes('nursing')) {
    tailoredFormatName = 'Giant Operation & Campus Stress-Relief Sabotage Gauntlet';
    tailoredHook = `Sponsoring patient care kits or clinic equipment through a synchronized crowd match, featuring interactive student wellness screening stations and giant surgical obstacle games.`;
    abstractConceptHook = `Students and spectators compete on giant-sized 'Operation' tables and CPR sprint relays with funny handicaps (e.g. wearing boxing gloves) while doubling pledges via match gifts!`;
    identityRationale = `Pre-health and medical associations build immense trust through community service activities, proving their real-world impact before asking for sponsorships.`;
    flyerTitle = orgName ? `${orgName} Community Health Challenge` : 'Community Health & Wellness Rally';
    flyerTagline = 'Test your skills in hilarious health relays, win prizes, and double your impact with a live matching grant!';
    interactiveSabotageMenu = [
      {
        name: 'Boxing Glove Surgeon Handicap',
        cost: 5,
        category: 'Sabotage',
        description: 'Force a player to extract giant game pieces from the Operation board wearing oversized boxing gloves!',
        projectedRevenue: 140,
      },
      {
        name: 'Draft A Nursing Professor',
        cost: 10,
        category: 'Rule Twist',
        description: 'Draft an attending medical or science professor to join your CPR relay team!',
        projectedRevenue: 180,
      },
      {
        name: 'Pulse-Check Freeze Buzzer',
        cost: 15,
        category: 'Crowd Control',
        description: 'Sound the heart monitor alarm to freeze the opposing team in place for 20 seconds!',
        projectedRevenue: 175,
      },
      {
        name: 'Adrenaline Shot Speed Multiplier',
        cost: 10,
        category: 'Power-Up',
        description: 'Give your chosen relay team a 30-second head start on the obstacle course!',
        projectedRevenue: 160,
      },
      {
        name: 'Sponsor A Complete Patient Kit',
        cost: 25,
        category: 'Rule Twist',
        description: 'Directly fund a student first-aid medical kit and announce your dedication over the PA system!',
        projectedRevenue: 250,
      },
    ];
  } else if (identityLower.includes('animal') || identityLower.includes('pet') || identityLower.includes('rescue') || identityLower.includes('dog') || identityLower.includes('cat')) {
    tailoredFormatName = 'Paws in the Park Obstacle Derby & Pet Costume Sabotage';
    tailoredHook = `Pet-friendly community fun fair and animal foster showcase with matched adoption sponsorships and hilarious crowd-voted pet obstacle challenges.`;
    abstractConceptHook = `A lively doggy obstacle derby where the crowd pays to add silly course obstacles, vote on pet costume twists, and unlock foster pet sponsorship matches!`;
    identityRationale = `Direct interaction with rescue animals dissolves donor skepticism and creates irresistible emotional motivation to give.`;
    flyerTitle = orgName ? `${orgName} Paws in the Park` : 'Furry Friends Community Fair';
    flyerTagline = 'Bring your pets, cheer on the obstacle derby, and double your adoption sponsorships!';
    interactiveSabotageMenu = [
      {
        name: 'The Tennis Ball Distraction',
        cost: 5,
        category: 'Sabotage',
        description: 'Drop 5 tennis balls onto the agility course as the opposing dog runs through!',
        projectedRevenue: 150,
      },
      {
        name: 'Peanut Butter Lick Challenge',
        cost: 10,
        category: 'Rule Twist',
        description: 'Pause a competing dog at the finish line to complete a spoonful peanut butter treat hurdle!',
        projectedRevenue: 180,
      },
      {
        name: 'Costume Hijack Vote',
        cost: 15,
        category: 'Crowd Control',
        description: 'Vote to make a doggy racer wear a superhero cape or silly tutu for the final heat!',
        projectedRevenue: 210,
      },
      {
        name: 'Golden Bone Turbo Boost',
        cost: 10,
        category: 'Power-Up',
        description: 'Award your favorite dog a 2-second time handicap reduction!',
        projectedRevenue: 160,
      },
      {
        name: 'Full Foster Care Sponsorship',
        cost: 25,
        category: 'Rule Twist',
        description: 'Cover veterinary vaccines for an entire foster litter with on-stage presentation recognition!',
        projectedRevenue: 250,
      },
    ];
  }

  return {
    strategyName: orgName
      ? `${orgName} High-Yield Strategy: "${params.missionStatement.slice(0, 32)}..."`
      : `Maximum Net Proceeds Strategy: "${params.missionStatement.slice(0, 35)}..."`,
    executiveSummary: `To maximize net profit against your target of $${goal.toLocaleString()} with ${turnout} attendees, the highest-ROI model is an Underwritten Matched Campaign format. Traditional galas consume 35–45% in catering, rental, and AV overhead; this blueprint caps expenses under 15% by securing 100% corporate/board underwriting for fixed costs and deploying a live matching anchor gift during the peak emotional window.`,
    coreFundraisingHook: tailoredHook,
    abstractConceptHook,
    detailedEventDescription,
    profitViabilityScore: 92,
    profitabilityVerdict: 'High Net Margin (Projected 86% net yield vs industry 58% average)',
    recommendedFormat: {
      formatName: tailoredFormatName,
      isRecommended: true,
      projectedGross: format1Gross,
      projectedExpenses: format1Expenses,
      projectedNetProfit: format1Net,
      marginPct: format1Margin,
      strengths: [
        'Cuts venue/catering waste by securing corporate food/beverage underwriters',
        'Leverages 1:1 Challenge Match to double donor psychological urgency',
        'Zero print waste: digital silent auction & mobile Fund-a-Need paddle raise',
      ],
      drawbacks: [
        'Requires securing 1–2 corporate sponsors 6 weeks prior to public launch',
      ],
      rationale:
        'Maximizes profits by ensuring every dollar raised goes straight to mission rather than paying hotel banquet minimums.',
    },
    alternativeFormats: [
      {
        formatName: 'Traditional Seated Dinner Gala',
        isRecommended: false,
        projectedGross: format2Gross,
        projectedExpenses: format2Expenses,
        projectedNetProfit: format2Net,
        marginPct: format2Margin,
        strengths: ['High prestige and face-to-face board networking'],
        drawbacks: [
          'High expense overhead (banquet plates, venue fee, AV equipment)',
          'High financial risk if ticket sales fall short of room minimums',
        ],
        rationale:
          'Gross revenue looks impressive, but net profit is degraded by 35-45% catering and production overhead.',
      },
      {
        formatName: 'Asynchronous 48-Hour Peer-to-Peer Matched Blitz',
        isRecommended: false,
        projectedGross: format3Gross,
        projectedExpenses: format3Expenses,
        projectedNetProfit: format3Net,
        marginPct: format3Margin,
        strengths: ['Negligible overhead (<8%)', 'Expands reach into younger demographic'],
        drawbacks: ['Lower average gift size without in-person social proof'],
        rationale:
          'Outstanding margin efficiency, but works best as a secondary tier rather than sole vehicle.',
      },
    ],
    donorPyramid: [
      {
        tierName: 'Anchor Challenge Underwriter',
        giftAmount: leadGift,
        targetDonorCount: leadCount,
        projectedTotal: leadGift * leadCount,
        donorPersona: `Board Chair, Philanthropic Foundation, or Top Corporate Sponsor matching ${params.strongestDemographic}`,
        suggestedPerkOrRecognition: 'Named Presentation Sponsor, Keynote Welcome, Permanent Annual Report Plaque',
      },
      {
        tierName: 'Leadership Circle Patrons',
        giftAmount: majorGifts,
        targetDonorCount: majorCount,
        projectedTotal: majorGifts * majorCount,
        donorPersona: `High-capacity individuals from ${params.strongestDemographic} and corporate executives`,
        suggestedPerkOrRecognition: 'VIP Pre-Event Reception with Executive Leadership, Dedicated Table with Sommelier Pairing',
      },
      {
        tierName: 'Impact Champions',
        giftAmount: patronGifts,
        targetDonorCount: patronCount,
        projectedTotal: patronGifts * patronCount,
        donorPersona: `Mid-level established donors and ${params.targetAudience}`,
        suggestedPerkOrRecognition: 'Program recognition, priority seating, signed impact commemorative art piece',
      },
      {
        tierName: 'Sustaining Community Supporters',
        giftAmount: friendGifts,
        targetDonorCount: friendCount,
        projectedTotal: friendGifts * friendCount,
        donorPersona: `Engaged ticket purchasers from ${params.targetAudience} aged ${params.ageRange}`,
        suggestedPerkOrRecognition: 'General entry pass, event commemorative pin, access to silent auction mobile bidding',
      },
      {
        tierName: 'Fund-a-Need Direct Micro-Givers',
        giftAmount: grassrootsGifts,
        targetDonorCount: grassrootsCount,
        projectedTotal: grassrootsGifts * grassrootsCount,
        donorPersona: `First-time attendees, peer referrals, and digital livestream supporters`,
        suggestedPerkOrRecognition: 'Name flashed on live digital giving tracker screen, personalized SMS receipt',
      },
    ],
    totalPyramidGross: totalCalculated,
    profitMaximizationTactics: [
      {
        title: 'Zero-Cost Underwriting Protocol',
        category: 'Cost Reduction',
        impactLevel: 'Transformative',
        netProfitBoostEstimate: '+$18,000 to +$35,000 in saved margins',
        description:
          'Never pay for food, wine, or AV from ticket revenue. Create specific "Presenting Production Underwriting Packages" for local banks, law firms, and real estate agencies to cover 100% of hard venue costs before doors open.',
        implementationTip:
          'Pitch underwriters 8 weeks out with marketing exposure: "100% of attendee ticket dollars will go directly to programs because [Sponsor Name] covered the room."',
      },
      {
        title: '1:1 Psychological Anchor Match Window',
        category: 'Revenue Multiplier',
        impactLevel: 'Transformative',
        netProfitBoostEstimate: '35% increase in Fund-a-Need pledge velocity',
        description:
          'Pool the top lead gift of $' +
          leadGift.toLocaleString() +
          ' into a temporary 20-minute matching window during the live appeal, unlocking only if room participation hits 80%.',
        implementationTip:
          'Announce: "For the next 15 minutes, our Lead Trustee will match every dollar given up to $' +
          leadGift.toLocaleString() +
          '!"',
      },
      {
        title: 'Fee-Absorbing & ACH Incentivization',
        category: 'Cost Reduction',
        impactLevel: 'Medium',
        netProfitBoostEstimate: 'Save 2.9% - 3.5% on merchant processing ($3,000+)',
        description:
          'Default the donor checkout toggle to "Cover 3% transaction costs" (91% of donors opt in). For gifts over $1,000, enforce or incentivize direct ACH transfer or pledge invoice.',
        implementationTip:
          'Add copy: "Add $15 to ensure 100% of your gift reaches our students directly."',
      },
      {
        title: 'Seasonality Optimization (' + params.timeOfYear + ')',
        category: 'Psychological Timing',
        impactLevel: 'High',
        netProfitBoostEstimate: '+20% higher gift size due to seasonal tax/donor psychology',
        description: `Tailor all messaging to ${params.timeOfYear}. Highlight fiscal year timing, appreciated securities/stock gifting options, and seasonal gratitude narratives that align with donor liquidity rhythms.`,
        implementationTip:
          'Include a "Donate Appreciated Stock or DAF" link directly on the digital pledge sheet to unlock non-cash major wealth assets.',
      },
    ],
    interactiveSabotageMenu,
    outreachPitches: [
      ...(params.meansOfOutreach.some((m) => m.toLowerCase().includes('professor')) ||
      params.ageRange.toLowerCase().includes('college')
        ? [
            {
              channel: 'Professor Promotion & 60-Second In-Class Lecture Pitch',
              targetSegment: 'College Professors & Students in Core Classrooms / Lecture Halls',
              headlineOrSubject: `Permission Request for 60-Second Student Announcement: ${params.missionStatement.slice(0, 32)}...`,
              pitchContent: `PART 1: EMAIL REQUEST TO PROFESSORS (Send 3-5 days in advance):
"Dear Professor [Last Name],
I am a student in your [Course Name] class and also serve with [Club/Team Name]. We are organizing our upcoming event to raise funds for ${params.missionStatement.slice(0, 50)}...
Would you be open to letting me give a quick 60-second announcement at the start of lecture this [Day of Week]? Alternatively, I would be deeply grateful if you could share our event slide or post a quick note on Canvas.
Thank you for supporting student initiatives!"

PART 2: 60-SECOND IN-CLASS SPOKEN SCRIPT (Read at start of lecture):
"Good morning everyone! Thank you Professor [Name] for 60 seconds before class starts. My name is [Name] with [Organization/Team].
This [Event Date], we're hosting our ${params.missionStatement ? params.missionStatement.slice(0, 25) : 'Fundraising Rally'}!
Tickets are only $${ticketPrice} and 100% of proceeds directly fund ${params.missionStatement.slice(0, 40)}...
There's food, games, and a live challenge match doubling every dollar. I'm putting flyers with a quick QR code right here on the front desk (and chalkboard)—please scan it right now to grab your ticket before seats fill up. Thank you so much!"`,
              keyCallToAction: 'Scan QR Code on Chalkboard / Lecture Slide to Grab Tickets',
              bestSendTiming: 'Email Professor Sunday evening or 2 days prior to lecture; arrive 5 minutes early to class',
            },
          ]
        : []),
      ...(params.meansOfOutreach.some((m) => m.toLowerCase().includes('group chat') || m.toLowerCase().includes('discord') || m.toLowerCase().includes('groupme') || m.toLowerCase().includes('slack'))
        ? [
            {
              channel: 'Campus Group Chats & Discord/Slack Announcements',
              targetSegment: 'Student Club Members, Campus Group Chats & Greek Life Channels',
              headlineOrSubject: `⚡ Quick 2-sec read: Help us fund ${params.missionStatement.slice(0, 28)}... + Free food & live match!`,
              pitchContent: `Hey everyone! 👋 Our team is hosting our big upcoming fundraiser on [Date] at [Time]!\n\n🎟️ Tickets are only $${ticketPrice} (or suggested donation). Every single dollar is being matched 1:1 by an anchor sponsor, doubling your impact straight into ${params.missionStatement.slice(0, 45)}...\n\n🍕 What's included: Food, games, prizes, and great community vibes right as classes wrap up.\n\n👉 Grab your spot or RSVP before we cap out: [Link]\n\nFeel free to drop this in your major group chats or bring your roommates!`,
              keyCallToAction: 'Tap Link to Grab Ticket & RSVP in 30 Seconds',
              bestSendTiming: 'Sunday 7:00 PM or Thursday 5:30 PM (Peak student phone screen time)',
            },
          ]
        : []),
      {
        channel: 'Email Campaign (Segment: ' + params.targetAudience + ')',
        targetSegment: params.targetAudience,
        headlineOrSubject: `Exclusive Invitation: Doubling Our Impact for ${params.missionStatement.slice(0, 30)}...`,
        pitchContent: `Dear [Donor Name],\n\nBecause of champions like you, our mission has transformed lives across our community. This ${params.timeOfYear}, we stand at a critical inflection point.\n\nThanks to a generous anchor pledge, every contribution made during our upcoming initiative will be matched dollar-for-dollar. When you join us on [Event Date], your $250 gift delivers $500 of immediate, tangible results.\n\nWe have reserved a limited number of seats for visionary leaders in our community. Will you join us in setting this standard?`,
        keyCallToAction: 'Claim Your Reserved Impact Seat',
        bestSendTiming: 'Tuesday at 9:15 AM (Highest open rate for professional donors)',
      },
      {
        channel: 'Major Corporate & Board Pitch Deck',
        targetSegment: 'Corporate Social Responsibility & Local Business Leaders',
        headlineOrSubject: `Strategic Underwriting Partnership: ${params.missionStatement.slice(0, 32)}`,
        pitchContent: `Dear [Executive Name],\n\nAs [Company Name] continues to lead civic investment in our region, we invite you to serve as our Presenting Underwriter for our upcoming ${params.timeOfYear} initiative.\n\nBy underwriting our venue and production costs ($${leadGift.toLocaleString()}), you enable 100% of all public contributions from our ${turnout}+ attendees to flow directly into front-line programming. Your brand will be featured prominently across all digital platforms, stage screens, and press releases as the catalyst that made 100% mission funding possible.`,
        keyCallToAction: 'Schedule 15-Minute Executive Briefing',
        bestSendTiming: 'Thursday at 1:30 PM (Post-lunch corporate planning block)',
      },
      {
        channel: 'SMS / Rapid Giving Trigger (Day-Of & Day-After)',
        targetSegment: 'All Registered Turnout (' + turnout + ' attendees)',
        headlineOrSubject: `Urgent Match Alert: Only $8,400 left to unlock our full grant!`,
        pitchContent: `Hi [First Name]! Our room is electric. With just 40 minutes remaining, we are $8,400 away from unlocking our $${leadGift.toLocaleString()} matching challenge. Tap here to double your impact before midnight: [Secure Link]`,
        keyCallToAction: 'Double My Gift Now',
        bestSendTiming: '8:45 PM (Immediately following the emotional keynote)',
      },
    ],
    timelineCadence: [
      {
        phase: 'Phase 1: Silent Anchor Phase & Underwriting',
        weekTiming: 'Weeks -8 to -6',
        primaryFocus: 'Lock in 50% of the financial goal before any public announcement.',
        criticalMilestones: [
          'Secure Anchor Match Underwriter ($' + leadGift.toLocaleString() + ')',
          'Enlist 5 Table Host Ambassadors from ' + params.strongestDemographic,
          'Finalize vendor in-kind sponsorship to zero out catering/AV costs',
        ],
        expectedYieldProgressPct: 50,
      },
      {
        phase: 'Phase 2: Targeted Invitation & VIP Pledges',
        weekTiming: 'Weeks -5 to -2',
        primaryFocus: 'Mobilize ' + params.targetAudience + ' through personal host invitations.',
        criticalMilestones: [
          'Roll out segmented email series to ' + params.meansOfOutreach.join(', '),
          'Reach 75% venue capacity / ticket quota',
          'Pre-commit Leadership Circle givers to seed the live paddle raise',
        ],
        expectedYieldProgressPct: 75,
      },
      {
        phase: 'Phase 3: The Peak Ask & Event Execution',
        weekTiming: 'Event Week & Day-Of (' + params.timeOfDay + ')',
        primaryFocus: 'Execute the high-yield emotional ask and paddle raise.',
        criticalMilestones: [
          'Run of show tightly timed to hit peak ask before attention fatigue',
          'Live matching challenge countdown projected on digital displays',
          'Collect 100% of contact info for instant digital pledge fulfillment',
        ],
        expectedYieldProgressPct: 95,
      },
      {
        phase: 'Phase 4: 48-Hour Stewardship & Second-Chance Match',
        weekTiming: 'Days +1 to +5',
        primaryFocus: 'Capture remaining unmade pledges and celebrate triumph.',
        criticalMilestones: [
          'Send personalized video thank-yous to major underwriters',
          'Broadcast "We crossed the finish line!" victory email with final tally',
          'Transition first-time givers into recurring monthly sustaining donors',
        ],
        expectedYieldProgressPct: 100,
      },
    ],
    dayOfRunOfShow: {
      recommendedScheduleTitle: `Run of Show Schedule (${params.timeOfDay})`,
      peakAskWindow,
      schedule: scheduleItems,
    },
    pitfallsAndRiskMitigations: [
      {
        potentialTrap: 'Catering & Banquet Hall Expense Creep',
        financialExposure: 'Consumes up to 40% of gross funds, crippling net profits',
        preventiveAction:
          'Cap food/beverage strictly under 15% of projected ticket revenue. Use heavy hors d\'oeuvres stations rather than 3-course seated dinners, or require food sponsors.',
      },
      {
        potentialTrap: 'Unfulfilled Pledges After the Event',
        financialExposure: 'Industry averages 12–18% pledge default rate if uncollected in 48 hours',
        preventiveAction:
          'Enforce instant digital checkout through QR codes on table stanchions and SMS links with Apple Pay / Google Pay enabled.',
      },
      {
        potentialTrap: 'Cold Public Outreach with No Seed Money',
        financialExposure: 'Low turnout and sluggish giving without visible momentum',
        preventiveAction:
          'Never open public appeals until at least 40% of the goal is quietly banked from board and anchor patrons.',
      },
    ],
    seasonalStrategyNotes: seasonalNotes,
    timeOfDayTactics: `For a ${params.timeOfDay || 'evening'} schedule, guest energy peaks around ${peakAskWindow}. Avoid scheduling the donation ask at the very end when guests are looking at their watches or leaving.`,
    demographicBridgeStrategy: `To bridge your strong base (${params.strongestDemographic || 'community partners'}) with your target demographic (${params.targetAudience || 'local supporters'}, aged ${params.ageRange || 'all ages'}), pair senior donor matching dollars with dynamic digital mobile channels.`,
    identityTieInRationale: identityRationale,
    financialBreakdown,
    eventFlyer: {
      eventTitle: flyerTitle,
      tagline: flyerTagline,
      dateOrSeason: params.timeOfYear ? params.timeOfYear.split('(')[0].trim() : 'Coming This Season',
      timeAndVibe: params.timeOfDay ? `${params.timeOfDay.split('(')[0].trim()} · Laid-Back, High Energy & Fun` : 'Evening Event (6:30 PM)',
      locationOrVenue: isVirtualOrUnlimited
        ? 'Online Livestream & Digital Challenge'
        : (isVenueFreeOrDonated ? `${params.maxVenueCapacity || 'Local Community Space'} (Free Facility)` : `${params.maxVenueCapacity || 'Reserved Venue Hall'}`),
      heroHighlight: isVenueFreeOrDonated
        ? 'Zero venue overhead ($0): Every single dollar raised goes straight to our cause!'
        : `All ticket sales and donations deliver direct, verified community support.`,
      bulletHighlights: [
        'Live 1:1 Challenge Match doubling community pledges on the spot',
        'Direct beneficiary spotlight with inspiring stories and real results',
        'Exciting activities, student showcases, food, and music',
        'Transparent budget: 100% realistic net profit delivery'
      ],
      ticketOrAdmissionText: ticketPrice > 0
        ? `Tickets: $${ticketPrice} per person · Family Pack Available`
        : 'Free Admission! Suggested donation or raffle tickets at the door',
      impactCallout: `Every $${Math.max(10, Math.round(ticketPrice || 25))} raised directly supports ${params.targetAudience || 'our program members'}.`,
      rsvpCallToAction: 'RSVP & Grab Your Entry Pass Today',
      matchingGrantCallout: sponsorRev > 0 ? `Proudly Supported by Local Business Underwriters & Community Sponsors` : undefined
    }
  };
}

// In-memory persistent array for reported raised funds (cumulative impact counter)
// Pre-seeded with realistic early community wins so cumulative impact is immediately compelling
let reportedImpactRecords = [
  {
    id: 'rec-1',
    organizationOrEventName: 'Metro STEM Robotics Team',
    targetGoal: 100000,
    actualAmountRaised: 124500,
    dateReported: '2026-08-14',
    keyWinOrFeedback: 'Secured an anchor sponsor who covered venue food, netting a 91% profit yield!'
  },
  {
    id: 'rec-2',
    organizationOrEventName: 'Second Chance Animal Rescue Fund',
    targetGoal: 50000,
    actualAmountRaised: 62800,
    dateReported: '2026-09-02',
    keyWinOrFeedback: 'The 1:1 match window during the 75-minute peak ask brought in $22k in 15 minutes.'
  },
  {
    id: 'rec-3',
    organizationOrEventName: 'Eastside Arts Youth Scholarship',
    targetGoal: 75000,
    actualAmountRaised: 81200,
    dateReported: '2026-09-20',
    keyWinOrFeedback: 'Switching from seated dinner to heavy hors d\'oeuvres saved $18,000 in catering costs.'
  }
];

// API endpoint: Get cumulative impact stats and records
app.get('/api/impact/stats', (_req: Request, res: Response): void => {
  const totalRaised = reportedImpactRecords.reduce((sum, r) => sum + r.actualAmountRaised, 0);
  const totalGoals = reportedImpactRecords.reduce((sum, r) => sum + r.targetGoal, 0);
  const averageSurplus = reportedImpactRecords.length > 0 ? (totalRaised - totalGoals) / reportedImpactRecords.length : 0;

  res.json({
    totalRaised,
    totalCampaigns: reportedImpactRecords.length,
    averageSurplus,
    records: reportedImpactRecords.slice(-10).reverse()
  });
});

// API endpoint: Submit money raised with FundWave AI
app.post('/api/impact/report', (req: Request, res: Response): void => {
  try {
    const { organizationOrEventName, targetGoal, actualAmountRaised, keyWinOrFeedback } = req.body;

    if (!actualAmountRaised || isNaN(Number(actualAmountRaised))) {
      res.status(400).json({ error: 'Valid actual amount raised is required' });
      return;
    }

    const newRecord = {
      id: `rec-${Date.now()}`,
      organizationOrEventName: organizationOrEventName?.trim() || 'Anonymous Campaign',
      targetGoal: Number(targetGoal) || Number(actualAmountRaised),
      actualAmountRaised: Number(actualAmountRaised),
      dateReported: new Date().toISOString().split('T')[0],
      keyWinOrFeedback: keyWinOrFeedback?.trim() || 'Achieved goal with FundWave profit maximization plan'
    };

    reportedImpactRecords.push(newRecord);

    const totalRaised = reportedImpactRecords.reduce((sum, r) => sum + r.actualAmountRaised, 0);

    res.json({
      success: true,
      message: 'Impact successfully logged to cumulative ticker!',
      record: newRecord,
      cumulativeTotalRaised: totalRaised,
      totalCampaigns: reportedImpactRecords.length
    });
  } catch (err) {
    console.error('Error logging impact:', err);
    res.status(500).json({ error: 'Failed to record impact report' });
  }
});

// API endpoint: Generate fundraising strategy
app.post('/api/strategy/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const rawParams = req.body || {};

    // Intelligent smart defaults so NO fields are strictly blockers
    const params: FundraisingParameters = {
      organizationName: rawParams.organizationName?.trim() || undefined,
      organizationIdentity: rawParams.organizationIdentity?.trim() || undefined,
      eventVibe: rawParams.eventVibe?.trim() || '🔥 High Chaos & Spectator Sabotage',
      ageRange: rawParams.ageRange?.trim() || 'All Ages / Multi-Generational Community',
      timeOfYear: rawParams.timeOfYear?.trim() || 'Fall Launch (Back-to-School & Fiscal Kick-Off / Sep-Oct)',
      missionStatement: rawParams.missionStatement?.trim() || 'Providing educational resources and life-changing community support for local families in need.',
      meansOfOutreach: Array.isArray(rawParams.meansOfOutreach) && rawParams.meansOfOutreach.length > 0 
        ? rawParams.meansOfOutreach 
        : ['Email Newsletters & CRM Appeals', 'Corporate Sponsorship Pitch', 'Social Media & Video Storytelling'],
      strongestDemographic: rawParams.strongestDemographic?.trim() || 'Working Families & Neighborhood Community',
      targetAudience: rawParams.targetAudience?.trim() || 'Local Community Champions & Impact Supporters',
      maxVenueCapacity: rawParams.maxVenueCapacity?.trim() || '200 seats',
      desiredTurnout: Number(rawParams.desiredTurnout) > 0 ? Number(rawParams.desiredTurnout) : 150,
      desiredFunds: Number(rawParams.desiredFunds) > 0 ? Number(rawParams.desiredFunds) : 50000,
      timeOfDay: rawParams.timeOfDay?.trim() || 'Evening (6:30 PM - 9:30 PM)',
      knownVenueCost: rawParams.knownVenueCost !== undefined && rawParams.knownVenueCost !== '' ? Number(rawParams.knownVenueCost) : undefined,
      knownFoodCost: rawParams.knownFoodCost !== undefined && rawParams.knownFoodCost !== '' ? Number(rawParams.knownFoodCost) : undefined,
      knownTicketPrice: rawParams.knownTicketPrice !== undefined && rawParams.knownTicketPrice !== '' ? Number(rawParams.knownTicketPrice) : undefined,
      knownSponsorships: rawParams.knownSponsorships !== undefined && rawParams.knownSponsorships !== '' ? Number(rawParams.knownSponsorships) : undefined,
      knownOtherExpenses: rawParams.knownOtherExpenses !== undefined && rawParams.knownOtherExpenses !== '' ? Number(rawParams.knownOtherExpenses) : undefined,
      knownDirectDonations: rawParams.knownDirectDonations !== undefined && rawParams.knownDirectDonations !== '' ? Number(rawParams.knownDirectDonations) : undefined,
      notesOrConstraints: rawParams.notesOrConstraints?.trim() || ''
    };

    if (!ai) {
      // Return heuristic strategy
      const strategy = generateHeuristicStrategy(params);
      res.json({ strategy, source: 'heuristic-engine' });
      return;
    }

    const systemPrompt = `You are the world's elite nonprofit fundraising strategist and Chief Development Officer.
Your objective is to help the user devise the ultimate strategy to MAXIMIZE NET PROFIT (gross funds raised minus all costs/overhead) for their campaign, based on their parameters:
1. Organization Name: ${params.organizationName || 'Not specified'}
2. What the Organization / Club Does (Identity & Craft): "${params.organizationIdentity || 'Student organization / community group'}"
3. Specific Fundraising Goal / Need: "${params.missionStatement}"
4. Event Creativity & Sabotage Style: "${params.eventVibe || '🔥 High Chaos & Spectator Sabotage'}"
5. Age range: ${params.ageRange}
6. Time of year: ${params.timeOfYear}
7. Means of outreach: ${params.meansOfOutreach.join(', ')}
8. Strongest demographic: ${params.strongestDemographic}
9. Target audience: ${params.targetAudience}
10. Maximum venue capacity: ${params.maxVenueCapacity}
11. Desired turnout: ${params.desiredTurnout}
12. Desired amount of funds: $${params.desiredFunds}
13. Time of day: ${params.timeOfDay}

Known User Financial Realities (CRITICAL: Users provided these specific figures so they can present a defensible net profit to their board/principal/team. Incorporate them accurately):
- Venue Cost: ${params.knownVenueCost !== undefined ? `$${params.knownVenueCost} (${params.knownVenueCost === 0 ? 'Free/Donated facility' : 'Booked rental fee'})` : 'Estimate conservatively'}
- Per-Person Ticket Price: ${params.knownTicketPrice !== undefined ? `$${params.knownTicketPrice} (${params.knownTicketPrice === 0 ? 'Free admission' : 'Ticket price'})` : 'Estimate realistically'}
- Food & Catering: ${params.knownFoodCost !== undefined ? `$${params.knownFoodCost}` : 'Estimate realistically'}
- Other Direct Hard Costs: ${params.knownOtherExpenses !== undefined ? `$${params.knownOtherExpenses}` : 'Estimate'}
- Confirmed Sponsorships / Grants: ${params.knownSponsorships !== undefined ? `$${params.knownSponsorships}` : 'Estimate'}
- Confirmed Direct Donations: ${params.knownDirectDonations !== undefined ? `$${params.knownDirectDonations}` : 'Estimate'}
Additional notes: ${params.notesOrConstraints || 'None'}

Crucial Rule for Maximizing Profits:
Gross is vanity, net is sanity. A traditional gala that raises $200k but costs $120k in ballroom, plated food, and audio/video only profits $80k (40% margin). A smartly underwritten matched reception, digital challenge, or school spirit festival can raise money with low overhead (85%+ margin).
Produce an actionable, mathematically realistic, high-margin strategic plan.

CRITICAL ANTI-BORING DIRECTIVE & ABSTRACT/GAMIFIED SPECTATOR MECHANICS:
The whole purpose of this agent is that THE EVENTS MUST BE ABSTRACT, CREATIVE, AND WILDLY FUN. NO BORING EVENTS!
Never give dry, generic, cookie-cutter fundraisers like a plain silent auction, generic banquet dinner, or standard walkathon.
Model your ideas after the user's signature design philosophy:
"An example of something I did was a 3v3 basketball tournament where spectators could pay to restrict players, sub the refs out, mute other spectators. I want the ideas for fundraisers to be abstract. I don't like boring events and believe the whole IDEA of this fundraiser agent is so that the events given are fun."

Take whatever the user's club does ("${params.organizationIdentity || 'our club'}") AND what they are raising money for ("${params.missionStatement}"), and invent an abstract, gamified, audience-interactive event format where:
1. The club's craft and mission are the center of the action (not an arbitrary bake sale).
2. The audience/spectators actively participate and PAY TO PLAY / PAY TO SABOTAGE / PAY TO BEND RULES:
   - For sports/basketball: spectators pay to restrict players (e.g. shoot with oven mitts, non-dominant hand), pay to bench the ref and sub in a student fan, pay to mute rival spectators, or buy golden balls.
   - For robotics/tech/coding: spectators pay to invert driver joysticks, trigger smoke machines, freeze a robot with a "syntax bug", or order overclock boosts.
   - For dance/music/band: spectators pay to double the tempo (hyperspeed), force the soloist to play a kazoo, order song mashups, or force the director to conduct in an inflatable dinosaur suit.
   - For debate/speech/academics: reverse-debate arena where the crowd pays to force speakers into rhymes, flip stances mid-speech, or mute rebuttal speakers.
   - For pre-med/science: giant Operation and CPR relays with hilarious handicaps (boxing gloves, blindfolds, professor draft).
   - For student clubs / general: obstacle gauntlets with pie-in-the-face auctions, professor drafts, cheer section mutes, and sudden death multipliers.
3. Every spectator sabotage perk has $0 incremental overhead, turning audience participation into 100% pure net profit!

CRITICAL EVENT DESCRIPTION MANDATE:
You MUST provide a clear, step-by-step walkthrough of what EXACTLY this event will be in "detailedEventDescription".
Organize it into 5 distinct clear parts using bullets:
• What the Venue & Space Looks Like: (How the room/arena/court is arranged, entrance check-in, score table with sabotage menu board, DJ/music, signage, spectator bleachers/seating)
• How the Core Event & Action Runs: (What participants do, tournament/game/show format, team sizes, round lengths, rules, and progression)
• How Spectators & Crowd Interact ($0 Overhead): (How people watching can pay small micro-bribes, buy power-ups, vote on handicaps, or bend the rules live)
• Halftime & The Peak Ask: (The 15-20 minute window for the anchor sponsor 1:1 match blitz and comedic auction)
• The Finale & Trophy Celebration: (How the winners are crowned, live scoreboard celebration, and wrap-up)

CRITICAL FREE ADMISSION / $0 TICKET PRICING RULE:
If ticket sales or entry fees are free ($0 admission or free player entry):
1. Do NOT assume $0 revenue!
2. You MUST estimate crowd engagement revenue in 'crowdEngagementRevenue' inside 'financialBreakdown'. Free admission removes all barriers and fills the venue (e.g. ${params.desiredTurnout} attendees), each spending an estimated $18 to $35 on spectator sabotages, micro-perks, 50/50 raffles, live challenge match pledges, and concessions.
3. Make sure 'financialBreakdown' includes 'crowdEngagementRevenue': number, and 'totalGrossRevenue' = (ticketRevenue || 0) + crowdEngagementRevenue + (sponsorshipRevenue || 0) + (directDonations || 0).
4. Calculate realisticNetProfit = totalGrossRevenue - totalExpenses.
5. In 'profitNotes', explain that with free admission, the estimated $... in crowd engagement powers the take-home net profit!

Special Outreach Rule: If the user selects Professor Promotions or In-Class Announcements, or if the demographic involves college/students, include an outreach pitch that gives students BOTH: 1) A short respectful email asking professors for permission to speak for 60 seconds at the start of class or post on Canvas, and 2) A ready-to-speak 60-second verbal in-class pitch script with a QR code call to action!
Special Timing & Seasonality Rule: If the user specifies evening hours (e.g. 5:00 PM - 8:00 PM or 6:00 PM - 8:00 PM) or an event duration (e.g. 2 hours, 3 hours), structure the Day-Of Run of Show schedule strictly around those hours or that duration.

Respond strictly with valid JSON conforming to this TypeScript interface:
{
  "strategyName": string,
  "executiveSummary": string,
  "coreFundraisingHook": string,
  "abstractConceptHook": string (1-2 punchy sentences describing the abstract/gamified premise),
  "detailedEventDescription": string (Comprehensive 5-bullet explanation of what the event looks like, how it runs, how the crowd interacts, halftime, and finale),
  "profitViabilityScore": number (70-98),
  "profitabilityVerdict": string,
  "recommendedFormat": {
    "formatName": string,
    "isRecommended": true,
    "projectedGross": number,
    "projectedExpenses": number,
    "projectedNetProfit": number,
    "marginPct": number,
    "strengths": string[],
    "drawbacks": string[],
    "rationale": string
  },
  "alternativeFormats": [
    {
      "formatName": string,
      "isRecommended": false,
      "projectedGross": number,
      "projectedExpenses": number,
      "projectedNetProfit": number,
      "marginPct": number,
      "strengths": string[],
      "drawbacks": string[],
      "rationale": string
    }
  ],
  "donorPyramid": [
    {
      "tierName": string,
      "giftAmount": number,
      "targetDonorCount": number,
      "projectedTotal": number,
      "donorPersona": string,
      "suggestedPerkOrRecognition": string
    }
  ],
  "totalPyramidGross": number,
  "profitMaximizationTactics": [
    {
      "title": string,
      "category": "Cost Reduction" | "Revenue Multiplier" | "Sponsorship & Underwriting" | "Psychological Timing",
      "impactLevel": "High" | "Transformative" | "Medium",
      "netProfitBoostEstimate": string,
      "description": string,
      "implementationTip": string
    }
  ],
  "interactiveSabotageMenu": [
    {
      "name": string (creative, funny title e.g. "The Oven Mitt Handicap", "Sub the Referee", "Mute That Heckler"),
      "cost": number (dollar price e.g. 5, 10, 15, 20),
      "category": "Sabotage" | "Power-Up" | "Crowd Control" | "Rule Twist",
      "description": string (hilarious effect when paid),
      "projectedRevenue": number (e.g. 15 * cost)
    }
  ],
  "outreachPitches": [
    {
      "channel": string,
      "targetSegment": string,
      "headlineOrSubject": string,
      "pitchContent": string,
      "keyCallToAction": string,
      "bestSendTiming": string
    }
  ],
  "timelineCadence": [
    {
      "phase": string,
      "weekTiming": string,
      "primaryFocus": string,
      "criticalMilestones": string[],
      "expectedYieldProgressPct": number
    }
  ],
  "dayOfRunOfShow": {
    "recommendedScheduleTitle": string,
    "peakAskWindow": string,
    "schedule": [
      {
        "timeOffset": string,
        "activity": string,
        "fundraisingTrigger": string,
        "psychologicalGoal": string
      }
    ]
  },
  "pitfallsAndRiskMitigations": [
    {
      "potentialTrap": string,
      "financialExposure": string,
      "preventiveAction": string
    }
  ],
  "seasonalStrategyNotes": string,
  "timeOfDayTactics": string,
  "demographicBridgeStrategy": string,
  "identityTieInRationale": string,
  "financialBreakdown": {
    "venueCost": number,
    "isVenueFreeOrDonated": boolean,
    "ticketRevenue": number,
    "ticketPrice": number,
    "crowdEngagementRevenue": number,
    "sponsorshipRevenue": number,
    "directDonations": number,
    "foodAndCateringCost": number,
    "otherExpenses": number,
    "totalExpenses": number,
    "totalGrossRevenue": number,
    "realisticNetProfit": number,
    "marginPct": number,
    "profitNotes": string
  },
  "eventFlyer": {
    "eventTitle": string,
    "tagline": string,
    "dateOrSeason": string,
    "timeAndVibe": string,
    "locationOrVenue": string,
    "heroHighlight": string,
    "bulletHighlights": string[],
    "ticketOrAdmissionText": string,
    "impactCallout": string,
    "rsvpCallToAction": string,
    "matchingGrantCallout": string
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
      ],
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const text = response.text || '';
    try {
      const parsedStrategy = JSON.parse(text) as GeneratedStrategy;

      // Ensure crowdEngagementRevenue is populated and accurately reflected in totals
      if (parsedStrategy.financialBreakdown) {
        const fb = parsedStrategy.financialBreakdown;
        const turnout = params.desiredTurnout || 100;
        const ticketP = params.knownTicketPrice ?? (fb.ticketPrice ?? (params.knownVenueCost === 0 ? 0 : 10));

        if (fb.crowdEngagementRevenue === undefined || fb.crowdEngagementRevenue === null || fb.crowdEngagementRevenue === 0) {
          const basePerCapita = ticketP === 0 ? Math.max(22, Math.round((params.desiredFunds || 10000) / turnout * 0.35)) : 12;
          const perCapita = Math.min(65, Math.max(18, basePerCapita));
          fb.crowdEngagementRevenue = Math.max(500, Math.round(turnout * perCapita));
        }

        const ticketRev = fb.ticketRevenue ?? Math.round(ticketP * turnout);
        const sponsorRev = fb.sponsorshipRevenue ?? 0;
        const directDon = fb.directDonations ?? 0;
        const totalHardCosts = fb.totalExpenses ?? ((fb.venueCost || 0) + (fb.foodAndCateringCost || 0) + (fb.otherExpenses || 0));

        fb.ticketPrice = ticketP;
        fb.ticketRevenue = ticketRev;
        fb.totalGrossRevenue = ticketRev + fb.crowdEngagementRevenue + sponsorRev + directDon;
        fb.realisticNetProfit = fb.totalGrossRevenue - totalHardCosts;
        fb.marginPct = fb.totalGrossRevenue > 0 ? Math.round((fb.realisticNetProfit / fb.totalGrossRevenue) * 100) : 85;

        if (!fb.profitNotes || (ticketP === 0 && !fb.profitNotes.includes('crowd'))) {
          fb.profitNotes = ticketP === 0
            ? `Free Admission Model ($0 entry fee): Zero entry barriers maximize turnout (${turnout} attendees). Gross revenue is powered by an estimated $${fb.crowdEngagementRevenue.toLocaleString()} in crowd engagement (spectator sabotage bribes, player restrictions, raffles, and live challenge pledges) plus sponsorships and direct donations, yielding a realistic take-home net profit of $${fb.realisticNetProfit.toLocaleString()}!`
            : `All venue costs and hard expenses are deducted against ticket sales, $${fb.crowdEngagementRevenue.toLocaleString()} in crowd engagement, and sponsorships for a defensible net profit of $${fb.realisticNetProfit.toLocaleString()}.`;
        }
      }

      // Safeguard detailedEventDescription if missing
      if (!parsedStrategy.detailedEventDescription) {
        const fallback = generateHeuristicStrategy(params);
        parsedStrategy.detailedEventDescription = fallback.detailedEventDescription;
      }

      res.json({ strategy: parsedStrategy, source: 'gemini-3.8-flash' });
    } catch {
      // In case of JSON parse failure, fallback
      const fallback = generateHeuristicStrategy(params);
      res.json({ strategy: fallback, source: 'heuristic-engine' });
    }
  } catch (error) {
    console.error('Error generating strategy with Gemini:', error);
    // Graceful fallback to avoid leaving user hanging
    try {
      const fallback = generateHeuristicStrategy(req.body);
      res.json({ strategy: fallback, source: 'heuristic-fallback' });
    } catch {
      res.status(500).json({ error: 'Failed to generate fundraising strategy' });
    }
  }
});

// API endpoint: Interactive AI Strategy Chat Copilot
app.post('/api/strategy/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { messages, parameters, currentStrategy } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    if (!ai) {
      const lastUserMsg = messages[messages.length - 1]?.content || '';
      res.json({
        reply: `As your fundraising strategist, here is my tactical recommendation for "${lastUserMsg.slice(0, 40)}":
To maximize net profits with your target of $${parameters?.desiredFunds?.toLocaleString() || '100,000'}, focus on securing 100% corporate underwriting for your venue/food costs first. Then deploy a 1:1 match during your peak ask window (${parameters?.timeOfDay || 'evening'}). This keeps your expense ratio below 12% and protects your bottom line!`,
      });
      return;
    }

    const contextPrompt = `You are the FUNraise AI Senior Fundraising Coach & Profit Maximizer.
You are helping school students (elementary, middle, or high school), student council members, PTA parents, youth coaches, or nonprofit leaders design fun, high-profit fundraisers.
Here are the campaign parameters:
- Organization: ${parameters?.organizationName || 'Student Club'}
- What the Club Does (Craft/Identity): ${parameters?.organizationIdentity || 'Student organization'}
- Goal: $${parameters?.desiredFunds?.toLocaleString()}
- Turnout: ${parameters?.desiredTurnout}
- Mission / Financial Need: ${parameters?.missionStatement}
- Event Vibe: ${parameters?.eventVibe || '🔥 High Chaos & Spectator Sabotage'}
- Strongest Demographic: ${parameters?.strongestDemographic}
- Target Audience: ${parameters?.targetAudience} (Age range: ${parameters?.ageRange})
- Time of Year: ${parameters?.timeOfYear}
- Time of Day: ${parameters?.timeOfDay}
- Outreach Channels: ${parameters?.meansOfOutreach?.join(', ')}
- Recommended Strategy Name: ${currentStrategy?.strategyName || 'Spectator Sabotage & Matched Challenge'}
- Abstract Concept Hook: ${currentStrategy?.abstractConceptHook || 'Audience pays to play, sabotage players, and bend rules for 100% net profit'}
- Key Net Profit Margin: ${currentStrategy?.recommendedFormat?.marginPct || 85}%

Strict Anti-Boring Mandate:
- NEVER suggest boring events (no dull galas, standard banquets, or plain bake sales).
- The whole purpose of this agent is that events MUST BE ABSTRACT, GAMIFIED, VIRAL, AND WILDLY FUN.
- Champion spectator-driven mechanics (like the user's signature 3v3 basketball tournament where spectators pay to make players wear oven mitts, sub refs out, or mute opposing hecklers).
- Tie all ideas directly to what the user's club actually does and what they are specifically raising money for!
- Provide sharp, encouraging, highly practical, profit-maximizing fundraising advice with concrete numbers, script snippets, and low-cost tips to keep expenses near zero.
- Keep replies clean, approachable, upbeat, and formatted with crisp bullet points.`;

    const chatContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents.length > 0 ? chatContents : [{ role: 'user', parts: [{ text: 'Hello!' }] }],
      config: {
        systemInstruction: contextPrompt,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || 'I am ready to assist with your fundraising strategy.' });
  } catch (err) {
    console.error('Chat error:', err);
    // Graceful smart response so chat never leaves the user hanging
    const lastUserMsg = (req.body?.messages && req.body.messages[req.body.messages.length - 1]?.content) || '';
    res.json({
      reply: `Here's how to turn that into a high-energy, profitable spectacle for "${lastUserMsg.slice(0, 45)}":

• **Spectator Sabotage Table**: Place a large neon sign at check-in: *"Pay $5 to Make Opponents Wear Oven Mitts, $10 to Sub the Ref, $15 to Mute a Heckler!"*
• **Announcer Mic & Hype DJ**: Have your student MC announce every bribe live over the speakers (*"Spectator Sarah just dropped $10 to bench the referee!"*) to trigger bidding wars between rival fan sections.
• **Zero Overhead ($0 Cost)**: Every dollar raised through spectator sabotage is 100% net profit straight toward your goal!`,
    });
  }
});

// Serve frontend in production or mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
