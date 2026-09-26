import type { Guide } from './types'

export const ep11: Guide = {
  number: 11,
  hook: 'Pressing publish\nisn’t a launch.',
  subtitle: 'Your product can be ready\nwhile your launch isn’t.',
  startHere: 'People already waiting',
  notHere: 'Publish, then look for users',
  intro: [
    'A launch is the moment product, distribution and users meet. Pressing publish is only one part of it.',
    'This guide is about getting all three ready: making sure the core journey works, clearing the boring dependencies and knowing exactly who you’ll tell.',
  ],
  sections: [
    {
      kicker: 'Make sure it works',
      title: 'Try to break it\nbefore they do.',
      body: [
        'Before launch, walk through the whole journey the way a new user would: from discovering the product to coming back a second time.',
        'You won’t fix every flaw. Fix whatever blocks the loop.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'The core journey',
          rows: [{ text: 'Discover' }, { text: 'Sign up' }, { text: 'Core action' }, { text: 'Get value' }, { text: 'Come back' }],
        },
        { kind: 'note', text: 'Fix what blocks the loop, not every flaw' },
      ],
      doThis: 'Go through the five steps on a fresh device or account. Write down anything that stops you — those are your launch blockers.',
    },
    {
      kicker: 'Boring dependencies',
      title: 'Launch has\ndependencies.',
      body: [
        'Store listings, screenshots, privacy policies, payments, analytics, support, a landing page. None of them is the product, and any of them can delay the launch.',
        'Some need review or approval, so they can’t be done the night before.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: ['Store listing', 'Screenshots', 'Privacy + legal', 'Payments', 'Analytics', 'Support', 'Landing page'],
        },
        { kind: 'banner', text: 'What you leave until launch\nweek becomes the launch.' },
      ],
      doThis: 'Go through the checklist and mark what’s done. Start anything that needs review or approval today.',
    },
    {
      kicker: 'Know who you’ll tell',
      title: 'Don’t publish\nand then ask:',
      body: [
        'If you only start thinking about users after you hit publish, you’ve already missed your best chance to get attention.',
        'Know exactly who you’ll tell before launch day — and have people waiting.',
      ],
      visuals: [
        { kind: 'callout', label: 'The question', text: '“Now where do I\nfind users?”' },
        {
          kind: 'chips',
          items: [
            { label: 'Waitlist', tone: 'sky' },
            { label: 'Testers', tone: 'lilac' },
            { label: 'Friends', tone: 'mint' },
            { label: 'Communities', tone: 'peach' },
            { label: 'Content', tone: 'white' },
            { label: 'Outreach', tone: 'paper' },
          ],
        },
        { kind: 'note', text: 'Have people waiting before you publish' },
      ],
      doThis: 'Write your launch list: every person, group and channel you’ll tell on launch day, and what you’ll say to each.',
    },
    {
      kicker: 'What Sted taught me',
      fromSted: true,
      title: 'Sted was rejected\nbefore approval.',
      body: [
        'Sted was rejected by the App Store before it was approved. I fixed the issues, submitted again, waited again — and then Apple said yes.',
        'Getting approved meant people could download it. It didn’t mean they would.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Fixed the issues', tone: 'lilac' },
            { text: 'Submitted again', tone: 'sky' },
            { text: 'Waited again', tone: 'mint' },
            { text: 'Apple said yes', tone: 'white' },
          ],
        },
        { kind: 'banner', text: 'Approval wasn’t the launch.\nWe still needed people.' },
      ],
      doThis: 'If you’re publishing to an app store, leave room in your plan for a rejection and a second review.',
    },
  ],
  test: {
    name: 'The Launch Day Test',
    intro: 'Two minutes to see if your launch is ready — not just your product.',
    steps: [
      'Imagine it’s launch day.',
      'Write the first ten people or places you’ll tell, and what you’ll say to each.',
      'Write the steps a new user needs to get value, and mark any that don’t work yet.',
    ],
    result: 'Every blank line is work to do before you publish. The product being ready is only half of the launch.',
  },
  takeaway: {
    title: 'Prepare the\n[[launch]], not just\nthe product.',
    body: 'Product, distribution and users have to meet at the same time.',
  },
  questions: [
    'Can a new user get through the core journey without my help?',
    'What would block the loop on launch day?',
    'Which dependencies need review or approval?',
    'Who will I tell on launch day, and what will I say?',
    'Do I have people waiting before I publish?',
    'What’s my plan if the store rejects the app?',
  ],
  prompts: [
    {
      id: 'launch-checklist',
      title: 'Build my launch checklist',
      description: 'Everything that has to be ready, in order.',
      text: `I'm launching [Your product] on [App Store, Google Play or web] on [Date].

Create a launch checklist split into: product (core journey, bugs that block the loop), store and legal (listing, screenshots, privacy policy, payments), measurement (analytics, a feedback channel) and distribution (who to tell, where and when). Mark which items need review or approval and should start first.`,
    },
    {
      id: 'store-listing',
      title: 'Write my store listing',
      description: 'A title, subtitle and description that explain the value.',
      text: `Write an App Store listing for my app.

What it does: [Your product]
Who it's for: [Your first market]
Main value: [Your value moment]
Key features: [3–5 features]

Give me 3 title options, 3 subtitle options, a short description focused on the value (not a feature list), and captions for 5 screenshots that tell a story in order.`,
    },
    {
      id: 'launch-week',
      title: 'Plan launch week',
      description: 'A day-by-day plan for telling people.',
      text: `I'm launching [Your product] next week.

Who's waiting: [Waitlist, testers, communities, audience]
Channels I can use: [Platforms, email, communities]

Write a simple launch-week plan, day by day: who to tell, where, what to say and what to ask for. Include messages for my waitlist, for my testers and one community post. Keep the tone honest and personal.`,
    },
  ],
}
