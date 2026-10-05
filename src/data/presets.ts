import { FundraisingParameters } from '../types';

export interface PresetProfile {
  id: string;
  name: string;
  category: string;
  badge: string;
  emoji: string;
  params: FundraisingParameters;
}

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: 'sabotage-basketball',
    name: 'Spectator-Sabotage 3v3 Basketball Tournament',
    category: 'Sports & Student Clubs',
    badge: 'Audience Bribes & Sabotages (Signature)',
    emoji: '🏀',
    params: {
      organizationName: 'Campus Hoops & Student Athletic Coalition',
      organizationIdentity:
        'We are a student-run basketball and intramural sports club organizing campus leagues, pickup games, and student fitness clinics.',
      missionStatement:
        'Funding new adjustable breakaway rims, official game balls, customized team jerseys, and travel expenses for our regional collegiate tournament.',
      eventVibe: '🔥 High Chaos & Spectator Sabotage',
      ageRange: 'High School to College (Ages 16-24 / Students & Alumni)',
      timeOfYear: 'Mid-Fall / Homecoming, Spirit Week & Halloween (October)',
      meansOfOutreach: [
        'Campus Group Chats (GroupMe, Discord, WhatsApp & Club Slack channels)',
        'Professor Promotions & In-Class Announcements (Start of Lecture 2-min pitch / slide deck plug)',
        'Social Media & Student Video Stories',
        'Campus Quads, Chalking & Student Union Flyering',
      ],
      strongestDemographic: 'Student Body, Classmates & Campus Youth Clubs',
      targetAudience: 'College Students, Campus Faculty, Alumni & Local College Town Businesses',
      maxVenueCapacity: '300 gym bleachers',
      desiredTurnout: 220,
      desiredFunds: 12000,
      timeOfDay: '5:00 PM – 8:00 PM (Post-Class Evening Prime Window)',
      knownVenueCost: 0, // Campus gym is free for student clubs!
      knownTicketPrice: 8,
      knownFoodCost: 250,
      knownSponsorships: 2000,
      knownOtherExpenses: 150,
      notesOrConstraints:
        'Spectators pay $5 to make players wear oven mitts, $10 to sub the ref out with a student, $15 to mute rival spectators, or $20 for golden 4-point balls! Pure net profit.',
    },
  },
  {
    id: 'school-robotics',
    name: 'Middle & High School Robotics Club',
    category: 'Schools & Youth Clubs',
    badge: 'Student-Led & High Energy',
    emoji: '🤖',
    params: {
      organizationName: 'Metro High Robotics Team (Team 404)',
      organizationIdentity: 'We are a student-led robotics club that designs, codes, and builds competitive autonomous robots and hosts STEM coding workshops for younger students.',
      missionStatement:
        'To fund 25 competition robotics kits, 3D printer filament, and travel expenses for our regional student tournament.',
      ageRange: 'Middle School to High School (Ages 11-18) & Parents',
      timeOfYear: 'Early Fall / Semester Kickoff & Welcome Week (Late August – September)',
      meansOfOutreach: [
        'School PA & Morning Announcements',
        'Social Media & Video Storytelling',
        'Peer-to-Peer Ambassador Teams',
        'Email Newsletters & Parent Lists',
      ],
      strongestDemographic: 'School Parents, Teachers, Alumni & Local STEM Sponsors',
      targetAudience: 'Parents, Grandparents, Local Tech Businesses & Fellow Students',
      maxVenueCapacity: '250 seats (School Gym / Cafeteria)',
      desiredTurnout: 180,
      desiredFunds: 15000,
      timeOfDay: 'Evening (6:30 PM - 9:30 PM)',
      knownVenueCost: 0, // School gym is free!
      knownTicketPrice: 10,
      knownFoodCost: 350,
      knownSponsorships: 2500,
      knownOtherExpenses: 200,
      notesOrConstraints: 'Keep venue cost $0 by hosting in the school multipurpose room; feature live student robot battles!',
    },
  },
  {
    id: 'elementary-carnival',
    name: 'Elementary School Fun Fair & Playground Fund',
    category: 'Elementary & PTA',
    badge: 'Kids & Families Favorite',
    emoji: '🎪',
    params: {
      organizationName: 'Lincoln Elementary Parent-Teacher Association (PTA)',
      organizationIdentity: 'We support 450 elementary school students and teachers with classroom enrichment, sensory play, playground upgrades, and family community events.',
      missionStatement:
        'Upgrading our school playground with accessible sensory swings, shade awnings, and new soccer goals for 450 kids.',
      ageRange: 'Elementary School (Ages 5-10 / Kids, Teachers & PTA Families)',
      timeOfYear: 'Late Spring / Spring Festivals & Earth Day (April)',
      meansOfOutreach: [
        'School Backpack Flyers & Take-Home Folders',
        'Classroom & Parent Chats (WhatsApp / Remind)',
        'Social Media & Video Storytelling',
        'Local Business & Pizza Night Sponsorships',
      ],
      strongestDemographic: 'Elementary School Parents, Guardians & Neighborhood Neighbors',
      targetAudience: 'Families, Grandparents, Teachers & Community Supporters',
      maxVenueCapacity: '400 outdoor playground / blacktop',
      desiredTurnout: 320,
      desiredFunds: 20000,
      timeOfDay: 'Afternoon Festival (1:00 PM - 5:00 PM)',
      knownVenueCost: 0, // Outdoor school blacktop is free!
      knownTicketPrice: 5,
      knownFoodCost: 500,
      knownSponsorships: 3000,
      knownOtherExpenses: 400,
      notesOrConstraints: 'Feature games, bake sales, dunk tank with the principal, and classroom prize baskets.',
    },
  },
  {
    id: 'highschool-dance-sports',
    name: 'High School Band & Athletic Boosters',
    category: 'High School Teams',
    badge: 'Spirit & Competitions',
    emoji: '🎺',
    params: {
      organizationName: 'Westside High Marching Band & Color Guard',
      organizationIdentity: 'We are an 80-member student marching band and music ensemble that performs at games, regional competitions, and civic celebrations.',
      missionStatement:
        'Equipping 80 student marching band members with new brass instruments, competition uniforms, and travel charter buses for the state championship.',
      ageRange: 'High School (Ages 14-18 / Teens, Student Council, Sports & Arts)',
      timeOfYear: 'Mid-Fall / Homecoming, Spirit Week & Halloween (October)',
      meansOfOutreach: [
        'School Morning PA / Announcements & Assemblies',
        'Social Media & Video Storytelling',
        'Peer-to-Peer Student & Team Contests',
        'Local Business & Pizza Night Sponsorships',
      ],
      strongestDemographic: 'Sports Fans, Band Parents, Alumni & Local Pizzerias/Businesses',
      targetAudience: 'High School Alumni, Family Circles & Local Sports Fans',
      maxVenueCapacity: '500 stadium seats',
      desiredTurnout: 350,
      desiredFunds: 25000,
      timeOfDay: 'Evening (6:30 PM - 9:30 PM)',
      knownVenueCost: 0, // High school stadium is free for school events!
      knownTicketPrice: 12,
      knownFoodCost: 600,
      knownSponsorships: 4000,
      knownOtherExpenses: 300,
      notesOrConstraints: 'Underwritten halftime showcase; student ticket challenge where top section gets free pizza party.',
    },
  },
  {
    id: 'animal-rescue',
    name: 'Furry Friends Companion Animal Rescue',
    category: 'Community & Animals',
    badge: 'Grassroots Pet Lovers',
    emoji: '🐾',
    params: {
      organizationName: 'Furry Friends Companion Animal Rescue',
      organizationIdentity: 'We are a grassroots volunteer rescue network that fosters abandoned animals, funds critical veterinary surgeries, and coordinates adoption fairs.',
      missionStatement:
        'Funding life-saving veterinary medical care, puppy/kitten rescue fostering, and mobile adoption fairs for 800 rescue animals.',
      ageRange: 'All Ages / Entire School & Community Together',
      timeOfYear: 'Summer Session & Warm-Weather Community Drives (June – July / Early August)',
      meansOfOutreach: [
        'Instagram, TikTok & Student Video Stories',
        'Email Newsletters & Parent Lists',
        'Peer-to-Peer Student & Team Contests',
        'Community Postcards & Bulletin Posters',
      ],
      strongestDemographic: 'Local Pet Owners, Families, Foster Volunteers & Animal Lovers',
      targetAudience: 'Community Pet Lovers, Dog Park Regulars & Monthly Sustainers',
      maxVenueCapacity: '350 outdoor park pavilion',
      desiredTurnout: 260,
      desiredFunds: 35000,
      timeOfDay: '1:00 PM – 5:00 PM (Weekend Afternoon Festival or Tournament)',
      knownVenueCost: 150, // Park permit fee
      knownTicketPrice: 15,
      knownFoodCost: 400,
      knownSponsorships: 6000,
      knownOtherExpenses: 250,
      notesOrConstraints: 'Pet-friendly venue; costume contest; match grant from local veterinary hospital.',
    },
  },
  {
    id: 'college-club',
    name: 'College Student Club & Campus Org Rally',
    category: 'Campus & Student Orgs',
    badge: 'Post-Class 5–8 PM & Lecture Plugs',
    emoji: '🏛️',
    params: {
      organizationName: 'Collegiate Society of Women Engineers & Robotics',
      organizationIdentity: 'We are a campus engineering and robotics organization that builds autonomous submersibles, hosts coding bootcamps, and mentors high school girls in STEM.',
      missionStatement:
        'Funding travel expenses, tournament entry fees, student equipment, and leadership workshops for 45 active club members.',
      ageRange: 'College & Young Adults (Ages 18-24 / Campus & Rising Grads)',
      timeOfYear: 'Early Spring / Semester Launch & Rush (January – Mid-February)',
      meansOfOutreach: [
        'Professor Promotions & In-Class Announcements (Start of Lecture 2-min pitch / slide deck plug)',
        'Campus Group Chats (GroupMe, Discord, WhatsApp & Club Slack channels)',
        'Campus Quads, Chalking & Student Union Flyering',
        'Greek Life & Student Org Coalitions (Co-hosting, chapter meetings & cross-promotions)',
      ],
      strongestDemographic: 'Student Body, Classmates & Campus Youth Clubs',
      targetAudience: 'College Students, Campus Faculty, Alumni & Local College Town Businesses',
      maxVenueCapacity: '250 seats (Campus Student Center / Free University Hall)',
      desiredTurnout: 180,
      desiredFunds: 12000,
      timeOfDay: '5:00 PM – 8:00 PM (Post-Class Evening Prime Window)',
      knownVenueCost: 0, // Booked campus room or student union for $0!
      knownTicketPrice: 10,
      knownFoodCost: 350,
      knownSponsorships: 2500,
      knownOtherExpenses: 150,
      notesOrConstraints: 'Free campus venue; 60-second in-class pitches at the start of lectures during syllabus week; pizza sponsor offsets snacks.',
    },
  },
  {
    id: 'college-scholarship',
    name: 'First-Gen College Hope Scholarship Gala',
    category: 'Higher Ed & Nonprofits',
    badge: 'Gala & Major Gift Match',
    emoji: '🎓',
    params: {
      organizationName: 'First-Gen College Hope Scholars',
      organizationIdentity: 'We are a university student association supporting first-generation and transfer students with academic tutoring, professional mentorship, and emergency aid.',
      missionStatement:
        'Providing 10 full-year debt-free micro-grants and laptop stipends for first-generation community college transfer students.',
      ageRange: 'College & Young Adults (Ages 18-24 / Campus & Rising Grads)',
      timeOfYear: 'Late Fall / Friendsgiving & Pre-Finals Giving (November)',
      meansOfOutreach: [
        'Professor Promotions & In-Class Announcements (Start of Lecture 2-min pitch / slide deck plug)',
        'Campus Group Chats (GroupMe, Discord, WhatsApp & Club Slack channels)',
        'Email Newsletters & Campus/Alumni Listservs',
        'Local College Town Restaurant Percentage Nights & Pizza Sponsors',
      ],
      strongestDemographic: 'Alumni Network, Tech Executives & Civic Trustees',
      targetAudience: 'Civic Philanthropists, Corporate CSR Leads & Successful First-Gen Alumni',
      maxVenueCapacity: '200 seats',
      desiredTurnout: 150,
      desiredFunds: 75000,
      timeOfDay: '6:00 PM – 8:00 PM (2-Hour Evening Mixer & Social)',
      knownVenueCost: 1500, // Booked civic banquet hall
      knownTicketPrice: 65,
      knownFoodCost: 2500,
      knownSponsorships: 15000,
      knownOtherExpenses: 600,
      notesOrConstraints: 'Double impact with a $15,000 corporate challenge match grant.',
    },
  },
];
