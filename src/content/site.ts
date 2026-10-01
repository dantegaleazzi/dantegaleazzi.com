// Every link on the home page lives here. An empty href renders as a "Link soon" placeholder.

export type SocialKey = 'youtube' | 'shorts' | 'instagram' | 'tiktok' | 'linkedin' | 'x' | 'github'

export const socials: Record<SocialKey, { label: string; href: string; logo?: string }> = {
  youtube: { logo: '/logos/youtube.png', label: 'YouTube', href: 'https://www.youtube.com/@dante.galeazzi' },
  shorts: { logo: '/logos/youtube.png', label: 'YouTube Shorts', href: 'https://www.youtube.com/@dante.galeazzi/shorts' },
  instagram: { logo: '/logos/instagram.png', label: 'Instagram', href: 'https://www.instagram.com/dantegaleazzi22/' },
  tiktok: { logo: '/logos/tiktok.png', label: 'TikTok', href: 'https://www.tiktok.com/@dante.galeazzi' },
  linkedin: { logo: '/logos/linkedin.png', label: 'LinkedIn', href: 'https://www.linkedin.com/in/dantegaleazzi/' },
  x: { logo: '/logos/x.png', label: 'X / Twitter', href: 'https://x.com/dantegaleazzi' },
  github: { label: 'GitHub', href: 'https://github.com/dantegaleazzi' },
}

export const links = {
  shipaton: 'https://www.shipaton.com',
  stedWebsite: 'https://www.sted.ai',
  stedAppStore: 'https://apps.apple.com/us/app/sted-ai/id6805940694',
  storyVideo: 'https://www.youtube.com/watch?v=bf1P4iyFdtM',
  instagramReels: 'https://www.instagram.com/dantegaleazzi22/reels/',
  firstReel: 'https://www.instagram.com/reel/DcOafjPJJ5K/',
  // TODO: the final video of the series. Until it's added, the story shows a "coming soon" slot.
  finalVideo: '',
}

