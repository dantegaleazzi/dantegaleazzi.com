import type { Guide } from './types'

export const ep13: Guide = {
  number: 13,
  chip: 'The whole journey',
  hook: 'From an idea\nto a company,\nwith AI.',
  subtitle: 'What building Sted taught me.',
  startHere: 'A real problem',
  notHere: 'Waiting to feel ready',
  intro: [
    'This is the last part of the series: twelve steps, from finding a problem to shipping and learning from real users.',
    'Here’s what building Sted with AI taught me — and what I’d do again if I started tomorrow.',
  ],
  sections: [
    {
      kicker: 'AI changed the speed',
      title: 'AI made building\nmuch faster.',
      body: [
        'I don’t know how to code. With AI, I could design, code, research and analyze feedback myself.',
        'That speed changes what one person can build on their own.',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Design', tone: 'sky' },
            { label: 'Code', tone: 'lilac' },
            { label: 'Research', tone: 'mint' },
            { label: 'Content', tone: 'peach' },
          ],
        },
        { kind: 'banner', text: 'But speed wasn’t\nthe hardest part.' },
      ],
      doThis: 'List the parts of your project you’ve been waiting on someone else for. Try one of them with AI this week.',
    },
    {
      kicker: 'Founder problems',
      title: 'AI can’t decide\nfor you.',
      body: [
        'The hardest questions weren’t technical. They were about what to build, for whom and why anyone should care.',
        'AI can help you think them through. It can’t answer them for you.',
      ],
      visuals: [
        {
          kind: 'questions',
          items: [
            'Which problem matters?',
            'Who needs it?',
            'What should you build — and ignore?',
            'How do you reach people?',
            'Why should they care?',
          ],
        },
        { kind: 'banner', text: 'Execution got cheaper.\nJudgment didn’t.' },
      ],
      doThis: 'Write your current answer to each of these five questions. Circle the one you’re least sure about — that’s what to work on next.',
    },
    {
      kicker: 'The whole journey',
      title: 'Twelve steps\nfrom zero.',
      body: [
        'The series follows the order I’d do it in. The first half is about building the right thing. The second half is about getting it to people.',
        'You don’t have to be perfect at each step. You do have to do them.',
      ],
      visuals: [
        {
          kind: 'panels',
          panels: [
            {
              label: 'Build it',
              tone: 'sky',
              items: ['01 Problem', '02 Market', '03 Validate', '04 MVP', '05 Name', '06 Build'],
            },
            {
              label: 'Launch it',
              tone: 'mint',
              items: ['07 Users', '08 Company', '09 Money', '10 Distribution', '11 Launch', '12 Iterate'],
            },
          ],
        },
        { kind: 'banner', text: 'That’s the playbook.' },
      ],
      doThis: 'Find the step you’re on right now and go back to that guide. Move on only when you can answer its questions.',
    },
    {
      kicker: 'What I’d do again',
      fromSted: true,
      title: 'If I started\nagain tomorrow.',
      body: ['Looking back at everything, this is the short list I’d follow from day one.', 'None of it is about code. All of it is about learning faster.'],
      visuals: [
        {
          kind: 'checklist',
          items: [
            'Start with a real problem',
            'Talk to people earlier',
            'Test cheaply',
            'Build less, ship faster',
            'Get real users',
            'Build distribution from day 1',
            'Use AI for speed',
          ],
        },
        { kind: 'banner', text: 'Keep the judgment human.' },
      ],
    },
  ],
  test: {
    name: 'The Start-Tomorrow Test',
    intro: 'You don’t need to feel ready. You need three answers.',
    steps: [
      'Write the one problem you’d work on.',
      'Write the first person you’d talk to about it.',
      'Write the cheapest test you could run this week.',
    ],
    result: 'If you can write all three, you’re ready to start. Go back to Part 1 and begin.',
  },
  takeaway: {
    title: 'Start before you\nfeel [[ready]].',
    body: 'AI gives us leverage that didn’t exist before. Use it to learn faster. Build things.',
  },
  questions: [
    'What problem am I solving, and for whom?',
    'Which step of the journey am I really on?',
    'What am I using AI for — and what am I still deciding myself?',
    'What’s the cheapest thing I can learn this week?',
    'Who have I talked to this week?',
    'What am I waiting for before I start?',
  ],
  prompts: [
    {
      id: 'where-am-i',
      title: 'Find where I am',
      description: 'Place your project on the 12-step journey.',
      text: `Here's where my project is right now:

[Describe your idea, what you've built, who you've talked to and what's working]

Using these 12 steps — Problem, Market, Validate, MVP, Name, Build, Users, Company, Money, Distribution, Launch, Iterate — tell me which step I'm really on, which earlier steps I may have skipped, and the 3 most important things to do next.`,
    },
    {
      id: 'next-30-days',
      title: 'Plan my next 30 days',
      description: 'A realistic plan built around learning.',
      text: `I'm working on [Your product] on my own, with about [Hours] hours a week.

Where I am: [Your current step]
Biggest open question: [What you don't know yet]

Build a 30-day plan, week by week, focused on learning as fast as possible. Include who to talk to, what to build (only if needed), what to test and what to share publicly each week.`,
    },
    {
      id: 'thinking-partner',
      title: 'Use AI as a thinking partner',
      description: 'Get pushback, not just agreement.',
      text: `Act as a skeptical co-founder. I'm about to make a decision about [Your product].

Decision: [What you want to do]
Why: [Your reasoning]

Push back. Ask me the 5 hardest questions about this decision, point out what I might be missing, and tell me what evidence would change your mind. Don't just agree with me.`,
    },
  ],
}
