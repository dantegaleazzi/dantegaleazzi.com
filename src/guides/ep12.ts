import type { Guide } from './types'

export const ep12: Guide = {
  number: 12,
  hook: 'Shipping is\nthe start.',
  subtitle: 'Now reality gets a vote.',
  startHere: 'What people actually do',
  notHere: 'Another week of guessing',
  intro: [
    'Everything before launch was a guess. Now you have something better: real people using the product.',
    'This guide is about learning from them — watching behavior, handling feature requests, and turning shipping into a loop that never really ends.',
  ],
  sections: [
    {
      kicker: 'Assumptions meet users',
      title: 'Before launch,\nyou have guesses.',
      body: [
        'Before launch, every decision was based on what you thought people would do. After launch, you can see what they actually do.',
        'That’s a lot of new information. The skill now is paying attention to it.',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Usage', tone: 'sky' },
            { label: 'Feedback', tone: 'lilac' },
            { label: 'Bugs', tone: 'mint' },
            { label: 'Retention', tone: 'peach' },
            { label: 'Questions', tone: 'white' },
            { label: 'Requests', tone: 'paper' },
          ],
        },
        { kind: 'banner', text: 'Reality beats another\nweek of guessing.' },
      ],
      doThis: 'Set up one simple way to see each of these: basic analytics for usage and retention, and one place where feedback and bug reports arrive.',
    },
    {
      kicker: 'Watch behavior',
      title: 'Watch what\nthey actually do.',
      body: [
        'What people say they want and what they actually use are often different. When the two disagree, trust the behavior.',
        'Look for patterns in five places:',
      ],
      visuals: [
        {
          kind: 'questions',
          items: [
            'What do people actually use?',
            'Where do they stop?',
            'What do they return to?',
            'What do they ignore?',
            'What do they ask for again?',
          ],
        },
        { kind: 'banner', text: 'Usage tells you\nwhat words can’t.' },
      ],
      doThis: 'Once a week, write one answer to each of these five questions. Compare it with last week’s answers.',
    },
    {
      kicker: 'Not every request',
      title: 'Feedback is input.\nNot a roadmap.',
      body: [
        'After launch, requests pile up fast. If you build all of them, you end up with a product that does everything and nothing well.',
        'Run every request through the same four questions before it goes anywhere near your roadmap.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'For every request',
          rows: [
            { text: 'How many people have this problem?' },
            { text: 'How important is it?' },
            { text: 'Does it strengthen the core?' },
            { text: 'What does it cost to build?' },
          ],
        },
        { kind: 'note', text: 'Then decide' },
      ],
      doThis: 'Take your last five feature requests and answer the four questions for each. Build only the ones that strengthen the core.',
    },
    {
      kicker: 'The loop never ends',
      title: 'The real\nproduct loop.',
      body: [
        'Launch isn’t a finish line. It’s the start of a loop you’ll run for as long as the product exists: ship, watch, learn, ship again.',
        'The goal isn’t to get it perfect. It’s to learn a little faster each time around.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Ship', tone: 'lilac' },
            { text: 'Watch', tone: 'sky' },
            { text: 'Learn', tone: 'mint' },
            { text: 'Ship again', tone: 'white' },
          ],
        },
        { kind: 'note', text: 'The goal isn’t perfection — it’s faster learning' },
      ],
      doThis: 'Pick a rhythm — every week or every two weeks — and put it in your calendar: ship something, look at the data, decide what’s next.',
    },
  ],
  test: {
    name: 'The Last-Week Test',
    intro: 'Two minutes to check whether you’re actually learning from your users.',
    steps: [
      'Write one thing users did last week that surprised you.',
      'Write one thing they ignored.',
      'Write one request that came up more than once.',
    ],
    result: 'If you can’t fill in all three, you’re not watching closely enough yet. Check your analytics or talk to three users this week.',
  },
  takeaway: {
    title: 'Ship before you\nknow [[everything]].',
    body: 'Then let real usage teach you what to build next.',
  },
  questions: [
    'What do people actually use the most?',
    'Where do they stop or drop off?',
    'What do they come back to?',
    'Which requests keep repeating?',
    'Does this request strengthen the core, or pull me away from it?',
    'When am I shipping next?',
  ],
  prompts: [
    {
      id: 'weekly-review',
      title: 'Run a weekly review',
      description: 'Turn usage and feedback into next week’s plan.',
      text: `Here's what happened with [Your product] this week:

Usage: [Key numbers or observations]
Feedback: [What users said]
Bugs: [What broke]
Requests: [What people asked for]

Summarize the most important things I learned, separating what users did from what they said. Then suggest the 3 most valuable things to work on next week and explain why.`,
    },
    {
      id: 'triage',
      title: 'Triage feature requests',
      description: 'Decide what to build — and what not to.',
      text: `Here are the feature requests I've received:

[List each request and how many people asked for it]

My core loop is: [Your core loop]

For each request, answer: How many people have this problem? How important is it? Does it strengthen the core? What would it cost to build (small, medium or large)? Then sort them into build now, later and no — with one line of reasoning each.`,
    },
    {
      id: 'why-they-left',
      title: 'Ask why people left',
      description: 'Learn from users who stopped using it.',
      text: `Some users tried [Your product] and stopped using it.

Write a short, friendly message asking one of them for 10 minutes of feedback — no guilt-tripping. Then write 6 questions for the conversation that focus on what they were trying to do, what got in the way and what they use instead now.`,
    },
  ],
}
