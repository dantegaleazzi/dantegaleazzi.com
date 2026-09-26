import type { Guide } from './types'

export const ep10: Guide = {
  number: 10,
  hook: 'Building it\nisn’t enough.',
  subtitle: 'People still need\nto find your product.',
  startHere: 'An audience while you build',
  notHere: 'Launching to an empty room',
  intro: [
    'AI made building faster for everyone. That means more products competing for the same attention.',
    'This guide is about building distribution while you build the product — so when you launch, someone is already listening.',
  ],
  sections: [
    {
      kicker: 'Start before launch',
      title: 'Find an audience\nbefore you launch.',
      body: [
        'The worst time to look for users is the day you launch. By then you need people, and you have no one to ask.',
        'Start while you’re still building. Every conversation, post and signup now is someone who might show up later.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: ['Post', 'Talk to users', 'Join communities', 'Interview people', 'Build a waitlist', 'Message people directly'],
        },
        { kind: 'banner', text: 'Start before\nthe product is ready.' },
      ],
      doThis: 'Pick two things from this list and do them this week. Don’t wait until the product is ready.',
    },
    {
      kicker: 'Start manually',
      title: 'Your first users\nwon’t find you.',
      body: [
        'At the start, no algorithm is going to send people your way. You find them yourself, through the network you already have.',
        'It’s slow and it doesn’t scale. That’s fine — you have nothing to scale yet.',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'DMs', tone: 'sky' },
            { label: 'Email', tone: 'lilac' },
            { label: 'Communities', tone: 'mint' },
            { label: 'Introductions', tone: 'peach' },
          ],
        },
        { kind: 'banner', text: 'Do things that don’t scale.\nYou have nothing to scale yet.' },
      ],
      doThis: 'Write down 20 people you could message about what you’re building. Send five of those messages today.',
    },
    {
      kicker: 'Find your loops',
      title: 'One post isn’t\na strategy.',
      body: [
        'A post that works once is luck. Distribution that lasts comes from loops: something that brings people in and creates the next thing that brings more people in.',
        'Look for loops you can repeat:',
      ],
      visuals: [
        {
          kind: 'cards',
          items: [
            { label: 'Content', text: 'Content → Discovery → Signup', tone: 'sky' },
            { label: 'Referral', text: 'User → Share → New user', tone: 'lilac' },
            { label: 'Story', text: 'Interview → Content → Audience', tone: 'mint' },
            { label: 'Product', text: 'Feedback → Product → Story', tone: 'white' },
          ],
        },
        { kind: 'banner', text: 'Repeat what works.' },
      ],
      doThis: 'Choose one loop that fits you and run it every week for a month before you judge whether it works.',
    },
    {
      kicker: 'Sted in public',
      fromSted: true,
      title: 'Building Sted\nin public.',
      body: [
        'With Sted, I shared the process instead of waiting for a finished product. I interviewed people, showed the failures and asked them to try it.',
        'The story became the distribution.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Shared the process', tone: 'lilac' },
            { text: 'Interviewed people', tone: 'sky' },
            { text: 'Showed the failures', tone: 'mint' },
            { text: 'Asked them to try it', tone: 'white' },
          ],
        },
        { kind: 'banner', text: 'The story created\nthe audience.' },
      ],
      doThis: 'Share one thing you learned this week while building — including what went wrong. That’s your first piece of distribution.',
    },
  ],
  test: {
    name: 'The Empty Room Test',
    intro: 'Find out in two minutes who would hear about your launch if it happened today.',
    steps: [
      'Imagine you launch today.',
      'Write down every person, community and channel that would actually hear about it.',
      'Next to each one, mark whether they already know what you’re building.',
    ],
    result:
      'If the list is short, or nobody on it knows what you’re building, you’d be launching to an empty room. Start distribution this week, not after launch.',
  },
  takeaway: {
    title: 'Build distribution\nwhile you build\nthe [[product]].',
    body: 'Don’t launch to an empty room. Start telling people now.',
  },
  questions: [
    'Who knows I’m building this right now?',
    'Where do my first users already spend time?',
    'Who could I message today?',
    'What’s one loop I can repeat every week?',
    'Am I sharing the process, or waiting until it’s perfect?',
    'If I launched tomorrow, who would show up?',
  ],
  prompts: [
    {
      id: 'channels',
      title: 'Find my first channels',
      description: 'Where your first users already are.',
      text: `I'm building [Your product] for [Your first market].

List the most promising places to find my first 100 users without paid ads: specific communities, platforms, newsletters, events and types of people to message. For each one, tell me how to show up without spamming and what kind of message or content would fit.`,
    },
    {
      id: 'build-in-public',
      title: 'Plan build-in-public posts',
      description: 'Turn your process into content.',
      text: `I'm building [Your product] in public on [Platform].

This week I: [What you built, learned, broke or decided]

Turn this into 3 short post ideas: one about a lesson, one about a mistake and one showing progress. Keep my voice simple and honest — no hype. End each one with a light invitation to follow along or try the product.`,
    },
    {
      id: 'outreach',
      title: 'Write outreach messages',
      description: 'Messages that feel personal, not like a pitch.',
      text: `I want to message people who might need [Your product].

Who they are: [Specific group]
How I know them or found them: [Context]
What I'm asking for: [Feedback, to try the beta or a short call]

Write 3 short message variations: personal, specific, easy to reply to, no pitch-deck language. Include one version for someone who doesn't know me at all.`,
    },
  ],
}
