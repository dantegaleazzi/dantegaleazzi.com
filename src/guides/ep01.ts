import { Bookmark, Image, Link, MessageCircle } from 'lucide-react'
import type { Guide } from './types'

export const ep01: Guide = {
  number: 1,
  hook: 'Before you\nbuild anything,\n[[do this]]',
  subtitle: 'How to find a problem worth solving',
  startHere: 'A real problem',
  notHere: 'Your app idea',
  intro: [
    'Most people start with an app idea. This guide is about the step before that: finding a problem that is real, frequent and painful enough that people want it solved.',
    'It’s the easiest step to skip — and the one that decides whether everything you build after it matters.',
  ],
  sections: [
    {
      kicker: 'Why now',
      title: 'AI made\nbuilding cheap.',
      body: [
        'With AI you can go from an idea to a working prototype in hours. You don’t need to know how to code, hire a developer or wait months to see something real.',
        'That’s the good news. The catch is that it’s now just as easy to build something nobody needs. When building was expensive, the cost forced you to think first. Now you have to choose to.',
      ],
      visuals: [
        { kind: 'banner', tone: 'peach', text: 'But it’s also easier\nto build the wrong thing.' },
        { kind: 'callout', label: 'The real question', text: 'Does anyone actually\nwant this?' },
      ],
      doThis:
        'Write your app idea in one sentence. Then rewrite it as a problem: “People who ___ struggle with ___.” If you can’t write the second sentence yet, that’s where you start.',
    },
    {
      kicker: 'Where I started',
      fromSted: true,
      title: 'My problem was\nalready in my phone.',
      body: [
        'I didn’t start with an idea for an app. I started with a habit I couldn’t fix.',
        'I kept saving things because they felt useful — screenshots, bookmarks, saved posts, links I sent to myself. Then I almost never found or used them again.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'My phone',
          rows: [
            { icon: Image, text: 'Screenshots' },
            { icon: Bookmark, text: 'Bookmarks' },
            { icon: MessageCircle, text: 'Saved posts' },
            { icon: Link, text: 'Links I sent myself' },
          ],
        },
        { kind: 'banner', text: 'That became the starting point for Sted.' },
      ],
      doThis:
        'Look for your own version of this. Go through your phone, your notes and your week: what do you keep doing by hand, keep forgetting or keep working around? Write down three things.',
    },
    {
      kicker: 'Investigate',
      title: 'Before building,\ninvestigate the\nproblem.',
      body: [
        'Once you have a problem, don’t jump to the solution. Treat it like research: you’re trying to learn how the problem actually shows up in people’s lives.',
        'Pay special attention to the last two questions. What people do today is your real competition — and if it’s good enough, they won’t switch.',
      ],
      visuals: [
        {
          kind: 'window',
          title: 'Research',
          rows: [
            { text: 'Who has this problem?' },
            { text: 'How often does it happen?' },
            { text: 'How painful is it?' },
            { text: 'What do they do today?' },
            { text: 'Why isn’t that good enough?' },
          ],
        },
        { kind: 'note', text: 'Talk to people · Search Reddit · Read reviews · Study competitors' },
      ],
      doThis:
        'Find five people who have the problem and ask them these five questions. Then read threads and app reviews where people complain about it, and write down the exact words they use.',
    },
    {
      kicker: 'Test cheaply',
      title: 'Don’t build\nthe whole app\nto test the idea.',
      body: [
        'Every idea rests on a few assumptions. One of them is the riskiest: if it’s wrong, nothing else matters. Test that one first.',
        'You rarely need code to do it. Each of these gets you real evidence faster than building:',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Interview', tone: 'sky', text: 'Talk to someone who has the problem.' },
            { label: 'Mockup', tone: 'lilac', text: 'Show a picture of the solution and watch the reaction.' },
            { label: 'Landing page', tone: 'mint', text: 'Describe the product and see who signs up.' },
            { label: 'Waitlist', tone: 'butter', text: 'Ask for an email to get early access.' },
            { label: 'Fake door', tone: 'peach', text: 'Add a button for something that doesn’t exist yet and count the clicks.' },
            { label: 'Preorder', tone: 'white', text: 'Ask people to pay before it’s built.' },
          ],
        },
        { kind: 'callout', label: 'Get evidence', text: 'Then build.' },
      ],
      doThis:
        'Write your riskiest assumption in one sentence. Pick the cheapest test from the list that could prove it wrong — and run it this week.',
    },
  ],
  test: {
    name: 'The 5-Question Test',
    intro: 'Find out in two minutes whether you have a problem — or just an idea. Grab a note and answer honestly.',
    steps: [
      'Write the problem in one sentence, without mentioning your app.',
      'Answer the five research questions — who, how often, how painful, what they do today, why that isn’t enough. One line each.',
      'Next to each answer, write “heard” if a real person told you, or “guess” if you made it up.',
    ],
    result: 'Three or more guesses? You don’t have a problem yet — you have an idea. Go talk to people before you build.',
  },
  takeaway: {
    title: 'Start with a\n[[real problem]].\nNot your app idea.',
    body: 'AI makes building fast. That makes choosing what to build the most important decision you make.',
  },
  questions: [
    'Can I describe the problem without mentioning my app?',
    'Who exactly has this problem? Can I name five of them?',
    'When did it last happen to them — and what did they do?',
    'How are they solving it today, and why isn’t that good enough?',
    'Is it painful enough that they’d change what they do today?',
    'Have I heard about this problem from people other than me?',
    'What’s my riskiest assumption, and how can I test it this week?',
  ],
  prompts: [
    {
      id: 'find-problems',
      title: 'Find problems in my own life',
      description: 'Let AI interview you to surface problems you already have.',
      text: `I want to build a product with AI, but I don't want to start with an app idea. I want to start with a real problem.

Interview me to find problems in my own life and work. Ask me one question at a time about:
- things I do repeatedly by hand
- things I save, forget and never use again
- tools I pay for but still work around
- tasks that annoy me every week

After 10 questions, list the 5 strongest problems you heard. For each one, tell me who else probably has it, how painful it seems (low / medium / high) and why.`,
    },
    {
      id: 'pressure-test',
      title: 'Pressure-test a problem',
      description: 'Find out where you’re guessing before you build.',
      text: `Here's a problem I'm thinking about solving:

[Describe the problem in 2–3 sentences]

Act as a skeptical investor. Answer these questions honestly, and tell me where I'm guessing:
1. Who has this problem?
2. How often does it happen?
3. How painful is it?
4. What do they do today?
5. Why isn't that good enough?

Then list the 3 assumptions that would kill this idea if they were wrong, from most to least risky.`,
    },
    {
      id: 'mine-reviews',
      title: 'Mine Reddit and reviews',
      description: 'Turn real complaints into research notes.',
      text: `I'm researching this problem: [Your problem]

Below are posts, comments and app reviews from people talking about it:

[Paste Reddit threads, reviews or forum posts]

Summarize:
- the exact phrases people use to describe the problem
- how they solve it today
- what frustrates them about current solutions
- how often and how strongly they seem to feel it

Only use what's in the text. If something isn't supported by the quotes, say so.`,
    },
    {
      id: 'cheap-test',
      title: 'Design a cheap test',
      description: 'Get evidence this week without building the app.',
      text: `My riskiest assumption is: [Your assumption]

Suggest the 3 cheapest ways to test it this week without building the app. Choose from interviews, mockups, landing pages, waitlists, fake doors or preorders.

For each test, tell me:
- exactly what to do, step by step
- what result would count as real evidence
- what result would mean I should change or drop the idea`,
    },
  ],
}
