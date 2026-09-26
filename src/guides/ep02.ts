import type { Guide } from './types'

export const ep02: Guide = {
  number: 2,
  hook: 'Don’t start\nwith everyone.',
  subtitle: 'Start with the people\nwho need it most.',
  startHere: 'A specific group',
  notHere: 'Everyone',
  intro: [
    'You found a real problem. The next mistake is trying to solve it for everyone who has it.',
    'This guide is about choosing your first market: a group small enough to reach, who feel the problem strongly enough to care.',
  ],
  sections: [
    {
      kicker: 'A problem is not a market',
      title: 'A real problem\nisn’t enough.',
      body: [
        'Lots of people have problems they’ll never do anything about. Your market is the part of them who have the problem, feel it often and care enough to fix it.',
        'Miss one of the three and you get polite interest instead of users.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '+',
          steps: [
            { text: 'Have the problem', tone: 'lilac' },
            { text: 'Feel it often', tone: 'sky' },
            { text: 'Care enough to fix it', tone: 'mint' },
          ],
        },
        { kind: 'banner', text: 'That’s your starting market.' },
      ],
      doThis:
        'Take the problem from the last guide. Write down three groups of people who have it. For each one, mark whether they feel it often and whether they already try to fix it.',
    },
    {
      kicker: 'Start narrow',
      title: 'Start smaller\nthan feels\ncomfortable.',
      body: [
        'A broad market feels safer: more people, more upside. In practice it makes everything harder. Your message gets vague, you don’t know where to find people, and feedback pulls you in every direction.',
        'A narrow group is the opposite. You can find them, talk to them and build exactly what they need. Once it works for them, you expand.',
      ],
      visuals: [
        {
          kind: 'cards',
          items: [
            { label: 'Not', text: '“Everyone who saves content”', tone: 'white' },
            { label: 'Start with', text: 'A specific group with a strong problem you can actually reach.', tone: 'butter' },
          ],
        },
        { kind: 'banner', text: 'Small market first.\nBig ambition later.' },
      ],
      doThis:
        'Finish this sentence as specifically as you can: “My first users are ___ who ___ at least ___ a week.” If it could describe millions of people, narrow it again.',
    },
    {
      kicker: 'The test',
      title: 'Before choosing\nyour first\nmarket, ask:',
      body: [
        'These four questions help you compare groups. You don’t need perfect answers — you need honest ones.',
        'Pain tells you if they care. Behavior tells you what you’re competing with. Reach tells you if you can find them without a marketing budget. Switching tells you what would make them change.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'First market',
          rows: [
            { text: 'Who feels the problem most?' },
            { text: 'How do they solve it today?' },
            { text: 'Can I reach them easily?' },
            { text: 'Why would they switch?' },
          ],
        },
        { kind: 'note', text: 'Pain · Behavior · Reach · Switching' },
      ],
      doThis:
        'Score each of your groups from 1 to 5 on pain, behavior, reach and switching. Start with the highest total — not the biggest group.',
    },
    {
      kicker: 'The Sted example',
      fromSted: true,
      title: '“Everyone who saves”\nis too broad.',
      body: [
        'Almost everyone saves things on their phone. That’s exactly why it’s a weak first market: it doesn’t tell me who to talk to, where to find them or what they need most.',
        'For Sted, a better place to start might be people who save constantly for their work:',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Founders', tone: 'sky' },
            { label: 'Creators', tone: 'lilac' },
            { label: 'Designers', tone: 'mint' },
            { label: 'Researchers', tone: 'peach' },
          ],
        },
        { kind: 'note', text: 'Hypothesis — not proven yet' },
        { kind: 'banner', text: 'Find the group that cares most.' },
      ],
    },
  ],
  test: {
    name: 'The Name-10 Test',
    intro: 'A real first market is made of people you can actually reach. This test tells you if yours is.',
    steps: [
      'Write your first market in one sentence.',
      'Set a two-minute timer.',
      'Write down the names of real people in that group you could message today.',
    ],
    result: 'Fewer than 10 names? Your market is too vague or too hard to reach. Narrow it until you can name them.',
  },
  takeaway: {
    title: 'Start with the\n[[smallest market]]\nthat really cares.',
    body: 'You can expand later. First, find the people who need it most.',
  },
  questions: [
    'Can I describe my first users in one sentence without saying “everyone”?',
    'Do they feel this problem every week, or only sometimes?',
    'How are they solving it today?',
    'Where do they spend time — and can I reach them this week?',
    'What would make them switch from what they use now?',
    'Can I name 10 real people in this group?',
    'Am I choosing this group because they need it most, or because it’s the biggest?',
  ],
  prompts: [
    {
      id: 'map-groups',
      title: 'Map who has the problem',
      description: 'Get a list of specific groups instead of “everyone”.',
      text: `Here's the problem I'm solving: [Your problem]

List 8 specific groups of people who have this problem. Avoid broad groups like "students" or "small businesses" — be as specific as possible (for example, "freelance designers who manage 3+ clients").

For each group, estimate:
- how often they feel the problem
- how painful it is for them
- what they use today instead

Flag which parts are guesses I should check by talking to people.`,
    },
    {
      id: 'score-market',
      title: 'Score my first market',
      description: 'Compare groups on pain, behavior, reach and switching.',
      text: `I'm choosing a first market for [Your product or problem]. These are my candidate groups:

1. [Group 1]
2. [Group 2]
3. [Group 3]

Score each group from 1 to 5 on:
- Pain: how strongly they feel the problem
- Behavior: whether they already try to solve it
- Reach: how easily I can find and contact them without a budget
- Switching: how likely they are to switch from what they use today

Show the scores in a table, explain each score in one line, and recommend which group to start with and why.`,
    },
    {
      id: 'find-them',
      title: 'Find where they hang out',
      description: 'Plan how to reach your first 20 people, with no ads.',
      text: `My first market is: [Your specific group]

Tell me where I can find and talk to 20 of these people in the next two weeks, without paid ads. Be specific: communities, subreddits, Slack or Discord groups, events, newsletters, hashtags or types of accounts to look for.

Then write a short, honest message I could send to ask one of them for a 15-minute conversation about [Your problem]. No pitching — I want to learn, not sell.`,
    },
    {
      id: 'narrow-it',
      title: 'Narrow it down',
      description: 'Turn a vague market into one specific sentence.',
      text: `Here's how I describe my target market right now:

"[Your current description]"

Help me narrow it. Ask me up to 5 questions, one at a time, about who feels the problem most. Then rewrite my target market as one specific sentence: who they are, what they're trying to do, and how often they run into the problem.`,
    },
  ],
}
