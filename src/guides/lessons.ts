import type { Guide, GuideMeta } from './types'

const twoApps: Guide = {
  hook: 'Two apps.\nSix weeks.\n[[Zero]] coding experience.',
  subtitle: 'The mistakes I’d avoid and what I’d do again.',
  startHere: 'What actually broke',
  notHere: 'The highlight reel',
  intro: [
    'During RevenueCat’s Shipaton I shipped two apps with AI: Sted, a place to save things and actually find them later, and Shimpaku, a focus timer with a garden that grows.',
    'I don’t know how to code. These are the lessons that cost me the most time — so they don’t cost you yours.',
  ],
  sections: [
    {
      kicker: 'Let people try first',
      fromSted: true,
      title: 'Apple rejected Sted\nfor asking too early.',
      body: [
        'The first version of Sted asked you to create an account before you could save anything. Apple rejected it under Guideline 5.1.1(v): the app required people to register before adding links.',
        'The fix was to let people save as a guest, on their own device, and ask for an account later — when it actually adds something.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Rejected: sign up before saving', tone: 'peach' },
            { text: 'Fix: save as a guest', tone: 'sky' },
            { text: 'Account later, when it’s useful', tone: 'mint' },
          ],
        },
        { kind: 'banner', text: 'Let people reach the value\nbefore you ask for anything.' },
      ],
      doThis:
        'Open your app as a brand-new user and count the screens before they can do the core action. Anything that isn’t required by the feature itself can move later.',
    },
    {
      kicker: 'Store details',
      title: 'The boring rules\ncost the most time.',
      body: [
        'Some of my slowest days had nothing to do with features. Once version 1.1 of Sted was live, Apple wouldn’t take another 1.1 build — the version had to move to 1.2.',
        'Adding subscriptions also changed Shimpaku’s privacy label: RevenueCat receives an anonymous ID and purchase history, so “Data Not Collected” was no longer true. And prices live in RevenueCat, never in the code, so I can change them without a new release.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: [
            'Raise the version number after every release',
            'Update the privacy label when you add a service',
            'Keep prices in RevenueCat, not in the code',
            'Leave time for a second review',
          ],
        },
        { kind: 'banner', text: 'Read the rules before\nthey read your app.' },
      ],
      doThis:
        'Before you submit, read the App Store Review Guidelines sections on accounts, payments and minimum functionality. Write down anything your app does that touches them.',
    },
    {
      kicker: 'Working with AI',
      title: 'One AI agent\nper job.',
      body: [
        'What worked best was giving each AI a clear role. On Shimpaku, Claude acted as CTO and wrote the specs, a separate coding session built them one by one, and Codex generated the art.',
        'Each agent worked in its own folder and branch, so they never overwrote each other. When a session ended, a written handoff file let the next one pick up without me explaining everything again.',
      ],
      visuals: [
        {
          kind: 'cards',
          items: [
            { label: 'CTO', text: 'Plans, reviews and writes the specs.', tone: 'lilac' },
            { label: 'Developer', text: 'Builds one well-defined piece at a time.', tone: 'sky' },
            { label: 'Artist', text: 'Generates the illustrations and assets.', tone: 'mint' },
          ],
        },
        { kind: 'note', text: 'Real art beats code that imitates it — faking hand-drawn strokes failed twice' },
      ],
      doThis:
        'Write a one-page handoff for your project: what it is, how it’s built, what’s done and what’s next. Start every new AI session by giving it that file.',
    },
    {
      kicker: 'Check it for real',
      title: 'If you didn’t see it,\nit isn’t done.',
      body: [
        'Type checks passed twice on Shimpaku while the app crashed on a real device. Now nothing counts as done until I’ve seen it running.',
        'Small habits helped too: one dedicated simulator per project — installing another build over it once wiped a signed-in session — and asking the AI to propose a change before it edits anything.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: [
            'Run it on a device or simulator',
            'Look at a screenshot of the result',
            'One simulator per project',
            'Ask for a proposal before any edit',
          ],
        },
        { kind: 'banner', text: 'AI says “done”.\nYou check.' },
      ],
    },
  ],
  test: {
    name: 'The First-Minute Test',
    intro: 'Two minutes to see your app the way a reviewer — or a brand-new user — sees it.',
    steps: [
      'Delete the app and install it fresh.',
      'Time how long it takes to do the core action once.',
      'Write down every screen that asks for something before that moment.',
    ],
    result: 'Every screen before the value is a reason to leave — and a possible rejection. Move what you can to later.',
  },
  takeaway: {
    title: 'Ship it, then\n[[fix what’s real]].',
    body: 'Most of what slowed me down only showed up once real people — and Apple — used the app.',
  },
  questions: [
    'Can a new user reach the core action without an account?',
    'Have I read the guidelines that apply to my app?',
    'Is my version number higher than the one that’s live?',
    'Does my privacy label match every service I added?',
    'Does each AI session know its role and have a handoff to read?',
    'Have I seen this feature running, not just compiling?',
  ],
  prompts: [
    {
      id: 'review-risk',
      title: 'Check App Store review risks',
      description: 'Find likely rejections before Apple does.',
      text: `I'm about to submit my app to the App Store.

What it does: [Your app]
Accounts: [Does it require sign-up? When?]
Payments: [Subscriptions, one-time purchases or none]
Third-party services: [Analytics, RevenueCat, AI APIs…]

Act as an App Store reviewer. List the guidelines my app is most likely to be rejected under, why, and the smallest change that would fix each one. Include the privacy label answers I should double-check.`,
    },
    {
      id: 'handoff',
      title: 'Write a handoff for the next AI session',
      description: 'So a fresh session can continue without you.',
      text: `Write a HANDOFF.md for this project so a new AI session can continue without me explaining anything.

Include: what the app does and for whom, the tech stack, how the code is organized, how to run it, what's done, what's in progress, known issues, and the rules it must follow (things we decided not to do, and why).

Here's what you need to know: [Paste your notes, or ask me questions one at a time]`,
    },
    {
      id: 'cto-review',
      title: 'Get a CTO plan before you build',
      description: 'Split a feature into safe, checkable tasks.',
      text: `Act as the CTO of my app. Don't write code.

Here's the feature I want to build: [Your feature]

Break it into small tasks a separate coding agent can do one at a time. For each task, write the goal, the files it will probably touch, what "done" looks like and how to check it on a real device. Flag anything risky for App Store review.`,
    },
  ],
}

