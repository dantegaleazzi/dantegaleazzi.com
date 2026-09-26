import type { Guide } from './types'

export const ep03: Guide = {
  number: 3,
  hook: 'Don’t build\nthe MVP yet.',
  subtitle: 'Test whether people\nactually care first.',
  startHere: 'Real evidence',
  notHere: 'The MVP',
  intro: [
    'You have a real problem and a first market. Before you build the product, find out if those people care enough to act.',
    'Validation isn’t about proving you’re right. It’s about finding out early — while changing your mind is still cheap.',
  ],
  sections: [
    {
      kicker: 'Talk is not validation',
      title: '“I’d use this”\nisn’t validation.',
      body: [
        'When you describe your idea, most people are nice. They say it sounds useful, that they’d try it, that it’s a cool idea. None of that costs them anything — so it tells you very little.',
        'What counts is what people do: the workaround they already use, the time they spend looking for alternatives, the moment they sign up or pay.',
      ],
      visuals: [
        {
          kind: 'evidence',
          weak: ['“I’d use this.”', '“Cool idea.”'],
          strong: ['They already have a workaround.', 'They search for alternatives.', 'They sign up.', 'They pay.'],
        },
        { kind: 'banner', text: 'Behavior beats compliments.' },
      ],
      doThis:
        'Go back through your notes and conversations. Split everything people told you into two lists: what they said and what they did. Only the second list counts.',
    },
    {
      kicker: 'The riskiest assumption',
      title: 'Don’t test\neverything.',
      body: [
        'Your idea depends on a handful of assumptions: that the problem is frequent, that people will switch, that they’ll pay, that you can reach them. You can’t test them all at once.',
        'Pick the one that would kill the idea if it’s wrong. Find the cheapest way to get a real signal on it. Then decide.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Assumption', tone: 'lilac' },
            { text: 'Cheapest test', tone: 'sky' },
            { text: 'Real signal', tone: 'mint' },
            { text: 'Decide', tone: 'butter' },
          ],
        },
      ],
      doThis:
        'List every assumption your idea depends on. Circle the one that, if it’s wrong, makes everything else irrelevant. That’s the one you test first.',
    },
    {
      kicker: 'Test cheaply',
      title: 'Your first test\ndoesn’t need an app.',
      body: [
        'A landing page can tell you if people want it. A mockup can tell you if they understand it. A preorder can tell you if they’ll pay. None of them needs code.',
        'With AI you can put any of these together in an afternoon — so there’s no reason to skip them.',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Interview', tone: 'sky' },
            { label: 'Mockup', tone: 'lilac' },
            { label: 'Landing page', tone: 'mint' },
            { label: 'Waitlist', tone: 'butter' },
            { label: 'Fake door', tone: 'peach' },
            { label: 'Preorder', tone: 'white' },
          ],
        },
        { kind: 'callout', label: 'The rule', text: 'Use the cheapest test\nthat gives you real evidence.' },
      ],
      doThis:
        'Choose one test for your riskiest assumption. Before you run it, write down what result would count as a yes — so you can’t move the goalposts later.',
    },
    {
      kicker: 'Make a decision',
      title: 'The test should\nchange what you do.',
      body: [
        'A test that doesn’t lead to a decision is just research. Before you run it, agree with yourself on what each result means.',
        'There are only three honest outcomes:',
      ],
      visuals: [
        {
          kind: 'cards',
          items: [
            { label: 'Build', text: 'The evidence is there.', tone: 'mint' },
            { label: 'Change', text: 'The problem is real. Your solution isn’t.', tone: 'butter' },
            { label: 'Kill', text: 'The evidence isn’t there.', tone: 'peach' },
          ],
        },
        { kind: 'note', text: 'Learn before you spend more' },
      ],
      doThis:
        'After your test, write one sentence: “Based on this, I will build / change / kill ___ because ___.” If you can’t write it, the test wasn’t clear enough.',
    },
  ],
  test: {
    name: 'The Said-vs-Did Test',
    intro: 'Two minutes to see how much real evidence you actually have.',
    steps: [
      'Write down every signal you have that people want this.',
      'Put each one in a column: “said” (compliments, “I’d use it”) or “did” (signed up, paid, searched, already uses a workaround).',
      'Count the “did” column.',
    ],
    result: 'If the “did” column is empty, you haven’t validated anything yet — no matter how many people liked the idea.',
  },
  takeaway: {
    title: 'Test [[behavior]],\nnot compliments.',
    body: 'The goal isn’t to prove your idea is right. It’s to find out before you spend months building it.',
  },
  questions: [
    'What’s the one assumption that would kill this idea if it’s wrong?',
    'What have people done — not said — that shows they care?',
    'What’s the cheapest test that could prove me wrong this week?',
    'What result counts as a yes? Did I decide that before the test?',
    'Am I asking questions that invite compliments?',
    'If the evidence isn’t there, am I willing to change or drop the idea?',
  ],
  prompts: [
    {
      id: 'list-assumptions',
      title: 'List my riskiest assumptions',
      description: 'See what your idea depends on, ranked by risk.',
      text: `Here's my idea:

[Describe the problem, who has it and your solution]

List every assumption this idea depends on — about the problem, the market, the solution, pricing and distribution. Then rank them from most to least risky: which ones would kill the idea if they were wrong?

For the top 3, explain why they're risky and what evidence would prove or disprove each one.`,
    },
    {
      id: 'landing-test',
      title: 'Write a landing page test',
      description: 'Copy for a one-page test you can put live today.',
      text: `I want to test demand for this idea before building it:

[Your idea in 2–3 sentences]
Target user: [Your first market]

Write the copy for a simple landing page: a headline, a one-line subheadline, 3 short benefit bullets and a call to action to join a waitlist.

Then tell me what result I should look for to count this as real interest, and what would mean the idea isn't landing.`,
    },
    {
      id: 'interview-script',
      title: 'Interview without leading',
      description: 'Questions about the past, not opinions about your idea.',
      text: `I'm interviewing people about this problem: [Your problem]

Write a 15-minute interview script that doesn't pitch my idea and doesn't ask leading questions. Focus on what people have actually done in the past: the last time the problem happened, what they tried, what it cost them and what they use today.

Add a short list of questions I should avoid, and why.`,
    },
    {
      id: 'decide',
      title: 'Decide: build, change or kill',
      description: 'Turn test results into a decision.',
      text: `I ran this test: [Describe the test]
My riskiest assumption was: [Your assumption]
Here's what happened: [Results]

Act as a neutral advisor. Based only on this evidence, should I build, change or kill the idea? Explain your reasoning, tell me what the evidence does and doesn't prove, and suggest the next test if the result is unclear.`,
    },
  ],
}
