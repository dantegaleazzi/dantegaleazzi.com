import type { Guide } from './types'

export const ep06: Guide = {
  number: 6,
  hook: 'Don’t build it all\nin one prompt.',
  subtitle: 'AI can build fast.\nYour job is to give it direction.',
  startHere: 'Enough context',
  notHere: 'One giant prompt',
  intro: [
    'This is the step AI changed the most. You can build real software without knowing how to code — that’s how I’m building Sted.',
    'But AI is only as good as the direction you give it. This guide is about how to work with it: context first, references for taste, and small pieces you can test.',
  ],
  sections: [
    {
      kicker: 'Start with a plan',
      title: 'Give AI context\nbefore code.',
      body: [
        'If you open an AI tool and type “build me an app that…”, it will build something. Probably not what you meant.',
        'Give it the same context you’d give a new teammate: what you’re building, who it’s for, what it should do and what success looks like. Then ask it to plan before it writes any code.',
      ],
      visuals: [
        {
          kind: 'questions',
          items: ['What are we building?', 'Who is it for?', 'What should it do?', 'What does success look like?'],
        },
        { kind: 'callout', label: 'Then ask', text: '“Act as my CTO. Turn this into\na simple PRD and build plan.”' },
      ],
      doThis:
        'Write four short lines answering those questions. Paste them into your AI tool with the “Act as my CTO” prompt below and ask for the plan — no code yet.',
    },
    {
      kicker: 'Show, don’t tell',
      title: 'Give AI\nreferences.',
      body: [
        '“Make it look good” means nothing to AI. It will give you the average of everything it has seen.',
        'Show it what you mean instead: apps you like, screenshots, websites, design systems. The more specific the reference, the closer the result.',
      ],
      visuals: [
        { kind: 'cards', items: [{ label: 'Don’t say', text: '“Make it look good.”', tone: 'white' }] },
        {
          kind: 'chips',
          items: [
            { label: 'Apps', tone: 'sky' },
            { label: 'Screenshots', tone: 'lilac' },
            { label: 'Websites', tone: 'mint' },
            { label: 'Design systems', tone: 'peach' },
          ],
        },
        { kind: 'banner', text: 'Taste needs context too.' },
      ],
      doThis: 'Collect three references for the next screen you’re building: an app, a screenshot and a website. Tell AI exactly what you like about each one.',
    },
    {
      kicker: 'Build in pieces',
      title: 'One screen.\nOne flow. One problem.',
      body: [
        'Big prompts produce big changes, and big changes are hard to check. When something breaks, you don’t know which part broke it.',
        'Work in small loops instead: plan one piece, build it, test it, fix it — and only then move on.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Plan', tone: 'lilac' },
            { text: 'Build', tone: 'sky' },
            { text: 'Test and fix', tone: 'mint' },
            { text: 'Next', tone: 'white' },
          ],
        },
        { kind: 'banner', tone: 'white', text: 'The bigger the prompt, the harder\nit is to know what broke.' },
      ],
      doThis: 'Split your MVP into small pieces — one screen or one flow each. Build them one at a time, and test each one before you start the next.',
    },
    {
      kicker: 'What Sted taught me',
      fromSted: true,
      title: 'AI made me faster.\nIt didn’t remove\nthe decisions.',
      body: [
        'Building Sted with AI, writing the code wasn’t the hard part. The hard part was the questions AI couldn’t answer for me.',
        'AI can execute almost anything you ask. Knowing what to ask for is still your job.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: ['What should we build?', 'What should we cut?', 'Does this actually work?', 'Is this good enough to ship?'],
        },
        { kind: 'banner', text: 'AI executes.\nYou still need judgment.' },
      ],
      doThis: 'Before each build session, write down the one decision you need to make today. Don’t start prompting until you’ve made it.',
    },
  ],
  test: {
    name: 'The Context Test',
    intro: 'Check that AI understands what you’re building before it writes a single line of code.',
    steps: [
      'Write four lines: what you’re building, who it’s for, what it should do and what success looks like.',
      'Paste them into your AI tool.',
      'Ask it to explain the product back to you in five bullet points.',
    ],
    result: 'If its summary surprises you, your context isn’t clear yet. Fix the four lines before you ask for any code.',
  },
  takeaway: {
    title: 'Give it enough\ncontext to build\nit [[with you]].',
    body: 'Not one giant prompt. Plan → build → test → repeat.',
  },
  questions: [
    'Could a new teammate understand what I’m building from my context?',
    'Did I ask for a plan before asking for code?',
    'Have I shown AI references, or only described them?',
    'Is this prompt about one screen, one flow or one problem?',
    'Did I test the last piece before starting the next one?',
    'What decision am I avoiding by asking AI to build more?',
  ],
  prompts: [
    {
      id: 'cto-plan',
      title: 'Act as my CTO',
      description: 'Turn your idea into a PRD and build plan.',
      text: `Act as my CTO. I don't know how to code, so explain decisions in plain language.

What we're building: [Your product]
Who it's for: [Your first market]
What it should do: [Core loop and main features]
What success looks like: [How you'll know it works]

Turn this into a simple PRD and a build plan. Break the build into small steps — one screen or one flow each — in the order we should build them. Recommend a simple tech stack and explain why. Don't write any code yet.`,
    },
    {
      id: 'references',
      title: 'Describe the look with references',
      description: 'Give AI taste, not adjectives.',
      text: `I'm designing this screen: [Screen and what it does]

Here are my references:
1. [App, website or screenshot] — what I like: [Specific detail]
2. [Reference] — what I like: [Specific detail]
3. [Reference] — what I like: [Specific detail]

Describe a design for my screen that combines these: layout, typography, colors, spacing and components. Point out anything from the references that wouldn't fit my product.`,
    },
    {
      id: 'one-piece',
      title: 'Build one piece',
      description: 'A focused prompt for a single screen or flow.',
      text: `We're building [Your product] step by step. Right now we're only working on: [One screen or flow]

What it should do: [Behavior]
What "done" looks like: [How you'll check it]

Build only this piece. Don't change other parts of the app. When you're done, tell me exactly how to test it and what could break.`,
    },
    {
      id: 'debug',
      title: 'Fix what broke',
      description: 'Debug without making it worse.',
      text: `Something broke in my app.

What I did: [Steps]
What I expected: [Expected result]
What happened instead: [Actual result and any error messages]

Before changing anything, explain in plain language what's probably causing it. Then propose the smallest possible fix and tell me how to check it worked.`,
    },
  ],
}