export const apps = [
  {
    name: 'Sted',
    icon: '/apps/sted-icon.jpg',
    tagline: 'Everything you save. Finally useful.',
    status: 'Live on the App Store',
    description: 'Save links from anywhere. Sted organizes them and uses AI to pull out summaries, key ideas and topics — so you can actually find and use them later.',
    actions: [
      { label: 'Download on the App Store', href: links.stedAppStore },
      { label: 'sted.ai', href: links.stedWebsite },
    ],
    handle: '@stedapp',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/stedapp/' },
      { label: 'X', href: 'https://x.com/stedapp' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@stedapp' },
    ],
  },
  {
    name: 'Shimpaku',
    icon: '/apps/shimpaku-icon.jpg',
    tagline: 'A focus timer with a garden that grows.',
    status: 'Live on iOS and Android',
    description: 'Start a session and put the phone down. Every session you finish helps your bonsai grow.',
    actions: [
      { label: 'Download on the App Store', href: 'https://apps.apple.com/us/app/shimpaku/id6813877974' },
      { label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.finikslabs.shimpaku' },
      { label: 'shimpaku.app', href: 'https://shimpaku.app/' },
    ],
    handle: '',
    socials: [],
  },
]

const youtube = (id: string) => `https://www.youtube.com/watch?v=${id}`
export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`

// YouTube titles are A/B tested, so the site uses stable topic titles instead of copying them.
export const expertEpisodes = [
  { number: 1, id: 'i8GK5CHpxBc', title: 'Does your AI know what it’s building?', duration: '17:53' },
  { number: 2, id: 'Yfz74Fyimy8', title: 'Building solo with AI: a one-person software company', duration: '24:51' },
  { number: 3, id: 'tRlsIDsGcms', title: 'How to go viral: a 5M+ views playbook', duration: '14:14' },
  { number: 4, id: 'qDhSnKRUQ-Y', title: 'How to build your first app', duration: '27:47' },
  { number: 5, id: 'APjyLkCglWw', title: 'Stop building, start distributing', duration: '19:40' },
  { number: 6, id: '7-XI3eyE7E0', title: 'Will they pay? Will they stay?', duration: '31:57' },
  { number: 7, id: 'zCmFbVcwR5o', title: 'Can your startup afford to pay you?', duration: '21:41' },
  { number: 8, id: 'O3zrc1nMxds', title: 'Why most founders get launch day wrong', duration: '31:01' },
].map((episode) => ({ ...episode, href: youtube(episode.id) }))

// Only the 8 expert interviews; shipatonPlaylist below is the daily build log.
export const expertsPlaylist = {
  title: 'Building Sted With Experts - RevenueCat Shipaton 2026',
  href: 'https://www.youtube.com/playlist?list=PLfM8vQcuvk1E',
}

export const shipatonPlaylist = {
  title: 'Build in Public — RevenueCat Shipaton',
  description: 'Every episode and daily update from the Shipaton, in order — from the first idea to Sted going live.',
  href: 'https://www.youtube.com/playlist?list=PLBBQHPrd5Qqw',
}

export const latestVideo = {
  label: 'Day 37',
  id: 'tIbgdGvr-_Y',
  title: 'Sted is live on the App Store',
  duration: '1:10',
  href: youtube('tIbgdGvr-_Y'),
}

const instagramReel = (code: string) => `https://www.instagram.com/reel/${code}/`

// Views as shown on the Instagram grid. An empty href links to the Reels tab until the exact reel is added.
export const reelViewsDate = 'Sep 30, 2026'
export const reels = {
  7: { title: '24 hours to turn this drawing into a real app', views: 1312, href: '' },
  8: { title: 'I built an iPhone app in 24 hours', views: 1776, href: '' },
  22: { title: 'Use this tip from a real coder', views: 456, href: '' },
  25: { title: 'From iPhone to Android', views: 560, href: '' },
  31: { title: 'How he got 1 million views', views: 619, href: '' },
  33: { title: 'I built 2 apps. I don’t know how to code.', views: 480, href: '' },
  35: { title: 'Apple approved my app', views: 838, href: '' },
  37: { title: 'Sted is online', views: 1150, href: instagramReel('DdrEZE2J1DV') },
  38: { title: '56 users in 24 hours', views: 424, href: instagramReel('Ddtoo4uJm9h') },
  39: { title: 'A product manager reviewed Sted', views: 399, href: instagramReel('DdwiVf0j2ro') },
  41: { title: 'Sted Pro is live', views: 362, href: instagramReel('Dd1k9T4Js2R') },
  42: { title: 'Let’s speak about launch day', views: 236, href: instagramReel('Dd4BucZJJE5') },
} satisfies Record<number, { title: string; views: number; href: string }>

export type ReelDay = keyof typeof reels
export const reelDays = Object.keys(reels).map(Number) as ReelDay[]
export const reelCover = (day: ReelDay) => `/reels/day-${String(day).padStart(2, '0')}.jpg`
export const reelHref = (day: ReelDay) => reels[day].href || links.instagramReels

export type StoryThumb = 'start' | 'guides' | 'sted' | 'paid' | 'subscribers'

export type StoryBeat = {
  tag: string
  title: string
  text: string
  reel?: ReelDay
  thumb?: StoryThumb
  link?: { label: string; href: string }
  update?: string
  highlight?: boolean
}

export const story: { chapter: string; days: string; title: string; summary: string; beats: StoryBeat[] }[] = [
  {
    chapter: 'Chapter 1',
    days: 'Days 1–8',
    title: 'The bet',
    summary: 'Can someone who can’t code ship a real app with AI? The Shipaton was my way to find out.',
    beats: [
      {
        tag: 'Day 1',
        title: 'Where it all started',
        text: 'I entered the Shipaton with an idea and zero coding experience — and posted the first video.',
        thumb: 'start',
        link: { label: 'Watch the first reel', href: links.firstReel || links.instagramReels },
      },
      {
        tag: 'Week 1',
        title: 'Learning out loud',
        text: 'The first posts were how-tos: how to start your first project. They grew into the 13 guides on this site.',
        thumb: 'guides',
        link: { label: 'See the guides', href: '#guides' },
      },
      {
        tag: 'Day 7',
        title: 'A hackathon inside the hackathon',
        text: 'Apps were taking 19 days to get approved. So I gave myself 24 hours to turn a notebook drawing into a real app.',
        reel: 7,
      },
      {
        tag: 'Day 8',
        title: 'An iPhone app in 24 hours',
        text: 'Built with AI, without knowing how to code. It became the most-watched reel of the whole series.',
        reel: 8,
        highlight: true,
      },
    ],
  },
  {
    chapter: 'Chapter 2',
    days: 'Days 9–34',
    title: 'Waiting on Apple',
    summary: 'The app was built. The approval wasn’t. So I kept building — and started asking for help.',
    beats: [
      {
        tag: 'In review',
        title: 'Sted is born',
        text: 'While the app waited in review, it got a new brand and a mascot: Sted, a little yellow bookmark.',
        thumb: 'sted',
      },
      {
        tag: 'Day 22',
        title: 'Asking everyone',
        text: 'I asked every builder I could find for advice. It was too good to keep, so I started filming it.',
        reel: 22,
        link: { label: 'The interviews', href: '#interviews' },
      },
      {
        tag: 'Day 25',
        title: 'Plan B: Android',
        text: 'Still no approval, so I built the Android version to see if Google would say yes first.',
        reel: 25,
        update: 'Update 09/30: the Android version is still not approved.',
      },
      {
        tag: 'Day 31',
        title: 'The interviews kept coming',
        text: 'Founders and creators shared what worked for them — like how one creator got 1 million views.',
        reel: 31,
      },
      {
        tag: 'Day 33',
        title: 'Plan C: a second app',
        text: 'Apple still hadn’t approved Sted, so I built Shimpaku: a focus timer with a bonsai that grows.',
        reel: 33,
        update: 'Update 09/30: Shimpaku is approved on Apple and Android.',
      },
    ],
  },
  {
    chapter: 'Chapter 3',
    days: 'Days 35–43',
    title: 'Launch',
    summary: 'Approved, live — and then the real test: would anyone pay for it?',
    beats: [
      { tag: 'Day 35', title: 'Apple approved Sted', text: 'After a rejection, a round of fixes and one more review.', reel: 35 },
      {
        tag: 'Day 37',
        title: 'Sted is live',
        text: 'Live on the App Store. I asked everyone to try it, break it and send me feedback.',
        reel: 37,
        highlight: true,
      },
      {
        tag: 'Day 38',
        title: '56 users in 24 hours',
        text: 'Next target: 100 users and a first paying customer.',
        reel: 38,
        highlight: true,
      },
      {
        tag: 'Day 41',
        title: 'Sted Pro is live',
        text: 'Unlimited saves and up to 10× more AI analysis, with a Founding 100 offer: $20 for the whole year.',
        reel: 41,
      },
      {
        tag: '2nd-to-last day',
        title: 'First paying user',
        text: 'Someone paid for an app I built 100% with AI.',
        thumb: 'paid',
        highlight: true,
      },
      {
        tag: 'Last day',
        title: 'First yearly and monthly subscribers',
        text: 'Both came in on the final day of the Shipaton.',
        thumb: 'subscribers',
        highlight: true,
      },
    ],
  },
]

// Public feedback that changed the app — what the #BuildInPublic judges ask for.
export const feedbackLoops: {
  tag: string
  title: string
  steps: [string, string][]
  reel?: ReelDay
  link?: { label: string; href: string }
  episode?: number
}[] = [
  {
    tag: 'Day 39 · Onboarding',
    title: 'A product manager reviewed Sted. So I changed the app.',
    steps: [
      ['Before', 'The old onboarding'],
      ['Feedback', 'Kara, a product manager, reviewed it on camera'],
      ['After', 'I rebuilt the onboarding'],
    ],
    reel: 39,
  },
  {
    tag: 'Day 42 · Launch',
    title: 'I thought launch day was one day.',
    steps: [
      ['Before', 'Launch day was a single day'],
      ['Feedback', 'Claire from BuildHop: a launch is ongoing'],
      ['After', 'Sted launched again, on BuildHop'],
    ],
    reel: 42,
    episode: 8,
  },
  {
    tag: 'Day 22 · The series',
    title: 'Asking for advice in public became a series.',
    steps: [
      ['Before', 'I asked every builder I could'],
      ['Feedback', 'The answers were too good to keep'],
      ['After', 'Building Sted With Experts, on camera'],
    ],
    link: { label: 'Watch the interviews', href: '#interviews' },
  },
]

export const biggestLesson = {
  quote: 'Execution got cheaper. Judgment didn’t.',
  text: 'AI made building dramatically faster, but it didn’t make the important decisions for me. That might be my biggest lesson from this whole experiment.',
  href: 'https://www.instagram.com/p/Dd4yLw7gRDz/',
}

export const tools = [
  {
    group: 'AI',
    items: [
      { name: 'Claude', logo: '/logos/claude.png', description: 'Planning, writing and building with AI.', href: 'https://claude.ai/' },
      { name: 'Codex', logo: '/logos/codex.png', description: 'OpenAI’s coding agent.', href: 'https://openai.com/codex/' },
      { name: 'Hermes Agent', logo: '/logos/hermes.png', description: 'An open-source AI agent by Nous Research.', href: 'https://hermes-agent.nousresearch.com/' },
      { name: 'OpenRouter', logo: '/logos/openrouter.png', description: 'One API for many AI models.', href: 'https://openrouter.ai/' },
    ],
  },
  {
    group: 'Backend & hosting',
    items: [
      { name: 'Supabase', logo: '/logos/supabase.png', description: 'Database, auth and storage for the app.', href: 'https://supabase.com/' },
      { name: 'Cloudflare', logo: '/logos/cloudflare.png', description: 'Hosting and DNS for the websites.', href: 'https://www.cloudflare.com/' },
      { name: 'Namecheap', logo: '/logos/namecheap.png', description: 'Domains.', href: 'https://www.namecheap.com/' },
    ],
  },
  {
    group: 'Payments',
    items: [
      { name: 'RevenueCat', logo: '/logos/revenuecat.png', description: 'In-app subscriptions and paywalls.', href: 'https://www.revenuecat.com/' },
      { name: 'Stripe', logo: '/logos/stripe.png', description: 'Payments on the web.', href: 'https://stripe.com/' },
    ],
  },
  {
    group: 'Design',
    items: [
      { name: 'Mobbin', logo: '/logos/mobbin.png', description: 'Real app screens to use as design references.', href: 'https://mobbin.com/' },
      { name: 'Figma', logo: '/logos/figma.png', description: 'Interfaces, mockups and visual direction.', href: 'https://www.figma.com/' },
      { name: 'Canva', logo: '/logos/canva.png', description: 'Quick graphics, thumbnails and carousels.', href: 'https://www.canva.com/' },
    ],
  },
  {
    group: 'Content & everyday',
    items: [
      { name: 'Riverside', logo: '/logos/riverside.png', description: 'Recording and editing the expert interviews.', href: 'https://riverside.fm/' },
      { name: 'Notion', logo: '/logos/notion.png', description: 'Notes, specs and checklists for each build.', href: 'https://www.notion.so/' },
      { name: 'Shottr', logo: '/logos/shottr.png', description: 'Fast screenshots and annotations on Mac.', href: 'https://shottr.cc/' },
      {
        name: 'Android Emulator',
        logo: '/logos/android.png',
        description: 'Testing the Android version without a device.',
        href: 'https://developer.android.com/studio/run/emulator',
      },
    ],
  },
]

export const resources = [
  {
    source: 'Apple',
    logo: '/logos/apple.png',
    title: 'App Store Review Guidelines',
    href: 'https://developer.apple.com/app-store/review/guidelines/',
  },
  {
    source: 'Apple',
    logo: '/logos/apple.png',
    title: 'Human Interface Guidelines',
    href: 'https://developer.apple.com/design/human-interface-guidelines/',
  },
  {
    source: 'RevenueCat',
    logo: '/logos/revenuecat.png',
    title: 'Why would someone pay for your app when AI does it for free?',
    href: 'https://www.revenuecat.com/blog/growth/differentiator-against-ai',
  },
  { source: 'RevenueCat',
    logo: '/logos/revenuecat.png', title: 'The RevenueCat blog', href: 'https://www.revenuecat.com/blog/' },
  { source: 'Shipaton', logo: '/logos/shipaton.png', title: 'RevenueCat Shipaton 2026', href: links.shipaton },
]
