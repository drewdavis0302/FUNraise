export interface FundraisingParameters {
  organizationName?: string;
  organizationIdentity?: string; // What the club/org does (their craft, mission, day-to-day focus)
  missionStatement: string; // The specific fundraising goal or campaign target
  eventVibe?: string; // Fun / Chaos style: e.g. 'High Chaos & Spectator Sabotage' | 'Abstract & Thematic Pop-Up' | 'Tournament & Challenge' | 'Classic'
  ageRange: string;
  timeOfYear: string;
  meansOfOutreach: string[];
  strongestDemographic: string;
  targetAudience: string;
  maxVenueCapacity: string;
  desiredTurnout: number;
  desiredFunds: number;
  timeOfDay: string;
  // Specific known expenses & revenues for exact net profit calculation
  knownVenueCost?: number; // $0 if free/donated/school, or entered price
  knownTicketPrice?: number; // per attendee ticket price
  knownFoodCost?: number; // catering / snacks / refreshments
  knownOtherExpenses?: number; // supplies, AV/DJ, prizes, print
  knownSponsorships?: number; // committed sponsors or business grants
  knownDirectDonations?: number; // confirmed direct donations or lead gifts
  notesOrConstraints?: string;
}

export interface FinancialBreakdown {
  venueCost: number;
  isVenueFreeOrDonated: boolean;
  ticketRevenue: number;
  ticketPrice: number;
  crowdEngagementRevenue?: number; // In-event spectator perks, sabotage bribes, micro-games, raffles & live crowd participation (crucial when entry is free)
  sponsorshipRevenue: number;
  directDonations: number;
  foodAndCateringCost: number;
  otherExpenses: number;
  totalExpenses: number;
  totalGrossRevenue: number;
  realisticNetProfit: number;
  marginPct: number;
  profitNotes: string;
}

export interface DonorTier {
  tierName: string;
  giftAmount: number;
  targetDonorCount: number;
  projectedTotal: number;
  donorPersona: string;
  suggestedPerkOrRecognition: string;
}

export interface ProfitTactic {
  title: string;
  category: 'Cost Reduction' | 'Revenue Multiplier' | 'Sponsorship & Underwriting' | 'Psychological Timing';
  impactLevel: 'High' | 'Transformative' | 'Medium';
  netProfitBoostEstimate: string;
  description: string;
  implementationTip: string;
}

export interface OutreachPitch {
  channel: string;
  targetSegment: string;
  headlineOrSubject: string;
  pitchContent: string;
  keyCallToAction: string;
  bestSendTiming: string;
}

export interface TimelinePhase {
  phase: string;
  weekTiming: string;
  primaryFocus: string;
  criticalMilestones: string[];
  expectedYieldProgressPct: number;
}

export interface RunOfShowItem {
  timeOffset: string;
  activity: string;
  fundraisingTrigger: string;
  psychologicalGoal: string;
}

export interface FormatOption {
  formatName: string;
  isRecommended: boolean;
  projectedGross: number;
  projectedExpenses: number;
  projectedNetProfit: number;
  marginPct: number;
  strengths: string[];
  drawbacks: string[];
  rationale: string;
}

export interface InteractiveSabotagePerk {
  name: string;
  cost: number;
  description: string;
  category: 'Sabotage' | 'Power-Up' | 'Crowd Control' | 'Rule Twist';
  projectedRevenue: number;
}

export interface GeneratedStrategy {
  strategyName: string;
  executiveSummary: string;
  coreFundraisingHook: string;
  abstractConceptHook?: string; // Creative, wacky, or abstract concept hook
  detailedEventDescription?: string; // Clear, step-by-step walkthrough of what exactly the event is, how it is set up, and what participants/spectators do
  profitViabilityScore: number; // 0 - 100
  profitabilityVerdict: string;
  recommendedFormat: FormatOption;
  alternativeFormats: FormatOption[];
  donorPyramid: DonorTier[];
  totalPyramidGross: number;
  profitMaximizationTactics: ProfitTactic[];
  interactiveSabotageMenu?: InteractiveSabotagePerk[]; // Fun spectator pay-to-sabotage / power-up menu
  outreachPitches: OutreachPitch[];
  timelineCadence: TimelinePhase[];
  dayOfRunOfShow: {
    recommendedScheduleTitle: string;
    schedule: RunOfShowItem[];
    peakAskWindow: string;
  };
  pitfallsAndRiskMitigations: Array<{
    potentialTrap: string;
    financialExposure: string;
    preventiveAction: string;
  }>;
  seasonalStrategyNotes: string;
  timeOfDayTactics: string;
  demographicBridgeStrategy: string;
  identityTieInRationale?: string;
  financialBreakdown?: FinancialBreakdown;
  eventFlyer?: EventFlyerData;
}

export interface EventFlyerData {
  eventTitle: string;
  tagline: string;
  dateOrSeason: string;
  timeAndVibe: string;
  locationOrVenue: string;
  heroHighlight: string;
  bulletHighlights: string[];
  ticketOrAdmissionText: string;
  impactCallout: string;
  rsvpCallToAction: string;
  matchingGrantCallout?: string;
}

export interface ReportedImpactRecord {
  id: string;
  organizationOrEventName: string;
  targetGoal: number;
  actualAmountRaised: number;
  dateReported: string;
  keyWinOrFeedback?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
