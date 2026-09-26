import type { Guide } from './types'

export const ep08: Guide = {
  number: 8,
  hook: 'The app isn’t\nthe company.',
  subtitle: 'Building the product is only\none part of launching it.',
  startHere: 'What unlocks the next step',
  notHere: 'Everything on day one',
  intro: [
    'At some point, the app needs a company around it: somewhere for money to go, accounts to publish from, basic legal and tax in place.',
    'This guide is about setting that up without letting it swallow your time — only what you need, when you need it. It isn’t legal or tax advice; for that, talk to a professional where you live.',
  ],
  sections: [
    {
      kicker: 'The boring stuff',
      title: 'Your idea needs\ninfrastructure.',
      body: [
        'Depending on what you’re building and where you live, launching can mean a company, a bank account, a domain and email, developer accounts, tax and legal setup, and a way to take payments.',
        'None of it is exciting. All of it can block a launch if you leave it too late.',
      ],
      visuals: [
        {
          kind: 'chips',
          items: [
            { label: 'Company', tone: 'sky' },
            { label: 'Bank account', tone: 'lilac' },
            { label: 'Domain + email', tone: 'mint' },
            { label: 'Developer accounts', tone: 'peach' },
            { label: 'Tax + legal', tone: 'white' },
            { label: 'Payments', tone: 'paper' },
          ],
        },
        { kind: 'banner', text: 'Not exciting.\nStill part of building.' },
      ],
      doThis: 'List every piece of infrastructure your product will eventually need. Don’t set anything up yet — just make the list.',
    },
    {
      kicker: 'Not on day one',
      title: 'Set things up\nwhen it’s needed.',
      body: [
        'Setup feels productive. Forms, accounts and logos give you the feeling of progress without testing anything.',
        'Before you spend time or money on setup, ask what it unlocks right now.',
      ],
      visuals: [
        { kind: 'questions', items: ['Do I need this now?', 'What does it unlock?', 'What happens if I wait?'] },
        { kind: 'banner', text: 'Setup is another way\nto procrastinate.' },
      ],
      doThis: 'Next to each item on your list, write what it unlocks and when you’ll actually need it.',
    },
    {
      kicker: 'Hidden dependencies',
      title: 'One account\nunlocks another.',
      body: [
        'Setup happens in a chain. Some steps need the one before them, and some take days or weeks to be reviewed or approved.',
        'Map the chain early so you know which steps to start before you need them.',
      ],
      visuals: [
        {
          kind: 'process',
          joiner: '↓',
          steps: [
            { text: 'Company', tone: 'lilac' },
            { text: 'Banking', tone: 'sky' },
            { text: 'Developer accounts', tone: 'mint' },
            { text: 'Payments', tone: 'peach' },
            { text: 'Revenue', tone: 'white' },
          ],
        },
      ],
      doThis: 'Draw your own chain, from company to first revenue. Mark every step that needs review or verification — start those first.',
    },
    {
      kicker: 'What Sted needed',
      fromSted: true,
      title: 'Sted was more\nthan an app.',
      body: [
        'To get Sted into people’s hands, the product was only one part. There was company setup, a domain and email, Apple and Google developer accounts, payments and the stores’ own requirements.',
        'Each one had to be ready before launch.',
      ],
      visuals: [
        {
          kind: 'checklist',
          items: ['Company setup', 'Domain + email', 'Apple Developer', 'Google Play', 'Payments', 'Store requirements'],
        },
        { kind: 'banner', text: 'The product was only\none part of the system.' },
      ],
    },
  ],
  test: {
    name: 'The Unlock Test',
    intro: 'Two minutes to separate real setup from busywork.',
    steps: [
      'List every setup task on your plate right now.',
      'Next to each one, write what it unlocks this month.',
      'Cross out every task with nothing written next to it.',
    ],
    result: 'What’s left is your setup for now. Everything you crossed out can wait until it unlocks something.',
  },
  takeaway: {
    title: 'Build the company\naround the\n[[product]].',
    body: 'But only add infrastructure when it unlocks the next step.',
  },
  questions: [
    'What setup do I need for my next step — not for launch day?',
    'Which steps depend on another one?',
    'Which steps need review or approval, and how long could that take?',
    'Am I doing setup to avoid building or talking to users?',
    'Do I know which rules apply where I live, or do I need to ask a professional?',
    'What happens if I wait on this?',
  ],
  prompts: [
    {
      id: 'setup-map',
      title: 'Map my setup chain',
      description: 'See what depends on what, in order.',
      text: `I'm launching [Your product: app, web or both] from [Your country].

List the setup steps I'll probably need before I can charge users: company, banking, developer accounts, payments, tax and legal basics, domain and email. Put them in order, show which steps depend on others, and flag the ones that usually need review or verification.

This is for planning only — tell me which points I should confirm with a local accountant or lawyer.`,
    },
    {
      id: 'unlock',
      title: 'What do I need now?',
      description: 'Cut setup down to what unlocks the next step.',
      text: `My next milestone is: [e.g. first 10 beta users, first paying customer, App Store release]

Here's everything I think I need to set up: [Your list]

For each item, tell me if I need it for this milestone or if it can wait, and why. Then give me the shortest possible list of what to do this week.`,
    },
    {
      id: 'accountant-questions',
      title: 'Prepare questions for an accountant',
      description: 'Make a paid hour count.',
      text: `I'm meeting an accountant or lawyer in [Your country] about setting up a company for [Your product].

My situation: [Solo or co-founders, how you plan to make money, where your users are]

Write the 10 most important questions I should ask, grouped by topic: company type, taxes, payments, app store income and contracts. Keep them short and specific.`,
    },
  ],
}
