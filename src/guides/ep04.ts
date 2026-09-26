import type { Guide } from './types'

export const ep04: Guide = {
  number: 4,
  hook: 'Your MVP is\nprobably too big.',
  subtitle: 'Build one complete loop.\nNot a smaller version of everything.',
  startHere: 'The core loop',
  notHere: 'Every feature',
  intro: [
    'You’ve validated that people care. Now it’s time to build — but less than you think.',
    'This guide is about defining the smallest product that can test your core value: one complete loop, not a smaller version of everything you imagined.',
  ],
  sections: [
    {
      kicker: 'What an MVP is',
      title: 'An MVP isn’t\n“fewer features.”',
      body: [
        'Most first MVPs are the full product with the edges trimmed. That still takes months, and when it doesn’t work, you can’t tell why.',
        'An MVP is the smallest product that can test your core value. It starts from the problem, lets the user do one core action and delivers the value.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Problem', tone: 'lilac' },
            { text: 'Core action', tone: 'sky' },
            { text: 'Value', tone: 'mint' },
          ],
        },
        { kind: 'banner', text: 'Everything else can wait.' },
      ],
      doThis:
        'Write your MVP as three lines: the problem, the one core action, the value the user gets. If you need more than one core action, pick the one that matters most.',
    },
    {
      kicker: 'The value moment',
      title: 'The moment they say\n“oh, this is useful.”',
      body: [
        'Every good product has a moment where the user gets it. Before that moment, they’re evaluating. After it, they want to come back.',
        'Your MVP should get people to that moment as fast as possible — and make them want to repeat it.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'User arrives', tone: 'lilac' },
            { text: 'Does one core thing', tone: 'sky' },
            { text: 'Gets value', tone: 'mint' },
            { text: 'Wants to do it again', tone: 'white' },
          ],
        },
        { kind: 'banner', text: 'Build around that moment.' },
      ],
      doThis:
        'Describe your value moment in one sentence: “The user realizes this is useful when ___.” Then count the steps it takes to get there, and cut steps until it’s as short as it can be.',
    },
    {
      kicker: 'Cut hard',
      title: 'Your MVP needs\na [[not building]] list.',
      body: [
        'Every feature has a cost: time to build, more things to break, more to explain. Ideas without evidence are the most expensive, because you don’t even know if anyone wants them.',
        'Write down what you’re not building. It keeps the scope honest when new ideas show up halfway through.',
      ],
      visuals: [
        {
          kind: 'panels',
          panels: [
            { label: 'Now', tone: 'mint', items: ['Core user journey', 'Critical functionality', 'Enough quality to test', 'Basic measurement'] },
            { label: 'Later', tone: 'peach', items: ['Nice-to-have features', 'Extra customization', 'Edge cases', 'Ideas without evidence'] },
          ],
        },
        { kind: 'note', text: 'Every feature has a cost' },
      ],
      doThis:
        'Make two columns: Now and Later. Put every feature you’ve thought of in one of them. Anything that isn’t needed for the core loop goes to Later.',
    },
    {
      kicker: 'The Sted loop',
      fromSted: true,
      title: 'For Sted, the core\nloop was simple.',
      body: [
        'Sted could grow in a lot of directions. But the first version only had to prove one loop: you save something, the app understands it, and you can find and use it later.',
        'If that loop didn’t work, nothing built on top of it would matter.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Save something', tone: 'sky' },
            { text: 'Understand it', tone: 'lilac' },
            { text: 'Find and use it later', tone: 'mint' },
          ],
        },
        { kind: 'note', text: 'The product can grow later' },
        { kind: 'banner', text: 'First, prove the loop.' },
      ],
      doThis: 'Write your own loop in three steps, like Sted’s. If it takes more than three, you’re probably describing more than one product.',
    },
  ],
  test: {
    name: 'The One-Sentence MVP Test',
    intro: 'A two-minute way to find out what your MVP really needs.',
    steps: [
      'Finish this sentence: “A user can ___ and gets ___.”',
      'List every feature you planned for version one.',
      'Cross out every feature that sentence doesn’t need.',
    ],
    result: 'What’s left is your MVP. If you didn’t cross anything out, you haven’t cut hard enough.',
  },
  takeaway: {
    title: 'Build one\n[[complete loop]].\nNot every feature.',
    body: 'Your MVP only needs enough to prove the core value.',
  },
  questions: [
    'What is the one core action in my product?',
    'What is the value moment — and how fast can a new user reach it?',
    'Would the loop still work if I removed this feature?',
    'What’s on my “not building” list?',
    'Is the quality good enough to test the value, even if it isn’t polished?',
    'How will I know if the loop is working?',
  ],
  prompts: [
    {
      id: 'core-loop',
      title: 'Find my core loop',
      description: 'Reduce your idea to one complete loop.',
      text: `Here's the product I want to build:

[Describe your product and every feature you have in mind]

Act as a product lead who hates scope creep. Identify the one core loop that proves the product's value, in three steps or fewer. Then split every feature into "Now" (needed for the loop) and "Later" (everything else), and explain each decision in one line.`,
    },
    {
      id: 'not-building',
      title: 'Write my not-building list',
      description: 'Protect your scope before you start.',
      text: `My MVP's core loop is: [Your core loop]

Here's my current feature list: [Your features]

Write a "not building" list for version one: every feature, integration or edge case I should explicitly leave out, and why. Then list the minimum I need to measure to know if the loop works.`,
    },
    {
      id: 'mvp-spec',
      title: 'Turn it into a one-page spec',
      description: 'A short brief you can hand to an AI builder.',
      text: `Turn this MVP into a one-page spec I can give to an AI coding tool:

Problem: [Your problem]
Target user: [Your first market]
Core loop: [Your core loop]

Include: the screens I need (and nothing more), what each screen does, the data I need to store, what "done" looks like for version one, and what's explicitly out of scope.`,
    },
  ],
}
