import type { Guide } from './types'

export const ep09: Guide = {
  number: 9,
  hook: 'How will this\nmake money?',
  subtitle: 'Don’t leave monetization\nuntil after you launch.',
  startHere: 'The value you create',
  notHere: 'The price you picked',
  intro: [
    'Monetization usually gets left for later. Then launch arrives and the price becomes a guess.',
    'This guide is about starting from the value you create, choosing a model that fits it, and giving your free plan a real job.',
  ],
  sections: [
    {
      kicker: 'Start with value',
      title: 'Don’t start\nwith the price.',
      body: [
        'A price is a number attached to value. If you don’t know the value, the number is just a guess.',
        'Start with four questions about the value itself. The price comes after.',
      ],
      visuals: [
        {
          kind: 'questions',
          items: ['What value am I creating?', 'Who gets that value?', 'How often?', 'What are they paying for instead?'],
        },
        { kind: 'banner', text: 'Price comes after\nunderstanding value.' },
      ],
      doThis:
        'Answer the four questions for your product. The last one matters most: what people pay today — in money or in time — is your real price reference.',
    },
    {
      kicker: 'Pick a model',
      title: 'Your model should\nmatch the product.',
      body: [
        'How you charge should match how people get value. If they get value every week, a subscription makes sense. If they get it once, it probably doesn’t.',
        'These are the most common models and what each one fits:',
      ],
      visuals: [
        {
          kind: 'cards',
          items: [
            { label: 'Subscription', text: 'Recurring value.', tone: 'sky' },
            { label: 'One-time purchase', text: 'Clear, finite value.', tone: 'lilac' },
            { label: 'Usage-based', text: 'Pay as usage grows.', tone: 'mint' },
            { label: 'Ads', text: 'Attention is monetized.', tone: 'peach' },
            { label: 'B2B', text: 'A company pays for the value.', tone: 'white' },
          ],
        },
        { kind: 'note', text: 'Choose intentionally' },
      ],
      doThis: 'Pick the model that matches how often your users get value. Write one sentence on why each of the others doesn’t fit.',
    },
    {
      kicker: 'Free needs a job',
      title: 'Free isn’t a\nbusiness model.',
      body: [
        'A free plan is a tool, not a strategy. It can help people discover the product, try it, build a habit, share it and eventually upgrade.',
        'But if you don’t know what makes someone pay, free just becomes the product.',
      ],
      visuals: [
        { kind: 'checklist', items: ['Discover', 'Try', 'Build a habit', 'Share', 'Upgrade'] },
        { kind: 'callout', label: 'But you should know', text: 'What makes\nsomeone pay?' },
      ],
      doThis:
        'Write down the job of your free plan and the exact moment you expect someone to upgrade. If you can’t name that moment, your free plan doesn’t have a job yet.',
    },
    {
      kicker: 'The Sted question',
      fromSted: true,
      title: 'What should be\nfree in Sted?',
      body: [
        'For Sted, the question is what should be free — and what creates enough ongoing value to pay for.',
        'These are the options on the table:',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'More saves', tone: 'sky' },
            { label: 'More AI', tone: 'lilac' },
            { label: 'Deeper research', tone: 'mint' },
            { label: 'Advanced workflows', tone: 'peach' },
          ],
        },
        { kind: 'banner', text: 'Pricing is a product\ndecision too.' },
      ],
    },
  ],
  test: {
    name: 'The Pay-For Test',
    intro: 'Two minutes to check that you know what you’re charging for.',
    steps: [
      'Finish this sentence: “People pay because every ___ they get ___.”',
      'Write what they use or pay for today instead — a tool, their own time or another person.',
      'Compare the two.',
    ],
    result:
      'If you can’t finish the sentence, you don’t know what you’re charging for yet. If what they use today is free and good enough, you need a stronger reason to pay.',
  },
  takeaway: {
    title: 'Know what people\nare [[paying for]].',
    body: 'Not just what you’re charging them. Value first. Price second.',
  },
  questions: [
    'What value do users get, and how often?',
    'What do they pay for today instead — in money or time?',
    'Does my model match how often they get value?',
    'What is the job of my free plan?',
    'What exact moment makes someone upgrade?',
    'Have I actually asked anyone to pay yet?',
  ],
  prompts: [
    {
      id: 'value-map',
      title: 'Map the value I create',
      description: 'Start from value before you pick a price.',
      text: `Here's my product: [What it does]
Target user: [Your first market]

Help me map the value it creates. What value does it create? Who gets that value? How often? What are they paying for instead today (tools, time, people)?

Then suggest which monetization models fit that value pattern and which don't, with one line of reasoning each.`,
    },
    {
      id: 'free-vs-paid',
      title: 'Design free vs. paid',
      description: 'Give your free plan a job.',
      text: `I'm deciding what's free and what's paid in [Your product].

Core features: [List]
What makes users come back: [Your best guess]

Suggest 2 or 3 ways to split free and paid. For each one: the free plan's job (discover, try, build a habit, share), the moment a user hits the limit, and why that moment makes them want to upgrade. Point out the risks of each option.`,
    },
    {
      id: 'pricing-test',
      title: 'Test a price',
      description: 'Get a real signal before you commit.',
      text: `I want to test whether people will pay for [Your product] at around [Your price idea].

Suggest 3 simple ways to test willingness to pay before or right after launch — for example a preorder, a pricing page test or asking directly in interviews. For each, explain what to do, what counts as a real signal and what to watch out for.`,
    },
  ],
}
