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
}

export const apps = [
  {
    name: 'Sted',
    icon: '/apps/sted-icon.jpg',
    tagline: 'Everything you save. Finally useful.',
    status: 'Live on the App Store',
    description: 'Save links from anywhere. Sted organizes them and uses AI to pull out summaries, key ideas and topics, so you can actually find and use them later.',
    actions: [
      { label: 'Download on the App Store', href: links.stedAppStore },
      { label: 'sted.ai', href: links.stedWebsite },
    ],
    handle: '@stedapp',
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/stedapp/' },
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
// mqdefault (320×180) suits small cards; large ones ask for maxresdefault (1280×720).
export const youtubeThumbnail = (id: string, size: 'mqdefault' | 'maxresdefault' = 'mqdefault') =>
  `https://i.ytimg.com/vi/${id}/${size}.jpg`

// The Shipaton submission video; the story ends with it.
export const finalVideo = {
  id: 'FmUohh_pF4Q',
  title: 'Sted, the app that makes everything you save finally useful',
  href: youtube('FmUohh_pF4Q'),
}

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
  title: 'Build in Public: RevenueCat Shipaton',
  description: 'Every episode and daily update from the Shipaton in order, from the first idea to Sted going live.',
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
const instagramPost = (code: string) => `https://www.instagram.com/p/${code}/`
const linkedinPost = (path: string) => `https://www.linkedin.com/${path}/`
const xPost = (id: string) => `https://x.com/dantegaleazzi/status/${id}`

// Views as shown on the Instagram grid. An empty href links to the Reels tab until the exact reel is added.
export const reels = {
  7: { title: '24 hours to turn this drawing into a real app', views: 1312, href: instagramPost('Dcd4PNcp6LE') },
  8: { title: 'I built an iPhone app in 24 hours', views: 1776, href: instagramPost('DcgUi77JjE9') },
  22: { title: 'Use this tip from a real coder', views: 456, href: instagramPost('DdEYBmSqW69') },
  25: { title: 'From iPhone to Android', views: 560, href: instagramPost('DdMGIABqmsa') },
  31: { title: 'How he got 1 million views', views: 619, href: '' },
  33: { title: 'I built 2 apps. I don’t know how to code.', views: 480, href: '' },
  35: { title: 'Apple approved my app', views: 838, href: instagramPost('Ddl2ITNpfr0') },
  37: { title: 'Sted is online', views: 1150, href: instagramReel('DdrEZE2J1DV') },
  38: { title: '56 users in 24 hours', views: 424, href: instagramReel('Ddtoo4uJm9h') },
  39: { title: 'A product manager reviewed Sted', views: 399, href: instagramReel('DdwiVf0j2ro') },
  41: { title: 'Sted Pro is live', views: 362, href: instagramReel('Dd1k9T4Js2R') },
  42: { title: 'Let’s speak about launch day', views: 236, href: instagramReel('Dd4BucZJJE5') },
} satisfies Record<number, { title: string; views: number; href: string }>

export type ReelDay = keyof typeof reels
export const reelCover = (day: ReelDay) => `/reels/day-${String(day).padStart(2, '0')}.jpg`
export const reelHref = (day: ReelDay) => reels[day].href || links.instagramReels

export type StoryThumb = 'start' | 'guides' | 'workflow' | 'review' | 'idea' | 'sted' | 'rejected' | 'feedback' | 'paid' | 'subscribers'

export type StoryBeat = {
  tag: string
  title: string
  text: string
  reel?: ReelDay
  thumb?: StoryThumb
  // A still image for a beat without a reel; it links to the beat's first post.
  image?: string
  link?: { label: string; href: string }
  // The same moment posted elsewhere; a reel's own Instagram link comes from `reel`.
  posts?: { instagram?: string; linkedin?: string; x?: string }
  // Labelled links laid out in rows of two, shown in place of `posts` and `link`.
  linkRows?: { label: string; href: string; icon?: 'instagram' | 'linkedin' | 'x' }[][]
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
        text: 'I entered the Shipaton with an idea and zero coding experience and posted the first video.',
        thumb: 'start',
        posts: {
          instagram: links.firstReel,
          linkedin: linkedinPost('feed/update/urn:li:activity:7495829278190743552'),
          x: xPost('2089753678790136292'),
        },
      },
      {
        tag: 'Week 1',
        title: 'Learning out loud',
        text: 'The first posts were how-tos: how to start your first project. They grew into the 13 guides on this site.',
        thumb: 'guides',
        linkRows: [
          [
            { label: 'Build something of your own', href: instagramReel('DcWVGn4p7si'), icon: 'instagram' },
            { label: 'How to choose a name', href: instagramPost('DcbNndKJmNl'), icon: 'instagram' },
          ],
          [
            { label: 'Vibe coding workflow', href: instagramPost('DcoKvRCp7Zq'), icon: 'instagram' },
            { label: 'How to build a website', href: instagramPost('Dc_YvAGqdQK'), icon: 'instagram' },
          ],
          [
            { label: 'Carousel guides', href: 'https://www.instagram.com/stories/highlights/18124712452858161/', icon: 'instagram' },
            { label: 'See the guides', href: '#guides' },
          ],
        ],
      },
      {
        tag: 'Day 7',
        title: 'A hackathon inside the hackathon',
        text: 'Apps were taking 19 days to get approved. So I gave myself 24 hours to turn a notebook drawing into a real app.',
        reel: 7,
        posts: {
          linkedin: 'https://lnkd.in/p/gBUPX2Uf',
          x: xPost('2092081233618755600'),
        },
      },
      {
        tag: 'Day 8',
        title: 'An iPhone app in 24 hours',
        text: 'Built with AI, without knowing how to code. It became the most-watched reel of the whole series.',
        reel: 8,
        posts: {
          linkedin: 'https://lnkd.in/p/gNS4zQEY',
          x: xPost('2092602427237376129'),
        },
        highlight: true,
      },
    ],
  },
  {
    chapter: 'Chapter 2',
    days: 'Days 9–34',
    title: 'Waiting on Apple',
    summary: 'The app was built. The approval wasn’t. So I kept building and started asking for help.',
    beats: [
      {
        tag: 'Day 10',
        title: 'Do this before Apple reviews your app',
        text: 'What to check before you send your app to App Review, so it doesn’t come back rejected.',
        thumb: 'review',
        posts: { instagram: instagramPost('DcliR4qp4Tq') },
      },
      {
        tag: 'Day 11',
        title: 'Sharing my workflow',
        text: 'How I build without writing code: AI acts as my CTO, and every project starts from a simple PRD.',
        thumb: 'workflow',
        posts: {
          instagram: instagramPost('DcoKvRCp7Zq'),
          linkedin: linkedinPost('posts/dantegaleazzi_shipaton-shipaton2026-stedapp-share-7499486538276171776-pDKp'),
        },
      },
      {
        tag: 'Day 13',
        title: 'The idea for Sted',
        text: 'Apple was still reviewing my app when I had an idea: turn it into Sted.',
        thumb: 'idea',
        posts: {
          instagram: instagramPost('DctJuLDqoR1'),
          linkedin: 'https://lnkd.in/p/g7A68pjV',
        },
      },
      {
        tag: 'Day 14',
        title: 'Sted is born',
        text: 'While the app waited in review, it got a new brand and a mascot: Sted, a little yellow bookmark. The next day, I brought it to life on video.',
        thumb: 'sted',
        posts: {
          instagram: instagramPost('DcwGRt5K4ro'),
          linkedin: linkedinPost('posts/dantegaleazzi_shipaton-shipaton2026-stedapp-ugcPost-7500918378706948096-PcnC'),
        },
      },
      {
        tag: 'Day 22',
        title: 'Building Sted with Experts series is born',
        text: 'I asked every builder I could find for advice. It was too good to keep, so I started filming it.',
        reel: 22,
        posts: { linkedin: linkedinPost('posts/dantegaleazzi_shipaton-shipaton2026-share-7503457999273771008-8cTH') },
        link: { label: 'The interviews', href: '#interviews' },
      },
      {
        tag: 'Day 25',
        title: 'Plan B: Android',
        text: 'Still no approval, so I built the Android version to see if Google would say yes first.',
        reel: 25,
        posts: { linkedin: 'https://lnkd.in/p/gHs326Gu' },
        update: 'Update 09/30: the Android version is still not approved.',
      },
      {
        tag: 'Day 30',
        title: 'Rejected by Apple',
        text: 'After 16 days of waiting, Apple rejected Sted. The good news: it was finally being reviewed.',
        thumb: 'rejected',
        posts: {
          instagram: instagramPost('DdZG2TQpqTt'),
          linkedin: 'https://lnkd.in/p/gXVvv7VK',
        },
      },
      {
        tag: 'Days 28–34',
        title: 'The interviews kept coming',
        text: 'Two more interviews went live: a solo founder on making your app faster, and a creator on how he got 1 million views. I shared their tips and used them to make Sted better.',
        image: '/story/experts-series.jpg',
        linkRows: [
          [
            { label: 'Day 28 interview', href: instagramPost('DdT4CpcpaG6'), icon: 'instagram' },
            { label: 'Day 31 interview', href: instagramPost('DdbqOi6zqWq'), icon: 'instagram' },
          ],
          [
            { label: 'Day 28 interview', href: 'https://lnkd.in/p/gbdvEh2M', icon: 'linkedin' },
            { label: 'Day 31 interview', href: 'https://lnkd.in/p/gWiWhK7u', icon: 'linkedin' },
          ],
        ],
      },
      {
        tag: 'Day 33',
        title: 'Plan C: a second app',
        text: 'Apple still hadn’t approved Sted, so I built Shimpaku: a focus timer with a bonsai that grows.',
        reel: 33,
        posts: { linkedin: 'https://www.linkedin.com/in/dantegaleazzi/recent-activity/all/' },
        update: 'Update 09/30: Shimpaku is approved on Apple and Android.',
      },
    ],
  },
  {
    chapter: 'Chapter 3',
    days: 'Days 35–43',
    title: 'Launch',
    summary: 'Approved and live. Then came the real test: would anyone pay for it?',
    beats: [
      {
        tag: 'Day 35',
        title: 'Apple approved Sted',
        text: 'After a rejection, a round of fixes and one more review.',
        reel: 35,
        posts: {
          linkedin: 'https://lnkd.in/p/gQN-UW-i',
          x: xPost('2102319201847525521'),
        },
      },
      {
        tag: 'Day 37',
        title: 'Sted is live',
        text: 'Live on the App Store. I asked everyone to try it, break it and send me feedback.',
        reel: 37,
        posts: {
          linkedin: linkedinPost('feed/update/urn:li:activity:7508900883749982208'),
          x: xPost('2103136435436126273'),
        },
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
        tag: 'Day 38',
        title: 'Is it clear what Sted does?',
        text: 'I made new App Store screenshots and asked for honest feedback: would you understand what Sted does?',
        thumb: 'feedback',
        posts: { x: xPost('2103463110875246662') },
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
        posts: { x: xPost('2104979252978520218') },
        highlight: true,
      },
      {
        tag: 'Last day',
        title: 'First yearly and monthly subscribers',
        text: 'Both came in on the final day of the Shipaton.',
        thumb: 'subscribers',
        posts: { instagram: instagramPost('Dd6wrEsp8VC'), x: xPost('2105363563154206977') },
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
  episode?: number
  x?: { label: string; href: string }[]
}[] = [
  {
    tag: 'Day 39 · Onboarding',
    title: 'A product manager reviewed Sted. So I changed it.',
    steps: [
      ['Before', 'The old onboarding'],
      ['Feedback', 'Kara reviewed it on camera'],
      ['After', 'I rebuilt the onboarding'],
    ],
    reel: 39,
  },
  {
    tag: 'Ep. 1 · Chat',
    title: 'A software engineer wanted to talk with his saves. So I built it.',
    steps: [
      ['Before', 'Search and browse your saves'],
      ['Feedback', 'What if you could just ask Sted?'],
      ['After', 'Chat with Sted'],
    ],
    episode: 1,
  },
  {
    tag: 'Ep. 4 · Monetization',
    title: 'Eduardo suggested a web-to-app funnel. So I built one.',
    steps: [
      ['Before', 'I was figuring out how to monetize Sted'],
      ['Feedback', 'Let people subscribe on the web and unlock Pro in the app'],
      ['After', 'Sted Pro launched with a RevenueCat web-to-app funnel'],
    ],
    episode: 4,
  },
  {
    tag: 'Day 34 · Website & App Store',
    title: 'People couldn’t tell what Sted does. So I changed how I explain it.',
    steps: [
      ['Before', 'A website that didn’t explain Sted clearly'],
      ['Feedback', 'Explain what Sted actually does, better'],
      ['After', 'A new website, then new App Store screenshots'],
    ],
    x: [
      { label: 'The website post', href: xPost('2102069746879606957') },
      { label: 'The screenshots post', href: xPost('2103463110875246662') },
    ],
  },
  {
    tag: 'In review · Mascot',
    title: 'I let the community help choose Sted.',
    steps: [
      ['Before', 'Different versions of the character'],
      ['Feedback', 'I shared them and asked people to choose'],
      ['After', 'The community helped choose the final Sted'],
    ],
  },
]

// Short takeaways on /shipaton-application. Plain cards: the long lesson pages still exist at /lessons/….
export const buildLessons = [
  {
    title: 'Submit Earlier Than You Think',
    text: 'App Store reviews take time. If you have a deadline, get the first MVP submitted as soon as possible.',
  },
  {
    title: 'Always Test Everything For Real',
    text: 'AI can tell you something is done and all the tests can pass. Use the real feature yourself, end to end, before believing it.',
  },
  {
    title: 'Start Distribution From Day One',
    text: 'A waitlist helps, but a waitlist isn’t users. Start talking about the problem and finding your users while you’re still building.',
  },
  {
    title: 'Launching Is Just the Beginning',
    text: 'For weeks I thought getting approved was the finish line. Then I launched and realized the next challenge was getting people to actually use Sted.',
  },
]

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