const websites: Guide = {
  hook: 'How I build\nmy websites\n[[with AI]].',
  subtitle: 'The exact process behind this site.',
  startHere: 'References and a design system',
  notHere: 'A blank prompt',
  intro: [
    'I don’t write the code for my websites — AI does. This site was built with Claude and Codex, and it goes live every time I push a change.',
    'This is the process, step by step, with the tools and prompts I use.',
  ],
  sections: [
    {
      kicker: 'Start with references',
      title: 'Show AI what\ngood looks like.',
      body: [
        'Every page starts with references, not a prompt. For the guides on this site I studied how RevenueCat structures its blog: a short header, a summary, a table of contents and a quick test.',
        'I collect a few references, write down exactly what I like about each one, and give that to the AI.',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Layouts', tone: 'sky', text: 'Pages whose structure works for you.' },
            { label: 'Screens', tone: 'lilac', text: 'Real app screens from Mobbin.' },
            { label: 'Brand', tone: 'mint', text: 'Your colors, fonts and tone.' },
            { label: 'Content', tone: 'butter', text: 'What the page has to say.' },
          ],
        },
      ],
      doThis: 'Collect three pages you like and write one sentence for each about what to copy.',
    },
    {
      kicker: 'Design system first',
      title: 'Decide the look\nbefore the pages.',
      body: [
        'Before building pages, I fix the rules: colors, fonts, spacing and a few components. This site uses the same system as my Instagram carousels — cream paper, ink borders and one yellow — so everything looks like one brand.',
        'With a system in place, the AI stops inventing a new style on every page.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'Design system',
          rows: [
            { text: 'Colors: ink, paper and one yellow' },
            { text: 'Fonts: Space Grotesk and DM Mono' },
            { text: 'Components: cards, banners, buttons' },
            { text: 'Rule: one yellow per section' },
          ],
        },
      ],
      doThis: 'Write your design system on one page: 3–5 colors, 2 fonts and the 5 components you’ll reuse.',
    },
    {
      kicker: 'Content apart from design',
      title: 'Keep the words\nout of the layout.',
      body: [
        'All the text and links on this site live in simple content files, and the design reads from them.',
        'I can add a guide, fix a link or change a title without touching the layout — and the AI can’t break the design while it edits copy.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Content files', tone: 'sky' },
            { text: 'Page templates', tone: 'lilac' },
            { text: 'Live site', tone: 'mint' },
          ],
        },
      ],
      doThis: 'Ask your AI to move all text and links into one content file before you start changing copy.',
    },
    {
      kicker: 'Ship safely',
      title: 'Preview, snapshot,\nthen ship.',
      body: [
        'I work on my own branch, in a separate folder, so another AI agent can work on the site at the same time without collisions. Every change gets checked on desktop and mobile before it goes live.',
        'Before a redesign I save a snapshot of the old version — a tag in Git and a hidden copy online — so I can always go back. The site runs on Cloudflare, and pushing to the main branch deploys it.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: ['One branch and folder per agent', 'Check desktop and mobile', 'Snapshot before big changes', 'Push to deploy'],
        },
        { kind: 'note', text: 'Stack: Vite · React · Tailwind · Cloudflare · Resend' },
        { kind: 'banner', text: 'Small steps.\nAlways reversible.' },
      ],
    },
  ],
  test: {
    name: 'The Reference Test',
    intro: 'Two minutes to know if your AI has enough to design a good page.',
    steps: [
      'Write what the page is for in one sentence.',
      'List three references and what you like about each.',
      'Write down your colors and fonts.',
    ],
    result: 'If you can’t fill in all three, the AI will guess — and you’ll spend hours fixing its guesses.',
  },
  takeaway: {
    title: 'AI builds.\n[[You set the system]].',
    body: 'References, a design system and content files do more for the result than any single prompt.',
  },
  questions: [
    'Do I have references for this page?',
    'Is my design system written down?',
    'Is the content separate from the layout?',
    'Did I check it on mobile?',
    'Can I go back if this change goes wrong?',
    'What’s the one thing this page must get people to do?',
  ],
  prompts: [
    {
      id: 'design-system',
      title: 'Create a design system',
      description: 'The rules your AI follows on every page.',
      text: `Create a simple design system for my website.

Brand: [What you do and for whom]
Feeling: [3 words]
References: [Links and what you like about each]

Give me 3–5 colors with hex codes and when to use each, 2 Google Fonts with sizes for headings and body, spacing rules, and 5 reusable components (button, card, section header, banner, list). Keep it small enough to fit on one page.`,
    },
    {
      id: 'page-from-references',
      title: 'Build a page from references',
      description: 'A page that follows your system.',
      text: `Build this page for my website: [The page and its goal]

Use my design system: [Paste it]
References: [Links and what to copy from each]
Content: [Paste the text, or ask me for it]

Put all text and links in a separate content file. Make it work on mobile first. When you're done, tell me how to check it on desktop and mobile.`,
    },
    {
      id: 'site-review',
      title: 'Get a brutally honest review',
      description: 'A designer and a devil’s advocate in one.',
      text: `Act as a senior web designer and a devil's advocate. Here's my page: [Screenshot or URL]

Its goal: [The one thing a visitor should do]

Tell me what's working, what's confusing, where the eye goes first and what you'd remove. Then propose a clearer structure, top to bottom, in plain words.`,
    },
  ],
}

export const lessonsAnchor = '/#lessons'

export const lessons = [
  {
    path: '/lessons/2-apps-in-6-weeks',
    title: 'What I Learned Building 2 Apps in 6 Weeks',
    description: 'The rejection, the store rules, working with several AI agents and checking everything for real.',
    file: 'LESSONS_2_APPS.DOC',
    guide: twoApps,
  },
  {
    path: '/lessons/how-i-build-my-websites',
    title: 'How I Build My Websites',
    description: 'References, a design system, content files and a safe way to ship — the process behind this site.',
    file: 'HOW_I_BUILD_WEBSITES.DOC',
    guide: websites,
  },
]

export function lessonMeta(index: number): GuideMeta {
  const link = (target: number) =>
    lessons[target] && { href: lessons[target].path, label: `Lesson ${target + 1}`, title: lessons[target].title }
  return {
    title: lessons[index].title,
    file: lessons[index].file,
    crumb: { href: lessonsAnchor, label: 'Lessons' },
    back: { href: lessonsAnchor, label: 'Back to lessons' },
    part: `Lesson ${index + 1} of ${lessons.length}`,
    prev: link(index - 1),
    next: link(index + 1),
  }
}
