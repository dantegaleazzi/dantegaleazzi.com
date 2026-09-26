import type { Guide } from './types'

export const ep07: Guide = {
  number: 7,
  hook: 'Your app isn’t\ndone when\nit works.',
  subtitle: 'Put it in someone else’s hands.',
  startHere: 'Real hands, early',
  notHere: 'Waiting until it feels perfect',
  intro: [
    'Your app works on your phone. That doesn’t mean it works for anyone else.',
    'This guide is about getting it into real hands early: how to watch people use it, what to ask them, and what to do with what you hear.',
  ],
  sections: [
    {
      kicker: 'You know too much',
      title: 'You’re the worst\nperson to test\nyour own app.',
      body: [
        'You know where everything is, what every button does and what you meant to build. You can’t un-know it.',
        'Your users arrive with none of that. The gap between what you know and what they see is exactly what you need to find.',
      ],
      visuals: [{ kind: 'banner', text: 'Your users don’t.\nThat’s the point.' }],
      doThis: 'Find three people from your first market who have never seen the app. Book 20 minutes with each of them this week.',
    },
    {
      kicker: 'Watch what they do',
      title: 'Don’t explain\nthe app first.',
      body: [
        'The moment you explain the app, you’ve ruined the test. Real users won’t have you sitting next to them.',
        'Give them a goal instead — “save this and find it later” — and watch. Stay quiet, even when they struggle.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: ['Where do they tap?', 'Where do they stop?', 'What do they misunderstand?', 'What do they ignore?'],
        },
        { kind: 'banner', text: 'Confusion is feedback.' },
      ],
      doThis: 'Write one goal for your test, in the user’s words. During the session, note every place people pause, tap the wrong thing or ask a question.',
    },
    {
      kicker: 'Ask better questions',
      title: '“Do you like it?”\nteaches you nothing.',
      body: [
        'People are polite. Ask if they like it and they’ll say yes.',
        'Ask about their experience instead: what they expected, what confused them, what would bring them back. Then compare their answers with what they actually did.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'Ask instead',
          rows: [
            { text: 'What did you expect to happen?' },
            { text: 'What was confusing?' },
            { text: 'What would make you use this again?' },
            { text: 'What’s missing?' },
          ],
        },
        { kind: 'note', text: 'Then look at what they actually do' },
      ],
      doThis: 'Replace every “do you like it?” in your interview notes with one of these four questions.',
    },
    {
      kicker: 'What feedback did',
      fromSted: true,
      title: 'The Sted I imagined\nisn’t what we shipped.',
      body: [
        'Talking to people surfaced needs and ideas I hadn’t thought of.',
        'Not all of it made it into the product. Some became features, some changed what we worked on first, and some we decided to ignore.',
      ],
      visuals: [
        {
          kind: 'cards',
          items: [
            { label: 'Some', text: 'Became features', tone: 'mint' },
            { label: 'Some', text: 'Changed priorities', tone: 'sky' },
            { label: 'Some', text: 'We ignored', tone: 'white' },
          ],
        },
        { kind: 'banner', text: 'Feedback isn’t a list\nof things to build.' },
      ],
      doThis: 'Sort every piece of feedback into three piles: build, reprioritize, ignore. For anything you ignore, write down why.',
    },
  ],
  test: {
    name: 'The Silent Test',
    intro: 'Two minutes of watching tells you more than an hour of explaining.',
    steps: [
      'Hand your app to someone who has never seen it.',
      'Give them one goal, then say nothing for two minutes.',
      'Write down every place they pause, tap the wrong thing or look confused.',
    ],
    result: 'Every pause is something to fix. If you had to explain anything, that’s the first fix.',
  },
  takeaway: {
    title: 'Get it into real\nhands [[early]].',
    body: 'Don’t wait until it feels perfect. Watch, listen, learn, then decide.',
  },
  questions: [
    'Who outside my circle has used the app this week?',
    'Did I give them a goal, or explain the app first?',
    'Where did they get stuck?',
    'Did I ask about their experience, or just whether they liked it?',
    'What did they do that I didn’t expect?',
    'Which feedback am I going to ignore — and why?',
  ],
  prompts: [
    {
      id: 'test-plan',
      title: 'Plan a user test',
      description: 'A simple script for your first sessions.',
      text: `I'm testing my app with real users for the first time.

App: [What it does]
Target user: [Your first market]
Main thing I want to learn: [e.g. can they complete the core loop without help]

Write a 20-minute test plan: how to start the session without explaining the app, 3 goals to give the user, what to watch for, and 5 follow-up questions that don't ask for opinions. Keep it simple enough to run over a video call.`,
    },
    {
      id: 'recruit',
      title: 'Recruit first testers',
      description: 'Messages to find people who will actually try it.',
      text: `I need 5 people to test my app this week.

App: [What it does]
Who I need: [Your first market]
Where I can reach them: [Communities, contacts, platforms]

Write 3 short, honest messages I could send — a DM, an email and a community post — asking for 20 minutes of their time. Make it clear what's in it for them and that I want honest feedback, not compliments.`,
    },
    {
      id: 'sort-feedback',
      title: 'Sort my feedback',
      description: 'Turn raw notes into decisions.',
      text: `Here are my notes from user tests and conversations:

[Paste your notes]

Group the feedback into themes. For each theme, tell me how many people mentioned it, whether it's about something they did or something they said, and whether it affects the core loop. Then sort everything into: build now, reconsider later, ignore — with a one-line reason for each.`,
    },
  ],
}
